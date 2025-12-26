import { useEffect, useRef, useCallback } from 'react';
import { Asteroid } from './svg/celestial';
import { useThrottledScroll, useCollisionDetection } from '../../hooks';
import { useWindowDimensions } from '../../hooks/useResizeListener';
import { APP_CONFIG } from '../../config/app';
import { randomInRange, generateId, clamp, easing } from '../../utils/animation';

const { asteroidBelt: CONFIG, parallax, collision: COLLISION_CONFIG } = APP_CONFIG;

type AsteroidVariant = 0 | 1 | 2 | 3 | 4 | 5;

type CollisionState = 'active' | 'colliding' | 'absorbed' | null;

interface BeltAsteroid {
  id: string;
  spawnTime: number;
  startX: number;
  journeyPosition: number;  // Position within the belt (0.14-0.17)
  velocityX: number;
  velocityY: number;
  size: number;
  variant: AsteroidVariant;
  rotationSpeed: number;    // degrees per second
  initialRotation: number;
  // Collision properties
  isCollider: boolean;
  collisionState: CollisionState;
  collisionStartTime: number | null;
  // Position at collision time (for stable animation)
  collisionX: number | null;
  collisionY: number | null;
}

/**
 * Gaussian random using Box-Muller transform.
 * Returns a normally distributed random number.
 */
function gaussianRandom(mean: number, stdDev: number): number {
  const u1 = Math.random();
  const u2 = Math.random();
  const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  return mean + z * stdDev;
}

/**
 * Generate a journey position with Gaussian distribution centered at belt midpoint.
 */
function generateBeltPosition(): number {
  const [minPos, maxPos] = CONFIG.journeyRange;
  const midpoint = CONFIG.journeyMidpoint;
  const stdDev = (maxPos - minPos) / 4; // ~95% within belt range

  return clamp(gaussianRandom(midpoint, stdDev), minPos, maxPos);
}

/**
 * Initialize all belt asteroids with random properties.
 * All asteroids move in prograde direction (left-to-right) to simulate
 * the counter-clockwise orbital motion when viewed from above the Sun's North Pole.
 */
function initializeAsteroids(viewportWidth: number): BeltAsteroid[] {
  const asteroids: BeltAsteroid[] = [];
  const now = performance.now();

  for (let i = 0; i < CONFIG.asteroidCount; i++) {
    const size = randomInRange(...CONFIG.sizeRange);
    const speed = randomInRange(...CONFIG.speedRange);
    const angleDeg = randomInRange(...CONFIG.angleRange);
    const angleRad = (angleDeg * Math.PI) / 180;

    // Stagger spawn times so asteroids don't all start at once
    const staggeredSpawnTime = now - randomInRange(0, 30000);

    // Random starting X position (can be anywhere across screen for initial spawn)
    const startX = randomInRange(-size, viewportWidth + size);

    // Determine if this asteroid is a collider (can hit panels)
    const isCollider = size >= COLLISION_CONFIG.minColliderSize &&
                       Math.random() < COLLISION_CONFIG.colliderRatio;

    // Colliders are larger (appears closer) and move slower (more visible)
    const finalSize = isCollider ? size * COLLISION_CONFIG.colliderSizeMultiplier : size;
    const speedMultiplier = isCollider ? COLLISION_CONFIG.colliderSpeedMultiplier : 1;

    // All asteroids move left-to-right (prograde orbital direction)
    const velocityX = speed * speedMultiplier;
    // Slight vertical drift (can be up or down)
    const velocityY = (Math.random() > 0.5 ? 1 : -1) * speed * speedMultiplier * Math.tan(angleRad);

    asteroids.push({
      id: generateId(),
      spawnTime: staggeredSpawnTime,
      startX,
      journeyPosition: generateBeltPosition(),
      velocityX,
      velocityY,
      size: finalSize,
      variant: Math.floor(Math.random() * 6) as AsteroidVariant,
      rotationSpeed: randomInRange(...CONFIG.rotationSpeedRange),
      initialRotation: randomInRange(0, 360),
      isCollider,
      collisionState: isCollider ? 'active' : null,
      collisionStartTime: null,
      collisionX: null,
      collisionY: null,
    });
  }

  return asteroids;
}

export function AsteroidBelt() {
  const { height: viewportHeight, width: viewportWidth, docHeight } = useWindowDimensions();
  const asteroidsRef = useRef<BeltAsteroid[]>([]);
  const elementRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const animationRef = useRef<number | null>(null);
  const isInitializedRef = useRef(false);

  // Collision detection
  const { checkCollision, shouldCheckThisFrame, handleCollision, handleScrollChange } = useCollisionDetection();

  // Initialize asteroids on mount
  useEffect(() => {
    if (!isInitializedRef.current && viewportWidth > 0) {
      asteroidsRef.current = initializeAsteroids(viewportWidth);
      isInitializedRef.current = true;
    }
  }, [viewportWidth]);

  // Respawn asteroid when it goes off screen or after absorption
  const respawnAsteroid = useCallback((asteroid: BeltAsteroid): BeltAsteroid => {
    const size = randomInRange(...CONFIG.sizeRange);
    const speed = randomInRange(...CONFIG.speedRange);
    const angleDeg = randomInRange(...CONFIG.angleRange);
    const angleRad = (angleDeg * Math.PI) / 180;

    // Determine if this asteroid is a collider (can hit panels)
    const isCollider = size >= COLLISION_CONFIG.minColliderSize &&
                       Math.random() < COLLISION_CONFIG.colliderRatio;

    // Colliders are larger (appears closer) and move slower (more visible)
    const finalSize = isCollider ? size * COLLISION_CONFIG.colliderSizeMultiplier : size;
    const speedMultiplier = isCollider ? COLLISION_CONFIG.colliderSpeedMultiplier : 1;

    // All asteroids spawn from left and move right (prograde orbital direction)
    const startX = -finalSize;
    const velocityX = speed * speedMultiplier;
    const velocityY = (Math.random() > 0.5 ? 1 : -1) * speed * speedMultiplier * Math.tan(angleRad);

    return {
      ...asteroid,
      spawnTime: performance.now(),
      startX,
      journeyPosition: generateBeltPosition(),
      velocityX,
      velocityY,
      size: finalSize,
      variant: Math.floor(Math.random() * 6) as AsteroidVariant,
      rotationSpeed: randomInRange(...CONFIG.rotationSpeedRange),
      initialRotation: randomInRange(0, 360),
      isCollider,
      collisionState: isCollider ? 'active' : null,
      collisionStartTime: null,
      collisionX: null,
      collisionY: null,
    };
  }, []);

  // Update asteroid positions via direct DOM manipulation
  const updatePositions = useCallback((scrollY: number) => {
    const now = performance.now();
    const centerY = viewportHeight * parallax.VIEWPORT_CENTER_RATIO;
    const maxDistance = viewportHeight * parallax.MAX_DISTANCE_RATIO;
    const shouldCheck = shouldCheckThisFrame();

    // Notify collision system of scroll changes
    handleScrollChange(scrollY);

    asteroidsRef.current.forEach((asteroid, index) => {
      const element = elementRefs.current.get(asteroid.id);
      if (!element) return;

      // Handle absorbed asteroids - respawn after animation
      if (asteroid.collisionState === 'absorbed') {
        const absorptionElapsed = now - (asteroid.collisionStartTime || now);
        if (absorptionElapsed > COLLISION_CONFIG.absorptionDuration) {
          // Respawn after absorption animation completes
          asteroidsRef.current[index] = respawnAsteroid(asteroid);
          element.style.display = 'none';
          element.classList.remove('asteroid-absorbing');
        }
        return;
      }

      const elapsed = now - asteroid.spawnTime;

      // Calculate current position
      let currentX: number;
      let baseY: number;

      if (asteroid.collisionState === 'colliding' && asteroid.collisionX !== null && asteroid.collisionY !== null) {
        // During collision, use the saved collision position as base
        const collisionElapsed = now - (asteroid.collisionStartTime || now);
        const progress = Math.min(collisionElapsed / COLLISION_CONFIG.absorptionDuration, 1);

        // Gradually slow down from collision position
        const decayMultiplier = 1 - easing.easeOutCubic(progress);
        currentX = asteroid.collisionX + asteroid.velocityX * collisionElapsed * decayMultiplier * 0.3;
        baseY = asteroid.collisionY + asteroid.velocityY * collisionElapsed * decayMultiplier * 0.3;
      } else {
        // Normal position calculation
        currentX = asteroid.startX + asteroid.velocityX * elapsed;
        const documentY = asteroid.journeyPosition * docHeight + asteroid.velocityY * elapsed;
        baseY = documentY - scrollY * CONFIG.parallaxSpeed * parallax.SPACE_ELEMENTS_MULTIPLIER;
      }

      // Calculate opacity based on distance from viewport center
      const distanceFromCenter = Math.abs(baseY - centerY);
      let opacity = Math.max(0, 1 - distanceFromCenter / maxDistance) * CONFIG.maxOpacity;

      // Calculate rotation
      const rotation = asteroid.initialRotation + (elapsed / 1000) * asteroid.rotationSpeed;

      // Handle collision animation (shrinking)
      if (asteroid.collisionState === 'colliding' && asteroid.collisionStartTime) {
        const collisionElapsed = now - asteroid.collisionStartTime;

        // Start shrinking after a brief slowdown phase (first 200ms)
        if (collisionElapsed > 200) {
          const shrinkProgress = (collisionElapsed - 200) / (COLLISION_CONFIG.absorptionDuration - 200);
          const scale = 1 - easing.easeOutCubic(Math.min(shrinkProgress, 1));

          if (scale <= 0.05) {
            // Mark as absorbed
            asteroid.collisionState = 'absorbed';
            element.style.display = 'none';
            return;
          } else {
            // Apply scale transform
            element.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(${scale})`;
          }
        }
      }

      // Check if asteroid needs respawning (off screen horizontally)
      const buffer = asteroid.size * 2;
      const isOffScreen = currentX < -buffer || currentX > viewportWidth + buffer;

      if (isOffScreen && asteroid.collisionState !== 'colliding') {
        // Respawn the asteroid
        asteroidsRef.current[index] = respawnAsteroid(asteroid);
        element.style.display = 'none';
        return;
      }

      // Check for collisions (only for active colliders)
      if (shouldCheck && asteroid.isCollider && asteroid.collisionState === 'active') {
        const collisionResult = checkCollision(
          { x: currentX, y: baseY },
          asteroid.size / 2
        );

        if (collisionResult) {
          // Start collision animation - save current position for stable animation
          asteroid.collisionState = 'colliding';
          asteroid.collisionStartTime = now;
          asteroid.collisionX = currentX;
          asteroid.collisionY = baseY;
          element.classList.add('asteroid-absorbing');

          // Trigger ripple effect on panel
          handleCollision(collisionResult);
        }
      }

      // Check if visible
      const isVisible = opacity > parallax.SPACE_OPACITY_THRESHOLD &&
                       baseY > -asteroid.size &&
                       baseY < viewportHeight + asteroid.size;

      if (!isVisible && asteroid.collisionState !== 'colliding') {
        element.style.display = 'none';
      } else {
        element.style.display = '';
        if (asteroid.collisionState !== 'colliding') {
          element.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
        }
        element.style.left = `${currentX}px`;
        element.style.top = `${baseY}px`;
        element.style.opacity = String(opacity);
      }
    });
  }, [docHeight, viewportHeight, viewportWidth, respawnAsteroid, shouldCheckThisFrame, checkCollision, handleCollision, handleScrollChange]);

  // Set up scroll listener
  useThrottledScroll(updatePositions);

  // Animation loop for continuous movement
  useEffect(() => {
    let frameCount = 0;

    const animate = () => {
      frameCount++;
      // Update at ~30fps (every other frame)
      if (frameCount % 2 === 0) {
        updatePositions(window.scrollY);
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [updatePositions]);

  // Ref callback for storing element references
  const setElementRef = useCallback((id: string, element: HTMLDivElement | null) => {
    if (element) {
      elementRefs.current.set(id, element);
    } else {
      elementRefs.current.delete(id);
    }
  }, []);

  // Separate asteroids into background and collider groups
  const backgroundAsteroids = asteroidsRef.current.filter(a => !a.isCollider);
  const colliderAsteroids = asteroidsRef.current.filter(a => a.isCollider);

  return (
    <>
      {/* Background asteroids - behind panels */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -16 }}>
        {backgroundAsteroids.map((asteroid) => (
          <div
            key={asteroid.id}
            ref={(el) => setElementRef(asteroid.id, el)}
            className="absolute pointer-events-none"
            style={{
              willChange: 'transform, opacity',
            }}
          >
            <Asteroid size={asteroid.size} variant={asteroid.variant} />
          </div>
        ))}
      </div>

      {/* Collider asteroids - in front of panels */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: COLLISION_CONFIG.colliderZIndex }}>
        {colliderAsteroids.map((asteroid) => (
          <div
            key={asteroid.id}
            ref={(el) => setElementRef(asteroid.id, el)}
            className="absolute pointer-events-none"
            style={{
              willChange: 'transform, opacity',
            }}
          >
            <Asteroid size={asteroid.size} variant={asteroid.variant} />
          </div>
        ))}
      </div>
    </>
  );
}

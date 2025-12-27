import { useEffect, useRef, useCallback } from 'react';
import { KuiperBeltObject } from './svg/celestial';
import { useThrottledScroll } from '../../hooks';
import { useWindowDimensions } from '../../hooks/useResizeListener';
import { APP_CONFIG } from '../../config/app';
import { randomInRange, generateId, clamp } from '../../utils/animation';

const { kuiperBelt: CONFIG, parallax } = APP_CONFIG;

type KBOVariant = 0 | 1 | 2 | 3 | 4 | 5;

interface BeltObject {
  id: string;
  spawnTime: number;
  startX: number;
  journeyPosition: number;
  velocityX: number;
  size: number;
  variant: KBOVariant;
  rotationSpeed: number;
  initialRotation: number;
  oscillationAmplitude: number;
  oscillationPeriod: number;
  oscillationPhase: number;
}

/**
 * Gaussian random using Box-Muller transform.
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
  const stdDev = (maxPos - minPos) / 4;
  return clamp(gaussianRandom(midpoint, stdDev), minPos, maxPos);
}

/**
 * Initialize all KBOs with random properties.
 */
function initializeObjects(viewportWidth: number): BeltObject[] {
  const objects: BeltObject[] = [];
  const now = performance.now();

  const totalWidth = viewportWidth + 200;
  const spacing = totalWidth / CONFIG.objectCount;

  for (let i = 0; i < CONFIG.objectCount; i++) {
    const size = randomInRange(...CONFIG.sizeRange);
    const speed = randomInRange(...CONFIG.speedRange);
    const velocityX = speed;

    const baseX = -100 + i * spacing;
    const jitter = randomInRange(-spacing * 0.4, spacing * 0.4);
    const targetX = baseX + jitter;

    const age = randomInRange(0, 30000);
    const staggeredSpawnTime = now - age;
    const startX = targetX - velocityX * age;

    const journeyPosition = generateBeltPosition();

    objects.push({
      id: generateId(),
      spawnTime: staggeredSpawnTime,
      startX,
      journeyPosition,
      velocityX,
      size,
      variant: Math.floor(Math.random() * 6) as KBOVariant,
      rotationSpeed: randomInRange(...CONFIG.rotationSpeedRange),
      initialRotation: randomInRange(0, 360),
      oscillationAmplitude: randomInRange(...CONFIG.oscillationAmplitude),
      oscillationPeriod: randomInRange(...CONFIG.oscillationPeriod),
      oscillationPhase: randomInRange(0, Math.PI * 2),
    });
  }

  return objects;
}

export function KuiperBelt() {
  const { height: viewportHeight, width: viewportWidth, docHeight } = useWindowDimensions();
  const objectsRef = useRef<BeltObject[]>([]);
  const elementRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const animationRef = useRef<number | null>(null);
  const isInitializedRef = useRef(false);

  // Initialize on mount
  useEffect(() => {
    if (!isInitializedRef.current && viewportWidth > 0) {
      objectsRef.current = initializeObjects(viewportWidth);
      isInitializedRef.current = true;
    }
  }, [viewportWidth]);

  // Respawn object when it goes off screen
  const respawnObject = useCallback((obj: BeltObject): BeltObject => {
    const size = randomInRange(...CONFIG.sizeRange);
    const speed = randomInRange(...CONFIG.speedRange);
    const startX = -size;
    const velocityX = speed;
    const journeyPosition = generateBeltPosition();

    return {
      ...obj,
      spawnTime: performance.now(),
      startX,
      journeyPosition,
      velocityX,
      size,
      variant: Math.floor(Math.random() * 6) as KBOVariant,
      rotationSpeed: randomInRange(...CONFIG.rotationSpeedRange),
      initialRotation: randomInRange(0, 360),
      oscillationAmplitude: randomInRange(...CONFIG.oscillationAmplitude),
      oscillationPeriod: randomInRange(...CONFIG.oscillationPeriod),
      oscillationPhase: randomInRange(0, Math.PI * 2),
    };
  }, []);

  // Update positions via direct DOM manipulation
  const updatePositions = useCallback((scrollY: number) => {
    const now = performance.now();
    const centerY = viewportHeight * parallax.VIEWPORT_CENTER_RATIO;
    const maxDistance = viewportHeight * parallax.MAX_DISTANCE_RATIO;

    objectsRef.current.forEach((obj, index) => {
      const element = elementRefs.current.get(obj.id);
      if (!element) return;

      const elapsed = now - obj.spawnTime;

      // Calculate oscillation progress
      const oscillationProgress = (elapsed / obj.oscillationPeriod) * Math.PI * 2 + obj.oscillationPhase;

      // Position calculation
      const currentX = obj.startX + obj.velocityX * elapsed;
      const oscillationOffset = obj.oscillationAmplitude * Math.sin(oscillationProgress);
      const documentY = obj.journeyPosition * docHeight + oscillationOffset;
      const baseY = documentY - scrollY * CONFIG.parallaxSpeed * parallax.SPACE_ELEMENTS_MULTIPLIER;

      // Calculate opacity based on distance from viewport center
      const distanceFromCenter = Math.abs(baseY - centerY);
      let opacity = Math.max(0, 1 - distanceFromCenter / maxDistance) * CONFIG.maxOpacity;

      // Direction-change fade (same as asteroid belt)
      const oscillationVelocity = Math.cos(oscillationProgress);
      const velocityMagnitude = Math.abs(oscillationVelocity);
      opacity *= Math.pow(velocityMagnitude, CONFIG.fadePower);

      // Calculate rotation
      const rotation = obj.initialRotation + (elapsed / 1000) * obj.rotationSpeed;

      // Check if needs respawning (off screen horizontally)
      const buffer = obj.size * 2;
      const isOffScreen = currentX < -buffer || currentX > viewportWidth + buffer;

      if (isOffScreen) {
        objectsRef.current[index] = respawnObject(obj);
        element.style.display = 'none';
        return;
      }

      // Check if visible
      const isVisible = opacity > parallax.SPACE_OPACITY_THRESHOLD &&
                       baseY > -obj.size &&
                       baseY < viewportHeight + obj.size;

      if (!isVisible) {
        element.style.display = 'none';
      } else {
        element.style.display = '';
        element.style.transform = `translate(${currentX}px, ${baseY}px) translate(-50%, -50%) rotate(${rotation}deg)`;
        element.style.opacity = String(opacity);
      }
    });
  }, [docHeight, viewportHeight, viewportWidth, respawnObject]);

  // Set up scroll listener
  useThrottledScroll(updatePositions);

  // Animation loop for continuous movement
  useEffect(() => {
    let frameCount = 0;

    const animate = () => {
      frameCount++;
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

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -17 }}>
      {objectsRef.current.map((obj) => (
        <div
          key={obj.id}
          ref={(el) => setElementRef(obj.id, el)}
          className="absolute pointer-events-none"
          style={{
            left: 0,
            top: 0,
            willChange: 'transform, opacity',
          }}
        >
          <KuiperBeltObject size={obj.size} variant={obj.variant} />
        </div>
      ))}
    </div>
  );
}

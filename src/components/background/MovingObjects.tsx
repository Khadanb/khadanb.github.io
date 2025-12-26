import { useEffect, useRef, useCallback, useReducer } from 'react';
import { Comet, Asteroid, Satellite } from './svg/celestial';
import { useScrollContext } from '../../context/ScrollContext';
import { APP_CONFIG } from '../../config/app';
import { randomInRange, generateId } from '../../utils/animation';

const { movingObjects: CONFIG } = APP_CONFIG;

type ObjectType = 'comet' | 'asteroid' | 'satellite';
type AsteroidVariant = 0 | 1 | 2;

interface MovingObject {
  id: string;
  type: ObjectType;
  spawnTime: number;
  startX: number;
  startY: number;
  velocityX: number;
  velocityY: number;
  size: number;
  rotation: number;
  variant?: AsteroidVariant;
}

// Cleanup interval - check for dead objects every 500ms instead of every frame
const CLEANUP_INTERVAL_MS = 500;

export function MovingObjects() {
  // Use ref for internal object tracking (no re-renders on update)
  const objectsRef = useRef<MovingObject[]>([]);
  // Force re-render trigger (increments on each animation frame)
  const [, forceRender] = useReducer((x: number) => x + 1, 0);
  const { getScrollY } = useScrollContext();
  const animationFrameRef = useRef<number | null>(null);
  const cleanupIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Spawn a new object (updates ref and triggers render)
  const spawnObject = useCallback((type: ObjectType) => {
    const config = CONFIG[type];
    const now = performance.now();

    // Check if we've hit the max for this type
    const activeOfType = objectsRef.current.filter(obj => obj.type === type);
    if (activeOfType.length >= config.maxActive) return;

    const size = randomInRange(...config.sizeRange);
    const speed = randomInRange(...config.speed);
    const angleDeg = randomInRange(...config.angleRange);
    const angleRad = (angleDeg * Math.PI) / 180;

    // Determine spawn edge (left or right)
    const fromLeft = Math.random() > 0.5;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Start position
    const startX = fromLeft ? -size : viewportWidth + size;

    // Random Y position in document space (within current view + some buffer)
    const currentScrollY = getScrollY();
    const startY = currentScrollY + randomInRange(-viewportHeight * 0.2, viewportHeight * 1.2);

    // Velocity - positive X if from left, negative if from right
    const velocityX = fromLeft ? speed : -speed;
    // Y velocity can go up or down
    const velocityY = (Math.random() > 0.5 ? 1 : -1) * speed * Math.tan(angleRad);

    // Rotation to point in direction of travel
    const rotation = (Math.atan2(velocityY, velocityX) * 180) / Math.PI;

    const newObject: MovingObject = {
      id: generateId(),
      type,
      spawnTime: now,
      startX,
      startY,
      velocityX,
      velocityY,
      size,
      rotation,
      variant: type === 'asteroid' ? (Math.floor(Math.random() * 3) as AsteroidVariant) : undefined,
    };

    objectsRef.current = [...objectsRef.current, newObject];
    forceRender();
  }, [getScrollY]);

  // Animation loop - triggers re-render at throttled rate for smooth movement
  // Using ~30fps (every other frame) to reduce CPU load while staying smooth
  useEffect(() => {
    let frameCount = 0;
    const animate = () => {
      frameCount++;
      // Only render every other frame (~30fps)
      if (frameCount % 2 === 0) {
        forceRender();
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Cleanup loop - runs periodically to remove dead objects (not every frame)
  useEffect(() => {
    const cleanup = () => {
      const now = performance.now();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const scrollY = getScrollY();

      const beforeCount = objectsRef.current.length;
      objectsRef.current = objectsRef.current.filter(obj => {
        const elapsed = now - obj.spawnTime;
        const currentX = obj.startX + obj.velocityX * elapsed;
        const currentDocY = obj.startY + obj.velocityY * elapsed;
        const viewportY = currentDocY - scrollY;

        const buffer = obj.size * 2;
        const isVisible =
          currentX > -buffer &&
          currentX < viewportWidth + buffer &&
          viewportY > -buffer * 3 &&
          viewportY < viewportHeight + buffer * 3;

        const isAlive = elapsed < CONFIG.MAX_LIFETIME_MS;
        return isVisible && isAlive;
      });

      // Only force render if objects were actually removed
      if (objectsRef.current.length !== beforeCount) {
        forceRender();
      }
    };

    cleanupIntervalRef.current = setInterval(cleanup, CLEANUP_INTERVAL_MS);
    return () => {
      if (cleanupIntervalRef.current) {
        clearInterval(cleanupIntervalRef.current);
      }
    };
  }, [getScrollY]);

  // Spawn timers for each object type
  useEffect(() => {
    const spawnTimers: ReturnType<typeof setTimeout>[] = [];

    const scheduleSpawn = (type: ObjectType) => {
      const config = CONFIG[type];
      const delay = randomInRange(...config.spawnInterval);

      const timer = setTimeout(() => {
        spawnObject(type);
        scheduleSpawn(type);
      }, delay);

      spawnTimers.push(timer);
    };

    scheduleSpawn('comet');
    scheduleSpawn('asteroid');
    scheduleSpawn('satellite');

    setTimeout(() => spawnObject('asteroid'), CONFIG.initialSpawnDelays.asteroid);
    setTimeout(() => spawnObject('comet'), CONFIG.initialSpawnDelays.comet);
    setTimeout(() => spawnObject('satellite'), CONFIG.initialSpawnDelays.satellite);

    return () => {
      spawnTimers.forEach(timer => clearTimeout(timer));
    };
  }, [spawnObject]);

  const scrollY = getScrollY();
  const now = performance.now();
  const viewportHeight = window.innerHeight;
  const fadeZone = viewportHeight * 0.15;

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -15 }}>
      {objectsRef.current.map(obj => {
        const elapsed = now - obj.spawnTime;
        const currentX = obj.startX + obj.velocityX * elapsed;
        const currentDocY = obj.startY + obj.velocityY * elapsed;
        const viewportY = currentDocY - scrollY;

        // Calculate opacity based on viewport position
        let opacity = 1;
        if (viewportY < fadeZone) {
          opacity = Math.max(0, viewportY / fadeZone);
        } else if (viewportY > viewportHeight - fadeZone) {
          opacity = Math.max(0, (viewportHeight - viewportY) / fadeZone);
        }

        return (
          <div
            key={obj.id}
            style={{
              position: 'fixed',
              left: currentX,
              top: viewportY,
              transform: `rotate(${obj.rotation}deg)`,
              opacity: Math.min(opacity, 0.85),
              willChange: 'transform',
              pointerEvents: 'none',
            }}
          >
            {obj.type === 'comet' && <Comet size={obj.size} />}
            {obj.type === 'asteroid' && obj.variant !== undefined && (
              <Asteroid size={obj.size} variant={obj.variant} />
            )}
            {obj.type === 'satellite' && <Satellite size={obj.size} />}
          </div>
        );
      })}
    </div>
  );
}

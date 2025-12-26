import { useState, useEffect, useRef, useCallback } from 'react';
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

export function MovingObjects() {
  const [objects, setObjects] = useState<MovingObject[]>([]);
  const { getScrollY } = useScrollContext();
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  // Spawn a new object
  const spawnObject = useCallback((type: ObjectType) => {
    const config = CONFIG[type];
    const now = performance.now();

    // Check if we've hit the max for this type
    setObjects(prev => {
      const activeOfType = prev.filter(obj => obj.type === type);
      if (activeOfType.length >= config.maxActive) return prev;

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
      // atan2 gives angle of velocity vector; SVG has head pointing right (0°)
      // So this rotation naturally points the head in direction of travel
      // and the tail trails behind
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

      return [...prev, newObject];
    });
  }, [getScrollY]);

  // Animation loop
  useEffect(() => {
    const animate = (currentTime: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = currentTime;

      setObjects(prev => {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const scrollY = getScrollY();

        return prev.filter(obj => {
          const elapsed = currentTime - obj.spawnTime;
          const currentX = obj.startX + obj.velocityX * elapsed;
          const currentDocY = obj.startY + obj.velocityY * elapsed;

          // Convert to viewport Y (scroll compensation)
          const viewportY = currentDocY - scrollY;

          // Check if object is still visible (with generous buffer for off-screen removal)
          const buffer = obj.size * 2;
          const isVisible =
            currentX > -buffer &&
            currentX < viewportWidth + buffer &&
            viewportY > -buffer * 3 &&
            viewportY < viewportHeight + buffer * 3;

          // Also remove if it's been traveling for too long (safety limit)
          const isAlive = elapsed < CONFIG.MAX_LIFETIME_MS;

          return isVisible && isAlive;
        });
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
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
        scheduleSpawn(type); // Schedule next spawn
      }, delay);

      spawnTimers.push(timer);
    };

    // Start spawn cycles for each type
    scheduleSpawn('comet');
    scheduleSpawn('asteroid');
    scheduleSpawn('satellite');

    // Spawn one of each type initially after a short delay
    setTimeout(() => spawnObject('asteroid'), CONFIG.initialSpawnDelays.asteroid);
    setTimeout(() => spawnObject('comet'), CONFIG.initialSpawnDelays.comet);
    setTimeout(() => spawnObject('satellite'), CONFIG.initialSpawnDelays.satellite);

    return () => {
      spawnTimers.forEach(timer => clearTimeout(timer));
    };
  }, [spawnObject]);

  const scrollY = getScrollY();

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -15 }}>
      {objects.map(obj => {
        const now = performance.now();
        const elapsed = now - obj.spawnTime;
        const currentX = obj.startX + obj.velocityX * elapsed;
        const currentDocY = obj.startY + obj.velocityY * elapsed;
        const viewportY = currentDocY - scrollY;

        // Calculate opacity based on viewport position (fade in/out at edges)
        const viewportHeight = window.innerHeight;
        const fadeZone = viewportHeight * 0.15;
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
              opacity: Math.min(opacity, 0.85), // Cap max opacity for subtlety
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

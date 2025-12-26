import { useEffect, useRef, useReducer, useCallback } from 'react';

/**
 * Options for the animation loop.
 */
export interface AnimationLoopOptions {
  /** How often to trigger render (1 = every frame, 2 = every other frame for ~30fps) */
  throttleFrames?: number;
  /** Whether to start the animation immediately */
  autoStart?: boolean;
}

/**
 * Hook that provides a managed animation loop with throttling.
 * Consolidates the animation loop pattern from MovingObjects and AsteroidBelt.
 *
 * @param onFrame - Optional callback called on each rendered frame
 * @param options - Animation loop configuration
 *
 * @returns An object with:
 *   - forceRender: Function to trigger a re-render
 *   - isRunning: Whether the animation loop is active
 *   - start: Function to start the animation
 *   - stop: Function to stop the animation
 *
 * @example
 * ```tsx
 * const { forceRender } = useAnimationLoop({
 *   throttleFrames: 2, // ~30fps
 * });
 * ```
 */
export function useAnimationLoop(
  onFrame?: () => void,
  options: AnimationLoopOptions = {}
) {
  const { throttleFrames = 2, autoStart = true } = options;

  const animationFrameRef = useRef<number | null>(null);
  const frameCountRef = useRef(0);
  const isRunningRef = useRef(false);
  const [, forceRender] = useReducer((x: number) => x + 1, 0);

  const stop = useCallback(() => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    isRunningRef.current = false;
  }, []);

  const start = useCallback(() => {
    if (isRunningRef.current) return;

    isRunningRef.current = true;
    frameCountRef.current = 0;

    const animate = () => {
      if (!isRunningRef.current) return;

      frameCountRef.current++;

      // Only render on throttled frames
      if (frameCountRef.current % throttleFrames === 0) {
        onFrame?.();
        forceRender();
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [throttleFrames, onFrame]);

  useEffect(() => {
    if (autoStart) {
      start();
    }

    return stop;
  }, [autoStart, start, stop]);

  return {
    forceRender,
    isRunning: isRunningRef.current,
    start,
    stop,
  };
}

/**
 * Hook that provides a cleanup interval for removing dead objects.
 * Runs periodically instead of every frame to reduce CPU load.
 *
 * @param cleanup - Function to run periodically
 * @param intervalMs - Interval in milliseconds (default 500ms)
 */
export function useCleanupInterval(
  cleanup: () => boolean | void,
  intervalMs: number = 500,
  forceRender?: () => void
) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const shouldRender = cleanup();
      if (shouldRender && forceRender) {
        forceRender();
      }
    }, intervalMs);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [cleanup, intervalMs, forceRender]);
}

/**
 * Hook that manages spawn timers for multiple object types.
 * Handles initial delays and recurring spawn intervals.
 *
 * @param spawnConfigs - Configuration for each object type to spawn
 */
export interface SpawnConfig {
  type: string;
  spawnInterval: [number, number];
  initialDelay: number;
  spawn: () => void;
}

export function useSpawnTimers(configs: SpawnConfig[]) {
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    const scheduleSpawn = (config: SpawnConfig) => {
      const [minInterval, maxInterval] = config.spawnInterval;
      const delay = minInterval + Math.random() * (maxInterval - minInterval);

      const timer = setTimeout(() => {
        config.spawn();
        scheduleSpawn(config);
      }, delay);

      timers.push(timer);
    };

    // Schedule initial spawns with delays
    configs.forEach(config => {
      // Initial spawn after delay
      const initialTimer = setTimeout(() => {
        config.spawn();
      }, config.initialDelay);
      timers.push(initialTimer);

      // Start recurring spawns
      scheduleSpawn(config);
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [configs]);
}

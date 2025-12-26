/**
 * Animation utilities for requestAnimationFrame-based animations.
 */

/**
 * Creates a managed animation loop with proper cleanup.
 * Returns a cleanup function that cancels the animation.
 *
 * @param callback - Called each frame with delta time in seconds
 * @returns Cleanup function to stop the animation
 */
export function createAnimationLoop(
  callback: (deltaTime: number, timestamp: number) => void
): () => void {
  let animationFrameId: number | null = null;
  let lastTimestamp = 0;

  const animate = (timestamp: number) => {
    const deltaTime = lastTimestamp ? (timestamp - lastTimestamp) / 1000 : 0;
    lastTimestamp = timestamp;

    callback(deltaTime, timestamp);
    animationFrameId = requestAnimationFrame(animate);
  };

  animationFrameId = requestAnimationFrame(animate);

  return () => {
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  };
}

/**
 * Common easing functions for animations.
 */
export const easing = {
  /** Linear interpolation (no easing) */
  linear: (t: number): number => t,

  /** Quadratic ease in */
  easeInQuad: (t: number): number => t * t,

  /** Quadratic ease out */
  easeOutQuad: (t: number): number => t * (2 - t),

  /** Quadratic ease in-out */
  easeInOutQuad: (t: number): number =>
    t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,

  /** Cubic ease out */
  easeOutCubic: (t: number): number => 1 - Math.pow(1 - t, 3),

  /** Cubic ease in-out */
  easeInOutCubic: (t: number): number =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
} as const;

/**
 * Clamps a value between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Linear interpolation between two values.
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

/**
 * Generates a random number within a range.
 */
export function randomInRange(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

/**
 * Generates a unique ID for animation objects.
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}

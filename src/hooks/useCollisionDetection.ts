import { useRef, useCallback } from 'react';
import { useCollisionContext } from '../context/CollisionContext';
import {
  isCircleIntersectingRect,
  getCollisionPoint,
  toLocalCoordinates,
  isBoundsInViewport,
  type Point,
} from '../utils/collision';
import { APP_CONFIG } from '../config/app';

const { collision: CONFIG } = APP_CONFIG;

export interface CollisionResult {
  panelId: string;
  collisionPoint: Point;
  localPoint: Point;
}

/**
 * Hook that provides collision detection functionality for asteroids.
 * Includes throttling, bounds caching, and ripple triggering.
 */
export function useCollisionDetection() {
  const { getPanelBounds, triggerRipple, invalidateBoundsCache } = useCollisionContext();
  const frameCountRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const scrollStopTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Invalidate bounds cache when scroll stops (panels may have moved)
  const handleScrollChange = useCallback((scrollY: number) => {
    if (scrollY !== lastScrollYRef.current) {
      lastScrollYRef.current = scrollY;

      if (scrollStopTimeoutRef.current) {
        clearTimeout(scrollStopTimeoutRef.current);
      }

      scrollStopTimeoutRef.current = setTimeout(() => {
        invalidateBoundsCache();
      }, CONFIG.boundsCacheInvalidationDelay);
    }
  }, [invalidateBoundsCache]);

  // Check if we should perform collision detection this frame (throttling)
  const shouldCheckThisFrame = useCallback((): boolean => {
    frameCountRef.current++;
    return frameCountRef.current % CONFIG.checkIntervalFrames === 0;
  }, []);

  // Check collision for a single asteroid against all panels
  const checkCollision = useCallback((
    asteroidCenter: Point,
    asteroidRadius: number
  ): CollisionResult | null => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const panelBounds = getPanelBounds();

    for (const [panelId, bounds] of panelBounds) {
      // Skip panels outside viewport for performance
      if (!isBoundsInViewport(bounds, viewportWidth, viewportHeight)) {
        continue;
      }

      if (isCircleIntersectingRect(asteroidCenter, asteroidRadius, bounds)) {
        const collisionPoint = getCollisionPoint(asteroidCenter, bounds);
        const localPoint = toLocalCoordinates(collisionPoint, bounds);

        return { panelId, collisionPoint, localPoint };
      }
    }

    return null;
  }, [getPanelBounds]);

  // Handle a collision by triggering the ripple effect
  const handleCollision = useCallback((result: CollisionResult) => {
    triggerRipple(result.panelId, result.localPoint);
  }, [triggerRipple]);

  return {
    checkCollision,
    shouldCheckThisFrame,
    handleCollision,
    handleScrollChange,
  };
}

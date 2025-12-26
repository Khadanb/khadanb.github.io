import { useCallback } from 'react';
import type { CollisionProperties } from '../types/collision';
import type { CollisionResult } from './useCollisionDetection';
import { easing } from '../utils/animation';
import { APP_CONFIG } from '../config/app';

const { collision: COLLISION_CONFIG } = APP_CONFIG;

/**
 * Result of processing collision animation state.
 */
export interface CollisionAnimationState {
  /** Current scale (1 = normal, 0 = fully absorbed) */
  scale: number;
  /** Position X during collision (decelerated) */
  positionX: number;
  /** Position Y during collision (decelerated) */
  positionY: number;
  /** Whether the object should transition to 'absorbed' state */
  shouldAbsorb: boolean;
  /** Decay multiplier for velocity */
  decayMultiplier: number;
}

/**
 * Calculate animation state for an object that is currently colliding.
 * Handles the slowdown and shrinking animation phases.
 *
 * @param collisionStartTime - When the collision started
 * @param collisionX - X position at collision time
 * @param collisionY - Y position at collision time
 * @param velocityX - Object's X velocity
 * @param velocityY - Object's Y velocity
 * @param now - Current timestamp
 *
 * @returns Animation state including scale and decelerated position
 */
export function calculateCollisionAnimation(
  collisionStartTime: number,
  collisionX: number,
  collisionY: number,
  velocityX: number,
  velocityY: number,
  now: number
): CollisionAnimationState {
  const collisionElapsed = now - collisionStartTime;
  const progress = Math.min(collisionElapsed / COLLISION_CONFIG.absorptionDuration, 1);
  const decayMultiplier = 1 - easing.easeOutCubic(progress);

  // Calculate decelerated position
  const positionX = collisionX + velocityX * collisionElapsed * decayMultiplier * 0.3;
  const positionY = collisionY + velocityY * collisionElapsed * decayMultiplier * 0.3;

  // Calculate scale (shrinking phase starts after 200ms)
  let scale = 1;
  let shouldAbsorb = false;

  if (collisionElapsed > 200) {
    const shrinkProgress = (collisionElapsed - 200) / (COLLISION_CONFIG.absorptionDuration - 200);
    scale = 1 - easing.easeOutCubic(Math.min(shrinkProgress, 1));

    if (scale <= 0.05) {
      shouldAbsorb = true;
      scale = 0;
    }
  }

  return {
    scale,
    positionX,
    positionY,
    shouldAbsorb,
    decayMultiplier,
  };
}

/**
 * Hook that provides collision state management utilities.
 * Consolidates collision logic from MovingObjects and AsteroidBelt.
 *
 * @returns Functions for managing collision state
 */
export function useCollisionState() {
  /**
   * Start a collision for an object.
   * Updates the object's collision properties in place.
   */
  const startCollision = useCallback(<T extends CollisionProperties>(
    obj: T,
    currentX: number,
    currentY: number,
    now: number
  ): void => {
    obj.collisionState = 'colliding';
    obj.collisionStartTime = now;
    obj.collisionX = currentX;
    obj.collisionY = currentY;
  }, []);

  /**
   * Mark an object as absorbed.
   */
  const markAbsorbed = useCallback(<T extends CollisionProperties>(obj: T): void => {
    obj.collisionState = 'absorbed';
  }, []);

  /**
   * Reset collision properties for respawning.
   */
  const resetCollision = useCallback(<T extends CollisionProperties>(
    obj: T,
    isCollider: boolean
  ): void => {
    obj.isCollider = isCollider;
    obj.collisionState = isCollider ? 'active' : null;
    obj.collisionStartTime = null;
    obj.collisionX = null;
    obj.collisionY = null;
  }, []);

  /**
   * Check if an object should be checked for collisions.
   */
  const canCollide = useCallback(<T extends CollisionProperties>(obj: T): boolean => {
    return obj.isCollider && obj.collisionState === 'active';
  }, []);

  /**
   * Process collision check and state transition.
   * Returns true if a collision was detected.
   */
  const processCollision = useCallback(<T extends CollisionProperties>(
    obj: T,
    currentX: number,
    currentY: number,
    checkCollision: (center: { x: number; y: number }, radius: number) => CollisionResult | null,
    size: number,
    now: number,
    onCollision?: (result: CollisionResult) => void
  ): boolean => {
    if (!canCollide(obj)) return false;

    const collisionResult = checkCollision(
      { x: currentX, y: currentY },
      size / 2
    );

    if (collisionResult) {
      startCollision(obj, currentX, currentY, now);
      onCollision?.(collisionResult);
      return true;
    }

    return false;
  }, [canCollide, startCollision]);

  return {
    startCollision,
    markAbsorbed,
    resetCollision,
    canCollide,
    processCollision,
    calculateCollisionAnimation,
  };
}

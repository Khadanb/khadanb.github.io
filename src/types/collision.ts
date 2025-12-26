/**
 * Shared collision types for animated objects (asteroids, moving objects).
 * Consolidates duplicate type definitions from MovingObjects and AsteroidBelt.
 */

// Re-export geometric types from collision utils
export type { Bounds, Point } from '../utils/collision';
export type { CollisionResult } from '../hooks/useCollisionDetection';

/**
 * Collision state machine states.
 * - 'active': Object can detect and respond to collisions
 * - 'colliding': Object is currently animating collision/absorption
 * - 'absorbed': Object has completed absorption animation
 * - null: Object is not a collider (passes through panels)
 */
export type CollisionState = 'active' | 'colliding' | 'absorbed' | null;

/**
 * Common collision properties shared between MovingObjects and AsteroidBelt.
 * Extract these to a mixin interface for reuse.
 */
export interface CollisionProperties {
  /** Whether this object can collide with panels */
  isCollider: boolean;
  /** Current state in the collision state machine */
  collisionState: CollisionState;
  /** Timestamp when collision started (for animation timing) */
  collisionStartTime: number | null;
  /** X position at collision time (for stable animation) */
  collisionX: number | null;
  /** Y position at collision time (for stable animation) */
  collisionY: number | null;
}

/**
 * Base properties for all animated moving objects.
 */
export interface AnimatedObjectBase {
  id: string;
  spawnTime: number;
  startX: number;
  velocityX: number;
  velocityY: number;
  size: number;
}

/**
 * Complete base type combining animated object + collision properties.
 */
export interface AnimatedColliderBase extends AnimatedObjectBase, CollisionProperties {}

/**
 * Configuration for collision behavior.
 */
export interface CollisionConfig {
  minColliderSize: number;
  colliderRatio: number;
  colliderSizeMultiplier: number;
  colliderSpeedMultiplier: number;
  absorptionDuration: number;
  colliderZIndex: number;
  checkIntervalFrames: number;
}

/**
 * Result of processing an animated object for rendering.
 */
export interface ProcessedObject<T extends AnimatedObjectBase> {
  obj: T;
  currentX: number;
  viewportY: number;
  opacity: number;
  scale: number;
  shouldRender: boolean;
}

/**
 * Default collision properties for a new collider.
 */
export function createCollisionProperties(isCollider: boolean): CollisionProperties {
  return {
    isCollider,
    collisionState: isCollider ? 'active' : null,
    collisionStartTime: null,
    collisionX: null,
    collisionY: null,
  };
}

/**
 * Reset collision properties (for respawning).
 */
export function resetCollisionProperties(isCollider: boolean): CollisionProperties {
  return createCollisionProperties(isCollider);
}

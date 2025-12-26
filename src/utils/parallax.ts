/**
 * Parallax and position calculation utilities.
 * Consolidates duplicate calculations from MovingObjects, AsteroidBelt, and SpaceElements.
 */

import { APP_CONFIG } from '../config/app';

const { parallax: PARALLAX_CONFIG } = APP_CONFIG;

/**
 * Configuration for parallax/visibility calculations.
 */
export interface ParallaxConfig {
  viewportHeight: number;
  centerRatio?: number;
  maxDistanceRatio?: number;
  opacityThreshold?: number;
}

/**
 * Result of viewport position calculation.
 */
export interface ViewportPosition {
  /** Viewport Y position */
  viewportY: number;
  /** Calculated opacity based on distance from center */
  opacity: number;
  /** Whether the element is visible */
  isVisible: boolean;
}

/**
 * Calculate viewport Y position from document Y with parallax effect.
 * Used by SpaceElements and AsteroidBelt for parallax scrolling.
 */
export function calculateParallaxY(
  documentY: number,
  scrollY: number,
  parallaxSpeed: number,
  multiplier: number = PARALLAX_CONFIG.SPACE_ELEMENTS_MULTIPLIER
): number {
  return documentY - scrollY * parallaxSpeed * multiplier;
}

/**
 * Calculate viewport Y position without parallax (for MovingObjects).
 */
export function calculateViewportY(documentY: number, scrollY: number): number {
  return documentY - scrollY;
}

/**
 * Calculate opacity based on distance from viewport center.
 * Used by SpaceElements and AsteroidBelt.
 */
export function calculateCenterBasedOpacity(
  viewportY: number,
  config: ParallaxConfig
): number {
  const centerY = config.viewportHeight * (config.centerRatio ?? PARALLAX_CONFIG.VIEWPORT_CENTER_RATIO);
  const maxDistance = config.viewportHeight * (config.maxDistanceRatio ?? PARALLAX_CONFIG.MAX_DISTANCE_RATIO);
  const distanceFromCenter = Math.abs(viewportY - centerY);

  return Math.max(0, 1 - distanceFromCenter / maxDistance);
}

/**
 * Calculate opacity based on edge fade zones (for MovingObjects).
 * Fades near top and bottom edges.
 */
export function calculateEdgeFadeOpacity(
  viewportY: number,
  viewportHeight: number,
  fadeZoneRatio: number = 0.15
): number {
  const fadeZone = viewportHeight * fadeZoneRatio;

  if (viewportY < fadeZone) {
    return Math.max(0, viewportY / fadeZone);
  } else if (viewportY > viewportHeight - fadeZone) {
    return Math.max(0, (viewportHeight - viewportY) / fadeZone);
  }

  return 1;
}

/**
 * Check if an element is visible in the viewport.
 */
export function isInViewport(
  viewportY: number,
  size: number,
  viewportHeight: number,
  bufferMultiplier: number = 1
): boolean {
  const buffer = size * bufferMultiplier;
  return viewportY > -buffer && viewportY < viewportHeight + buffer;
}

/**
 * Check if an element is visible horizontally.
 */
export function isInViewportHorizontal(
  x: number,
  size: number,
  viewportWidth: number,
  bufferMultiplier: number = 2
): boolean {
  const buffer = size * bufferMultiplier;
  return x > -buffer && x < viewportWidth + buffer;
}

/**
 * Calculate complete visibility state for a parallax element.
 */
export function calculateVisibility(
  viewportY: number,
  opacity: number,
  size: number,
  viewportHeight: number,
  opacityThreshold: number = PARALLAX_CONFIG.SPACE_OPACITY_THRESHOLD
): boolean {
  return opacity > opacityThreshold && isInViewport(viewportY, size, viewportHeight);
}

/**
 * Calculate current position for a moving object.
 */
export function calculateObjectPosition(
  startX: number,
  startY: number,
  velocityX: number,
  velocityY: number,
  elapsed: number
): { x: number; y: number } {
  return {
    x: startX + velocityX * elapsed,
    y: startY + velocityY * elapsed,
  };
}

/**
 * Calculate decelerated position during collision animation.
 */
export function calculateDeceleratedPosition(
  collisionX: number,
  collisionY: number,
  velocityX: number,
  velocityY: number,
  collisionElapsed: number,
  decayMultiplier: number
): { x: number; y: number } {
  return {
    x: collisionX + velocityX * collisionElapsed * decayMultiplier * 0.3,
    y: collisionY + velocityY * collisionElapsed * decayMultiplier * 0.3,
  };
}

/**
 * Determine if an object should be respawned (off-screen check).
 */
export function shouldRespawn(
  x: number,
  viewportY: number | null,
  size: number,
  viewportWidth: number,
  viewportHeight: number,
  maxLifetimeMs?: number,
  elapsed?: number
): boolean {
  const buffer = size * 2;

  // Check horizontal bounds
  const isOffScreenX = x < -buffer || x > viewportWidth + buffer;

  // Check vertical bounds if Y is provided
  const isOffScreenY = viewportY !== null
    ? viewportY < -buffer * 3 || viewportY > viewportHeight + buffer * 3
    : false;

  // Check lifetime
  const isExpired = maxLifetimeMs && elapsed ? elapsed >= maxLifetimeMs : false;

  return isOffScreenX || isOffScreenY || isExpired;
}

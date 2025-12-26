/**
 * Collision detection utilities for asteroid-panel interactions.
 */

export interface Bounds {
  left: number;
  top: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
}

export interface Point {
  x: number;
  y: number;
}

/**
 * Check if a circle (asteroid) overlaps with a rectangle (panel).
 * Uses circle-AABB collision detection.
 */
export function isCircleIntersectingRect(
  center: Point,
  radius: number,
  bounds: Bounds
): boolean {
  // Find the closest point on the rectangle to the circle center
  const closestX = Math.max(bounds.left, Math.min(center.x, bounds.right));
  const closestY = Math.max(bounds.top, Math.min(center.y, bounds.bottom));

  // Calculate distance from circle center to closest point
  const distanceX = center.x - closestX;
  const distanceY = center.y - closestY;
  const distanceSquared = distanceX * distanceX + distanceY * distanceY;

  return distanceSquared <= radius * radius;
}

/**
 * Get the collision point (where asteroid first contacts panel edge).
 */
export function getCollisionPoint(
  center: Point,
  bounds: Bounds
): Point {
  // Return the closest point on the panel to the asteroid center
  return {
    x: Math.max(bounds.left, Math.min(center.x, bounds.right)),
    y: Math.max(bounds.top, Math.min(center.y, bounds.bottom)),
  };
}

/**
 * Convert viewport-relative collision point to panel-local coordinates.
 */
export function toLocalCoordinates(
  globalPoint: Point,
  panelBounds: Bounds
): Point {
  return {
    x: globalPoint.x - panelBounds.left,
    y: globalPoint.y - panelBounds.top,
  };
}

/**
 * Check if bounds are visible in viewport.
 */
export function isBoundsInViewport(
  bounds: Bounds,
  viewportWidth: number,
  viewportHeight: number
): boolean {
  return (
    bounds.right >= 0 &&
    bounds.left <= viewportWidth &&
    bounds.bottom >= 0 &&
    bounds.top <= viewportHeight
  );
}

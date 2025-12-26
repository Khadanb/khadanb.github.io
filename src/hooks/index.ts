export { useScrollSpy } from './useScrollSpy';
export type { SectionId } from './useScrollSpy';
export { useThrottledScroll, useScrollY } from './useThrottledScroll';
export { useWindowDimensions, useResizeListener } from './useResizeListener';
export { useIntersectionObserver, useIntersectionCallback } from './useIntersectionObserver';
export { useWindowEvent, useScrollEvent, useResizeEvent } from './useWindowEvent';
export { useCollisionDetection, type CollisionResult } from './useCollisionDetection';

// New shared hooks for reducing redundancy
export { usePanelRegistration } from './usePanelRegistration';
export { useElementRefMap } from './useElementRefMap';
export {
  useAnimationLoop,
  useCleanupInterval,
  useSpawnTimers,
  type AnimationLoopOptions,
  type SpawnConfig,
} from './useAnimatedObjects';
export {
  useCollisionState,
  calculateCollisionAnimation,
  type CollisionAnimationState,
} from './useCollisionState';

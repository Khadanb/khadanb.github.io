import { createContext, useContext } from 'react';
import type { Bounds, Point } from '../utils/collision';

export interface CollisionContextValue {
  /** Register a panel element for collision detection */
  registerPanel: (id: string, element: HTMLElement) => void;
  /** Unregister a panel element */
  unregisterPanel: (id: string) => void;
  /** Get cached bounds for all panels (updates cache if invalidated) */
  getPanelBounds: () => Map<string, Bounds>;
  /** Trigger a ripple effect at the specified point on a panel */
  triggerRipple: (panelId: string, localPoint: Point) => void;
  /** Mark the bounds cache as needing update */
  invalidateBoundsCache: () => void;
}

export const CollisionContext = createContext<CollisionContextValue | null>(null);

/**
 * Hook to access collision context.
 * Returns methods to register panels, get bounds, and trigger ripples.
 */
export function useCollisionContext(): CollisionContextValue {
  const context = useContext(CollisionContext);
  if (!context) {
    throw new Error('useCollisionContext must be used within CollisionProvider');
  }
  return context;
}

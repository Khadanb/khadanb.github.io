import { createContext, useContext, useRef, useCallback, type ReactNode } from 'react';
import { useResizeListener } from '../hooks/useResizeListener';
import type { Bounds, Point } from '../utils/collision';
import { APP_CONFIG } from '../config/app';

const { collision: CONFIG } = APP_CONFIG;

interface PanelEntry {
  element: HTMLElement;
  bounds: Bounds;
}

interface CollisionContextValue {
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

const CollisionContext = createContext<CollisionContextValue | null>(null);

interface CollisionProviderProps {
  children: ReactNode;
}

/**
 * Provides collision detection infrastructure for asteroids and panels.
 * Manages panel registration, bounds caching, and ripple effects.
 */
export function CollisionProvider({ children }: CollisionProviderProps) {
  const panelsRef = useRef<Map<string, PanelEntry>>(new Map());
  const cacheValidRef = useRef(false);

  // Update all panel bounds from current DOM positions
  const updateAllBounds = useCallback(() => {
    panelsRef.current.forEach((entry) => {
      const rect = entry.element.getBoundingClientRect();
      entry.bounds = {
        left: rect.left,
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
        width: rect.width,
        height: rect.height,
      };
    });
    cacheValidRef.current = true;
  }, []);

  const registerPanel = useCallback((id: string, element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    panelsRef.current.set(id, {
      element,
      bounds: {
        left: rect.left,
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
        width: rect.width,
        height: rect.height,
      },
    });
    // Invalidate cache when new panel is added
    cacheValidRef.current = false;
  }, []);

  const unregisterPanel = useCallback((id: string) => {
    panelsRef.current.delete(id);
  }, []);

  const getPanelBounds = useCallback(() => {
    if (!cacheValidRef.current) {
      updateAllBounds();
    }
    const bounds = new Map<string, Bounds>();
    panelsRef.current.forEach((entry, id) => {
      bounds.set(id, entry.bounds);
    });
    return bounds;
  }, [updateAllBounds]);

  const invalidateBoundsCache = useCallback(() => {
    cacheValidRef.current = false;
  }, []);

  const triggerRipple = useCallback((panelId: string, localPoint: Point) => {
    const entry = panelsRef.current.get(panelId);
    if (!entry) return;

    const ripple = document.createElement('div');
    ripple.className = 'collision-ripple';
    ripple.style.left = `${localPoint.x}px`;
    ripple.style.top = `${localPoint.y}px`;

    // Ensure panel has position: relative for absolute positioning
    const computedStyle = getComputedStyle(entry.element);
    if (computedStyle.position === 'static') {
      entry.element.style.position = 'relative';
    }

    // Ensure overflow is visible for ripple
    entry.element.style.overflow = 'visible';

    entry.element.appendChild(ripple);

    // Remove after animation completes
    setTimeout(() => {
      ripple.remove();
    }, CONFIG.rippleDuration);
  }, []);

  // Invalidate cache on window resize
  useResizeListener(invalidateBoundsCache);

  const value: CollisionContextValue = {
    registerPanel,
    unregisterPanel,
    getPanelBounds,
    triggerRipple,
    invalidateBoundsCache,
  };

  return (
    <CollisionContext.Provider value={value}>
      {children}
    </CollisionContext.Provider>
  );
}

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

import { createContext, useContext, useRef, useEffect } from 'react';

export interface ScrollContextValue {
  /** Get the current scroll position (avoids re-renders) */
  getScrollY: () => number;
  /** Subscribe to scroll updates */
  subscribe: (callback: (scrollY: number) => void) => () => void;
}

export const ScrollContext = createContext<ScrollContextValue | null>(null);

/**
 * Hook to access scroll context.
 * Returns methods to get scroll position and subscribe to updates.
 */
export function useScrollContext(): ScrollContextValue {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('useScrollContext must be used within a ScrollProvider');
  }
  return context;
}

/**
 * Hook to get scroll position as a ref (no re-renders).
 * Use this when you need scroll position in animation loops or event handlers.
 */
export function useScrollRef(): React.RefObject<number> {
  const { getScrollY, subscribe } = useScrollContext();
  const scrollRef = useRef(getScrollY());

  // Keep ref updated with latest scroll position via subscription.
  useEffect(() => {
    const unsubscribe = subscribe((scrollY: number) => {
      scrollRef.current = scrollY;
    });

    return unsubscribe;
  }, [subscribe]);

  return scrollRef;
}

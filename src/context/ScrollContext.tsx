import { createContext, useContext, useRef, useCallback, useEffect, useMemo, type ReactNode } from 'react';
import { useWindowEvent } from '../hooks/useWindowEvent';

interface ScrollContextValue {
  /** Get the current scroll position (avoids re-renders) */
  getScrollY: () => number;
  /** Subscribe to scroll updates */
  subscribe: (callback: (scrollY: number) => void) => () => void;
}

const ScrollContext = createContext<ScrollContextValue | null>(null);

interface ScrollProviderProps {
  children: ReactNode;
}

/**
 * Provides a single scroll event listener for the entire app.
 * Components can subscribe to scroll updates without creating their own listeners.
 */
export function ScrollProvider({ children }: ScrollProviderProps) {
  const scrollYRef = useRef(typeof window !== 'undefined' ? window.scrollY : 0);
  const subscribersRef = useRef<Set<(scrollY: number) => void>>(new Set());

  const handleScroll = useCallback(() => {
    const newScrollY = window.scrollY;
    scrollYRef.current = newScrollY;

    // Notify all subscribers
    subscribersRef.current.forEach((callback) => {
      callback(newScrollY);
    });
  }, []);

  useWindowEvent('scroll', handleScroll, { throttleRAF: true });

  const getScrollY = useCallback(() => scrollYRef.current, []);

  const subscribe = useCallback((callback: (scrollY: number) => void) => {
    subscribersRef.current.add(callback);

    // Call immediately with current value
    callback(scrollYRef.current);

    // Return unsubscribe function
    return () => {
      subscribersRef.current.delete(callback);
    };
  }, []);

  // Memoize context value to prevent unnecessary re-renders of consumers
  const value = useMemo<ScrollContextValue>(() => ({
    getScrollY,
    subscribe,
  }), [getScrollY, subscribe]);

  return (
    <ScrollContext.Provider value={value}>
      {children}
    </ScrollContext.Provider>
  );
}

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

  // Keep ref updated with latest scroll position
  // FIX: Use useEffect to properly subscribe/unsubscribe instead of calling during render
  useEffect(() => {
    const unsubscribe = subscribe((scrollY: number) => {
      scrollRef.current = scrollY;
    });

    return unsubscribe;
  }, [subscribe]);

  return scrollRef;
}

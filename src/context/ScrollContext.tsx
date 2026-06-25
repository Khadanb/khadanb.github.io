import { useRef, useCallback, useMemo, type ReactNode } from 'react';
import { useWindowEvent } from '../hooks/useWindowEvent';
import { ScrollContext, type ScrollContextValue } from './scroll-store';

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

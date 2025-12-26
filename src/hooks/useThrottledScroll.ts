import { useRef, useReducer, useCallback } from 'react';
import { useWindowEvent } from './useWindowEvent';

/**
 * Hook that provides RAF-throttled scroll event handling.
 * Prevents excessive renders by limiting updates to animation frames.
 */
export function useThrottledScroll(callback: (scrollY: number) => void) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  const handleScroll = useCallback(() => {
    callbackRef.current(window.scrollY);
  }, []);

  useWindowEvent('scroll', handleScroll, { throttleRAF: true });
}

/**
 * Hook that returns the current scroll position with RAF throttling.
 * Use this when you need scrollY as state.
 */
export function useScrollY(): number {
  const scrollYRef = useRef(typeof window !== 'undefined' ? window.scrollY : 0);
  const [, forceUpdate] = useReducer((x: number) => x + 1, 0);

  const handleScroll = useCallback(() => {
    const newScrollY = window.scrollY;
    if (scrollYRef.current !== newScrollY) {
      scrollYRef.current = newScrollY;
      forceUpdate();
    }
  }, []);

  useWindowEvent('scroll', handleScroll, { throttleRAF: true });

  return scrollYRef.current;
}

import { useRef, useState, useCallback, useEffect } from 'react';
import { useWindowEvent } from './useWindowEvent';

/**
 * Hook that provides RAF-throttled scroll event handling.
 * Prevents excessive renders by limiting updates to animation frames.
 */
export function useThrottledScroll(callback: (scrollY: number) => void) {
  const callbackRef = useRef(callback);
  // Keep the latest callback in a ref without reading/writing it during render.
  useEffect(() => {
    callbackRef.current = callback;
  });

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
  const [scrollY, setScrollY] = useState(
    typeof window !== 'undefined' ? window.scrollY : 0
  );

  const handleScroll = useCallback(() => {
    // React bails out when the value is unchanged, so no manual guard needed.
    setScrollY(window.scrollY);
  }, []);

  useWindowEvent('scroll', handleScroll, { throttleRAF: true });

  return scrollY;
}

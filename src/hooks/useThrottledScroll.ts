import { useEffect, useRef, useReducer } from 'react';

/**
 * Hook that provides RAF-throttled scroll event handling.
 * Prevents excessive renders by limiting updates to animation frames.
 */
export function useThrottledScroll(callback: (scrollY: number) => void) {
  const rafRef = useRef<number | undefined>(undefined);
  const callbackRef = useRef(callback);

  // Keep callback ref updated to avoid stale closures
  callbackRef.current = callback;

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current !== undefined) return;
      rafRef.current = requestAnimationFrame(() => {
        callbackRef.current(window.scrollY);
        rafRef.current = undefined;
      });
    };

    // Initial call
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);
}

/**
 * Hook that returns the current scroll position with RAF throttling.
 * Use this when you need scrollY as state.
 */
export function useScrollY(): number {
  const scrollYRef = useRef(0);
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current !== undefined) return;
      rafRef.current = requestAnimationFrame(() => {
        const newScrollY = window.scrollY;
        if (scrollYRef.current !== newScrollY) {
          scrollYRef.current = newScrollY;
          forceUpdate();
        }
        rafRef.current = undefined;
      });
    };

    // Initial value
    scrollYRef.current = window.scrollY;

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return scrollYRef.current;
}

import { useEffect, useRef, useReducer } from 'react';

/**
 * Hook that provides debounced window resize handling.
 * Returns current window dimensions and handles cleanup.
 */
export function useWindowDimensions() {
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const dimensionsRef = useRef({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    docHeight: typeof document !== 'undefined' ? document.documentElement.scrollHeight : 0,
  });
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const updateDimensions = () => {
      dimensionsRef.current = {
        width: window.innerWidth,
        height: window.innerHeight,
        docHeight: document.documentElement.scrollHeight,
      };
      forceUpdate();
    };

    const handleResize = () => {
      // Debounce resize events
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(updateDimensions, 100);
    };

    // Initial measurement
    updateDimensions();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return dimensionsRef.current;
}

/**
 * Hook that provides callback-based resize handling.
 */
export function useResizeListener(callback: () => void) {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  callbackRef.current = callback;

  useEffect(() => {
    const handleResize = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        callbackRef.current();
      }, 100);
    };

    // Initial call
    callbackRef.current();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);
}

import { useRef, useState, useCallback, useEffect } from 'react';
import { useWindowEvent } from './useWindowEvent';

/**
 * Hook that provides debounced window resize handling.
 * Returns current window dimensions and handles cleanup.
 */
export function useWindowDimensions() {
  const [dimensions, setDimensions] = useState(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    docHeight: typeof document !== 'undefined' ? document.documentElement.scrollHeight : 0,
  }));

  const updateDimensions = useCallback(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
      docHeight: document.documentElement.scrollHeight,
    });
  }, []);

  useWindowEvent('resize', updateDimensions, { debounceMs: 100 });

  return dimensions;
}

/**
 * Hook that provides callback-based resize handling.
 */
export function useResizeListener(callback: () => void) {
  const callbackRef = useRef(callback);
  // Keep the latest callback in a ref without writing it during render.
  useEffect(() => {
    callbackRef.current = callback;
  });

  const handleResize = useCallback(() => {
    callbackRef.current();
  }, []);

  useWindowEvent('resize', handleResize, { debounceMs: 100 });
}

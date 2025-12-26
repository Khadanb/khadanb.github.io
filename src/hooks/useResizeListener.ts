import { useRef, useReducer, useCallback } from 'react';
import { useWindowEvent } from './useWindowEvent';

/**
 * Hook that provides debounced window resize handling.
 * Returns current window dimensions and handles cleanup.
 */
export function useWindowDimensions() {
  const [, forceUpdate] = useReducer((x: number) => x + 1, 0);
  const dimensionsRef = useRef({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    docHeight: typeof document !== 'undefined' ? document.documentElement.scrollHeight : 0,
  });

  const updateDimensions = useCallback(() => {
    dimensionsRef.current = {
      width: window.innerWidth,
      height: window.innerHeight,
      docHeight: document.documentElement.scrollHeight,
    };
    forceUpdate();
  }, []);

  useWindowEvent('resize', updateDimensions, { debounceMs: 100 });

  return dimensionsRef.current;
}

/**
 * Hook that provides callback-based resize handling.
 */
export function useResizeListener(callback: () => void) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  const handleResize = useCallback(() => {
    callbackRef.current();
  }, []);

  useWindowEvent('resize', handleResize, { debounceMs: 100 });
}

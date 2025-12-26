import { useEffect, useRef, useCallback } from 'react';

type WindowEventName = 'scroll' | 'resize';

interface UseWindowEventOptions {
  /** Use requestAnimationFrame throttling (default: false) */
  throttleRAF?: boolean;
  /** Debounce delay in milliseconds (default: undefined = no debounce) */
  debounceMs?: number;
  /** Use passive event listener (default: true for scroll, false for resize) */
  passive?: boolean;
  /** Call callback immediately on mount (default: true) */
  callOnMount?: boolean;
}

/**
 * Generic hook for handling window events with optional throttling/debouncing.
 * Consolidates scroll and resize event handling patterns.
 *
 * @param eventName - The window event to listen to ('scroll' | 'resize')
 * @param callback - The callback function to execute
 * @param options - Configuration options for throttling, debouncing, etc.
 */
export function useWindowEvent(
  eventName: WindowEventName,
  callback: () => void,
  options: UseWindowEventOptions = {}
): void {
  const {
    throttleRAF = false,
    debounceMs,
    passive = eventName === 'scroll',
    callOnMount = true,
  } = options;

  const callbackRef = useRef(callback);
  const rafRef = useRef<number | undefined>(undefined);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Keep callback ref updated to avoid stale closures
  callbackRef.current = callback;

  const handleEvent = useCallback(() => {
    // If debouncing is enabled
    if (debounceMs !== undefined) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        callbackRef.current();
      }, debounceMs);
      return;
    }

    // If RAF throttling is enabled
    if (throttleRAF) {
      if (rafRef.current !== undefined) return;
      rafRef.current = requestAnimationFrame(() => {
        callbackRef.current();
        rafRef.current = undefined;
      });
      return;
    }

    // No throttling or debouncing - call immediately
    callbackRef.current();
  }, [throttleRAF, debounceMs]);

  useEffect(() => {
    // Initial call
    if (callOnMount) {
      callbackRef.current();
    }

    window.addEventListener(eventName, handleEvent, { passive });

    return () => {
      window.removeEventListener(eventName, handleEvent);
      if (rafRef.current !== undefined) {
        cancelAnimationFrame(rafRef.current);
      }
      if (timeoutRef.current !== undefined) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [eventName, handleEvent, passive, callOnMount]);
}

/**
 * Hook for scroll events with RAF throttling.
 * Convenience wrapper around useWindowEvent.
 */
export function useScrollEvent(callback: () => void, options?: Omit<UseWindowEventOptions, 'throttleRAF'>) {
  useWindowEvent('scroll', callback, { ...options, throttleRAF: true });
}

/**
 * Hook for resize events with debouncing.
 * Convenience wrapper around useWindowEvent.
 */
export function useResizeEvent(callback: () => void, debounceMs = 100) {
  useWindowEvent('resize', callback, { debounceMs });
}

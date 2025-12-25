import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Hook that observes an element's intersection with the viewport.
 * Returns whether the element is currently visible.
 */
export function useIntersectionObserver<T extends HTMLElement>(
  ref: RefObject<T | null>,
  options: UseIntersectionObserverOptions = {}
): boolean {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = false } = options;
  const [isVisible, setIsVisible] = useState(false);
  const hasTriggered = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // If triggerOnce and already triggered, don't observe again
    if (triggerOnce && hasTriggered.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true);
          hasTriggered.current = true;
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [ref, threshold, rootMargin, triggerOnce]);

  return isVisible;
}

/**
 * Hook with callback-based intersection handling.
 */
export function useIntersectionCallback<T extends HTMLElement>(
  ref: RefObject<T | null>,
  onIntersect: (isIntersecting: boolean, entry: IntersectionObserverEntry) => void,
  options: Omit<UseIntersectionObserverOptions, 'triggerOnce'> = {}
): void {
  const { threshold = 0.1, rootMargin = '0px' } = options;
  const callbackRef = useRef(onIntersect);
  callbackRef.current = onIntersect;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        callbackRef.current(entry.isIntersecting, entry);
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [ref, threshold, rootMargin]);
}

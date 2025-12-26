import { useRef, useCallback } from 'react';

/**
 * Hook that provides a Map-based ref storage for dynamic element lists.
 * Useful for components that render multiple items and need direct DOM access.
 *
 * Consolidates duplicate ref map pattern from:
 * - SpaceElements.tsx
 * - AsteroidBelt.tsx
 *
 * @returns An object with:
 *   - refs: The Map containing element references
 *   - setRef: A stable callback for ref assignment
 *   - getRef: A function to get a ref by id
 *
 * @example
 * ```tsx
 * const { refs, setRef } = useElementRefMap<HTMLDivElement>();
 *
 * return items.map(item => (
 *   <div key={item.id} ref={(el) => setRef(item.id, el)}>
 *     {item.content}
 *   </div>
 * ));
 * ```
 */
export function useElementRefMap<T extends HTMLElement>() {
  const refs = useRef<Map<string, T>>(new Map());

  const setRef = useCallback((id: string, element: T | null) => {
    if (element) {
      refs.current.set(id, element);
    } else {
      refs.current.delete(id);
    }
  }, []);

  const getRef = useCallback((id: string): T | undefined => {
    return refs.current.get(id);
  }, []);

  const clearRefs = useCallback(() => {
    refs.current.clear();
  }, []);

  return {
    refs,
    setRef,
    getRef,
    clearRefs,
  };
}

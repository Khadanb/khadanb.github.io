import { useEffect, type RefObject } from 'react';
import { useCollisionContext } from '../context/CollisionContext';

/**
 * Hook to register an element as a collision panel.
 * Handles registration on mount and cleanup on unmount.
 *
 * Consolidates duplicate panel registration logic from:
 * - Hero.tsx
 * - PlaceholderSection.tsx
 * - TreeLeaf.tsx
 *
 * @param panelId - Unique identifier for the panel
 * @param ref - React ref to the panel element
 *
 * @example
 * ```tsx
 * const cardRef = useRef<HTMLDivElement>(null);
 * usePanelRegistration('hero-card', cardRef);
 * ```
 */
export function usePanelRegistration(
  panelId: string,
  ref: RefObject<HTMLElement | null>
): void {
  const { registerPanel, unregisterPanel } = useCollisionContext();

  useEffect(() => {
    const element = ref.current;
    if (element) {
      registerPanel(panelId, element);
      return () => unregisterPanel(panelId);
    }
  }, [panelId, registerPanel, unregisterPanel, ref]);
}

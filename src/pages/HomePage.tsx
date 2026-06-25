import { ScrollProvider } from '../context/ScrollContext';
import { CollisionProvider } from '../context/CollisionContext';
import { SinglePageLayout } from '../components/layout';

/**
 * The home route: the full scroll-driven solar-system experience.
 * The scroll and collision providers live here (not at the app root) so the
 * lighter post pages don't mount listeners they don't need.
 */
export function HomePage() {
  return (
    <ScrollProvider>
      <CollisionProvider>
        <SinglePageLayout />
      </CollisionProvider>
    </ScrollProvider>
  );
}

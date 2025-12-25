import { useEffect, useState } from 'react';
import { NAV_ITEMS, type SectionId } from '../config/navigation';

export type { SectionId };

export function useScrollSpy(): SectionId {
  const [activeSection, setActiveSection] = useState<SectionId>('home');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const sectionVisibility = new Map<SectionId, number>();

    NAV_ITEMS.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            sectionVisibility.set(id, entry.intersectionRatio);

            // Find the section with highest visibility
            let maxRatio = 0;
            let mostVisibleSection: SectionId = 'home';

            sectionVisibility.forEach((ratio, sectionId) => {
              if (ratio > maxRatio) {
                maxRatio = ratio;
                mostVisibleSection = sectionId;
              }
            });

            if (maxRatio > 0) {
              setActiveSection(mostVisibleSection);
              // Update URL hash without triggering scroll
              if (window.location.hash !== `#${mostVisibleSection}`) {
                history.replaceState(null, '', `#${mostVisibleSection}`);
              }
            }
          });
        },
        {
          threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
          rootMargin: '-10% 0px -10% 0px',
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    // Handle initial hash on page load
    const initialHash = window.location.hash.slice(1) as SectionId;
    if (initialHash && NAV_ITEMS.some((item) => item.id === initialHash)) {
      const element = document.getElementById(initialHash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return activeSection;
}

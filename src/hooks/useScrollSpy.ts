import { useEffect, useState, useRef, useCallback } from 'react';
import { NAV_ITEMS, type SectionId } from '../config/navigation';

export type { SectionId };

// Reduced thresholds for better performance (4 values instead of 11)
const INTERSECTION_THRESHOLDS = [0, 0.25, 0.5, 1];

// Debounce delay for URL updates (ms)
const URL_UPDATE_DEBOUNCE_MS = 100;

export function useScrollSpy(): SectionId {
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const sectionVisibilityRef = useRef<Map<SectionId, number>>(new Map());
  const urlUpdateTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastActiveSectionRef = useRef<SectionId>('home');

  // Debounced URL update to reduce history pollution
  const updateUrlHash = useCallback((sectionId: SectionId) => {
    if (urlUpdateTimeoutRef.current) {
      clearTimeout(urlUpdateTimeoutRef.current);
    }

    urlUpdateTimeoutRef.current = setTimeout(() => {
      if (window.location.hash !== `#${sectionId}`) {
        history.replaceState(null, '', `#${sectionId}`);
      }
    }, URL_UPDATE_DEBOUNCE_MS);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    NAV_ITEMS.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            sectionVisibilityRef.current.set(id, entry.intersectionRatio);
          });

          // Find the section with highest visibility
          let maxRatio = 0;
          let mostVisibleSection: SectionId = 'home';

          sectionVisibilityRef.current.forEach((ratio, sectionId) => {
            if (ratio > maxRatio) {
              maxRatio = ratio;
              mostVisibleSection = sectionId;
            }
          });

          // Only update state if the active section actually changed
          if (maxRatio > 0 && mostVisibleSection !== lastActiveSectionRef.current) {
            lastActiveSectionRef.current = mostVisibleSection;
            setActiveSection(mostVisibleSection);
            updateUrlHash(mostVisibleSection);
          }
        },
        {
          threshold: INTERSECTION_THRESHOLDS,
          rootMargin: '-10% 0px -10% 0px',
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    // Handle initial hash on page load
    const initialHash = window.location.hash.slice(1);
    const validSection = NAV_ITEMS.find((item) => item.id === initialHash);
    if (validSection) {
      const element = document.getElementById(validSection.id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }

    return () => {
      observers.forEach((observer) => observer.disconnect());
      if (urlUpdateTimeoutRef.current) {
        clearTimeout(urlUpdateTimeoutRef.current);
      }
    };
  }, [updateUrlHash]);

  return activeSection;
}

import { useEffect, useState } from 'react';
import { APP_CONFIG } from '../config/app';

/**
 * Tracks whether the viewport is mobile-sized via matchMedia.
 *
 * Used to throttle the decorative space background (fewer stars/asteroids,
 * smaller planets) on phones where the heavy RAF loops would otherwise drain
 * battery and stutter. Reads once synchronously so the first render already
 * reflects the device, then subscribes to viewport changes.
 */
export function useIsMobile(): boolean {
  const query = `(max-width: ${APP_CONFIG.breakpoints.MOBILE_MAX}px)`;

  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handleChange = (event: MediaQueryListEvent) => setIsMobile(event.matches);
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, [query]);

  return isMobile;
}

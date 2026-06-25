import { StarField } from './StarField';
import { SpaceElements } from './svg/SpaceElements';
import { MovingObjects } from './MovingObjects';
import { AsteroidBelt } from './AsteroidBelt';
import { KuiperBelt } from './KuiperBelt';
import { useIsMobile } from '../../hooks';
import { APP_CONFIG } from '../../config/app';

export function AtmosphereBackground() {
  const isMobile = useIsMobile();
  const { starCount, starCountMobile } = APP_CONFIG.background;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated starfield canvas */}
      <StarField starCount={isMobile ? starCountMobile : starCount} />

      {/* Asteroid belt between Mars and Jupiter */}
      <AsteroidBelt />

      {/* Kuiper Belt beyond Neptune */}
      <KuiperBelt />

      {/* Moving celestial objects (comets, asteroids, satellites) */}
      <MovingObjects />

      {/* Solar system planets */}
      <SpaceElements />
    </div>
  );
}

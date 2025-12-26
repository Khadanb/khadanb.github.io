import { StarField } from './StarField';
import { SpaceElements } from './svg/SpaceElements';
import { MovingObjects } from './MovingObjects';

export function AtmosphereBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated starfield canvas */}
      <StarField starCount={300} />

      {/* Moving celestial objects (comets, asteroids, satellites) */}
      <MovingObjects />

      {/* Solar system planets */}
      <SpaceElements />
    </div>
  );
}

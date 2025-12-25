import { StarField } from './StarField';
import { SpaceElements } from './svg/SpaceElements';

export function AtmosphereBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated starfield canvas */}
      <StarField starCount={300} />

      {/* Solar system planets */}
      <SpaceElements />
    </div>
  );
}

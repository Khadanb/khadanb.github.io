import { useParallaxScroll } from '../../hooks/useParallaxScroll';
import { StarField } from './StarField';
import { SpaceElements } from './svg/SpaceElements';
import { MEOElements, LEOElements } from './svg/SatelliteElements';
import { UpperAtmosphereElements, MidAtmosphereElements } from './svg/AtmosphereElements';
import { GroundElements } from './svg/GroundElements';

interface LayerConfig {
  id: string;
  gradient: string;
  speed: number;
  elements: React.ComponentType | null;
}

const LAYERS: LayerConfig[] = [
  {
    id: 'space',
    gradient: 'transparent', // StarField canvas provides the background
    speed: 0.1,
    elements: SpaceElements,
  },
  {
    id: 'meo',
    gradient: 'linear-gradient(180deg, transparent 0%, rgba(12,20,69,0.8) 50%, #151d5a 100%)',
    speed: 0.2,
    elements: MEOElements,
  },
  {
    id: 'leo',
    gradient: 'linear-gradient(180deg, #1a237e 0%, #1565a0 50%, #0288d1 100%)',
    speed: 0.35,
    elements: LEOElements,
  },
  {
    id: 'upper-atm',
    gradient: 'linear-gradient(180deg, #0288d1 0%, #29b6f6 50%, #4fc3f7 100%)',
    speed: 0.5,
    elements: UpperAtmosphereElements,
  },
  {
    id: 'mid-atm',
    gradient: 'linear-gradient(180deg, #4fc3f7 0%, #81d4fa 50%, #b3e5fc 100%)',
    speed: 0.7,
    elements: MidAtmosphereElements,
  },
  {
    id: 'ground',
    gradient: 'linear-gradient(180deg, #b3e5fc 0%, #e0f2f7 50%, #e8f5e9 100%)',
    speed: 0.9,
    elements: GroundElements,
  },
];

const LAYER_HEIGHT = 100; // vh per layer

export function AtmosphereBackground() {
  const { scrollY } = useParallaxScroll();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated starfield canvas */}
      <StarField starCount={300} />

      {/* Stacked layers - each positioned below the previous */}
      {LAYERS.map((layer, index) => {
        const Elements = layer.elements;
        const parallaxOffset = scrollY * (1 - layer.speed);
        const translateY = -scrollY + parallaxOffset;

        return (
          <div
            key={layer.id}
            className="absolute left-0 right-0 pointer-events-none"
            style={{
              top: `${index * LAYER_HEIGHT}vh`,
              height: `${LAYER_HEIGHT}vh`,
              background: layer.gradient,
              transform: `translate3d(0, ${translateY}px, 0)`,
              willChange: 'transform',
            }}
          >
            {Elements && <Elements />}
          </div>
        );
      })}
    </div>
  );
}

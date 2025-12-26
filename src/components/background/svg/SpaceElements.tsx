import { useMemo } from 'react';
import {
  Sun,
  Moon,
  Mercury,
  Venus,
  Earth,
  Mars,
  Jupiter,
  Saturn,
  Uranus,
  Neptune,
} from './celestial';
import { useScrollY } from '../../../hooks/useThrottledScroll';
import { useWindowDimensions } from '../../../hooks/useResizeListener';
import { APP_CONFIG } from '../../../config/app';

const {
  SPACE_ELEMENTS_MULTIPLIER,
  SPACE_OPACITY_THRESHOLD,
  VIEWPORT_CENTER_RATIO,
  MAX_DISTANCE_RATIO,
} = APP_CONFIG.parallax;

interface CelestialBody {
  id: string;
  component: React.ComponentType<{ size?: number; className?: string }>;
  size: number;
  journeyPosition: number;
  parallaxSpeed: number;
  xPosition: string;
  glow?: { color: string; size: string };
  shadow: string;
}

// Define the solar system journey
// journeyPosition: AU distances scaled with offset (Sun at 0.06, Neptune at 0.97)
// parallaxSpeed: scaled so farther planets scroll faster to become visible
// xPosition: positioned in margins (8-15% or 85-92%) with buffer from edges
const CELESTIAL_BODIES: CelestialBody[] = [
  {
    id: 'sun',
    component: Sun,
    size: 140,
    journeyPosition: 0.06,
    parallaxSpeed: 0.15,
    xPosition: '88%',
    glow: { color: 'bg-yellow-300/30', size: 'w-36 h-36' },
    shadow: 'drop-shadow-[0_0_60px_rgba(255,200,50,0.8)]',
  },
  {
    id: 'mercury',
    component: Mercury,
    size: 35,
    journeyPosition: 0.075,
    parallaxSpeed: 0.18,
    xPosition: '92%',
    shadow: 'drop-shadow-[0_0_10px_rgba(150,150,150,0.4)]',
  },
  {
    id: 'venus',
    component: Venus,
    size: 50,
    journeyPosition: 0.088,
    parallaxSpeed: 0.22,
    xPosition: '90%',
    shadow: 'drop-shadow-[0_0_15px_rgba(218,165,32,0.4)]',
  },
  {
    id: 'earth',
    component: Earth,
    size: 55,
    journeyPosition: 0.10,
    parallaxSpeed: 0.26,
    xPosition: '11%',
    glow: { color: 'bg-blue-400/20', size: 'w-16 h-16' },
    shadow: 'drop-shadow-[0_0_20px_rgba(100,180,255,0.5)]',
  },
  {
    id: 'moon',
    component: Moon,
    size: 28,
    journeyPosition: 0.105,
    parallaxSpeed: 0.27,
    xPosition: '14%',
    shadow: 'drop-shadow-[0_0_10px_rgba(200,200,220,0.4)]',
  },
  {
    id: 'mars',
    component: Mars,
    size: 45,
    journeyPosition: 0.12,
    parallaxSpeed: 0.30,
    xPosition: '91%',
    shadow: 'drop-shadow-[0_0_15px_rgba(200,50,50,0.4)]',
  },
  {
    id: 'jupiter',
    component: Jupiter,
    size: 100,
    journeyPosition: 0.24,
    parallaxSpeed: 0.40,
    xPosition: '9%',
    glow: { color: 'bg-amber-300/15', size: 'w-28 h-28' },
    shadow: 'drop-shadow-[0_0_25px_rgba(200,150,100,0.4)]',
  },
  {
    id: 'saturn',
    component: Saturn,
    size: 95,
    journeyPosition: 0.38,
    parallaxSpeed: 0.48,
    xPosition: '89%',
    shadow: 'drop-shadow-[0_0_20px_rgba(200,160,80,0.4)]',
  },
  {
    id: 'uranus',
    component: Uranus,
    size: 60,
    journeyPosition: 0.68,
    parallaxSpeed: 0.54,
    xPosition: '10%',
    shadow: 'drop-shadow-[0_0_15px_rgba(127,255,212,0.4)]',
  },
  {
    id: 'neptune',
    component: Neptune,
    size: 55,
    journeyPosition: 0.97,
    parallaxSpeed: 0.58,
    xPosition: '90%',
    shadow: 'drop-shadow-[0_0_18px_rgba(65,105,225,0.5)]',
  },
];

export function SpaceElements() {
  const scrollY = useScrollY();
  const { height: viewportHeight, docHeight } = useWindowDimensions();

  // Memoize position calculations that depend on docHeight
  const celestialPositions = useMemo(() =>
    CELESTIAL_BODIES.map(body => ({
      ...body,
      documentY: body.journeyPosition * docHeight,
    })),
    [docHeight]
  );

  const centerY = viewportHeight * VIEWPORT_CENTER_RATIO;
  const maxDistance = viewportHeight * MAX_DISTANCE_RATIO;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {celestialPositions.map((body) => {
        // baseY: screen position with parallax effect
        const baseY = body.documentY - scrollY * body.parallaxSpeed * SPACE_ELEMENTS_MULTIPLIER;

        // Calculate opacity based on position in viewport
        const distanceFromCenter = Math.abs(baseY - centerY);
        const opacity = Math.max(0, 1 - distanceFromCenter / maxDistance);

        // Don't render if completely invisible or way off screen
        if (opacity <= SPACE_OPACITY_THRESHOLD || baseY < -body.size || baseY > viewportHeight + body.size) {
          return null;
        }

        const Component = body.component;

        return (
          <div
            key={body.id}
            className="absolute pointer-events-none"
            style={{
              left: body.xPosition,
              top: 0,
              transform: `translate(-50%, ${baseY}px)`,
              opacity,
              willChange: 'transform, opacity',
            }}
          >
            {body.glow && (
              <div
                className={`absolute ${body.glow.size} ${body.glow.color} rounded-full blur-2xl`}
                style={{
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              />
            )}
            <Component size={body.size} className={`relative ${body.shadow}`} />
          </div>
        );
      })}
    </div>
  );
}

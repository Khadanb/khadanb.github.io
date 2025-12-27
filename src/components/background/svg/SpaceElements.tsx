import { useMemo, useRef, useCallback, useEffect } from 'react';
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
  Pluto,
} from './celestial';
import { useThrottledScroll } from '../../../hooks/useThrottledScroll';
import { useWindowDimensions } from '../../../hooks/useResizeListener';
import { APP_CONFIG } from '../../../config/app';

const {
  SPACE_ELEMENTS_MULTIPLIER,
  SPACE_OPACITY_THRESHOLD,
  VIEWPORT_CENTER_RATIO,
  MAX_DISTANCE_RATIO,
} = APP_CONFIG.parallax;

// Belt labels (no visual component, just AU markers)
interface BeltLabel {
  id: string;
  name: string;
  journeyPosition: number;
  parallaxSpeed: number;
  au: number;
}

const BELT_LABELS: BeltLabel[] = [
  {
    id: 'asteroid-belt',
    name: 'Asteroid Belt',
    journeyPosition: APP_CONFIG.asteroidBelt.journeyMidpoint,
    parallaxSpeed: APP_CONFIG.asteroidBelt.parallaxSpeed,
    au: 2.7,
  },
  {
    id: 'kuiper-belt',
    name: 'Kuiper Belt',
    journeyPosition: APP_CONFIG.kuiperBelt.journeyMidpoint,
    parallaxSpeed: APP_CONFIG.kuiperBelt.parallaxSpeed,
    au: 44,
  },
];

interface CelestialBody {
  id: string;
  component: React.ComponentType<{ size?: number; className?: string }>;
  size: number;
  journeyPosition: number;
  parallaxSpeed: number;
  xPosition: string;
  glow?: { color: string; size: string };
  shadow: string;
  au: number;  // Distance from Sun in Astronomical Units
  showAULabel?: boolean;  // Whether to show AU label (skip for Moon to avoid overlap)
}

// Define the solar system journey
// journeyPosition: AU distances scaled with offset (Sun at 0.06, Neptune at 0.97)
// parallaxSpeed: scaled so farther planets scroll faster to become visible
// xPosition: positioned in margins (8-15% or 85-92%) with buffer from edges
const CELESTIAL_BODIES: CelestialBody[] = [
  {
    id: 'sun',
    component: Sun,
    size: 280,
    journeyPosition: 0.06,
    parallaxSpeed: 0.15,
    xPosition: '88%',
    glow: { color: 'bg-yellow-300/30', size: 'w-36 h-36' },
    shadow: 'drop-shadow-[0_0_60px_rgba(255,200,50,0.8)]',
    au: 0,
    showAULabel: true,
  },
  {
    id: 'mercury',
    component: Mercury,
    size: 35,
    journeyPosition: 0.075,
    parallaxSpeed: 0.18,
    xPosition: '92%',
    shadow: 'drop-shadow-[0_0_10px_rgba(150,150,150,0.4)]',
    au: 0.39,
    showAULabel: true,
  },
  {
    id: 'venus',
    component: Venus,
    size: 50,
    journeyPosition: 0.088,
    parallaxSpeed: 0.22,
    xPosition: '90%',
    shadow: 'drop-shadow-[0_0_15px_rgba(218,165,32,0.4)]',
    au: 0.72,
    showAULabel: true,
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
    au: 1.0,
    showAULabel: true,
  },
  {
    id: 'moon',
    component: Moon,
    size: 28,
    journeyPosition: 0.105,
    parallaxSpeed: 0.27,
    xPosition: '14%',
    shadow: 'drop-shadow-[0_0_10px_rgba(200,200,220,0.4)]',
    au: 1.0,
    showAULabel: false,  // Skip to avoid overlap with Earth
  },
  {
    id: 'mars',
    component: Mars,
    size: 45,
    journeyPosition: 0.12,
    parallaxSpeed: 0.30,
    xPosition: '91%',
    shadow: 'drop-shadow-[0_0_15px_rgba(200,50,50,0.4)]',
    au: 1.52,
    showAULabel: true,
  },
  {
    id: 'jupiter',
    component: Jupiter,
    size: 150,
    journeyPosition: 0.24,
    parallaxSpeed: 0.40,
    xPosition: '9%',
    glow: { color: 'bg-amber-300/15', size: 'w-40 h-40' },
    shadow: 'drop-shadow-[0_0_30px_rgba(200,150,100,0.4)]',
    au: 5.2,
    showAULabel: true,
  },
  {
    id: 'saturn',
    component: Saturn,
    size: 135,
    journeyPosition: 0.38,
    parallaxSpeed: 0.48,
    xPosition: '89%',
    glow: { color: 'bg-amber-200/10', size: 'w-36 h-36' },
    shadow: 'drop-shadow-[0_0_25px_rgba(200,160,80,0.4)]',
    au: 9.5,
    showAULabel: true,
  },
  {
    id: 'uranus',
    component: Uranus,
    size: 90,
    journeyPosition: 0.68,
    parallaxSpeed: 0.54,
    xPosition: '10%',
    shadow: 'drop-shadow-[0_0_20px_rgba(127,255,212,0.4)]',
    au: 19.2,
    showAULabel: true,
  },
  {
    id: 'neptune',
    component: Neptune,
    size: 85,
    journeyPosition: 0.97,
    parallaxSpeed: 0.58,
    xPosition: '90%',
    shadow: 'drop-shadow-[0_0_22px_rgba(65,105,225,0.5)]',
    au: 30,
    showAULabel: true,
  },
  {
    id: 'pluto',
    component: Pluto,
    size: 35,
    journeyPosition: 0.99,
    parallaxSpeed: 0.58,
    xPosition: '12%',
    shadow: 'drop-shadow-[0_0_8px_rgba(168,136,128,0.4)]',
    au: 39,
    showAULabel: true,
  },
];

export function SpaceElements() {
  const { height: viewportHeight, docHeight } = useWindowDimensions();

  // Refs to each planet's DOM element for direct manipulation
  const elementRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Refs to AU label elements
  const labelRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Refs to belt label elements
  const beltLabelRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Memoize position calculations that depend on docHeight
  const celestialPositions = useMemo(() =>
    CELESTIAL_BODIES.map(body => ({
      ...body,
      documentY: body.journeyPosition * docHeight,
    })),
    [docHeight]
  );

  // Memoize belt label positions
  const beltPositions = useMemo(() =>
    BELT_LABELS.map(belt => ({
      ...belt,
      documentY: belt.journeyPosition * docHeight,
    })),
    [docHeight]
  );

  const centerY = viewportHeight * VIEWPORT_CENTER_RATIO;
  const maxDistance = viewportHeight * MAX_DISTANCE_RATIO;

  // Update positions via direct DOM manipulation (no React re-renders)
  const updatePositions = useCallback((scrollY: number) => {
    celestialPositions.forEach((body) => {
      const element = elementRefs.current.get(body.id);
      if (!element) return;

      const baseY = body.documentY - scrollY * body.parallaxSpeed * SPACE_ELEMENTS_MULTIPLIER;
      const distanceFromCenter = Math.abs(baseY - centerY);
      const opacity = Math.max(0, 1 - distanceFromCenter / maxDistance);

      // Hide if invisible or off screen
      if (opacity <= SPACE_OPACITY_THRESHOLD || baseY < -body.size || baseY > viewportHeight + body.size) {
        element.style.display = 'none';
      } else {
        element.style.display = '';
        element.style.transform = `translate(-50%, ${baseY}px)`;
        element.style.opacity = String(opacity);
      }

      // Update AU label position (if this body has one)
      // The planet's visual center is at baseY + body.size/2 (since planets are positioned from top edge)
      if (body.showAULabel) {
        const label = labelRefs.current.get(body.id);
        if (label) {
          const planetCenterY = baseY + body.size / 2;
          if (opacity <= SPACE_OPACITY_THRESHOLD || baseY < -20 || baseY > viewportHeight + 20) {
            label.style.display = 'none';
          } else {
            label.style.display = '';
            label.style.transform = `translateY(${planetCenterY}px)`;
            label.style.opacity = String(opacity * 0.8);
          }
        }
      }
    });

    // Update belt label positions
    beltPositions.forEach((belt) => {
      const label = beltLabelRefs.current.get(belt.id);
      if (!label) return;

      const baseY = belt.documentY - scrollY * belt.parallaxSpeed * SPACE_ELEMENTS_MULTIPLIER;
      const distanceFromCenter = Math.abs(baseY - centerY);
      const opacity = Math.max(0, 1 - distanceFromCenter / maxDistance);

      if (opacity <= SPACE_OPACITY_THRESHOLD || baseY < -20 || baseY > viewportHeight + 20) {
        label.style.display = 'none';
      } else {
        label.style.display = '';
        label.style.transform = `translateY(${baseY}px)`;
        label.style.opacity = String(opacity * 0.7);
      }
    });
  }, [celestialPositions, beltPositions, centerY, maxDistance, viewportHeight]);

  // Set up scroll listener
  useThrottledScroll(updatePositions);

  // Initial position update
  useEffect(() => {
    updatePositions(window.scrollY);
  }, [updatePositions]);

  // Ref callback to store element references
  const setElementRef = useCallback((id: string, element: HTMLDivElement | null) => {
    if (element) {
      elementRefs.current.set(id, element);
    } else {
      elementRefs.current.delete(id);
    }
  }, []);

  // Ref callback to store label references
  const setLabelRef = useCallback((id: string, element: HTMLDivElement | null) => {
    if (element) {
      labelRefs.current.set(id, element);
    } else {
      labelRefs.current.delete(id);
    }
  }, []);

  // Ref callback to store belt label references
  const setBeltLabelRef = useCallback((id: string, element: HTMLDivElement | null) => {
    if (element) {
      beltLabelRefs.current.set(id, element);
    } else {
      beltLabelRefs.current.delete(id);
    }
  }, []);

  // Filter bodies that should show AU labels
  const bodiesWithLabels = celestialPositions.filter(body => body.showAULabel);

  return (
    <>
      {/* AU Labels on left edge - hidden on mobile */}
      <div className="hidden md:block fixed left-0 top-0 h-screen pointer-events-none z-20">
        {/* Vertical reference line - positioned at 65px from left (center of 10px tick at end of 70px container) */}
        <div className="absolute top-0 bottom-0 w-px bg-white/10" style={{ left: 65 }} />

        {bodiesWithLabels.map((body) => (
          <div
            key={`label-${body.id}`}
            ref={(el) => setLabelRef(body.id, el)}
            className="absolute -translate-y-1/2"
            style={{
              top: 0,
              left: 0,
              willChange: 'transform, opacity',
            }}
          >
            {/* Label with planet name above AU distance */}
            <div className="flex flex-col items-end" style={{ width: 70 }}>
              {/* Planet name - above the AU line */}
              <span className="text-[9px] text-white/50 font-mono capitalize pr-1">
                {body.id}
              </span>
              {/* AU value with tick mark */}
              <div className="flex items-center">
                <span className="text-[10px] text-white/70 font-mono tabular-nums pr-1">
                  {body.au === 0 ? '0' : body.au} AU
                </span>
                <div className="h-px bg-white/40" style={{ width: 10 }} />
              </div>
            </div>
          </div>
        ))}

        {/* Belt labels */}
        {beltPositions.map((belt) => (
          <div
            key={`label-${belt.id}`}
            ref={(el) => setBeltLabelRef(belt.id, el)}
            className="absolute -translate-y-1/2"
            style={{
              top: 0,
              left: 0,
              willChange: 'transform, opacity',
            }}
          >
            {/* Label with belt name above AU distance */}
            <div className="flex flex-col items-end" style={{ width: 70 }}>
              {/* Belt name - above the AU line */}
              <span className="text-[8px] text-white/40 font-mono pr-1">
                {belt.name}
              </span>
              {/* AU value with tick mark */}
              <div className="flex items-center">
                <span className="text-[10px] text-white/60 font-mono tabular-nums pr-1">
                  ~{belt.au} AU
                </span>
                <div className="h-px bg-white/30" style={{ width: 10 }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Celestial bodies */}
      <div className="absolute inset-0 overflow-hidden">
        {celestialPositions.map((body) => {
          const Component = body.component;

          return (
            <div
              key={body.id}
              ref={(el) => setElementRef(body.id, el)}
              className="absolute pointer-events-none"
              style={{
                left: body.xPosition,
                top: 0,
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
    </>
  );
}

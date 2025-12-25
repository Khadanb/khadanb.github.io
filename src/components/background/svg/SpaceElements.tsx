import { useEffect, useState } from 'react';
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

interface CelestialBody {
  id: string;
  component: React.ComponentType<{ size?: number; className?: string }>;
  size: number;
  // Starting position in the journey (0 = top of page, 1 = bottom)
  journeyPosition: number;
  // Parallax speed (how fast it moves relative to scroll, 0.1 = slow, 1 = same as scroll)
  parallaxSpeed: number;
  // Horizontal position
  x: string;
  // Optional glow
  glow?: { color: string; size: string };
  // Drop shadow
  shadow: string;
}

// Define the solar system journey
// journeyPosition: AU distances scaled with offset (Sun at 0.06, Neptune at 0.97)
// parallaxSpeed: scaled so farther planets scroll faster to become visible
// x: positioned in margins (8-15% or 85-92%) with buffer from edges
const CELESTIAL_BODIES: CelestialBody[] = [
  {
    id: 'sun',
    component: Sun,
    size: 140,
    journeyPosition: 0.06,   // Offset from top
    parallaxSpeed: 0.15,
    x: '88%',                // Right margin with buffer
    glow: { color: 'bg-yellow-300/30', size: 'w-36 h-36' },
    shadow: 'drop-shadow-[0_0_60px_rgba(255,200,50,0.8)]',
  },
  {
    id: 'mercury',
    component: Mercury,
    size: 35,
    journeyPosition: 0.075,  // 0.39 AU scaled
    parallaxSpeed: 0.18,
    x: '92%',                // Near Sun on right side
    shadow: 'drop-shadow-[0_0_10px_rgba(150,150,150,0.4)]',
  },
  {
    id: 'venus',
    component: Venus,
    size: 50,
    journeyPosition: 0.088,  // 0.72 AU scaled
    parallaxSpeed: 0.22,
    x: '90%',                // Right margin with buffer
    shadow: 'drop-shadow-[0_0_15px_rgba(218,165,32,0.4)]',
  },
  {
    id: 'earth',
    component: Earth,
    size: 55,
    journeyPosition: 0.10,   // 1.00 AU scaled
    parallaxSpeed: 0.26,
    x: '11%',                // Left margin with buffer
    glow: { color: 'bg-blue-400/20', size: 'w-16 h-16' },
    shadow: 'drop-shadow-[0_0_20px_rgba(100,180,255,0.5)]',
  },
  {
    id: 'moon',
    component: Moon,
    size: 28,
    journeyPosition: 0.105,  // Slightly past Earth
    parallaxSpeed: 0.27,
    x: '14%',                // Near Earth on left
    shadow: 'drop-shadow-[0_0_10px_rgba(200,200,220,0.4)]',
  },
  {
    id: 'mars',
    component: Mars,
    size: 45,
    journeyPosition: 0.12,   // 1.52 AU scaled
    parallaxSpeed: 0.30,
    x: '91%',                // Right margin with buffer
    shadow: 'drop-shadow-[0_0_15px_rgba(200,50,50,0.4)]',
  },
  {
    id: 'jupiter',
    component: Jupiter,
    size: 100,
    journeyPosition: 0.24,   // 5.20 AU scaled
    parallaxSpeed: 0.40,
    x: '9%',                 // Left margin with buffer (larger planet)
    glow: { color: 'bg-amber-300/15', size: 'w-28 h-28' },
    shadow: 'drop-shadow-[0_0_25px_rgba(200,150,100,0.4)]',
  },
  {
    id: 'saturn',
    component: Saturn,
    size: 95,
    journeyPosition: 0.38,   // 9.54 AU scaled
    parallaxSpeed: 0.48,
    x: '89%',                // Right margin with buffer (larger planet)
    shadow: 'drop-shadow-[0_0_20px_rgba(200,160,80,0.4)]',
  },
  {
    id: 'uranus',
    component: Uranus,
    size: 60,
    journeyPosition: 0.68,   // 19.20 AU scaled
    parallaxSpeed: 0.54,
    x: '10%',                // Left margin with buffer
    shadow: 'drop-shadow-[0_0_15px_rgba(127,255,212,0.4)]',
  },
  {
    id: 'neptune',
    component: Neptune,
    size: 55,
    journeyPosition: 0.97,   // 30 AU (end of journey)
    parallaxSpeed: 0.58,
    x: '90%',                // Right margin with buffer
    shadow: 'drop-shadow-[0_0_18px_rgba(65,105,225,0.5)]',
  },
];

export function SpaceElements() {
  const [scrollY, setScrollY] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [docHeight, setDocHeight] = useState(0);

  useEffect(() => {
    const updateDimensions = () => {
      setViewportHeight(window.innerHeight);
      setDocHeight(document.documentElement.scrollHeight);
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    updateDimensions();
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  // Total scrollable distance
  const totalScroll = docHeight - viewportHeight;
  const scrollProgress = totalScroll > 0 ? scrollY / totalScroll : 0;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {CELESTIAL_BODIES.map((body) => {
        // Calculate planet position based on scroll
        // documentY: absolute position in document based on AU distance ratio
        const documentY = body.journeyPosition * docHeight;

        // baseY: screen position with parallax effect
        // Higher parallaxSpeed = moves faster = scrolls off quicker
        const baseY = documentY - scrollY * body.parallaxSpeed * 2;

        // Calculate opacity based on position in viewport
        const centerY = viewportHeight / 2;
        const distanceFromCenter = Math.abs(baseY - centerY);
        const maxDistance = viewportHeight * 0.8;
        const opacity = Math.max(0, 1 - distanceFromCenter / maxDistance);

        // Don't render if completely invisible or way off screen
        if (opacity <= 0.01 || baseY < -body.size || baseY > viewportHeight + body.size) {
          return null;
        }

        const Component = body.component;

        return (
          <div
            key={body.id}
            className="absolute pointer-events-none"
            style={{
              left: body.x,
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

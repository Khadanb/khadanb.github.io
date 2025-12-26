import { useId } from 'react';

interface AsteroidProps {
  size?: number;
  className?: string;
  variant?: 0 | 1 | 2 | 3 | 4 | 5;
}

export function Asteroid({ size = 30, className = '', variant = 0 }: AsteroidProps) {
  // Generate unique ID for this instance to prevent gradient ID collisions
  const instanceId = useId();
  // Six different asteroid shape variants for variety
  const asteroidPaths = [
    // Variant 0: Potato-shaped
    'M 20 8 Q 30 5, 36 10 Q 40 18, 38 26 Q 35 34, 25 36 Q 15 38, 10 32 Q 4 25, 6 16 Q 8 10, 20 8 Z',
    // Variant 1: More angular/rocky
    'M 18 6 L 30 4 L 38 12 L 40 24 L 34 34 L 22 38 L 10 32 L 4 20 L 8 10 Z',
    // Variant 2: Elongated
    'M 8 18 Q 6 12, 14 8 Q 24 4, 34 8 Q 40 14, 38 22 Q 36 30, 26 34 Q 16 36, 10 30 Q 4 24, 8 18 Z',
    // Variant 3: Small and round (for belt)
    'M 22 6 Q 34 6, 38 18 Q 40 28, 30 36 Q 20 40, 10 32 Q 4 22, 10 12 Q 16 4, 22 6 Z',
    // Variant 4: Irregular/jagged (for belt)
    'M 16 4 L 28 6 L 36 10 L 40 20 L 38 30 L 30 38 L 18 36 L 8 30 L 4 22 L 6 12 L 12 6 Z',
    // Variant 5: Flat/disc-like (for belt)
    'M 6 20 Q 8 14, 18 10 Q 28 8, 36 14 Q 40 20, 36 26 Q 28 32, 18 30 Q 8 28, 6 20 Z',
  ];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Rocky surface gradient */}
        <radialGradient id={`asteroidSurface${instanceId}`} cx="35%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#9e9e9e" />
          <stop offset="40%" stopColor="#757575" />
          <stop offset="70%" stopColor="#5d4e37" />
          <stop offset="100%" stopColor="#3e2723" />
        </radialGradient>

        {/* Crater shadow gradient */}
        <radialGradient id={`asteroidCrater${instanceId}`} cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#4a4a4a" />
          <stop offset="100%" stopColor="#2d2d2d" />
        </radialGradient>

        {/* Highlight for 3D effect */}
        <radialGradient id={`asteroidHighlight${instanceId}`} cx="30%" cy="30%" r="50%">
          <stop offset="0%" stopColor="#bdbdbd" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#757575" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Main asteroid body */}
      <path
        d={asteroidPaths[variant]}
        fill={`url(#asteroidSurface${instanceId})`}
      />

      {/* Surface texture - craters and bumps */}
      {variant === 0 && (
        <>
          {/* Large crater */}
          <ellipse cx="24" cy="18" rx="6" ry="5" fill={`url(#asteroidCrater${instanceId})`} opacity="0.5" />
          <ellipse cx="23" cy="17" rx="4" ry="3" fill="#3a3a3a" opacity="0.4" />
          {/* Medium craters */}
          <circle cx="14" cy="24" r="3" fill={`url(#asteroidCrater${instanceId})`} opacity="0.45" />
          <circle cx="30" cy="28" r="2.5" fill={`url(#asteroidCrater${instanceId})`} opacity="0.4" />
          {/* Small craters */}
          <circle cx="18" cy="12" r="1.5" fill="#4a4a4a" opacity="0.4" />
          <circle cx="32" cy="16" r="1.5" fill="#4a4a4a" opacity="0.35" />
          <circle cx="12" cy="30" r="1" fill="#4a4a4a" opacity="0.35" />
        </>
      )}

      {variant === 1 && (
        <>
          {/* Angular surface details */}
          <circle cx="22" cy="16" r="5" fill={`url(#asteroidCrater${instanceId})`} opacity="0.5" />
          <circle cx="28" cy="26" r="3.5" fill={`url(#asteroidCrater${instanceId})`} opacity="0.45" />
          <circle cx="14" cy="22" r="3" fill={`url(#asteroidCrater${instanceId})`} opacity="0.4" />
          {/* Ridge line */}
          <path
            d="M 12 14 Q 22 12, 32 18"
            fill="none"
            stroke="#5d4e37"
            strokeWidth="1"
            opacity="0.4"
          />
          <circle cx="18" cy="30" r="1.5" fill="#4a4a4a" opacity="0.35" />
          <circle cx="34" cy="20" r="1" fill="#4a4a4a" opacity="0.3" />
        </>
      )}

      {variant === 2 && (
        <>
          {/* Elongated asteroid details */}
          <ellipse cx="20" cy="18" rx="5" ry="4" fill={`url(#asteroidCrater${instanceId})`} opacity="0.5" />
          <ellipse cx="32" cy="20" rx="3.5" ry="3" fill={`url(#asteroidCrater${instanceId})`} opacity="0.45" />
          <circle cx="12" cy="22" r="2.5" fill={`url(#asteroidCrater${instanceId})`} opacity="0.4" />
          {/* Surface grooves */}
          <path
            d="M 10 20 Q 22 18, 36 22"
            fill="none"
            stroke="#4a3a2a"
            strokeWidth="0.8"
            opacity="0.35"
          />
          <circle cx="26" cy="28" r="1.5" fill="#4a4a4a" opacity="0.35" />
          <circle cx="16" cy="14" r="1" fill="#4a4a4a" opacity="0.3" />
        </>
      )}

      {variant === 3 && (
        <>
          {/* Round asteroid details - simple craters */}
          <circle cx="22" cy="18" r="5" fill={`url(#asteroidCrater${instanceId})`} opacity="0.5" />
          <circle cx="14" cy="26" r="3" fill={`url(#asteroidCrater${instanceId})`} opacity="0.4" />
          <circle cx="30" cy="24" r="2.5" fill={`url(#asteroidCrater${instanceId})`} opacity="0.4" />
          <circle cx="20" cy="30" r="1.5" fill="#4a4a4a" opacity="0.35" />
          <circle cx="28" cy="14" r="1" fill="#4a4a4a" opacity="0.3" />
        </>
      )}

      {variant === 4 && (
        <>
          {/* Jagged asteroid details - angular features */}
          <circle cx="22" cy="20" r="4" fill={`url(#asteroidCrater${instanceId})`} opacity="0.5" />
          <circle cx="32" cy="24" r="3" fill={`url(#asteroidCrater${instanceId})`} opacity="0.45" />
          {/* Ridge lines for jagged look */}
          <path
            d="M 10 16 L 20 14 L 30 18"
            fill="none"
            stroke="#5d4e37"
            strokeWidth="0.8"
            opacity="0.4"
          />
          <path
            d="M 14 28 L 26 30 L 34 26"
            fill="none"
            stroke="#4a3a2a"
            strokeWidth="0.6"
            opacity="0.35"
          />
          <circle cx="12" cy="22" r="2" fill="#4a4a4a" opacity="0.35" />
        </>
      )}

      {variant === 5 && (
        <>
          {/* Flat/disc asteroid details - horizontal features */}
          <ellipse cx="22" cy="20" rx="6" ry="3" fill={`url(#asteroidCrater${instanceId})`} opacity="0.5" />
          <ellipse cx="14" cy="22" rx="3" ry="2" fill={`url(#asteroidCrater${instanceId})`} opacity="0.4" />
          <ellipse cx="32" cy="20" rx="2.5" ry="1.5" fill={`url(#asteroidCrater${instanceId})`} opacity="0.4" />
          {/* Horizontal groove */}
          <path
            d="M 10 20 Q 22 18, 34 20"
            fill="none"
            stroke="#4a3a2a"
            strokeWidth="0.6"
            opacity="0.3"
          />
        </>
      )}

      {/* Highlight overlay for 3D effect */}
      <path
        d={asteroidPaths[variant]}
        fill={`url(#asteroidHighlight${instanceId})`}
      />
    </svg>
  );
}

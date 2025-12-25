interface UranusProps {
  size?: number;
  className?: string;
}

export function Uranus({ size = 55, className = '' }: UranusProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Uranus surface gradient - pale blue-green (methane atmosphere) */}
        <radialGradient id="uranusSurface" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#d0ffff" />
          <stop offset="25%" stopColor="#b0e8e8" />
          <stop offset="55%" stopColor="#80c8c8" />
          <stop offset="100%" stopColor="#508888" />
        </radialGradient>

        {/* Polar brightening gradient */}
        <radialGradient id="uranusPolar" cx="50%" cy="100%" r="60%">
          <stop offset="0%" stopColor="#d8ffff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#80c8c8" stopOpacity="0" />
        </radialGradient>

        {/* Ring gradient */}
        <linearGradient id="uranusRing" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#90c0c0" stopOpacity="0.25" />
          <stop offset="50%" stopColor="#a8d8d8" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#90c0c0" stopOpacity="0.25" />
        </linearGradient>

        {/* Clip paths for rings */}
        <clipPath id="uranusBackRing">
          <rect x="0" y="0" width="100" height="42" />
        </clipPath>
        <clipPath id="uranusFrontRing">
          <rect x="0" y="58" width="100" height="42" />
        </clipPath>

        {/* Clip path for planet */}
        <clipPath id="uranusBodyClip">
          <circle cx="50" cy="50" r="30" />
        </clipPath>
      </defs>

      {/* Back ring (tilted - Uranus rotates on its side) */}
      <g clipPath="url(#uranusBackRing)">
        {/* Epsilon ring (brightest) */}
        <ellipse
          cx="50"
          cy="50"
          rx="12"
          ry="45"
          fill="none"
          stroke="url(#uranusRing)"
          strokeWidth="3"
        />
        {/* Inner rings (faint) */}
        <ellipse
          cx="50"
          cy="50"
          rx="10"
          ry="38"
          fill="none"
          stroke="#a0c8c8"
          strokeWidth="1.5"
          opacity="0.25"
        />
      </g>

      {/* Main body */}
      <circle cx="50" cy="50" r="30" fill="url(#uranusSurface)" />

      <g clipPath="url(#uranusBodyClip)">
        {/* Subtle cloud bands (very faint - Uranus appears nearly featureless) */}
        <ellipse cx="50" cy="36" rx="32" ry="4" fill="#b0e0e0" opacity="0.18" />
        <ellipse cx="50" cy="48" rx="32" ry="3" fill="#a8d8d8" opacity="0.15" />
        <ellipse cx="50" cy="60" rx="32" ry="3.5" fill="#b0e0e0" opacity="0.16" />

        {/* Polar brightening (south pole facing sun due to extreme tilt) */}
        <ellipse cx="50" cy="75" rx="22" ry="10" fill="#d8ffff" opacity="0.25" />
        <ellipse cx="50" cy="78" rx="16" ry="7" fill="#e0ffff" opacity="0.2" />

        {/* Slight north polar darkening */}
        <ellipse cx="50" cy="25" rx="18" ry="8" fill="#609090" opacity="0.15" />

        {/* Occasional cloud feature (rare but documented) */}
        <ellipse cx="42" cy="55" rx="4" ry="2" fill="#c8f0f0" opacity="0.22" />
        <ellipse cx="60" cy="42" rx="3" ry="1.5" fill="#d0f8f8" opacity="0.18" />
      </g>

      {/* Front ring */}
      <g clipPath="url(#uranusFrontRing)">
        {/* Epsilon ring (brightest) */}
        <ellipse
          cx="50"
          cy="50"
          rx="12"
          ry="45"
          fill="none"
          stroke="url(#uranusRing)"
          strokeWidth="3"
        />
        {/* Inner rings (faint) */}
        <ellipse
          cx="50"
          cy="50"
          rx="10"
          ry="38"
          fill="none"
          stroke="#a0c8c8"
          strokeWidth="1.5"
          opacity="0.25"
        />
      </g>

      {/* Highlight */}
      <circle cx="40" cy="40" r="10" fill="white" opacity="0.12" />
    </svg>
  );
}

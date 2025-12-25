interface JupiterProps {
  size?: number;
  className?: string;
}

export function Jupiter({ size = 90, className = '' }: JupiterProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Jupiter base gradient */}
        <radialGradient id="jupiterBase" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#f5e6d3" />
          <stop offset="40%" stopColor="#e0c8a0" />
          <stop offset="70%" stopColor="#c4a060" />
          <stop offset="100%" stopColor="#8b6914" />
        </radialGradient>

        {/* Light zone colors */}
        <linearGradient id="jupiterZone" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#d4b896" />
          <stop offset="50%" stopColor="#f0e4d0" />
          <stop offset="100%" stopColor="#d4b896" />
        </linearGradient>

        {/* Dark belt colors */}
        <linearGradient id="jupiterBelt" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8b5a2b" />
          <stop offset="30%" stopColor="#a0622d" />
          <stop offset="70%" stopColor="#a0622d" />
          <stop offset="100%" stopColor="#8b5a2b" />
        </linearGradient>

        {/* Great Red Spot gradient */}
        <radialGradient id="redSpot" cx="35%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#e07060" />
          <stop offset="40%" stopColor="#c44030" />
          <stop offset="70%" stopColor="#a02020" />
          <stop offset="100%" stopColor="#701010" />
        </radialGradient>

        {/* Clip path for bands */}
        <clipPath id="jupiterClip">
          <circle cx="50" cy="50" r="38" />
        </clipPath>
      </defs>

      {/* Main body */}
      <circle cx="50" cy="50" r="38" fill="url(#jupiterBase)" />

      {/* Cloud bands with turbulent edges */}
      <g clipPath="url(#jupiterClip)">
        {/* North Polar Region */}
        <path
          d="M 10 16 Q 25 18, 40 15 Q 55 13, 70 17 Q 85 19, 90 16 L 90 22 Q 75 24, 60 21 Q 45 19, 30 23 Q 15 25, 10 22 Z"
          fill="url(#jupiterBelt)"
          opacity="0.45"
        />

        {/* North Temperate Zone */}
        <path
          d="M 10 22 Q 30 24, 50 22 Q 70 20, 90 23 L 90 30 Q 70 28, 50 31 Q 30 33, 10 30 Z"
          fill="url(#jupiterZone)"
          opacity="0.6"
        />

        {/* North Equatorial Belt (turbulent) */}
        <path
          d="M 10 30 Q 20 32, 35 29 Q 50 27, 65 31 Q 80 33, 90 30 L 90 42 Q 75 44, 60 40 Q 45 38, 30 42 Q 15 44, 10 42 Z"
          fill="url(#jupiterBelt)"
          opacity="0.55"
        />

        {/* Equatorial Zone */}
        <path
          d="M 10 42 Q 25 44, 45 41 Q 65 39, 90 43 L 90 54 Q 70 52, 50 55 Q 30 57, 10 54 Z"
          fill="url(#jupiterZone)"
          opacity="0.65"
        />

        {/* South Equatorial Belt (contains GRS) */}
        <path
          d="M 10 54 Q 25 56, 40 53 Q 55 51, 70 55 Q 85 57, 90 54 L 90 66 Q 75 68, 55 65 Q 35 63, 10 66 Z"
          fill="url(#jupiterBelt)"
          opacity="0.5"
        />

        {/* South Temperate Zone */}
        <path
          d="M 10 66 Q 30 68, 50 65 Q 70 63, 90 67 L 90 74 Q 70 72, 50 75 Q 30 77, 10 74 Z"
          fill="url(#jupiterZone)"
          opacity="0.55"
        />

        {/* South Polar Region */}
        <path
          d="M 10 74 Q 25 76, 45 73 Q 65 71, 90 75 L 90 85 Q 70 82, 50 85 Q 30 87, 10 85 Z"
          fill="url(#jupiterBelt)"
          opacity="0.4"
        />
      </g>

      {/* Great Red Spot with spiral structure */}
      <ellipse cx="62" cy="58" rx="12" ry="7" fill="url(#redSpot)" opacity="0.85" />
      <ellipse cx="62" cy="58" rx="8" ry="4.5" fill="#c44030" opacity="0.6" />
      {/* Spiral detail */}
      <path
        d="M 54 58 Q 58 54, 62 56 Q 66 58, 64 62 Q 60 64, 56 60 Q 54 58, 56 56"
        fill="none"
        stroke="#701010"
        strokeWidth="1.5"
        opacity="0.5"
      />

      {/* White oval storms */}
      <ellipse cx="35" cy="65" rx="5" ry="2.5" fill="#f5e6d3" opacity="0.5" />
      <ellipse cx="78" cy="42" rx="4" ry="2" fill="#f5e6d3" opacity="0.45" />
      <ellipse cx="25" cy="38" rx="3.5" ry="1.8" fill="#f5e6d3" opacity="0.4" />

      {/* Festoons (dark intrusions into equatorial zone) */}
      <path
        d="M 45 42 Q 47 46, 45 50"
        fill="none"
        stroke="#8b5a2b"
        strokeWidth="2"
        opacity="0.35"
        strokeLinecap="round"
      />
      <path
        d="M 72 43 Q 74 47, 73 51"
        fill="none"
        stroke="#8b5a2b"
        strokeWidth="1.5"
        opacity="0.3"
        strokeLinecap="round"
      />

      {/* Highlight */}
      <circle cx="36" cy="34" r="14" fill="white" opacity="0.1" />
    </svg>
  );
}

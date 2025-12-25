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
        {/* Uranus surface gradient - pale cyan/blue */}
        <radialGradient id="uranusSurface" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#e0ffff" />
          <stop offset="40%" stopColor="#7fffd4" />
          <stop offset="100%" stopColor="#5f9ea0" />
        </radialGradient>

        {/* Ring gradient */}
        <linearGradient id="uranusRing" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7fffd4" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#b0e0e6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#7fffd4" stopOpacity="0.2" />
        </linearGradient>

        {/* Clip paths for rings */}
        <clipPath id="uranusBackRing">
          <rect x="0" y="0" width="100" height="42" />
        </clipPath>
        <clipPath id="uranusFrontRing">
          <rect x="0" y="58" width="100" height="42" />
        </clipPath>
      </defs>

      {/* Back ring (tilted - Uranus rotates on its side) */}
      <g clipPath="url(#uranusBackRing)">
        <ellipse
          cx="50"
          cy="50"
          rx="12"
          ry="45"
          fill="none"
          stroke="url(#uranusRing)"
          strokeWidth="4"
        />
      </g>

      {/* Main body */}
      <circle cx="50" cy="50" r="30" fill="url(#uranusSurface)" />

      {/* Subtle cloud bands (very faint) */}
      <ellipse cx="50" cy="40" rx="28" ry="4" fill="#b0e0e6" opacity="0.2" />
      <ellipse cx="50" cy="50" rx="29" ry="3" fill="#afeeee" opacity="0.15" />
      <ellipse cx="50" cy="60" rx="28" ry="4" fill="#b0e0e6" opacity="0.2" />

      {/* Front ring */}
      <g clipPath="url(#uranusFrontRing)">
        <ellipse
          cx="50"
          cy="50"
          rx="12"
          ry="45"
          fill="none"
          stroke="url(#uranusRing)"
          strokeWidth="4"
        />
      </g>

      {/* Highlight */}
      <circle cx="42" cy="42" r="10" fill="white" opacity="0.15" />
    </svg>
  );
}

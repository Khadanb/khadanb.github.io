interface SunProps {
  size?: number;
  className?: string;
}

export function Sun({ size = 80, className = '' }: SunProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Sun glow gradient */}
        <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff7e0" />
          <stop offset="40%" stopColor="#ffd54f" />
          <stop offset="70%" stopColor="#ffb300" />
          <stop offset="100%" stopColor="#ff8f00" />
        </radialGradient>

        {/* Outer corona */}
        <radialGradient id="corona" cx="50%" cy="50%" r="50%">
          <stop offset="60%" stopColor="#ffb300" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#ff6f00" stopOpacity="0" />
        </radialGradient>

        {/* Sun surface texture */}
        <filter id="sunTexture">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
        </filter>
      </defs>

      {/* Corona rays */}
      <g opacity="0.4">
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={i}
            x1="50"
            y1="50"
            x2={50 + 45 * Math.cos((i * 30 * Math.PI) / 180)}
            y2={50 + 45 * Math.sin((i * 30 * Math.PI) / 180)}
            stroke="#ffd54f"
            strokeWidth="2"
            strokeLinecap="round"
            opacity={0.3 + (i % 2) * 0.3}
          />
        ))}
      </g>

      {/* Outer glow */}
      <circle cx="50" cy="50" r="40" fill="url(#corona)" />

      {/* Main sun body */}
      <circle cx="50" cy="50" r="28" fill="url(#sunGlow)" />

      {/* Surface details - sunspots */}
      <circle cx="42" cy="45" r="3" fill="#f9a825" opacity="0.5" />
      <circle cx="55" cy="52" r="2" fill="#f9a825" opacity="0.4" />
      <circle cx="48" cy="58" r="2.5" fill="#f9a825" opacity="0.3" />

      {/* Bright center highlight */}
      <circle cx="45" cy="42" r="8" fill="#fffde7" opacity="0.4" />
    </svg>
  );
}

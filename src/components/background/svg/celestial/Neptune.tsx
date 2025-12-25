interface NeptuneProps {
  size?: number;
  className?: string;
}

export function Neptune({ size = 52, className = '' }: NeptuneProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Neptune surface gradient - deep blue */}
        <radialGradient id="neptuneSurface" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#6495ed" />
          <stop offset="40%" stopColor="#4169e1" />
          <stop offset="100%" stopColor="#191970" />
        </radialGradient>

        {/* Storm spot gradient */}
        <radialGradient id="neptuneSpot" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#87ceeb" />
          <stop offset="100%" stopColor="#4682b4" />
        </radialGradient>

        {/* Cloud band */}
        <linearGradient id="neptuneCloud" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#87ceeb" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#b0e0e6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#87ceeb" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {/* Main body */}
      <circle cx="50" cy="50" r="38" fill="url(#neptuneSurface)" />

      {/* Cloud bands */}
      <ellipse cx="50" cy="35" rx="36" ry="4" fill="url(#neptuneCloud)" />
      <ellipse cx="50" cy="48" rx="37" ry="3" fill="url(#neptuneCloud)" />
      <ellipse cx="50" cy="62" rx="35" ry="4" fill="url(#neptuneCloud)" />

      {/* Great Dark Spot */}
      <ellipse cx="38" cy="45" rx="8" ry="5" fill="#191970" opacity="0.6" />

      {/* Small Dark Spot */}
      <ellipse cx="60" cy="58" rx="5" ry="3" fill="#191970" opacity="0.5" />

      {/* Bright cloud features */}
      <ellipse cx="42" cy="42" rx="4" ry="2" fill="#b0e0e6" opacity="0.5" />
      <ellipse cx="58" cy="55" rx="3" ry="1.5" fill="#87ceeb" opacity="0.4" />

      {/* Scooter (fast-moving cloud) */}
      <ellipse cx="55" cy="48" rx="6" ry="2" fill="#e0ffff" opacity="0.35" />

      {/* Highlight */}
      <circle cx="40" cy="38" r="10" fill="white" opacity="0.12" />
    </svg>
  );
}

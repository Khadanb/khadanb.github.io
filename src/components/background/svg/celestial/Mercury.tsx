interface MercuryProps {
  size?: number;
  className?: string;
}

export function Mercury({ size = 40, className = '' }: MercuryProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Mercury surface gradient - gray rocky */}
        <radialGradient id="mercurySurface" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#a0a0a0" />
          <stop offset="50%" stopColor="#787878" />
          <stop offset="100%" stopColor="#505050" />
        </radialGradient>

        {/* Crater shadow */}
        <radialGradient id="mercuryCrater" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#606060" />
          <stop offset="100%" stopColor="#404040" />
        </radialGradient>
      </defs>

      {/* Main body */}
      <circle cx="50" cy="50" r="38" fill="url(#mercurySurface)" />

      {/* Large impact basins */}
      <ellipse cx="35" cy="40" rx="12" ry="10" fill="url(#mercuryCrater)" opacity="0.5" />
      <ellipse cx="60" cy="60" rx="10" ry="8" fill="url(#mercuryCrater)" opacity="0.45" />

      {/* Medium craters */}
      <circle cx="55" cy="35" r="6" fill="#606060" opacity="0.4" />
      <circle cx="30" cy="60" r="5" fill="#606060" opacity="0.35" />
      <circle cx="65" cy="45" r="4" fill="#606060" opacity="0.4" />

      {/* Small craters */}
      <circle cx="45" cy="55" r="3" fill="#505050" opacity="0.35" />
      <circle cx="40" cy="70" r="2.5" fill="#505050" opacity="0.3" />
      <circle cx="70" cy="55" r="2" fill="#505050" opacity="0.35" />
      <circle cx="25" cy="45" r="2" fill="#505050" opacity="0.3" />

      {/* Highlight */}
      <circle cx="38" cy="38" r="10" fill="white" opacity="0.1" />
    </svg>
  );
}

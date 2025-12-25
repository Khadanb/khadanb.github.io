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
        {/* Neptune surface gradient - deep vibrant blue (darker than Uranus) */}
        <radialGradient id="neptuneSurface" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#5080d0" />
          <stop offset="25%" stopColor="#3060b0" />
          <stop offset="55%" stopColor="#203080" />
          <stop offset="100%" stopColor="#101040" />
        </radialGradient>

        {/* Great Dark Spot gradient */}
        <radialGradient id="neptuneGDS" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#101040" />
          <stop offset="100%" stopColor="#181860" />
        </radialGradient>

        {/* Cloud band */}
        <linearGradient id="neptuneCloud" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6090d0" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#80b0e0" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#6090d0" stopOpacity="0.2" />
        </linearGradient>

        {/* Clip path for planet */}
        <clipPath id="neptuneClip">
          <circle cx="50" cy="50" r="38" />
        </clipPath>
      </defs>

      {/* Main body */}
      <circle cx="50" cy="50" r="38" fill="url(#neptuneSurface)" />

      <g clipPath="url(#neptuneClip)">
        {/* High-speed wind bands (Neptune has fastest winds in solar system) */}
        <path
          d="M 12 35 Q 35 32, 55 38 Q 75 42, 88 35"
          fill="none"
          stroke="#6495ed"
          strokeWidth="2.5"
          opacity="0.3"
        />
        <path
          d="M 12 48 Q 30 45, 50 50 Q 70 54, 88 48"
          fill="none"
          stroke="#7caef0"
          strokeWidth="2"
          opacity="0.25"
        />
        <path
          d="M 12 62 Q 35 58, 55 64 Q 75 68, 88 62"
          fill="none"
          stroke="#6495ed"
          strokeWidth="2"
          opacity="0.28"
        />

        {/* Cloud bands */}
        <ellipse cx="50" cy="32" rx="40" ry="4" fill="url(#neptuneCloud)" />
        <ellipse cx="50" cy="55" rx="42" ry="3.5" fill="url(#neptuneCloud)" />
        <ellipse cx="50" cy="72" rx="38" ry="4" fill="url(#neptuneCloud)" />

        {/* Great Dark Spot with bright companion cloud */}
        <ellipse cx="35" cy="48" rx="12" ry="7" fill="url(#neptuneGDS)" opacity="0.7" />
        <ellipse cx="35" cy="48" rx="8" ry="4.5" fill="#101050" opacity="0.6" />
        {/* Companion bright cloud (Scooter-like) */}
        <ellipse cx="40" cy="44" rx="6" ry="2.5" fill="#c0e0ff" opacity="0.55" />

        {/* Small Dark Spot (D2) */}
        <ellipse cx="62" cy="62" rx="6" ry="4" fill="#151555" opacity="0.55" />
        <ellipse cx="65" cy="60" rx="3" ry="1.5" fill="#a0c0e0" opacity="0.45" />

        {/* Scooter (fast-moving white cloud) */}
        <ellipse cx="58" cy="50" rx="7" ry="2.5" fill="#e0f0ff" opacity="0.4" />

        {/* Additional bright cloud features */}
        <ellipse cx="28" cy="38" rx="4" ry="2" fill="#90b8e0" opacity="0.38" />
        <ellipse cx="72" cy="45" rx="3.5" ry="1.8" fill="#a0c8f0" opacity="0.35" />
        <ellipse cx="45" cy="68" rx="5" ry="2" fill="#b0d0f0" opacity="0.32" />

        {/* Methane haze at limbs */}
        <ellipse cx="18" cy="50" rx="5" ry="20" fill="#6080c0" opacity="0.15" />
        <ellipse cx="82" cy="50" rx="5" ry="20" fill="#5070b0" opacity="0.12" />
      </g>

      {/* Highlight */}
      <circle cx="38" cy="36" r="12" fill="white" opacity="0.1" />
    </svg>
  );
}

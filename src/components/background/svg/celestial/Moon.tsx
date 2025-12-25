interface MoonProps {
  size?: number;
  className?: string;
}

export function Moon({ size = 60, className = '' }: MoonProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Moon surface gradient */}
        <radialGradient id="moonSurface" cx="35%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#f5f5f5" />
          <stop offset="40%" stopColor="#e8e8e8" />
          <stop offset="70%" stopColor="#c0c0c0" />
          <stop offset="100%" stopColor="#8a8a8a" />
        </radialGradient>

        {/* Moon glow */}
        <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
          <stop offset="70%" stopColor="#e0e0e0" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#9e9e9e" stopOpacity="0" />
        </radialGradient>

        {/* Mare (dark region) color */}
        <radialGradient id="mareFill" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#707070" />
          <stop offset="100%" stopColor="#606060" />
        </radialGradient>

        {/* Crater shadow */}
        <radialGradient id="craterShadow" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#a0a0a0" />
          <stop offset="100%" stopColor="#606060" />
        </radialGradient>

        {/* Clip path for moon */}
        <clipPath id="moonClip">
          <circle cx="50" cy="50" r="35" />
        </clipPath>
      </defs>

      {/* Outer glow */}
      <circle cx="50" cy="50" r="45" fill="url(#moonGlow)" />

      {/* Main moon body */}
      <circle cx="50" cy="50" r="35" fill="url(#moonSurface)" />

      {/* Mare regions (visible dark basins) */}
      <g clipPath="url(#moonClip)">
        {/* Mare Imbrium (large northwestern mare) */}
        <ellipse cx="38" cy="35" rx="14" ry="12" fill="url(#mareFill)" opacity="0.38" />

        {/* Mare Serenitatis */}
        <ellipse cx="58" cy="38" rx="10" ry="9" fill="url(#mareFill)" opacity="0.35" />

        {/* Mare Tranquillitatis */}
        <ellipse cx="62" cy="52" rx="12" ry="10" fill="url(#mareFill)" opacity="0.33" />

        {/* Oceanus Procellarum (large western mare) */}
        <ellipse cx="28" cy="50" rx="11" ry="16" fill="url(#mareFill)" opacity="0.3" />

        {/* Mare Nubium */}
        <ellipse cx="42" cy="65" rx="10" ry="7" fill="url(#mareFill)" opacity="0.28" />

        {/* Mare Crisium (isolated eastern mare) */}
        <ellipse cx="75" cy="40" rx="6" ry="5" fill="url(#mareFill)" opacity="0.35" />
      </g>

      {/* Tycho crater with ray system */}
      <circle cx="48" cy="75" r="4" fill="#a0a0a0" opacity="0.5" />
      <circle cx="48" cy="75" r="2" fill="#808080" opacity="0.55" />
      {/* Tycho rays */}
      <line x1="48" y1="75" x2="35" y2="55" stroke="#d0d0d0" strokeWidth="0.8" opacity="0.3" />
      <line x1="48" y1="75" x2="60" y2="50" stroke="#d0d0d0" strokeWidth="0.8" opacity="0.28" />
      <line x1="48" y1="75" x2="70" y2="65" stroke="#d0d0d0" strokeWidth="0.7" opacity="0.25" />
      <line x1="48" y1="75" x2="30" y2="70" stroke="#d0d0d0" strokeWidth="0.7" opacity="0.25" />

      {/* Copernicus crater (prominent central crater) */}
      <circle cx="38" cy="52" r="5" fill="url(#craterShadow)" opacity="0.45" />
      <circle cx="38" cy="52" r="2.5" fill="#707070" opacity="0.5" />

      {/* Kepler crater */}
      <circle cx="25" cy="45" r="3" fill="url(#craterShadow)" opacity="0.4" />
      <circle cx="25" cy="45" r="1.5" fill="#707070" opacity="0.45" />

      {/* Aristarchus (bright crater) */}
      <circle cx="22" cy="35" r="2.5" fill="#e0e0e0" opacity="0.5" />
      <circle cx="22" cy="35" r="1.2" fill="#c0c0c0" opacity="0.55" />

      {/* Smaller craters */}
      <circle cx="55" cy="28" r="2" fill="url(#craterShadow)" opacity="0.35" />
      <circle cx="68" cy="55" r="2.5" fill="url(#craterShadow)" opacity="0.3" />
      <circle cx="45" cy="42" r="1.5" fill="#9e9e9e" opacity="0.3" />
      <circle cx="72" cy="48" r="1.5" fill="#9e9e9e" opacity="0.28" />

      {/* Highlight on edge */}
      <path
        d="M 28 22 Q 18 50, 28 78"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        opacity="0.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

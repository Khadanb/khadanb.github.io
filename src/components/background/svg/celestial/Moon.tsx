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
        <radialGradient id="moonSurface" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#f5f5f5" />
          <stop offset="50%" stopColor="#e0e0e0" />
          <stop offset="100%" stopColor="#9e9e9e" />
        </radialGradient>

        {/* Moon glow */}
        <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
          <stop offset="70%" stopColor="#e0e0e0" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#9e9e9e" stopOpacity="0" />
        </radialGradient>

        {/* Crater shadow */}
        <radialGradient id="craterShadow" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#bdbdbd" />
          <stop offset="100%" stopColor="#757575" />
        </radialGradient>
      </defs>

      {/* Outer glow */}
      <circle cx="50" cy="50" r="45" fill="url(#moonGlow)" />

      {/* Main moon body */}
      <circle cx="50" cy="50" r="35" fill="url(#moonSurface)" />

      {/* Large craters */}
      <ellipse cx="35" cy="40" rx="8" ry="7" fill="url(#craterShadow)" opacity="0.4" />
      <ellipse cx="60" cy="55" rx="10" ry="9" fill="url(#craterShadow)" opacity="0.35" />
      <ellipse cx="45" cy="65" rx="6" ry="5" fill="url(#craterShadow)" opacity="0.3" />

      {/* Medium craters */}
      <circle cx="55" cy="35" r="4" fill="#bdbdbd" opacity="0.4" />
      <circle cx="30" cy="55" r="3" fill="#bdbdbd" opacity="0.35" />
      <circle cx="68" cy="42" r="3.5" fill="#bdbdbd" opacity="0.3" />

      {/* Small craters */}
      <circle cx="42" cy="48" r="2" fill="#9e9e9e" opacity="0.3" />
      <circle cx="52" cy="72" r="2" fill="#9e9e9e" opacity="0.25" />
      <circle cx="25" cy="45" r="1.5" fill="#9e9e9e" opacity="0.3" />
      <circle cx="70" cy="60" r="1.5" fill="#9e9e9e" opacity="0.25" />

      {/* Highlight on edge */}
      <path
        d="M 30 25 Q 20 50, 30 75"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        opacity="0.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

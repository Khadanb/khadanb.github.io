interface MarsProps {
  size?: number;
  className?: string;
}

export function Mars({ size = 42, className = '' }: MarsProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Mars surface gradient - rusty red */}
        <radialGradient id="marsSurface" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#e57373" />
          <stop offset="50%" stopColor="#c62828" />
          <stop offset="100%" stopColor="#8b0000" />
        </radialGradient>

        {/* Dark regions */}
        <radialGradient id="marsDark" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#5d0000" />
          <stop offset="100%" stopColor="#8b0000" />
        </radialGradient>

        {/* Polar ice cap */}
        <radialGradient id="marsIce" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e0e0e0" />
        </radialGradient>
      </defs>

      {/* Main body */}
      <circle cx="50" cy="50" r="38" fill="url(#marsSurface)" />

      {/* Dark regions (mare) */}
      <ellipse cx="40" cy="50" rx="15" ry="12" fill="url(#marsDark)" opacity="0.4" />
      <ellipse cx="65" cy="45" rx="10" ry="8" fill="url(#marsDark)" opacity="0.35" />
      <ellipse cx="55" cy="65" rx="12" ry="8" fill="url(#marsDark)" opacity="0.3" />

      {/* Valles Marineris (canyon) */}
      <path
        d="M 30 48 Q 45 52, 60 48 Q 70 46, 75 50"
        fill="none"
        stroke="#5d0000"
        strokeWidth="2"
        opacity="0.5"
        strokeLinecap="round"
      />

      {/* Olympus Mons (volcano) */}
      <circle cx="35" cy="35" r="6" fill="#b71c1c" opacity="0.5" />
      <circle cx="35" cy="35" r="3" fill="#7f0000" opacity="0.4" />

      {/* North polar ice cap */}
      <ellipse cx="50" cy="18" rx="15" ry="6" fill="url(#marsIce)" opacity="0.8" />

      {/* South polar ice cap */}
      <ellipse cx="50" cy="82" rx="12" ry="5" fill="url(#marsIce)" opacity="0.6" />

      {/* Highlight */}
      <circle cx="38" cy="38" r="10" fill="white" opacity="0.1" />
    </svg>
  );
}

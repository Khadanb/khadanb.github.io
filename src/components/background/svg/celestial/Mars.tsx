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
          <stop offset="0%" stopColor="#ef9a9a" />
          <stop offset="30%" stopColor="#e57373" />
          <stop offset="60%" stopColor="#c62828" />
          <stop offset="100%" stopColor="#7f0000" />
        </radialGradient>

        {/* Dark regions */}
        <radialGradient id="marsDark" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4a0000" />
          <stop offset="100%" stopColor="#6d0000" />
        </radialGradient>

        {/* Polar ice cap - layered */}
        <radialGradient id="marsIce" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="70%" stopColor="#e8f5ff" />
          <stop offset="100%" stopColor="#b0bec5" />
        </radialGradient>

        {/* Clip path for planet */}
        <clipPath id="marsClip">
          <circle cx="50" cy="50" r="38" />
        </clipPath>
      </defs>

      {/* Main body */}
      <circle cx="50" cy="50" r="38" fill="url(#marsSurface)" />

      <g clipPath="url(#marsClip)">
        {/* Syrtis Major (distinctive dark region) */}
        <path
          d="M 55 40 Q 62 42, 68 50 Q 70 60, 62 68 Q 55 65, 52 55 Q 50 45, 55 40 Z"
          fill="url(#marsDark)"
          opacity="0.45"
        />

        {/* Mare Acidalium (northern dark region) */}
        <ellipse cx="38" cy="32" rx="12" ry="10" fill="url(#marsDark)" opacity="0.35" />

        {/* Mare Sirenum (southern dark region) */}
        <ellipse cx="30" cy="62" rx="14" ry="8" fill="url(#marsDark)" opacity="0.32" />

        {/* Tharsis Bulge - Olympus Mons (largest volcano in solar system) */}
        <circle cx="28" cy="42" r="10" fill="#b71c1c" opacity="0.4" />
        <circle cx="28" cy="42" r="6" fill="#a01010" opacity="0.5" />
        <circle cx="28" cy="42" r="2.5" fill="#6d0000" opacity="0.6" />

        {/* Ascraeus Mons */}
        <circle cx="36" cy="34" r="5" fill="#a01010" opacity="0.35" />
        <circle cx="36" cy="34" r="2" fill="#700000" opacity="0.45" />

        {/* Pavonis Mons */}
        <circle cx="34" cy="48" r="4" fill="#a01010" opacity="0.35" />
        <circle cx="34" cy="48" r="1.5" fill="#700000" opacity="0.4" />

        {/* Arsia Mons */}
        <circle cx="30" cy="56" r="4.5" fill="#a01010" opacity="0.35" />
        <circle cx="30" cy="56" r="1.8" fill="#700000" opacity="0.4" />

        {/* Valles Marineris (grand canyon - enhanced) */}
        <path
          d="M 22 52 C 35 50, 50 54, 65 50 Q 78 48, 85 52"
          fill="none"
          stroke="#3d0000"
          strokeWidth="3"
          opacity="0.55"
          strokeLinecap="round"
        />
        {/* Canyon tributary */}
        <path
          d="M 40 52 Q 42 56, 45 54"
          fill="none"
          stroke="#3d0000"
          strokeWidth="1.5"
          opacity="0.35"
        />
        <path
          d="M 55 52 Q 58 48, 62 50"
          fill="none"
          stroke="#3d0000"
          strokeWidth="1"
          opacity="0.3"
        />

        {/* North polar ice cap - layered deposits */}
        <ellipse cx="50" cy="15" rx="20" ry="8" fill="url(#marsIce)" opacity="0.85" />
        <ellipse cx="50" cy="17" rx="16" ry="6" fill="#f0f8ff" opacity="0.7" />

        {/* South polar ice cap */}
        <ellipse cx="50" cy="85" rx="14" ry="6" fill="url(#marsIce)" opacity="0.7" />
        <ellipse cx="50" cy="84" rx="10" ry="4" fill="#f0f8ff" opacity="0.5" />

        {/* Hellas Basin (large impact crater - southern hemisphere) */}
        <ellipse cx="70" cy="68" rx="8" ry="6" fill="#f5c6c6" opacity="0.25" />
      </g>

      {/* Highlight */}
      <circle cx="36" cy="36" r="12" fill="white" opacity="0.1" />
    </svg>
  );
}

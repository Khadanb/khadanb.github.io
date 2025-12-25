interface VenusProps {
  size?: number;
  className?: string;
}

export function Venus({ size = 45, className = '' }: VenusProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Venus atmosphere gradient - yellowish with sulfuric tint */}
        <radialGradient id="venusSurface" cx="35%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#f5e6c0" />
          <stop offset="30%" stopColor="#e8d080" />
          <stop offset="60%" stopColor="#d4b050" />
          <stop offset="100%" stopColor="#a08030" />
        </radialGradient>

        {/* Cloud bands */}
        <linearGradient id="venusCloud" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f5e0a0" stopOpacity="0.25" />
          <stop offset="50%" stopColor="#fffad0" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#f5e0a0" stopOpacity="0.25" />
        </linearGradient>

        {/* Y-pattern cloud gradient */}
        <linearGradient id="venusYPattern" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fffacd" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#f0e68c" stopOpacity="0.25" />
        </linearGradient>

        {/* Clip path for planet */}
        <clipPath id="venusClip">
          <circle cx="50" cy="50" r="38" />
        </clipPath>
      </defs>

      {/* Main body */}
      <circle cx="50" cy="50" r="38" fill="url(#venusSurface)" />

      <g clipPath="url(#venusClip)">
        {/* Thick cloud bands */}
        <ellipse cx="50" cy="30" rx="40" ry="5" fill="url(#venusCloud)" />
        <ellipse cx="50" cy="42" rx="42" ry="4" fill="url(#venusCloud)" />
        <ellipse cx="50" cy="54" rx="40" ry="5" fill="url(#venusCloud)" />
        <ellipse cx="50" cy="66" rx="38" ry="4" fill="url(#venusCloud)" />
        <ellipse cx="50" cy="78" rx="35" ry="4" fill="url(#venusCloud)" />

        {/* Y-shaped upper atmosphere pattern (distinctive Venus feature) */}
        <path
          d="M 20 50 Q 35 40, 50 35 Q 65 40, 80 50"
          fill="none"
          stroke="#fffacd"
          strokeWidth="5"
          opacity="0.35"
          strokeLinecap="round"
        />
        <path
          d="M 50 35 L 50 18"
          fill="none"
          stroke="#fffacd"
          strokeWidth="4"
          opacity="0.3"
          strokeLinecap="round"
        />

        {/* Polar vortex hints */}
        <ellipse cx="50" cy="20" rx="12" ry="6" fill="#f5deb3" opacity="0.25" />
        <ellipse cx="50" cy="80" rx="10" ry="5" fill="#d4a040" opacity="0.2" />

        {/* Turbulent cloud vortices */}
        <path
          d="M 30 55 Q 25 50, 30 45 Q 38 48, 34 55 Q 30 58, 30 55"
          fill="#f5deb3"
          opacity="0.25"
        />
        <path
          d="M 68 48 Q 72 44, 70 50 Q 68 54, 65 52 Q 66 48, 68 48"
          fill="#f5deb3"
          opacity="0.22"
        />

        {/* Subtle darker regions */}
        <ellipse cx="40" cy="60" rx="8" ry="4" fill="#c49a30" opacity="0.2" />
        <ellipse cx="62" cy="38" rx="6" ry="3" fill="#c49a30" opacity="0.18" />

        {/* Chevron-like cloud features */}
        <path
          d="M 25 65 Q 40 60, 50 65 Q 60 60, 75 65"
          fill="none"
          stroke="#e8d090"
          strokeWidth="2"
          opacity="0.25"
        />
      </g>

      {/* Highlight */}
      <circle cx="36" cy="36" r="12" fill="white" opacity="0.12" />
    </svg>
  );
}

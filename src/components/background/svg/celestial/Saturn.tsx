interface SaturnProps {
  size?: number;
  className?: string;
}

export function Saturn({ size = 70, className = '' }: SaturnProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Planet body gradient */}
        <linearGradient id="saturnBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f9e4b7" />
          <stop offset="30%" stopColor="#e8c88b" />
          <stop offset="60%" stopColor="#d4a85a" />
          <stop offset="100%" stopColor="#c49a4a" />
        </linearGradient>

        {/* Ring gradient */}
        <linearGradient id="saturnRing" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#d4a85a" stopOpacity="0.3" />
          <stop offset="20%" stopColor="#e8c88b" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#f0d9a0" stopOpacity="0.8" />
          <stop offset="80%" stopColor="#e8c88b" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#d4a85a" stopOpacity="0.3" />
        </linearGradient>

        {/* Shadow for planet */}
        <radialGradient id="saturnShadow" cx="70%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#f9e4b7" stopOpacity="0" />
          <stop offset="100%" stopColor="#8b7355" stopOpacity="0.4" />
        </radialGradient>

        {/* Clip path for back ring */}
        <clipPath id="backRingClip">
          <rect x="0" y="0" width="120" height="45" />
        </clipPath>

        {/* Clip path for front ring */}
        <clipPath id="frontRingClip">
          <rect x="0" y="55" width="120" height="45" />
        </clipPath>
      </defs>

      {/* Back portion of ring (behind planet) */}
      <g clipPath="url(#backRingClip)">
        <ellipse
          cx="60"
          cy="50"
          rx="55"
          ry="12"
          fill="none"
          stroke="url(#saturnRing)"
          strokeWidth="8"
          transform="rotate(-15, 60, 50)"
        />
      </g>

      {/* Planet body */}
      <ellipse cx="60" cy="50" rx="25" ry="23" fill="url(#saturnBody)" />

      {/* Planet bands */}
      <ellipse cx="60" cy="42" rx="24" ry="3" fill="#d4a85a" opacity="0.3" />
      <ellipse cx="60" cy="50" rx="25" ry="2" fill="#c49a4a" opacity="0.25" />
      <ellipse cx="60" cy="58" rx="24" ry="3" fill="#d4a85a" opacity="0.3" />

      {/* Planet shadow overlay */}
      <ellipse cx="60" cy="50" rx="25" ry="23" fill="url(#saturnShadow)" />

      {/* Front portion of ring (in front of planet) */}
      <g clipPath="url(#frontRingClip)">
        <ellipse
          cx="60"
          cy="50"
          rx="55"
          ry="12"
          fill="none"
          stroke="url(#saturnRing)"
          strokeWidth="8"
          transform="rotate(-15, 60, 50)"
        />
      </g>

      {/* Ring divisions */}
      <ellipse
        cx="60"
        cy="50"
        rx="48"
        ry="10"
        fill="none"
        stroke="#c49a4a"
        strokeWidth="1"
        opacity="0.3"
        transform="rotate(-15, 60, 50)"
      />
    </svg>
  );
}

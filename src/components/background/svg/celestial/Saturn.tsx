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
        <radialGradient id="saturnBody" cx="35%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#f9e4c0" />
          <stop offset="30%" stopColor="#e8d090" />
          <stop offset="60%" stopColor="#d4b060" />
          <stop offset="100%" stopColor="#a08040" />
        </radialGradient>

        {/* A Ring (outer, dimmer) gradient */}
        <linearGradient id="saturnRingA" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#c9a87c" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#d4b080" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#c9a87c" stopOpacity="0.3" />
        </linearGradient>

        {/* B Ring (inner, brighter) gradient */}
        <linearGradient id="saturnRingB" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e8d0a0" stopOpacity="0.5" />
          <stop offset="50%" stopColor="#f5e8c0" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#e8d0a0" stopOpacity="0.5" />
        </linearGradient>

        {/* C Ring (innermost, faint) gradient */}
        <linearGradient id="saturnRingC" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#a09070" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#b0a080" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#a09070" stopOpacity="0.2" />
        </linearGradient>

        {/* Shadow for planet */}
        <radialGradient id="saturnShadow" cx="70%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#f9e4b7" stopOpacity="0" />
          <stop offset="100%" stopColor="#705030" stopOpacity="0.4" />
        </radialGradient>

        {/* Clip path for back ring (above planet center) */}
        <clipPath id="backRingClip">
          <rect x="0" y="0" width="120" height="50" />
        </clipPath>

        {/* Clip path for front ring (below planet center) */}
        <clipPath id="frontRingClip">
          <rect x="0" y="50" width="120" height="50" />
        </clipPath>

        {/* Clip path for planet body */}
        <clipPath id="saturnBodyClip">
          <ellipse cx="60" cy="50" rx="25" ry="23" />
        </clipPath>
      </defs>

      {/* Back portion of rings (behind planet) */}
      <g clipPath="url(#backRingClip)">
        {/* A Ring (outer) */}
        <ellipse
          cx="60"
          cy="50"
          rx="56"
          ry="12"
          fill="none"
          stroke="url(#saturnRingA)"
          strokeWidth="5"
          transform="rotate(-15, 60, 50)"
        />
        {/* Cassini Division (dark gap) */}
        <ellipse
          cx="60"
          cy="50"
          rx="49"
          ry="10.5"
          fill="none"
          stroke="#1a1a1a"
          strokeWidth="1.5"
          opacity="0.6"
          transform="rotate(-15, 60, 50)"
        />
        {/* B Ring (inner, brighter) */}
        <ellipse
          cx="60"
          cy="50"
          rx="45"
          ry="9.5"
          fill="none"
          stroke="url(#saturnRingB)"
          strokeWidth="7"
          transform="rotate(-15, 60, 50)"
        />
        {/* C Ring (innermost, faint) */}
        <ellipse
          cx="60"
          cy="50"
          rx="36"
          ry="7.5"
          fill="none"
          stroke="url(#saturnRingC)"
          strokeWidth="4"
          transform="rotate(-15, 60, 50)"
        />
      </g>

      {/* Planet body */}
      <ellipse cx="60" cy="50" rx="25" ry="23" fill="url(#saturnBody)" />

      {/* Planet bands */}
      <g clipPath="url(#saturnBodyClip)">
        <ellipse cx="60" cy="36" rx="26" ry="4" fill="#c4a050" opacity="0.25" />
        <ellipse cx="60" cy="44" rx="26" ry="3" fill="#b09040" opacity="0.3" />
        <ellipse cx="60" cy="50" rx="26" ry="2.5" fill="#d4b060" opacity="0.2" />
        <ellipse cx="60" cy="56" rx="26" ry="3" fill="#b09040" opacity="0.28" />
        <ellipse cx="60" cy="64" rx="26" ry="4" fill="#c4a050" opacity="0.22" />

        {/* Northern storm feature */}
        <ellipse cx="52" cy="38" rx="5" ry="2" fill="#c49a4a" opacity="0.35" />
      </g>

      {/* Planet shadow overlay */}
      <ellipse cx="60" cy="50" rx="25" ry="23" fill="url(#saturnShadow)" />

      {/* Front portion of rings (in front of planet) */}
      <g clipPath="url(#frontRingClip)">
        {/* A Ring (outer) */}
        <ellipse
          cx="60"
          cy="50"
          rx="56"
          ry="12"
          fill="none"
          stroke="url(#saturnRingA)"
          strokeWidth="5"
          transform="rotate(-15, 60, 50)"
        />
        {/* Cassini Division (dark gap) */}
        <ellipse
          cx="60"
          cy="50"
          rx="49"
          ry="10.5"
          fill="none"
          stroke="#1a1a1a"
          strokeWidth="1.5"
          opacity="0.6"
          transform="rotate(-15, 60, 50)"
        />
        {/* B Ring (inner, brighter) */}
        <ellipse
          cx="60"
          cy="50"
          rx="45"
          ry="9.5"
          fill="none"
          stroke="url(#saturnRingB)"
          strokeWidth="7"
          transform="rotate(-15, 60, 50)"
        />
        {/* C Ring (innermost, faint) */}
        <ellipse
          cx="60"
          cy="50"
          rx="36"
          ry="7.5"
          fill="none"
          stroke="url(#saturnRingC)"
          strokeWidth="4"
          transform="rotate(-15, 60, 50)"
        />
      </g>

      {/* Encke Gap hint in A ring */}
      <ellipse
        cx="60"
        cy="50"
        rx="53"
        ry="11.3"
        fill="none"
        stroke="#2a2a2a"
        strokeWidth="0.5"
        opacity="0.35"
        transform="rotate(-15, 60, 50)"
      />

      {/* Highlight */}
      <ellipse cx="50" cy="40" rx="8" ry="6" fill="white" opacity="0.08" />
    </svg>
  );
}

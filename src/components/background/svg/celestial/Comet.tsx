interface CometProps {
  size?: number;
  className?: string;
}

export function Comet({ size = 80, className = '' }: CometProps) {
  // Comet oriented with head on right, tail extending left
  // This allows rotation to point in direction of travel
  return (
    <svg
      width={size}
      height={size * 0.4}
      viewBox="0 0 100 40"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Comet nucleus gradient - icy white/blue */}
        <radialGradient id="cometNucleus" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#e0f7ff" />
          <stop offset="80%" stopColor="#80d8ff" />
          <stop offset="100%" stopColor="#40c4ff" />
        </radialGradient>

        {/* Coma (fuzzy halo) gradient */}
        <radialGradient id="cometComa" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#80d8ff" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#40c4ff" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#00b0ff" stopOpacity="0" />
        </radialGradient>

        {/* Tail gradient - fades from bright to transparent */}
        <linearGradient id="cometTail" x1="100%" y1="50%" x2="0%" y2="50%">
          <stop offset="0%" stopColor="#b3e5fc" stopOpacity="0.8" />
          <stop offset="20%" stopColor="#81d4fa" stopOpacity="0.5" />
          <stop offset="50%" stopColor="#4fc3f7" stopOpacity="0.25" />
          <stop offset="80%" stopColor="#29b6f6" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#03a9f4" stopOpacity="0" />
        </linearGradient>

        {/* Dust tail gradient (slightly different color) */}
        <linearGradient id="cometDustTail" x1="100%" y1="50%" x2="0%" y2="50%">
          <stop offset="0%" stopColor="#fff8e1" stopOpacity="0.5" />
          <stop offset="30%" stopColor="#ffe0b2" stopOpacity="0.3" />
          <stop offset="60%" stopColor="#ffcc80" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#ffb74d" stopOpacity="0" />
        </linearGradient>

        {/* Glow filter for nucleus */}
        <filter id="cometGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Ion tail (blue, straight) */}
      <path
        d="M 85 20 Q 50 20, 10 18 Q 0 18, -5 20"
        fill="none"
        stroke="url(#cometTail)"
        strokeWidth="8"
        strokeLinecap="round"
      />

      {/* Dust tail (yellowish, curved slightly) */}
      <path
        d="M 85 20 Q 55 22, 25 26 Q 10 28, 0 30"
        fill="none"
        stroke="url(#cometDustTail)"
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* Additional ion tail streaks */}
      <path
        d="M 82 18 Q 50 17, 15 14"
        fill="none"
        stroke="url(#cometTail)"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M 82 22 Q 50 23, 15 26"
        fill="none"
        stroke="url(#cometTail)"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.4"
      />

      {/* Coma (fuzzy halo around nucleus) */}
      <ellipse cx="85" cy="20" rx="12" ry="12" fill="url(#cometComa)" />

      {/* Nucleus (solid icy core) */}
      <circle
        cx="85"
        cy="20"
        r="5"
        fill="url(#cometNucleus)"
        filter="url(#cometGlow)"
      />

      {/* Bright center of nucleus */}
      <circle cx="84" cy="19" r="2" fill="white" opacity="0.9" />
    </svg>
  );
}

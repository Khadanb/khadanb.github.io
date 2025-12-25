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
          <stop offset="0%" stopColor="#b0b0b0" />
          <stop offset="30%" stopColor="#909090" />
          <stop offset="60%" stopColor="#707070" />
          <stop offset="100%" stopColor="#454545" />
        </radialGradient>

        {/* Crater shadow */}
        <radialGradient id="mercuryCrater" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#707070" />
          <stop offset="100%" stopColor="#404040" />
        </radialGradient>

        {/* Caloris Basin gradient */}
        <radialGradient id="calorisBasin" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#606060" />
          <stop offset="70%" stopColor="#505050" />
          <stop offset="100%" stopColor="#656565" />
        </radialGradient>

        {/* Clip path for planet */}
        <clipPath id="mercuryClip">
          <circle cx="50" cy="50" r="38" />
        </clipPath>
      </defs>

      {/* Main body */}
      <circle cx="50" cy="50" r="38" fill="url(#mercurySurface)" />

      <g clipPath="url(#mercuryClip)">
        {/* Caloris Basin (largest impact feature) */}
        <circle cx="32" cy="38" r="16" fill="url(#calorisBasin)" opacity="0.4" />
        <circle cx="32" cy="38" r="12" fill="#5a5a5a" opacity="0.35" />
        {/* Caloris rim */}
        <circle cx="32" cy="38" r="16" fill="none" stroke="#808080" strokeWidth="1.5" opacity="0.35" />
        {/* Ejecta rays from Caloris */}
        <line x1="32" y1="38" x2="15" y2="22" stroke="#8a8a8a" strokeWidth="1" opacity="0.2" />
        <line x1="32" y1="38" x2="52" y2="25" stroke="#8a8a8a" strokeWidth="1" opacity="0.18" />
        <line x1="32" y1="38" x2="18" y2="55" stroke="#8a8a8a" strokeWidth="0.8" opacity="0.15" />

        {/* Rachmaninoff Basin */}
        <circle cx="62" cy="55" r="10" fill="url(#mercuryCrater)" opacity="0.4" />
        <circle cx="62" cy="55" r="5" fill="#555555" opacity="0.35" />

        {/* Discovery Rupes (scarp/cliff) */}
        <path
          d="M 58 28 Q 65 42, 58 58 Q 52 72, 60 82"
          fill="none"
          stroke="#505050"
          strokeWidth="2"
          opacity="0.35"
          strokeLinecap="round"
        />

        {/* Beagle Rupes */}
        <path
          d="M 72 35 Q 78 45, 75 55"
          fill="none"
          stroke="#505050"
          strokeWidth="1.5"
          opacity="0.3"
          strokeLinecap="round"
        />

        {/* Medium craters with rim highlights */}
        <circle cx="55" cy="32" r="6" fill="url(#mercuryCrater)" opacity="0.45" />
        <path d="M 51 29 Q 55 27, 59 29" fill="none" stroke="#a0a0a0" strokeWidth="1" opacity="0.4" />

        <circle cx="28" cy="62" r="5" fill="url(#mercuryCrater)" opacity="0.4" />
        <path d="M 25 59 Q 28 57, 31 59" fill="none" stroke="#a0a0a0" strokeWidth="0.8" opacity="0.35" />

        <circle cx="70" cy="42" r="4" fill="url(#mercuryCrater)" opacity="0.4" />

        <circle cx="45" cy="70" r="4.5" fill="url(#mercuryCrater)" opacity="0.38" />

        {/* Small craters */}
        <circle cx="48" cy="50" r="3" fill="#505050" opacity="0.35" />
        <circle cx="38" cy="22" r="2.5" fill="#505050" opacity="0.32" />
        <circle cx="75" cy="58" r="2" fill="#505050" opacity="0.3" />
        <circle cx="22" cy="48" r="2" fill="#505050" opacity="0.28" />
        <circle cx="52" cy="78" r="2.5" fill="#505050" opacity="0.28" />
        <circle cx="80" cy="48" r="1.5" fill="#505050" opacity="0.25" />
      </g>

      {/* Highlight */}
      <circle cx="36" cy="36" r="12" fill="white" opacity="0.1" />
    </svg>
  );
}

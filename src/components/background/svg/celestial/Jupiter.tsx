interface JupiterProps {
  size?: number;
  className?: string;
}

export function Jupiter({ size = 90, className = '' }: JupiterProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Jupiter base gradient */}
        <radialGradient id="jupiterBase" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#f5e6d3" />
          <stop offset="50%" stopColor="#d4a574" />
          <stop offset="100%" stopColor="#8b6914" />
        </radialGradient>

        {/* Band colors */}
        <linearGradient id="jupiterBand1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#c9a87c" />
          <stop offset="50%" stopColor="#e8d4b8" />
          <stop offset="100%" stopColor="#c9a87c" />
        </linearGradient>

        <linearGradient id="jupiterBand2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8b4513" />
          <stop offset="50%" stopColor="#a0522d" />
          <stop offset="100%" stopColor="#8b4513" />
        </linearGradient>

        {/* Great Red Spot gradient */}
        <radialGradient id="redSpot" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#cd5c5c" />
          <stop offset="50%" stopColor="#b22222" />
          <stop offset="100%" stopColor="#8b0000" />
        </radialGradient>

        {/* Clip path for bands */}
        <clipPath id="jupiterClip">
          <circle cx="50" cy="50" r="38" />
        </clipPath>
      </defs>

      {/* Main body */}
      <circle cx="50" cy="50" r="38" fill="url(#jupiterBase)" />

      {/* Cloud bands */}
      <g clipPath="url(#jupiterClip)">
        {/* Light zones */}
        <rect x="10" y="22" width="80" height="6" fill="url(#jupiterBand1)" opacity="0.7" />
        <rect x="10" y="34" width="80" height="8" fill="url(#jupiterBand1)" opacity="0.6" />
        <rect x="10" y="52" width="80" height="7" fill="url(#jupiterBand1)" opacity="0.65" />
        <rect x="10" y="68" width="80" height="6" fill="url(#jupiterBand1)" opacity="0.6" />

        {/* Dark belts */}
        <rect x="10" y="28" width="80" height="6" fill="url(#jupiterBand2)" opacity="0.5" />
        <rect x="10" y="42" width="80" height="10" fill="url(#jupiterBand2)" opacity="0.45" />
        <rect x="10" y="59" width="80" height="9" fill="url(#jupiterBand2)" opacity="0.5" />
        <rect x="10" y="74" width="80" height="5" fill="url(#jupiterBand2)" opacity="0.4" />
      </g>

      {/* Great Red Spot */}
      <ellipse cx="62" cy="48" rx="10" ry="6" fill="url(#redSpot)" opacity="0.8" />
      <ellipse cx="62" cy="48" rx="6" ry="3" fill="#cd5c5c" opacity="0.5" />

      {/* Swirling storm details */}
      <path
        d="M 55 48 Q 62 44, 69 48 Q 62 52, 55 48"
        fill="none"
        stroke="#8b0000"
        strokeWidth="1"
        opacity="0.4"
      />

      {/* Highlight */}
      <circle cx="38" cy="35" r="12" fill="white" opacity="0.1" />
    </svg>
  );
}

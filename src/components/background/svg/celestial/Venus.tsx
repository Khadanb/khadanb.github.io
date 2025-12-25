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
        {/* Venus atmosphere gradient - yellowish orange */}
        <radialGradient id="venusSurface" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#f5deb3" />
          <stop offset="40%" stopColor="#daa520" />
          <stop offset="100%" stopColor="#b8860b" />
        </radialGradient>

        {/* Cloud bands */}
        <linearGradient id="venusCloud" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f5deb3" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#fffacd" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#f5deb3" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      {/* Main body */}
      <circle cx="50" cy="50" r="38" fill="url(#venusSurface)" />

      {/* Thick cloud bands */}
      <ellipse cx="50" cy="35" rx="36" ry="5" fill="url(#venusCloud)" />
      <ellipse cx="50" cy="45" rx="37" ry="4" fill="url(#venusCloud)" />
      <ellipse cx="50" cy="55" rx="36" ry="5" fill="url(#venusCloud)" />
      <ellipse cx="50" cy="65" rx="35" ry="4" fill="url(#venusCloud)" />

      {/* Swirling cloud patterns */}
      <path
        d="M 25 45 Q 35 40, 50 45 Q 65 50, 75 45"
        fill="none"
        stroke="#fffacd"
        strokeWidth="3"
        opacity="0.3"
      />
      <path
        d="M 20 55 Q 35 60, 50 55 Q 65 50, 80 55"
        fill="none"
        stroke="#fffacd"
        strokeWidth="2"
        opacity="0.25"
      />

      {/* Highlight */}
      <circle cx="38" cy="38" r="12" fill="white" opacity="0.15" />
    </svg>
  );
}

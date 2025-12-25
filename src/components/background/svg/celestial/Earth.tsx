interface EarthProps {
  size?: number;
  className?: string;
}

export function Earth({ size = 50, className = '' }: EarthProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Ocean gradient */}
        <radialGradient id="earthOcean" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#4fc3f7" />
          <stop offset="50%" stopColor="#0288d1" />
          <stop offset="100%" stopColor="#01579b" />
        </radialGradient>

        {/* Atmosphere glow */}
        <radialGradient id="earthGlow" cx="50%" cy="50%" r="50%">
          <stop offset="80%" stopColor="#4fc3f7" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#0288d1" stopOpacity="0" />
        </radialGradient>

        {/* Land color */}
        <linearGradient id="landGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#81c784" />
          <stop offset="100%" stopColor="#388e3c" />
        </linearGradient>
      </defs>

      {/* Atmosphere glow */}
      <circle cx="50" cy="50" r="45" fill="url(#earthGlow)" />

      {/* Ocean base */}
      <circle cx="50" cy="50" r="35" fill="url(#earthOcean)" />

      {/* Continents - simplified shapes */}
      {/* North America */}
      <path
        d="M 25 30 Q 30 25, 40 28 Q 45 32, 42 40 Q 38 45, 30 42 Q 22 38, 25 30"
        fill="url(#landGradient)"
        opacity="0.9"
      />

      {/* South America */}
      <path
        d="M 35 52 Q 40 50, 42 55 Q 44 65, 38 72 Q 32 70, 33 60 Q 32 54, 35 52"
        fill="url(#landGradient)"
        opacity="0.9"
      />

      {/* Europe/Africa */}
      <path
        d="M 52 28 Q 58 25, 62 30 Q 65 38, 60 45 Q 55 50, 58 60 Q 60 68, 55 72 Q 50 70, 52 60 Q 48 50, 50 40 Q 48 32, 52 28"
        fill="url(#landGradient)"
        opacity="0.9"
      />

      {/* Asia/Australia hint */}
      <path
        d="M 68 35 Q 75 32, 78 40 Q 80 48, 75 52 Q 70 50, 68 42 Q 66 38, 68 35"
        fill="url(#landGradient)"
        opacity="0.9"
      />

      {/* Cloud wisps */}
      <ellipse cx="35" cy="35" rx="12" ry="4" fill="white" opacity="0.4" />
      <ellipse cx="60" cy="50" rx="10" ry="3" fill="white" opacity="0.35" />
      <ellipse cx="45" cy="65" rx="8" ry="3" fill="white" opacity="0.3" />

      {/* Highlight */}
      <circle cx="38" cy="35" r="8" fill="white" opacity="0.15" />
    </svg>
  );
}

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
        {/* Ocean gradient - enhanced depth */}
        <radialGradient id="earthOcean" cx="35%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#64b5f6" />
          <stop offset="30%" stopColor="#1e88e5" />
          <stop offset="70%" stopColor="#0d47a1" />
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
          <stop offset="50%" stopColor="#4caf50" />
          <stop offset="100%" stopColor="#2e7d32" />
        </linearGradient>

        {/* Clip path for planet */}
        <clipPath id="earthClip">
          <circle cx="50" cy="50" r="35" />
        </clipPath>
      </defs>

      {/* Atmosphere glow */}
      <circle cx="50" cy="50" r="45" fill="url(#earthGlow)" />

      {/* Ocean base */}
      <circle cx="50" cy="50" r="35" fill="url(#earthOcean)" />

      {/* Continents - Americas view */}
      <g clipPath="url(#earthClip)">
        {/* Greenland */}
        <ellipse cx="58" cy="22" rx="7" ry="5" fill="url(#landGradient)" opacity="0.85" />

        {/* North America - recognizable shape */}
        <path
          d="M 22 28
             Q 26 24, 32 23
             L 38 22 Q 44 21, 48 24
             Q 52 27, 50 32
             L 48 36 Q 46 40, 42 44
             L 38 48 Q 36 50, 38 52
             L 40 54 Q 42 52, 44 50
             Q 46 48, 44 44
             Q 48 40, 50 36
             L 52 32 Q 50 28, 46 26
             Q 42 32, 40 38
             L 38 42 Q 40 46, 38 50
             L 34 52 Q 30 50, 28 46
             L 26 42 Q 22 38, 20 34
             Q 18 30, 22 28 Z"
          fill="url(#landGradient)"
          opacity="0.9"
        />

        {/* Florida peninsula */}
        <path
          d="M 42 50 Q 44 52, 45 56 Q 46 60, 44 62 Q 42 60, 42 56 Q 41 52, 42 50 Z"
          fill="url(#landGradient)"
          opacity="0.88"
        />

        {/* Baja California */}
        <path
          d="M 20 44 Q 18 48, 19 52 Q 20 50, 21 46 Q 22 44, 20 44 Z"
          fill="url(#landGradient)"
          opacity="0.85"
        />

        {/* Central America isthmus */}
        <path
          d="M 36 58 Q 34 60, 33 64 Q 32 68, 34 70 Q 36 68, 35 64 Q 36 60, 38 58 Z"
          fill="url(#landGradient)"
          opacity="0.88"
        />

        {/* South America - triangular with Brazilian bulge */}
        <path
          d="M 34 70
             Q 38 68, 44 70
             Q 50 72, 52 76
             L 50 80 Q 48 84, 44 86
             L 40 88 Q 36 86, 36 82
             L 34 78 Q 32 74, 34 70 Z"
          fill="url(#landGradient)"
          opacity="0.9"
        />

        {/* West Africa (edge of view) */}
        <path
          d="M 68 42 Q 72 40, 76 44 Q 78 50, 74 56 Q 70 54, 68 48 Q 66 44, 68 42 Z"
          fill="url(#landGradient)"
          opacity="0.7"
        />

        {/* Europe hint (edge of view) */}
        <path
          d="M 70 30 Q 74 28, 78 32 Q 80 36, 76 38 Q 72 36, 70 32 Q 68 30, 70 30 Z"
          fill="url(#landGradient)"
          opacity="0.6"
        />
      </g>

      {/* Cloud formations */}
      {/* Spiral cloud over Atlantic */}
      <path
        d="M 58 48 Q 62 44, 66 48 Q 64 52, 60 50 Q 58 52, 58 48"
        fill="white"
        opacity="0.35"
      />

      {/* Cloud band over North America */}
      <ellipse cx="32" cy="32" rx="10" ry="3" fill="white" opacity="0.38" />

      {/* Cloud wisps */}
      <ellipse cx="48" cy="40" rx="6" ry="2" fill="white" opacity="0.3" />
      <ellipse cx="40" cy="75" rx="8" ry="2.5" fill="white" opacity="0.32" />
      <ellipse cx="25" cy="55" rx="5" ry="2" fill="white" opacity="0.28" />

      {/* Highlight */}
      <circle cx="35" cy="32" r="10" fill="white" opacity="0.12" />
    </svg>
  );
}

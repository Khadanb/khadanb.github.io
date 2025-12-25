interface TelescopeProps {
  size?: number;
  className?: string;
}

export function Telescope({ size = 40, className = '' }: TelescopeProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Gold foil gradient */}
        <linearGradient id="goldFoil" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffd54f" />
          <stop offset="50%" stopColor="#ffb300" />
          <stop offset="100%" stopColor="#ff8f00" />
        </linearGradient>

        {/* Silver gradient */}
        <linearGradient id="silver" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e0e0e0" />
          <stop offset="50%" stopColor="#f5f5f5" />
          <stop offset="100%" stopColor="#bdbdbd" />
        </linearGradient>
      </defs>

      {/* Main hexagonal mirror (simplified) */}
      <polygon
        points="50,15 75,32 75,68 50,85 25,68 25,32"
        fill="url(#goldFoil)"
        opacity="0.9"
      />

      {/* Mirror segments */}
      <polygon
        points="50,20 65,30 65,50 50,60 35,50 35,30"
        fill="#ffca28"
        opacity="0.6"
      />

      {/* Sunshield layers */}
      <line x1="20" y1="50" x2="10" y2="45" stroke="url(#silver)" strokeWidth="3" />
      <line x1="20" y1="55" x2="8" y2="55" stroke="url(#silver)" strokeWidth="3" />
      <line x1="20" y1="60" x2="10" y2="65" stroke="url(#silver)" strokeWidth="3" />

      <line x1="80" y1="50" x2="90" y2="45" stroke="url(#silver)" strokeWidth="3" />
      <line x1="80" y1="55" x2="92" y2="55" stroke="url(#silver)" strokeWidth="3" />
      <line x1="80" y1="60" x2="90" y2="65" stroke="url(#silver)" strokeWidth="3" />

      {/* Solar panels */}
      <rect x="15" y="35" width="8" height="30" fill="url(#silver)" opacity="0.7" />
      <rect x="77" y="35" width="8" height="30" fill="url(#silver)" opacity="0.7" />

      {/* Panel lines */}
      <line x1="15" y1="42" x2="23" y2="42" stroke="#9e9e9e" strokeWidth="0.5" />
      <line x1="15" y1="50" x2="23" y2="50" stroke="#9e9e9e" strokeWidth="0.5" />
      <line x1="15" y1="58" x2="23" y2="58" stroke="#9e9e9e" strokeWidth="0.5" />

      <line x1="77" y1="42" x2="85" y2="42" stroke="#9e9e9e" strokeWidth="0.5" />
      <line x1="77" y1="50" x2="85" y2="50" stroke="#9e9e9e" strokeWidth="0.5" />
      <line x1="77" y1="58" x2="85" y2="58" stroke="#9e9e9e" strokeWidth="0.5" />
    </svg>
  );
}

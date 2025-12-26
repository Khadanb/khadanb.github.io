interface SatelliteProps {
  size?: number;
  className?: string;
}

export function Satellite({ size = 40, className = '' }: SatelliteProps) {
  return (
    <svg
      width={size}
      height={size * 0.6}
      viewBox="0 0 70 42"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Main body metallic gradient */}
        <linearGradient id="satelliteBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e0e0e0" />
          <stop offset="30%" stopColor="#bdbdbd" />
          <stop offset="70%" stopColor="#9e9e9e" />
          <stop offset="100%" stopColor="#757575" />
        </linearGradient>

        {/* Solar panel gradient - blue tinted */}
        <linearGradient id="solarPanel" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1565c0" />
          <stop offset="30%" stopColor="#1976d2" />
          <stop offset="70%" stopColor="#1e88e5" />
          <stop offset="100%" stopColor="#2196f3" />
        </linearGradient>

        {/* Solar panel cell lines */}
        <pattern id="solarCells" patternUnits="userSpaceOnUse" width="4" height="4">
          <path d="M 0 0 L 4 0 M 0 0 L 0 4" stroke="#0d47a1" strokeWidth="0.3" opacity="0.5" />
        </pattern>

        {/* Antenna dish gradient */}
        <radialGradient id="antennaDish" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#fafafa" />
          <stop offset="50%" stopColor="#e0e0e0" />
          <stop offset="100%" stopColor="#9e9e9e" />
        </radialGradient>

        {/* Gold foil for thermal insulation */}
        <linearGradient id="goldFoil" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffd54f" />
          <stop offset="50%" stopColor="#ffca28" />
          <stop offset="100%" stopColor="#ffb300" />
        </linearGradient>
      </defs>

      {/* Left solar panel arm */}
      <rect x="10" y="19" width="8" height="4" fill="#616161" rx="0.5" />

      {/* Left solar panel */}
      <rect x="0" y="12" width="12" height="18" fill="url(#solarPanel)" rx="1" />
      <rect x="0" y="12" width="12" height="18" fill="url(#solarCells)" rx="1" />
      {/* Panel frame */}
      <rect x="0" y="12" width="12" height="18" fill="none" stroke="#0d47a1" strokeWidth="0.5" rx="1" />
      {/* Panel highlight */}
      <rect x="1" y="13" width="4" height="6" fill="white" opacity="0.15" rx="0.5" />

      {/* Right solar panel arm */}
      <rect x="52" y="19" width="8" height="4" fill="#616161" rx="0.5" />

      {/* Right solar panel */}
      <rect x="58" y="12" width="12" height="18" fill="url(#solarPanel)" rx="1" />
      <rect x="58" y="12" width="12" height="18" fill="url(#solarCells)" rx="1" />
      {/* Panel frame */}
      <rect x="58" y="12" width="12" height="18" fill="none" stroke="#0d47a1" strokeWidth="0.5" rx="1" />
      {/* Panel highlight */}
      <rect x="59" y="13" width="4" height="6" fill="white" opacity="0.15" rx="0.5" />

      {/* Main satellite body */}
      <rect x="18" y="14" width="34" height="16" fill="url(#satelliteBody)" rx="2" />

      {/* Gold thermal blanket section */}
      <rect x="22" y="16" width="10" height="12" fill="url(#goldFoil)" rx="1" />

      {/* Equipment panel */}
      <rect x="34" y="16" width="14" height="12" fill="#424242" rx="1" />
      {/* Panel lights/sensors */}
      <circle cx="38" cy="20" r="1" fill="#4caf50" opacity="0.8" />
      <circle cx="42" cy="20" r="1" fill="#f44336" opacity="0.7" />
      <rect x="36" y="23" width="10" height="3" fill="#212121" rx="0.5" />

      {/* Antenna dish mount */}
      <rect x="33" y="6" width="4" height="8" fill="#757575" />

      {/* Main antenna dish */}
      <ellipse cx="35" cy="6" rx="8" ry="4" fill="url(#antennaDish)" />
      <ellipse cx="35" cy="6" rx="6" ry="3" fill="none" stroke="#bdbdbd" strokeWidth="0.5" />
      <ellipse cx="35" cy="6" rx="4" ry="2" fill="none" stroke="#bdbdbd" strokeWidth="0.3" />
      {/* Feed horn */}
      <circle cx="35" cy="6" r="1.5" fill="#616161" />
      <circle cx="35" cy="6" r="0.8" fill="#424242" />

      {/* Small antenna boom */}
      <line x1="50" y1="18" x2="56" y2="12" stroke="#9e9e9e" strokeWidth="0.8" />
      <circle cx="56" cy="12" r="1.2" fill="#e0e0e0" />

      {/* Thruster nozzles (back) */}
      <rect x="19" y="28" width="3" height="4" fill="#424242" rx="0.5" />
      <rect x="48" y="28" width="3" height="4" fill="#424242" rx="0.5" />

      {/* Body highlight */}
      <rect x="18" y="14" width="34" height="4" fill="white" opacity="0.1" rx="2" />
    </svg>
  );
}

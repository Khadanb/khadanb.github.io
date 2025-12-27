interface PlutoProps {
  size?: number;
  className?: string;
}

export function Pluto({ size = 35, className = '' }: PlutoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Main surface gradient - gray-brown with slight warmth */}
        <radialGradient id="plutoSurface" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#c8b8b0" />
          <stop offset="30%" stopColor="#a89088" />
          <stop offset="60%" stopColor="#786860" />
          <stop offset="100%" stopColor="#483838" />
        </radialGradient>

        {/* Sputnik Planitia - bright nitrogen ice plain (heart-shaped region) */}
        <radialGradient id="sputnikPlanitia" cx="40%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f8f0e8" />
          <stop offset="50%" stopColor="#e8dcd0" />
          <stop offset="100%" stopColor="#d0c4b8" />
        </radialGradient>

        {/* Cthulhu Macula - dark reddish-brown region (tholins) */}
        <radialGradient id="cthulhuMacula" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4a3028" />
          <stop offset="100%" stopColor="#2d1c18" />
        </radialGradient>

        {/* Clip path for planet surface */}
        <clipPath id="plutoClip">
          <circle cx="50" cy="50" r="38" />
        </clipPath>
      </defs>

      {/* Main body */}
      <circle cx="50" cy="50" r="38" fill="url(#plutoSurface)" />

      {/* Surface features */}
      <g clipPath="url(#plutoClip)">
        {/* Cthulhu Macula - large dark equatorial region (whale-shaped) */}
        <ellipse cx="70" cy="52" rx="22" ry="14" fill="url(#cthulhuMacula)" opacity="0.7" />
        <ellipse cx="78" cy="48" rx="10" ry="8" fill="#3a2420" opacity="0.5" />

        {/* Sputnik Planitia - the famous heart-shaped nitrogen ice plain */}
        {/* Left lobe of the heart */}
        <ellipse cx="32" cy="48" rx="14" ry="16" fill="url(#sputnikPlanitia)" opacity="0.85" />
        {/* Right lobe */}
        <ellipse cx="44" cy="52" rx="10" ry="12" fill="url(#sputnikPlanitia)" opacity="0.8" />
        {/* Bright center */}
        <ellipse cx="36" cy="50" rx="8" ry="10" fill="#fff8f0" opacity="0.4" />

        {/* Tombaugh Regio extension (northern bright area) */}
        <ellipse cx="38" cy="34" rx="8" ry="6" fill="#e0d4c8" opacity="0.5" />

        {/* Smaller dark features */}
        <circle cx="52" cy="32" r="5" fill="#584840" opacity="0.4" />
        <circle cx="28" cy="68" r="4" fill="#504038" opacity="0.35" />

        {/* Polar regions - slightly brighter with nitrogen frost */}
        <ellipse cx="50" cy="16" rx="18" ry="6" fill="#b8a8a0" opacity="0.4" />
        <ellipse cx="50" cy="84" rx="16" ry="5" fill="#a89890" opacity="0.35" />

        {/* Subtle surface texture variations */}
        <circle cx="60" cy="65" r="6" fill="#685850" opacity="0.3" />
        <circle cx="22" cy="45" r="4" fill="#786860" opacity="0.25" />
      </g>

      {/* Highlight for 3D effect */}
      <circle cx="36" cy="36" r="8" fill="white" opacity="0.1" />
    </svg>
  );
}

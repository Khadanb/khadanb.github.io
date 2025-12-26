interface SunProps {
  size?: number;
  className?: string;
}

export function Sun({ size = 160, className = '' }: SunProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Sun glow gradient */}
        <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fffef0" />
          <stop offset="25%" stopColor="#fff8c0" />
          <stop offset="50%" stopColor="#ffd54f" />
          <stop offset="75%" stopColor="#ffb300" />
          <stop offset="100%" stopColor="#ff8f00" />
        </radialGradient>

        {/* Outer corona */}
        <radialGradient id="corona" cx="50%" cy="50%" r="50%">
          <stop offset="50%" stopColor="#ffb300" stopOpacity="0.35" />
          <stop offset="80%" stopColor="#ff8f00" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#ff6f00" stopOpacity="0" />
        </radialGradient>

        {/* Sunspot penumbra */}
        <radialGradient id="sunspotPenumbra" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#cc7000" />
          <stop offset="100%" stopColor="#e09000" />
        </radialGradient>

        {/* Sunspot umbra */}
        <radialGradient id="sunspotUmbra" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#704000" />
          <stop offset="100%" stopColor="#905000" />
        </radialGradient>

        {/* Sun surface texture */}
        <filter id="sunTexture">
          <feTurbulence type="turbulence" baseFrequency="0.08" numOctaves="4" result="noise" />
          <feColorMatrix type="saturate" values="0" in="noise" result="gray" />
          <feBlend mode="overlay" in="SourceGraphic" in2="gray" />
        </filter>
      </defs>

      {/* Corona discharge arcs - plasma loops emanating from surface */}
      <g opacity="0.5">
        {/* Large prominence arc - top right */}
        <path
          d="M 62 30 Q 75 15, 70 35 Q 68 42, 65 38"
          fill="none"
          stroke="#ffcc00"
          strokeWidth="2"
          opacity="0.6"
        />
        <path
          d="M 63 31 Q 73 18, 69 36"
          fill="none"
          stroke="#fff8c0"
          strokeWidth="1"
          opacity="0.4"
        />

        {/* Medium arc - left side */}
        <path
          d="M 28 42 Q 12 38, 18 55 Q 22 62, 30 58"
          fill="none"
          stroke="#ffa500"
          strokeWidth="1.5"
          opacity="0.5"
        />

        {/* Small loop - bottom */}
        <path
          d="M 45 75 Q 42 88, 55 85 Q 62 82, 58 74"
          fill="none"
          stroke="#ffcc00"
          strokeWidth="1.5"
          opacity="0.45"
        />

        {/* Tiny ejection - top left */}
        <path
          d="M 35 28 Q 28 18, 32 25"
          fill="none"
          stroke="#ffd54f"
          strokeWidth="1"
          opacity="0.4"
        />

        {/* Medium prominence - right */}
        <path
          d="M 74 50 Q 88 48, 82 60 Q 78 68, 72 62"
          fill="none"
          stroke="#ff9500"
          strokeWidth="1.5"
          opacity="0.5"
        />

        {/* Small arc - bottom left */}
        <path
          d="M 32 68 Q 22 78, 35 76"
          fill="none"
          stroke="#ffb300"
          strokeWidth="1"
          opacity="0.35"
        />
      </g>

      {/* Outer glow */}
      <circle cx="50" cy="50" r="42" fill="url(#corona)" />

      {/* Main sun body */}
      <circle cx="50" cy="50" r="28" fill="url(#sunGlow)" />

      {/* Solar granulation hint (subtle texture) */}
      <circle cx="50" cy="50" r="26" fill="#ffe082" opacity="0.15" />

      {/* Sunspot group 1 (active region with penumbra/umbra) */}
      <circle cx="40" cy="45" r="5" fill="url(#sunspotPenumbra)" opacity="0.45" />
      <circle cx="40" cy="45" r="2.5" fill="url(#sunspotUmbra)" opacity="0.6" />
      <circle cx="44" cy="47" r="3" fill="url(#sunspotPenumbra)" opacity="0.4" />
      <circle cx="44" cy="47" r="1.5" fill="url(#sunspotUmbra)" opacity="0.55" />

      {/* Sunspot group 2 */}
      <circle cx="58" cy="54" r="4" fill="url(#sunspotPenumbra)" opacity="0.4" />
      <circle cx="58" cy="54" r="2" fill="url(#sunspotUmbra)" opacity="0.55" />
      <circle cx="55" cy="56" r="2.5" fill="url(#sunspotPenumbra)" opacity="0.35" />
      <circle cx="55" cy="56" r="1.2" fill="url(#sunspotUmbra)" opacity="0.5" />

      {/* Small isolated sunspot */}
      <circle cx="48" cy="62" r="2" fill="url(#sunspotPenumbra)" opacity="0.35" />
      <circle cx="48" cy="62" r="1" fill="url(#sunspotUmbra)" opacity="0.45" />

      {/* Facular regions (bright areas near sunspots) */}
      <ellipse cx="35" cy="43" rx="4" ry="2" fill="#fffde7" opacity="0.2" />
      <ellipse cx="62" cy="52" rx="3" ry="1.5" fill="#fffde7" opacity="0.18" />

      {/* Limb darkening */}
      <circle
        cx="50"
        cy="50"
        r="28"
        fill="none"
        stroke="#ff6f00"
        strokeWidth="2"
        opacity="0.2"
      />

      {/* Bright center highlight */}
      <circle cx="44" cy="40" r="10" fill="#fffde7" opacity="0.35" />
    </svg>
  );
}

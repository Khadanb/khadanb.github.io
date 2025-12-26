interface SunProps {
  size?: number;
  className?: string;
}

export function Sun({ size = 80, className = '' }: SunProps) {
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

      {/* Corona rays with varying lengths */}
      <g opacity="0.35">
        {Array.from({ length: 16 }).map((_, i) => {
          const angleDeg = i * 22.5;
          const angle = (angleDeg * Math.PI) / 180;
          const length = 42 + (i % 3) * 5;
          return (
            <line
              key={`ray-${angleDeg}`}
              x1="50"
              y1="50"
              x2={50 + length * Math.cos(angle)}
              y2={50 + length * Math.sin(angle)}
              stroke="#ffd54f"
              strokeWidth={1.5 + (i % 2)}
              strokeLinecap="round"
              opacity={0.25 + (i % 3) * 0.12}
            />
          );
        })}
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

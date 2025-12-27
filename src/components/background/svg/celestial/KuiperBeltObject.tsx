interface KuiperBeltObjectProps {
  size?: number;
  variant?: 0 | 1 | 2 | 3 | 4 | 5;
  className?: string;
}

/**
 * Kuiper Belt Object (KBO) - icy bodies in the outer solar system.
 * Similar shapes to asteroids but with icy, pale blue-white coloring.
 */
export function KuiperBeltObject({ size = 15, variant = 0, className = '' }: KuiperBeltObjectProps) {
  // Icy color palette - pale blues, whites, and grays
  const colors = {
    light: ['#e8f4f8', '#f0f8ff', '#e6f2f5', '#f5fafc', '#edf5f8', '#f8fcff'],
    mid: ['#b8d4e3', '#c5dde8', '#aacfe0', '#d0e5ed', '#bdd8e5', '#cce3ee'],
    dark: ['#6a9bb5', '#7aa5bc', '#5d94b0', '#8bb0c2', '#729fba', '#95b8c8'],
  };

  const lightColor = colors.light[variant];
  const midColor = colors.mid[variant];
  const darkColor = colors.dark[variant];

  // Different irregular shapes for variety
  const shapes = [
    // Variant 0: Elongated icy body
    <path
      key="shape0"
      d="M 50 15 Q 75 20, 85 45 Q 88 65, 70 80 Q 50 90, 30 78 Q 12 60, 18 40 Q 25 18, 50 15 Z"
      fill={`url(#kboGradient${variant})`}
    />,
    // Variant 1: Rounded icy chunk
    <path
      key="shape1"
      d="M 45 12 Q 72 15, 82 35 Q 90 55, 78 75 Q 60 88, 35 82 Q 15 72, 12 48 Q 10 25, 45 12 Z"
      fill={`url(#kboGradient${variant})`}
    />,
    // Variant 2: Angular icy fragment
    <path
      key="shape2"
      d="M 55 10 L 80 30 Q 88 50, 82 70 L 60 88 Q 35 85, 18 65 L 15 40 Q 20 18, 55 10 Z"
      fill={`url(#kboGradient${variant})`}
    />,
    // Variant 3: Irregular icy mass
    <path
      key="shape3"
      d="M 48 14 Q 70 12, 85 38 Q 90 60, 75 80 Q 55 92, 28 80 Q 10 62, 15 38 Q 22 15, 48 14 Z"
      fill={`url(#kboGradient${variant})`}
    />,
    // Variant 4: Oblong icy body
    <path
      key="shape4"
      d="M 40 18 Q 65 10, 82 32 Q 92 55, 80 75 Q 62 90, 38 85 Q 12 75, 10 50 Q 10 28, 40 18 Z"
      fill={`url(#kboGradient${variant})`}
    />,
    // Variant 5: Compact icy chunk
    <path
      key="shape5"
      d="M 50 16 Q 75 18, 84 42 Q 88 68, 68 82 Q 45 90, 25 75 Q 12 55, 18 35 Q 28 15, 50 16 Z"
      fill={`url(#kboGradient${variant})`}
    />,
  ];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id={`kboGradient${variant}`} cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor={lightColor} />
          <stop offset="40%" stopColor={midColor} />
          <stop offset="100%" stopColor={darkColor} />
        </radialGradient>
      </defs>

      {/* Main icy body */}
      {shapes[variant]}

      {/* Frost/ice highlights */}
      <circle cx="38" cy="38" r="12" fill="white" opacity="0.25" />
      <circle cx="55" cy="55" r="6" fill="white" opacity="0.15" />

      {/* Subtle surface detail - ice cracks */}
      <path
        d="M 35 45 Q 50 50, 60 42"
        fill="none"
        stroke={darkColor}
        strokeWidth="0.8"
        opacity="0.3"
      />
      <path
        d="M 45 60 Q 55 65, 65 58"
        fill="none"
        stroke={darkColor}
        strokeWidth="0.6"
        opacity="0.25"
      />
    </svg>
  );
}

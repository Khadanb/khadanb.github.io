import type { ReactNode } from 'react';

interface AtmosphereLayerProps {
  scrollY: number;
  speed: number;
  gradient: string;
  height?: string;
  children?: ReactNode;
}

export function AtmosphereLayer({
  scrollY,
  speed,
  gradient,
  height = '100vh',
  children,
}: AtmosphereLayerProps) {
  const translateY = scrollY * speed * -0.5;

  return (
    <div
      className="absolute inset-x-0 overflow-hidden pointer-events-none"
      style={{
        height,
        background: gradient,
        transform: `translate3d(0, ${translateY}px, 0)`,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}

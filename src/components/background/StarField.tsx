import { useEffect, useRef } from 'react';
import { STARFIELD_CONFIG } from '../../config/starfield';

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
  layer: number;
  glowRadius?: number; // Pre-computed glow radius for stars that glow
}

interface StarFieldProps {
  starCount?: number;
  className?: string;
}

// Pre-render glow sprite size (will be scaled during draw)
const GLOW_SPRITE_SIZE = 64;

// Create a cached glow sprite using OffscreenCanvas
function createGlowSprite(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = GLOW_SPRITE_SIZE;
  canvas.height = GLOW_SPRITE_SIZE;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const center = GLOW_SPRITE_SIZE / 2;
    const gradient = ctx.createRadialGradient(center, center, 0, center, center, center);
    gradient.addColorStop(0, 'rgba(200, 220, 255, 1)');
    gradient.addColorStop(1, 'rgba(200, 220, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, GLOW_SPRITE_SIZE, GLOW_SPRITE_SIZE);
  }
  return canvas;
}

export function StarField({ starCount = 200, className = '' }: StarFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationRef = useRef<number>(0);
  const scrollYRef = useRef(0);
  const gradientRef = useRef<CanvasGradient | null>(null);
  const glowSpriteRef = useRef<HTMLCanvasElement | null>(null);
  const resizeTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      if (import.meta.env.DEV) {
        console.warn('StarField: Canvas 2D context not available');
      }
      return;
    }

    const { CANVAS_HEIGHT_MULTIPLIER, LAYER_COUNT, RADIUS, OPACITY, TWINKLE, GRADIENT, PARALLAX_SPEEDS, GLOW } = STARFIELD_CONFIG;

    // Create glow sprite once
    if (!glowSpriteRef.current) {
      glowSpriteRef.current = createGlowSprite();
    }

    // Set canvas size and cache gradient
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * CANVAS_HEIGHT_MULTIPLIER;

      // Cache the gradient (must be recreated on resize)
      gradientRef.current = ctx.createLinearGradient(0, 0, 0, canvas.height);
      GRADIENT.COLORS.forEach(({ stop, color }) => {
        gradientRef.current?.addColorStop(stop, color);
      });
    };
    resizeCanvas();

    // Initialize stars
    const initStars = () => {
      starsRef.current = [];
      for (let i = 0; i < starCount; i++) {
        const layer = Math.floor(Math.random() * LAYER_COUNT);
        const radiusConfig = layer === 0 ? RADIUS.FAR : layer === 1 ? RADIUS.MID : RADIUS.NEAR;
        const radius = radiusConfig.MIN + Math.random() * radiusConfig.RANGE;
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius,
          opacity: OPACITY.MIN + Math.random() * OPACITY.RANGE,
          twinkleSpeed: TWINKLE.SPEED.MIN + Math.random() * TWINKLE.SPEED.RANGE,
          twinklePhase: Math.random() * Math.PI * 2,
          layer,
          // Pre-compute glow radius for stars that will have glow
          glowRadius: radius > GLOW.THRESHOLD ? radius * GLOW.SIZE_MULTIPLIER : undefined,
        });
      }
    };
    initStars();

    // Handle scroll (RAF throttled via animation loop)
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Animation loop
    let lastTime = 0;
    const animate = (time: number) => {
      const deltaTime = (time - lastTime) / 1000;
      lastTime = time;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw cached gradient background
      if (gradientRef.current) {
        ctx.fillStyle = gradientRef.current;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Draw and update stars
      starsRef.current.forEach((star) => {
        // Update twinkle
        star.twinklePhase += star.twinkleSpeed * deltaTime;
        const twinkle = 0.5 + 0.5 * Math.sin(star.twinklePhase);
        const currentOpacity = star.opacity * (TWINKLE.BASE + TWINKLE.AMPLITUDE * twinkle);

        // Parallax offset based on layer
        const parallaxSpeed = PARALLAX_SPEEDS[star.layer];
        const yOffset = scrollYRef.current * parallaxSpeed;
        const drawY = (star.y - yOffset) % canvas.height;
        const finalY = drawY < 0 ? drawY + canvas.height : drawY;

        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, finalY, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        ctx.fill();

        // Add glow for larger stars using cached sprite
        if (star.glowRadius && glowSpriteRef.current) {
          const glowSize = star.glowRadius * 2;
          ctx.globalAlpha = currentOpacity * GLOW.OPACITY_MULTIPLIER;
          ctx.drawImage(
            glowSpriteRef.current,
            star.x - star.glowRadius,
            finalY - star.glowRadius,
            glowSize,
            glowSize
          );
          ctx.globalAlpha = 1;
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    // Handle resize with debouncing
    const handleResize = () => {
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
      resizeTimeoutRef.current = setTimeout(() => {
        resizeCanvas();
        initStars();
      }, 100);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
    };
  }, [starCount]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 -z-20 ${className}`}
      style={{ pointerEvents: 'none' }}
    />
  );
}

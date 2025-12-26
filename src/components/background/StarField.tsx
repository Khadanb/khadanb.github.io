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
}

interface StarFieldProps {
  starCount?: number;
  className?: string;
}

export function StarField({ starCount = 200, className = '' }: StarFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationRef = useRef<number>(0);
  const scrollYRef = useRef(0);
  const gradientRef = useRef<CanvasGradient | null>(null);
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
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: radiusConfig.MIN + Math.random() * radiusConfig.RANGE,
          opacity: OPACITY.MIN + Math.random() * OPACITY.RANGE,
          twinkleSpeed: TWINKLE.SPEED.MIN + Math.random() * TWINKLE.SPEED.RANGE,
          twinklePhase: Math.random() * Math.PI * 2,
          layer,
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

        // Add glow for larger stars
        if (star.radius > GLOW.THRESHOLD) {
          ctx.beginPath();
          const glowRadius = star.radius * GLOW.SIZE_MULTIPLIER;
          ctx.arc(star.x, finalY, glowRadius, 0, Math.PI * 2);
          const glowGradient = ctx.createRadialGradient(
            star.x, finalY, 0,
            star.x, finalY, glowRadius
          );
          glowGradient.addColorStop(0, `rgba(200, 220, 255, ${currentOpacity * GLOW.OPACITY_MULTIPLIER})`);
          glowGradient.addColorStop(1, 'rgba(200, 220, 255, 0)');
          ctx.fillStyle = glowGradient;
          ctx.fill();
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

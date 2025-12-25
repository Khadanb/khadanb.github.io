import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
  layer: number; // 0 = far (slow), 1 = mid, 2 = near (fast)
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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 2; // Extra height for scrolling
    };
    resizeCanvas();

    // Initialize stars
    const initStars = () => {
      starsRef.current = [];
      for (let i = 0; i < starCount; i++) {
        const layer = Math.floor(Math.random() * 3);
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: layer === 0 ? 0.5 + Math.random() * 0.5 :
                  layer === 1 ? 0.8 + Math.random() * 0.7 :
                  1 + Math.random() * 1.5,
          opacity: 0.3 + Math.random() * 0.7,
          twinkleSpeed: 0.5 + Math.random() * 2,
          twinklePhase: Math.random() * Math.PI * 2,
          layer,
        });
      }
    };
    initStars();

    // Handle scroll
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

      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#000000');
      gradient.addColorStop(0.3, '#05071a');
      gradient.addColorStop(0.6, '#0c1445');
      gradient.addColorStop(1, '#1a237e');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and update stars
      starsRef.current.forEach((star) => {
        // Update twinkle
        star.twinklePhase += star.twinkleSpeed * deltaTime;
        const twinkle = 0.5 + 0.5 * Math.sin(star.twinklePhase);
        const currentOpacity = star.opacity * (0.6 + 0.4 * twinkle);

        // Parallax offset based on layer
        const parallaxSpeed = star.layer === 0 ? 0.1 : star.layer === 1 ? 0.2 : 0.3;
        const yOffset = scrollYRef.current * parallaxSpeed;
        const drawY = (star.y - yOffset) % canvas.height;
        const finalY = drawY < 0 ? drawY + canvas.height : drawY;

        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, finalY, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        ctx.fill();

        // Add glow for larger stars
        if (star.radius > 1.2) {
          ctx.beginPath();
          ctx.arc(star.x, finalY, star.radius * 2, 0, Math.PI * 2);
          const glowGradient = ctx.createRadialGradient(
            star.x, finalY, 0,
            star.x, finalY, star.radius * 2
          );
          glowGradient.addColorStop(0, `rgba(200, 220, 255, ${currentOpacity * 0.3})`);
          glowGradient.addColorStop(1, 'rgba(200, 220, 255, 0)');
          ctx.fillStyle = glowGradient;
          ctx.fill();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    // Handle resize
    window.addEventListener('resize', () => {
      resizeCanvas();
      initStars();
    });

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('scroll', handleScroll);
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

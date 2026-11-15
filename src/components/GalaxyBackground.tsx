import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  r: number;
  alpha: number;
  speed: number;
  twinklePhase: number;
}

export const GalaxyBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const starCount = Math.min(130, Math.floor((width * height) / 14000));
    const stars: Star[] = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 0.6 + Math.random() * 1.4,
      alpha: 0.25 + Math.random() * 0.65,
      speed: 0.04 + Math.random() * 0.14,
      twinklePhase: Math.random() * Math.PI * 2,
    }));

    let rafId = 0;
    let tick = 0;

    const render = () => {
      tick += 0.015;
      ctx.clearRect(0, 0, width, height);

      for (const s of stars) {
        if (!prefersReducedMotion) {
          s.y -= s.speed;
          if (s.y < -4) {
            s.y = height + 4;
            s.x = Math.random() * width;
          }
        }
        const twinkle = prefersReducedMotion ? 1 : 0.72 + 0.28 * Math.sin(tick + s.twinklePhase);
        ctx.fillStyle = `rgba(226, 232, 240, ${(s.alpha * twinkle).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        rafId = window.requestAnimationFrame(render);
      }
    };

    render();

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      if (prefersReducedMotion) render();
    };

    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#070B19]">
      {/* Subtle deep-space radial nebula accents */}
      <div
        className="absolute -top-32 left-1/4 h-[520px] w-[520px] rounded-full opacity-25 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(91,33,182,0.55) 0%, rgba(7,11,25,0) 70%)' }}
      />
      <div
        className="absolute bottom-0 right-1/5 h-[480px] w-[480px] rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.45) 0%, rgba(7,11,25,0) 70%)' }}
      />
      <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
    </div>
  );
};

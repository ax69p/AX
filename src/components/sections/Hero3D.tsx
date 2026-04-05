"use client";

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function Hero3D() {
  const t = useTranslations('Hero');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isMobile || prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let cw = canvas.width = window.innerWidth;
    let ch = canvas.height = window.innerHeight;

    const handleResize = () => {
      cw = canvas.width = window.innerWidth;
      ch = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / cw) * 2 - 1; // -1 to 1
      targetMouseY = (e.clientY / ch) * 2 - 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Soft gradient orbs
    const orbs = [
      { x: 0.2, y: 0.3, r: 0.4, color: 'rgba(199, 210, 254, 0.4)' }, // Indigo 200
      { x: 0.8, y: 0.2, r: 0.35, color: 'rgba(221, 214, 254, 0.4)' }, // Violet 200
      { x: 0.5, y: 0.8, r: 0.45, color: 'rgba(191, 219, 254, 0.4)' }, // Blue 200
      { x: 0.1, y: 0.9, r: 0.3, color: 'rgba(233, 213, 255, 0.4)' }, // Fuchsia 200
    ];

    let time = 0;

    const draw = () => {
      time += 0.003;

      // Smooth mouse interpolation for parallax
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, cw, ch);
      
      // Draw grid
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.15)'; // slate-400 with 15% opacity
      ctx.lineWidth = 0.5;
      const gridSize = 40;
      
      // Grid parallax
      const gridOffsetX = mouseX * 20;
      const gridOffsetY = mouseY * 20;

      ctx.beginPath();
      for (let x = (gridOffsetX % gridSize) - gridSize; x < cw; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, ch);
      }
      for (let y = (gridOffsetY % gridSize) - gridSize; y < ch; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(cw, y);
      }
      ctx.stroke();

      // Draw orbs
      orbs.forEach((orb, i) => {
        const driftX = Math.sin(time + i) * 0.05 * cw;
        const driftY = Math.cos(time + i * 2) * 0.05 * ch;
        
        // Parallax shift: ±4% X, ±3% Y
        const parallaxX = mouseX * 0.04 * cw * (i % 2 === 0 ? 1 : -1);
        const parallaxY = mouseY * 0.03 * ch * (i % 2 === 0 ? 1 : -1);

        const x = orb.x * cw + driftX + parallaxX;
        const y = orb.y * ch + driftY + parallaxY;
        const r = orb.r * Math.min(cw, ch);

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);

  return (
    <section 
      ref={containerRef}
      className={`relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-24 pb-20 ${
        isMobile ? 'bg-[linear-gradient(135deg,#f8f7ff_0%,#ede9fe_50%,#dbeafe_100%)]' : 'bg-[#fafafa]'
      }`}
    >
      <style>{`
        @keyframes float-1 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(20px); }
        }
        @keyframes float-3 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float-1 { animation: float-1 4s ease-in-out infinite; }
        .animate-float-2 { animation: float-2 5s ease-in-out infinite 1s; }
        .animate-float-3 { animation: float-3 4.5s ease-in-out infinite 2s; }
        @media (prefers-reduced-motion) {
          .animate-float-1, .animate-float-2, .animate-float-3 {
            animation: none !important;
          }
        }
      `}</style>

      {!isMobile && (
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 z-[-1] w-full h-full"
        />
      )}

      {/* Floating stat pills */}
      <div className="absolute inset-0 pointer-events-none z-0 hidden lg:block max-w-7xl mx-auto">
        <div className="absolute top-[25%] left-[10%] px-4 py-2 bg-white/80 backdrop-blur-md rounded-full shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-white text-slate-700 font-semibold text-sm animate-float-1">
          ⚡ Load Time &lt; 1s
        </div>
        <div className="absolute top-[35%] right-[15%] px-4 py-2 bg-white/80 backdrop-blur-md rounded-full shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-white text-slate-700 font-semibold text-sm animate-float-2">
          📈 +40% Conversion
        </div>
        <div className="absolute bottom-[25%] left-[20%] px-4 py-2 bg-white/80 backdrop-blur-md rounded-full shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-white text-slate-700 font-semibold text-sm animate-float-3">
          📱 Mobile First
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10 flex flex-col items-center text-center">
        
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm shadow-sm mb-8 border border-white/60">
          <span className="text-slate-800 text-sm font-semibold tracking-wide flex items-center gap-2">
            ⭐ {t('badge') || 'Trusted by 20+ Businesses'}
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 drop-shadow-sm font-syne">
          {t('headline').split('—').map((part, index, array) => {
            const hasDash = array.length > 1;
            if (hasDash && index === 1) {
              return (
                <span key={index} className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mt-2 pb-2">
                  — {part.trim()}
                </span>
              );
            }
            return (
              <span key={index} className="pb-2 block">
                {part.trim()}
              </span>
            );
          })}
        </h1>

        {/* Subheadline */}
        <p className="text-xl text-slate-600 mt-4 mb-10 max-w-2xl mx-auto font-medium">
          {t('sub_headline')}
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mx-auto justify-center">
          <Link href="/start" className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold transition-all shadow-xl shadow-slate-900/20 hover:-translate-y-1 active:translate-y-0">
            {t('btn_primary')} {"->"}
          </Link>
          <Link href="/#pricing" className="px-8 py-4 bg-white/60 backdrop-blur-sm border border-slate-200 hover:border-slate-300 hover:bg-white text-slate-700 rounded-lg font-semibold transition-all hover:-translate-y-1 active:translate-y-0 shadow-sm">
            {t('btn_secondary')}
          </Link>
        </div>

        {/* Social Proof Line */}
        <p className="mt-8 text-sm text-slate-500 font-medium text-center">
          {t('social_proof')}
        </p>
      </div>
    </section>
  );
}

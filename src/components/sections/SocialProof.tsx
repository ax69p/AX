"use client";

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

// Counter component for animated numbers
function Counter({ from = 0, to, duration = 2, suffix = "" }: { from?: number, to: number, duration?: number, suffix?: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-100px" });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = (time - startTime) / (duration * 1000);
      
      if (progress < 1) {
        setCount(Math.floor(from + (to - from) * progress));
        requestAnimationFrame(animate);
      } else {
        setCount(to);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isInView, from, to, duration]);

  return <span ref={nodeRef}>{count}{suffix}</span>;
}

export default function SocialProof() {
  const t = useTranslations('SocialProof');
  
  const logos = [
    "TechGlobal", "Nexus Startups", "Urban Eats", "Apex Fitness", "Luxe Studios", "Nova Digital"
  ];

  // We are extracting an array of strings assuming the JSON structure provides a reviews array.
  // next-intl supports getting raw objects/arrays using `.raw()`
  const reviews = t.raw('reviews') as string[];

  return (
    <section className="py-20 relative bg-[#04080e] border-y border-cyan-900/30 overflow-hidden">
      {/* Background radial */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-64 bg-cyan-900/20 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        
        {/* Animated Stat Counters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 border-b border-cyan-900/40 pb-16">
          <div className="flex flex-col items-center text-center">
            <h3 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-blue-600 mb-2 font-syne drop-shadow-md">
              <Counter to={50} suffix="+" />
            </h3>
            <p className="text-cyan-100/70 font-medium tracking-wide">{t('stat_websites')}</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <h3 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-blue-600 mb-2 font-syne drop-shadow-md">
              <Counter to={20} suffix="+" />
            </h3>
            <p className="text-cyan-100/70 font-medium tracking-wide">{t('stat_clients')}</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <h3 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-blue-600 mb-2 font-syne drop-shadow-md">
              <Counter to={100} suffix="%" />
            </h3>
            <p className="text-cyan-100/70 font-medium tracking-wide">{t('stat_satisfaction')}</p>
          </div>
        </div>

        {/* Brand Logos */}
        <div className="py-16">
          <p className="text-center text-cyan-200/50 text-sm mb-8 uppercase tracking-widest">{t('trusted_by')}</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70">
            {logos.map((logo, idx) => (
              <div key={idx} className="text-2xl font-black font-syne text-gray-500 hover:text-cyan-400 transition-colors duration-300 cursor-default">
                {logo}
              </div>
            ))}
          </div>
        </div>

        {/* Marquee Reviews */}
        <div className="mt-8 relative flex overflow-x-hidden border-t border-b py-8 border-cyan-900/30 bg-[#070b12]/50">
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#04080e] to-transparent z-10" />
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#04080e] to-transparent z-10" />
          
          <div className="animate-marquee whitespace-nowrap flex items-center gap-16">
            {[...reviews, ...reviews].map((review, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <span className="text-yellow-400 text-lg">★★★★★</span>
                <span className="text-md font-medium text-cyan-50 italic">"{review}"</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

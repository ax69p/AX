"use client";

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function FinalCTA() {
  const t = useTranslations('FinalCTA');

  return (
    <section className="py-24 relative overflow-hidden bg-[#04080e] border-y border-cyan-900/40">
      
      {/* Heavy glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-cyan-600/20 blur-[150px] pointer-events-none rounded-full z-0" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05] pointer-events-none z-0" />

      <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
        
        <div className="inline-block px-4 py-2 rounded-full glassmorphism mb-6 border border-cyan-500/30">
          <span className="text-cyan-300 text-sm font-bold tracking-widest uppercase">{t('badge')}</span>
        </div>

        <h2 
          className="text-5xl md:text-6xl font-black text-white mb-6 font-syne tracking-tight leading-tight"
          dangerouslySetInnerHTML={{ __html: t.raw('heading') }}
        ></h2>
        
        <p className="text-xl text-cyan-50/80 mb-10 max-w-2xl mx-auto">
          {t('sub_heading')}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://wa.me/96181945750" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-10 py-5 bg-cyan-500 hover:bg-cyan-400 text-white rounded-xl text-xl font-bold transition-all glow-primary hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_40px_rgba(3,101,239,0.4)]"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
            {t('btn_whatsapp')}
          </a>
        </div>
        
        <p className="mt-8 text-cyan-200/50 text-sm italic">
          {t('no_credit_card')}
        </p>

      </div>
    </section>
  );
}

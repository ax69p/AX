"use client";

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { Check, ShieldCheck } from 'lucide-react';
import { Link } from '@/i18n/routing';

export default function Pricing() {
  const t = useTranslations('Pricing');
  
  const packages = [
    {
      id: "x",
      name: t('packages.x.name'),
      price: "$199",
      delivery: t('packages.x.delivery'),
      features: t.raw('packages.x.features') as string[],
      isPopular: false
    },
    {
      id: "xplus",
      name: t('packages.xplus.name'),
      price: "$399",
      delivery: t('packages.xplus.delivery'),
      features: t.raw('packages.xplus.features') as string[],
      isPopular: true
    },
    {
      id: "xpro",
      name: t('packages.xpro.name'),
      price: "$599",
      delivery: t('packages.xpro.delivery'),
      features: t.raw('packages.xpro.features') as string[],
      isPopular: false
    }
  ];

  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('pricing');
      if (section) {
        const rect = section.getBoundingClientRect();
        // Show sticky bar when pricing rolls out of view
        const topPast = rect.top < -100;
        const bottomNotReached = rect.bottom > 200;
        setShowStickyBar(topPast && bottomNotReached);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="pricing" className="py-24 relative bg-[#070b12] overflow-hidden">
      
      {/* Sticky Bar */}
      <div className={`fixed top-20 left-1/2 -translate-x-1/2 z-40 bg-cyan-950/80 backdrop-blur-md border border-cyan-500/30 px-6 py-3 rounded-full flex gap-4 transition-all duration-300 ${showStickyBar ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}`}>
        <div className="flex items-center gap-6 text-sm text-cyan-50 font-medium">
          <span className="hidden md:inline">{t('sticky.compare')}</span>
          <span className="text-gray-400 line-through mr-1">$199</span>
          <Link href="/start?package=xplus" className="text-cyan-400 font-bold hover:underline">X+ ($399)</Link>
          <span className="text-gray-500 px-2">|</span>
          <Link href="/start?package=xpro" className="text-cyan-400 hover:underline">X Pro ($599)</Link>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-syne">{t('heading')}</h2>
          <p className="text-cyan-100/70 text-lg max-w-2xl mx-auto">{t('sub_heading')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 items-end max-w-7xl mx-auto">
          {packages.map((pkg) => (
            <div 
              key={pkg.id} 
              className={`rounded-2xl relative p-6 flex flex-col h-full ${
                pkg.isPopular 
                ? 'glassmorphism-glow glow-border scale-100 lg:scale-105 z-10' 
                : 'glassmorphism border border-cyan-900/50'
              }`}
            >
              {pkg.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-500 text-white text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-full glow-primary">
                  {t('badge_best_value')}
                </div>
              )}
              
              <h3 className={`text-lg font-bold font-syne ${pkg.isPopular ? 'text-cyan-300 text-glow' : 'text-cyan-50'} mb-2`}>
                {pkg.name}
              </h3>
              
              <div className="flex items-baseline gap-1 mt-2 mb-4">
                <span className="text-3xl font-black text-white">{pkg.price}</span>
              </div>
              
              <div className="bg-cyan-950/40 rounded-lg p-2 text-[12px] text-cyan-200/80 mb-4 border border-cyan-800/30">
                🧭 {t('delivery_prefix')}: <span className="font-semibold text-cyan-100">{pkg.delivery}</span>
              </div>

              <ul className="flex-1 flex flex-col gap-3 mb-6">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="text-cyan-400 mt-1 flex-shrink-0" size={14} />
                    <span className="text-cyan-50/80 text-[13px] leading-tight">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link 
                href={`/start?package=${pkg.id}`}
                className={`w-full py-3 rounded-lg font-bold text-center text-sm transition-all ${
                  pkg.isPopular 
                  ? 'bg-cyan-500 hover:bg-cyan-400 text-white glow-primary' 
                  : 'bg-transparent border border-cyan-600 hover:bg-cyan-900/50 text-cyan-100'
                }`}
              >
                {t('btn_get_package')}
              </Link>
            </div>
          ))}

          {/* New QR Menu Standalone Card */}
          <div className="rounded-2xl relative p-6 flex flex-col h-full glassmorphism border border-purple-500/30 bg-purple-500/5">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-full shadow-lg shadow-purple-500/20">
              NEW SERVICE
            </div>
            
            <h3 className="text-lg font-bold font-syne text-purple-300 mb-2">
              {t('packages.qrmenu.name')}
            </h3>
            
            <div className="flex items-baseline gap-1 mt-2 mb-4">
              <span className="text-3xl font-black text-white">{t('packages.qrmenu.price')}</span>
            </div>
            
            <div className="bg-purple-950/20 rounded-lg p-2 text-[12px] text-purple-200/80 mb-4 border border-purple-800/20">
              🧭 {t('delivery_prefix')}: <span className="font-semibold text-purple-100">{t('packages.qrmenu.delivery')}</span>
            </div>

            <ul className="flex-1 flex flex-col gap-3 mb-6">
              {(t.raw('packages.qrmenu.features') as string[]).map((feature, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="text-purple-400 mt-1 flex-shrink-0" size={14} />
                  <span className="text-cyan-50/80 text-[13px] leading-tight">{feature}</span>
                </li>
              ))}
            </ul>

            <Link 
              href="/start?package=qrmenu"
              className="w-full py-3 rounded-lg font-bold text-center text-sm transition-all border border-purple-500/50 hover:bg-purple-500/20 text-purple-100"
            >
              {t('btn_get_package')}
            </Link>
          </div>
        </div>

        {/* Add-on Banner */}
        <div className="mt-12 max-w-4xl mx-auto glassmorphism border border-cyan-500/20 p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          <div className="w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0 border border-cyan-500/30 group-hover:scale-110 transition-transform">
            <span className="text-2xl">🍽️</span>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h4 className="text-lg font-bold text-white mb-1 font-syne">{t('qr_addon.title')}</h4>
            <p className="text-cyan-100/60 text-sm">{t('qr_addon.desc')}</p>
          </div>
          <Link href="/start" className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full text-sm font-bold transition-all">
            {t('custom_prompt')}
          </Link>
        </div>

        <div className="mt-16 bg-cyan-950/20 border border-cyan-900/50 rounded-xl max-w-3xl mx-auto p-6 flex items-center justify-center gap-4 flex-col sm:flex-row text-center sm:text-left">
          <div className="w-12 h-12 rounded-full bg-cyan-900/50 flex flex-shrink-0 items-center justify-center border border-cyan-500/30">
            <ShieldCheck className="text-cyan-400" size={24} />
          </div>
          <div>
            <h4 className="text-white font-bold font-syne mb-1">{t('guarantee.title')}</h4>
            <p className="text-cyan-100/60 text-sm">{t('guarantee.desc')}</p>
          </div>
        </div>

        <div className="mt-10 text-center text-cyan-100/50 text-sm flex justify-center gap-1 flex-wrap">
          {t('custom_prompt')}{' '}
          <Link href="/start?package=custom" className="text-cyan-400 hover:underline">
            {t('custom_link')}
          </Link>
        </div>
      </div>
    </section>
  );
}

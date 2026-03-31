"use client";

import { useTranslations } from 'next-intl';
import { Rocket, Lightbulb, TrendingUp, Search, Layers, Zap } from 'lucide-react';

export default function Features() {
  const t = useTranslations('Features');

  const items = t.raw('items') as { title: string; desc: string }[];

  const icons = [
    <Rocket key="1" size={24} className="text-cyan-400" />,
    <Zap key="2" size={24} className="text-yellow-400" />,
    <TrendingUp key="3" size={24} className="text-green-400" />,
    <Search key="4" size={24} className="text-purple-400" />,
    <Layers key="5" size={24} className="text-blue-400" />,
    <Lightbulb key="6" size={24} className="text-orange-400" />
  ];

  return (
    <section id="services" className="py-24 relative bg-[#04080e] overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-cyan-950/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-900/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-syne">{t('heading')}</h2>
          <p className="text-cyan-100/70 text-lg">
            {t('sub_heading')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((feature, idx) => (
            <div key={idx} className="p-8 rounded-2xl glassmorphism border border-cyan-900/50 hover:border-cyan-500/30 transition-all duration-300 group hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-cyan-950/50 border border-cyan-800/40 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-cyan-900/80 transition-all">
                {icons[idx]}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-syne group-hover:text-cyan-300 transition-colors">
                {feature.title}
              </h3>
              <p className="text-cyan-100/60 leading-relaxed text-sm">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

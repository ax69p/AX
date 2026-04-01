"use client";

import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';

export default function Portfolio() {
  const t = useTranslations('Portfolio');

  const projects = [
    {
      id: 1,
      title: "Piedfin Boutique",
      category: t('categories.store'),
      gradient: "from-indigo-600/20 via-blue-900/40 to-slate-900",
      border: "border-blue-500/30",
      link: "https://piedfin-boutique-4228d49.public.builtwithrocket.new",
      colSpan: "col-span-1 md:col-span-2",
      rowSpan: "row-span-1 md:row-span-2"
    },
    {
      id: 2,
      title: "Eshopgs",
      category: t('categories.landing'),
      gradient: "from-emerald-600/20 via-teal-900/40 to-slate-900",
      border: "border-emerald-500/30",
      link: "https://eshopgs.com/lb",
      colSpan: "col-span-1",
      rowSpan: "row-span-1"
    },
    {
      id: 3,
      title: "Salem Elite Realty",
      category: t('categories.corporate'),
      gradient: "from-amber-600/20 via-zinc-900/40 to-slate-900",
      border: "border-amber-500/30",
      link: "https://salem-elite-realty.vercel.app/",
      colSpan: "col-span-1",
      rowSpan: "row-span-1"
    },
    {
      id: 4,
      title: "Nexus Starups",
      category: t('categories.saas'),
      gradient: "from-purple-600/20 via-violet-900/40 to-slate-900",
      border: "border-purple-500/30",
      link: "https://stripe.com",
      colSpan: "col-span-1 md:col-span-2",
      rowSpan: "row-span-1"
    }
  ];

  return (
    <section id="portfolio" className="py-24 relative bg-[#030711] border-t border-cyan-900/20">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-syne">{t('heading')}</h2>
            <p className="text-cyan-100/70 text-lg">
              {t('sub_heading')}
            </p>
          </div>
        </div>

        {/* Improved Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 min-h-[500px] md:h-[600px]">
          {projects.map((pkg) => (
            <a 
              href={pkg.link}
              target="_blank"
              rel="noopener noreferrer"
              key={pkg.id} 
              className={`${pkg.colSpan} ${pkg.rowSpan} min-h-[220px] md:min-h-0 rounded-3xl overflow-hidden relative border ${pkg.border} bg-gradient-to-br ${pkg.gradient} group cursor-pointer block transform transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(3,101,239,0.15)] flex flex-col justify-end p-8`}
            >
              {/* Glassmorphism subtle pattern */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />
              
              {/* Animated corner glow */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors duration-500" />
              
              <div className="relative z-10 space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em] py-1.5 px-4 rounded-full bg-cyan-950/40 border border-cyan-500/20 backdrop-blur-md shadow-sm">{pkg.category}</span>
                  
                  <div className="w-10 h-10 bg-white/5 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10 opacity-60 md:opacity-0 md:translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowRight className="text-white -rotate-45" size={18} />
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-white font-syne group-hover:text-cyan-300 transition-colors duration-300 flex items-center gap-3">
                    {pkg.title}
                  </h3>
                  <div className="h-0.5 w-12 bg-cyan-500/40 rounded-full group-hover:w-20 transition-all duration-500" />
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}

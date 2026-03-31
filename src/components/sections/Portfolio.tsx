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
      img: "/portfolio/nova.png",
      link: "https://piedfin-boutique-4228d49.public.builtwithrocket.new",
      colSpan: "col-span-1 md:col-span-2",
      rowSpan: "row-span-2"
    },
    {
      id: 2,
      title: "Eshopgs",
      category: t('categories.landing'),
      img: "/portfolio/apex.png",
      link: "https://eshopgs.com/lb",
      colSpan: "col-span-1",
      rowSpan: "row-span-1"
    },
    {
      id: 3,
      title: "Salem Elite Realty",
      category: t('categories.corporate'),
      img: "/portfolio/luxe.png",
      link: "https://salem-elite-realty.vercel.app/",
      colSpan: "col-span-1",
      rowSpan: "row-span-1"
    },
    {
      id: 4,
      title: "Stripe",
      category: t('categories.saas'),
      img: "/portfolio/nexus.png",
      link: "https://stripe.com",
      colSpan: "col-span-1 md:col-span-2",
      rowSpan: "row-span-1"
    }
  ];

  return (
    <section id="portfolio" className="py-24 relative bg-[#070b12] border-t border-cyan-900/40">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-syne">{t('heading')}</h2>
            <p className="text-cyan-100/70 text-lg">
              {t('sub_heading')}
            </p>
          </div>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
          {projects.map((pkg) => (
            <a 
              href={pkg.link}
              target="_blank"
              rel="noopener noreferrer"
              key={pkg.id} 
              className={`${pkg.colSpan} ${pkg.rowSpan} rounded-2xl overflow-hidden relative border border-cyan-800/20 bg-cover bg-center group cursor-pointer block transform transition-all duration-500 hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(3,101,239,0.2)]`}
              style={{ backgroundImage: `url(${pkg.img})` }}
            >
              {/* Dark Overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:from-black/95 transition-all duration-300" />
              
              <div className="absolute bottom-0 left-0 p-6 z-10 w-full translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-2 block py-1 px-3 rounded-md bg-cyan-900/60 w-max border border-cyan-500/30 backdrop-blur-sm shadow-[0_0_15px_rgba(3,101,239,0.3)]">{pkg.category}</span>
                <h3 className="text-2xl font-bold text-white font-syne drop-shadow-lg group-hover:text-cyan-300 transition-colors duration-300">{pkg.title}</h3>
              </div>
              
              {/* External Link Hover Icon */}
              <div className="absolute top-6 right-6 w-10 h-10 bg-cyan-500/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-y-4 group-hover:translate-y-0 transition-all duration-300 border border-cyan-400/50 shadow-lg shadow-cyan-500/30">
                <ArrowRight className="text-white -rotate-45" size={20} />
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}

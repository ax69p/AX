import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import SocialProof from '@/components/sections/SocialProof';
import ROICalculator from '@/components/sections/ROICalculator';
import Portfolio from '@/components/sections/Portfolio';
import Features from '@/components/sections/Features';
import Pricing from '@/components/sections/Pricing';
import FAQ from '@/components/sections/FAQ';
import FinalCTA from '@/components/sections/FinalCTA';

export default function Home() {
  const t = useTranslations('Hero');

  return (
    <main className="min-h-screen bg-transparent relative overflow-hidden flex flex-col pt-16 pb-0">
      {/* Enhanced Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-[10%] right-[-5%] w-[35%] h-[35%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse delay-700" />
        <div className="absolute bottom-[20%] left-[20%] w-[30%] h-[30%] bg-purple-600/5 rounded-full blur-[100px]" />
      </div>
      
      {/* Hero Section Container */}
      <div className="container mx-auto px-4 max-w-6xl flex flex-col items-center justify-center text-center mt-6 relative z-10 pb-20">
        
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glassmorphism mb-8 border border-cyan-500/30">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
          </span>
          <span className="text-cyan-100 text-sm font-medium tracking-wide">
            {t('badge')}
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 drop-shadow-md">
          {t('headline').split('—').map((part, index) => (
            <span key={index} className={index === 1 ? 'block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mt-2 pb-2' : 'pb-2'}>
              {part.trim()}
            </span>
          ))}
        </h1>

        {/* Subheadline */}
        <p className="text-xl text-cyan-50 mt-4 mb-10 max-w-2xl text-opacity-80 mx-auto">
          {t('sub_headline')}
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mx-auto justify-center">
          <Link href="/start" className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-white rounded-lg font-bold transition-all glow-primary hover:scale-105 active:scale-95">
            {t('btn_primary')} {"->"}
          </Link>
          <Link href="/#pricing" className="px-8 py-4 bg-transparent border border-cyan-500/50 hover:border-cyan-400 hover:bg-cyan-950/30 text-cyan-200 rounded-lg font-semibold transition-all hover:scale-105 active:scale-95">
            {t('btn_secondary')}
          </Link>
        </div>

        {/* Social Proof Line */}
        <p className="mt-8 text-sm text-cyan-200/60 font-medium text-center">
          {t('social_proof')}
        </p>
      </div>

      <SocialProof />
      <ROICalculator />
      <Portfolio />
      <Features />
      <Pricing />
      <FAQ />
      <FinalCTA />
    </main>
  );
}

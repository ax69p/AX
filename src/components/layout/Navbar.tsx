"use client";

import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Menu, X, Globe } from 'lucide-react';
import { Link } from '@/i18n/routing';

export default function Navbar() {
  const t = useTranslations('Navigation');
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();
  const locale = params.locale as string;

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const nextLocale = locale === 'en' ? 'ar' : 'en';
    const query = new URLSearchParams(searchParams.toString()).toString();
    const newPath = query ? `${pathname}?${query}` : pathname;
    router.replace(newPath as any, { locale: nextLocale });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'ios-liquid-glass py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'bg-transparent py-6'}`}>
      <div className="container overflow-hidden mx-auto max-w-7xl px-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          {/* We will rely on the neon glow logic on text for now, or Image if Logo is added */}
          <div className="text-2xl font-bold font-syne tracking-widest text-[#10a7f7] text-glow">
            AXENTRIX
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 font-dm-sans font-medium text-cyan-50">
          <Link href="/#services" className="hover:text-cyan-400 transition-colors uppercase text-xs tracking-widest font-bold">{t('services')}</Link>
          <Link href="/#portfolio" className="hover:text-cyan-400 transition-colors uppercase text-xs tracking-widest font-bold">{t('portfolio')}</Link>
          <Link href="/#pricing" className="hover:text-cyan-400 transition-colors uppercase text-xs tracking-widest font-bold">{t('pricing')}</Link>
          
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-800 hover:border-cyan-400 hover:bg-cyan-900/50 transition-all text-sm"
          >
            <Globe size={16} className="text-cyan-400" />
            {t('lang_toggle')}
          </button>
          
          <Link href="/start" className="px-5 py-2 ios-btn rounded-lg text-white font-semibold glow-primary transition-all">
            {t('get_started')}
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-cyan-400" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full ios-liquid-glass border-t border-cyan-800/50 flex flex-col items-center py-6 gap-6">
          <Link href="/#services" onClick={() => setMobileMenuOpen(false)}>{t('services')}</Link>
          <Link href="/#portfolio" onClick={() => setMobileMenuOpen(false)}>{t('portfolio')}</Link>
          <Link href="/#pricing" onClick={() => setMobileMenuOpen(false)}>{t('pricing')}</Link>
          <button onClick={() => { toggleLanguage(); setMobileMenuOpen(false); }} className="flex items-center gap-2 text-cyan-400">
            <Globe size={18} /> {t('lang_toggle')}
          </button>
          <Link href="/start" onClick={() => setMobileMenuOpen(false)} className="px-6 py-2 ios-btn rounded-lg text-white font-semibold">
            {t('get_started')}
          </Link>
        </div>
      )}
    </nav>
  );
}

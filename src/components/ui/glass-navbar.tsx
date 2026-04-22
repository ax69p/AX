"use client";

import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Menu, X, Globe } from "lucide-react";
import { Link } from "@/i18n/routing";
import { motion, AnimatePresence } from "framer-motion";

export default function GlassNavbar() {
  const t = useTranslations("Navigation");
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();
  const locale = params.locale as string;

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    const nextLocale = locale === "en" ? "ar" : "en";
    const query = new URLSearchParams(searchParams.toString()).toString();
    const newPath = query ? `${pathname}?${query}` : pathname;
    router.replace(newPath as Parameters<typeof router.replace>[0], { locale: nextLocale });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#020408]/80 backdrop-blur-[20px] border-b border-white/[0.08] py-3 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
          : "bg-transparent py-5 border-b border-transparent"
      }`}
    >
      <div className="container overflow-hidden mx-auto max-w-7xl px-4 md:px-8 lg:px-16 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="text-2xl font-bold font-syne tracking-widest text-[#00D4FF] text-glow">
            AXENTRIX
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 font-dm-sans font-medium text-cyan-50">
          <Link
            href="/#services"
            className="hover:text-[#00D4FF] transition-colors uppercase text-xs tracking-widest font-bold"
          >
            {t("services")}
          </Link>
          <Link
            href="/#portfolio"
            className="hover:text-[#00D4FF] transition-colors uppercase text-xs tracking-widest font-bold"
          >
            {t("portfolio")}
          </Link>
          <Link
            href="/#pricing"
            className="hover:text-[#00D4FF] transition-colors uppercase text-xs tracking-widest font-bold"
          >
            {t("pricing")}
          </Link>

          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 hover:border-[#00D4FF]/40 hover:bg-[#00D4FF]/10 transition-all text-sm"
          >
            <Globe size={16} className="text-[#00D4FF]" />
            {t("lang_toggle")}
          </button>

          <Link
            href="/start"
            className="px-5 py-2 bg-[#00D4FF]/20 backdrop-blur-[20px] border border-[#00D4FF]/40 shadow-[0_0_20px_rgba(0,212,255,0.2)] rounded-[12px] text-white font-semibold hover:bg-[#00D4FF]/30 transition-all"
          >
            {t("get_started")}
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-[#00D4FF] min-w-[44px] min-h-[44px] flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 w-full bg-[#020408]/95 backdrop-blur-[20px] border-t border-white/[0.08] flex flex-col items-center py-6 gap-6"
          >
            <Link
              href="/#services"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white/80 hover:text-[#00D4FF] transition-colors uppercase text-xs tracking-widest font-bold"
            >
              {t("services")}
            </Link>
            <Link
              href="/#portfolio"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white/80 hover:text-[#00D4FF] transition-colors uppercase text-xs tracking-widest font-bold"
            >
              {t("portfolio")}
            </Link>
            <Link
              href="/#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white/80 hover:text-[#00D4FF] transition-colors uppercase text-xs tracking-widest font-bold"
            >
              {t("pricing")}
            </Link>
            <button
              onClick={() => {
                toggleLanguage();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-[#00D4FF]"
            >
              <Globe size={18} /> {t("lang_toggle")}
            </button>
            <Link
              href="/start"
              onClick={() => setMobileMenuOpen(false)}
              className="px-6 py-2 bg-[#00D4FF]/20 backdrop-blur-[20px] border border-[#00D4FF]/40 rounded-[12px] text-white font-semibold"
            >
              {t("get_started")}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import FadeUp from "@/components/ui/fade-up";
import IOSButton from "@/components/ui/ios-button";

export default function FinalCTA() {
  const t = useTranslations("FinalCTA");

  return (
    <section className="py-24 relative overflow-hidden bg-[#04080e] border-y border-cyan-900/40">
      {/* Heavy glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-[#00D4FF]/10 blur-[150px] pointer-events-none rounded-full z-0" />

      <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
        <FadeUp>
          <div className="inline-block px-4 py-2 rounded-full ios-liquid-glass mb-6">
            <span className="text-[#00D4FF] text-sm font-bold tracking-widest uppercase">
              {t("badge")}
            </span>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h2
            className="text-5xl md:text-6xl font-black text-white mb-6 font-syne tracking-tight leading-tight"
            dangerouslySetInnerHTML={{ __html: t.raw("heading") as string }}
          ></h2>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p className="text-xl text-cyan-50/80 mb-10 max-w-2xl mx-auto">
            {t("sub_heading")}
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-xs sm:max-w-none mx-auto">
            <a
              href="https://wa.me/96181945750"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto block"
            >
              <IOSButton variant="primary" className="w-full sm:w-auto text-xl px-10 py-5 shadow-[0_0_40px_rgba(0,212,255,0.3)]">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                </span>
                {t("btn_whatsapp")}
              </IOSButton>
            </a>
          </div>
        </FadeUp>

        <FadeUp delay={0.4}>
          <p className="mt-8 text-cyan-200/50 text-sm italic">
            {t("no_credit_card")}
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

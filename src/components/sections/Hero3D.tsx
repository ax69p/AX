"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import ShaderBackground from "@/components/ui/shader-background";
import IOSButton from "@/components/ui/ios-button";
import AnimatedCounter from "@/components/ui/animated-counter";
import FadeUp from "@/components/ui/fade-up";

export default function Hero3D() {
  const t = useTranslations("Hero");
  const containerRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-24 pb-20 bg-[#04080e]"
      style={{
        background: "radial-gradient(circle at 50% 50%, #0a1628 0%, #04080e 100%)"
      }}
    >
      {/* WebGL Shader Background (Desktop Only) */}
      <ShaderBackground />

      {/* Mobile/Ambient Fallback Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_rgba(0,212,255,0.08)_0%,_transparent_50%),radial-gradient(circle_at_80%_70%,_rgba(0,100,255,0.05)_0%,_transparent_50%)] pointer-events-none" />

      <style>{`
        @keyframes float-1 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(20px); }
        }
        @keyframes float-3 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float-1 { animation: float-1 4s ease-in-out infinite; }
        .animate-float-2 { animation: float-2 5s ease-in-out infinite 1s; }
        .animate-float-3 { animation: float-3 4.5s ease-in-out infinite 2s; }
        @media (prefers-reduced-motion) {
          .animate-float-1, .animate-float-2, .animate-float-3 {
            animation: none !important;
          }
        }
      `}</style>

      {/* Floating stat pills */}
      <div className="absolute inset-0 pointer-events-none z-0 hidden lg:block max-w-7xl mx-auto">
        <div className="absolute top-[25%] left-[10%] px-4 py-2 ios-liquid-glass rounded-full text-cyan-100 font-semibold text-sm animate-float-1">
          ⚡ Load Time &lt; 1s
        </div>
        <div className="absolute top-[35%] right-[15%] px-4 py-2 ios-liquid-glass rounded-full text-cyan-100 font-semibold text-sm animate-float-2">
          📈 +40% Conversion
        </div>
        <div className="absolute bottom-[25%] left-[20%] px-4 py-2 ios-liquid-glass rounded-full text-cyan-100 font-semibold text-sm animate-float-3">
          📱 Mobile First
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10 flex flex-col items-center text-center">
        {/* Animated Badge */}
        <FadeUp>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full ios-liquid-glass mb-8">
            <span className="text-cyan-100 text-sm font-medium tracking-wide flex items-center gap-2">
              {t("badge")}
            </span>
          </div>
        </FadeUp>

        {/* Headline */}
        <FadeUp delay={0.1}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 drop-shadow-md font-syne">
            {t("headline")}
          </h1>
        </FadeUp>

        {/* Subheadline */}
        <FadeUp delay={0.2}>
          <p className="text-lg md:text-xl text-cyan-50 mt-4 mb-10 max-w-2xl mx-auto font-medium text-opacity-80">
            {t("sub_headline")}
          </p>
        </FadeUp>

        {/* CTA Buttons */}
        <FadeUp delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center gap-4 mx-auto justify-center w-full max-w-xs sm:max-w-none">
            <Link href="/start" className="w-full sm:w-auto">
              <IOSButton variant="primary" className="w-full">
                {t("btn_primary")}
              </IOSButton>
            </Link>
            <Link href="/#pricing" className="w-full sm:w-auto">
              <IOSButton variant="ghost" className="w-full">
                {t("btn_secondary")}
              </IOSButton>
            </Link>
          </div>
        </FadeUp>

        {/* Stats Row Removed to avoid duplication with SocialProof section */}
      </div>
    </section>
  );
}

"use client";

import { useTranslations } from "next-intl";
import AnimatedCounter from "@/components/ui/animated-counter";
import FadeUp from "@/components/ui/fade-up";

export default function SocialProof() {
  const t = useTranslations("SocialProof");

  const logos = [
    "TechGlobal",
    "Nexus Startups",
    "Urban Eats",
    "Apex Fitness",
    "Luxe Studios",
    "Nova Digital",
  ];

  const reviews = t.raw("reviews") as string[];

  return (
    <section className="py-20 relative bg-[#04080e] border-y border-cyan-900/30 overflow-hidden">
      {/* Background radial */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-64 bg-cyan-900/20 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        {/* Animated Stat Counters */}
        <FadeUp>
          <div className="grid grid-cols-3 gap-4 md:gap-8 py-10 border-b border-cyan-900/40 pb-16">
            <div className="flex flex-col items-center text-center">
              <h3 className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#00D4FF] to-blue-600 mb-2 font-syne drop-shadow-md">
                <AnimatedCounter target={50} suffix="+" duration={2000} />
              </h3>
              <p className="text-cyan-100/70 font-medium tracking-wide text-xs sm:text-sm md:text-base">
                {t("stat_websites")}
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <h3 className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#00D4FF] to-blue-600 mb-2 font-syne drop-shadow-md">
                <AnimatedCounter target={20} suffix="+" duration={2000} />
              </h3>
              <p className="text-cyan-100/70 font-medium tracking-wide text-xs sm:text-sm md:text-base">
                {t("stat_clients")}
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <h3 className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#00D4FF] to-blue-600 mb-2 font-syne drop-shadow-md">
                <AnimatedCounter target={100} suffix="%" duration={2000} />
              </h3>
              <p className="text-cyan-100/70 font-medium tracking-wide text-xs sm:text-sm md:text-base">
                {t("stat_satisfaction")}
              </p>
            </div>
          </div>
        </FadeUp>

        {/* Brand Logos */}
        <FadeUp delay={0.15}>
          <div className="py-16">
            <p className="text-center text-cyan-200/50 text-sm mb-8 uppercase tracking-widest">
              {t("trusted_by")}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70">
              {logos.map((logo, idx) => (
                <div
                  key={idx}
                  className="text-2xl font-black font-syne text-gray-500 hover:text-[#00D4FF] transition-colors duration-300 cursor-default"
                >
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* Marquee Reviews */}
        <div className="mt-8 relative flex overflow-x-hidden border-t border-b py-8 border-cyan-900/30 bg-[#070b12]/50">
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#04080e] to-transparent z-10" />
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#04080e] to-transparent z-10" />

          <div className="animate-marquee whitespace-nowrap flex items-center gap-16">
            {[...reviews, ...reviews].map((review, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <span className="text-md font-medium text-cyan-50 italic">
                  &quot;{review}&quot;
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

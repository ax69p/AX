"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { Check, ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/routing";
import FadeUp from "@/components/ui/fade-up";

export default function Pricing() {
  const t = useTranslations("Pricing");

  const packages = [
    {
      id: "x",
      name: t("packages.x.name"),
      price: "$199",
      delivery: t("packages.x.delivery"),
      features: t.raw("packages.x.features") as string[],
      isPopular: false,
    },
    {
      id: "xplus",
      name: t("packages.xplus.name"),
      price: "$399",
      delivery: t("packages.xplus.delivery"),
      features: t.raw("packages.xplus.features") as string[],
      isPopular: true,
    },
    {
      id: "xpro",
      name: t("packages.xpro.name"),
      price: "$599",
      delivery: t("packages.xpro.delivery"),
      features: t.raw("packages.xpro.features") as string[],
      isPopular: false,
    },
  ];

  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("pricing");
      if (section) {
        const rect = section.getBoundingClientRect();
        const topPast = rect.top < -100;
        const bottomNotReached = rect.bottom > 200;
        setShowStickyBar(topPast && bottomNotReached);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="pricing" className="py-24 relative bg-[#070b12] overflow-hidden">
      {/* Sticky Bar */}
      <div
        className={`fixed top-20 left-1/2 -translate-x-1/2 z-40 bg-cyan-950/80 backdrop-blur-md border border-cyan-500/30 px-6 py-3 rounded-full flex gap-4 transition-all duration-300 ${
          showStickyBar
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-10 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-6 text-sm text-cyan-50 font-medium">
          <span className="hidden md:inline">{t("sticky.compare")}</span>
          <span className="text-gray-400 line-through mr-1">$199</span>
          <Link
            href="/start?package=xplus"
            className="text-[#00D4FF] font-bold hover:underline"
          >
            X+ ($399)
          </Link>
          <span className="text-gray-500 px-2">|</span>
          <Link
            href="/start?package=xpro"
            className="text-[#00D4FF] hover:underline"
          >
            X Pro ($599)
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        <FadeUp>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-syne">
              {t("heading")}
            </h2>
            <p className="text-cyan-100/70 text-lg max-w-2xl mx-auto">
              {t("sub_heading")}
            </p>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 items-end max-w-7xl mx-auto">
          {packages.map((pkg, idx) => (
            <FadeUp key={pkg.id} delay={idx * 0.1}>
              <div
                className={`rounded-2xl relative p-6 flex flex-col h-full overflow-hidden ${
                  pkg.isPopular
                    ? "ios-liquid-glass-glow scale-100 lg:scale-105 z-10"
                    : "ios-liquid-glass"
                }`}
              >
                {/* Static glow background instead of WebGL */}
                <div
                  className={`absolute inset-0 pointer-events-none rounded-2xl bg-gradient-to-br ${
                    pkg.isPopular ? "from-[#00D4FF]/20 via-transparent to-cyan-900/40 opacity-50" : "from-cyan-500/10 via-transparent to-cyan-900/30 opacity-30"
                  }`}
                >
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  {pkg.isPopular && (
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#00D4FF] text-[#020408] text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-full shadow-[0_0_20px_rgba(0,212,255,0.4)]">
                      {t("badge_best_value")}
                    </div>
                  )}

                  <h3
                    className={`text-lg font-bold font-syne ${
                      pkg.isPopular
                        ? "text-[#00D4FF] text-glow"
                        : "text-cyan-50"
                    } mb-2 ${pkg.isPopular ? "mt-4" : ""}`}
                  >
                    {pkg.name}
                  </h3>

                  <div className="flex items-baseline gap-1 mt-2 mb-4">
                    <span className="text-3xl font-black text-white">
                      {pkg.price}
                    </span>
                  </div>

                  <div className="bg-cyan-950/40 rounded-lg p-2 text-[12px] text-cyan-200/80 mb-4 border border-cyan-800/30">
                    🧭 {t("delivery_prefix")}:{" "}
                    <span className="font-semibold text-cyan-100">
                      {pkg.delivery}
                    </span>
                  </div>

                  <ul className="flex-1 flex flex-col gap-3 mb-6">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check
                          className="text-[#00D4FF] mt-1 flex-shrink-0"
                          size={14}
                        />
                        <span className="text-cyan-50/80 text-[13px] leading-tight">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/start?package=${pkg.id}`}
                    className={`w-full py-3 rounded-lg font-bold text-center text-sm transition-all flex items-center justify-center gap-2 ${
                      pkg.isPopular
                        ? "bg-[#00D4FF]/20 border border-[#00D4FF]/40 shadow-[0_0_20px_rgba(0,212,255,0.25)] text-white"
                        : "ios-btn text-cyan-100"
                    }`}
                  >
                    {t("btn_get_package")}
                  </Link>
                </div>
              </div>
            </FadeUp>
          ))}

          {/* QR Menu Standalone Card */}
          <FadeUp delay={0.3}>
            <div className="rounded-2xl relative p-6 flex flex-col h-full ios-liquid-glass border border-purple-500/30 bg-purple-500/5 overflow-hidden">
              {/* Static glow background instead of WebGL */}
              <div className="absolute inset-0 pointer-events-none rounded-2xl bg-gradient-to-br from-purple-500/10 via-transparent to-purple-900/30 opacity-40">
              </div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-full shadow-lg shadow-purple-500/20">
                  NEW SERVICE
                </div>

                <h3 className="text-lg font-bold font-syne text-purple-300 mb-2 mt-4">
                  {t("packages.qrmenu.name")}
                </h3>

                <div className="flex items-baseline gap-1 mt-2 mb-4">
                  <span className="text-3xl font-black text-white">
                    {t("packages.qrmenu.price")}
                  </span>
                </div>

                <div className="bg-purple-950/20 rounded-lg p-2 text-[12px] text-purple-200/80 mb-4 border border-purple-800/20">
                  🧭 {t("delivery_prefix")}:{" "}
                  <span className="font-semibold text-purple-100">
                    {t("packages.qrmenu.delivery")}
                  </span>
                </div>

                <ul className="flex-1 flex flex-col gap-3 mb-6">
                  {(t.raw("packages.qrmenu.features") as string[]).map(
                    (feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check
                          className="text-purple-400 mt-1 flex-shrink-0"
                          size={14}
                        />
                        <span className="text-cyan-50/80 text-[13px] leading-tight">
                          {feature}
                        </span>
                      </li>
                    )
                  )}
                </ul>

                <Link
                  href="/start?package=qrmenu"
                  className="w-full py-3 ios-btn rounded-lg font-bold flex items-center justify-center text-sm transition-all border border-purple-500/50 text-purple-100"
                >
                  {t("btn_get_package")}
                </Link>
              </div>
            </div>
          </FadeUp>
        </div>

        {/* Add-on Banner */}
        <FadeUp delay={0.2}>
          <div className="mt-12 max-w-4xl mx-auto ios-liquid-glass border border-cyan-500/20 p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0 border border-cyan-500/30 group-hover:scale-110 transition-transform">
              <span className="text-2xl">🍽️</span>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h4 className="text-lg font-bold text-white mb-1 font-syne">
                {t("qr_addon.title")}
              </h4>
              <p className="text-cyan-100/60 text-sm">{t("qr_addon.desc")}</p>
            </div>
            <Link
              href="/start"
              className="px-6 py-2 bg-[#00D4FF]/20 border border-[#00D4FF]/40 text-white rounded-full text-sm font-bold transition-all hover:bg-[#00D4FF]/30"
            >
              {t("custom_prompt")}
            </Link>
          </div>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div className="mt-16 bg-cyan-950/20 border border-cyan-900/50 rounded-xl max-w-3xl mx-auto p-6 flex items-center justify-center gap-4 flex-col sm:flex-row text-center sm:text-left">
            <div className="w-12 h-12 rounded-full bg-cyan-900/50 flex flex-shrink-0 items-center justify-center border border-cyan-500/30">
              <ShieldCheck className="text-[#00D4FF]" size={24} />
            </div>
            <div>
              <h4 className="text-white font-bold font-syne mb-1">
                {t("guarantee.title")}
              </h4>
              <p className="text-cyan-100/60 text-sm">
                {t("guarantee.desc")}
              </p>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.35}>
          <div className="mt-10 text-center text-cyan-100/50 text-sm flex justify-center gap-1 flex-wrap">
            {t("custom_prompt")}{" "}
            <Link
              href="/start?package=custom"
              className="text-[#00D4FF] hover:underline"
            >
              {t("custom_link")}
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

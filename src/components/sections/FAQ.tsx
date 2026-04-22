"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import FadeUp from "@/components/ui/fade-up";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQ() {
  const t = useTranslations("FAQ");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = t.raw("items") as { q: string; a: string }[];

  return (
    <section className="py-24 relative bg-[#070b12] border-t border-cyan-900/40">
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <FadeUp>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-syne">
              {t("heading")}
            </h2>
            <p className="text-cyan-100/70 text-lg">{t("sub_heading")}</p>
          </div>
        </FadeUp>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <FadeUp key={idx} delay={idx * 0.06}>
                <div
                  className={`rounded-xl transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "ios-liquid-glass-glow shadow-[0_0_20px_rgba(0,212,255,0.15)]"
                      : "ios-liquid-glass hover:bg-white/10"
                  }`}
                >
                  <button
                    className="w-full flex justify-between items-center p-6 text-left"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                  >
                    <span
                      className={`font-bold font-syne text-lg transition-colors ${
                        isOpen ? "text-[#00D4FF]" : "text-cyan-50"
                      }`}
                    >
                      {faq.q}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 border ${
                        isOpen
                          ? "rotate-180 bg-[#00D4FF]/20 text-[#00D4FF] border-[#00D4FF]/50"
                          : "bg-transparent text-cyan-200/50 border-cyan-900"
                      }`}
                    >
                      <ChevronDown size={18} />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          <p className="text-cyan-100/70 leading-relaxed text-sm w-11/12 border-l-2 border-[#00D4FF]/50 pl-4">
                            {faq.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}

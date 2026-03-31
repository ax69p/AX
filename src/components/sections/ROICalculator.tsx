"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function ROICalculator() {
  const t = useTranslations('ROICalculator');

  const [visitors, setVisitors] = useState<number>(3000);
  const [conversionRate, setConversionRate] = useState<number>(1.5);
  const [leadValue, setLeadValue] = useState<number>(500);

  // Default projection is AxentriX gets you to 3.5% conversion
  const newConversionRate = Math.max(conversionRate + 2, 3.5);

  const currentLeads = Math.round(visitors * (conversionRate / 100));
  const currentRevenue = currentLeads * leadValue;

  const newLeads = Math.round(visitors * (newConversionRate / 100));
  const newRevenue = newLeads * leadValue;

  const revenueIncrease = newRevenue - currentRevenue;

  return (
    <section className="py-24 relative bg-[#04080e] overflow-hidden border-t border-cyan-900/40">
      {/* Background radial */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-cyan-900/20 blur-[120px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-syne">{t('heading')}</h2>
          <p className="text-cyan-100/70 text-lg max-w-2xl mx-auto">
            {t('sub_heading')}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          
          {/* Controls */}
          <div className="lg:w-1/2 p-8 rounded-2xl glassmorphism border border-cyan-800/30 shadow-[0_0_30px_rgba(3,101,239,0.05)]">
            <h3 className="text-2xl font-bold text-cyan-50 mb-8 font-syne">{t('current_metrics')}</h3>
            
            <div className="space-y-8">
              {/* Vistors */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-cyan-200/80">{t('visitors_label')}</label>
                  <span className="text-cyan-400 font-bold">{visitors.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min="500" max="50000" step="500" 
                  value={visitors} 
                  onChange={(e) => setVisitors(parseInt(e.target.value))}
                  className="w-full accent-cyan-500 h-2 bg-cyan-950 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Conversion Rate */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-cyan-200/80">{t('conversion_label')}</label>
                  <span className="text-cyan-400 font-bold">{conversionRate.toFixed(1)}%</span>
                </div>
                <input 
                  type="range" 
                  min="0.1" max="10" step="0.1" 
                  value={conversionRate} 
                  onChange={(e) => setConversionRate(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 h-2 bg-cyan-950 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Lead Value */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-cyan-200/80">{t('lead_value_label')}</label>
                  <span className="text-cyan-400 font-bold">${leadValue.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min="50" max="10000" step="50" 
                  value={leadValue} 
                  onChange={(e) => setLeadValue(parseInt(e.target.value))}
                  className="w-full accent-cyan-500 h-2 bg-cyan-950 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Results Analysis */}
          <div className="lg:w-1/2 flex flex-col justify-center">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-cyan-900/40 to-[#070b12] border border-cyan-500/20 relative overflow-hidden">
              
              <div className="absolute top-0 right-0 p-4 opacity-10">
                 <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-500"><path d="M12 2v20m0 0l-8-8m8 8l8-8"/></svg>
              </div>

              <h3 className="text-xl font-bold text-gray-300 mb-6 flex items-center gap-2">
                {t('potential_growth')}
              </h3>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-900/50">
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">{t('current_revenue')}</p>
                  <p className="text-2xl font-semibold text-gray-200">${currentRevenue.toLocaleString()}<span className="text-sm font-normal text-gray-500">{t('mo')}</span></p>
                </div>
                <div className="p-4 rounded-xl bg-cyan-900/40 border border-cyan-500/30 glow-primary relative">
                  <div className="absolute -top-3 -right-3 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-full animate-bounce">
                    {t('estimated')}
                  </div>
                  <p className="text-xs text-cyan-200/70 uppercase tracking-widest mb-1">{t('new_revenue')}</p>
                  <p className="text-2xl font-bold text-cyan-400">${newRevenue.toLocaleString()}<span className="text-sm font-normal text-cyan-700">{t('mo')}</span></p>
                </div>
              </div>

              <div className="border-t border-cyan-800/40 pt-6">
                <p className="text-sm text-cyan-100/60 mb-1">{t('extra_profit')}</p>
                <div className="flex items-baseline gap-2 text-green-400">
                  <span className="text-5xl font-black tracking-tighter text-glow">+${revenueIncrease.toLocaleString()}</span>
                  <span className="text-lg font-medium">{t('per_month')}</span>
                </div>
                <p className="text-xs text-green-400/60 mt-2 italic">{t('per_year', { yearly: "$" + Number(revenueIncrease * 12).toLocaleString() })}</p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

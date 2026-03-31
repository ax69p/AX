"use client";

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { X, FileText } from 'lucide-react';
import { submitLead } from '@/actions/submitLead';

export default function LeadMagnet() {
  const t = useTranslations('LeadMagnet');
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Show after 30 seconds if not already closed
    const hasSeen = localStorage.getItem('axentrix_lead_magnet_seen');
    if (!hasSeen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 30000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    // Exit intent detection
    const handleMouseLeave = (e: MouseEvent) => {
      const hasSeen = localStorage.getItem('axentrix_lead_magnet_seen');
      if (e.clientY <= 0 && !hasSeen && !isOpen) {
        setIsOpen(true);
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('axentrix_lead_magnet_seen', 'true');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append('message', 'LEAD MAGNET: E-book/Audit Request');
    formData.append('package', 'none');
    
    // Call server action directly logic
    const res = await submitLead(null, formData);
    if (res?.success) {
      setIsSubmitted(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-lg bg-[#070b12] border border-cyan-500/30 rounded-2xl shadow-[0_0_50px_rgba(3,101,239,0.15)] overflow-hidden animate-in fade-in zoom-in duration-300"
      >
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-cyan-200/50 hover:text-white transition-colors z-10"
        >
          <X size={24} />
        </button>

        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-600/20 blur-[80px] rounded-full pointer-events-none" />

        <div className="p-8 relative z-10">
          {isSubmitted ? (
            <div className="text-center py-8">
               <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 glow-primary">
                 <FileText size={32} className="text-green-400" />
               </div>
               <h3 className="text-2xl font-bold text-white mb-2 font-syne">{t('success_heading')}</h3>
               <p className="text-cyan-100/70">{t('success_sub')}</p>
               <button onClick={handleClose} className="mt-8 text-cyan-400 hover:text-cyan-300 font-semibold underline">
                 {t('close')}
               </button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-2 block border border-cyan-500/30 w-max px-2 py-1 rounded bg-cyan-950">{t('badge')}</span>
                <h3 className="text-3xl font-bold text-white mb-2 font-syne leading-tight">{t('heading')}</h3>
                <p 
                  className="text-cyan-100/70 text-sm"
                  dangerouslySetInnerHTML={{ __html: t.raw('sub_heading') }}
                ></p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                  required type="text" name="name" 
                  className="w-full bg-cyan-950/40 border border-cyan-900 rounded-lg px-4 py-3 text-white placeholder-cyan-100/40 focus:outline-none focus:border-cyan-500 text-sm" 
                  placeholder={t('name_placeholder')} 
                />
                <input 
                  required type="email" name="email" 
                  className="w-full bg-cyan-950/40 border border-cyan-900 rounded-lg px-4 py-3 text-white placeholder-cyan-100/40 focus:outline-none focus:border-cyan-500 text-sm" 
                  placeholder={t('email_placeholder')} 
                />
                <input 
                  type="url" name="website" 
                  className="w-full bg-cyan-950/40 border border-cyan-900 rounded-lg px-4 py-3 text-white placeholder-cyan-100/40 focus:outline-none focus:border-cyan-500 text-sm" 
                  placeholder={t('website_placeholder')}
                />
                
                <button 
                  type="submit" 
                  className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-white rounded-xl text-md font-bold transition-all glow-primary hover:scale-[1.02] active:scale-95"
                >
                  {t('btn_submit')}
                </button>
                <div className="text-center">
                  <button type="button" onClick={handleClose} className="text-xs text-cyan-100/30 hover:text-cyan-100/70">
                    {t('btn_close')}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

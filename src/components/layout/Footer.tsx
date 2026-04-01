"use client";

import { useTranslations } from 'next-intl';
import { Camera, Mail, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { subscribeNewsletter } from '@/actions/subscribeNewsletter';
import { useActionState } from 'react';

export default function Footer() {
  const t = useTranslations('Footer');
  const [state, formAction, isPending] = useActionState(subscribeNewsletter, null);

  const isSuccess = state?.success;

  return (
    <footer className="w-full border-t border-cyan-900/50 bg-[#04080e] pt-16 pb-8 relative z-10 overflow-hidden">
      {/* Subtle bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-cyan-600/10 blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto max-w-7xl px-4 grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
        <div className="col-span-1 md:col-span-1 flex flex-col items-center md:items-start">
          <div className="text-2xl font-bold font-syne tracking-widest text-[#10a7f7] text-glow mb-4">
            AXENTRIX
          </div>
          <p className="text-cyan-100/60 text-sm leading-relaxed mb-6">
            {t('description')}
          </p>
          
          {/* Contact Info */}
          <div className="flex flex-col gap-4">
            <a 
              href="https://instagram.com/axentrix.sy" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-cyan-100/60 hover:text-cyan-400 transition-all text-sm group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center p-2 shadow-lg shadow-pink-500/10 group-hover:scale-110 transition-transform">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </div>
              <span className="font-medium">{t('handle')}</span>
            </a>

            <a 
              href="https://wa.me/96181945750" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-cyan-100/60 hover:text-[#25D366] transition-all text-sm group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#25D366] flex items-center justify-center p-2 shadow-lg shadow-green-500/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.766-5.764-5.766zm3.392 8.221c-.142.399-.715.762-1.091.812-.373.049-.738.046-2.148-.521-1.745-.694-2.825-2.479-2.912-2.595-.087-.116-.711-.944-.711-1.815 0-.87.456-1.298.618-1.472.162-.174.354-.217.472-.217l.338.005c.106.005.249-.04.39.298.141.339.485 1.18.528 1.264.041.085.069.184.012.298-.057.113-.085.184-.17.283l-.254.306c-.084.102-.172.213-.073.383.099.17.441.728.946 1.173.652.571 1.201.747 1.371.817.17.071.27.058.37-.057.101-.115.426-.496.541-.666.113-.17.227-.142.383-.085s.988.467 1.157.552c.17.085.283.125.325.198.042.073.042.424-.1.823z" />
                  <path d="M12.036 3c-4.933 0-8.947 4.014-8.947 8.948 0 1.579.412 3.12 1.196 4.475L3 21.036l4.757-1.248c1.309.714 2.787 1.091 4.279 1.092h.001c4.933 0 8.949-4.014 8.949-8.948 0-2.409-.938-4.674-2.639-6.375S14.444 3 12.036 3zm0 16.326h-.001c-1.393 0-2.76-.375-3.953-1.082l-.283-.168-2.94.771.785-2.863-.184-.293c-.777-1.237-1.188-2.666-1.187-4.131.002-4.114 3.349-7.461 7.466-7.461 1.994 0 3.869.777 5.279 2.187s2.186 3.284 2.186 5.275c-.003 4.115-3.35 7.462-7.468 7.462z" />
                </svg>
              </div>
              <span className="font-medium">{t('phone')}</span>
            </a>

            <a 
              href="https://instagram.com/ax04s" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-cyan-100/60 hover:text-cyan-400 transition-all text-sm group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center p-2 shadow-lg shadow-pink-500/20 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </div>
              <span className="font-medium text-cyan-400/90">{t('personal_handle')}</span>
            </a>

            <a 
              href="mailto:Axentrixsy@gmail.com" 
              className="flex items-center gap-3 text-cyan-100/60 hover:text-cyan-400 transition-all text-sm group"
            >
              <div className="w-9 h-9 rounded-xl bg-cyan-950/50 flex items-center justify-center p-2 border border-cyan-800/50 group-hover:border-cyan-400 transition-colors">
                <Mail size={18} />
              </div>
              <span className="font-medium">{t('email')}</span>
            </a>
          </div>
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-4">{t('quick_links')}</h4>
          <ul className="flex flex-col gap-2 text-cyan-100/60 text-sm">
            <li><Link href="/#services" className="hover:text-cyan-400 transition-colors uppercase text-[10px] tracking-widest font-bold">{t('services')}</Link></li>
            <li><Link href="/#pricing" className="hover:text-cyan-400 transition-colors uppercase text-[10px] tracking-widest font-bold">{t('pricing')}</Link></li>
            <li><Link href="/#portfolio" className="hover:text-cyan-400 transition-colors uppercase text-[10px] tracking-widest font-bold">{t('portfolio')}</Link></li>
            <li><Link href="/start" className="hover:text-cyan-400 transition-colors uppercase text-[10px] tracking-widest font-bold">{t('contact')}</Link></li>
          </ul>
        </div>

        <div>
           <h4 className="text-white font-semibold mb-4">{t('legal')}</h4>
          <ul className="flex flex-col gap-2 text-cyan-100/60 text-sm">
            <li><a href="#" className="hover:text-cyan-400">{t('privacy')}</a></li>
            <li><a href="#" className="hover:text-cyan-400">{t('terms')}</a></li>
            <li><a href="#" className="hover:text-cyan-400">{t('refund')}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">{t('newsletter_heading')}</h4>
          <p className="text-cyan-100/60 text-sm mb-4">{t('newsletter_desc')}</p>
          
          {isSuccess ? (
            <div className="flex items-center gap-3 p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-400 text-sm animate-in fade-in slide-in-from-bottom-2">
              <CheckCircle2 size={18} />
              <span>{t('newsletter_success')}</span>
            </div>
          ) : (
            <form action={formAction} className="flex">
              <input 
                type="email" 
                name="email"
                required
                placeholder={t('email_placeholder')} 
                className="bg-cyan-950/30 border border-cyan-800 rounded-l-md px-3 py-2 outline-none focus:border-cyan-500 text-sm text-white w-full transition-all disabled:opacity-50" 
                disabled={isPending}
              />
              <button 
                type="submit"
                disabled={isPending}
                className="bg-cyan-600 hover:bg-cyan-500 disabled:bg-cyan-800 px-4 py-2 rounded-r-md text-white font-medium text-sm transition-colors flex items-center justify-center min-w-[80px]"
              >
                {isPending ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Send size={16} />
                )}
              </button>
            </form>
          )}

          {state?.error && !isSuccess && (
            <p className="mt-2 text-xs text-red-400">{state.error}</p>
          )}
        </div>
      </div>
      
      <div className="container mx-auto max-w-7xl px-4 flex flex-col items-center justify-center mt-16 pt-8 border-t border-cyan-900/30 text-center text-cyan-100/40 text-sm">
        <p>&copy; {new Date().getFullYear()} {t('rights')}</p>
      </div>
    </footer>
  );
}

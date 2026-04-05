"use client";

import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { submitLead } from '@/actions/submitLead';

export default function StartPage() {
  const searchParams = useSearchParams();
  const locale = useLocale();
  const t = useTranslations('StartPage');
  
  const preSelectedPackage = searchParams.get('package') || 'xplus';

  const [state, formAction, isPending] = useActionState(submitLead, null);

  if (state?.success) {
    return (
      <main className="min-h-screen bg-[#070b12] flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-900/20 rounded-full blur-[100px] border border-cyan-500/20" />
        
        <div className="relative z-10 text-center max-w-lg p-10 ios-liquid-glass rounded-2xl">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 glow-primary">
            <CheckCircle2 size={40} className="text-green-400" />
          </div>
          <h1 className="text-4xl font-bold font-syne text-white mb-4">{t('success_heading')}</h1>
          <p className="text-cyan-100/80 mb-8 text-lg">
            {t('success_sub')}
          </p>
          <div className="flex flex-col gap-4">
            <Link href="/" className="px-6 py-3 ios-btn text-white rounded-lg transition-all font-semibold">
              {t('return_home')}
            </Link>
            <a
              href="https://wa.me/96181945750" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#25D366]/20 border border-[#25D366]/50 hover:bg-[#25D366]/30 text-[#25D366] rounded-lg transition-all font-bold"
            >
              {t('faster_whatsapp')}
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#070b12] relative overflow-hidden pt-20 pb-20">
      <div className="absolute top-0 right-0 w-1/2 h-[500px] bg-cyan-900/10 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold mb-8 transition-transform hover:-translate-x-1">
          <ArrowLeft size={18} className={locale === 'ar' ? 'rotate-180' : ''} /> {t('back')}
        </Link>

        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-syne">{t('heading')}</h1>
          <p className="text-cyan-100/70 text-lg">{t('sub_heading')}</p>
        </div>

        <form action={formAction} className="ios-liquid-glass p-8 rounded-2xl">
          <input type="hidden" name="locale" value={locale} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-cyan-50 mb-2">{t('name')}</label>
              <input required type="text" name="name" className="w-full bg-cyan-950/50 border border-cyan-900 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors" placeholder={t('name_placeholder')} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-cyan-50 mb-2">{t('email')}</label>
              <input required type="email" name="email" className="w-full bg-cyan-950/50 border border-cyan-900 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors" placeholder={t('email_placeholder')} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-cyan-50 mb-2">{t('whatsapp')}</label>
              <input required type="tel" name="whatsapp" className="w-full bg-cyan-950/50 border border-cyan-900 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors" placeholder={t('whatsapp_placeholder')} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-cyan-50 mb-2">{t('website')}</label>
              <input type="url" name="website" className="w-full bg-cyan-950/50 border border-cyan-900 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors" placeholder={t('website_placeholder')} />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-cyan-50 mb-2">{t('package')}</label>
            <select name="package" defaultValue={preSelectedPackage} className="w-full bg-cyan-950/50 border border-cyan-900 rounded-lg p-4 text-white focus:outline-none focus:border-cyan-500 transition-colors appearance-none cursor-pointer">
              <option value="x">{t('pkg_x')}</option>
              <option value="xplus">{t('pkg_xplus')}</option>
              <option value="xpro">{t('pkg_xpro')}</option>
              <option value="qrmenu">{t('pkg_qrmenu')}</option>
              <option value="custom">{t('pkg_custom')}</option>
            </select>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-semibold text-cyan-50 mb-2">{t('message')}</label>
            <textarea name="message" rows={4} className="w-full bg-cyan-950/50 border border-cyan-900 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors" placeholder={t('message_placeholder')}></textarea>
          </div>

          {state?.error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
              {state.error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={isPending}
            className="ios-btn text-white w-full py-4 rounded-xl text-lg font-bold transition-all glow-primary hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {isPending ? (
              <span className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : t('submit')}
          </button>
          
          <p className="mt-4 text-center text-xs text-cyan-100/40">{t('secure')}</p>
        </form>

      </div>
    </main>
  );
}

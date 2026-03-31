"use client";

import { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Communications() {
  const t = useTranslations('Communications');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Show popup after 15 seconds
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* 15-second delay popup */}
      {showPopup && (
        <div className="fixed bottom-24 right-6 z-50 bg-[#070b12] border border-cyan-500/50 rounded-xl p-4 shadow-[0_0_20px_rgba(3,101,239,0.3)] w-72 transform transition-all animate-bounce-short">
          <button 
            onClick={() => setShowPopup(false)}
            className="absolute top-2 right-2 text-cyan-500/50 hover:text-cyan-400"
          >
            <X size={16} />
          </button>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-cyan-600 flex items-center justify-center flex-shrink-0 relative">
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#070b12] rounded-full"></span>
              <MessageCircle size={20} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-cyan-50 font-medium">{t('popup_msg')}</p>
              <p className="text-xs text-cyan-200/70 mt-1 mb-3">{t('popup_sub')}</p>
              <a 
                href="https://wa.me/96181945750" 
                target="_blank" 
                rel="noreferrer"
                className="inline-block px-4 py-1.5 bg-[#25D366] hover:bg-[#20b858] text-white text-xs font-semibold rounded-md transition-colors"
              >
                {t('btn_chat')}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Persistent Floating WhatsApp Button */}
      <a 
        href="https://wa.me/96181945750" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_4px_14px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform hover:shadow-[0_6px_20px_rgba(37,211,102,0.6)]"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={28} />
      </a>
    </>
  );
}

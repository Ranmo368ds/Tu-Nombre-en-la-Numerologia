"use client";

import { MessageCircle, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function FloatingWhatsApp() {
    const t = useTranslations("MarketingPage.floating_whatsapp");
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
            {/* Tooltip */}
            <div className="hidden md:block bg-white text-slate-900 px-4 py-2 rounded-lg shadow-lg font-medium text-sm whitespace-nowrap animate-bounce">
                {t('text')}
                <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 w-2 h-2 bg-white rotate-45"></div>
            </div>

            {/* WhatsApp Button */}
            <a
                href="https://wa.me/18475029685"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full p-4 shadow-2xl transition-all hover:scale-110 flex items-center gap-2"
            >
                <MessageCircle className="w-6 h-6" />
                <span className="hidden md:inline-block font-bold pr-2">{t('button')}</span>

                {/* Pulse effect */}
                <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-75"></span>
            </a>

            {/* Close button (mobile only) */}
            <button
                onClick={() => setIsVisible(false)}
                className="md:hidden absolute -top-2 -left-2 bg-slate-800 text-white rounded-full p-1 shadow-lg"
            >
                <X className="w-3 h-3" />
            </button>
        </div>
    );
}

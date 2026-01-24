'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight, Zap } from 'lucide-react';

export default function LocalMarketingCTA() {
    const t = useTranslations('LocalMarketingPage.finalCTA');

    const handleCTA = () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="py-24 bg-gray-900 relative overflow-hidden">
            {/* Design accents */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <div className="max-w-4xl mx-auto items-center flex flex-col">
                    <div className="w-16 h-16 bg-gradient-to-tr from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(139,92,246,0.3)] animate-bounce">
                        <Zap className="w-8 h-8 text-white fill-current" />
                    </div>

                    <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 leading-tight">
                        {t('title')}
                    </h2>

                    <p className="text-xl md:text-2xl text-gray-400 mb-12">
                        {t('subtitle')}
                    </p>

                    <button
                        onClick={handleCTA}
                        className="group flex items-center gap-3 px-12 py-5 bg-white text-gray-900 text-xl font-bold rounded-2xl shadow-2xl hover:bg-gray-100 hover:scale-105 transition-all"
                    >
                        <span>{t('button')}</span>
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <div className="mt-8 flex items-center gap-2 text-gray-500 font-medium">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span>Disponible en Chicago Northwest Suburbs</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

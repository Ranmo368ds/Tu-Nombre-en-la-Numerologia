'use client';

import { useTranslations } from 'next-intl';
import { Megaphone, Rocket, Globe, Zap } from 'lucide-react';

export default function LocalMarketingHero() {
    const t = useTranslations('LocalMarketingPage.hero');

    const handleCTA = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 pt-20">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }}></div>
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-purple-500/20 backdrop-blur-md border border-purple-400/30 rounded-full px-6 py-2 mb-8 animate-fade-in">
                    <Megaphone className="w-4 h-4 text-purple-300" />
                    <span className="text-purple-200 text-sm font-medium tracking-wide uppercase">{t('badge')}</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                    {t('title')}
                </h1>

                {/* Subheadline */}
                <p className="text-xl md:text-2xl text-purple-100 mb-12 leading-relaxed max-w-3xl mx-auto opacity-90">
                    {t('subtitle')}
                </p>

                {/* CTA Button */}
                <button
                    onClick={handleCTA}
                    className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-xl font-bold rounded-2xl shadow-2xl hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300 active:scale-95"
                >
                    <Zap className="w-6 h-6 fill-current" />
                    <span>{t('cta')}</span>
                    <Rocket className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>

                {/* Micro Icons */}
                <div className="mt-16 flex justify-center gap-8 opacity-40">
                    <Globe className="w-8 h-8 text-white" />
                    <div className="w-px h-8 bg-white/20"></div>
                    <Megaphone className="w-8 h-8 text-white" />
                    <div className="w-px h-8 bg-white/20"></div>
                    <Zap className="w-8 h-8 text-white" />
                </div>
            </div>
        </section>
    );
}

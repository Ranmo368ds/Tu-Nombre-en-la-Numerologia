'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight, Paintbrush } from 'lucide-react';

export default function PaintingHero() {
    const t = useTranslations('PaintingPage.hero');

    const handlePrimaryCTA = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleSecondaryCTA = () => {
        window.open('https://www.pinterest.com/genesmarketing/painting-marketing/', '_blank');
    };

    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-950 via-indigo-900 to-blue-800 pt-20">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}></div>
            </div>

            {/* Animated Icons */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <Paintbrush className="absolute top-20 left-10 w-16 h-16 text-white/5 animate-pulse" style={{ animationDelay: '0s' }} />
                <Paintbrush className="absolute top-40 right-20 w-20 h-20 text-white/5 animate-pulse" style={{ animationDelay: '1s' }} />
                <Paintbrush className="absolute bottom-32 left-1/4 w-12 h-12 text-white/5 animate-pulse" style={{ animationDelay: '2s' }} />
                <Paintbrush className="absolute bottom-20 right-1/3 w-24 h-24 text-white/5 animate-pulse" style={{ animationDelay: '1.5s' }} />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 mb-8">
                    <Paintbrush className="w-5 h-5 text-blue-300" />
                    <span className="text-white/90 font-medium text-sm">{t('badge')}</span>
                </div>

                {/* H1 */}
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                    {t('title')}
                </h1>

                {/* Subtitle */}
                <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
                    {t('subtitle')}
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                        onClick={handlePrimaryCTA}
                        className="group bg-[#E11D2E] hover:bg-[#C01828] text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center gap-2"
                    >
                        {t('cta_primary')}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button
                        onClick={handleSecondaryCTA}
                        className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 border border-white/30 hover:border-white/50 flex items-center gap-2"
                    >
                        {t('cta_secondary')}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Trust Indicators */}
                <div className="mt-16 flex flex-wrap justify-center gap-8 text-white/80">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-sm">{t('trust_1')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-sm">{t('trust_2')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-sm">{t('trust_3')}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

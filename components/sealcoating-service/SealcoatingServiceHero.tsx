'use client';

import { useTranslations } from 'next-intl';
import { Droplet, TrendingUp, Users, Shield } from 'lucide-react';

export default function SealcoatingServiceHero() {
    const t = useTranslations('SealcoatingPage.hero');

    const handlePrimaryCTA = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleSecondaryCTA = () => {
        window.open('https://www.pinterest.com/genesmarketing/latino-business-directory-chicago-suburbs/', '_blank');
    };

    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(255,255,255,0.03) 50px, rgba(255,255,255,0.03) 51px),
                                     repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(255,255,255,0.03) 50px, rgba(255,255,255,0.03) 51px)`
                }}></div>
            </div>

            {/* Animated Droplet Icons */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <Droplet className="absolute top-20 left-10 w-16 h-16 text-gray-400/20 animate-pulse" />
                <Droplet className="absolute bottom-32 right-20 w-20 h-20 text-gray-400/20 animate-pulse delay-1000" />
                <Droplet className="absolute top-1/3 right-1/4 w-12 h-12 text-gray-400/20 animate-pulse delay-500" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-gray-700/50 backdrop-blur-sm border border-gray-600/30 rounded-full px-6 py-2 mb-8">
                        <Shield className="w-4 h-4 text-gray-300" />
                        <span className="text-gray-200 text-sm font-medium">{t('badge')}</span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                        {t('title')}
                    </h1>

                    {/* Subheadline */}
                    <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
                        {t('subtitle')}
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                        <button
                            onClick={handlePrimaryCTA}
                            className="group relative px-8 py-4 bg-gradient-to-r from-orange-600 to-orange-700 text-white font-bold rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                        >
                            <span className="relative z-10">{t('cta_primary')}</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-700 to-orange-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>
                        <button
                            onClick={handleSecondaryCTA}
                            className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold rounded-lg hover:bg-white/20 transition-all duration-300"
                        >
                            {t('cta_secondary')}
                        </button>
                    </div>

                    {/* Trust Indicators */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                        <div className="flex items-center justify-center gap-3 text-gray-300">
                            <Users className="w-6 h-6 text-orange-400" />
                            <span className="font-medium">{t('trust.clients')}</span>
                        </div>
                        <div className="flex items-center justify-center gap-3 text-gray-300">
                            <TrendingUp className="w-6 h-6 text-orange-400" />
                            <span className="font-medium">{t('trust.results')}</span>
                        </div>
                        <div className="flex items-center justify-center gap-3 text-gray-300">
                            <Shield className="w-6 h-6 text-orange-400" />
                            <span className="font-medium">{t('trust.guarantee')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

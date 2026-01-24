'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';

export default function RoofingServiceCTA() {
    const t = useTranslations('RoofingPage.finalCTA');

    const handleCTA = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="py-20 bg-gradient-to-br from-blue-900 via-slate-900 to-blue-900 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 50px, rgba(255,255,255,0.05) 50px, rgba(255,255,255,0.05) 51px)`
                }}></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Main Heading */}
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                        {t('title')}
                    </h2>

                    {/* Subheadline */}
                    <p className="text-xl md:text-2xl text-blue-100 mb-12 leading-relaxed max-w-3xl mx-auto">
                        {t('subtitle')}
                    </p>

                    {/* CTA Button */}
                    <button
                        onClick={handleCTA}
                        className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xl font-bold rounded-xl shadow-2xl hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300"
                    >
                        <span>{t('button')}</span>
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                    </button>

                    {/* Small Print */}
                    <p className="mt-6 text-blue-200 text-sm">
                        {t('smallPrint')}
                    </p>
                </div>
            </div>
        </section>
    );
}

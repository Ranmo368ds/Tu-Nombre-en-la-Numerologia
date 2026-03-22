'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight, Phone, Calendar } from 'lucide-react';

export default function CleaningCTA() {
    const t = useTranslations('CleaningPage.finalCTA');

    const handleCTA = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="py-24 bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 relative overflow-hidden">
            {/* Background pattern from PaintingCTA */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}></div>
            </div>

            {/* Glowing orbs */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-500 rounded-full blur-[120px] opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-400 rounded-full blur-[120px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                {/* Decoration */}
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 mb-10 rotate-12 shadow-2xl">
                    <Calendar className="w-10 h-10 text-cyan-300" />
                </div>

                {/* Main Heading */}
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight drop-shadow-lg">
                    {t('title')}
                </h2>

                {/* Subheading */}
                <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
                    {t('subtitle')}
                </p>

                {/* CTA Button */}
                <div className="flex flex-col items-center gap-6">
                    <button
                        onClick={handleCTA}
                        className="group bg-blue-600 hover:bg-blue-700 text-white font-bold px-12 py-6 rounded-2xl transition-all duration-300 shadow-[0_20px_50px_rgba(37,99,235,0.3)] hover:shadow-[0_25px_60px_rgba(37,99,235,0.4)] hover:scale-105 flex items-center gap-4 text-xl border border-blue-400/30"
                    >
                        <Phone className="w-6 h-6 text-cyan-300" />
                        {t('button')}
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </button>

                    {/* Trust Line */}
                    <p className="text-blue-200/80 text-sm font-medium tracking-tight">
                        {t('smallPrint')}
                    </p>
                </div>
            </div>
        </section>
    );
}

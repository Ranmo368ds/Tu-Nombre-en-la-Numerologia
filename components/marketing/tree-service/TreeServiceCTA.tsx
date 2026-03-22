'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight, Phone } from 'lucide-react';

export default function TreeServiceCTA() {
    const t = useTranslations('TreeServicePage.finalCTA');

    const handleCTA = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="py-20 bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}></div>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                {/* Main Heading */}
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                    {t('title')}
                </h2>

                {/* Subheading */}
                <p className="text-xl md:text-2xl text-emerald-100 mb-12 max-w-3xl mx-auto leading-relaxed">
                    {t('subtitle')}
                </p>

                {/* CTA Button */}
                <button
                    onClick={handleCTA}
                    className="group bg-[#E11D2E] hover:bg-[#C01828] text-white font-bold px-10 py-5 rounded-lg transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 flex items-center gap-3 mx-auto text-lg"
                >
                    <Phone className="w-6 h-6" />
                    {t('cta')}
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Trust Line */}
                <p className="mt-8 text-emerald-200 text-sm">
                    {t('trustLine')}
                </p>
            </div>
        </section>
    );
}

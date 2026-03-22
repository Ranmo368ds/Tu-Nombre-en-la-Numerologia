'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight, Waves, Droplets, Wind } from 'lucide-react';

export default function PoolHero() {
    const t = useTranslations('PoolPage.hero');

    const handleCTA = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative pt-40 pb-24 md:pt-56 md:pb-40 overflow-hidden bg-[#184e77]">
            {/* Background Texture/Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 30c0-8.284 6.716-15 15-15s15 6.716 15 15-6.716 15-15 15S0 38.284 0 30z' fill='%2334a0a4' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                }}></div>
            </div>

            {/* Glowing Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#34a0a4]/15 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-[#34a0a4]/10 border border-[#34a0a4]/30 backdrop-blur-md rounded-full px-5 py-2 mb-8 text-[#d9ed92] text-sm font-bold tracking-wide uppercase shadow-[0_0_20px_rgba(52,160,164,0.2)]">
                    <Waves className="w-4 h-4 animate-bounce" />
                    {t('badge')}
                </div>

                {/* Title */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-[#d9ed92] mb-8 leading-[1.05] tracking-tight">
                    {t('title')}
                </h1>

                {/* Subtitle */}
                <p className="text-xl md:text-2xl text-[#b5e48c] max-w-4xl mx-auto mb-12 font-light leading-relaxed">
                    {t('subtitle')}
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
                    <button
                        onClick={handleCTA}
                        className="group relative bg-[#168aad] hover:bg-[#1a759f] text-white font-black px-12 py-6 rounded-2xl transition-all duration-300 shadow-[0_20px_40px_rgba(22,138,173,0.3)] hover:shadow-[0_25px_50px_rgba(22,138,173,0.4)] hover:-translate-y-1 flex items-center gap-3 text-xl w-full sm:w-auto overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        {t('cta_primary')}
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className="group bg-[#d9ed92]/5 hover:bg-[#d9ed92]/10 text-white font-bold px-10 py-6 rounded-2xl transition-all duration-300 backdrop-blur-md border border-[#d9ed92]/20 hover:border-[#d9ed92]/40 flex items-center gap-3 text-xl w-full sm:w-auto justify-center">
                        <Droplets className="w-6 h-6 text-[#34a0a4]" />
                        {t('cta_secondary')}
                    </button>
                </div>

                {/* Trust Elements */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    {[1, 2, 3].map((num) => (
                        <div key={num} className="flex items-center justify-center gap-3 text-[#b5e48c] font-medium bg-white/5 border border-white/10 rounded-2xl py-4 px-6 md:bg-transparent md:border-0">
                            <Wind className="w-5 h-5 text-[#34a0a4]" />
                            <span className="text-sm md:text-base uppercase tracking-widest">{t(`trust_${num}`)}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Gradient Overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
        </section>
    );
}

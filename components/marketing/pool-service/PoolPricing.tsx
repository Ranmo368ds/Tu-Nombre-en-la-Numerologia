'use client';

import { useTranslations } from 'next-intl';
import { Check, ArrowRight, Zap, Target, Star, Waves } from 'lucide-react';

export default function PoolPricing() {
    const t = useTranslations('PoolPage.pricing');

    const packages = [
        {
            id: 'starter',
            popular: false,
            color: '#1a759f',
            accent: '#d9ed92',
            icon: Target
        },
        {
            id: 'pro',
            popular: true,
            color: '#168aad',
            accent: '#ffffff',
            icon: Star
        },
        {
            id: 'allin',
            popular: false,
            color: '#184e77',
            accent: '#b5e48c',
            icon: Waves
        },
    ];

    const handleCTA = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <h2 className="text-5xl md:text-6xl font-black text-[#184e77] mb-8 tracking-tight">
                        {t('title')}
                    </h2>
                    <p className="text-xl md:text-2xl text-[#34a0a4] max-w-3xl mx-auto font-light leading-relaxed">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Packages Grid */}
                <div className="grid md:grid-cols-3 gap-10">
                    {packages.map(({ id, popular, color, accent, icon: Icon }) => (
                        <div
                            key={id}
                            className={`relative bg-white rounded-[3rem] shadow-2xl transition-all duration-700 overflow-hidden group border-2 ${popular ? 'border-[#34a0a4] scale-105 z-10' : 'border-[#d9ed92] hover:border-[#168aad]/30'
                                }`}
                        >
                            {/* Popular Badge */}
                            {popular && (
                                <div className="absolute top-0 right-0 bg-[#34a0a4] text-white px-10 py-3 rounded-bl-[2rem] font-black text-xs tracking-[0.2em] uppercase z-20 shadow-lg">
                                    Recommended
                                </div>
                            )}

                            {/* Package Header */}
                            <div className="p-10 md:p-12 relative overflow-hidden" style={{ backgroundColor: color }}>
                                <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-[2000ms]"></div>

                                <div className="relative z-10">
                                    <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/20">
                                        <Icon className="w-8 h-8" style={{ color: accent }} />
                                    </div>
                                    <h3 className="text-3xl font-black mb-3" style={{ color: accent }}>
                                        {t(`${id}.name`)}
                                    </h3>
                                    <p className="text-xs font-black uppercase tracking-[0.2em] opacity-60 mb-8" style={{ color: accent }}>
                                        {t(`${id}.subtitle`)}
                                    </p>
                                    <div className="h-1 bg-white/20 rounded-full w-full">
                                        <div className="h-full bg-white/40 rounded-full w-1/3 group-hover:w-full transition-all duration-1000 ease-out"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Package Content */}
                            <div className="p-10 md:p-12 bg-white">
                                {/* Features */}
                                <ul className="space-y-6 mb-12">
                                    {[1, 2, 3, 4, 5].map((num) => {
                                        const key = `${id}.features.item${num}`;
                                        try {
                                            const feature = t(key);
                                            if (!feature || feature.includes(`features.item${num}`)) return null;
                                            return (
                                                <li key={num} className="flex items-start gap-4 group/item">
                                                    <div className={`flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center mt-1 transition-all duration-300 ${popular ? 'bg-[#34a0a4]/10 group-hover/item:bg-[#34a0a4]' : 'bg-[#d9ed92] group-hover/item:bg-[#184e77]'}`}>
                                                        <Check className={`w-3.5 h-3.5 transition-colors duration-300 ${popular ? 'text-[#34a0a4] group-hover/item:text-white' : 'text-[#184e77] group-hover/item:text-white'}`} />
                                                    </div>
                                                    <span className="text-[#184e77] text-[15px] leading-relaxed font-bold opacity-80 group-hover/item:opacity-100 transition-all duration-300">
                                                        {feature}
                                                    </span>
                                                </li>
                                            );
                                        } catch (e) {
                                            return null;
                                        }
                                    })}
                                </ul>

                                {/* Ideal For */}
                                <div className="bg-[#d9ed92]/20 rounded-2xl p-6 mb-12 border border-transparent group-hover:border-[#d9ed92] transition-all duration-500">
                                    <p className="text-[10px] font-black text-[#184e77]/40 mb-2 uppercase tracking-[0.2em]">
                                        Best for:
                                    </p>
                                    <p className="text-[#184e77] font-black text-lg leading-tight">
                                        {t(`${id}.idealFor`)}
                                    </p>
                                </div>

                                {/* CTA Button */}
                                <button
                                    onClick={handleCTA}
                                    className={`w-full font-black py-6 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 text-lg border-b-4 active:border-b-0 active:translate-y-1 ${popular
                                        ? 'bg-[#184e77] hover:bg-[#1a759f] text-white border-[#1e6091]'
                                        : 'bg-[#081c15] hover:bg-[#081c15]/90 text-white border-[#000000]'
                                        }`}
                                >
                                    Select {t(`${id}.name`)}
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Integration Note */}
                <div className="mt-20 flex items-center justify-center gap-6 text-[#184e77]/50">
                    <Zap className="w-8 h-8" />
                    <p className="text-sm font-bold uppercase tracking-[0.3em]">All plans include our specialized Crystal Lead system</p>
                    <Zap className="w-8 h-8" />
                </div>
            </div>
        </section>
    );
}

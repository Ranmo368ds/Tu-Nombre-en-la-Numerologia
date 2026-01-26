'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight, Phone, Leaf } from 'lucide-react';

export default function LandscapingCTA() {
    const t = useTranslations('LandscapingPage.finalCTA');

    const handleCTA = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="py-24 bg-[#081c15] relative overflow-hidden">
            {/* Structural Background Lines */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(90deg, #52b788 1px, transparent 1px), linear-gradient(#52b788 1px, transparent 1px)`,
                    backgroundSize: '100px 100px'
                }}></div>
            </div>

            {/* Glowing Accent */}
            <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#52b788]/10 rounded-full blur-[150px] animate-pulse"></div>
            <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-[#40916c]/20 rounded-full blur-[150px]"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="bg-white/5 backdrop-blur-md rounded-[4rem] border border-white/10 p-12 md:p-24 text-center shadow-3xl">
                    {/* Badge */}
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-[#52b788] rounded-3xl mb-12 shadow-[0_0_50px_rgba(82,183,136,0.3)] rotate-12">
                        <Leaf className="w-12 h-12 text-[#081c15]" />
                    </div>

                    {/* Main Heading */}
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-[#d8f3dc] mb-10 leading-[1.05] tracking-tight">
                        {t('title')}
                    </h2>

                    {/* Subheading */}
                    <p className="text-xl md:text-3xl text-[#b7e4c7] mb-16 max-w-4xl mx-auto font-light leading-relaxed">
                        {t('subtitle')}
                    </p>

                    {/* Action Center */}
                    <div className="flex flex-col items-center gap-10">
                        <button
                            onClick={handleCTA}
                            className="group relative bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-black px-16 py-8 rounded-3xl transition-all duration-300 shadow-[0_30px_60px_rgba(45,106,79,0.3)] hover:shadow-[0_40px_80px_rgba(45,106,79,0.4)] hover:-translate-y-2 flex items-center gap-6 text-2xl md:text-3xl border-b-8 border-[#132c21] active:border-b-0 active:translate-y-2 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                            <Phone className="w-8 h-8 md:w-10 md:h-10 text-[#d8f3dc]" />
                            {t('button')}
                            <ArrowRight className="w-8 h-8 md:w-10 md:h-10 group-hover:translate-x-3 transition-transform duration-500" />
                        </button>

                        {/* Trust Assurance */}
                        <div className="flex items-center gap-4 text-[#b7e4c7]/40 font-black uppercase tracking-[0.4em] text-xs">
                            <span className="w-4 h-px bg-[#40916c]"></span>
                            {t('smallPrint')}
                            <span className="w-4 h-px bg-[#40916c]"></span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

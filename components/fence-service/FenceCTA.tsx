'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight, Phone, Construction } from 'lucide-react';

export default function FenceCTA() {
    const t = useTranslations('FencePage.finalCTA');

    const handleCTA = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="py-24 bg-[#212529] relative overflow-hidden">
            {/* Structural Background Lines */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(90deg, #ffffff 1px, transparent 1px), linear-gradient(#ffffff 1px, transparent 1px)`,
                    backgroundSize: '100px 100px'
                }}></div>
            </div>

            {/* Glowing Accent */}
            <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#28a745]/10 rounded-full blur-[150px] animate-pulse"></div>
            <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-[#495057]/20 rounded-full blur-[150px]"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="bg-white/5 backdrop-blur-md rounded-[4rem] border border-white/10 p-12 md:p-24 text-center shadow-3xl">
                    {/* Badge */}
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-[#28a745] rounded-3xl mb-12 shadow-[0_0_50px_rgba(40,167,69,0.3)] rotate-12">
                        <Construction className="w-12 h-12 text-white" />
                    </div>

                    {/* Main Heading */}
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-10 leading-[1.05] tracking-tight">
                        {t('title')}
                    </h2>

                    {/* Subheading */}
                    <p className="text-xl md:text-3xl text-[#dee2e6] mb-16 max-w-4xl mx-auto font-light leading-relaxed">
                        {t('subtitle')}
                    </p>

                    {/* Action Center */}
                    <div className="flex flex-col items-center gap-10">
                        <button
                            onClick={handleCTA}
                            className="group relative bg-[#28a745] hover:bg-[#218838] text-white font-black px-16 py-8 rounded-3xl transition-all duration-300 shadow-[0_30px_60px_rgba(40,167,69,0.3)] hover:shadow-[0_40px_80px_rgba(40,167,69,0.4)] hover:-translate-y-2 flex items-center gap-6 text-2xl md:text-3xl border-b-8 border-[#1e7e34] active:border-b-0 active:translate-y-2 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                            <Phone className="w-8 h-8 md:w-10 md:h-10 text-white" />
                            {t('button')}
                            <ArrowRight className="w-8 h-8 md:w-10 md:h-10 group-hover:translate-x-3 transition-transform duration-500" />
                        </button>

                        {/* Trust Assurance */}
                        <div className="flex items-center gap-4 text-[#dee2e6]/40 font-black uppercase tracking-[0.4em] text-xs">
                            <span className="w-4 h-px bg-[#495057]"></span>
                            {t('smallPrint')}
                            <span className="w-4 h-px bg-[#495057]"></span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight, Waves } from 'lucide-react';

export default function PoolCTA() {
    const t = useTranslations('PoolPage.finalCTA');

    const handleCTA = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="py-24 px-6 relative overflow-hidden bg-[#184e77]">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-[#34a0a4] rounded-full blur-[120px] opacity-20 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 bg-[#d9ed92] rounded-full blur-[120px] opacity-10"></div>

            <div className="max-w-5xl mx-auto relative z-10 text-center">
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md rounded-full px-6 py-2 mb-10 text-[#d9ed92] text-sm font-bold tracking-[0.2em] uppercase">
                    <Waves className="w-4 h-4" />
                    Join the Elite
                </div>

                <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight leading-[1.1]">
                    {t('title')}
                </h2>

                <p className="text-xl md:text-2xl text-[#b5e48c] mb-12 max-w-3xl mx-auto font-light leading-relaxed">
                    {t('subtitle')}
                </p>

                <div className="flex flex-col items-center gap-6">
                    <button
                        onClick={handleCTA}
                        className="group bg-[#d9ed92] hover:bg-[#b5e48c] text-[#184e77] font-black px-14 py-8 rounded-[2rem] transition-all duration-300 shadow-[0_20px_50px_rgba(217,237,146,0.3)] hover:shadow-[0_30px_60px_rgba(217,237,146,0.4)] hover:-translate-y-2 flex items-center gap-4 text-2xl"
                    >
                        {t('button')}
                        <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
                    </button>

                    <p className="text-white/40 text-sm font-bold uppercase tracking-[0.2em]">
                        {t('smallPrint')}
                    </p>
                </div>
            </div>
        </section>
    );
}

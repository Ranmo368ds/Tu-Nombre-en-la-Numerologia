'use client';

import { useTranslations } from 'next-intl';
import { Mail, DoorOpen, Search, Image, Zap, Waves, ShieldCheck } from 'lucide-react';

export default function PoolResults() {
    const t = useTranslations('PoolPage.results');

    const results = [
        { icon: DoorOpen, key: 'doorHangers', color: '#184e77', bg: '#d9ed92' },
        { icon: Search, key: 'googleAds', color: '#34a0a4', bg: '#34a0a410' },
        { icon: Mail, key: 'eddm', color: '#1e6091', bg: '#d9ed92' },
        { icon: Image, key: 'pinterest', color: '#168aad', bg: '#34a0a410' },
    ];

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Decorative Structural Elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-[#d9ed92]"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-[#d9ed92]"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <h2 className="text-5xl md:text-6xl font-black text-[#184e77] mb-8 leading-tight tracking-tight">
                        {t('title')}
                    </h2>
                    <p className="text-xl text-[#34a0a4] max-w-3xl mx-auto font-light leading-relaxed">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Results Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
                    {results.map(({ icon: Icon, key, color, bg }) => (
                        <div
                            key={key}
                            className="group bg-white rounded-[2.5rem] p-10 shadow-sm hover:shadow-2xl transition-all duration-500 border border-[#d9ed92] hover:border-[#34a0a4]/30 relative"
                        >
                            <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#184e77] rounded-full flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500 shadow-xl">
                                <Zap className="w-6 h-6 text-[#d9ed92]" />
                            </div>

                            <div
                                className="w-20 h-20 rounded-3xl flex items-center justify-center mb-10 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 shadow-inner"
                                style={{ backgroundColor: bg.includes('/') ? '#34a0a420' : bg }}
                            >
                                <Icon className="w-10 h-10" style={{ color }} />
                            </div>
                            <h3 className="text-2xl font-black text-[#1e6091] mb-6 leading-tight">
                                {t(`${key}.title`)}
                            </h3>
                            <p className="text-[#184e77] leading-relaxed font-bold text-[15px] opacity-70 group-hover:opacity-100 transition-opacity">
                                {t(`${key}.description`)}
                            </p>
                        </div>
                    ))}
                </div>

                {/* High Value Note */}
                <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#184e77] to-[#1e6091] rounded-[4rem] group-hover:rotate-1 transition-transform duration-700"></div>
                    <div className="relative bg-[#184e77] rounded-[4rem] p-12 md:p-20 text-white shadow-3xl flex flex-col md:flex-row items-center gap-16 overflow-hidden">
                        {/* Huge background icon */}
                        <Waves className="absolute right-0 bottom-0 text-white/[0.03] w-[40rem] h-[40rem] transform translate-x-32 translate-y-32" />

                        <div className="flex-shrink-0 relative">
                            <div className="w-32 h-32 bg-[#34a0a4] rounded-[2.5rem] flex items-center justify-center shadow-[0_0_60px_rgba(52,160,164,0.4)] rotate-3">
                                <ShieldCheck className="w-16 h-16 text-white" />
                            </div>
                        </div>

                        <div className="flex-1 text-center md:text-left relative z-10">
                            <h3 className="text-4xl md:text-5xl font-black mb-8 leading-tight tracking-tight">
                                Built for <span className="text-[#d9ed92]">Crystal Clear Growth</span>
                            </h3>
                            <p className="text-[#b5e48c] text-xl leading-relaxed font-light mb-10">
                                Pool service is more than a one-time cleaning; it’s an <span className="text-white font-black italic">Ongoing Commitment</span> to hygiene and luxury. Our system captures clients at the opening phase and keeps them through the long-term maintenance cycle. We protect your routes while you protect their oasis.
                            </p>
                            <div className="flex flex-wrap justify-center md:justify-start gap-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#34a0a4]"></div>
                                    <span className="text-xs font-black uppercase tracking-[0.2em] opacity-60">High-Ticket Repairs</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#34a0a4]"></div>
                                    <span className="text-xs font-black uppercase tracking-[0.2em] opacity-60">Sustainable ROI</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#34a0a4]"></div>
                                    <span className="text-xs font-black uppercase tracking-[0.2em] opacity-60">Route Dominance</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

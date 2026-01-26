'use client';

import { useTranslations } from 'next-intl';
import { Mail, DoorOpen, Search, Image, MapPin, Zap, Construction, ShieldCheck } from 'lucide-react';

export default function ExpectedFenceResults() {
    const t = useTranslations('FencePage.results');

    const results = [
        { icon: DoorOpen, key: 'doorHangers', color: '#495057', bg: '#dee2e6' },
        { icon: Search, key: 'googleAds', color: '#28a745', bg: '#28a745/10' },
        { icon: Mail, key: 'eddm', color: '#212529', bg: '#dee2e6' },
        { icon: Image, key: 'pinterest', color: '#28a745', bg: '#28a745/10' },
    ];

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Decorative Structural Elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-[#dee2e6]"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-[#dee2e6]"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <h2 className="text-5xl md:text-6xl font-black text-[#212529] mb-8 leading-tight tracking-tight">
                        {t('title')}
                    </h2>
                    <p className="text-xl text-[#495057] max-w-3xl mx-auto font-light leading-relaxed">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Results Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
                    {results.map(({ icon: Icon, key, color, bg }) => (
                        <div
                            key={key}
                            className="group bg-white rounded-[2.5rem] p-10 shadow-sm hover:shadow-2xl transition-all duration-500 border border-[#dee2e6] hover:border-[#28a745]/30 relative"
                        >
                            <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#212529] rounded-full flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500 shadow-xl">
                                <Zap className="w-6 h-6 text-[#28a745]" />
                            </div>

                            <div
                                className="w-20 h-20 rounded-3xl flex items-center justify-center mb-10 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 shadow-inner"
                                style={{ backgroundColor: bg.includes('/') ? '#28a74520' : bg }}
                            >
                                <Icon className="w-10 h-10" style={{ color }} />
                            </div>
                            <h3 className="text-2xl font-black text-[#212529] mb-6 leading-tight">
                                {t(`${key}.title`)}
                            </h3>
                            <p className="text-[#495057] leading-relaxed font-bold text-[15px] opacity-70 group-hover:opacity-100 transition-opacity">
                                {t(`${key}.description`)}
                            </p>
                        </div>
                    ))}
                </div>

                {/* High Value Note */}
                <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#212529] to-[#495057] rounded-[4rem] group-hover:rotate-1 transition-transform duration-700"></div>
                    <div className="relative bg-[#212529] rounded-[4rem] p-12 md:p-20 text-white shadow-3xl flex flex-col md:flex-row items-center gap-16 overflow-hidden">
                        {/* Huge background icon */}
                        <Construction className="absolute right-0 bottom-0 text-white/[0.03] w-[40rem] h-[40rem] transform translate-x-32 translate-y-32" />

                        <div className="flex-shrink-0 relative">
                            <div className="w-32 h-32 bg-[#28a745] rounded-[2.5rem] flex items-center justify-center shadow-[0_0_60px_rgba(40,167,69,0.4)] rotate-3">
                                <ShieldCheck className="w-16 h-16 text-white" />
                            </div>
                        </div>

                        <div className="flex-1 text-center md:text-left relative z-10">
                            <h3 className="text-4xl md:text-5xl font-black mb-8 leading-tight tracking-tight">
                                Built for <span className="text-[#28a745]">Maximum Retention</span>
                            </h3>
                            <p className="text-[#dee2e6] text-xl leading-relaxed font-light mb-10">
                                Installing a fence is often the <span className="text-white font-black italic">First Project</span> a new homeowner undertakes. Our system captures this specific customer lifecycle, positioning you as their trusted contractor for years to come. It’s not just a lead; it’s a high-value relationship foundation.
                            </p>
                            <div className="flex flex-wrap justify-center md:justify-start gap-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#28a745]"></div>
                                    <span className="text-xs font-black uppercase tracking-[0.2em] opacity-60">High-Ticket Leads</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#28a745]"></div>
                                    <span className="text-xs font-black uppercase tracking-[0.2em] opacity-60">Rapid ROI</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#28a745]"></div>
                                    <span className="text-xs font-black uppercase tracking-[0.2em] opacity-60">Proven Scale</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

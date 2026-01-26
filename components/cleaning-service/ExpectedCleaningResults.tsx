'use client';

import { useTranslations } from 'next-intl';
import { Sparkles, DoorOpen, Search, Mail, Image, Zap } from 'lucide-react';

export default function ExpectedCleaningResults() {
    const t = useTranslations('CleaningPage.results');

    const results = [
        { icon: DoorOpen, key: 'doorHangers', color: 'cyan' },
        { icon: Search, key: 'googleAds', color: 'blue' },
        { icon: Mail, key: 'eddm', color: 'blue' },
        { icon: Image, key: 'pinterest', color: 'green' },
    ];

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-cyan-50 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-50"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                        {t('title')}
                    </h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Results Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {results.map(({ icon: Icon, key, color }) => (
                        <div
                            key={key}
                            className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col items-center text-center"
                        >
                            <div className={`w-16 h-16 bg-${color}-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                                <Icon className={`w-8 h-8 text-${color}-600`} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-4">
                                {t(`${key}.title`)}
                            </h3>
                            <p className="text-slate-500 leading-relaxed text-sm">
                                {t(`${key}.description`)}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Integration Benefit */}
                <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 text-white shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-slate-900 opacity-90"></div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500 rounded-full blur-[100px] opacity-20 -mr-32 -mt-32 group-hover:scale-125 transition-transform duration-1000"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-shrink-0">
                            <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center border border-white/20 shadow-inner rotate-3">
                                <Zap className="w-12 h-12 text-cyan-400 filter drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                            </div>
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-3xl font-bold mb-6">The Smart Density Multiplier</h3>
                            <p className="text-slate-300 text-lg leading-relaxed font-light">
                                Our system doesn't just "run ads." It creates a <span className="text-white font-bold italic">Smart Loop</span>. While Google Ads captures immediate high-intent leads, Door Hangers and Yard Signs build local density to reduce your crews' travel time. Pinterest meanwhile builds your long-term authority. The result? Higher profit per hour worked.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

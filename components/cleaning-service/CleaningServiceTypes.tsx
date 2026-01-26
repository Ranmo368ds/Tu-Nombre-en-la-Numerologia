'use client';

import { useTranslations } from 'next-intl';
import { Sparkles, Home, Building2, Timer, ChevronRight } from 'lucide-react';

export default function CleaningServiceTypes() {
    const t = useTranslations('CleaningPage.services');

    const services = [
        { icon: Home, key: 'item1', color: 'blue' },
        { icon: Building2, key: 'item2', color: 'cyan' },
        { icon: Sparkles, key: 'item3', color: 'green' },
        { icon: Timer, key: 'item4', color: 'blue' },
        { icon: Sparkles, key: 'item5', color: 'cyan' },
    ];

    return (
        <section className="py-24 bg-gradient-to-b from-[#F8FAFC] to-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">
                        {t('title')}
                    </h2>
                    <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
                </div>

                <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {services.map(({ icon: Icon, key, color }) => (
                        <div
                            key={key}
                            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col items-center text-center group cursor-default"
                        >
                            <div className={`w-14 h-14 rounded-2xl bg-${color}-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                <Icon className={`w-7 h-7 text-${color}-600`} />
                            </div>
                            <h3 className="text-slate-900 font-bold mb-4 leading-tight">
                                {t(key)}
                            </h3>
                            <div className="mt-auto pt-4 flex items-center gap-1 text-slate-400 group-hover:text-blue-600 transition-colors duration-300">
                                <span className="text-xs font-bold uppercase tracking-wider">Plan Now</span>
                                <ChevronRight className="w-4 h-4" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

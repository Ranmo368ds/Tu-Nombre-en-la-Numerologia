'use client';

import { useTranslations } from 'next-intl';
import { LayoutGrid, Ruler, Construction, ShieldCheck, Cog, CheckCircle2, Trees, Flower, Shovel } from 'lucide-react';

export default function LandscapingServiceTypes() {
    const t = useTranslations('LandscapingPage.services');

    const serviceTypes = [
        { icon: Trees, key: 'item1', color: '#2d6a4f' },       // Design & Build
        { icon: Construction, key: 'item2', color: '#40916c' }, // Hardscaping
        { icon: Flower, key: 'item3', color: '#52b788' },       // Lawn Care
        { icon: Shovel, key: 'item4', color: '#74c69d' },       // Irrigation
        { icon: Flower, key: 'item5', color: '#95d5b2' },       // Lighting
        { icon: Sprout, key: 'item6', color: '#2d6a4f' },      // Cleanup
    ];

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-5xl font-black text-[#081c15] mb-6 tracking-tight">
                        {t('title')}
                    </h2>
                    <div className="w-32 h-2 bg-[#52b788] mx-auto rounded-full"></div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {serviceTypes.map(({ icon: Icon, key, color }) => (
                        <div
                            key={key}
                            className="bg-[#d8f3dc]/20 rounded-3xl p-10 border border-transparent hover:border-[#52b788]/30 hover:bg-white hover:shadow-2xl transition-all duration-500 group cursor-default"
                        >
                            <div className="w-16 h-16 rounded-[1.5rem] bg-white flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                <Icon className="w-8 h-8" style={{ color }} />
                            </div>
                            <h3 className="text-2xl font-black text-[#081c15] mb-4 leading-tight">
                                {t(key)}
                            </h3>
                            <div className="flex items-center gap-2 text-[#40916c] font-black text-xs uppercase tracking-[0.2em] transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                <span>Learn More</span>
                                <CheckCircle2 className="w-4 h-4" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Sprout(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M7 20h10" />
            <path d="M10 20c5.5-2.5 8-6.4 8-12" />
            <path d="M10 3s4 2 4 6" />
            <path d="M12 20h.01" />
            <path d="M17 12c-3-2-3-9-3-9" />
        </svg>
    );
}

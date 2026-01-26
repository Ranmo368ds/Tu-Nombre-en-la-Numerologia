'use call client';

import { useTranslations } from 'next-intl';
import { LayoutGrid, Ruler, Construction, ShieldCheck, Cog, CheckCircle2 } from 'lucide-react';

export default function FenceServiceTypes() {
    const t = useTranslations('FencePage.services');

    const serviceTypes = [
        { icon: Construction, key: 'item1', color: '#28a745' }, // Wood
        { icon: Cog, key: 'item2', color: '#495057' },         // Vinyl
        { icon: ShieldCheck, key: 'item3', color: '#212529' },  // Aluminum
        { icon: LayoutGrid, key: 'item4', color: '#495057' },    // Chain Link
        { icon: Ruler, key: 'item5', color: '#28a745' },        // Repair
        { icon: ShieldCheck, key: 'item6', color: '#212529' },  // Gates
    ];

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-5xl font-black text-[#212529] mb-6 tracking-tight">
                        {t('title')}
                    </h2>
                    <div className="w-32 h-2 bg-[#28a745] mx-auto rounded-full"></div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {serviceTypes.map(({ icon: Icon, key, color }) => (
                        <div
                            key={key}
                            className="bg-[#dee2e6]/20 rounded-3xl p-10 border border-transparent hover:border-[#28a745]/30 hover:bg-white hover:shadow-2xl transition-all duration-500 group cursor-default"
                        >
                            <div className="w-16 h-16 rounded-[1.5rem] bg-white flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                <Icon className="w-8 h-8" style={{ color }} />
                            </div>
                            <h3 className="text-2xl font-black text-[#212529] mb-4 leading-tight">
                                {t(key)}
                            </h3>
                            <div className="flex items-center gap-2 text-[#28a745] font-black text-xs uppercase tracking-[0.2em] transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
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

'use client';

import { useTranslations } from 'next-intl';
import { Check, Waves, Wrench, Droplets, Thermometer, Settings, Sparkles } from 'lucide-react';

export default function PoolServiceTypes() {
    const t = useTranslations('PoolPage.services');

    const services = [
        { id: 'maintenance', icon: Droplets },
        { id: 'repair', icon: Wrench },
        { id: 'leakDetection', icon: Waves },
        { id: 'openingClosing', icon: Thermometer },
        { id: 'remodeling', icon: Sparkles },
        { id: 'automation', icon: Settings },
    ];

    return (
        <section className="py-24 bg-[#184e77]/5 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-5xl md:text-6xl font-black text-[#184e77] mb-8 tracking-tight">
                        {t('title')}
                    </h2>
                    <p className="text-xl text-[#34a0a4] max-w-2xl mx-auto font-light leading-relaxed">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map(({ id, icon: Icon }) => (
                        <div
                            key={id}
                            className="bg-white rounded-[2.5rem] p-10 shadow-sm hover:shadow-2xl transition-all duration-500 border border-[#d9ed92] hover:border-[#34a0a4]/30 group"
                        >
                            <div className="w-16 h-16 bg-[#34a0a4]/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                                <Icon className="w-8 h-8 text-[#34a0a4]" />
                            </div>
                            <h3 className="text-2xl font-black text-[#184e77] mb-4">
                                {t(`${id}.title`)}
                            </h3>
                            <p className="text-[#184e77]/70 font-medium mb-8">
                                {t(`${id}.description`)}
                            </p>
                            <div className="flex items-center gap-2 text-[#34a0a4] font-black text-xs uppercase tracking-widest">
                                <Check className="w-4 h-4" />
                                Marketing Ready
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="inline-block bg-[#184e77] text-[#d9ed92] px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl">
                        {t('callout')}
                    </p>
                </div>
            </div>
        </section>
    );
}

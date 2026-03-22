'use client';

import { useTranslations } from 'next-intl';
import { MapPin, Globe, Compass } from 'lucide-react';

export default function PoolServiceAreas() {
    const t = useTranslations('PoolPage.areas');

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 bg-[#d9ed92] text-[#184e77] px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-8">
                            <MapPin className="w-4 h-4" />
                            {t('badge')}
                        </div>
                        <h2 className="text-5xl md:text-6xl font-black text-[#184e77] mb-8 leading-tight tracking-tight">
                            {t('title')}
                        </h2>
                        <p className="text-xl text-[#34a0a4] leading-relaxed font-light mb-12">
                            {t('description')}
                        </p>

                        <div className="p-8 bg-[#184e77] rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                                <Compass className="w-32 h-32" />
                            </div>
                            <h3 className="text-2xl font-black mb-4 flex items-center gap-3 relative z-10">
                                <Globe className="w-6 h-6 text-[#d9ed92]" />
                                Service Map
                            </h3>
                            <p className="text-[#b5e48c] font-medium relative z-10">
                                {t('additional')}
                            </p>
                        </div>
                    </div>

                    <div className="relative">
                        {/* Decorative map-like visual */}
                        <div className="aspect-square bg-[#184e77]/5 rounded-[4rem] border-4 border-dashed border-[#d9ed92] relative overflow-hidden p-12">
                            <div className="absolute inset-0 opacity-20" style={{
                                backgroundImage: `radial-gradient(#34a0a4 2px, transparent 2px)`,
                                backgroundSize: '30px 30px'
                            }}></div>

                            <div className="grid grid-cols-2 gap-6 relative z-10 h-full">
                                {[
                                    'Algonquin', 'Huntley', 'Elgin', 'Crystal Lake',
                                    'Carpentersville', 'Barrington', 'Woodstock', 'McHenry'
                                ].map((city) => (
                                    <div key={city} className="bg-white rounded-2xl p-4 shadow-sm border border-[#d9ed92] flex items-center gap-3 hover:translate-y-[-4px] transition-all duration-300">
                                        <div className="w-2 h-2 rounded-full bg-[#34a0a4]"></div>
                                        <span className="font-black text-[#184e77] text-sm uppercase mb-0">{city}</span>
                                    </div>
                                ))}
                                <div className="col-span-2 bg-[#34a0a4] text-white rounded-2xl p-6 shadow-xl flex items-center justify-center gap-4 animate-pulse">
                                    <MapPin className="w-6 h-6" />
                                    <span className="font-extrabold uppercase tracking-widest text-center">Growing your local presence</span>
                                </div>
                            </div>
                        </div>

                        {/* Accent elements */}
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#d9ed92] rounded-full blur-[80px] opacity-40"></div>
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#34a0a4] rounded-full blur-[80px] opacity-20"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}

'use client';

import { useTranslations } from 'next-intl';
import { Mail, DoorOpen, Search, Image, MapPin, ChevronRight, Check } from 'lucide-react';

export default function PoolMarketingSystem() {
    const t = useTranslations('PoolPage.marketingSystem');

    const pillars = [
        {
            id: 'googleAds',
            icon: Search,
            gradient: 'from-[#1a759f] to-[#184e77]',
            accent: '#34a0a4',
            bgColor: 'bg-white',
            iconBg: 'bg-[#d9ed92]',
            textColor: 'text-[#184e77]'
        },
        {
            id: 'eddm',
            icon: Mail,
            gradient: 'from-[#34a0a4] to-[#168aad]',
            accent: '#184e77',
            bgColor: 'bg-[#d9ed92]/20',
            iconBg: 'bg-white',
            textColor: 'text-[#184e77]'
        },
        {
            id: 'doorHangers',
            icon: DoorOpen,
            gradient: 'from-[#d9ed92] to-[#76c893]',
            accent: '#168aad',
            bgColor: 'bg-white',
            iconBg: 'bg-[#d9ed92]',
            textColor: 'text-[#184e77]'
        },
        {
            id: 'pinterest',
            icon: Image,
            gradient: 'from-[#184e77] to-[#1a759f]',
            accent: '#d9ed92',
            bgColor: 'bg-[#184e77]',
            iconBg: 'bg-white/10',
            textColor: 'text-[#d9ed92]'
        },
        {
            id: 'yardSigns',
            icon: MapPin,
            gradient: 'from-[#52b69a] to-[#d9ed92]',
            accent: '#184e77',
            bgColor: 'bg-white',
            iconBg: 'bg-[#b5e48c]',
            textColor: 'text-[#184e77]'
        },
    ];

    return (
        <section className="py-24 bg-[#184e77]/5">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <h2 className="text-5xl md:text-6xl font-black text-[#184e77] mb-8 tracking-tight">
                        {t('title')}
                    </h2>
                    <p className="text-xl md:text-2xl text-[#34a0a4] max-w-3xl mx-auto font-light leading-relaxed">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Pillars Container */}
                <div className="grid gap-12">
                    {pillars.map(({ id, icon: Icon, gradient, accent, bgColor, iconBg, textColor }, index) => (
                        <div
                            key={id}
                            className={`flex flex-col lg:flex-row items-stretch rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-500 hover:scale-[1.01] ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                                }`}
                        >
                            {/* Graphic Side */}
                            <div className={`lg:w-2/5 relative flex items-center justify-center p-16 bg-gradient-to-br ${gradient}`}>
                                <div className="absolute inset-0 opacity-10 pointer-events-none">
                                    <div className="absolute inset-0" style={{
                                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h1v1H0V0zm10 10h1v1h-1v-1z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                                    }}></div>
                                </div>
                                <div className="relative z-10 w-48 h-48 bg-white/10 backdrop-blur-md rounded-[2.5rem] border border-white/20 flex items-center justify-center shadow-inner group">
                                    <Icon className="w-24 h-24 text-white group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute -bottom-4 -right-4 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg font-black text-[#184e77]">
                                        {index + 1}
                                    </div>
                                </div>
                            </div>

                            {/* Content Side */}
                            <div className={`lg:w-3/5 p-10 md:p-16 flex flex-col justify-center ${bgColor}`}>
                                <div className="flex items-center gap-6 mb-8">
                                    <div className="w-12 h-1 rounded-full" style={{ backgroundColor: accent }}></div>
                                    <h3 className={`text-3xl md:text-4xl font-black ${textColor} flex items-center gap-2`}>
                                        {id === 'pinterest' && (
                                            <img
                                                src="/images/pinterest-seeklogo.png"
                                                alt="Pinterest"
                                                className="h-10 md:h-12 w-auto object-contain -mb-1"
                                            />
                                        )}
                                        {t(`${id}.title`)}
                                    </h3>
                                </div>

                                <p className={`text-lg mb-10 leading-relaxed font-medium opacity-80 ${textColor}`}>
                                    {t(`${id}.description`)}
                                </p>

                                <div className="grid md:grid-cols-2 gap-10">
                                    {/* Works For */}
                                    <div>
                                        <h4 className={`font-black uppercase tracking-widest text-xs mb-5 flex items-center gap-2 ${textColor}`}>
                                            <Check className="w-4 h-4 text-[#34a0a4]" />
                                            {t(`${id}.worksFor.title`)}
                                        </h4>
                                        <ul className="space-y-3">
                                            {[1, 2, 3, 4].map((num) => {
                                                try {
                                                    const text = t(`${id}.worksFor.item${num}`);
                                                    if (text.includes(`worksFor.item${num}`)) return null;
                                                    return (
                                                        <li key={num} className={`flex items-start gap-3 text-sm font-medium opacity-70 ${textColor}`}>
                                                            <span className="text-[#34a0a4]">•</span>
                                                            {text}
                                                        </li>
                                                    );
                                                } catch (e) {
                                                    return null;
                                                }
                                            })}
                                        </ul>
                                    </div>

                                    {/* What We Do */}
                                    <div>
                                        <h4 className={`font-black uppercase tracking-widest text-xs mb-5 flex items-center gap-2 ${textColor}`}>
                                            <ChevronRight className="w-4 h-4 text-[#34a0a4]" />
                                            {t(`${id}.whatWeDo.title`)}
                                        </h4>
                                        <ul className="space-y-3">
                                            {[1, 2, 3, 4].map((num) => {
                                                try {
                                                    const text = t(`${id}.whatWeDo.item${num}`);
                                                    if (text.includes(`whatWeDo.item${num}`)) return null;
                                                    return (
                                                        <li key={num} className={`flex items-start gap-3 text-sm font-medium opacity-70 ${textColor}`}>
                                                            <span className="text-[#34a0a4]">→</span>
                                                            {text}
                                                        </li>
                                                    );
                                                } catch (e) {
                                                    return null;
                                                }
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

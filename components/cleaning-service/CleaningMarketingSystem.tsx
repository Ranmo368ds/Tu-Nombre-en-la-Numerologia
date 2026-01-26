'use client';

import { useTranslations } from 'next-intl';
import { Mail, DoorOpen, Search, Image, MapPin } from 'lucide-react';

export default function CleaningMarketingSystem() {
    const t = useTranslations('CleaningPage.marketingSystem');

    const pillars = [
        {
            id: 'eddm',
            icon: Mail,
            color: 'from-blue-500 to-blue-700',
            bgColor: 'bg-blue-50',
            iconBg: 'bg-blue-100',
            iconColor: 'text-blue-700',
        },
        {
            id: 'doorHangers',
            icon: DoorOpen,
            color: 'from-cyan-500 to-cyan-700',
            bgColor: 'bg-cyan-50',
            iconBg: 'bg-cyan-100',
            iconColor: 'text-cyan-700',
        },
        {
            id: 'googleAds',
            icon: Search,
            color: 'from-blue-600 to-blue-800',
            bgColor: 'bg-blue-50',
            iconBg: 'bg-blue-100',
            iconColor: 'text-blue-800',
        },
        {
            id: 'pinterest',
            icon: Image,
            color: 'from-green-500 to-green-700',
            bgColor: 'bg-green-50',
            iconBg: 'bg-green-100',
            iconColor: 'text-green-700',
        },
        {
            id: 'yardSigns',
            icon: MapPin,
            color: 'from-blue-500 to-cyan-500',
            bgColor: 'bg-slate-50',
            iconBg: 'bg-slate-100',
            iconColor: 'text-slate-700',
        },
    ];

    return (
        <section className="py-20 bg-[#F8FAFC]">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                        {t('title')}
                    </h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Pillars */}
                <div className="space-y-16">
                    {pillars.map(({ id, icon: Icon, color, bgColor, iconBg, iconColor }, index) => (
                        <div
                            key={id}
                            className={`flex flex-col lg:flex-row gap-8 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                                }`}
                        >
                            {/* Icon Side */}
                            <div className={`lg:w-1/3 flex justify-center`}>
                                <div className={`w-48 h-48 rounded-[2.5rem] bg-gradient-to-br ${color} p-1.5 shadow-2xl transform hover:rotate-3 transition-transform duration-500`}>
                                    <div className="w-full h-full bg-white rounded-[2.3rem] flex items-center justify-center">
                                        <Icon className={`w-24 h-24 ${iconColor}`} />
                                    </div>
                                </div>
                            </div>

                            {/* Content Side */}
                            <div className="lg:w-2/3">
                                <div className={`${bgColor} rounded-3xl p-8 md:p-12 shadow-sm border border-white/50 backdrop-blur-sm`}>
                                    {/* Pillar Number & Title */}
                                    <div className="flex items-center gap-6 mb-8">
                                        <div className={`${iconBg} ${iconColor} w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-2xl shadow-sm`}>
                                            {index + 1}
                                        </div>
                                        <h3 className="text-3xl md:text-4xl font-bold text-slate-900">
                                            {t(`${id}.title`)}
                                        </h3>
                                    </div>

                                    {/* Description */}
                                    <p className="text-slate-600 text-lg mb-8 leading-relaxed font-normal">
                                        {t(`${id}.description`)}
                                    </p>

                                    <div className="grid md:grid-cols-2 gap-8">
                                        {/* Works For */}
                                        <div className="bg-white/40 rounded-2xl p-6">
                                            <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${iconBg.replace('bg-', 'bg-')}`}></div>
                                                {t(`${id}.worksFor.title`)}
                                            </h4>
                                            <ul className="space-y-3">
                                                {[1, 2, 3, 4].map((num) => {
                                                    const key = `${id}.worksFor.item${num}`;
                                                    try {
                                                        const text = t(key);
                                                        if (!text || text === `CleaningPage.marketingSystem.${id}.worksFor.item${num}`) return null;
                                                        return (
                                                            <li key={num} className="flex items-start gap-2 text-slate-600 text-sm">
                                                                <span className={`${iconColor} font-bold`}>✓</span>
                                                                <span>{text}</span>
                                                            </li>
                                                        );
                                                    } catch (e) {
                                                        return null;
                                                    }
                                                })}
                                            </ul>
                                        </div>

                                        {/* What We Do */}
                                        <div className="bg-white/40 rounded-2xl p-6">
                                            <h4 className="font-bold text-slate-900 mb-4">
                                                {t(`${id}.whatWeDo.title`)}
                                            </h4>
                                            <ul className="space-y-3">
                                                {[1, 2, 3, 4].map((num) => {
                                                    const key = `${id}.whatWeDo.item${num}`;
                                                    try {
                                                        const text = t(key);
                                                        if (!text || text === `CleaningPage.marketingSystem.${id}.whatWeDo.item${num}`) return null;
                                                        return (
                                                            <li key={num} className="flex items-start gap-2 text-slate-600 text-sm">
                                                                <span className={iconColor}>→</span>
                                                                <span>{text}</span>
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
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

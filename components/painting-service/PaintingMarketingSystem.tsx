'use client';

import { useTranslations } from 'next-intl';
import { Mail, DoorOpen, Search, Image, MapPin } from 'lucide-react';

export default function PaintingMarketingSystem() {
    const t = useTranslations('PaintingPage.marketingSystem');

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
            color: 'from-indigo-500 to-indigo-700',
            bgColor: 'bg-indigo-50',
            iconBg: 'bg-indigo-100',
            iconColor: 'text-indigo-700',
        },
        {
            id: 'googleAds',
            icon: Search,
            color: 'from-red-500 to-red-700',
            bgColor: 'bg-red-50',
            iconBg: 'bg-red-100',
            iconColor: 'text-red-700',
        },
        {
            id: 'pinterest',
            icon: Image,
            color: 'from-pink-500 to-pink-700',
            bgColor: 'bg-pink-50',
            iconBg: 'bg-pink-100',
            iconColor: 'text-pink-700',
        },
        {
            id: 'yardSigns',
            icon: MapPin,
            color: 'from-blue-500 to-blue-700',
            bgColor: 'bg-blue-50',
            iconBg: 'bg-blue-100',
            iconColor: 'text-blue-700',
        },
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        {t('title')}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
                                <div className={`w-48 h-48 rounded-3xl bg-gradient-to-br ${color} p-1 shadow-2xl`}>
                                    <div className="w-full h-full bg-white rounded-3xl flex items-center justify-center">
                                        <Icon className="w-24 h-24 text-gray-700" />
                                    </div>
                                </div>
                            </div>

                            {/* Content Side */}
                            <div className="lg:w-2/3">
                                <div className={`${bgColor} rounded-2xl p-8 shadow-lg`}>
                                    {/* Pillar Number & Title */}
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className={`${iconBg} ${iconColor} w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl`}>
                                            {index + 1}
                                        </div>
                                        <h3 className="text-3xl font-bold text-gray-900">
                                            {t(`${id}.title`)}
                                        </h3>
                                    </div>

                                    {/* Description */}
                                    <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                                        {t(`${id}.description`)}
                                    </p>

                                    {/* Works For */}
                                    <div className="mb-6">
                                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                            <span className="text-blue-600">✓</span>
                                            {t(`${id}.worksFor.title`)}
                                        </h4>
                                        <ul className="space-y-2">
                                            {[1, 2, 3, 4].map((num) => {
                                                const key = `${id}.worksFor.item${num}`;
                                                try {
                                                    const text = t(key);
                                                    if (!text || text === `PaintingPage.marketingSystem.${id}.worksFor.item${num}`) return null;
                                                    return (
                                                        <li key={num} className="flex items-start gap-2 text-gray-700">
                                                            <span className="text-blue-600 mt-1">•</span>
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
                                    <div className={`bg-white rounded-xl p-6 border-l-4 border-${iconColor.replace('text-', '')}`}>
                                        <h4 className="font-bold text-gray-900 mb-3">
                                            {t(`${id}.whatWeDo.title`)}
                                        </h4>
                                        <ul className="space-y-2">
                                            {[1, 2, 3, 4].map((num) => {
                                                const key = `${id}.whatWeDo.item${num}`;
                                                try {
                                                    const text = t(key);
                                                    if (!text || text === `PaintingPage.marketingSystem.${id}.whatWeDo.item${num}`) return null;
                                                    return (
                                                        <li key={num} className="flex items-start gap-2 text-gray-700">
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
                    ))}
                </div>
            </div>
        </section>
    );
}

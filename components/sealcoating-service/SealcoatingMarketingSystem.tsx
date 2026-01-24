'use client';

import { useTranslations } from 'next-intl';
import { Mail, DoorOpen, Search, Image as ImageIcon, MapPin } from 'lucide-react';

export default function SealcoatingMarketingSystem() {
    const t = useTranslations('SealcoatingPage.marketing');

    const pillars = [
        {
            id: 'eddm',
            icon: Mail,
            color: 'from-orange-600 to-orange-700',
            bgColor: 'bg-orange-50',
            borderColor: 'border-orange-200'
        },
        {
            id: 'doorHangers',
            icon: DoorOpen,
            color: 'from-gray-700 to-gray-800',
            bgColor: 'bg-gray-50',
            borderColor: 'border-gray-200'
        },
        {
            id: 'googleAds',
            icon: Search,
            color: 'from-red-600 to-red-700',
            bgColor: 'bg-red-50',
            borderColor: 'border-red-200'
        },
        {
            id: 'pinterest',
            icon: ImageIcon,
            color: 'from-pink-600 to-pink-700',
            bgColor: 'bg-pink-50',
            borderColor: 'border-pink-200'
        },
        {
            id: 'yardSigns',
            icon: MapPin,
            color: 'from-green-600 to-green-700',
            bgColor: 'bg-green-50',
            borderColor: 'border-green-200'
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        {t('title')}
                    </h2>
                    <p className="text-xl text-gray-700 leading-relaxed">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Pillars */}
                <div className="max-w-6xl mx-auto space-y-12">
                    {pillars.map(({ id, icon: Icon, color, bgColor, borderColor }) => (
                        <div key={id} className={`${bgColor} rounded-2xl p-8 md:p-12 border-2 ${borderColor} shadow-lg hover:shadow-xl transition-shadow duration-300`}>
                            {/* Pillar Header */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
                                    <Icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                                    {t(`${id}.title`)}
                                </h3>
                            </div>

                            {/* Description */}
                            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                {t(`${id}.description`)}
                            </p>

                            {/* Use Cases */}
                            <div className="mb-6">
                                <h4 className="font-bold text-gray-900 mb-3">{t(`${id}.useCases.title`)}</h4>
                                <ul className="space-y-2">
                                    {[1, 2, 3, 4, 5].map((num) => {
                                        const key = `${id}.useCases.item${num}`;
                                        try {
                                            const useCase = t(key);
                                            if (!useCase || useCase === `SealcoatingPage.marketing.${id}.useCases.item${num}`) return null;
                                            return (
                                                <li key={num} className="flex items-start gap-3">
                                                    <span className="text-orange-600 font-bold mt-1">✓</span>
                                                    <span className="text-gray-700">{useCase}</span>
                                                </li>
                                            );
                                        } catch (e) {
                                            return null;
                                        }
                                    })}
                                </ul>
                            </div>

                            {/* What We Do (if applicable) */}
                            {(() => {
                                try {
                                    const title = t(`${id}.whatWeDo.title`);
                                    return title && title !== `SealcoatingPage.marketing.${id}.whatWeDo.title`;
                                } catch (e) {
                                    return false;
                                }
                            })() && (
                                    <div className="bg-white/60 rounded-xl p-6 border border-gray-200">
                                        <h4 className="font-bold text-gray-900 mb-3">{t(`${id}.whatWeDo.title`)}</h4>
                                        <ul className="space-y-2">
                                            {[1, 2, 3, 4, 5].map((num) => {
                                                const key = `${id}.whatWeDo.item${num}`;
                                                try {
                                                    const item = t(key);
                                                    if (!item || item === `SealcoatingPage.marketing.${id}.whatWeDo.item${num}`) return null;
                                                    return (
                                                        <li key={num} className="flex items-start gap-3">
                                                            <span className="text-green-600 font-bold mt-1">→</span>
                                                            <span className="text-gray-700">{item}</span>
                                                        </li>
                                                    );
                                                } catch (e) {
                                                    return null;
                                                }
                                            })}
                                        </ul>
                                    </div>
                                )}

                            {/* Pro Tip (if applicable) */}
                            {(() => {
                                try {
                                    const tip = t(`${id}.proTip`);
                                    return tip && tip !== `SealcoatingPage.marketing.${id}.proTip`;
                                } catch (e) {
                                    return false;
                                }
                            })() && (
                                    <div className="mt-6 bg-gradient-to-r from-orange-100 to-orange-50 rounded-lg p-4 border-l-4 border-orange-600">
                                        <p className="text-sm font-semibold text-orange-900 mb-1">📌 {t('proTipLabel')}</p>
                                        <p className="text-gray-800">{t(`${id}.proTip`)}</p>
                                    </div>
                                )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

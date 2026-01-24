'use client';

import { useTranslations } from 'next-intl';
import { Check, Rocket, TrendingUp, Crown } from 'lucide-react';

export default function SealcoatingPricingPackages() {
    const t = useTranslations('SealcoatingPage.pricing');

    const packages = [
        {
            id: 'starter',
            icon: Rocket,
            color: 'from-orange-500 to-orange-600',
            bgColor: 'bg-orange-50',
            borderColor: 'border-orange-200',
            popular: false
        },
        {
            id: 'pro',
            icon: TrendingUp,
            color: 'from-gray-700 to-gray-800',
            bgColor: 'bg-gray-50',
            borderColor: 'border-gray-200',
            popular: true
        },
        {
            id: 'allin',
            icon: Crown,
            color: 'from-yellow-600 to-yellow-700',
            bgColor: 'bg-yellow-50',
            borderColor: 'border-yellow-200',
            popular: false
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            {t('title')}
                        </h2>
                        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                            {t('subtitle')}
                        </p>
                    </div>

                    {/* Packages Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {packages.map(({ id, icon: Icon, color, bgColor, borderColor, popular }) => (
                            <div
                                key={id}
                                className={`relative ${bgColor} rounded-2xl p-8 border-2 ${borderColor} ${popular ? 'shadow-2xl scale-105 md:scale-110' : 'shadow-lg'
                                    } hover:shadow-2xl transition-all duration-300`}
                            >
                                {/* Popular Badge */}
                                {popular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <span className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                                            {t('popular')}
                                        </span>
                                    </div>
                                )}

                                {/* Package Header */}
                                <div className="text-center mb-8">
                                    <div className={`w-20 h-20 mx-auto rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-lg`}>
                                        <Icon className="w-10 h-10 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                        {t(`${id}.name`)}
                                    </h3>
                                    <p className="text-gray-600">
                                        {t(`${id}.subtitle`)}
                                    </p>
                                </div>

                                {/* Features */}
                                <ul className="space-y-4 mb-8">
                                    {[1, 2, 3, 4, 5].map((num) => {
                                        const feature = t(`${id}.features.item${num}`);
                                        if (!feature || feature === `SealcoatingPage.pricing.${id}.features.item${num}`) return null;
                                        return (
                                            <li key={num} className="flex items-start gap-3">
                                                <Check className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
                                                <span className="text-gray-700">{feature}</span>
                                            </li>
                                        );
                                    })}
                                </ul>

                                {/* Ideal For */}
                                <div className="bg-white/60 rounded-lg p-4 border border-gray-200">
                                    <p className="text-sm font-semibold text-gray-900 mb-2">{t('idealFor')}</p>
                                    <p className="text-sm text-gray-700">{t(`${id}.idealFor`)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

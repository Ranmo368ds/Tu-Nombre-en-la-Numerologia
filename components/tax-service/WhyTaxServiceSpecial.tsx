'use client';

import { useTranslations } from 'next-intl';
import { AlertCircle, Users, TrendingDown, Shield, Calendar } from 'lucide-react';

export default function WhyTaxServiceSpecial() {
    const t = useTranslations('TaxServicePage.problem');

    const challenges = [
        { key: 'challenge1', icon: TrendingDown },
        { key: 'challenge2', icon: Users },
        { key: 'challenge3', icon: AlertCircle },
        { key: 'challenge4', icon: Calendar },
        { key: 'challenge5', icon: Shield }
    ];

    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Title */}
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">
                        {t('title')}
                    </h2>

                    {/* Main Text */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12 border border-gray-100">
                        <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
                            {t('description')}
                        </p>

                        {/* Challenges */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">{t('challenges_title')}</h3>
                            {challenges.map(({ key, icon: Icon }) => (
                                <div key={key} className="flex items-start gap-4 p-4 bg-red-50 rounded-lg border border-red-100">
                                    <Icon className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                                    <p className="text-gray-800 font-medium">{t(`challenges.${key}`)}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Call-out */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-center">
                        <p className="text-xl md:text-2xl text-white font-bold">
                            👉 {t('callout')}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

'use client';

import { useTranslations } from 'next-intl';
import { AlertCircle, Calendar, DollarSign, Eye, Users } from 'lucide-react';

export default function WhySealcoatingSpecial() {
    const t = useTranslations('SealcoatingPage.problem');

    const challenges = [
        { key: 'challenge1', icon: Calendar },
        { key: 'challenge2', icon: DollarSign },
        { key: 'challenge3', icon: Users },
        { key: 'challenge4', icon: Eye },
        { key: 'challenge5', icon: AlertCircle }
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
                                <div key={key} className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg border border-orange-100">
                                    <Icon className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                                    <p className="text-gray-800 font-medium">{t(`challenges.${key}`)}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Call-out */}
                    <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-8 text-center">
                        <p className="text-xl md:text-2xl text-white font-bold">
                            {t('callout')}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

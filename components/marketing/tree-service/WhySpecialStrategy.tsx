'use client';

import { useTranslations } from 'next-intl';
import { AlertTriangle, TrendingDown, MapPin, Eye, Users } from 'lucide-react';

export default function WhySpecialStrategy() {
    const t = useTranslations('TreeServicePage.whySpecial');

    const challenges = [
        { icon: AlertTriangle, key: 'challenge_1' },
        { icon: TrendingDown, key: 'challenge_2' },
        { icon: MapPin, key: 'challenge_3' },
        { icon: Eye, key: 'challenge_4' },
        { icon: Users, key: 'challenge_5' },
    ];

    return (
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-6xl mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        {t('title')}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                        {t('description')}
                    </p>
                </div>

                {/* Challenges Grid */}
                <div className="mb-12">
                    <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                        {t('challenges_title')}
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {challenges.map(({ icon: Icon, key }) => (
                            <div
                                key={key}
                                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-emerald-200 group"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                                        <Icon className="w-6 h-6 text-emerald-700" />
                                    </div>
                                    <p className="text-gray-700 leading-relaxed flex-1">
                                        {t(key)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Key Insight */}
                <div className="bg-gradient-to-r from-emerald-600 to-green-700 rounded-2xl p-8 md:p-12 text-white shadow-2xl">
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                            <span className="text-3xl">💡</span>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold mb-4">{t('insight_title')}</h3>
                            <p className="text-emerald-50 text-lg leading-relaxed">
                                {t('insight_description')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

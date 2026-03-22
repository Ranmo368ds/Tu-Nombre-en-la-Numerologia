'use client';

import { useTranslations } from 'next-intl';
import { CheckCircle, TrendingUp, Users, Calendar } from 'lucide-react';

export default function SealcoatingExpectedResults() {
    const t = useTranslations('SealcoatingPage.results');

    const results = [
        { id: 'result1', icon: Users },
        { id: 'result2', icon: TrendingUp },
        { id: 'result3', icon: Calendar },
        { id: 'result4', icon: CheckCircle }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="max-w-5xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            {t('title')}
                        </h2>
                        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                            {t('subtitle')}
                        </p>
                    </div>

                    {/* Results Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        {results.map(({ id, icon: Icon }) => (
                            <div
                                key={id}
                                className="bg-gradient-to-br from-orange-50 to-gray-50 rounded-xl p-8 border-2 border-orange-200 hover:border-orange-300 transition-colors duration-300"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-600 to-orange-700 flex items-center justify-center flex-shrink-0">
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            {t(`${id}.title`)}
                                        </h3>
                                        <p className="text-gray-700 leading-relaxed">
                                            {t(`${id}.description`)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Final Message */}
                    <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-center">
                        <p className="text-xl md:text-2xl text-white leading-relaxed">
                            {t('finalMessage')}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

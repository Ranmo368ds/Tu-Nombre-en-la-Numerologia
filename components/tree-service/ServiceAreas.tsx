'use client';

import { useTranslations } from 'next-intl';
import { MapPin, Target } from 'lucide-react';

export default function ServiceAreas() {
    const t = useTranslations('TreeServicePage.serviceAreas');

    const cities = [
        'Algonquin', 'Huntley', 'Elgin', 'Crystal Lake',
        'Barrington', 'Woodstock', 'McHenry', 'Carpentersville',
        'South Elgin', 'St. Charles', 'Lake in the Hills', 'Cary'
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-emerald-100 rounded-full px-6 py-2 mb-6">
                        <MapPin className="w-5 h-5 text-emerald-700" />
                        <span className="text-emerald-900 font-semibold">{t('badge')}</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        {t('title')}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        {t('description')}
                    </p>
                </div>

                {/* Cities Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
                    {cities.map((city) => (
                        <div
                            key={city}
                            className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg p-4 text-center hover:shadow-lg transition-all duration-300 border border-emerald-100 hover:border-emerald-300 group"
                        >
                            <MapPin className="w-5 h-5 text-emerald-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                            <span className="font-semibold text-gray-800">{city}</span>
                        </div>
                    ))}
                </div>

                {/* Strategy Explanation */}
                <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
                    <div className="flex items-start gap-6">
                        <div className="flex-shrink-0 w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                            <Target className="w-8 h-8 text-emerald-700" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                {t('strategy.title')}
                            </h3>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                {t('strategy.description')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

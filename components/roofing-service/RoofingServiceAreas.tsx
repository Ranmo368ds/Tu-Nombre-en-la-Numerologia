'use client';

import { useTranslations } from 'next-intl';
import { MapPin } from 'lucide-react';

export default function RoofingServiceAreas() {
    const t = useTranslations('RoofingPage.areas');

    const cities = [
        'Algonquin', 'Huntley', 'Elgin', 'Crystal Lake',
        'Carpentersville', 'Barrington', 'Woodstock', 'McHenry',
        'Schaumburg'
    ];

    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-6">
                <div className="max-w-5xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-blue-100 rounded-full px-6 py-2 mb-6">
                            <MapPin className="w-5 h-5 text-blue-600" />
                            <span className="text-blue-900 font-semibold">{t('badge')}</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            {t('title')}
                        </h2>
                    </div>

                    {/* Main Description */}
                    <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl p-8 md:p-12 mb-12 border border-blue-200">
                        <p className="text-lg md:text-xl text-gray-800 leading-relaxed text-center">
                            {t('description')}
                        </p>
                    </div>

                    {/* Cities Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                        {cities.map((city) => (
                            <div
                                key={city}
                                className="bg-white border-2 border-blue-200 rounded-lg p-4 text-center hover:bg-blue-50 hover:border-blue-400 transition-all duration-300 shadow-sm hover:shadow-md"
                            >
                                <span className="font-semibold text-gray-900">{city}</span>
                            </div>
                        ))}
                    </div>

                    {/* Additional Areas */}
                    <p className="text-center text-gray-600 text-lg">
                        {t('additional')}
                    </p>
                </div>
            </div>
        </section>
    );
}

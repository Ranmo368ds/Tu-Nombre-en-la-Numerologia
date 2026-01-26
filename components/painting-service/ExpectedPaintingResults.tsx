'use client';

import { useTranslations } from 'next-intl';
import { Zap, DoorOpen, Search, Mail, Image } from 'lucide-react';

export default function ExpectedPaintingResults() {
    const t = useTranslations('PaintingPage.results');

    const results = [
        { icon: DoorOpen, key: 'doorHangers', color: 'indigo' },
        { icon: Search, key: 'googleAds', color: 'red' },
        { icon: Mail, key: 'eddm', color: 'blue' },
        { icon: Image, key: 'pinterest', color: 'pink' },
    ];

    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-6xl mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        {t('title')}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Results Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {results.map(({ icon: Icon, key, color }) => (
                        <div
                            key={key}
                            className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                        >
                            <div className="flex items-start gap-4">
                                <div className={`flex-shrink-0 w-14 h-14 bg-${color}-100 rounded-lg flex items-center justify-center`}>
                                    <Icon className={`w-7 h-7 text-${color}-700`} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                        {t(`${key}.title`)}
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        {t(`${key}.description`)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Combined Effect */}
                <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 rounded-2xl p-10 text-white shadow-2xl">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-shrink-0">
                            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                <Zap className="w-12 h-12 text-white" />
                            </div>
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-3xl font-bold mb-4">The Integrated Multiplier Effect</h3>
                            <p className="text-blue-50 text-lg leading-relaxed">
                                When you combine all pillars, you're not just running ads; you're building a dominant local presence. A neighbor sees your Yard Sign, gets a Door Hanger the next day, and later finds you on Google or Pinterest. This constant visibility builds trust and makes hiring you the obvious choice.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

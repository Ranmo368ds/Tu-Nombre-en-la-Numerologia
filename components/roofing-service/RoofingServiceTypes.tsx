'use client';

import { useTranslations } from 'next-intl';
import { Home, Building2, Hammer, PaintBucket, Shield, Wrench } from 'lucide-react';

export default function RoofingServiceTypes() {
    const t = useTranslations('RoofingPage.services');

    const services = [
        { id: 'roofReplacement', icon: Home, color: 'from-blue-500 to-blue-600' },
        { id: 'roofRepair', icon: Hammer, color: 'from-slate-600 to-slate-700' },
        { id: 'sidingInstallation', icon: Building2, color: 'from-green-500 to-green-600' },
        { id: 'sidingRepair', icon: Wrench, color: 'from-yellow-600 to-yellow-700' },
        { id: 'gutterServices', icon: PaintBucket, color: 'from-purple-500 to-purple-600' },
        { id: 'stormDamage', icon: Shield, color: 'from-red-500 to-red-600' }
    ];

    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            {t('title')}
                        </h2>
                        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                            {t('subtitle')}
                        </p>
                    </div>

                    {/* Services Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map(({ id, icon: Icon, color }) => (
                            <div
                                key={id}
                                className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200"
                            >
                                <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                    {t(`${id}.title`)}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {t(`${id}.description`)}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Call-out */}
                    <div className="mt-12 bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-8 border border-blue-200">
                        <p className="text-lg text-gray-800 text-center">
                            <span className="font-bold">👉</span> {t('callout')}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

'use client';

import { useTranslations } from 'next-intl';
import { TreeDeciduous, Scissors, CircleDot, AlertCircle } from 'lucide-react';

export default function ServiceTypes() {
    const t = useTranslations('TreeServicePage.serviceTypes');

    const services = [
        {
            id: 'removal',
            icon: TreeDeciduous,
            gradient: 'from-red-500 to-orange-600',
            iconBg: 'bg-red-100',
            iconColor: 'text-red-700',
        },
        {
            id: 'trimming',
            icon: Scissors,
            gradient: 'from-green-500 to-emerald-600',
            iconBg: 'bg-green-100',
            iconColor: 'text-green-700',
        },
        {
            id: 'stumpGrinding',
            icon: CircleDot,
            gradient: 'from-amber-500 to-yellow-600',
            iconBg: 'bg-amber-100',
            iconColor: 'text-amber-700',
        },
        {
            id: 'emergency',
            icon: AlertCircle,
            gradient: 'from-purple-500 to-pink-600',
            iconBg: 'bg-purple-100',
            iconColor: 'text-purple-700',
        },
    ];

    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        {t('title')}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {services.map(({ id, icon: Icon, gradient, iconBg, iconColor }) => (
                        <div
                            key={id}
                            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200"
                        >
                            {/* Header with Gradient */}
                            <div className={`bg-gradient-to-r ${gradient} p-8 text-white`}>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold">
                                        {t(`${id}.title`)}
                                    </h3>
                                </div>
                                <p className="text-white/90 leading-relaxed">
                                    {t(`${id}.description`)}
                                </p>
                            </div>

                            {/* Marketing Approach */}
                            <div className="p-8">
                                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="text-emerald-600">📊</span>
                                    {t(`${id}.marketing.title`)}
                                </h4>
                                <p className="text-gray-700 leading-relaxed">
                                    {t(`${id}.marketing.description`)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

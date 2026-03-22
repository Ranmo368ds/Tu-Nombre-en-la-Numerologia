'use client';

import { useTranslations } from 'next-intl';
import { Paintbrush, Home, Building2, Palette, Sparkles } from 'lucide-react';

export default function PaintingServiceTypes() {
    const t = useTranslations('PaintingPage.services');

    const services = [
        { id: 'item1', icon: Home, gradient: 'from-blue-500 to-indigo-600' },
        { id: 'item2', icon: Building2, gradient: 'from-indigo-500 to-purple-600' },
        { id: 'item3', icon: Palette, gradient: 'from-blue-400 to-blue-600' },
        { id: 'item4', icon: Paintbrush, gradient: 'from-indigo-400 to-indigo-600' },
        { id: 'item5', icon: Sparkles, gradient: 'from-purple-400 to-purple-600' },
    ];

    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        {t('title')}
                    </h2>
                </div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map(({ id, icon: Icon, gradient }) => {
                        const text = t(id);
                        if (text === `PaintingPage.services.${id}`) return null;

                        return (
                            <div
                                key={id}
                                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200"
                            >
                                <div className={`h-2 bg-gradient-to-r ${gradient}`} />
                                <div className="p-8">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                            <Icon className="w-6 h-6 text-blue-700" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900">
                                            {text}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

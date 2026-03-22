'use client';

import { useTranslations } from 'next-intl';
import { Cloud, Database, MapPin, Target, TrendingUp, Zap } from 'lucide-react';

export default function StormIntelligenceFeature() {
    const t = useTranslations('RoofingPage.stormIntelligence');

    const features = [
        { id: 'feature1', icon: Database },
        { id: 'feature2', icon: MapPin },
        { id: 'feature3', icon: Target },
        { id: 'feature4', icon: Zap }
    ];

    const benefits = [
        { id: 'benefit1', icon: TrendingUp },
        { id: 'benefit2', icon: Target },
        { id: 'benefit3', icon: Cloud }
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-blue-900 via-slate-900 to-blue-900 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 50px, rgba(255,255,255,0.05) 50px, rgba(255,255,255,0.05) 51px)`
                }}></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-blue-700/50 backdrop-blur-sm border border-blue-600/30 rounded-full px-6 py-2 mb-6">
                            <Cloud className="w-5 h-5 text-blue-300" />
                            <span className="text-blue-200 font-semibold">{t('badge')}</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            {t('title')}
                        </h2>
                        <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                            {t('subtitle')}
                        </p>
                    </div>

                    {/* Main Description */}
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 mb-12 border border-white/20">
                        <p className="text-lg text-white leading-relaxed mb-8">
                            {t('description')}
                        </p>

                        {/* How It Works */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {features.map(({ id, icon: Icon }) => (
                                <div key={id} className="flex items-start gap-4 p-6 bg-blue-800/30 rounded-xl border border-blue-600/30">
                                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-2">
                                            {t(`${id}.title`)}
                                        </h3>
                                        <p className="text-blue-100">
                                            {t(`${id}.description`)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Benefits */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
                            {t('benefits_title')}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {benefits.map(({ id, icon: Icon }) => (
                                <div key={id} className="text-center">
                                    <div className="w-16 h-16 mx-auto rounded-full bg-white/20 flex items-center justify-center mb-4">
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h4 className="text-lg font-bold text-white mb-2">
                                        {t(`${id}.title`)}
                                    </h4>
                                    <p className="text-blue-100">
                                        {t(`${id}.description`)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Call-out */}
                    <div className="mt-12 text-center">
                        <p className="text-2xl font-bold text-white">
                            {t('callout')}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

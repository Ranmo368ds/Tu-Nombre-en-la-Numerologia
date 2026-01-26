'use client';

import { useTranslations } from 'next-intl';
import { CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

export default function WhyCleaningSpecial() {
    const t = useTranslations('CleaningPage.whySpecial');

    const challenges = [
        t('challenge_1'),
        t('challenge_2'),
        t('challenge_3'),
        t('challenge_4'),
        t('challenge_5'),
    ];

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Visual Side */}
                    <div className="relative">
                        <div className="absolute -top-10 -left-10 w-64 h-64 bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
                        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

                        <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 md:p-12">
                            <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                                <AlertCircle className="text-blue-600 w-6 h-6" />
                                {t('challenges_title')}
                            </h3>
                            <ul className="space-y-6">
                                {challenges.map((challenge, index) => (
                                    <li key={index} className="flex items-start gap-4 group">
                                        <div className="flex-shrink-0 w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center font-bold text-sm group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                            {index + 1}
                                        </div>
                                        <p className="text-slate-600 leading-relaxed font-medium">
                                            {challenge}
                                        </p>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-12 pt-8 border-t border-gray-100">
                                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
                                    <p className="text-blue-900 font-bold mb-2 flex items-center gap-2">
                                        <Sparkles className="w-5 h-5 text-blue-600" />
                                        {t('insight_title')}
                                    </p>
                                    <p className="text-blue-800/80 text-sm leading-relaxed">
                                        {t('insight_description')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="lg:pl-8">
                        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 font-bold px-4 py-1.5 rounded-full text-sm mb-6">
                            <CheckCircle2 className="w-4 h-4" />
                            Trust & Professionalism
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                            {t('title')}
                        </h2>
                        <div className="space-y-6">
                            <p className="text-lg text-slate-600 leading-relaxed">
                                {t('description')}
                            </p>
                            <div className="grid grid-cols-2 gap-4 pt-8">
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <div className="text-blue-600 font-bold text-3xl mb-1">100%</div>
                                    <div className="text-slate-500 text-xs font-bold uppercase tracking-wider">Reliability</div>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <div className="text-cyan-500 font-bold text-3xl mb-1">Top</div>
                                    <div className="text-slate-500 text-xs font-bold uppercase tracking-wider">Equipments</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

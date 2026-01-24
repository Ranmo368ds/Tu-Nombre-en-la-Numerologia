'use client';

import { useTranslations } from 'next-intl';
import { UserPlus, Send, PhoneCall } from 'lucide-react';

export default function LocalMarketingSteps() {
    const t = useTranslations('LocalMarketingPage.steps');

    const steps = [
        { id: 'step1', icon: UserPlus, color: 'text-indigo-600', bg: 'bg-indigo-100' },
        { id: 'step2', icon: Send, color: 'text-purple-600', bg: 'bg-purple-100' },
        { id: 'step3', icon: PhoneCall, color: 'text-green-600', bg: 'bg-green-100' },
    ];

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                        {t('title')}
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-indigo-100 via-purple-100 to-green-100 -translate-y-1/2 z-0"></div>

                    {steps.map(({ id, icon: Icon, color, bg }, index) => (
                        <div key={id} className="relative z-10 flex flex-col items-center text-center">
                            <div className="w-24 h-24 rounded-full bg-white border-4 border-white shadow-xl flex items-center justify-center mb-8 group transition-transform hover:scale-110">
                                <div className={`w-20 h-20 rounded-full ${bg} flex items-center justify-center`}>
                                    <Icon className={`w-10 h-10 ${color}`} />
                                </div>
                                <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-gray-900 text-white font-bold flex items-center justify-center ring-4 ring-white">
                                    {index + 1}
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                {t(`${id}.title`)}
                            </h3>
                            <p className="text-lg text-gray-600 leading-relaxed max-w-[280px]">
                                {t(`${id}.description`)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

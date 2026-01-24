'use client';

import { useTranslations } from 'next-intl';
import { CheckCircle2, QrCode, Globe, Image as ImageIcon } from 'lucide-react';

export default function LocalMarketingSolution() {
    const t = useTranslations('LocalMarketingPage.solution');

    const solutions = [
        { id: 'item1', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-100' },
        { id: 'item2', icon: Globe, color: 'text-indigo-600', bg: 'bg-indigo-100' },
        { id: 'item3', icon: QrCode, color: 'text-purple-600', bg: 'bg-purple-100' },
        { id: 'item4', icon: ImageIcon, color: 'text-pink-600', bg: 'bg-pink-100' },
    ];

    return (
        <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                        {t('title')}
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {solutions.map(({ id, icon: Icon, color, bg }) => (
                        <div key={id} className="flex items-center gap-6 p-8 bg-white rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                            <div className={`w-16 h-16 rounded-2xl ${bg} flex items-center justify-center flex-shrink-0`}>
                                <Icon className={`w-8 h-8 ${color}`} />
                            </div>
                            <p className="text-xl font-semibold text-gray-800 leading-snug">
                                {t(id)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

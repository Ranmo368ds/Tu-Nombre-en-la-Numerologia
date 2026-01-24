'use client';

import { useTranslations } from 'next-intl';
import { XCircle, Trash2, TrendingDown } from 'lucide-react';

export default function LocalMarketingProblem() {
    const t = useTranslations('LocalMarketingPage.problem');

    const problems = [
        { id: 'item1', icon: XCircle },
        { id: 'item2', icon: Trash2 },
        { id: 'item3', icon: TrendingDown },
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                        {t('title')}
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {problems.map(({ id, icon: Icon }) => (
                        <div key={id} className="group p-8 rounded-3xl bg-red-50/50 border border-red-100 hover:border-red-200 hover:bg-red-50 transition-all duration-300 text-center">
                            <div className="w-16 h-16 mx-auto rounded-2xl bg-red-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Icon className="w-8 h-8 text-red-600" />
                            </div>
                            <p className="text-xl font-bold text-gray-800">
                                {t(id)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

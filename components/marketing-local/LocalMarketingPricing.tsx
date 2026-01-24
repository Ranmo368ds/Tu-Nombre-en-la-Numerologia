'use client';

import { useTranslations } from 'next-intl';
import { Check, Send, Zap, Crown } from 'lucide-react';

export default function LocalMarketingPricing() {
    const t = useTranslations('LocalMarketingPage.pricing');

    const plans = [
        {
            id: 'basic',
            price: '149',
            icon: Send,
            color: 'text-indigo-600',
            bg: 'bg-indigo-50',
            border: 'border-indigo-100',
            button: 'bg-indigo-600 hover:bg-indigo-700'
        },
        {
            id: 'pro',
            price: '249',
            icon: Zap,
            color: 'text-purple-600',
            bg: 'bg-purple-50',
            border: 'border-purple-200',
            button: 'bg-purple-600 hover:bg-purple-700',
            popular: true
        },
        {
            id: 'elite',
            price: '399',
            icon: Crown,
            color: 'text-amber-600',
            bg: 'bg-amber-50',
            border: 'border-amber-200',
            button: 'bg-amber-600 hover:bg-amber-700'
        }
    ];

    const handleCTA = () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                        {t('title')}
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className={`relative p-10 rounded-[2.5rem] border-2 transition-all duration-300 hover:scale-105 ${plan.popular
                                    ? 'border-purple-500 shadow-2xl bg-white'
                                    : `${plan.border} bg-gray-50/50 shadow-lg`
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-6 py-1 rounded-full text-sm font-bold uppercase tracking-widest shadow-lg">
                                    {t('mostPopular')}
                                </div>
                            )}

                            <div className={`${plan.bg} w-16 h-16 rounded-2xl flex items-center justify-center mb-6`}>
                                <plan.icon className={`w-8 h-8 ${plan.color}`} />
                            </div>

                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                {t(`${plan.id}.name`)}
                            </h3>
                            <div className="flex items-baseline gap-1 mb-8">
                                <span className="text-4xl font-extrabold text-gray-900">${plan.price}</span>
                                <span className="text-gray-500 font-medium">/ flyer</span>
                            </div>

                            <ul className="space-y-4 mb-10 min-h-[280px]">
                                {[1, 2, 3, 4, 5].map((num) => {
                                    const feature = t(`${plan.id}.features.item${num}`);
                                    if (feature === `LocalMarketingPage.pricing.${plan.id}.features.item${num}`) return null;
                                    return (
                                        <li key={num} className="flex items-start gap-3">
                                            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-700">{feature}</span>
                                        </li>
                                    );
                                })}
                            </ul>

                            <button
                                onClick={handleCTA}
                                className={`w-full py-4 rounded-xl text-white font-bold transition-all shadow-lg hover:shadow-xl ${plan.button}`}
                            >
                                {t('selectPlan')}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

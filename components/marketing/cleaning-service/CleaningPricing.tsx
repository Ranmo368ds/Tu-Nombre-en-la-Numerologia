'use client';

import { useTranslations } from 'next-intl';
import { Check, ArrowRight } from 'lucide-react';

export default function CleaningPricing() {
    const t = useTranslations('CleaningPage.pricing');

    const packages = [
        {
            id: 'starter',
            popular: false,
            color: 'blue',
        },
        {
            id: 'pro',
            popular: true,
            color: 'cyan',
        },
        {
            id: 'allin',
            popular: false,
            color: 'slate',
        },
    ];

    const handleCTA = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="py-24 bg-gradient-to-b from-white to-slate-50">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                        {t('title')}
                    </h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Packages Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {packages.map(({ id, popular, color }) => (
                        <div
                            key={id}
                            className={`relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group ${popular ? 'ring-4 ring-cyan-500 ring-offset-0 scale-105 z-10' : 'border border-slate-200'
                                }`}
                        >
                            {/* Popular Badge */}
                            {popular && (
                                <div className="absolute top-0 right-0 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-2 rounded-bl-3xl font-bold text-sm tracking-wide z-20">
                                    Most Popular
                                </div>
                            )}

                            {/* Package Header */}
                            <div className={`bg-gradient-to-br ${color === 'blue' ? 'from-blue-600 to-blue-800' : color === 'cyan' ? 'from-cyan-500 to-blue-600' : 'from-slate-600 to-slate-800'} p-10 text-white relative overflow-hidden`}>
                                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                                <h3 className="text-3xl font-bold mb-3 relative z-10">
                                    {t(`${id}.name`)}
                                </h3>
                                <p className="text-white/80 text-sm font-medium relative z-10 tracking-wide uppercase">
                                    {t(`${id}.tagline`)}
                                </p>
                            </div>

                            {/* Package Content */}
                            <div className="p-10">
                                {/* Features */}
                                <ul className="space-y-5 mb-10">
                                    {[1, 2, 3, 4, 5].map((num) => {
                                        const key = `${id}.features.item${num}`;
                                        try {
                                            const feature = t(key);
                                            if (!feature || feature === `CleaningPage.pricing.${id}.features.item${num}`) return null;
                                            return (
                                                <li key={num} className="flex items-start gap-4">
                                                    <div className={`flex-shrink-0 w-6 h-6 bg-${color === 'slate' ? 'slate' : color}-50 rounded-full flex items-center justify-center mt-1 group-hover:bg-${color === 'slate' ? 'slate' : color}-600 group-hover:text-white transition-colors duration-300`}>
                                                        <Check className={`w-4 h-4 text-${color === 'slate' ? 'slate' : color}-600 group-hover:text-white`} />
                                                    </div>
                                                    <span className="text-slate-600 leading-relaxed font-medium">
                                                        {feature}
                                                    </span>
                                                </li>
                                            );
                                        } catch (e) {
                                            return null;
                                        }
                                    })}
                                </ul>

                                {/* Ideal For */}
                                <div className={`bg-slate-50 rounded-2xl p-6 mb-10 border border-slate-100 group-hover:bg-${color === 'slate' ? 'slate' : color}-50/50 transition-colors duration-300`}>
                                    <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">
                                        Ideal for:
                                    </p>
                                    <p className="text-slate-900 font-bold">
                                        {t(`${id}.idealFor`)}
                                    </p>
                                </div>

                                {/* CTA Button */}
                                <button
                                    onClick={handleCTA}
                                    className={`w-full bg-gradient-to-r ${color === 'blue' ? 'from-blue-600 to-blue-700' : color === 'cyan' ? 'from-cyan-500 to-blue-600' : 'from-slate-700 to-slate-800'} hover:scale-[1.02] active:scale-[0.98] text-white font-bold py-5 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl flex items-center justify-center gap-3 group`}
                                >
                                    Select {t(`${id}.name`)}
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

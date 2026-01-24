'use client';

import { useTranslations } from 'next-intl';
import { Check, ArrowRight } from 'lucide-react';

export default function PricingPackages() {
    const t = useTranslations('TreeServicePage.pricing');

    const packages = [
        {
            id: 'starter',
            popular: false,
            color: 'emerald',
        },
        {
            id: 'pro',
            popular: true,
            color: 'blue',
        },
        {
            id: 'allin',
            popular: false,
            color: 'purple',
        },
    ];

    const handleCTA = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
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

                {/* Packages Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {packages.map(({ id, popular, color }) => (
                        <div
                            key={id}
                            className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ${popular ? 'ring-2 ring-blue-500 scale-105' : 'border border-gray-200'
                                }`}
                        >
                            {/* Popular Badge */}
                            {popular && (
                                <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-bl-2xl font-bold text-sm">
                                    {t('popular')}
                                </div>
                            )}

                            {/* Package Header */}
                            <div className={`bg-gradient-to-br from-${color}-500 to-${color}-700 p-8 text-white`}>
                                <h3 className="text-2xl font-bold mb-2">
                                    {t(`${id}.name`)}
                                </h3>
                                <p className="text-white/90 text-sm">
                                    {t(`${id}.tagline`)}
                                </p>
                            </div>

                            {/* Package Content */}
                            <div className="p-8">
                                {/* Features */}
                                <ul className="space-y-4 mb-8">
                                    {[1, 2, 3, 4, 5].map((num) => {
                                        const feature = t(`${id}.features.item${num}`);
                                        if (!feature || feature === `TreeServicePage.pricing.${id}.features.item${num}`) return null;
                                        return (
                                            <li key={num} className="flex items-start gap-3">
                                                <div className={`flex-shrink-0 w-6 h-6 bg-${color}-100 rounded-full flex items-center justify-center mt-0.5`}>
                                                    <Check className={`w-4 h-4 text-${color}-700`} />
                                                </div>
                                                <span className="text-gray-700 leading-relaxed">
                                                    {feature}
                                                </span>
                                            </li>
                                        );
                                    })}
                                </ul>

                                {/* Ideal For */}
                                <div className={`bg-${color}-50 rounded-xl p-4 mb-6`}>
                                    <p className="text-sm font-semibold text-gray-900 mb-2">
                                        {t('idealFor')}
                                    </p>
                                    <p className="text-gray-700 text-sm">
                                        {t(`${id}.idealFor`)}
                                    </p>
                                </div>

                                {/* CTA Button */}
                                <button
                                    onClick={handleCTA}
                                    className={`w-full bg-gradient-to-r from-${color}-500 to-${color}-700 hover:from-${color}-600 hover:to-${color}-800 text-white font-bold py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group`}
                                >
                                    {t('cta')}
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

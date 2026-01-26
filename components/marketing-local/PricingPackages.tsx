'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Check, Info } from 'lucide-react';

export default function PricingPackages() {
    const t = useTranslations('LocalMarketingPage.pricing');

    const scrollToForm = () => {
        const element = document.getElementById('booking-form');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const packages = ['basic', 'pro', 'elite'] as const;

    return (
        <section className="bg-slate-950 py-24 relative">
            <div className="container px-4 mx-auto max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                        {t('title')}
                    </h2>

                    <div className="inline-flex items-baseline justify-center gap-1 mb-4">
                        <span className="text-5xl font-extrabold text-white tracking-tight">{t('price')}</span>
                        <span className="text-xl text-slate-400 font-medium">{t('perZone')}</span>
                    </div>

                    <p className="text-slate-400 max-w-2xl mx-auto flex items-center justify-center gap-2">
                        <Info className="w-4 h-4 text-cyan-500" />
                        {t('description')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {packages.map((pkg, index) => {
                        const isPro = pkg === 'pro';
                        return (
                            <motion.div
                                key={pkg}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`
                                    relative flex flex-col p-8 rounded-2xl border transition-all duration-300
                                    ${isPro
                                        ? 'bg-slate-900 border-cyan-500 shadow-2xl shadow-cyan-900/20 scale-105 z-10'
                                        : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                                    }
                                `}
                            >
                                {isPro && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-bold uppercase px-4 py-1.5 rounded-full tracking-wider shadow-lg">
                                        {t('pro.badge')}
                                    </div>
                                )}

                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold text-white mb-2">{t(`${pkg}.name`)}</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed min-h-[40px]">
                                        {t(`${pkg}.description`)}
                                    </p>
                                </div>

                                <ul className="space-y-4 mb-8 flex-grow">
                                    {/* Types not fully inferred for nested keys, casting to any for loop */}
                                    {[1, 2, 3, 4, 5].map(i => {
                                        // Define max items per package based on content
                                        if (pkg === 'basic' && i > 3) return null;
                                        if (pkg === 'pro' && i > 4) return null;
                                        if (pkg === 'elite' && i > 4) return null;

                                        try {
                                            const featureKey = `${pkg}.features.item${i}`;
                                            const feature = t(featureKey as any);

                                            // Safety check: if translation returns the key itself, skip it
                                            if (feature === `LocalMarketingPage.pricing.${featureKey}` || feature.includes('features.item')) {
                                                return null;
                                            }

                                            // Special handling for keywords like BONUS
                                            const isBonus = feature.includes('BONUS') || feature.includes('Pinterest');

                                            return (
                                                <li key={i} className="flex items-start gap-3">
                                                    <Check className={`w-5 h-5 shrink-0 mt-0.5 ${isPro ? 'text-cyan-400' : 'text-slate-500'}`} />
                                                    <span className={`text-sm ${isBonus ? 'text-white font-semibold' : 'text-slate-300'}`}>
                                                        {feature}
                                                    </span>
                                                </li>
                                            );
                                        } catch (e) {
                                            return null;
                                        }
                                    })}
                                </ul>

                                <button
                                    onClick={scrollToForm}
                                    className={`
                                        w-full py-3.5 rounded-lg font-bold transition-all
                                        ${isPro
                                            ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-lg hover:shadow-cyan-500/25'
                                            : 'bg-slate-800 text-white hover:bg-slate-700'
                                        }
                                    `}
                                >
                                    {t(`${pkg}.cta`)}
                                </button>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="text-center mt-12">
                    <p className="text-xs text-slate-500 uppercase tracking-wide">
                        {t('disclaimer')}
                    </p>
                </div>
            </div>
        </section>
    );
}

'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { MapPin, LayoutTemplate, Smartphone } from 'lucide-react';

export default function HowItWorks() {
    const t = useTranslations('LocalMarketingPage.howItWorks');

    const steps = [
        {
            icon: <MapPin className="w-10 h-10 text-cyan-400" />,
            titleKey: 'step1.title',
            descKey: 'step1.description'
        },
        {
            icon: <LayoutTemplate className="w-10 h-10 text-cyan-400" />,
            titleKey: 'step2.title',
            descKey: 'step2.description'
        },
        {
            icon: <Smartphone className="w-10 h-10 text-cyan-400" />,
            titleKey: 'step3.title',
            descKey: 'step3.description'
        }
    ];

    return (
        <section className="bg-slate-900 py-20 border-t border-slate-800">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                        {t('title')}
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        {t('note')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="bg-slate-950 p-8 rounded-2xl border border-slate-800 hover:border-cyan-900/50 transition-colors relative group"
                        >
                            <div className="bg-slate-900 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-cyan-900/10">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 text-center">
                                {t(step.titleKey)}
                            </h3>
                            <p className="text-slate-400 text-center leading-relaxed">
                                {t(step.descKey)}
                            </p>

                            {/* Connector Line (Desktop Only) */}
                            {index < 2 && (
                                <div className="hidden md:block absolute top-[60px] right-[-20%] w-[40%] h-[2px] bg-slate-800 z-0"></div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

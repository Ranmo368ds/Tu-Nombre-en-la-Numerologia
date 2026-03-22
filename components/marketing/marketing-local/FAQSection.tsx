'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQSection() {
    const t = useTranslations('LocalMarketingPage.faq');
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const questions = [1, 2, 3, 4, 5];

    return (
        <section className="bg-slate-900 py-24 border-t border-slate-800">
            <div className="container px-4 mx-auto max-w-3xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        {t('title')}
                    </h2>
                </div>

                <div className="space-y-4">
                    {questions.map((q, i) => (
                        <div key={q} className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden transition-colors hover:border-slate-700">
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                            >
                                <span className={`font-semibold text-lg ${openIndex === i ? 'text-white' : 'text-slate-400'}`}>
                                    {t(`q${q}.question` as any)}
                                </span>
                                {openIndex === i ? (
                                    <ChevronUp className="w-5 h-5 text-cyan-500" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-slate-500" />
                                )}
                            </button>

                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-6 pb-6 text-slate-400 leading-relaxed border-t border-slate-900 pt-4">
                                            {t(`q${q}.answer` as any)}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

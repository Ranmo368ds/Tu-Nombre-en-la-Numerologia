'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';

export default function CleaningFAQ() {
    const t = useTranslations('CleaningPage.faq');
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        { id: 'q1' },
        { id: 'q2' },
        { id: 'q3' },
    ];

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Decorative background circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-3xl opacity-30 pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                        <MessageCircle className="w-4 h-4" />
                        Common Questions
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                        {t('title')}
                    </h2>
                    <p className="text-xl text-slate-500 font-light">
                        {t('subtitle')}
                    </p>
                </div>

                {/* FAQ Accordion */}
                <div className="space-y-4">
                    {faqs.map(({ id }, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={id}
                                className={`group bg-white border rounded-[2rem] transition-all duration-500 overflow-hidden ${isOpen
                                        ? 'border-blue-600 shadow-2xl shadow-blue-500/10 scale-[1.02]'
                                        : 'border-slate-100 shadow-sm hover:border-blue-200'
                                    }`}
                            >
                                <button
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                    className="w-full flex items-center justify-between p-8 text-left transition-colors"
                                >
                                    <span className={`text-xl font-bold transition-colors duration-300 ${isOpen ? 'text-blue-700' : 'text-slate-900'}`}>
                                        {t(`${id}.question`)}
                                    </span>
                                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-blue-600 text-white rotate-180' : 'bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600'}`}>
                                        <ChevronDown className="w-5 h-5" />
                                    </div>
                                </button>
                                <div
                                    className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    <div className="px-8 pb-8">
                                        <div className="pt-6 border-t border-slate-50">
                                            <p className="text-slate-600 leading-relaxed text-lg font-light italic">
                                                "{t(`${id}.answer`)}"
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

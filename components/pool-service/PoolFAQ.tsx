'use client';

import { useTranslations } from 'next-intl';
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';

export default function PoolFAQ() {
    const t = useTranslations('PoolPage.faq');
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [1, 2, 3].map((num) => ({
        question: t(`q${num}.question`),
        answer: t(`q${num}.answer`),
    }));

    return (
        <section className="py-24 bg-[#184e77]/5">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl font-black text-[#184e77] mb-6 tracking-tight">{t('title')}</h2>
                    <p className="text-xl text-[#34a0a4] font-medium">{t('subtitle')}</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`rounded-3xl border-2 transition-all duration-300 overflow-hidden ${openIndex === index
                                ? 'border-[#34a0a4] bg-white shadow-xl'
                                : 'border-[#d9ed92] bg-white/50 hover:border-[#168aad]/30'
                                }`}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-8 text-left group"
                            >
                                <span className={`text-xl font-black transition-colors ${openIndex === index ? 'text-[#184e77]' : 'text-[#184e77]/70'}`}>
                                    {faq.question}
                                </span>
                                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${openIndex === index ? 'bg-[#34a0a4] text-white rotate-180' : 'bg-[#d9ed92] text-[#184e77]'}`}>
                                    {openIndex === index ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                                </div>
                            </button>

                            <div
                                className={`transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <div className="p-8 pt-0 text-[#184e77]/70 text-lg leading-relaxed font-medium">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { ChevronDown, Plus, Minus } from 'lucide-react';

export default function FenceFAQ() {
    const t = useTranslations('FencePage.faq');
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        { id: 'q1' },
        { id: 'q2' },
        { id: 'q3' },
    ];

    return (
        <section className="py-24 bg-white relative">
            <div className="max-w-4xl mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-24">
                    <div className="inline-flex items-center gap-3 text-[#495057] font-black text-xs uppercase tracking-[0.3em] mb-6">
                        <div className="w-8 h-px bg-[#dee2e6]"></div>
                        Answers for Professionals
                        <div className="w-8 h-px bg-[#dee2e6]"></div>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black text-[#212529] mb-8 tracking-tight">
                        {t('title')}
                    </h2>
                    <p className="text-xl text-[#495057] font-light leading-relaxed">
                        {t('subtitle')}
                    </p>
                </div>

                {/* FAQ Items */}
                <div className="space-y-6">
                    {faqs.map(({ id }, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={id}
                                className={`group border-2 transition-all duration-500 rounded-[2rem] overflow-hidden ${isOpen
                                        ? 'border-[#28a745] bg-[#dee2e6]/10 shadow-xl'
                                        : 'border-[#dee2e6] hover:border-[#495057]/30 bg-white'
                                    }`}
                            >
                                <button
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                    className="w-full flex items-center justify-between p-10 text-left transition-all"
                                >
                                    <span className={`text-xl md:text-2xl font-black transition-colors duration-300 ${isOpen ? 'text-[#212529]' : 'text-[#495057]'}`}>
                                        {t(`${id}.question`)}
                                    </span>
                                    <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-[#28a745] text-white rotate-0' : 'bg-[#dee2e6] text-[#212529] rotate-90'}`}>
                                        {isOpen ? <Minus className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                                    </div>
                                </button>

                                <div
                                    className={`transition-all duration-700 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    <div className="px-10 pb-10">
                                        <div className="pt-8 border-t border-black/5">
                                            <p className="text-[#495057] leading-relaxed text-lg font-bold opacity-80 italic">
                                                "{t(`${id}.answer`)}"
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Support Link */}
                <div className="mt-20 text-center">
                    <p className="text-[#495057] font-bold text-sm">
                        Still have questions? <span className="text-[#28a745] underline cursor-pointer hover:text-[#218838] transition-colors">Talk to our strategy team directly on WhatsApp.</span>
                    </p>
                </div>
            </div>
        </section>
    );
}

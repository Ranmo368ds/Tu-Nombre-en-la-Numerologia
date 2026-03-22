'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { ChevronDown, Plus, Minus } from 'lucide-react';

export default function LandscapingFAQ() {
    const t = useTranslations('LandscapingPage.faq');
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
                    <div className="inline-flex items-center gap-3 text-[#2d6a4f] font-black text-xs uppercase tracking-[0.3em] mb-6">
                        <div className="w-8 h-px bg-[#d8f3dc]"></div>
                        Answers for Professionals
                        <div className="w-8 h-px bg-[#d8f3dc]"></div>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black text-[#081c15] mb-8 tracking-tight">
                        {t('title')}
                    </h2>
                    <p className="text-xl text-[#2d6a4f] font-light leading-relaxed">
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
                                        ? 'border-[#52b788] bg-[#d8f3dc]/10 shadow-xl'
                                        : 'border-[#d8f3dc] hover:border-[#40916c]/30 bg-white'
                                    }`}
                            >
                                <button
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                    className="w-full flex items-center justify-between p-10 text-left transition-all"
                                >
                                    <span className={`text-xl md:text-2xl font-black transition-colors duration-300 ${isOpen ? 'text-[#081c15]' : 'text-[#2d6a4f]'}`}>
                                        {t(`${id}.question`)}
                                    </span>
                                    <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-[#52b788] text-white rotate-0' : 'bg-[#d8f3dc] text-[#081c15] rotate-90'}`}>
                                        {isOpen ? <Minus className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                                    </div>
                                </button>

                                <div
                                    className={`transition-all duration-700 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    <div className="px-10 pb-10">
                                        <div className="pt-8 border-t border-black/5">
                                            <p className="text-[#2d6a4f] leading-relaxed text-lg font-bold opacity-80 italic">
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
                    <p className="text-[#2d6a4f] font-bold text-sm">
                        Still have questions? <span className="text-[#52b788] underline cursor-pointer hover:text-[#40916c] transition-colors">Talk to our strategy team directly on WhatsApp.</span>
                    </p>
                </div>
            </div>
        </section>
    );
}

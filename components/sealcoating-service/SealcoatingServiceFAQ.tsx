'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function SealcoatingServiceFAQ() {
    const t = useTranslations('SealcoatingPage.faq');
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        { id: 'q1' },
        { id: 'q2' },
        { id: 'q3' }
    ];

    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            {t('title')}
                        </h2>
                        <p className="text-xl text-gray-700">
                            {t('subtitle')}
                        </p>
                    </div>

                    {/* FAQ Items */}
                    <div className="space-y-4">
                        {faqs.map(({ id }, index) => (
                            <div
                                key={id}
                                className="bg-gradient-to-r from-orange-50 to-gray-50 rounded-xl border-2 border-orange-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-orange-100/50 transition-colors duration-200"
                                >
                                    <span className="text-lg font-bold text-gray-900 pr-8">
                                        {t(`${id}.question`)}
                                    </span>
                                    {openIndex === index ? (
                                        <ChevronUp className="w-6 h-6 text-orange-600 flex-shrink-0" />
                                    ) : (
                                        <ChevronDown className="w-6 h-6 text-orange-600 flex-shrink-0" />
                                    )}
                                </button>
                                {openIndex === index && (
                                    <div className="px-8 pb-6">
                                        <p className="text-gray-700 leading-relaxed">
                                            {t(`${id}.answer`)}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

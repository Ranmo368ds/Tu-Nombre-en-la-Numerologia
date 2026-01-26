'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function PaintingFAQ() {
    const t = useTranslations('PaintingPage.faq');
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        { id: 'q1' },
        { id: 'q2' },
        { id: 'q3' },
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        {t('title')}
                    </h2>
                    <p className="text-xl text-gray-600">
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
                                className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                            >
                                <button
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                    className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                                >
                                    <span className="text-lg font-bold text-gray-900 pr-8">
                                        {t(`${id}.question`)}
                                    </span>
                                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                        {isOpen ? (
                                            <ChevronUp className="w-5 h-5 text-blue-700" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-blue-700" />
                                        )}
                                    </div>
                                </button>
                                {isOpen && (
                                    <div className="px-6 pb-6">
                                        <div className="pt-4 border-t border-gray-100">
                                            <p className="text-gray-700 leading-relaxed">
                                                {t(`${id}.answer`)}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

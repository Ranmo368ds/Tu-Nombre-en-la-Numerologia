'use client';

import { EducationalPost } from '@/lib/eddm/types';

interface InformationSectionProps {
    content: EducationalPost;
}

export default function InformationSection({ content }: InformationSectionProps) {
    const getCategoryColor = () => {
        const category = content.category.toLowerCase();
        if (category.includes('landscaping')) return 'bg-green-500';
        if (category.includes('roofing')) return 'bg-blue-500';
        if (category.includes('tree')) return 'bg-emerald-600';
        if (category.includes('pool')) return 'bg-cyan-500';
        return 'bg-eddm-navy';
    };

    return (
        <div className="grid-item-full bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl shadow-md overflow-hidden border-l-4 border-eddm-orange">
            <div className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                    {/* Icon/Category Badge */}
                    <div className={`${getCategoryColor()} text-white p-3 rounded-lg flex-shrink-0`}>
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                        <div className="mb-2">
                            <span className="inline-block px-3 py-1 bg-eddm-orange/10 text-eddm-orange text-xs font-semibold rounded">
                                {content.category}
                            </span>
                        </div>

                        <h3 className="text-xl md:text-2xl font-bold text-eddm-navy mb-2">
                            {content.title}
                        </h3>

                        <p className="text-gray-700">
                            {content.content}
                        </p>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .grid-item-full {
          grid-column: 1 / -1;
          grid-row: span 1;
        }
      `}</style>
        </div>
    );
}

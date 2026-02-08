'use client';

import { Business } from '@/lib/eddm/types';
import { useState } from 'react';

interface PrimeAdCardProps {
    business: Business;
}

export default function PrimeAdCard({ business }: PrimeAdCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <>
            <div
                onClick={() => setIsExpanded(true)}
                className="grid-item-2x1 bg-gradient-to-br from-eddm-vibrant-red to-eddm-orange rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden relative"
            >
                {/* Featured Badge */}
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
                    <span className="text-eddm-vibrant-red font-bold text-xs">⭐ DESTACADO</span>
                </div>

                <div className="p-4 md:p-6 h-full flex flex-col text-white">
                    {/* Category Badge */}
                    <div className="mb-3">
                        <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded">
                            {business.category}
                        </span>
                    </div>

                    {/* Business Name */}
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 line-clamp-2">
                        {business.name}
                    </h3>

                    {/* Rating */}
                    {business.rating && (
                        <div className="flex items-center mb-3">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className={i < Math.floor(business.rating!) ? 'text-yellow-300' : 'text-white/30'}>
                                        ⭐
                                    </span>
                                ))}
                            </div>
                            <span className="text-base md:text-lg font-bold text-white ml-2">{business.rating.toFixed(1)}</span>
                            {business.reviewCount && (
                                <span className="text-xs md:text-sm text-white/80 ml-2">({business.reviewCount} reviews)</span>
                            )}
                        </div>
                    )}

                    {/* Description */}
                    <p className="text-sm md:text-base text-white/90 mb-auto line-clamp-3 md:line-clamp-4">
                        {business.description}
                    </p>

                    {/* Contact Info */}
                    <div className="mt-4 md:mt-6 pt-4 border-t border-white/20">
                        <p className="text-base md:text-lg font-bold">
                            📞 {business.phone}
                        </p>
                        {business.website && (
                            <p className="text-xs md:text-sm text-white/80 mt-1">
                                🌐 {business.website.replace('https://', '')}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal (same as BusinessCard) */}
            {isExpanded && (
                <div
                    className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                    onClick={() => setIsExpanded(false)}
                >
                    <div
                        className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6">
                            <button
                                onClick={() => setIsExpanded(false)}
                                className="float-right text-gray-400 hover:text-gray-600"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <div className="mb-4">
                                <span className="inline-block px-3 py-1 bg-eddm-vibrant-red/10 text-eddm-vibrant-red text-sm font-semibold rounded">
                                    ⭐ DESTACADO - {business.category}
                                </span>
                            </div>

                            <h2 className="text-3xl font-bold text-eddm-navy mb-4">
                                {business.name}
                            </h2>

                            <p className="text-gray-700 mb-6">
                                {business.description}
                            </p>

                            {business.services && business.services.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-bold text-eddm-navy mb-3">Servicios</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {business.services.map((service, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-eddm-vibrant-red/10 text-eddm-vibrant-red rounded-full text-sm font-medium"
                                            >
                                                {service}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="space-y-3">
                                <a
                                    href={`tel:${business.phone}`}
                                    className="block w-full bg-eddm-vibrant-red text-white text-center py-3 rounded-lg font-semibold hover:bg-eddm-vibrant-red/90 transition-colors"
                                >
                                    📞 Llamar Ahora
                                </a>

                                {business.website && (
                                    <a
                                        href={business.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full bg-eddm-sky-blue text-white text-center py-3 rounded-lg font-semibold hover:bg-eddm-sky-blue/90 transition-colors"
                                    >
                                        🌐 Visitar Sitio Web
                                    </a>
                                )}

                                {business.email && (
                                    <a
                                        href={`mailto:${business.email}`}
                                        className="block w-full bg-eddm-navy text-white text-center py-3 rounded-lg font-semibold hover:bg-eddm-navy/90 transition-colors"
                                    >
                                        ✉️ Enviar Email
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
        .grid-item-2x1 {
          /* Single column on mobile */
          grid-column: span 1;
          grid-row: span 1;
        }

        /* 2 columns on tablet and desktop */
        @media (min-width: 768px) {
          .grid-item-2x1 {
            grid-column: span 2;
            grid-row: span 1;
          }
        }
      `}</style>
        </>
    );
}

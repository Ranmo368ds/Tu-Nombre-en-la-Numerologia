'use client';

import { Business } from '@/lib/eddm/types';
import { useState } from 'react';

interface BusinessCardProps {
    business: Business;
}

export default function BusinessCard({ business }: BusinessCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    // Detect if this is a placeholder/empty slot
    const isPlaceholder = business.id.startsWith('slot-');

    // Get a vibrant gradient based on slot number for placeholders
    const getPlaceholderGradient = () => {
        const gradients = [
            'from-sky-200 via-blue-100 to-cyan-200',
            'from-orange-200 via-amber-100 to-yellow-200',
            'from-emerald-200 via-green-100 to-teal-200',
            'from-purple-200 via-pink-100 to-rose-200',
            'from-blue-200 via-indigo-100 to-purple-200',
            'from-teal-200 via-cyan-100 to-sky-200',
        ];
        const slotNum = parseInt(business.id.replace('slot-', '')) || 0;
        return gradients[slotNum % gradients.length];
    };

    return (
        <>
            <div
                onClick={() => !isPlaceholder && setIsExpanded(true)}
                className={`rounded-xl shadow-lg transition-all duration-300 overflow-hidden ${isPlaceholder
                    ? 'bg-white border-2 border-dashed border-gray-300 cursor-default hover:shadow-xl hover:border-blue-400'
                    : 'bg-white hover:shadow-2xl hover:scale-102 cursor-pointer border border-gray-200'
                    }`}
            >
                {/* Image Section */}
                <div className={`relative h-32 md:h-40 ${isPlaceholder
                    ? `bg-gradient-to-br ${getPlaceholderGradient()}`
                    : 'bg-gradient-to-br from-gray-100 to-gray-200'
                    }`}>
                    {business.imageUrl || business.logoUrl ? (
                        <img
                            src={business.imageUrl || business.logoUrl}
                            alt={business.name}
                            className="w-full h-full object-cover"
                        />
                    ) : isPlaceholder ? (
                        <div className="flex flex-col items-center justify-center h-full">
                            <svg className="w-12 h-12 text-white/70 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="text-white/90 text-xs font-semibold">Your Photo Here</span>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <div className="text-4xl font-bold text-gray-400">
                                {business.name.charAt(0)}
                            </div>
                        </div>
                    )}
                </div>

                {/* Content Section */}
                <div className="p-3 md:p-4">
                    {/* Category Badge */}
                    <div className="mb-2">
                        <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${isPlaceholder
                            ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                            : 'bg-blue-100 text-blue-700'
                            }`}>
                            {business.category}
                        </span>
                    </div>

                    {/* Business Name */}
                    <h3 className={`text-lg font-bold mb-2 line-clamp-2 ${isPlaceholder ? 'text-blue-600' : 'text-gray-900'
                        }`}>
                        {business.name}
                    </h3>

                    {/* Rating (for filled businesses) */}
                    {!isPlaceholder && business.rating && (
                        <div className="flex items-center mb-2">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className={i < Math.floor(business.rating!) ? 'text-yellow-400' : 'text-gray-300'}>
                                        ⭐
                                    </span>
                                ))}
                            </div>
                            <span className="text-sm font-semibold text-gray-700 ml-2">{business.rating.toFixed(1)}</span>
                            {business.reviewCount && (
                                <span className="text-xs text-gray-500 ml-1">({business.reviewCount} reviews)</span>
                            )}
                        </div>
                    )}

                    {/* Description */}
                    <p className={`text-sm mb-3 line-clamp-3 ${isPlaceholder ? 'text-gray-600 italic' : 'text-gray-600'
                        }`}>
                        {business.description}
                    </p>

                    {/* Contact Info / CTA */}
                    <div className="space-y-2">
                        {isPlaceholder ? (
                            <>
                                <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 md:py-2.5 rounded-lg font-bold hover:shadow-lg transition-all text-sm md:text-base">
                                    ✨ Reserve Your Spot
                                </button>
                                <p className="text-center text-xs text-gray-500">
                                    Starting at <span className="font-bold text-emerald-600">$99/month</span>
                                </p>
                            </>
                        ) : (
                            <>
                                <div className="flex items-center text-sm text-gray-700">
                                    <span className="mr-2">📞</span>
                                    <span className="font-semibold">{business.phone}</span>
                                </div>
                                {business.website && (
                                    <div className="flex items-center text-sm text-blue-600">
                                        <span className="mr-2">🌐</span>
                                        <span className="truncate">{business.website}</span>
                                    </div>
                                )}
                                <button className="w-full bg-blue-600 text-white py-3 md:py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
                                    View Details →
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal for filled businesses */}
            {isExpanded && !isPlaceholder && (
                <div
                    className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                    onClick={() => setIsExpanded(false)}
                >
                    <div
                        className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6">
                            {/* Close Button */}
                            <button
                                onClick={() => setIsExpanded(false)}
                                className="float-right text-gray-400 hover:text-gray-600"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Content */}
                            <div className="mb-4">
                                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
                                    {business.category}
                                </span>
                            </div>

                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                {business.name}
                            </h2>

                            <p className="text-gray-700 mb-6">
                                {business.description}
                            </p>

                            {/* Services */}
                            {business.services && business.services.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-3">Services</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {business.services.map((service, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                                            >
                                                {service}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Contact Buttons */}
                            <div className="space-y-3">
                                <a
                                    href={`tel:${business.phone}`}
                                    className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                                >
                                    📞 Call Now
                                </a>

                                {business.website && (
                                    <a
                                        href={business.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full bg-cyan-500 text-white text-center py-3 rounded-lg font-semibold hover:bg-cyan-600 transition-colors"
                                    >
                                        🌐 Visit Website
                                    </a>
                                )}

                                {business.email && (
                                    <a
                                        href={`mailto:${business.email}`}
                                        className="block w-full bg-gray-700 text-white text-center py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                                    >
                                        ✉️ Send Email
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

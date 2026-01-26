'use client';

import { useTranslations } from 'next-intl';
import { MapPin, Target } from 'lucide-react';

export default function PaintingServiceAreas() {
    // Note: Reusing TreeServicePage.serviceAreas namespace or common cities if defined
    // For now, I'll assume we use common cities from HomePage.common
    const ct = useTranslations('HomePage.common');

    // Fallback translations if PaintingPage.areas doesn't exist yet (I'll add it to JSON later)
    // Actually, I added it to the JSON draft in my thoughts but let's check what I actually wrote

    const cities: string[] = ct.raw('cities');

    return (
        <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-blue-100 rounded-full px-6 py-2 mb-6">
                        <MapPin className="w-5 h-5 text-blue-700" />
                        <span className="text-blue-900 font-semibold">Local Coverage</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Areas We Serve
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        We serve painting companies and contractors across the Chicago Northwest Suburbs and South Wisconsin.
                    </p>
                </div>

                {/* Cities Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
                    {cities.map((city) => (
                        <div
                            key={city}
                            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 text-center hover:shadow-lg transition-all duration-300 border border-blue-100 hover:border-blue-300 group"
                        >
                            <MapPin className="w-5 h-5 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                            <span className="font-semibold text-gray-800">{city}</span>
                        </div>
                    ))}
                </div>

                <p className="text-center text-gray-500 italic mb-12">
                    {ct('unlisted_city')}
                </p>

                {/* Strategy Explanation */}
                <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
                    <div className="flex items-start gap-6">
                        <div className="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                            <Target className="w-8 h-8 text-blue-700" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                Strategic Local Focus
                            </h3>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                Our marketing system is designed to dominate local zones. We don't just spray ads everywhere; we target the neighborhoods where high-value painting projects are most likely to happen.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

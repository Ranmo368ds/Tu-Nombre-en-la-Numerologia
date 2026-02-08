'use client';

import { useState } from 'react';
import { MonthlyFlyer } from '@/lib/eddm/types';
import { CATEGORIES, filterByCategory } from '@/lib/eddm/categories';
import BusinessCard from './BusinessCard';
import PrimeAdCard from './PrimeAdCard';
import GameCard from './GameCard';
import InformationSection from './InformationSection';

interface MasonryGridProps {
    data: MonthlyFlyer;
}

export default function MasonryGrid({ data }: MasonryGridProps) {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const filteredBusinesses = filterByCategory(data.businesses, selectedCategory);

    return (
        <div className="max-w-[1400px] mx-auto px-0 lg:px-8 py-4 lg:py-8">
            {/* Category Filter */}
            <div className="mb-6 lg:mb-8">
                <h2 className="text-xl lg:text-2xl font-bold text-eddm-navy mb-3 lg:mb-4 px-4 lg:px-0">
                    Categories
                </h2>
                {/* Mobile: Horizontal scroll, Desktop: Wrap */}
                <div className="overflow-x-auto lg:overflow-visible -mx-4 lg:mx-0 px-4 lg:px-0 scrollbar-hide">
                    <div className="flex lg:flex-wrap gap-2 lg:gap-2 min-w-max lg:min-w-0">
                        {CATEGORIES.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-4 lg:px-4 py-2.5 lg:py-2 rounded-full font-medium transition-all whitespace-nowrap ${selectedCategory === category.id
                                    ? 'bg-eddm-sky-blue text-white shadow-lg scale-105'
                                    : 'bg-gray-100 text-eddm-navy hover:bg-gray-200'
                                    }`}
                            >
                                <span className="mr-2">{category.icon}</span>
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Layout: Responsive Grid + Sidebar */}
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
                {/* Business Grid (1 col mobile, 2 col tablet, 3 col desktop) */}
                <div className="flex-1 min-w-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {/* Prime Ads (Featured) */}
                        {filteredBusinesses
                            .filter(b => b.isPrime)
                            .map((business) => (
                                <PrimeAdCard key={business.id} business={business} />
                            ))}

                        {/* Regular Business Cards */}
                        {filteredBusinesses
                            .filter(b => !b.isPrime)
                            .map((business) => (
                                <BusinessCard key={business.id} business={business} />
                            ))}
                    </div>
                </div>

                {/* Sidebar (Games & Educational Content) */}
                <aside className="w-full lg:w-80 flex-shrink-0 space-y-4 lg:space-y-6 mt-4 lg:mt-0">
                    {/* Games Section */}
                    <div className="bg-lime-300 rounded-2xl p-6 shadow-lg">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                            🎮 <span className="ml-2">Daily Games</span>
                        </h3>
                        <div className="space-y-4">
                            {data.games.map((game, index) => (
                                <GameCard key={`game-${index}`} game={game} />
                            ))}
                        </div>
                    </div>

                    {/* Educational Content */}
                    <div className="space-y-4">
                        {data.educationalContent.map((content) => (
                            <InformationSection key={content.id} content={content} />
                        ))}
                    </div>
                </aside>
            </div>
        </div>
    );
}

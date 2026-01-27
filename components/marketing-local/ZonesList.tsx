'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Search, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Script from 'next/script';

const ZONES_DATA = [
    { id: 1, cities: ["Belvidere", "Hampshire", "Marengo"] },
    { id: 2, cities: ["Harvard", "Woodstock", "McHenry"] },
    { id: 3, cities: ["Crystal Lake", "Algonquin", "Lake in the Hills"] },
    { id: 4, cities: ["Huntley", "Lake in the Hills", "Gilberts"] },
    { id: 5, cities: ["Elgin", "West Dundee", "Carpentersville"] },
    { id: 6, cities: ["Pingree Grove", "Sugar Grove", "St. Charles"] },
    { id: 7, cities: ["West Chicago", "Wheaton", "Glen Ellyn"] },
    { id: 8, cities: ["Carol Stream", "Glendale Heights", "Bloomingdale"] },
    { id: 9, cities: ["Barrington", "Lake Zurich", "Palatine"] },
    { id: 10, cities: ["Wheeling", "Prospect Heights", "Mount Prospect"] },
    { id: 11, cities: ["Roselle", "Itasca", "Wood Dale"] },
    { id: 12, cities: ["Villa Park", "Addison", "Bensenville"] },
    { id: 13, cities: ["Des Plaines", "Park Ridge", "Norridge"] },
    { id: 14, cities: ["Northbrook", "Glenview", "Deerfield"] },
    { id: 15, cities: ["Round Lake", "Libertyville", "Lake Villa"] },
    { id: 16, cities: ["Northfield", "Wilmette", "Evanston"] },
    { id: 17, cities: ["Lake Forest", "Glencoe", "Highland Park"] },
    { id: 18, cities: ["Morton Grove", "Skokie", "Lincolnwood"] },
    { id: 19, cities: ["Lake Zurich", "Long Grove", "Buffalo Grove"] },
];

export const ZONES_OPTIONS = ZONES_DATA.map(z => ({
    value: `Zona ${z.id}`,
    label: `Zona ${z.id}: ${z.cities.join(', ')}`
}));


export default function ZonesList() {
    const t = useTranslations('LocalMarketingPage.zones');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedZoneIds, setSelectedZoneIds] = useState<number[]>([]);

    const filteredZones = ZONES_DATA.filter(zone =>
        zone.cities.some(city => city.toLowerCase().includes(searchTerm.toLowerCase())) ||
        `zona ${zone.id}`.includes(searchTerm.toLowerCase())
    );

    const toggleSelection = (id: number) => {
        setSelectedZoneIds(prev =>
            prev.includes(id)
                ? prev.filter(zid => zid !== id)
                : [...prev, id]
        );
    };

    const getMapLink = () => {
        if (selectedZoneIds.length === 0) {
            return "https://www.google.com/maps/search/?api=1&query=Chicago+Northwest+Suburbs+Illinois";
        }
        const firstZone = ZONES_DATA.find(z => z.id === selectedZoneIds[0]);
        if (!firstZone) return "#";
        const query = firstZone.cities.map(c => `${c}, IL`).join('+');
        return `https://www.google.com/maps/search/?api=1&query=${query}`;
    };

    return (
        <section id="zones-list" className="bg-slate-900 py-20">
            <div className="container px-4 mx-auto max-w-7xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                        {t('title')}
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto mb-8">
                        {t('subtitle')}
                    </p>

                    {/* Search Bar */}
                    <div className="relative max-w-md mx-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        <input
                            type="text"
                            placeholder={t('searchPlaceholder')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-slate-950 border border-slate-700 rounded-full text-white focus:outline-none focus:border-cyan-500 transition-colors"
                        />
                    </div>
                </div>

                {/* Updated Grid layout: 7-7-5 on large screens */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-12">
                    <AnimatePresence>
                        {filteredZones.map((zone) => (
                            <motion.div
                                key={zone.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                onClick={() => toggleSelection(zone.id)}
                                className={`
                                    p-3 rounded-lg border transition-all cursor-pointer group text-center
                                    ${selectedZoneIds.includes(zone.id)
                                        ? 'bg-cyan-950/40 border-cyan-500 text-cyan-100'
                                        : 'bg-slate-800/40 border-slate-700 text-slate-400 hover:border-slate-500'}
                                `}
                            >
                                <div className={`text-[10px] font-black uppercase tracking-tighter mb-1 ${selectedZoneIds.includes(zone.id) ? 'text-cyan-400' : 'text-slate-500'}`}>
                                    {t('zoneLabel')} {zone.id}
                                </div>
                                <p className="text-[11px] leading-tight font-medium">
                                    {zone.cities[0]}<br />
                                    <span className="opacity-60 text-[9px]">{zone.cities[1]} / {zone.cities[2]}</span>
                                </p>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filteredZones.length === 0 && (
                    <div className="col-span-full text-center py-10 bg-slate-900/50 rounded-2xl border border-slate-800">
                        <p className="text-slate-400">{t('noResults')}</p>
                    </div>
                )}

                {/* Elfsight Store Locator Map */}
                <div className="max-w-5xl mx-auto mt-12">
                    <Script src="https://elfsightcdn.com/platform.js" async />
                    <div className="elfsight-app-3fb2054a-7374-4070-a239-8d674f4d9d57" data-elfsight-app-lazy></div>
                </div>

                <div className="text-center mt-12">
                    <p className="text-slate-500 text-sm">
                        {t('requestZone')}
                    </p>
                </div>
            </div>
        </section>
    );
}

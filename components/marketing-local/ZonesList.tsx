'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Search, MapPin, X, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const ZONES_DATA = [
    { id: 1, cities: ["Belvidere", "Hampshire", "Marengo"], image: "/images/RUTA 1.jpg" },
    { id: 2, cities: ["Harvard", "Woodstock", "McHenry"], image: "/images/RUTA 2.jpg" },
    { id: 3, cities: ["Crystal Lake", "Algonquin", "Lake in the Hills"], image: "/images/RUTA 3.jpg" },
    { id: 4, cities: ["Huntley", "Lake in the Hills", "Gilberts"], image: "/images/RUTA 4.jpg" },
    { id: 5, cities: ["Elgin", "West Dundee", "Carpentersville"], image: "/images/RUTA 5.jpg" },
    { id: 6, cities: ["Pingree Grove", "Sugar Grove", "St. Charles"], image: "/images/RUTA 6.jpg" },
    { id: 7, cities: ["West Chicago", "Wheaton", "Glen Ellyn"], image: "/images/RUTA 7.jpg" },
    { id: 8, cities: ["Carol Stream", "Glendale Heights", "Bloomingdale"], image: "/images/RUTA 8.jpg" },
    { id: 9, cities: ["Barrington", "Lake Zurich", "Palatine"], image: "/images/RUTA 9.jpg" },
    { id: 10, cities: ["Wheeling", "Prospect Heights", "Mount Prospect"], image: "/images/RUTA 10.jpg" },
    { id: 11, cities: ["Roselle", "Itasca", "Wood Dale"], image: "/images/RUTA 11.jpg" },
    { id: 12, cities: ["Villa Park", "Addison", "Bensenville"], image: "/images/RUTA 12.jpg" },
    { id: 13, cities: ["Des Plaines", "Park Ridge", "Norridge"], image: "/images/RUTA 13.jpg" },
    { id: 14, cities: ["Northbrook", "Glenview", "Deerfield"], image: "/images/RUTA 14.jpg" },
    { id: 15, cities: ["Round Lake", "Libertyville", "Lake Villa"], image: "/images/RUTA 15.jpg" },
    { id: 16, cities: ["Northfield", "Wilmette", "Evanston"], image: "/images/RUTA 16.jpg" },
    { id: 17, cities: ["Lake Forest", "Glencoe", "Highland Park"], image: "/images/RUTA 17.jpg" },
    { id: 18, cities: ["Morton Grove", "Skokie", "Lincolnwood"], image: "/images/RUTA 18.jpg" },
    { id: 19, cities: ["Lake Zurich", "Long Grove", "Buffalo Grove"], image: "/images/RUTA 19.jpg" },
    { id: 20, cities: ["Vernon Hills", "Mundelein", "Libertyville"], image: "/images/RUTA 20.jpg" },
];

export const ZONES_OPTIONS = ZONES_DATA.map(z => ({
    value: `Zona ${z.id}`,
    label: `Zona ${z.id}: ${z.cities.join(', ')}`
}));


export default function ZonesList() {
    const t = useTranslations('LocalMarketingPage.zones');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMap, setSelectedMap] = useState<string | null>(null);

    const filteredZones = ZONES_DATA.filter(zone =>
        zone.cities.some(city => city.toLowerCase().includes(searchTerm.toLowerCase())) ||
        `zona ${zone.id}`.includes(searchTerm.toLowerCase())
    );

    // Prevent scroll when modal is open
    useEffect(() => {
        if (selectedMap) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [selectedMap]);

    return (
        <section id="zones-list" className="bg-slate-900 py-20 relative">
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

                {/* Grid Layout for Zones */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3 mb-12">
                    <AnimatePresence>
                        {filteredZones.map((zone) => (
                            <motion.div
                                key={zone.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                onClick={() => setSelectedMap(zone.image)}
                                className="group relative p-3 rounded-xl border border-slate-800 bg-slate-950/40 hover:border-cyan-500/50 hover:bg-slate-900 transition-all cursor-pointer text-center"
                            >
                                <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-cyan-400 mb-1 transition-colors">
                                    {t('zoneLabel')} {zone.id}
                                </div>
                                <p className="text-xs font-medium text-slate-300 group-hover:text-white leading-tight">
                                    {zone.cities[0]}<br />
                                    <span className="opacity-50 text-[10px]">{zone.cities[1]} / {zone.cities[2]}</span>
                                </p>

                                {/* Hover Indicator */}
                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ZoomIn className="w-4 h-4 text-cyan-500" />
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filteredZones.length === 0 && (
                    <div className="w-full text-center py-10 bg-slate-900/50 rounded-2xl border border-slate-800">
                        <p className="text-slate-400">{t('noResults')}</p>
                    </div>
                )}

                <div className="text-center mt-12">
                    <p className="text-slate-500 text-sm">
                        {t('requestZone')}
                    </p>
                </div>
            </div>

            {/* Modal Viewer */}
            <AnimatePresence>
                {selectedMap && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-slate-950/90 backdrop-blur-sm"
                        onClick={() => setSelectedMap(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-5xl w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="absolute top-4 right-4 z-10">
                                <button
                                    onClick={() => setSelectedMap(null)}
                                    className="p-2 bg-slate-950/50 border border-slate-700/50 rounded-full text-white hover:bg-white hover:text-slate-950 transition-all"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Map Image Container */}
                            <div className="relative aspect-[4/3] w-full bg-slate-950">
                                <Image
                                    src={selectedMap}
                                    alt="Zone Map"
                                    fill
                                    className="object-contain p-2 md:p-4"
                                    priority
                                />
                            </div>

                            {/* Modal Footer/Label */}
                            <div className="p-4 bg-slate-900 border-t border-slate-800 text-center">
                                <p className="text-slate-400 text-sm">
                                    {t('mapDescription') || 'Mapa detallado de la zona de distribución'}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

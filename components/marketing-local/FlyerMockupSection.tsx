'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { QrCode, Phone } from 'lucide-react';

export default function FlyerMockupSection() {
    const t = useTranslations('LocalMarketingPage.flyerMockup');

    const totalSlots = 17;
    // Generate slots
    const slots = Array.from({ length: totalSlots }, (_, i) => ({
        id: i,
        isSponsor: i === 12, // One sponsor in the right group
    }));

    const leftSlots = slots.slice(0, 8); // 8 Business slots
    const rightSlots = slots.slice(8, 17); // 9 Business slots

    return (
        <section className="bg-slate-950 py-24 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container px-4 mx-auto relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                        {t('title')}
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        {t('subtitle')}
                    </p>
                </div>

                {/* The Flyer Visual - Replaced with actual images */}
                <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex-1 bg-white p-2 rounded-2xl shadow-2xl border border-white/10 overflow-hidden group"
                    >
                        <div className="relative overflow-hidden rounded-xl bg-slate-100">
                            <img
                                src="/images/EDDM-SHARED-1.gif"
                                alt="Flyer Front - EDDM Shared"
                                className="w-full h-auto object-contain group-hover:scale-[1.02] transition-transform duration-500"
                            />
                            <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                                Front Side
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex-1 bg-white p-2 rounded-2xl shadow-2xl border border-white/10 overflow-hidden group"
                    >
                        <div className="relative overflow-hidden rounded-xl bg-slate-100">
                            <img
                                src="/images/EDDM-SHARED-2.gif"
                                alt="Flyer Back - EDDM Shared"
                                className="w-full h-auto object-contain group-hover:scale-[1.02] transition-transform duration-500"
                            />
                            <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                                Back Side
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="text-center mt-8">
                    <p className="inline-block bg-red-900/30 border border-red-900/50 text-red-200 px-4 py-2 rounded-full text-sm font-medium">
                        ⚠️ {t('note')}
                    </p>
                </div>
            </div>
        </section>
    );
}

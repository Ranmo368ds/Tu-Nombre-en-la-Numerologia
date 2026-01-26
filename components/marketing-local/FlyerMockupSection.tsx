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

                {/* The Flyer Visual */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-6xl mx-auto bg-white p-2 sm:p-4 lg:p-6 rounded-xl shadow-2xl overflow-hidden"
                >
                    {/* Flyer Header Mockup */}
                    <div className="bg-red-700 text-white p-4 text-center rounded-t-md mb-4 uppercase font-black tracking-widest text-xl sm:text-3xl shadow-sm">
                        Deals of the Month / Ofertas Locales
                    </div>

                    {/* Split Layout Container */}
                    <div className="flex flex-col lg:flex-row gap-4 bg-slate-100 p-2 sm:p-4 rounded-b-md">

                        {/* LEFT COLUMN: 8 Items + QR (Visual Grid 3x3) */}
                        {/* Structure: Row 1 (2 items + QR), Row 2 (3 items), Row 3 (3 items) */}
                        <div className="flex-1 grid grid-cols-3 gap-2 sm:gap-3 content-start">
                            {/* Render first 2 items */}
                            {leftSlots.slice(0, 2).map((slot) => (
                                <div key={slot.id} className="relative bg-white border border-slate-200 border-dashed rounded-lg p-1 sm:p-2 flex flex-col items-center justify-center text-center shadow-sm aspect-square hover:shadow-md transition-shadow overflow-hidden">
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-slate-100 rounded-full mb-1 flex items-center justify-center text-slate-300">
                                        <span className="text-[4px] sm:text-[6px] font-bold">LOGO</span>
                                    </div>
                                    <div className="text-[9px] sm:text-xl font-black text-slate-900 leading-none px-1 uppercase tracking-tighter scale-y-110">
                                        {t('yourBusinessHere')}
                                    </div>
                                    <div className="text-[8px] sm:text-lg font-extrabold text-red-600 mb-0.5 uppercase tracking-wide leading-tight">
                                        {t(`items.${slot.id}` as any)}
                                    </div>
                                    <div className="w-8 h-0.5 bg-slate-100 rounded mb-0.5"></div>
                                    <QrCode className="w-4 h-4 sm:w-5 sm:h-5 text-slate-200" />
                                </div>
                            ))}

                            {/* THE QR BLOCK (3rd spot in first row) */}
                            <div className="relative bg-white border border-slate-200 rounded-lg p-1 flex flex-col items-center justify-between text-center shadow-sm aspect-square overflow-hidden">
                                {/* Postal Indicia Image */}
                                <div className="w-full border-b border-slate-100 pb-1 mb-1">
                                    <img
                                        src="/images/marketing-local-ecrwss.png"
                                        alt="ECRWSS Postal Customer"
                                        className="w-full h-auto object-contain px-1"
                                    />
                                </div>
                                <QrCode className="w-10 h-10 sm:w-12 sm:h-12 text-slate-800" />
                                <div className="text-[4px] sm:text-[5px] text-slate-400 leading-none">genesmarketing.com</div>
                            </div>

                            {/* Render remaining 6 items */}
                            {leftSlots.slice(2, 8).map((slot) => (
                                <div key={slot.id} className="relative bg-white border border-slate-200 border-dashed rounded-lg p-1 sm:p-2 flex flex-col items-center justify-center text-center shadow-sm aspect-square hover:shadow-md transition-shadow overflow-hidden">
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-slate-100 rounded-full mb-1 flex items-center justify-center text-slate-300">
                                        <span className="text-[4px] sm:text-[6px] font-bold">LOGO</span>
                                    </div>
                                    <div className="text-[9px] sm:text-xl font-black text-slate-900 leading-none px-1 uppercase tracking-tighter scale-y-110">
                                        {t('yourBusinessHere')}
                                    </div>
                                    <div className="text-[8px] sm:text-lg font-extrabold text-red-600 mb-0.5 uppercase tracking-wide leading-tight">
                                        {t(`items.${slot.id}` as any)}
                                    </div>
                                    <div className="w-8 h-0.5 bg-slate-100 rounded mb-0.5"></div>
                                    <QrCode className="w-4 h-4 sm:w-5 sm:h-5 text-slate-200" />
                                </div>
                            ))}
                        </div>

                        {/* Divider Line (Visual) */}
                        <div className="hidden lg:block w-px bg-slate-300 my-2"></div>

                        {/* RIGHT COLUMN: 9 Items (3 cols x 3 rows) */}
                        <div className="flex-1 grid grid-cols-3 gap-2 sm:gap-3 content-start">
                            {rightSlots.map((slot) => (
                                <div
                                    key={slot.id}
                                    className={`
                                        relative bg-white border rounded-lg p-1 sm:p-2 flex flex-col items-center justify-center text-center shadow-sm aspect-square hover:shadow-md transition-shadow overflow-hidden
                                        ${slot.isSponsor ? 'border-yellow-400 ring-2 ring-yellow-400/20 bg-yellow-50/50' : 'border-slate-200 border-dashed'}
                                    `}
                                >
                                    {slot.isSponsor && (
                                        <span className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-[6px] sm:text-[8px] font-bold px-1.5 py-0.5 rounded-bl-md z-10">
                                            ★
                                        </span>
                                    )}

                                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-slate-100 rounded-full mb-1 flex items-center justify-center text-slate-300">
                                        <span className="text-[4px] sm:text-[6px] font-bold">LOGO</span>
                                    </div>
                                    <div className="text-[9px] sm:text-xl font-black text-slate-900 leading-none px-1 uppercase tracking-tighter scale-y-110">
                                        {t('yourBusinessHere')}
                                    </div>
                                    <div className="text-[8px] sm:text-lg font-extrabold text-red-600 mb-0.5 uppercase tracking-wide leading-tight">
                                        {t(`items.${slot.id}` as any)}
                                    </div>
                                    <QrCode className={`w-4 h-4 sm:w-5 sm:h-5 ${slot.isSponsor ? 'text-slate-800' : 'text-slate-200'}`} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer Strip */}
                    <div className="mt-4 text-center text-[10px] text-slate-400 font-mono uppercase tracking-widest">
                        Genes Marketing • Local Distribution • genesmarketing.com
                    </div>
                </motion.div>

                <div className="text-center mt-8">
                    <p className="inline-block bg-red-900/30 border border-red-900/50 text-red-200 px-4 py-2 rounded-full text-sm font-medium">
                        ⚠️ {t('note')}
                    </p>
                </div>
            </div>
        </section>
    );
}

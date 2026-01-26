'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export default function PinterestBonus() {
    const t = useTranslations('LocalMarketingPage.pinterestBonus');

    const scrollToForm = () => {
        const element = document.getElementById('booking-form');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="bg-gradient-to-br from-red-950 via-slate-950 to-slate-950 py-24 relative overflow-hidden">
            {/* Abstract Pinterest Logo / Ping Effect */}
            <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[100px]" />

            <div className="container px-4 mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Text Content */}
                    <div className="flex-1 text-center lg:text-left">
                        <span className="inline-block text-red-400 font-bold tracking-widest uppercase text-sm mb-4 border border-red-900/50 bg-red-950/30 px-3 py-1 rounded-full">
                            Bonus Included
                        </span>
                        <h2 className="text-3xl lg:text-5xl font-extrabold text-white mb-6 leading-tight flex flex-wrap items-center justify-center lg:justify-start gap-x-3">
                            <span>{t('title').split('Pinterest')[0]}</span>
                            <span className="inline-flex items-center gap-2">
                                <img
                                    src="/images/pinterest-seeklogo.png"
                                    alt="Pinterest"
                                    className="h-10 lg:h-14 w-auto object-contain drop-shadow-[0_0_15px_rgba(230,0,35,0.4)] -mb-1"
                                />
                                Pinterest
                            </span>
                            <span>{t('title').split('Pinterest')[1]}</span>
                        </h2>
                        <p className="text-slate-300 text-lg mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                            {t('description')}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 max-w-lg mx-auto lg:mx-0">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="flex items-start gap-3 bg-red-950/20 border border-red-900/30 p-3 rounded-lg">
                                    <CheckCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                    <span className="text-slate-200 text-sm font-medium">
                                        {t(`features.item${i}` as any)}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={scrollToForm}
                            className="bg-white text-red-700 hover:bg-slate-100 font-bold py-4 px-8 rounded-full shadow-xl shadow-red-900/20 transition-all transform hover:scale-105"
                        >
                            {t('cta')}
                        </button>
                    </div>

                    {/* Visual Mockup (Pinterest Card) */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="flex-1 w-full max-w-md lg:max-w-lg"
                    >
                        <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-2xl relative rotate-3 hover:rotate-0 transition-transform duration-500">
                            {/* Fake Pin UI */}
                            <div className="rounded-2xl overflow-hidden mb-4 relative aspect-[2/3] bg-slate-800 group/pin">
                                <img
                                    src="/Instinto Saludable/Roofing.png"
                                    alt="Roofing Pinterest Pin"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/pin:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6">
                                    <h3 className="text-white text-2xl font-black mb-2 leading-tight drop-shadow-md">
                                        Roofing Services in Chicago
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white text-[10px] font-bold">G</div>
                                        <span className="text-slate-200 text-sm font-semibold">Genes Marketing</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center text-slate-400 text-sm px-2">
                                <span>👀 12k views</span>
                                <div className="bg-red-600 text-white px-4 py-2 rounded-full font-bold text-xs">Save</div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}

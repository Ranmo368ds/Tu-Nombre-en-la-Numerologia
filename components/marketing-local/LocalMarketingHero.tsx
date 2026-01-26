'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { CheckCircle, Star } from 'lucide-react';

export default function LocalMarketingHero() {
    const t = useTranslations('LocalMarketingPage.hero');

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative overflow-hidden bg-slate-950 py-20 lg:py-32">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px]" />
                <div className="absolute top-[20%] left-[20%] w-[300px] h-[300px] bg-slate-800/30 rounded-full blur-[80px]" />
            </div>

            {/* Top Navigation Bar */}
            <div className="absolute top-0 left-0 w-full z-50 p-6">
                <div className="relative flex items-center justify-center w-full">
                    {/* Logo - Centered */}
                    <div className="flex-shrink-0">
                        <img
                            src="/images/GENES-MARKETING-COLOR.png"
                            alt="Genes Marketing"
                            className="h-16 sm:h-24 w-auto object-contain drop-shadow-xl"
                        />
                    </div>

                    {/* Language Switcher - Absolute Right */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-3 text-white font-bold tracking-wide text-xs sm:text-base bg-slate-900/80 backdrop-blur-sm px-3 py-2 sm:px-4 rounded-full border border-slate-700/50 shadow-lg">
                        <a href="/es/localmarketing" className="hover:text-cyan-400 transition-colors">ES</a>
                        <span className="text-slate-500">|</span>
                        <a href="/en/localmarketing" className="hover:text-cyan-400 transition-colors">EN</a>
                    </div>
                </div>
            </div>

            <div className="container relative z-10 px-4 mx-auto text-center lg:text-left pt-20">
                <div className="max-w-4xl mx-auto lg:mx-0">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-semibold text-cyan-300 bg-cyan-950/30 border border-cyan-800 rounded-full"
                    >
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        {t('badge')}
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl font-extrabold tracking-tight text-white mb-6 lg:text-6xl lg:leading-tight"
                    >
                        {t('title')}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg text-slate-300 mb-8 max-w-2xl leading-relaxed mx-auto lg:mx-0"
                    >
                        {t('subtitle')}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col gap-4 text-left max-w-lg mx-auto lg:mx-0 mb-10"
                    >
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                            <span className="text-slate-200">{t('features.item1')}</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                            <span className="text-slate-200">{t('features.item2')}</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                            <span className="text-slate-200 font-semibold text-cyan-300">{t('features.item3')}</span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                    >
                        <button
                            onClick={() => scrollToSection('booking-form')}
                            className="px-8 py-4 text-lg font-bold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors shadow-lg hover:shadow-red-900/20"
                        >
                            {t('ctaPrimary')}
                        </button>
                        <button
                            onClick={() => scrollToSection('zones-list')}
                            className="px-8 py-4 text-lg font-semibold text-white bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 transition-all hover:border-slate-500"
                        >
                            {t('ctaSecondary')}
                        </button>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="mt-8 text-sm text-slate-500 font-medium"
                    >
                        {t('trust')}
                    </motion.p>
                </div>
            </div>
        </section>
    );
}

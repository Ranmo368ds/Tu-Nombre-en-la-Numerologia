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

            <div className="container relative z-10 px-4 mx-auto pt-20">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    {/* Left Column: Content */}
                    <div className="lg:w-1/2 text-center lg:text-left">
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
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
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

                    {/* Right Column: Big Text Visual */}
                    <div className="lg:w-1/2 flex flex-col items-center justify-center text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.7, type: 'spring' }}
                            className="relative"
                        >
                            <div className="text-yellow-400 font-black leading-tight uppercase select-none">
                                <div className="text-6xl sm:text-7xl lg:text-8xl filter drop-shadow-[0_0_30px_rgba(250,204,21,0.3)]">
                                    10,000
                                </div>
                                <div className="text-4xl sm:text-5xl lg:text-7xl">
                                    VOLANTES
                                </div>
                                <div className="text-3xl sm:text-4xl lg:text-6xl mt-2 text-white">
                                    POR
                                </div>
                                <div className="text-7xl sm:text-8xl lg:text-[10rem] text-red-600 font-black mt-[-10px] filter drop-shadow-[0_0_40px_rgba(220,38,38,0.4)]">
                                    $390
                                </div>
                            </div>

                            {/* New subtext below pricing */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1 }}
                                className="mt-6 flex flex-col items-center gap-4"
                            >
                                <div className="text-white font-bold text-xl lg:text-2xl border-y border-white/10 py-3 px-6 bg-white/5 rounded-xl backdrop-blur-sm">
                                    {t('volaSub')}
                                </div>

                                <div className="text-slate-400 text-sm max-w-sm italic">
                                    {t('subHeadline')}
                                </div>

                                {/* WhatsApp Pulsating Button */}
                                <a
                                    href="https://wa.me/18475029685"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative flex items-center justify-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full font-black text-lg shadow-xl hover:shadow-[#25D366]/40 transition-all hover:scale-105 active:scale-95 animate-whatsapp-pulse"
                                >
                                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                    </svg>
                                    {t('whatsapp_cta')}
                                </a>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

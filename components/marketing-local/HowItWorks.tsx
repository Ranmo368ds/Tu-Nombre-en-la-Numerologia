'use client';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { MapPin, LayoutTemplate, Smartphone } from 'lucide-react';
import BookingForm from './BookingForm';

export default function HowItWorks() {
    const t = useTranslations('LocalMarketingPage.howItWorks');

    const steps = [
        {
            icon: <MapPin className="w-10 h-10 text-cyan-400" />,
            titleKey: 'step1.title',
            descKey: 'step1.description'
        },
        {
            icon: <LayoutTemplate className="w-10 h-10 text-cyan-400" />,
            titleKey: 'step2.title',
            descKey: 'step2.description'
        },
        {
            icon: <Smartphone className="w-10 h-10 text-cyan-400" />,
            titleKey: 'step3.title',
            descKey: 'step3.description'
        }
    ];

    return (
        <section className="bg-slate-900 py-20 border-t border-slate-800" id="how-it-works">
            <div className="container px-4 mx-auto">
                <div className="flex flex-col lg:flex-row gap-16 items-start">
                    {/* Left Column: Title and Steps */}
                    <div className="lg:w-1/2">
                        <div className="mb-12">
                            <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
                                {t('title')}
                            </h2>
                            <p className="text-xl text-slate-400 leading-relaxed">
                                {t('note')}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            {steps.map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="bg-slate-950 p-6 rounded-2xl border border-slate-800 hover:border-cyan-900/50 transition-all group flex items-start gap-6"
                                >
                                    <div className="bg-slate-900 w-16 h-16 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-cyan-900/10">
                                        <div className="w-8 h-8">
                                            {step.icon}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">
                                            {t(step.titleKey)}
                                        </h3>
                                        <p className="text-slate-400 leading-relaxed">
                                            {t(step.descKey)}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <div className="lg:w-1/2 w-full sticky top-24" id="booking-form-section">
                        <div className="bg-slate-950 p-1 rounded-3xl border border-white/5 shadow-2xl relative">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-[2rem] opacity-20 blur group-hover:opacity-40 transition duration-1000"></div>
                            <div className="relative bg-slate-950 rounded-[1.8rem] overflow-hidden">
                                <BookingForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

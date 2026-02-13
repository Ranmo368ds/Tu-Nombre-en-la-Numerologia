"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Phone, Mail, Clock, MapPin } from "lucide-react";

export default function JuansonsContact() {
    const t = useTranslations("JuansonsLandscaping.contact");
    const topBarT = useTranslations("JuansonsLandscaping.topBar");

    return (
        <section id="contact" className="relative py-24 overflow-hidden">
            {/* Background with Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-fixed"
                style={{ backgroundImage: 'url("/images/juansons/retaining_wall.png")' }}
            >
                <div className="absolute inset-0 bg-[#2d6a4f]/90 transition-colors duration-500"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 items-stretch">
                    {/* Info Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:w-1/3 text-white flex flex-col justify-center"
                    >
                        <span className="text-[#91ad41] font-extrabold uppercase tracking-[0.2em] text-sm mb-4 block">
                            GET IN TOUCH
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-none mb-8">
                            {t("title")}
                        </h2>
                        <div className="w-20 h-1.5 bg-[#91ad41] mb-12"></div>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-white/10 flex items-center justify-center rounded-none shrink-0 border border-white/20">
                                    <Phone className="w-6 h-6 text-[#91ad41]" />
                                </div>
                                <div>
                                    <span className="block text-xs font-bold text-[#91ad41] uppercase tracking-widest mb-1">Call Us</span>
                                    <a href={`tel:${topBarT("phone1")}`} className="text-xl font-bold hover:text-[#91ad41] transition-colors">{topBarT("phone1")}</a>
                                    <a href={`tel:${topBarT("phone2")}`} className="block text-xl font-bold hover:text-[#91ad41] transition-colors">{topBarT("phone2")}</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-white/10 flex items-center justify-center rounded-none shrink-0 border border-white/20">
                                    <Mail className="w-6 h-6 text-[#91ad41]" />
                                </div>
                                <div>
                                    <span className="block text-xs font-bold text-[#91ad41] uppercase tracking-widest mb-1">Email Us</span>
                                    <a href={`mailto:${topBarT("email")}`} className="text-xl font-bold hover:text-[#91ad41] transition-colors">{topBarT("email")}</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-white/10 flex items-center justify-center rounded-none shrink-0 border border-white/20">
                                    <Clock className="w-6 h-6 text-[#91ad41]" />
                                </div>
                                <div>
                                    <span className="block text-xs font-bold text-[#91ad41] uppercase tracking-widest mb-1">Working Hours</span>
                                    <span className="text-lg font-bold">{t("info.schedule")}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Form Side */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="lg:w-2/3 bg-white p-8 md:p-12 shadow-2xl relative"
                    >
                        {/* Slant Accent */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#91ad41] -z-10 -mr-4 -mt-4 hidden md:block"></div>

                        <div className="mb-10 text-[#222222]">
                            <h3 className="text-2xl font-black uppercase tracking-tight">{t("subtitle")}</h3>
                        </div>

                        {/* Elfsight Contact Form */}
                        <div className="elfsight-app-f0d7feef-1b62-4b01-8f03-24f8ef7b9652" data-elfsight-app-lazy></div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

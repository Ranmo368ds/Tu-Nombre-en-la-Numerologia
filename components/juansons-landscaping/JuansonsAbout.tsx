"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { CheckCircle2, Award, Users, Calendar } from "lucide-react";

export default function JuansonsAbout() {
    const t = useTranslations("JuansonsLandscaping.about");

    const stats = [
        { label: t("stats.years"), value: "10+", icon: <Calendar className="w-5 h-5" /> },
        { label: t("stats.projects"), value: "500+", icon: <Award className="w-5 h-5" /> },
        { label: t("stats.clients"), value: "300+", icon: <Users className="w-5 h-5" /> },
    ];

    return (
        <section id="about" className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:w-1/2 relative"
                    >
                        <div className="relative z-10">
                            <img
                                src="/JUAN & SONS/PICS/Artboard 1.png"
                                alt="Juanson's Landscaping Team"
                                className="w-full h-auto shadow-2xl grayscale-[10%] hover:grayscale-0 transition-all duration-700 relative z-10"
                            />
                            {/* Decorative Frame - Shifted to avoid top-left overlap */}
                            <div className="absolute top-6 left-6 w-full h-full border-8 border-[#91ad41] -z-10 hidden md:block"></div>
                        </div>

                        {/* Experience Badge - Added z-index and refined padding */}
                        <div className="absolute -top-10 -left-10 bg-white p-6 shadow-2xl hidden md:block border-t-4 border-[#91ad41] z-20">
                            <img src="/images/juansons/logo_small.png" alt="Logo" className="w-24 mb-4" />
                            <div className="flex flex-col">
                                <span className="text-4xl font-black text-[#2d6a4f] leading-none">10+</span>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">{t("stats.years")}</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Text Side */}
                    <div className="lg:w-1/2">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-[#91ad41] font-extrabold uppercase tracking-[0.2em] text-sm"
                        >
                            {t("subtitle")}
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-black text-[#222222] mt-4 uppercase tracking-tight leading-tight"
                        >
                            {t("title")}
                        </motion.h2>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="w-20 h-1.5 bg-[#91ad41] my-8"
                        ></motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="text-gray-600 text-lg leading-relaxed mb-8 italic font-medium"
                        >
                            &quot;{t("text")}&quot;
                        </motion.p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                            {[
                                "Commercial & Residential",
                                "Professional Equipment",
                                "Licensed & Insured",
                                "Free Estimates"
                            ].map((item) => (
                                <motion.div
                                    key={item}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="flex items-center gap-3"
                                >
                                    <CheckCircle2 className="w-5 h-5 text-[#91ad41]" />
                                    <span className="text-sm font-bold text-[#222222] uppercase tracking-wide">{item}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Stats Row */}
                        <div className="flex flex-wrap gap-8 pt-8 border-t border-gray-100">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 + index * 0.1 }}
                                    className="flex items-center gap-4"
                                >
                                    <div className="w-12 h-12 bg-gray-50 text-[#91ad41] flex items-center justify-center rounded-none shadow-sm">
                                        {stat.icon}
                                    </div>
                                    <div>
                                        <span className="block text-2xl font-black text-[#222222] leading-none">{stat.value}</span>
                                        <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{stat.label}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Text Overlay - Hidden on mobile, clamped on desktop */}
            <div className="absolute top-0 right-0 text-[200px] font-black text-gray-50 -z-10 select-none pointer-events-none translate-x-1/4 -translate-y-1/4 uppercase tracking-tighter opacity-50 hidden xl:block overflow-hidden">
                JUAN & SONS
            </div>
        </section>
    );
}

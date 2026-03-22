"use client";

import React from "react";
import Image from "next/image";
import { Link } from "@/src/i18n/routing";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Wind, Thermometer, ShieldCheck, Zap, ArrowRight, CheckCircle2 } from "lucide-react";

export default function HvacHero() {
    const t = useTranslations("HVACPage");

    return (
        <section className="relative min-h-[85vh] flex items-center pt-24 pb-20 px-6 overflow-hidden">
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col gap-8"
                >
                    <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full w-fit">
                        <Wind className="w-4 h-4 text-blue-400" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">HVAC Vertical Scale System</span>
                    </div>

                    <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.9]">
                        {t("title")}
                    </h1>

                    <p className="text-xl text-white/50 leading-relaxed font-medium max-w-xl">
                        {t("subtitle")}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5 mt-4">
                        <Link href="/contact" className="px-10 py-6 bg-blue-600 hover:bg-blue-500 rounded-[2rem] font-black text-sm uppercase tracking-widest text-center transition-all shadow-2xl shadow-blue-600/20 flex items-center justify-center gap-3 group">
                            {t("cta_button")} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="flex flex-wrap gap-8 mt-4 pt-8 border-t border-white/5">
                        {[
                            { val: "2.4x", label: "Avg. ROI" },
                            { val: "24/7", label: "System Support" },
                            { val: "100%", label: "Lead Control" }
                        ].map((stat, i) => (
                            <div key={i} className="flex flex-col">
                                <span className="text-2xl font-black text-white italic">{stat.val}</span>
                                <span className="text-[9px] font-black uppercase tracking-widest text-white/20">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <div className="relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="relative aspect-square bg-gradient-to-br from-blue-600/10 to-transparent border border-white/5 rounded-[4rem] flex items-center justify-center p-12 backdrop-blur-3xl overflow-hidden"
                    >
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent z-10" />
                        <div className="grid grid-cols-2 gap-6 w-full relative z-20">
                            {[
                                { icon: Wind, label: "Air Flow", color: "text-blue-400" },
                                { icon: Thermometer, label: "Climate", color: "text-orange-400" },
                                { icon: Zap, label: "Efficiency", color: "text-yellow-400" },
                                { icon: ShieldCheck, label: "Authority", color: "text-green-400" }
                            ].map((item, idx) => (
                                <div key={idx} className="p-6 bg-black/40 border border-white/5 rounded-3xl flex flex-col items-center gap-4 hover:border-white/20 transition-all group">
                                    <item.icon className={`w-10 h-10 ${item.color} group-hover:scale-110 transition-transform`} />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                    {/* Floating Aura */}
                    <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
                    <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-400/10 rounded-full blur-[120px] pointer-events-none" />
                </div>
            </div>
        </section>
    );
}

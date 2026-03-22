"use client";

import React from "react";
import Image from "next/image";
import { Link } from "@/src/i18n/routing";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Paintbrush, Home, Building2, Shield, ArrowRight, CheckCircle2 } from "lucide-react";

export default function PaintingHero() {
    const t = useTranslations("Navigation");

    return (
        <section className="relative min-h-[85vh] flex items-center pt-24 pb-20 px-6 overflow-hidden">
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col gap-8"
                >
                    <div className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full w-fit">
                        <Paintbrush className="w-4 h-4 text-indigo-400" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">Premium Painting Lead Engine</span>
                    </div>

                    <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.9]">
                        Scale Your Painting Business <span className="text-indigo-500">Fast</span>
                    </h1>

                    <p className="text-xl text-white/50 leading-relaxed font-medium max-w-xl">
                        Stop bidding against 5 other companies. Connect with homeowners looking for quality, professional painting services in your area.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5 mt-4">
                        <Link href="/contact" className="px-10 py-6 bg-indigo-600 hover:bg-indigo-500 rounded-[2rem] font-black text-sm uppercase tracking-widest text-center transition-all shadow-2xl shadow-indigo-600/20 flex items-center justify-center gap-3 group">
                            Get Painting Leads <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </motion.div>

                <div className="relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="relative aspect-square bg-gradient-to-br from-indigo-600/10 to-transparent border border-white/5 rounded-[4rem] flex items-center justify-center p-12 backdrop-blur-3xl overflow-hidden"
                    >
                        <div className="grid grid-cols-2 gap-6 w-full relative z-20 text-center">
                            {[
                                { icon: Home, label: "Residential", color: "text-indigo-400" },
                                { icon: Building2, label: "Commercial", color: "text-blue-400" },
                                { icon: Shield, label: "Warranty", color: "text-green-400" },
                                { icon: CheckCircle2, label: "Efficiency", color: "text-purple-400" }
                            ].map((item, idx) => (
                                <div key={idx} className="p-6 bg-black/40 border border-white/5 rounded-3xl flex flex-col items-center gap-4 hover:border-white/20 transition-all group">
                                    <item.icon className={`w-10 h-10 ${item.color} group-hover:scale-110 transition-transform`} />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

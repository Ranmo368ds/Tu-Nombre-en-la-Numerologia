"use client";

import React from "react";
import Image from "next/image";
import { Link } from "@/src/i18n/routing";
import { motion } from "framer-motion";
import { TreePine, Sprout, Sun, Droplets, ArrowRight } from "lucide-react";

export default function LandscapingServicesPage() {
    const points = [
        { title: "Design & Hardscape", icon: TreePine, color: "text-emerald-400" },
        { title: "Maintenance Systems", icon: Sprout, color: "text-lime-400" },
        { title: "Outdoor Lighting", icon: Sun, color: "text-amber-400" },
        { title: "Irrigation Control", icon: Droplets, color: "text-sky-400" }
    ];

    return (
        <main className="min-h-screen bg-black text-white">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center pt-24 pb-20 px-6 overflow-hidden">
                <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, x: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col gap-8"
                    >
                        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full w-fit">
                            <TreePine className="w-4 h-4 text-emerald-400" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">Green Growth Systems</span>
                        </div>

                        <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.9]">
                            Scale Your <span className="text-emerald-500 underline underline-offset-8 decoration-emerald-800">Landscaping</span> Volume
                        </h1>

                        <p className="text-xl text-white/50 leading-relaxed font-medium max-w-xl">
                            Automated lead capture for high-ticket landscaping projects: hardscapes, tree services, and full backyard transformations.
                        </p>

                        <Link href="/contact" className="px-10 py-6 bg-emerald-600 hover:bg-emerald-500 rounded-[2rem] font-black text-sm uppercase tracking-widest text-center transition-all shadow-2xl shadow-emerald-600/20 flex items-center justify-center gap-3 group w-fit">
                            Get Landscape Leads <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>

                    <div className="relative">
                        <div className="grid grid-cols-2 gap-4">
                            {points.map((point, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ scale: 1.05 }}
                                    className="p-8 bg-white/[0.02] border border-white/5 rounded-[3rem] backdrop-blur-3xl flex flex-col items-center gap-4 text-center group"
                                >
                                    <div className={`w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center ${point.color} group-hover:bg-emerald-600 group-hover:text-white transition-all`}>
                                        <point.icon className="w-7 h-7" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">{point.title}</span>
                                </motion.div>
                            ))}
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-emerald-600/5 rounded-full blur-[200px] pointer-events-none" />
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-32 px-6 border-t border-white/5">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    {[
                        { val: "Landscape PRO", label: "Specialized Niche" },
                        { val: "Local Authority", label: "Search Positioning" },
                        { val: "Conversion First", label: "System Design" }
                    ].map((stat, i) => (
                        <div key={i} className="flex flex-col gap-2">
                            <span className="text-4xl font-black italic tracking-tighter uppercase text-[#3b82f6]">{stat.val}</span>
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-40 px-6 relative bg-emerald-950/20 border-t border-white/5">
                <div className="container mx-auto text-center relative z-10 flex flex-col items-center gap-10">
                    <h2 className="text-4xl md:text-7xl font-black italic tracking-tighter uppercase leading-tight max-w-4xl mx-auto">
                        Ready to fill your schedule with premium outdoor projects?
                    </h2>
                    <Link href="/contact" className="px-12 py-6 bg-emerald-600 hover:bg-white hover:text-black rounded-[2.5rem] font-black text-sm uppercase tracking-widest text-center transition-all shadow-2xl shadow-emerald-600/30 group flex items-center justify-center gap-4">
                        Audit Landscape System <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>
            </section>
        </main>
    );
}

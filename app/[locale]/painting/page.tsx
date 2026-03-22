"use client";

import React from "react";
import PaintingHero from "@/components/painting-service/PaintingHero";
import { Link } from "@/src/i18n/routing";
import { ArrowRight, CheckCircle2, Search, Target, Layout } from "lucide-react";
import { motion } from "framer-motion";

export default function PaintingServicesPage() {
    const steps = [
        { title: "Landing Page Strategy", desc: "We design one high-conversion page specifically for your painting niche.", icon: Layout },
        { title: "Keyword Domination", desc: "Dominate 'interior and exterior painting' in your exact neighborhood.", icon: Search },
        { title: "Lead Qualification", desc: "Never again talk to tire-kickers. We filter for project size and budget.", icon: Target }
    ];

    return (
        <main className="min-h-screen bg-black text-white">
            <PaintingHero />

            {/* Advantage Section */}
            <section className="py-32 px-6 bg-white/[0.01]">
                <div className="container mx-auto">
                    <div className="flex flex-col gap-4 text-center mb-24">
                        <h2 className="text-xs font-black uppercase tracking-[0.5em] text-indigo-500 underline decoration-2 underline-offset-8">Our Advantage</h2>
                        <h3 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase leading-none">The Painting Growth Engine</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {steps.map((step, idx) => (
                            <motion.div
                                key={idx}
                                whileInView={{ opacity: 1, y: 0 }}
                                initial={{ opacity: 0, y: 20 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-12 bg-white/[0.02] border border-white/5 rounded-[3rem] hover:border-indigo-500/20 transition-all group"
                            >
                                <div className="w-16 h-16 bg-indigo-600/10 border border-indigo-600/20 rounded-2xl flex items-center justify-center text-indigo-400 mb-10 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                    <step.icon className="w-8 h-8" />
                                </div>
                                <h4 className="text-2xl font-black uppercase tracking-tight mb-6">{step.title}</h4>
                                <p className="text-white/40 leading-relaxed font-bold">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-40 px-6 relative border-t border-white/5">
                <div className="container mx-auto max-w-4xl text-center z-10 relative">
                    <div className="flex flex-col gap-10">
                        <h2 className="text-4xl md:text-7xl font-black italic tracking-tighter uppercase leading-none">
                            Ready to win more bids this week?
                        </h2>
                        <Link href="/contact" className="px-12 py-6 bg-indigo-600 hover:bg-white hover:text-black rounded-[2.5rem] font-black text-sm uppercase tracking-widest text-center transition-all shadow-2xl shadow-indigo-600/30 group flex items-center justify-center gap-4">
                            Launch Painting Audit <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-indigo-600/5 rounded-full blur-[250px] pointer-events-none animate-pulse" />
            </section>
        </main>
    );
}

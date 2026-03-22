"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, TrendingUp, Search, Calendar, PhoneCall, Zap } from "lucide-react";

const features = [
    {
        title: "Localized Search Dominance",
        desc: "We position your HVAC brand for the keywords that matter: 'AC repair near me', 'Heating installation', and 'Emergency HVAC'.",
        icon: Search
    },
    {
        title: "Lead Filtering Systems",
        desc: "Automated pre-qualification ensures your techs only talk to customers with high-intent projects and verified budgets.",
        icon: TrendingUp
    },
    {
        title: "Instant Lead Alerts",
        desc: "Get SMS/Email notifications the second a high-value project is submitted. Speed-to-lead is how you win in HVAC.",
        icon: PhoneCall
    },
    {
        title: "Appointment Automations",
        desc: "Integrated booking systems allow clients to see your availability and schedule directly from the ad or search result.",
        icon: Calendar
    }
];

export default function HvacFeatures() {
    return (
        <section className="py-32 px-6 bg-white/[0.01]">
            <div className="container mx-auto">
                <div className="flex flex-col gap-4 text-center mb-24">
                    <h2 className="text-xs font-black uppercase tracking-[0.5em] text-blue-500 underline decoration-2 underline-offset-8">Core Capabilities</h2>
                    <h3 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase leading-none">Powering Your HVAC Engine</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-10 bg-white/[0.02] border border-white/5 rounded-[2.5rem] hover:bg-white/[0.04] hover:border-blue-500/20 transition-all group flex flex-col gap-6"
                        >
                            <div className="w-14 h-14 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 transition-all text-blue-400 group-hover:text-white">
                                <feature.icon className="w-7 h-7" />
                            </div>
                            <h4 className="text-xl font-black uppercase tracking-tight">{feature.title}</h4>
                            <p className="text-sm text-white/40 leading-relaxed font-medium">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

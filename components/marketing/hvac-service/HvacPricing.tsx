"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { CheckCircle2, Zap, ArrowRight, TrendingUp, ShieldCheck } from "lucide-react";
import { Link } from "@/src/i18n/routing";

export default function HvacPricing() {
    const t = useTranslations("HVACPage");

    const plans = [
        {
            title: t("pricing_plan_1"),
            price: "$999",
            icon: TrendingUp,
            features: [
                "Local SEO Optimization",
                "Google Business Profile Sync",
                "Standard Lead Alerts",
                "Monthly ROI Report"
            ],
            color: "border-white/5 bg-white/[0.02]"
        },
        {
            title: t("pricing_plan_2"),
            price: "$2,499",
            popular: true,
            icon: Zap,
            features: [
                "High-Intent Ad Campaigns",
                "Conversion Optimized Pages",
                "SMS/Email Lead Routing",
                "24/7 Tech Lead Support",
                "Appointment Scheduling Bot"
            ],
            color: "border-blue-500/30 bg-blue-500/[0.03]"
        },
        {
            title: t("pricing_plan_3"),
            price: "Custom",
            icon: ShieldCheck,
            features: [
                "Full Multi-City Domination",
                "Reputation Management",
                "Competitor SEO Analysis",
                "CRM Integrated Leads",
                "Custom Creative Assets"
            ],
            color: "border-white/5 bg-white/[0.02]"
        }
    ];

    return (
        <section className="py-32 px-6">
            <div className="container mx-auto">
                <div className="flex flex-col gap-4 text-center mb-24">
                    <h2 className="text-xs font-black uppercase tracking-[0.5em] text-blue-500">Scale Plans</h2>
                    <h3 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase leading-none">Investment in Growth</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            className={`p-10 border rounded-[3rem] relative flex flex-col gap-10 transition-all group overflow-hidden ${plan.color}`}
                        >
                            {plan.popular && (
                                <div className="absolute top-8 right-8 px-4 py-2 bg-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-xl shadow-blue-600/20">
                                    Most Power
                                </div>
                            )}

                            <div className="flex flex-col gap-6">
                                <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                    <plan.icon className="w-8 h-8" />
                                </div>
                                <div className="flex flex-col">
                                    <h4 className="text-xl font-black uppercase tracking-tight">{plan.title}</h4>
                                    <div className="flex items-baseline gap-2 mt-4">
                                        <span className="text-4xl font-black uppercase tracking-tighter italic">{plan.price}</span>
                                        <span className="text-sm font-black text-white/20 uppercase tracking-widest">/MO</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-5 pt-10 border-t border-white/5 leading-none">
                                {plan.features.map((feature, fidx) => (
                                    <div key={fidx} className="flex items-center gap-3">
                                        <CheckCircle2 className="w-4 h-4 text-blue-500" />
                                        <span className="text-xs font-black uppercase tracking-widest text-white/50">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <Link href="/contact" className={`mt-4 px-8 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] text-center transition-all flex items-center justify-center gap-3 group ${plan.popular ? "bg-blue-600 hover:bg-white hover:text-black shadow-2xl shadow-blue-600/30" : "bg-white/5 hover:bg-white/10"}`}>
                                Select System <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

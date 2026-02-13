"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, MapPin, CheckCircle2 } from "lucide-react";
import { Link } from "@/src/i18n/routing";
import JuansonsContact from "./JuansonsContact";
import { useTranslations, useLocale } from "next-intl";

interface Props {
    title: string;
    image: string;
    description: React.ReactNode;
    areasServed?: string;
    defaultService?: string;
    breadcrumbLabel: string;
}

export default function JuansonsServiceLayout({
    title,
    image,
    description,
    areasServed,
    defaultService,
    breadcrumbLabel
}: Props) {
    const locale = useLocale();
    const tCommon = useTranslations("JuansonsLandscaping.pages.common");
    const [isJuansonDomain, setIsJuansonDomain] = React.useState(false);

    React.useEffect(() => {
        setIsJuansonDomain(
            window.location.hostname.includes("juansonslawncare") ||
            window.location.hostname === "localhost"
        );
    }, []);

    return (
        <main className="min-h-screen bg-white relative overflow-x-hidden">
            <div className="pt-24 md:pt-32 overflow-x-hidden w-full">
                {/* Header / Breadcrumbs */}
                <div className="bg-[#222222] py-12 md:py-20 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[url('/images/juansons/pattern.png')] bg-repeat"></div>
                    <div className="container mx-auto px-4 relative z-10">
                        <nav className="flex items-center gap-2 text-[#91ad41] text-xs font-bold uppercase tracking-widest mb-4">
                            <Link
                                href={isJuansonDomain ? "/Home" : "/juansons-landscaping"}
                                className="hover:text-white transition-colors"
                            >
                                Home
                            </Link>
                            <ChevronRight className="w-3 h-3" />
                            <span className="text-white/50">{breadcrumbLabel}</span>
                        </nav>
                        <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
                            {title}
                        </h1>
                    </div>
                </div>

                {/* Detailed Description Section */}
                <section className="py-20 bg-gray-50 border-y border-gray-100">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <div className="prose prose-lg prose-slate max-w-none">
                            <div className="text-gray-700 leading-relaxed space-y-6">
                                {description}
                            </div>
                        </div>

                        {/* Areas Served Card */}
                        <div className="mt-16 bg-[#2d6a4f] p-8 md:p-12 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 text-[#91ad41] mb-4">
                                    <MapPin className="w-6 h-6" />
                                    <h3 className="text-xl font-bold uppercase tracking-widest">{tCommon("areas_served_title")}</h3>
                                </div>
                                <p className="text-lg mb-6 text-white/90">
                                    {tCommon("areas_served_text")}
                                </p>
                                <div className="bg-white/10 p-6 border border-white/20 backdrop-blur-sm">
                                    <p className="text-[#91ad41] font-black tracking-wide leading-loose">
                                        {tCommon("locations")}
                                    </p>
                                </div>
                                <div className="mt-10 flex flex-col md:flex-row items-center gap-6">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="w-10 h-10 rounded-full border-2 border-[#2d6a4f] bg-gray-200 overflow-hidden">
                                                <img src={`/images/juansons/worker-${i}.jpg`} alt="Team member" className="w-full h-full object-cover"
                                                    onError={(e) => (e.currentTarget.src = "/images/juansons/logo_small.png")}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/70">
                                        Expert Local Service in your Area
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Quick Benefits Grid */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            {[
                                { title: tCommon("benefit_licensed.title"), desc: tCommon("benefit_licensed.desc") },
                                { title: tCommon("benefit_experience.title"), desc: tCommon("benefit_experience.desc") },
                                { title: tCommon("benefit_quality.title"), desc: tCommon("benefit_quality.desc") }
                            ].map((benefit, i) => (
                                <div key={i} className="p-8 border border-gray-100 hover:border-[#91ad41] transition-colors group">
                                    <CheckCircle2 className="w-12 h-12 text-[#91ad41] mx-auto mb-6 group-hover:scale-110 transition-transform" />
                                    <h3 className="text-xl font-black text-[#222222] uppercase tracking-tight mb-4">{benefit.title}</h3>
                                    <p className="text-gray-500">{benefit.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Global Contact Section */}
                <JuansonsContact />
            </div>
        </main>
    );
}

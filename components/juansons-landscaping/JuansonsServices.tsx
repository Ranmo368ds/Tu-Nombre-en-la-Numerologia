"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Sprout, Grid, Fence, Snowflake, ArrowRight } from "lucide-react";

const serviceData = [
    { id: "lawn", icon: <Sprout className="w-8 h-8" />, image: "/images/juansons/mulch.jpg" },
    { id: "brick", icon: <Grid className="w-8 h-8" />, image: "/images/juansons/patio.png" },
    { id: "fence", icon: <Fence className="w-8 h-8" />, image: "/images/juansons/retaining_wall.png" },
    { id: "snow", icon: <Snowflake className="w-8 h-8" />, image: "/images/juansons/services/snow.png" },
];

export default function JuansonsServices() {
    const t = useTranslations("JuansonsLandscaping.services");
    const [isJuansonDomain, setIsJuansonDomain] = React.useState(false);

    React.useEffect(() => {
        if (typeof window !== "undefined") {
            setIsJuansonDomain(
                window.location.hostname.includes("juansonslawncare.com") ||
                window.location.hostname.includes("juansonlawncare.com") ||
                window.location.host.includes("localhost:3000")
            );
        }
    }, []);

    const basePath = isJuansonDomain ? "" : "/juansons-landscaping";

    return (
        <section id="services" className="py-24 bg-gray-50 overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16 px-4">
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
                        className="text-4xl md:text-5xl font-black text-[#222222] mt-4 uppercase tracking-tight"
                    >
                        {t("title")}
                    </motion.h2>
                    <div className="w-24 h-1.5 bg-[#91ad41] mx-auto mt-6"></div>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {serviceData.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="group bg-white flex flex-col h-full shadow-md hover:shadow-2xl transition-all duration-300"
                        >
                            {/* Service Image Container */}
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={service.image}
                                    alt={t(`items.${service.id}.title`)}
                                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                                />
                                {/* Bottom Accent Slant */}
                                <div className="absolute bottom-0 right-0 w-1/2 h-4 bg-[#91ad41] skew-x-[45deg] origin-bottom-right translate-x-2"></div>
                            </div>

                            {/* Service Content */}
                            <div className="p-8 flex flex-col flex-1 relative">
                                {/* Icon Badge */}
                                <div className="absolute -top-10 left-8 w-20 h-20 bg-[#91ad41] text-white flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform duration-300 border-4 border-white">
                                    {service.icon}
                                </div>

                                <div className="mt-8">
                                    <h3 className="text-xl font-black text-[#222222] uppercase tracking-wide mb-3">
                                        {t(`items.${service.id}.title`)}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                        {t(`items.${service.id}.desc`)}
                                    </p>
                                </div>

                                <div className="mt-auto">
                                    <a
                                        href={isJuansonDomain ? (
                                            service.id === "lawn" ? "/LawnServices" :
                                                service.id === "brick" ? "/BrickPaving" :
                                                    service.id === "fence" ? "/FenceServices" :
                                                        service.id === "snow" ? "/SnowRemoval" :
                                                            `${basePath}#contact`
                                        ) : `${basePath}#contact`}
                                        className="inline-flex items-center gap-2 text-[#91ad41] font-bold text-xs uppercase tracking-[0.1em] hover:text-[#2d6a4f] transition-colors"
                                    >
                                        Learn More <ArrowRight className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Background Decorations - Clamped to prevent overflow */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-[#91ad41]/5 -z-10 skew-x-[-15deg] translate-x-1/2 hidden md:block"></div>
            <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-[#91ad41]/5 -z-10 skew-x-[15deg] -translate-x-1/4 hidden md:block"></div>
        </section>
    );
}

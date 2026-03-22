"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Maximize2 } from "lucide-react";
import { Link } from "@/src/i18n/routing";
import { useTranslations } from "next-intl";
import JuansonsContact from "@/components/juansons-landscaping/JuansonsContact";

export default function GalleryClient() {
    const t = useTranslations("JuansonsLandscaping.pages.gallery");
    const [isJuansonDomain, setIsJuansonDomain] = React.useState(false);

    React.useEffect(() => {
        setIsJuansonDomain(
            window.location.hostname.includes("juansonslawncare") ||
            window.location.hostname === "localhost"
        );
    }, []);

    // Generate all artboard paths from 1 to 48, excluding Artboard-32 (invoice)
    const images = Array.from({ length: 48 }, (_, i) => ({
        src: `/images/juansons/pics/Artboard-${i + 1}.png`,
        alt: `Project Artboard ${i + 1}`
    })).filter(img => !img.src.includes("Artboard-32.png"));

    return (
        <div className="pt-24 md:pt-32 bg-white">
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
                        <span className="text-white/50">Gallery</span>
                    </nav>
                    <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
                        {t("title")}
                    </h1>
                </div>
            </div>

            {/* Gallery Grid */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <p className="text-gray-500 max-w-2xl mb-16 text-lg">
                        {t("subtitle")}
                    </p>

                    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
                        {images.map((image, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: (index % 10) * 0.05 }}
                                className="relative group overflow-hidden break-inside-avoid shadow-lg"
                            >
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className="w-full h-auto grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                    loading="lazy"
                                />
                                {/* Overlay on hover */}
                                <div className="absolute inset-0 bg-[#91ad41]/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                                    <div className="p-4 bg-white text-[#91ad41] rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <Maximize2 className="w-6 h-6" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Global Contact Section */}
            <JuansonsContact />
        </div>
    );
}

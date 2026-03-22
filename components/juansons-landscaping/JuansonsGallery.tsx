"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const galleryItems = [
    { src: "/images/juansons/video/mchenry-video.mp4", size: "lg", type: "video", title: "McHenry Project tour" },
    { src: "/images/juansons/pics/mchenry-result.jpg", size: "md", title: "McHenry Project - Final Result" },
    { src: "/images/juansons/pics/mchenry-1.jpg", size: "sm", title: "McHenry Site Preparation" },
    { src: "/images/juansons/pics/mchenry-2.jpg", size: "sm", title: "McHenry Works" },
    { src: "/images/juansons/pics/Artboard-10.png", size: "sm" },
    { src: "/images/juansons/pics/Artboard-15.png", size: "sm" },
    { src: "/images/juansons/pics/Artboard-20.png", size: "sm" },
    { src: "/images/juansons/pics/Artboard-25.png", size: "md" },
];

export default function JuansonsGallery() {
    // Note: I'll manually add gallery strings to the script in the next step
    // For now, I'll use common patterns or existing translations
    const t = useTranslations("JuansonsLandscaping");

    return (
        <section id="gallery" className="py-24 bg-[#222222] text-white">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div className="max-w-2xl">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-[#91ad41] font-extrabold uppercase tracking-[0.2em] text-sm"
                        >
                            Visual Portfolio
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-black mt-4 uppercase tracking-tight leading-tight"
                        >
                            Our Recent Projects
                        </motion.h2>
                    </div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="hidden md:block"
                    >
                        <div className="w-32 h-1.5 bg-[#91ad41]"></div>
                    </motion.div>
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[250px]">
                    {galleryItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className={`relative group overflow-hidden ${item.size === "lg" ? "md:col-span-2 md:row-span-2" :
                                item.size === "md" ? "md:col-span-2" : ""
                                }`}
                        >
                            {item.type === "video" ? (
                                <video
                                    src={item.src}
                                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                />
                            ) : (
                                <img
                                    src={item.src}
                                    alt={item.title || `Project ${index + 1}`}
                                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                                />
                            )}
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-[#91ad41]/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-6 text-center">
                                <span className="text-white font-black uppercase tracking-tighter text-2xl scale-75 group-hover:scale-100 transition-transform duration-300">
                                    {item.type === "video" ? "PLAY VIDEO" : "VIEW PROJECT"}
                                </span>
                                {item.title && (
                                    <p className="text-white/90 text-sm mt-2 font-bold uppercase tracking-widest">{item.title}</p>
                                )}
                                <div className="w-10 h-1 bg-white mt-4 opacity-0 group-hover:opacity-100 transition-all delay-100 italic"></div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

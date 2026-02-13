"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
    {
        image: "/images/juansons/patio.png",
        id: 1,
    },
    {
        image: "/images/juansons/pond.png",
        id: 2,
    },
    {
        image: "/images/juansons/retaining_wall.png",
        id: 3,
    },
];

export default function JuansonsHero() {
    const t = useTranslations("JuansonsLandscaping.hero");
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section id="home" className="relative h-screen min-h-[600px] w-full overflow-hidden bg-[#222222]">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0"
                >
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
                    >
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/40"></div>
                    </div>

                    {/* Content */}
                    <div className="relative h-full container mx-auto px-4 flex flex-col justify-center items-center text-center">
                        <motion.span
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="text-[#91ad41] font-bold tracking-[0.3em] uppercase text-sm md:text-base mb-4 block"
                        >
                            {t("slides.0.subtitle")}
                        </motion.span>
                        <motion.h1
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.7, duration: 0.8 }}
                            className="text-white text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-black uppercase tracking-tight leading-[1] max-w-4xl"
                        >
                            {t("slides.0.title")}
                        </motion.h1>

                        <motion.div
                            initial={{ y: 40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1, duration: 0.8 }}
                            className="flex flex-col sm:flex-row gap-4 mt-10"
                        >
                            <a
                                href="#services"
                                className="bg-[#91ad41] hover:bg-[#829c3a] text-white px-8 py-4 rounded-none font-bold uppercase tracking-wider transition-all transform hover:scale-105"
                            >
                                {t("slides.0.cta1")}
                            </a>
                            <a
                                href="#contact"
                                className="bg-transparent hover:bg-white hover:text-[#222222] text-white border-2 border-white px-8 py-4 rounded-none font-bold uppercase tracking-wider transition-all transform hover:scale-105"
                            >
                                {t("slides.0.cta2")}
                            </a>
                        </motion.div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white/50 hover:text-white transition-colors z-20"
            >
                <ChevronLeft className="w-10 h-10 md:w-16 md:h-16" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white/50 hover:text-white transition-colors z-20"
            >
                <ChevronRight className="w-10 h-10 md:w-16 md:h-16" />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-12 h-1 transition-all ${index === currentSlide ? "bg-[#91ad41]" : "bg-white/30"}`}
                    ></button>
                ))}
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-10 left-10 hidden lg:block"
            >
                <div className="flex flex-col items-center gap-4">
                    <span className="[writing-mode:vertical-lr] text-white/50 text-[10px] font-bold uppercase tracking-[0.5em]">
                        SCROLL DOWN
                    </span>
                    <div className="w-px h-16 bg-gradient-to-b from-[#91ad41] to-transparent"></div>
                </div>
            </motion.div>
        </section>
    );
}

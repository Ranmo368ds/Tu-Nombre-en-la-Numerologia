"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const NUMBERS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "11", "22", "33"];
const LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

const FloatingElement = ({ content, delay, duration, startPos }: { content: string, delay: number, duration: number, startPos: { x: number, y: number } }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{
                opacity: [0, 0.7, 0.7, 0],
                y: [0, -150], // Drift upward by 150px
                rotate: [0, 20, -20, 0],
                scale: [1, 1.15, 0.85, 1]
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
                ease: "easeInOut"
            }}
            className="absolute text-gold font-mystic pointer-events-none select-none glow-gold"
            style={{
                left: `${startPos.x}%`,
                top: `${startPos.y}%`,
                fontSize: content.length > 1 ? "2rem" : "2.8rem",
                filter: "blur(0.2px)"
            }}
        >
            {content}
        </motion.div>
    );
};

const TwinklingStar = ({ top, left, size, delay }: { top: number, left: number, size: number, delay: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0.1, scale: 0.6 }}
            animate={{
                opacity: [0.1, 1, 0.1],
                scale: [0.6, 1.4, 0.6]
            }}
            transition={{
                duration: 1.5 + Math.random() * 2.5,
                repeat: Infinity,
                delay: delay,
                ease: "easeInOut"
            }}
            className="absolute bg-white rounded-full pointer-events-none"
            style={{
                top: `${top}%`,
                left: `${left}%`,
                width: `${size}px`,
                height: `${size}px`,
                boxShadow: "0 0 10px 2px rgba(255, 255, 255, 0.6)",
            }}
        />
    );
};

export function CosmicBackground() {
    const stars = useMemo(() => {
        return Array.from({ length: 60 }).map((_, i) => ({
            id: i,
            top: Math.random() * 100,
            left: Math.random() * 100,
            size: 1 + Math.random() * 2,
            delay: Math.random() * 4
        }));
    }, []);

    const floatingElements = useMemo(() => {
        const all = [...NUMBERS, ...LETTERS];
        return Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            content: all[Math.floor(Math.random() * all.length)],
            delay: Math.random() * 20,
            duration: 15 + Math.random() * 10, // Slower, smoother
            startPos: {
                x: Math.random() * 100,
                y: 10 + Math.random() * 80
            }
        }));
    }, []);

    return (
        <div className="fixed inset-0 z-0 bg-black overflow-hidden">
            {/* 8K Base Image Layer with Intense Breathing */}
            <motion.div
                animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.7, 0.85, 0.7],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute inset-0 w-full h-full origin-center will-change-transform"
            >
                <Image
                    src="/images/cosmic-base.png"
                    alt="Cosmic Backdrop"
                    fill
                    priority
                    className="object-cover"
                />
                {/* Subtle color pulse overlay */}
                <motion.div
                    animate={{ opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 15, repeat: Infinity }}
                    className="absolute inset-0 bg-gradient-to-tr from-indigo-900/20 via-transparent to-purple-900/20 mix-blend-overlay"
                />
            </motion.div>

            {/* Deep Shadow & Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />

            {/* Twinkling Stars Layer */}
            <div className="absolute inset-0 pointer-events-none">
                {stars.map((star) => (
                    <TwinklingStar key={star.id} {...star} />
                ))}
            </div>

            {/* Floating Numbers & Letters Layer */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {floatingElements.map((el) => (
                    <FloatingElement key={el.id} {...el} />
                ))}
            </div>

            {/* Ethereal Nebula Depth - Static or very slow */}
            <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-screen bg-[radial-gradient(circle_at_40%_60%,rgba(80,40,160,0.4)_0%,transparent_60%)]" />
        </div>
    );
}

"use client";

import { motion } from "framer-motion";
import { TarotCardData } from "@/utils/tarotData";
import { Sparkles } from "lucide-react";

interface TarotCardProps {
    card: TarotCardData;
    isFlipped?: boolean;
    onClick?: () => void;
    className?: string;
    size?: "sm" | "md" | "lg";
}

export function TarotCard({ card, isFlipped = true, onClick, className = "", size = "md" }: TarotCardProps) {
    const sizeClasses = {
        sm: "w-32 h-48",
        md: "w-48 h-72",
        lg: "w-64 h-96"
    };

    return (
        <div
            className={`${sizeClasses[size]} perspective-1000 cursor-pointer ${className}`}
            onClick={onClick}
        >
            <motion.div
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                className="relative w-full h-full transform-style-3d"
            >
                {/* Back of Card */}
                <div className="absolute inset-0 backface-hidden bg-slate-900 rounded-xl border-2 border-slate-700 tarot-card-glow flex items-center justify-center p-4">
                    <div className="w-full h-full rounded-lg border border-slate-800/50 bg-[#0a0a2e] flex flex-col items-center justify-center gap-4 group">
                        <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Sparkles className="w-6 h-6 text-indigo-400" />
                        </div>
                        <div className="text-[10px] tracking-[0.2em] text-indigo-300 uppercase font-mystic">Instinto Saludable</div>
                    </div>
                </div>

                {/* Front of Card */}
                <div className="absolute inset-0 backface-hidden rotateY-180 bg-slate-900 rounded-xl border-2 border-slate-700 tarot-card-glow overflow-hidden">
                    <div className="relative w-full h-full">
                        <img
                            src={card.image}
                            alt={card.name.es}
                            className="w-full h-full object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                        <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                            <span className="text-[10px] uppercase tracking-widest text-indigo-300 opacity-80">
                                {card.number} · {card.element.es}
                            </span>
                            <h3 className="text-white font-mystic text-lg font-bold tracking-wide">
                                {card.name.es}
                            </h3>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

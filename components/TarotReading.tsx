"use client";

import { useState } from "react";
import { majorArcana, TarotCardData } from "@/utils/tarotData";
import { TarotCard } from "./TarotCard";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, RefreshCw, Send } from "lucide-react";

export function TarotReading() {
    const [intention, setIntention] = useState("");
    const [isReading, setIsReading] = useState(false);
    const [readingResult, setReadingResult] = useState<TarotCardData | null>(null);
    const [isShuffling, setIsShuffling] = useState(false);

    const handleStartReading = async () => {
        if (!intention.trim()) return;

        setIsShuffling(true);
        setReadingResult(null);

        // Simulate shuffling
        await new Promise(resolve => setTimeout(resolve, 2000));

        const randomIndex = Math.floor(Math.random() * majorArcana.length);
        const selectedCard = majorArcana[randomIndex];

        setIsShuffling(false);
        setIsReading(true);
        setReadingResult(selectedCard);
    };

    const handleReset = () => {
        setIntention("");
        setIsReading(false);
        setReadingResult(null);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-12">
            {!isReading ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-slate-900/50 border border-slate-700/50 rounded-3xl p-8 md:p-12 text-center space-y-8"
                >
                    <div className="space-y-4">
                        <h2 className="text-3xl font-mystic text-white">Consulta al Oráculo</h2>
                        <p className="text-slate-400 max-w-lg mx-auto">
                            Cierra los ojos, respira profundo y escribe tu intención o pregunta. El tarot te mostrará el arquetipo que guía tu camino hoy.
                        </p>
                    </div>

                    <div className="relative max-w-md mx-auto">
                        <textarea
                            value={intention}
                            onChange={(e) => setIntention(e.target.value)}
                            placeholder="¿Qué necesito saber hoy?..."
                            className="w-full bg-slate-950 border border-slate-700 rounded-2xl p-6 text-white text-lg focus:outline-none focus:border-indigo-500 transition-all min-h-[150px] resize-none"
                        />
                        <button
                            onClick={handleStartReading}
                            disabled={!intention.trim() || isShuffling}
                            className="absolute bottom-4 right-4 p-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-800 text-white rounded-xl transition-all shadow-lg shadow-indigo-500/20"
                        >
                            {isShuffling ? (
                                <RefreshCw className="w-6 h-6 animate-spin" />
                            ) : (
                                <Send className="w-6 h-6" />
                            )}
                        </button>
                    </div>

                    {isShuffling && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-indigo-400 font-mystic tracking-widest animate-pulse"
                        >
                            Mezclando los Arcanos...
                        </motion.div>
                    )}
                </motion.div>
            ) : (
                <div className="space-y-12">
                    <AnimatePresence mode="wait">
                        {readingResult && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center gap-10"
                            >
                                <div className="text-center space-y-2">
                                    <span className="text-indigo-400 text-xs tracking-[0.5em] uppercase">Tu Arquetipo Guía</span>
                                    <h2 className="text-5xl font-mystic text-white font-bold">{readingResult.name.es}</h2>
                                </div>

                                <TarotCard card={readingResult} isFlipped={true} size="lg" className="shadow-2xl shadow-indigo-500/20" />

                                <div className="grid md:grid-cols-2 gap-8 w-full">
                                    <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl space-y-4">
                                        <div className="flex items-center gap-3 text-indigo-400 uppercase tracking-widest text-xs font-bold">
                                            <Sparkles className="w-4 h-4" />
                                            Mensaje del Oráculo
                                        </div>
                                        <p className="text-slate-300 leading-relaxed text-lg italic">
                                            "{readingResult.advice.es}"
                                        </p>
                                    </div>

                                    <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl space-y-4">
                                        <div className="flex items-center gap-3 text-emerald-400 uppercase tracking-widest text-xs font-bold">
                                            <RefreshCw className="w-4 h-4" />
                                            Acción Inspirada
                                        </div>
                                        <p className="text-slate-300 leading-relaxed">
                                            {readingResult.dailyAction.es}
                                        </p>
                                    </div>
                                </div>

                                <button
                                    onClick={handleReset}
                                    className="px-10 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-full transition-all border border-slate-700"
                                >
                                    Nueva Consulta
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}

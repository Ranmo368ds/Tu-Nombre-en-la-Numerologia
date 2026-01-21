"use client";

import { useState } from "react";
import { majorArcana, TarotCardData } from "@/utils/tarotData";
import { TarotCard } from "./TarotCard";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search } from "lucide-react";

export function TarotLibrary() {
    const [selectedCard, setSelectedCard] = useState<TarotCardData | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredCards = majorArcana.filter(card =>
        card.name.es.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.name.en.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                <h2 className="text-2xl font-mystic text-white">Biblioteca de Arquetipos</h2>
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Buscar carta..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {filteredCards.map((card) => (
                    <motion.div
                        key={card.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.3 }}
                    >
                        <TarotCard
                            card={card}
                            isFlipped={true}
                            size="sm"
                            className="w-full"
                            onClick={() => setSelectedCard(card)}
                        />
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedCard && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full overflow-hidden flex flex-col md:flex-row relative"
                        >
                            <button
                                onClick={() => setSelectedCard(null)}
                                className="absolute top-4 right-4 z-10 p-2 bg-slate-950/50 hover:bg-slate-950 text-white rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="md:w-1/3 bg-slate-950 flex items-center justify-center p-8 border-r border-slate-800">
                                <TarotCard card={selectedCard} isFlipped={true} size="lg" />
                            </div>

                            <div className="md:w-2/3 p-8 space-y-6 overflow-y-auto max-h-[80vh]">
                                <div>
                                    <span className="text-indigo-400 text-sm tracking-[0.3em] font-mystic uppercase">Arcano {selectedCard.number}</span>
                                    <h2 className="text-4xl font-mystic text-white font-bold">{selectedCard.name.es}</h2>
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {selectedCard.keywords.es.map((word) => (
                                            <span key={word} className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs rounded-full">
                                                {word}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-slate-950/40 p-5 rounded-2xl border border-slate-800">
                                        <h3 className="text-white font-bold mb-2">Significado</h3>
                                        <p className="text-slate-300 text-sm leading-relaxed">{selectedCard.meaning.es}</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl">
                                            <h4 className="text-emerald-400 text-xs uppercase tracking-widest font-bold mb-2">Consejo del Oráculo</h4>
                                            <p className="text-slate-300 text-sm italic">"{selectedCard.advice.es}"</p>
                                        </div>
                                        <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-2xl">
                                            <h4 className="text-amber-400 text-xs uppercase tracking-widest font-bold mb-2">Acción Sugerida</h4>
                                            <p className="text-slate-300 text-sm">{selectedCard.dailyAction.es}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

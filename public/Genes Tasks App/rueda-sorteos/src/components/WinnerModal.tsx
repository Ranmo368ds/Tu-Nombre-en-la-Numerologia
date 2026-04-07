"use client";

import React from "react";
import { useWheel } from "@/context/WheelContext";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, X, Trash2, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

const WinnerModal = () => {
  const { winner, setWinner, participants, setParticipants, addToHistory } = useWheel();

  if (!winner) return null;

  const handleClose = () => {
    addToHistory(winner);
    setWinner(null);
  };

  const removeWinner = () => {
    setParticipants(participants.filter(p => p.id !== winner.id));
    handleClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           onClick={handleClose}
           className="absolute inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          className="relative bg-white dark:bg-zinc-900 w-full max-w-md rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.3)] border-4 border-indigo-500"
        >
            <div className="absolute top-4 right-4">
                <button 
                   onClick={handleClose}
                   className="p-2 transition-colors rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            <div className="p-8 text-center bg-gradient-to-b from-indigo-50 to-transparent dark:from-indigo-950/20">
                {winner.image ? (
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="relative inline-flex mb-6"
                    >
                        <img 
                            src={winner.image} 
                            alt={winner.name}
                            className="w-32 h-32 rounded-full object-cover border-8 border-yellow-400 shadow-2xl"
                        />
                        <div className="absolute -top-4 -right-4 w-12 h-12 bg-white dark:bg-zinc-800 rounded-full flex items-center justify-center shadow-lg border-2 border-zinc-100 dark:border-zinc-700">
                            <Trophy className="w-6 h-6 text-yellow-500" />
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ y: -20, rotate: -10 }}
                        animate={{ y: 0, rotate: 0 }}
                        transition={{ type: "spring", damping: 10, stiffness: 100 }}
                        className="inline-flex items-center justify-center w-24 h-24 bg-yellow-400 rounded-full mb-6 shadow-xl shadow-yellow-200 dark:shadow-none animate-bounce"
                    >
                        <Trophy className="w-12 h-12 text-zinc-900" />
                    </motion.div>
                )}

                <h2 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-2">
                    ¡Tenemos un ganador!
                </h2>
                <div className="px-4 mb-8">
                     <h1 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white break-words drop-shadow-sm">
                        {winner.name}
                    </h1>
                </div>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={handleClose}
                        className="w-full flex items-center justify-center gap-3 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-lg shadow-lg shadow-indigo-200 dark:shadow-none transition-all active:scale-95"
                    >
                        <RotateCcw className="w-5 h-5" />
                        Aceptar
                    </button>
                    
                    <button
                        onClick={removeWinner}
                        className="w-full flex items-center justify-center gap-2 py-4 text-zinc-500 hover:text-red-500 dark:text-zinc-400 dark:hover:text-red-400 font-semibold transition-colors"
                    >
                        <Trash2 className="w-5 h-5" />
                        Eliminar ganador de la lista
                    </button>
                </div>
            </div>
            
            <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 border-t border-zinc-100 dark:border-zinc-800 text-center">
                <p className="text-xs text-zinc-400">
                    Sigue girando para encontrar más ganadores.
                </p>
            </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default WinnerModal;

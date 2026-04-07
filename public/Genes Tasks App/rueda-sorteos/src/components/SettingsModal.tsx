"use client";

import React from "react";
import { useWheel } from "@/context/WheelContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, Settings, Timer, Palette, Volume2, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { settings, updateSettings } = useWheel();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           onClick={onClose}
           className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative bg-white dark:bg-zinc-900 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800"
        >
          <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
             <div className="flex items-center gap-3 font-bold text-xl text-zinc-900 dark:text-white">
                <Settings className="w-5 h-5 text-indigo-500" />
                Personalizar Rueda
             </div>
             <button onClick={onClose} className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400">
                <X className="w-6 h-6" />
             </button>
          </div>

          <div className="p-8 space-y-8 overflow-y-auto max-h-[70vh] thin-scrollbar">
            
            {/* Duration */}
            <div className="space-y-4">
               <div className="flex items-center gap-2 text-sm font-semibold text-zinc-500 uppercase tracking-wider">
                  <Timer className="w-4 h-4" />
                  Duración del Giro
               </div>
               <div className="flex items-center gap-4">
                  <input 
                    type="range"
                    min="1"
                    max="20"
                    step="1"
                    value={settings.duration}
                    onChange={(e) => updateSettings({ duration: Number(e.target.value) })}
                    className="w-full accent-indigo-600 h-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="font-mono font-bold bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg">
                    {settings.duration}s
                  </span>
               </div>
               <p className="text-xs text-zinc-400">Controla qué tan rápido o lento gira la rueda antes de detenerse.</p>
            </div>

            {/* Colors */}
            <div className="space-y-4">
               <div className="flex items-center gap-2 text-sm font-semibold text-zinc-500 uppercase tracking-wider">
                  <Palette className="w-4 h-4" />
                  Paleta de Colores
               </div>
               <div className="flex flex-wrap gap-2">
                  {settings.colors.map((color, i) => (
                    <div key={i} className="relative group/color">
                        <div 
                            className="w-8 h-8 rounded-full border-2 border-white shadow-sm cursor-pointer"
                            style={{ backgroundColor: color }}
                        />
                    </div>
                  ))}
                  <button className="w-8 h-8 rounded-full border-2 border-dashed border-zinc-300 flex items-center justify-center text-zinc-400 hover:border-indigo-500 hover:text-indigo-500 transition-all">
                    +
                  </button>
               </div>
               <p className="text-xs text-zinc-400">Los colores se alternan automáticamente entre los participantes.</p>
            </div>

            {/* Images toggle */}
            <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800/30 rounded-2xl border border-zinc-100 dark:border-zinc-800">
               <div className="flex flex-col">
                  <span className="font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                     <ImageIcon className="w-4 h-4 text-indigo-500" />
                     Mostrar Imágenes
                  </span>
                  <span className="text-xs text-zinc-500">Muestra los iconos o fotos de los participantes en la rueda.</span>
               </div>
               <button
                  onClick={() => updateSettings({ showImages: !settings.showImages })}
                  className={cn(
                    "w-12 h-6 rounded-full transition-all relative",
                    settings.showImages ? "bg-indigo-600" : "bg-zinc-300 dark:bg-zinc-700"
                  )}
               >
                  <div className={cn(
                    "absolute top-1 w-4 h-4 rounded-full bg-white transition-all",
                    settings.showImages ? "right-1" : "left-1"
                  )} />
               </button>
            </div>

             {/* Sound Selection */}
             <div className="space-y-4">
               <div className="flex items-center gap-2 text-sm font-semibold text-zinc-500 uppercase tracking-wider">
                  <Volume2 className="w-4 h-4" />
                  Efectos de Sonido
               </div>
               <div className="grid grid-cols-2 gap-3">
                  {["Normal", "Retro", "Tictac"].map((s) => (
                    <button
                        key={s}
                        className={cn(
                            "px-4 py-3 rounded-xl border-2 text-sm font-bold transition-all",
                            settings.spinSound === s.toLowerCase() 
                                ? "bg-indigo-50 border-indigo-500 text-indigo-600 dark:bg-indigo-950/30" 
                                : "bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 hover:border-indigo-200"
                        )}
                        onClick={() => updateSettings({ spinSound: s.toLowerCase() })}
                    >
                        {s}
                    </button>
                  ))}
               </div>
            </div>

          </div>

          <div className="p-6 bg-zinc-50 dark:bg-zinc-800/50 border-t border-zinc-100 dark:border-zinc-800 flex gap-4">
            <button
                onClick={onClose}
                className="flex-1 py-4 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-2xl font-bold shadow-lg transition-all active:scale-95"
            >
                Cerrar y Guardar
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SettingsModal;

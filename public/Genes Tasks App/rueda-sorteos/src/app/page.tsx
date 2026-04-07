"use client";

import React, { useState, useEffect } from "react";
import { useWheel } from "@/context/WheelContext";
import CanvasWheel from "@/components/CanvasWheel";
import ParticipantPanel from "@/components/ParticipantPanel";
import WinnerModal from "@/components/WinnerModal";
import SettingsModal from "@/components/SettingsModal";
import { 
  Play, 
  Monitor, 
  Settings2, 
  Sparkles, 
  Gamepad2,
  Moon,
  Sun,
  RefreshCcw
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  const { participants, isSpinning, setIsSpinning, setWinner, setParticipants, resetAll } = useWheel();
  const [isStreamingMode, setIsStreamingMode] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Parse URL params for shared wheel
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const namesParam = params.get("names");
    if (namesParam) {
      try {
        const decoded = decodeURIComponent(escape(atob(namesParam)));
        const names = decoded.split(",");
        const newParticipants = names.map(name => ({
          id: Math.random().toString(36).substr(2, 9),
          name: name.trim(),
        }));
        setParticipants(newParticipants);
      } catch (e) {
        console.error("Error decoding names", e);
      }
    }
  }, [setParticipants]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const onWin = (winner: any) => {
    setWinner(winner);
  };

  const handleReset = () => {
    if (confirm("¿Estás seguro de borrar todos los datos y reiniciar la aplicación? Esto solucionará problemas de bloqueo.")) {
      resetAll();
    }
  };

  return (
    <main className={cn(
      "min-h-screen flex flex-col",
      darkMode ? "dark" : ""
    )}>
      {/* Header */}
      {!isStreamingMode && (
        <header className="p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 sticky top-0 z-40 backdrop-blur-md bg-opacity-80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100 dark:shadow-none animate-pulse">
              <Sparkles className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black font-outfit tracking-tight text-zinc-900 dark:text-white uppercase italic">
                Rueda de Sorteos
              </h1>
              <p className="text-[10px] md:text-xs text-zinc-500 font-medium uppercase tracking-widest">
                ¡La mejor rifa para tus eventos! 🎊
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
               onClick={handleReset}
               className="p-3 rounded-xl bg-red-50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 transition-colors"
               title="Reiniciar Aplicación (Soluciona bloqueos)"
            >
              <RefreshCcw className="w-5 h-5" />
            </button>
            <button
               onClick={() => setIsSettingsOpen(true)}
               className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 transition-colors"
               title="Personalizar Rueda"
            >
              <Settings2 className="w-5 h-5" />
            </button>
            <button
               onClick={toggleDarkMode}
               className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 transition-colors"
               title="Alternar Tema"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </header>
      )}

      {/* Main Content */}
      <div className={cn(
        "flex-1 flex flex-col lg:flex-row gap-6 p-4 md:p-8 max-w-[1600px] mx-auto w-full transition-all duration-500",
        isStreamingMode ? "p-0 max-w-none items-center justify-center" : ""
      )}>
        
        {/* The Wheel Section */}
        <section className={cn(
          "flex-1 flex flex-col items-center justify-center relative",
          isStreamingMode ? "w-screen h-screen p-10 bg-transparent" : "lg:w-2/3"
        )}>
          {isStreamingMode && (
             <button
               onClick={() => setIsStreamingMode(false)}
               className="absolute top-4 left-4 z-50 p-2 bg-black/60 text-white rounded-full hover:bg-black/80 backdrop-blur-sm transition-all animate-fade-in"
             >
               Salir del Modo Stream
             </button>
          )}

          <div className="relative mb-8">
            <CanvasWheel onWin={onWin} />
          </div>

          {!isSpinning && (
            <button
              onClick={() => setIsSpinning(true)}
              disabled={participants.length < 2}
              className={cn(
                "group relative overflow-hidden px-12 py-6 bg-indigo-600 hover:bg-indigo-700 text-white text-3xl font-black rounded-full shadow-[0_15px_35px_rgba(79,70,229,0.3)] transition-all active:scale-95 disabled:opacity-50 disabled:grayscale",
                isStreamingMode ? "mt-4" : ""
              )}
            >
              <div className="relative z-10 flex items-center gap-3">
                <Play className="w-8 h-8 fill-white" />
                ¡GIRAR!
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </button>
          )}

          {participants.length < 2 && !isStreamingMode && (
            <p className="mt-4 text-sm text-zinc-500 animate-pulse font-medium">
              Agrega al menos dos participantes para comenzar.
            </p>
          )}
        </section>

        {/* Sidebar Section */}
        {!isStreamingMode && (
          <aside className="w-full lg:w-1/3 lg:max-w-md h-[calc(100vh-160px)] lg:sticky lg:top-32">
            <ParticipantPanel />
          </aside>
        )}
      </div>

      {/* Global Modals */}
      <WinnerModal />
      
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />

      <footer className="p-6 text-center text-zinc-400 text-xs border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <p>© 2026 Rueda de Sorteos - Hecho con ❤️ para el mundo. 100% Gratuito y Privado.</p>
      </footer>
    </main>
  );
}

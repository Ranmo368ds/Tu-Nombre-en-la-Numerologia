"use client";

import React, { useState, useEffect } from "react";
import { useWheel } from "@/context/WheelContext";
import { 
  Trash2, 
  Shuffle, 
  Type, 
  SortAsc, 
  Plus, 
  Settings2, 
  History, 
  Share2,
  TableProperties
} from "lucide-react";
import { cn } from "@/lib/utils";

import SettingsModal from "@/components/SettingsModal";

const ParticipantPanel = () => {
  const { participants, setParticipants, isSpinning, history, clearHistory } = useWheel();
  const [inputText, setInputText] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"text" | "list">("text");

  const syncInput = (parts: any[]) => {
    setInputText(parts.map(p => p.name).join("\n"));
  };

  useEffect(() => {
    if (viewMode === "text") {
       syncInput(participants);
    }
  }, [participants, viewMode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setInputText(text);
    const names = text.split("\n").filter(n => n.trim() !== "");
    const newParticipants = names.map((name, i) => {
        // Try to preserve existing participant if name matches
        const existing = participants.find(p => p.name === name.trim());
        return existing || {
            id: Math.random().toString(36).substr(2, 9),
            name: name.trim(),
        };
    });
    setParticipants(newParticipants);
  };

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_SIZE = 150;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width;
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height;
              height = MAX_SIZE;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/webp", 0.7));
        };
      };
    });
  };

  const handleImageUpload = async (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressedDataUrl = await compressImage(file);
      const newParticipants = participants.map((p) =>
        p.id === id ? { ...p, image: compressedDataUrl } : p
      );
      setParticipants(newParticipants);
    } catch (error) {
      console.error("Error compressing image:", error);
      alert("No se pudo procesar la imagen.");
    }
  };

  const removeParticipant = (id: string) => {
    setParticipants(participants.filter(p => p.id !== id));
  };

  const addParticipant = () => {
    const newP = {
      id: Math.random().toString(36).substr(2, 9),
      name: `Participante ${participants.length + 1}`,
    };
    setParticipants([...participants, newP]);
  };

  const shuffleParticipants = () => {
    const shuffled = [...participants].sort(() => Math.random() - 0.5);
    setParticipants(shuffled);
  };

  const sortParticipants = () => {
    const sorted = [...participants].sort((a, b) => a.name.localeCompare(b.name));
    setParticipants(sorted);
  };

  const removeAll = () => {
    if (confirm("¿Estás seguro de que quieres borrar todos los nombres?")) {
      setParticipants([]);
      setInputText("");
    }
  };

  const shareWheel = () => {
    const names = participants.map(p => p.name).join(",");
    const url = new URL(window.location.href);
    url.searchParams.set("names", btoa(unescape(encodeURIComponent(names))));
    navigator.clipboard.writeText(url.toString());
    alert("URL de la rueda copiada al portapapeles!");
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-bold text-lg text-zinc-900 dark:text-white">
          <Type className="w-5 h-5 text-indigo-500" />
          Participantes
        </h2>
        <div className="flex items-center gap-2">
            <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg">
                <button 
                    onClick={() => setViewMode("text")}
                    className={cn(
                        "p-1.5 rounded-md transition-all",
                        viewMode === "text" ? "bg-white dark:bg-zinc-700 shadow-sm text-indigo-500" : "text-zinc-500"
                    )}
                    title="Modo Texto"
                >
                    <Type className="w-4 h-4" />
                </button>
                <button 
                    onClick={() => setViewMode("list")}
                    className={cn(
                        "p-1.5 rounded-md transition-all",
                        viewMode === "list" ? "bg-white dark:bg-zinc-700 shadow-sm text-indigo-500" : "text-zinc-500"
                    )}
                    title="Modo Lista"
                >
                    <TableProperties className="w-4 h-4" />
                </button>
            </div>
            <button 
                onClick={() => setIsSettingsOpen(true)}
                className="p-2 bg-zinc-50 dark:bg-zinc-800 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-500 transition-colors"
                title="Configuración"
            >
                <Settings2 className="w-4 h-4" />
            </button>
            <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold px-2 py-0.5 rounded-full">
            {participants.length}
            </span>
        </div>
      </div>

      <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto thin-scrollbar">
        {viewMode === "text" ? (
            <div className="relative group">
              <textarea
                value={inputText}
                onChange={handleInputChange}
                disabled={isSpinning}
                placeholder="Escribe un nombre por línea..."
                className="w-full h-80 p-4 rounded-xl border-2 border-zinc-100 dark:border-zinc-800 focus:border-indigo-500 focus:ring-0 outline-none transition-all resize-none bg-zinc-50/50 dark:bg-zinc-950/50 text-sm md:text-base leading-relaxed"
              />
              <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={removeAll}
                  className="p-1.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-red-500 hover:bg-red-50 shadow-sm"
                  title="Borrar todo"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
        ) : (
            <div className="flex flex-col gap-2 min-h-80">
                {participants.map((p, i) => (
                    <div key={p.id} className="flex items-center gap-2 p-2 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl border border-zinc-100 dark:border-zinc-800 group slide-in">
                        <label className="relative shrink-0 w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden cursor-pointer hover:ring-2 hover:ring-indigo-500 transition-all">
                            {p.image ? (
                                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-zinc-400">
                                    <Plus className="w-4 h-4" />
                                </div>
                            )}
                            <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden" 
                                onChange={(e) => handleImageUpload(p.id, e)}
                            />
                        </label>
                        <input 
                            value={p.name}
                            onChange={(e) => {
                                const newParts = [...participants];
                                newParts[i].name = e.target.value;
                                setParticipants(newParts);
                            }}
                            className="flex-1 bg-transparent border-none outline-none font-medium text-zinc-800 dark:text-zinc-200 px-1"
                        />
                        <button 
                            onClick={() => removeParticipant(p.id)}
                            className="p-1.5 text-zinc-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                ))}
                <button 
                    onClick={addParticipant}
                    className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-400 hover:border-indigo-400 hover:text-indigo-500 transition-all mt-2"
                >
                    <Plus className="w-4 h-4" />
                    Nuevo Participante
                </button>
            </div>
        )}

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={shuffleParticipants}
            disabled={isSpinning || participants.length === 0}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-xl text-sm font-semibold transition-colors disabled:opacity-50"
          >
            <Shuffle className="w-4 h-4" />
            Mezclar
          </button>
          <button
            onClick={sortParticipants}
            disabled={isSpinning || participants.length === 0}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-xl text-sm font-semibold transition-colors disabled:opacity-50"
          >
            <SortAsc className="w-4 h-4" />
            Ordenar
          </button>
        </div>

        <div className="mt-8">
           <h3 className="flex items-center gap-2 font-bold text-sm text-zinc-500 dark:text-zinc-400 mb-3 px-1">
            <History className="w-4 h-4" />
            Historial de Ganadores
            {history.length > 0 && (
                <button 
                    onClick={clearHistory}
                    className="ml-auto text-[10px] text-zinc-400 hover:text-red-500 uppercase tracking-wider"
                >
                    Limpiar
                </button>
            )}
          </h3>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1 thin-scrollbar">
            {history.length === 0 ? (
                <p className="text-center py-8 text-zinc-400 text-xs italic">Aún no hay ganadores...</p>
            ) : (
                history.map((h, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-100 dark:border-zinc-800 slide-in">
                        <div className="w-6 h-6 flex items-center justify-center bg-indigo-500 text-white rounded-full text-[10px] font-bold">
                            {history.length - i}
                        </div>
                        {h.image && <img src={h.image} className="w-6 h-6 rounded-full object-cover" />}
                        <span className="font-semibold text-zinc-800 dark:text-zinc-200 truncate flex-1">{h.name}</span>
                        <span className="text-[10px] text-zinc-400 font-mono">#{h.id.substring(0, 4)}</span>
                    </div>
                ))
            )}
          </div>
        </div>
      </div>

      <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 border-t border-zinc-200 dark:border-zinc-800 flex gap-2">
        <button
          onClick={shareWheel}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 dark:shadow-none transition-all active:scale-95"
        >
          <Share2 className="w-5 h-5" />
          Compartir URL
        </button>
      </div>

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
};

export default ParticipantPanel;

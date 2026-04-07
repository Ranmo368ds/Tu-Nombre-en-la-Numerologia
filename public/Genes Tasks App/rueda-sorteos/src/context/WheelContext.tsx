"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Participant {
  id: string;
  name: string;
  color?: string;
  image?: string;
}

export interface WheelSettings {
  duration: number; // seconds
  spinSound: string;
  winSound: string;
  showImages: boolean;
  theme: "party" | "elegant";
  colors: string[];
}

interface WheelContextType {
  participants: Participant[];
  setParticipants: (p: Participant[]) => void;
  winner: Participant | null;
  setWinner: (p: Participant | null) => void;
  settings: WheelSettings;
  updateSettings: (s: Partial<WheelSettings>) => void;
  history: Participant[];
  addToHistory: (p: Participant) => void;
  clearHistory: () => void;
  isSpinning: boolean;
  setIsSpinning: (b: boolean) => void;
  resetAll: () => void;
}

const DEFAULT_COLORS = [
  "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40",
  "#FF6384", "#C9CBCF", "#5856D6", "#FF9500", "#FF2D55", "#AF52DE"
];

const DEFAULT_SETTINGS: WheelSettings = {
  duration: 5,
  spinSound: "default",
  winSound: "applause",
  showImages: true,
  theme: "party",
  colors: DEFAULT_COLORS,
};

const WheelContext = createContext<WheelContextType | undefined>(undefined);

export function WheelProvider({ children }: { children: React.ReactNode }) {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [winner, setWinner] = useState<Participant | null>(null);
  const [settings, setSettings] = useState<WheelSettings>(DEFAULT_SETTINGS);
  const [history, setHistory] = useState<Participant[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedParticipants = localStorage.getItem("rueda_participants");
      const savedSettings = localStorage.getItem("rueda_settings");
      const savedHistory = localStorage.getItem("rueda_history");

      if (savedParticipants) {
        setParticipants(JSON.parse(savedParticipants));
      } else {
        setParticipants([
          { id: "1", name: "Opción 1" },
          { id: "2", name: "Opción 2" },
          { id: "3", name: "Opción 3" },
          { id: "4", name: "Opción 4" },
        ]);
      }

      if (savedSettings) {
        setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(savedSettings) });
      }

      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (e) {
      console.error("Error loading from localStorage", e);
    }
  }, []);

  // Sync to localStorage with safety
  useEffect(() => {
    try {
      localStorage.setItem("rueda_participants", JSON.stringify(participants));
    } catch (e) {
      console.warn("Storage limit reached, participants not saved locally.");
    }
  }, [participants]);

  useEffect(() => {
    try {
      localStorage.setItem("rueda_settings", JSON.stringify(settings));
    } catch (e) {
      console.warn("Storage limit reached, settings not saved locally.");
    }
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem("rueda_history", JSON.stringify(history));
    } catch (e) {
      console.warn("Storage limit reached, history not saved locally.");
    }
  }, [history]);

  const updateSettings = (newSettings: Partial<WheelSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const addToHistory = (p: Participant) => {
    setHistory((prev) => [p, ...prev].slice(0, 50));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const resetAll = () => {
    localStorage.removeItem("rueda_participants");
    localStorage.removeItem("rueda_settings");
    localStorage.removeItem("rueda_history");
    window.location.reload();
  };

  return (
    <WheelContext.Provider
      value={{
        participants,
        setParticipants,
        winner,
        setWinner,
        settings,
        updateSettings,
        history,
        addToHistory,
        clearHistory,
        isSpinning,
        setIsSpinning,
        resetAll: resetAll as any, // Temporary cast until interface updated
      }}
    >
      {children}
    </WheelContext.Provider>
  );
}

export function useWheel() {
  const context = useContext(WheelContext);
  if (context === undefined) {
    throw new Error("useWheel must be used within a WheelProvider");
  }
  return context;
}

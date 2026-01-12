"use client";

import { useState } from "react";
import { NumerologyForm } from "@/components/NumerologyForm";
import { ResultCard } from "@/components/ResultCard";
import {
  calculateLifePath,
  calculateDestinyDetailed,
  calculateSoulUrgeDetailed,
  calculatePersonalityDetailed,
  type DetailedResult
} from "@/utils/numerology";
import { numberMeanings } from "@/data/meanings";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { CosmicBackground } from "@/components/CosmicBackground";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CompatibilitySection } from "@/components/CompatibilitySection";
import { HomeBusinessSection } from "@/components/HomeBusinessSection";

export default function Home() {
  const t = useTranslations("HomePage");
  const [results, setResults] = useState<{
    lifePath: DetailedResult;
    destiny: DetailedResult;
    soulUrge: DetailedResult;
    personality: DetailedResult;
  } | null>(null);

  const handleCalculate = (name: string, birthDate: string) => {
    setResults({
      lifePath: calculateLifePath(birthDate),
      destiny: calculateDestinyDetailed(name),
      soulUrge: calculateSoulUrgeDetailed(name),
      personality: calculatePersonalityDetailed(name),
    });
  };

  const handleClear = () => {
    setResults(null);
  };

  return (
    <main className="relative min-h-screen flex flex-col overflow-x-hidden">
      <CosmicBackground />

      <div className="container mx-auto px-4 py-8 md:py-16 relative z-10 flex-grow flex flex-col items-center">
        <div className="flex flex-col items-center justify-center text-center space-y-12 w-full mt-4 mb-16">

          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6 max-w-5xl"
          >
            <h1 className="text-4xl md:text-8xl font-mystic text-yellow-400 tracking-tighter glow-gold leading-tight drop-shadow-[0_0_40px_rgba(255,215,0,0.5)]">
              {t('title')}
            </h1>

            <div className="flex flex-col items-center gap-4">
              <p className="text-lg md:text-2xl text-slate-100 font-light drop-shadow-2xl max-w-3xl px-4 italic leading-relaxed opacity-90">
                {t('subtitle')}
              </p>
            </div>
          </motion.div>

          {/* Main Tabs Navigation */}
          <Tabs defaultValue="main" className="w-full max-w-6xl mx-auto">
            <div className="flex justify-center mb-12">
              <TabsList className="grid w-full max-w-md grid-cols-3 bg-white/5 border border-white/10 backdrop-blur-sm">
                <TabsTrigger value="main">Portal</TabsTrigger>
                <TabsTrigger value="synergy">Sinergia</TabsTrigger>
                <TabsTrigger value="spaces">Espacios</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="main" className="space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-xl mx-auto"
              >
                <NumerologyForm onCalculate={handleCalculate} onClear={handleClear} />
              </motion.div>

              <AnimatePresence>
                {results && (
                  <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.8, type: "spring", damping: 25 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16 w-full max-w-6xl mx-auto mb-20 px-4"
                  >
                    <ResultCard
                      label="Camino de Vida"
                      result={results.lifePath}
                      meaning={numberMeanings[results.lifePath.value]}
                      delay={0.1}
                    />
                    <ResultCard
                      label="Destino"
                      result={results.destiny}
                      meaning={numberMeanings[results.destiny.value]}
                      delay={0.2}
                    />
                    <ResultCard
                      label="Deseo del Alma"
                      result={results.soulUrge}
                      meaning={numberMeanings[results.soulUrge.value]}
                      delay={0.3}
                    />
                    <ResultCard
                      label="Personalidad"
                      result={results.personality}
                      meaning={numberMeanings[results.personality.value]}
                      delay={0.4}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </TabsContent>

            <TabsContent value="synergy">
              <CompatibilitySection userLifePath={results?.lifePath.value ?? null} />
            </TabsContent>

            <TabsContent value="spaces">
              <HomeBusinessSection />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <footer className="py-16 text-center z-10 bg-slate-950/90 backdrop-blur-3xl border-t border-white/5 font-bold mt-auto transition-all duration-1000">
        <div className="flex flex-col items-center gap-6">
          <a
            href="https://www.instintosaludable.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:text-yellow-300 font-bold tracking-wide border-b border-gold/30 hover:border-gold pb-0.5 transition-all text-lg font-mystic"
          >
            Adquiere mi eBook completo de Numerología en www.InstintoSaludable.com
          </a>
          <p className="text-slate-400 text-[11px] uppercase tracking-[0.6em]">
            &copy; {new Date().getFullYear()} Sabiduría Ancestral • Portal del Destino • Numerología Sagrada
          </p>
        </div>
      </footer>
    </main>
  );
}

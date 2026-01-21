"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/routing";
import { ArrowLeft, Sparkles, BookType, LayoutGrid } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TarotReading } from "@/components/TarotReading";
import { TarotLibrary } from "@/components/TarotLibrary";
import { motion } from "framer-motion";

export default function TarotPage() {
    const tNav = useTranslations("HomePage.nav");
    const tTarot = useTranslations("TarotPage");

    return (
        <div className="min-h-screen bg-black text-slate-100 pb-20 overflow-x-hidden">
            {/* Mystic Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-[150px] animate-pulse delay-700" />
            </div>

            <main className="relative z-10 pt-24 px-6 max-w-7xl mx-auto space-y-12">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-4">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4 group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            {tNav("home")}
                        </Link>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-2xl">
                                <Sparkles className="w-8 h-8 text-purple-400" />
                            </div>
                            <h1 className="text-4xl md:text-6xl font-mystic font-bold text-white tracking-tight">
                                {tTarot("title")}
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Tabs Interface */}
                <Tabs defaultValue="reading" className="space-y-12">
                    <div className="flex justify-center">
                        <TabsList className="bg-slate-900/80 border border-slate-700/50 p-1 h-14 rounded-full backdrop-blur-sm">
                            <TabsTrigger
                                value="reading"
                                className="px-8 h-full rounded-full data-[state=active]:bg-indigo-600 data-[state=active]:text-white transition-all gap-2"
                            >
                                <Sparkles className="w-4 h-4" />
                                Oráculo Directo
                            </TabsTrigger>
                            <TabsTrigger
                                value="library"
                                className="px-8 h-full rounded-full data-[state=active]:bg-indigo-600 data-[state=active]:text-white transition-all gap-2"
                            >
                                <LayoutGrid className="w-4 h-4" />
                                Biblioteca
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="reading">
                        <TarotReading />
                    </TabsContent>

                    <TabsContent value="library">
                        <TarotLibrary />
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
}

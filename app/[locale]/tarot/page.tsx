"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/routing";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function TarotPage() {
    const tNav = useTranslations("HomePage.nav");
    const tTarot = useTranslations("TarotPage");

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-400 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-400 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <div className="relative z-10 max-w-2xl">
                <Sparkles className="w-16 h-16 mx-auto mb-6 text-purple-200 animate-pulse" />
                <h1 className="text-5xl font-mystic font-bold text-white mb-6 drop-shadow-lg">
                    {tTarot("title")}
                </h1>
                <p className="text-purple-100 text-lg mb-8 leading-relaxed">
                    {tTarot("description")}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-medium hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        {tNav("home")}
                    </Link>
                    <Link
                        href="/numerology"
                        className="px-8 py-4 bg-purple-500 hover:bg-purple-600 text-white rounded-full font-medium transition-all shadow-lg shadow-purple-500/50"
                    >
                        {tTarot("cta_numerology")}
                    </Link>
                </div>
            </div>
        </div>
    );
}

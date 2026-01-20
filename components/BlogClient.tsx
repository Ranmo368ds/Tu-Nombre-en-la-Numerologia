"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/routing";
import { ArrowLeft } from "lucide-react";

export default function BlogClient() {
    const tNav = useTranslations("HomePage.nav");

    return (
        <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-6 pt-24 text-center">
            <h1 className="text-4xl font-mystic font-bold text-stone-900 mb-4">Blog Instinto Saludable</h1>
            <p className="text-stone-600 mb-8 max-w-md">
                Estamos preparando artículos fascinantes sobre bienestar, numerología y aceites esenciales. ¡Vuelve pronto!
            </p>
            <Link href="/" className="px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary-dark transition-colors flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                {tNav("home")}
            </Link>
        </div>
    );
}

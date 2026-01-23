"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/src/i18n/routing";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";

export function LanguagePicker({ variant = "light" }: { variant?: "light" | "dark" }) {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const handleLanguageChange = (newLocale: string) => {
        router.replace(pathname, { locale: newLocale });
    };

    const isDark = variant === "dark";

    return (
        <Select value={locale} onValueChange={handleLanguageChange}>
            <SelectTrigger className={`w-[140px] transition-colors ${isDark
                ? "bg-white/5 border-white/10 text-white hover:bg-white/10"
                : "bg-white border-stone-200 text-stone-700 hover:bg-stone-50"
                }`}>
                <div className="flex items-center gap-2">
                    <Globe className={`w-4 h-4 ${isDark ? "text-emerald-400" : "text-emerald-600"}`} />
                    <SelectValue placeholder="Idioma" />
                </div>
            </SelectTrigger>
            <SelectContent className={`${isDark
                ? "bg-[#111A2E] border-white/10 text-white"
                : "bg-white border-stone-200 text-stone-700"
                }`}>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="pt">Português</SelectItem>
                <SelectItem value="it">Italiano</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
                <SelectItem value="ru">Русский</SelectItem>
                <SelectItem value="pl">Polski</SelectItem>
            </SelectContent>
        </Select>
    );
}


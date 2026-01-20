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

export function LanguagePicker() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const handleLanguageChange = (newLocale: string) => {
        router.replace(pathname, { locale: newLocale });
    };

    return (
        <Select value={locale} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-[140px] bg-white border-stone-200 text-stone-700 hover:bg-stone-50 transition-colors">
                <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-emerald-600" />
                    <SelectValue placeholder="Idioma" />
                </div>
            </SelectTrigger>
            <SelectContent className="bg-white border-stone-200 text-stone-700">
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

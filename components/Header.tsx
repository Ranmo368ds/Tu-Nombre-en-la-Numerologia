"use client";

import React from "react";
import { Link, usePathname } from "@/src/i18n/routing";
import { useTranslations } from "next-intl";
import { LanguagePicker } from "./LanguagePicker";
import { Menu, X, ShoppingBag } from "lucide-react";
import GlobalAudioPlayer from "./GlobalAudioPlayer";
import { useCart } from "@/context/CartContext";

export function Header() {
    const t = useTranslations("HomePage");
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const { toggleCart, totalItems } = useCart();
    const pathname = usePathname();
    const [isMarketingDomain, setIsMarketingDomain] = React.useState(false);

    React.useEffect(() => {
        if (typeof window !== "undefined") {
            const hostname = window.location.hostname;
            // Check if we are on Genes Marketing (either production or preview)
            const isGenes = hostname.includes("genesmarketing") ||
                (hostname.includes("tu-nombre-en-la-numerologia") && !hostname.includes("instintosaludable"));
            setIsMarketingDomain(isGenes);
        }
    }, []);

    // List of paths where the Instinto Saludable header SHOULD be visible (Legacy/Holistic)
    const holisticPaths = [
        "/",
        "/shop",
        "/blog",
        "/numerology",
        "/radio-unica",
        "/radiounica",
        "/contact"
    ];

    const isHolisticPath = holisticPaths.some(path => pathname === path || pathname.startsWith(path));

    // Hide global header if NOT on a holistic path OR if on marketing domain
    if (!isHolisticPath || isMarketingDomain) {
        return null;
    }

    return (
        <nav className="fixed w-full z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-stone-100">
            <div className="max-w-7xl mx-auto px-6 h-24 relative flex items-center justify-center">
                {/* Logo - Centered */}
                <Link href="/" className="flex items-center gap-2 flex-shrink-0">
                    <img
                        src="/instinto-logo.png"
                        alt="Instinto Saludable"
                        className="h-12 md:h-16 w-auto object-contain"
                    />
                </Link>

                {/* Right Side Controls - Absolute Positioning */}
                <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2 md:gap-4">
                    {/* PC Audio Player */}
                    <div className="hidden lg:block">
                        <GlobalAudioPlayer />
                    </div>

                    {/* Language Picker */}
                    <div className="hidden sm:block">
                        <LanguagePicker />
                    </div>

                    {/* Shopping Bag */}
                    <button
                        onClick={toggleCart}
                        className="p-2 hover:bg-stone-100 rounded-full cursor-pointer transition-colors relative"
                    >
                        <ShoppingBag className="w-5 h-5 text-stone-600" />
                        {totalItems > 0 && (
                            <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-white text-[10px] flex items-center justify-center rounded-full border-2 border-[#FDFBF7]">
                                {totalItems}
                            </span>
                        )}
                    </button>

                    {/* Mobile Menu Trigger */}
                    <button
                        className="p-2 lg:hidden text-stone-600"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <span className="sr-only">Menu</span>
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Desktop Navigation - Below or floating? Let's put it in a separate bar for luxury feel if needed, or keep it left but absolute left. */}
            {/* User said "centered logo", I'll put nav absolute left. */}
            <div className="hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2 items-center gap-4 text-[10px] font-bold tracking-widest text-stone-500 uppercase">
                <Link href="/shop?category=oils" className="hover:text-primary transition-colors">{t("nav.oils")}</Link>
                <Link href="/blog" className="hover:text-primary transition-colors">{t("nav.blog")}</Link>
                <Link href="/numerology" className="hover:text-primary transition-colors">{t("nav.numerology")}</Link>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="lg:hidden bg-[#FDFBF7] border-b border-stone-100 px-6 py-8 space-y-4 shadow-xl">
                    <Link href="/shop?category=oils" onClick={() => setIsMenuOpen(false)} className="block text-stone-600 font-medium">{t("nav.oils")}</Link>
                    <Link href="/shop?category=ebooks" onClick={() => setIsMenuOpen(false)} className="block text-stone-600 font-medium">{t("nav.ebooks")}</Link>
                    <Link href="/shop?category=music" onClick={() => setIsMenuOpen(false)} className="block text-stone-600 font-medium">{t("nav.emusic")}</Link>
                    <Link href="/shop?category=holistic" onClick={() => setIsMenuOpen(false)} className="block text-stone-600 font-medium">{t("nav.holistic")}</Link>
                    <Link href="/blog" onClick={() => setIsMenuOpen(false)} className="block text-stone-600 font-medium">{t("nav.blog")}</Link>
                    <Link href="/numerology" onClick={() => setIsMenuOpen(false)} className="block text-stone-600 font-medium">{t("nav.numerology")}</Link>
                    <a href="https://tarot-deck-covers.vercel.app" onClick={() => setIsMenuOpen(false)} className="block text-stone-600 font-medium">{t("nav.tarot")}</a>
                    <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="block text-stone-600 font-medium">{t("nav.contact")}</Link>
                    <div className="pt-4 border-t border-stone-100 flex justify-between items-center bg-stone-50/50 -mx-6 px-6 py-4">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">Radio Unica</span>
                            <span className="text-[11px] text-primary font-medium">Música con alma</span>
                        </div>
                        <GlobalAudioPlayer isMobile />
                    </div>
                    <div className="sm:hidden pt-2">
                        <LanguagePicker />
                    </div>
                </div>
            )}
        </nav>
    );
}

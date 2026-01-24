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
            if (hostname.includes("genesmarketing.com") || hostname.includes("genes-marketing")) {
                setIsMarketingDomain(true);
            }
        }
    }, []);

    // List of marketing-specific paths to hide the global header
    const marketingPaths = [
        "/genes-marketing",
        "/roofing",
        "/sealcoating",
        "/treeservice",
        "/taxservices",
        "/localmarketing"
    ];

    const isMarketingPath = marketingPaths.some(path => pathname === path || pathname.endsWith(path));

    // Hide global header on marketing landing pages or domain
    if (isMarketingPath || isMarketingDomain) {
        return null;
    }

    return (
        <nav className="fixed w-full z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-stone-100">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 flex-shrink-0">
                    <img src="/instinto-logo.png" alt="Instinto Saludable" className="h-10 md:h-12 w-auto object-contain" />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-6 text-sm font-medium tracking-wide text-stone-600">
                    <Link href="/shop?category=oils" className="hover:text-primary transition-colors uppercase text-[11px] tracking-widest px-2 py-1">{t("nav.oils")}</Link>
                    <Link href="/shop?category=ebooks" className="hover:text-primary transition-colors uppercase text-[11px] tracking-widest px-2 py-1">{t("nav.ebooks")}</Link>
                    <Link href="/shop?category=music" className="hover:text-primary transition-colors uppercase text-[11px] tracking-widest px-2 py-1">{t("nav.emusic")}</Link>
                    <Link href="/shop?category=holistic" className="hover:text-primary transition-colors uppercase text-[11px] tracking-widest px-2 py-1">{t("nav.holistic")}</Link>
                    <Link href="/blog" className="hover:text-primary transition-colors uppercase text-[11px] tracking-widest px-2 py-1">{t("nav.blog")}</Link>
                    <Link href="/numerology" className="hover:text-primary transition-colors uppercase text-[11px] tracking-widest px-2 py-1">{t("nav.numerology")}</Link>
                    <a href="https://tarot-deck-covers.vercel.app" className="hover:text-primary transition-colors uppercase text-[11px] tracking-widest px-2 py-1">{t("nav.tarot")}</a>
                    <Link href="/contact" className="hover:text-primary transition-colors uppercase text-[11px] tracking-widest px-2 py-1">{t("nav.contact")}</Link>
                </div>

                {/* Right Side Controls */}
                <div className="flex items-center gap-2 md:gap-4">
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

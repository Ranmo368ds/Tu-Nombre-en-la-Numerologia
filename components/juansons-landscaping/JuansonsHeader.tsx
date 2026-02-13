"use client";

import React, { useState, useEffect } from "react";
import { Link } from "@/src/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { MarketingLanguagePicker } from "@/components/genes-marketing/MarketingLanguagePicker";
import { Phone, Mail, Menu, X, ChevronDown } from "lucide-react";

export default function JuansonsHeader() {
    const t = useTranslations("JuansonsLandscaping");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isJuansonDomain, setIsJuansonDomain] = useState(false);
    const locale = useLocale();

    useEffect(() => {
        setIsJuansonDomain(
            window.location.hostname.includes("juansonslawncare.com") ||
            window.location.hostname.includes("juansonlawncare.com") ||
            window.location.host.includes("localhost:3000")
        );
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const basePath = isJuansonDomain ? "" : "/juansons-landscaping";

    const navItems = [
        { name: t("nav.home"), href: isJuansonDomain ? "/home" : `${basePath}` || "/" },
        { name: t("nav.about"), href: isJuansonDomain ? "/about-us" : `${basePath}/nosotros` },
        {
            name: t("nav.services"),
            href: isJuansonDomain ? "/lawn-services" : `${basePath}/landscaping`,
            dropdown: [
                { name: t("nav.services_dropdown.lawn"), href: isJuansonDomain ? "/lawn-services" : `${basePath}/landscaping` },
                { name: t("nav.services_dropdown.brick"), href: isJuansonDomain ? "/brick-paving" : `${basePath}/brick-paving` },
                { name: t("nav.services_dropdown.fence"), href: isJuansonDomain ? "/fence-services" : `${basePath}/fence` },
                { name: t("nav.services_dropdown.snow"), href: isJuansonDomain ? "/snow-removal" : `${basePath}/snow` },
            ],
        },
        { name: t("nav.gallery"), href: isJuansonDomain ? "/gallery" : `${basePath}/galeria` },
        { name: t("nav.contact"), href: isJuansonDomain ? "/contact-us" : `${basePath}#contact` },
    ];

    return (
        <header className="fixed top-0 left-0 w-full z-50">
            {/* Top Bar */}
            <div className="hidden lg:block bg-[#222222] text-white py-2 px-4 text-sm font-medium border-b border-white/10">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <span className="text-[#91ad41] font-semibold italic">
                            {t("topBar.tagline")}
                        </span>
                    </div>
                    <div className="flex items-center gap-6">
                        <a href={`tel:${t("topBar.phone1")}`} className="flex items-center gap-2 hover:text-[#91ad41] transition-colors">
                            <Phone className="w-4 h-4 text-[#91ad41]" />
                            {t("topBar.phone1")}
                        </a>
                        <a href={`tel:${t("topBar.phone2")}`} className="flex items-center gap-2 hover:text-[#91ad41] transition-colors">
                            <Phone className="w-4 h-4 text-[#91ad41]" />
                            {t("topBar.phone2")}
                        </a>
                        <a href={`mailto:${t("topBar.email")}`} className="flex items-center gap-2 hover:text-[#91ad41] transition-colors">
                            <Mail className="w-4 h-4 text-[#91ad41]" />
                            {t("topBar.email")}
                        </a>
                        <MarketingLanguagePicker variant="dark" />
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <nav className={`transition-all duration-300 ${isScrolled ? "bg-white shadow-lg py-1" : "bg-transparent lg:mt-0"}`}>
                <div className="container mx-auto flex items-stretch relative">
                    {/* Logo Section with Slanted Design */}
                    <div className="relative bg-white py-2 md:py-4 px-4 md:px-8 flex items-center shadow-md z-20 transition-all duration-300 flex-shrink-0">
                        {/* Slant Background - Controlled Overflow */}
                        <div className="absolute top-0 right-0 h-full w-12 bg-white skew-x-[-15deg] origin-top-right -mr-6 -z-10 shadow-[5px_0px_10px_rgba(0,0,0,0.05)] hidden lg:block"></div>

                        <Link href={basePath || "/"} className="flex items-center">
                            <img
                                src="/images/juansons/logo_small.png"
                                alt="JUAN & SONS LAWNCARE AND HARDSCAPE LLC"
                                className="h-10 md:h-20 w-auto object-contain transition-all"
                            />
                        </Link>
                    </div>

                    {/* Navigation Menu (Green bar) */}
                    <div className="flex-1 lg:bg-[#91ad41] flex items-center justify-end lg:justify-center px-4">
                        {/* Desktop Menu */}
                        <ul className="hidden lg:flex items-center h-full">
                            {navItems.map((item) => (
                                <li key={item.name} className="relative h-full group">
                                    {item.dropdown ? (
                                        <div className="h-full">
                                            <button className="h-full px-5 text-white font-bold uppercase text-xs tracking-wider flex items-center gap-1 hover:bg-[#829c3a] transition-colors">
                                                {item.name}
                                                <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform" />
                                            </button>
                                            {/* Dropdown Menu */}
                                            <ul className="absolute left-0 top-full bg-white text-[#222222] min-w-[220px] shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border-t-4 border-[#91ad41]">
                                                {item.dropdown.map((subItem) => (
                                                    <li key={subItem.name}>
                                                        <Link
                                                            href={subItem.href}
                                                            className="block px-6 py-4 border-b border-gray-100 hover:bg-gray-50 hover:text-[#91ad41] transition-colors text-xs font-bold uppercase tracking-wider"
                                                        >
                                                            {subItem.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            className="h-full flex items-center px-5 text-white font-bold uppercase text-xs tracking-wider hover:bg-[#829c3a] transition-colors"
                                        >
                                            {item.name}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>

                        <div className="lg:hidden flex items-center gap-2 h-full">
                            <MarketingLanguagePicker variant={isScrolled ? "dark" : "light"} />
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2 ml-2 text-[#91ad41] hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center"
                                aria-label="Toggle Menu"
                            >
                                {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden bg-white border-t border-gray-100 shadow-2xl animate-in slide-in-from-top duration-300 absolute top-full left-0 right-0 z-40 max-h-[calc(100vh-80px)] overflow-y-auto w-full">
                        <nav className="container mx-auto py-4 px-4">
                            <ul className="flex flex-col gap-1">
                                {navItems.map((item) => (
                                    <li key={item.name} className="flex flex-col">
                                        <div
                                            className="flex justify-between items-center py-3 border-b border-gray-50 px-2"
                                        >
                                            {item.dropdown ? (
                                                <span className="text-[#222222] font-bold uppercase text-sm tracking-wider">
                                                    {item.name}
                                                </span>
                                            ) : (
                                                <Link
                                                    href={item.href}
                                                    className="text-[#222222] font-bold uppercase text-sm tracking-wider w-full"
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    {item.name}
                                                </Link>
                                            )}
                                            {item.dropdown && <ChevronDown className="w-4 h-4 text-[#91ad41]" />}
                                        </div>
                                        {item.dropdown && (
                                            <ul className="bg-gray-50 px-4 py-2 flex flex-col gap-1">
                                                {item.dropdown.map((subItem) => (
                                                    <li key={subItem.name}>
                                                        <Link
                                                            href={subItem.href}
                                                            onClick={() => setIsMenuOpen(false)}
                                                            className="block py-3 text-[#666666] text-xs font-bold uppercase tracking-wider w-full"
                                                        >
                                                            {subItem.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6 flex flex-col gap-4 px-2">
                                <a href={`tel:${t("topBar.phone1")}`} className="flex items-center gap-3 text-sm font-bold text-[#222222]">
                                    <Phone className="w-4 h-4 text-[#91ad41]" />
                                    {t("topBar.phone1")}
                                </a>
                                <a href={`mailto:${t("topBar.email")}`} className="flex items-center gap-3 text-sm font-bold text-[#222222]">
                                    <Mail className="w-4 h-4 text-[#91ad41]" />
                                    {t("topBar.email")}
                                </a>
                            </div>
                        </nav>
                    </div>
                )}
            </nav>
        </header>
    );
}

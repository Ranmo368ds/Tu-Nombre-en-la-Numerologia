"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/src/i18n/routing";
import { Phone, Mail, Instagram, Facebook, MapPin } from "lucide-react";

export default function JuansonsFooter() {
    const t = useTranslations("JuansonsLandscaping");
    const [isJuansonDomain, setIsJuansonDomain] = React.useState(false);
    const locale = useLocale();

    React.useEffect(() => {
        if (typeof window !== "undefined") {
            setIsJuansonDomain(
                window.location.hostname.includes("juansonslawncare.com") ||
                window.location.hostname.includes("juansonlawncare.com") ||
                window.location.host.includes("localhost:3000")
            );
        }
    }, []);

    const basePath = isJuansonDomain ? "" : "/juansons-landscaping";

    return (
        <footer className="bg-[#222222] text-white pt-20 pb-10 border-t border-white/5 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Logo & Tagline */}
                    <div className="lg:col-span-1">
                        <Link href={basePath || "/"} className="flex items-center mb-6">
                            <img
                                src="/images/juansons/logo_small.png"
                                alt="JUAN & SONS LAWNCARE AND HARDSCAPE LLC"
                                className="h-16 w-auto object-contain"
                            />
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            {t("footer.tagline")}
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 bg-white/5 flex items-center justify-center hover:bg-[#91ad41] transition-colors rounded-none">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/5 flex items-center justify-center hover:bg-[#91ad41] transition-colors rounded-none">
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-black uppercase tracking-widest mb-8 text-[#91ad41]">Quick Links</h4>
                        <ul className="space-y-4">
                            <li><Link href={isJuansonDomain ? "/home" : (basePath || "/")} className="text-gray-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-wide">Home</Link></li>
                            <li><Link href={isJuansonDomain ? "/about-us" : `${basePath}/nosotros`} className="text-gray-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-wide">About Us</Link></li>
                            <li><Link href={isJuansonDomain ? "/lawn-services" : `${basePath}/landscaping`} className="text-gray-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-wide">Our Services</Link></li>
                            <li><Link href={isJuansonDomain ? "/gallery" : `${basePath}/galeria`} className="text-gray-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-wide">Gallery</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-lg font-black uppercase tracking-widest mb-8 text-[#91ad41]">Services</h4>
                        <ul className="space-y-4">
                            <li><Link href={isJuansonDomain ? "/lawn-services" : `${basePath}/landscaping`} className="text-gray-400 hover:text-[#91ad41] transition-colors text-sm font-bold uppercase tracking-wide italic">Lawn Maintenance</Link></li>
                            <li><Link href={isJuansonDomain ? "/brick-paving" : `${basePath}/brick-paving`} className="text-gray-400 hover:text-[#91ad41] transition-colors text-sm font-bold uppercase tracking-wide italic">Brick Paving</Link></li>
                            <li><Link href={isJuansonDomain ? "/fence-services" : `${basePath}/fence`} className="text-gray-400 hover:text-[#91ad41] transition-colors text-sm font-bold uppercase tracking-wide italic">Fence Installation</Link></li>
                            <li><Link href={isJuansonDomain ? "/snow-removal" : `${basePath}/snow`} className="text-gray-400 hover:text-[#91ad41] transition-colors text-sm font-bold uppercase tracking-wide italic">Snow Removal</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-black uppercase tracking-widest mb-8 text-[#91ad41]">Contact</h4>
                        <ul className="space-y-6">
                            <li className="flex items-center gap-4">
                                <Phone className="w-5 h-5 text-[#91ad41]" />
                                <span className="text-gray-400 text-sm">{t("topBar.phone1")}</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <Mail className="w-5 h-5 text-[#91ad41]" />
                                <span className="text-gray-400 text-sm">{t("topBar.email")}</span>
                            </li>
                            <li className="flex items-start gap-4">
                                <MapPin className="w-5 h-5 text-[#91ad41]" />
                                <span className="text-gray-400 text-sm">Serving Chicago Northwest Suburbs and Surrounding Areas</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                        &copy; {new Date().getFullYear()} JUAN & SONS LAWNCARE AND HARDSCAPE LLC. {t("footer.rights")}
                    </p>
                    <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                        <a href="#" className="hover:text-[#91ad41] transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-[#91ad41] transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

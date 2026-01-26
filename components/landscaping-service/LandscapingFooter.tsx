'use client';

import { useTranslations } from 'next-intl';
import { Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';

export default function LandscapingFooter() {
    const t = useTranslations('LandscapingPage');
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-br from-[#081c15] via-[#1b4332] to-[#081c15] text-[#d8f3dc] py-16 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Company Info */}
                    <div className="space-y-6">
                        <div className="flex flex-col">
                            <Image
                                src="/images/GENES-MARKETING-LOGO.png"
                                alt="Genes Marketing Logo"
                                width={240}
                                height={60}
                                className="h-10 w-auto object-contain mb-3 brightness-125"
                            />
                            <p className="text-sm font-bold text-[#52b788] tracking-widest uppercase">Genes Marketing</p>
                        </div>
                        <p className="text-[#b7e4c7]/60 text-sm leading-relaxed max-w-xs font-medium">
                            Premium marketing solutions for specialized landscaping contractors. We grow your business as beautifully as you grow your gardens.
                        </p>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-black mb-8 uppercase tracking-widest text-xs border-b border-white/10 pb-2 inline-block">Direct Contact</h4>
                        <ul className="space-y-6">
                            <li>
                                <a
                                    href="mailto:ventas@genesmarketing.com"
                                    className="hover:text-[#52b788] transition-colors flex items-start gap-4 group"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#52b788]/10 transition-colors">
                                        <Mail className="w-5 h-5 text-[#52b788] group-hover:text-[#52b788]" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-[#b7e4c7]/40 uppercase font-black tracking-tight">Email Sales</span>
                                        <span className="break-all font-bold">ventas@genesmarketing.com</span>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="tel:+18475029685"
                                    className="hover:text-[#52b788] transition-colors flex items-start gap-4 group"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#52b788]/10 transition-colors">
                                        <Phone className="w-5 h-5 text-[#52b788] group-hover:text-[#52b788]" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-[#b7e4c7]/40 uppercase font-black tracking-tight">Call Us</span>
                                        <span className="font-bold">+1 (847) 502-9685</span>
                                    </div>
                                </a>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                                    <MapPin className="w-5 h-5 text-[#52b788]" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-[#b7e4c7]/40 uppercase font-black tracking-tight">Presence</span>
                                    <span className="font-bold">Chicago Northwest Suburbs & WI</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-white font-black mb-8 uppercase tracking-widest text-xs border-b border-white/10 pb-2 inline-block">Lead Pillars</h4>
                        <ul className="space-y-4 text-[#b7e4c7]/60 font-bold">
                            <li className="flex items-center gap-3 hover:text-[#52b788] transition-colors cursor-pointer group">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#52b788]/30 group-hover:bg-[#52b788]"></div>
                                <span>Lush EDDM Systems</span>
                            </li>
                            <li className="flex items-center gap-3 hover:text-[#52b788] transition-colors cursor-pointer group">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#52b788]/30 group-hover:bg-[#52b788]"></div>
                                <span>Landscape Door Hangers</span>
                            </li>
                            <li className="flex items-center gap-3 hover:text-[#52b788] transition-colors cursor-pointer group">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#52b788]/30 group-hover:bg-[#52b788]"></div>
                                <span>Design Google Ads</span>
                            </li>
                            <li className="flex items-center gap-3 hover:text-[#52b788] transition-colors cursor-pointer group">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#52b788]/30 group-hover:bg-[#52b788]"></div>
                                <span>Pinterest Visuals</span>
                            </li>
                            <li className="flex items-center gap-3 hover:text-[#52b788] transition-colors cursor-pointer group">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#52b788]/30 group-hover:bg-[#52b788]"></div>
                                <span>Route Yard Signs</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-[#b7e4c7]/30 font-black tracking-widest">
                    <p>© {currentYear} Genes Marketing. Specialized Marketing for Landscape Pros.</p>
                    <div className="flex items-center gap-6">
                        <span className="hover:text-[#52b788] cursor-pointer transition-colors">Privacy Policy</span>
                        <span className="hover:text-[#52b788] cursor-pointer transition-colors">Terms of Service</span>
                        <p className="flex items-center gap-2">
                            Grown with <span className="text-[#52b788] animate-pulse">🌱</span> in Chicago
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

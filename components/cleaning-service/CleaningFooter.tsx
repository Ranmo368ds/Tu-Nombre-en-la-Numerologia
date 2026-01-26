'use client';

import { useTranslations } from 'next-intl';
import { Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';

export default function CleaningFooter() {
    const t = useTranslations('CleaningPage');
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-slate-300 py-16 border-t border-blue-800/20">
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
                                className="h-10 w-auto object-contain mb-3 brightness-110"
                            />
                            <p className="text-sm font-bold text-cyan-400 tracking-widest uppercase">Genes Marketing</p>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                            High-impact marketing solutions for professional cleaning companies. We specialize in building authority and generating consistent leads for residential and commercial services.
                        </p>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs border-b border-white/10 pb-2 inline-block">Direct Contact</h4>
                        <ul className="space-y-6">
                            <li>
                                <a
                                    href="mailto:ventas@genesmarketing.com"
                                    className="hover:text-cyan-400 transition-colors flex items-start gap-4 group"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-cyan-500/10 transition-colors">
                                        <Mail className="w-5 h-5 text-cyan-500 group-hover:text-cyan-400" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">Email Sales</span>
                                        <span className="break-all font-medium">ventas@genesmarketing.com</span>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="tel:+18475029685"
                                    className="hover:text-cyan-400 transition-colors flex items-start gap-4 group"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-cyan-500/10 transition-colors">
                                        <Phone className="w-5 h-5 text-cyan-500 group-hover:text-cyan-400" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">Call Us</span>
                                        <span className="font-medium">+1 (847) 502-9685</span>
                                    </div>
                                </a>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                                    <MapPin className="w-5 h-5 text-cyan-500" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">Presence</span>
                                    <span className="font-medium">Chicago Northwest Suburbs & WI</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs border-b border-white/10 pb-2 inline-block">Marketing Pillars</h4>
                        <ul className="space-y-4 text-slate-400">
                            <li className="flex items-center gap-3 hover:text-cyan-400 transition-colors cursor-pointer group">
                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/30 group-hover:bg-cyan-500"></div>
                                <span>EDDM (Direct Mail)</span>
                            </li>
                            <li className="flex items-center gap-3 hover:text-cyan-400 transition-colors cursor-pointer group">
                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/30 group-hover:bg-cyan-500"></div>
                                <span>Door Hangers</span>
                            </li>
                            <li className="flex items-center gap-3 hover:text-cyan-400 transition-colors cursor-pointer group">
                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/30 group-hover:bg-cyan-500"></div>
                                <span>Google Ads</span>
                            </li>
                            <li className="flex items-center gap-3 hover:text-cyan-400 transition-colors cursor-pointer group">
                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/30 group-hover:bg-cyan-500"></div>
                                <span>Pinterest Marketing</span>
                            </li>
                            <li className="flex items-center gap-3 hover:text-cyan-400 transition-colors cursor-pointer group">
                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/30 group-hover:bg-cyan-500"></div>
                                <span>Yard Signs</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-500 font-medium tracking-wide">
                    <p>© {currentYear} Genes Marketing. Specialized Marketing for Cleaning Pros.</p>
                    <div className="flex items-center gap-6">
                        <span className="hover:text-cyan-400 cursor-pointer transition-colors">Privacy Policy</span>
                        <span className="hover:text-cyan-400 cursor-pointer transition-colors">Terms of Service</span>
                        <p className="flex items-center gap-2">
                            Built with <span className="text-blue-500 animate-pulse">💙</span> in Chicago
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

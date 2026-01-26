import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "@/src/i18n/routing";

export default function SealcoatingFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-zinc-900 text-zinc-300 py-16 border-t border-zinc-800">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Company Info */}
                    <div className="space-y-6">
                        <Link href="/genesmarketing" className="inline-block">
                            <img
                                src="/images/GENES-MARKETING-LOGO.png"
                                alt="Genes Marketing"
                                className="h-10 w-auto object-contain mb-3"
                            />
                        </Link>
                        <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
                            High-impact marketing solutions for professional sealcoating and asphalt companies. We help you dominate your local neighborhoods and generate consistent seasonal leads.
                        </p>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs border-b border-zinc-800 pb-2 inline-block">Direct Contact</h4>
                        <ul className="space-y-6">
                            <li>
                                <a
                                    href="mailto:ventas@genesmarketing.com"
                                    className="hover:text-orange-400 transition-colors flex items-start gap-4 group"
                                >
                                    <Mail className="w-5 h-5 text-zinc-500 group-hover:text-orange-400 flex-shrink-0 mt-0.5" />
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-tight">Email Sales</span>
                                        <span className="break-all font-medium">ventas@genesmarketing.com</span>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="tel:+18475029685"
                                    className="hover:text-orange-400 transition-colors flex items-start gap-4 group"
                                >
                                    <Phone className="w-5 h-5 text-zinc-500 group-hover:text-orange-400 flex-shrink-0 mt-0.5" />
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-tight">Call Us</span>
                                        <span className="font-medium">+1 (847) 502-9685</span>
                                    </div>
                                </a>
                            </li>
                            <li className="flex items-start gap-4">
                                <MapPin className="w-5 h-5 text-zinc-500 flex-shrink-0 mt-0.5" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-tight">Presence</span>
                                    <span className="font-medium">Chicago Northwest Suburbs & WI</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs border-b border-zinc-800 pb-2 inline-block">Marketing Pillars</h4>
                        <ul className="space-y-4 text-zinc-400">
                            <li className="hover:text-orange-400 transition-colors cursor-pointer list-disc list-inside">EDDM (Direct Mail)</li>
                            <li className="hover:text-orange-400 transition-colors cursor-pointer list-disc list-inside">Door Hangers</li>
                            <li className="hover:text-orange-400 transition-colors cursor-pointer list-disc list-inside">Google Ads</li>
                            <li className="hover:text-orange-400 transition-colors cursor-pointer list-disc list-inside">Pinterest Marketing</li>
                            <li className="hover:text-orange-400 transition-colors cursor-pointer list-disc list-inside">Yard Signs</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-zinc-500 font-medium tracking-wide">
                    <p>© {currentYear} Genes Marketing. Specialized Marketing for Sealcoating Pros.</p>
                    <div className="flex items-center gap-6">
                        <Link href="/privacy" className="hover:text-orange-400 transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-orange-400 transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

'use client';

import { useTranslations } from 'next-intl';
import { Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';

export default function TreeServiceFooter() {
    const t = useTranslations('TreeServicePage');
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-br from-gray-900 via-emerald-950 to-gray-900 text-gray-300 py-16 border-t border-emerald-800/30">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Company Info */}
                    <div>
                        <div className="mb-6">
                            <Image
                                src="/images/GENES-MARKETING-LOGO.png"
                                alt="Genes Marketing Logo"
                                width={180}
                                height={60}
                                className="h-12 w-auto mb-3"
                            />
                            <p className="text-sm font-semibold text-emerald-400">Tree Service Marketing</p>
                        </div>
                        <p className="text-gray-400 leading-relaxed">
                            Specialized marketing solutions for tree service companies. We help you generate more calls, quotes, and jobs through proven local marketing strategies.
                        </p>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Contact</h4>
                        <ul className="space-y-4">
                            <li>
                                <a
                                    href="mailto:GetOnBoard@genesmarketing.com"
                                    className="hover:text-emerald-400 transition-colors flex items-start gap-3 group"
                                >
                                    <Mail className="w-5 h-5 text-emerald-500 group-hover:text-emerald-400 flex-shrink-0 mt-0.5" />
                                    <span className="break-all">GetOnBoard@genesmarketing.com</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="tel:+18475029685"
                                    className="hover:text-emerald-400 transition-colors flex items-start gap-3 group"
                                >
                                    <Phone className="w-5 h-5 text-emerald-500 group-hover:text-emerald-400 flex-shrink-0 mt-0.5" />
                                    <span>+1 (847) 502-9685</span>
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                <span>Chicago Northwest Suburbs, IL</span>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Marketing Services</h4>
                        <ul className="space-y-3 text-gray-400">
                            <li className="hover:text-emerald-400 transition-colors cursor-pointer">EDDM (Direct Mail)</li>
                            <li className="hover:text-emerald-400 transition-colors cursor-pointer">Door Hangers</li>
                            <li className="hover:text-emerald-400 transition-colors cursor-pointer">Google Ads</li>
                            <li className="hover:text-emerald-400 transition-colors cursor-pointer">Pinterest Marketing</li>
                            <li className="hover:text-emerald-400 transition-colors cursor-pointer">Yard Signs</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-emerald-800/30 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <p>© {currentYear} Genes Marketing. All rights reserved.</p>
                    <p className="flex items-center gap-2">
                        Made with <span className="text-emerald-500">❤️</span> for Tree Service Companies
                    </p>
                </div>
            </div>
        </footer>
    );
}

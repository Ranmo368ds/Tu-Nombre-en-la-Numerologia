'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useLocale } from 'next-intl';
import { CATEGORIES } from '@/lib/eddm/categories';

interface EDDMHeaderProps {
    currentMonth: string;
}

export default function EDDMHeader({ currentMonth }: EDDMHeaderProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const locale = useLocale();

    return (
        <header className="sticky top-0 z-50 bg-white shadow-md">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href={`/${locale}/eddm/${currentMonth}`} className="flex items-center">
                        <div className="text-2xl font-bold text-eddm-navy">
                            LOGO
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link
                            href={`/${locale}/eddm/${currentMonth}`}
                            className="text-eddm-navy hover:text-eddm-sky-blue transition-colors font-medium"
                        >
                            Home
                        </Link>
                        <Link
                            href={`/${locale}/eddm/${currentMonth}#services`}
                            className="text-eddm-navy hover:text-eddm-sky-blue transition-colors font-medium"
                        >
                            Services
                        </Link>
                        <Link
                            href={`/${locale}/eddm/${currentMonth}#games`}
                            className="text-eddm-navy hover:text-eddm-sky-blue transition-colors font-medium"
                        >
                            Games
                        </Link>
                        <Link
                            href={`/${locale}/eddm/archive`}
                            className="text-eddm-navy hover:text-eddm-sky-blue transition-colors font-medium"
                        >
                            Archive
                        </Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 text-eddm-navy"
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {mobileMenuOpen ? (
                                <path d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <nav className="md:hidden py-4 border-t border-gray-200">
                        <div className="flex flex-col space-y-4">
                            <Link
                                href={`/${locale}/eddm/${currentMonth}`}
                                className="text-eddm-navy hover:text-eddm-sky-blue transition-colors font-medium"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                href={`/${locale}/eddm/${currentMonth}#services`}
                                className="text-eddm-navy hover:text-eddm-sky-blue transition-colors font-medium"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Services
                            </Link>
                            <Link
                                href={`/${locale}/eddm/${currentMonth}#games`}
                                className="text-eddm-navy hover:text-eddm-sky-blue transition-colors font-medium"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Games
                            </Link>
                            <Link
                                href={`/${locale}/eddm/archive`}
                                className="text-eddm-navy hover:text-eddm-sky-blue transition-colors font-medium"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Archive
                            </Link>
                        </div>
                    </nav>
                )}
            </div>
        </header>
    );
}

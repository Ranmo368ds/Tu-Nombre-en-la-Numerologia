'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';
import Image from 'next/image';

export default function TreeServiceHeader() {
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();

    const switchLocale = (newLocale: string) => {
        // Remove current locale from pathname and add new one
        const pathWithoutLocale = pathname.replace(/^\/(es|en)/, '');
        router.push(`/${newLocale}${pathWithoutLocale}`);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <Image
                        src="/images/GENES-MARKETING-LOGO.png"
                        alt="Genes Marketing Logo"
                        width={120}
                        height={40}
                        className="h-10 w-auto"
                        priority
                    />
                    <div className="border-l border-gray-300 pl-3">
                        <p className="text-sm font-semibold text-gray-700">Tree Service Marketing</p>
                    </div>
                </div>

                {/* Language Selector */}
                <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-gray-600" />
                    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                        <button
                            onClick={() => switchLocale('es')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${locale === 'es'
                                ? 'bg-white text-emerald-700 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Español
                        </button>
                        <button
                            onClick={() => switchLocale('en')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${locale === 'en'
                                ? 'bg-white text-emerald-700 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            English
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

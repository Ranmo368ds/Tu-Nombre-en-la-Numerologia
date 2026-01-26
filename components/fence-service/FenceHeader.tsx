import React from "react";
import { Link } from "@/src/i18n/routing";
import { MarketingLanguagePicker } from "@/components/genes-marketing/MarketingLanguagePicker";

export default function FenceHeader() {
    return (
        <header className="fixed top-0 left-0 w-full z-50 py-6 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
            <div className="container mx-auto px-4 relative flex items-center justify-center">
                {/* Logo / Branding - Centered */}
                <Link href="/genesmarketing" className="flex items-center gap-2">
                    <img
                        src="/images/GENES-MARKETING-COLOR.png"
                        alt="Genes Marketing"
                        className="h-12 md:h-20 w-auto object-contain drop-shadow-lg"
                    />
                </Link>

                {/* Right Side - Absolute Positioned */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-4">
                    <MarketingLanguagePicker variant="light" />
                </div>
            </div>
        </header>
    );
}

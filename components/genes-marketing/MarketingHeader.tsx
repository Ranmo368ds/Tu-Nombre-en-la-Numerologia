"use client";

import React from "react";
import { Link } from "@/src/i18n/routing";
import { MarketingLanguagePicker } from "@/components/genes-marketing/MarketingLanguagePicker";

export default function MarketingHeader() {
    return (
        <header className="absolute top-0 left-0 w-full z-50 py-6">
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Logo / Branding */}
                <Link href="/genes-marketing" className="flex items-center gap-2">
                    <img src="/images/GENES-MARKETING-LOGO.png" alt="Genes Marketing" className="h-10 md:h-12 w-auto object-contain" />
                </Link>

                {/* Right Side */}
                <div className="flex items-center gap-4">
                    <MarketingLanguagePicker variant="dark" />
                </div>
            </div>
        </header>
    );
}

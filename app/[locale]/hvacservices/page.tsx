import React from "react";
import HvacHero from "@/components/marketing/hvac-service/HvacHero";
import HvacFeatures from "@/components/marketing/hvac-service/HvacFeatures";
import HvacPricing from "@/components/marketing/hvac-service/HvacPricing";
import { Link } from "@/src/i18n/routing";
import { ArrowRight, HelpCircle } from "lucide-react";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/src/i18n/routing";
import type { Metadata } from "next";

interface HvacServicesPageProps {
    params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: HvacServicesPageProps): Promise<Metadata> {
    const { locale } = await params;
    const isEs = locale === "es";
    return {
        title: isEs
            ? "Marketing para HVAC | Genera Leads y Escala tu Negocio | Genes Marketing"
            : "HVAC Marketing Services | Lead Generation & Growth | Genes Marketing",
        description: isEs
            ? "Sistema de generación de leads de alta intención y automatización de citas diseñado exclusivamente para contratistas de HVAC que buscan escalar a $1M+."
            : "High-intent lead generation and automated appointment systems designed exclusively for HVAC contractors scaling to $1M+.",
        metadataBase: new URL("https://genesmarketing.com"),
        alternates: {
            languages: {
                en: "/en/hvacservices",
                es: "/es/hvacservices",
                "x-default": "/hvacservices",
            },
        },
        openGraph: {
            title: isEs ? "Marketing Especializado para HVAC" : "Specialized HVAC Marketing System",
            description: isEs
                ? "Leads, automatización y escala para contratistas de HVAC."
                : "Leads, automation and scale for HVAC contractors.",
            url: `https://genesmarketing.com/${locale}/hvacservices`,
            siteName: "Genes Marketing",
            locale,
            type: "website",
        },
    };
}

export default async function HvacServicesPage({ params }: HvacServicesPageProps) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <main className="min-h-screen bg-black text-white selection:bg-blue-600/30">
            <HvacHero />
            <HvacFeatures />
            <HvacPricing />

            {/* FAQ / Final CTA Section */}
            <section className="py-40 px-6 relative border-t border-white/5">
                <div className="container mx-auto max-w-4xl text-center z-10 relative">
                    <div className="flex flex-col gap-10">
                        <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none">
                            Not sure which plan is right for your HVAC volume?
                        </h2>
                        <p className="text-lg text-white/40 leading-relaxed max-w-2xl mx-auto font-medium">
                            We offer personalized system audits to calculate your local market capacity and recommended initial investment.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center mt-10">
                            <Link href="/contact" className="px-12 py-6 bg-blue-600 hover:bg-white hover:text-black rounded-[2rem] font-black text-sm uppercase tracking-widest text-center transition-all shadow-2xl shadow-blue-600/30 group flex items-center justify-center gap-4">
                                Schedule Audit <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                            </Link>
                            <Link href="/about" className="px-12 py-6 bg-white/5 hover:bg-white/10 rounded-[2rem] font-black text-sm uppercase tracking-widest text-center transition-all border border-white/5 flex items-center justify-center gap-4">
                                Our Method <HelpCircle className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Background Gradients */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-blue-600/5 rounded-full blur-[200px] pointer-events-none" />
            </section>
        </main>
    );
}


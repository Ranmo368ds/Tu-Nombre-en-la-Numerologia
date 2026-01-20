import { Suspense } from "react";
import NumerologyClient from "@/components/NumerologyClient";
import { getMessages } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const messages: any = await getMessages({ locale });
    const seo = messages.SEO;

    return {
        title: `${messages.Numerology.title} | ${seo.title}`,
        description: messages.Numerology.subtitle,
        openGraph: {
            title: `${messages.Numerology.title} | ${seo.og_title}`,
            description: messages.Numerology.subtitle,
        }
    };
}

export default function NumerologyPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="animate-pulse text-gold font-mystic tracking-widest text-xl">
                    PORTAL MÍSTICO...
                </div>
            </div>
        }>
            <NumerologyClient />
        </Suspense>
    );
}

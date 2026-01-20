import { Suspense } from "react";
import ContactClient from "@/components/ContactClient";
import { getMessages } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const messages: any = await getMessages({ locale });
    const seo = messages.SEO;

    return {
        title: `${messages.HomePage.nav.contact} | ${seo.title}`,
        description: messages.Contact.subtitle,
        openGraph: {
            title: `${messages.HomePage.nav.contact} | ${seo.og_title}`,
            description: messages.Contact.subtitle,
        }
    };
}

export default function ContactPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
                <div className="animate-pulse text-stone-400 font-mystic tracking-widest text-xl">
                    INSTINTO SALUDABLE...
                </div>
            </div>
        }>
            <ContactClient />
        </Suspense>
    );
}

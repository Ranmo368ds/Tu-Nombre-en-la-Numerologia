import { useTranslations, NextIntlClientProvider } from "next-intl";
import { getTranslations, getMessages } from "next-intl/server";
import { Metadata } from "next";

// Components
import JuansonsHeader from "@/components/juansons-landscaping/JuansonsHeader";
import JuansonsHero from "@/components/juansons-landscaping/JuansonsHero";
import JuansonsAbout from "@/components/juansons-landscaping/JuansonsAbout";
import JuansonsServices from "@/components/juansons-landscaping/JuansonsServices";
import JuansonsGallery from "@/components/juansons-landscaping/JuansonsGallery";
import JuansonsContact from "@/components/juansons-landscaping/JuansonsContact";
import JuansonsFooter from "@/components/juansons-landscaping/JuansonsFooter";

type Props = {
    params: { locale: string };
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "JuansonsLandscaping.seo.home" });

    return {
        title: t("title"),
        description: t("description"),
        keywords: t("keywords"),
        alternates: {
            canonical: "https://www.juansonslawncare.com/home",
        },
        icons: {
            icon: "/favicon-juansons.png",
            shortcut: "/favicon-juansons.png",
            apple: "/favicon-juansons.png",
        },
        openGraph: {
            title: t("og_title"),
            description: t("og_description"),
            type: "website",
            url: "https://www.juansonslawncare.com/home",
            images: [
                {
                    url: "/images/juansons/patio.png",
                    width: 1200,
                    height: 630,
                    alt: "JUAN & SONS LAWNCARE AND HARDSCAPE LLC Home",
                },
            ],
        },
    };
}

export default async function JuansonsLandscapingPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    // Enable client-side translations and messages
    const messages = await getMessages({ locale });

    return (
        <>
            {/* Hero Section */}
            <JuansonsHero />

            {/* About Section */}
            <JuansonsAbout />

            {/* Services Section */}
            <JuansonsServices />

            {/* Gallery Section */}
            <JuansonsGallery />

            {/* Contact Section */}
            <JuansonsContact />
        </>
    );
}

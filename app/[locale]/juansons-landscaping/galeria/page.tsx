import React from "react";
import { getTranslations, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Metadata } from "next";
import GalleryClient from "./GalleryClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "JuansonsLandscaping.seo.gallery" });

    return {
        title: t("title"),
        description: t("description"),
        alternates: {
            canonical: "https://www.juansonslawncare.com/gallery",
        },
        openGraph: {
            title: t("og_title"),
            description: t("og_description"),
            url: "https://www.juansonslawncare.com/gallery",
        },
        icons: {
            icon: "/favicon-juansons.png",
            shortcut: "/favicon-juansons.png",
            apple: "/favicon-juansons.png",
        },
    };
}

export default async function JuansonsGalleryPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const messages = await getMessages({ locale });

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            <GalleryClient />
        </NextIntlClientProvider>
    );
}

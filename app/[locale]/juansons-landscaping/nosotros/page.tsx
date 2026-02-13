import React from "react";
import { getTranslations, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Metadata } from "next";
import JuansonsServiceLayout from "@/components/juansons-landscaping/JuansonsServiceLayout";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "JuansonsLandscaping.seo.about" });

    return {
        title: t("title"),
        description: t("description"),
        alternates: {
            canonical: "https://www.juansonslawncare.com/about-us",
        },
        openGraph: {
            title: t("og_title"),
            description: t("og_description"),
            url: "https://www.juansonslawncare.com/about-us",
        },
    };
}

export default async function JuansonsAboutPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "JuansonsLandscaping.pages.about" });
    const messages = await getMessages({ locale });

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            <JuansonsServiceLayout
                title={t("title")}
                breadcrumbLabel="About Us"
                image="/images/juansons/pics/Artboard-1.png"
                defaultService="Other / Full Landscaping"
                description={
                    <>
                        <p>{t("text1")}</p>
                        <p>{t("text2")}</p>
                        <p>{t("text3")}</p>
                    </>
                }
            />
        </NextIntlClientProvider>
    );
}

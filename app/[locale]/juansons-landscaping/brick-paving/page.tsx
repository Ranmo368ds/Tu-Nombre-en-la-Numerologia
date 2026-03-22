import React from "react";
import { getTranslations, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Metadata } from "next";
import JuansonsServiceLayout from "@/components/juansons-landscaping/JuansonsServiceLayout";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "JuansonsLandscaping.seo.brick" });

    return {
        title: t("title"),
        description: t("description"),
        alternates: {
            canonical: "https://www.juansonslawncare.com/brick-paving",
        },
        openGraph: {
            title: t("og_title"),
            description: t("og_description"),
            url: "https://www.juansonslawncare.com/brick-paving",
        },
        icons: {
            icon: "/favicon-juansons.png",
            shortcut: "/favicon-juansons.png",
            apple: "/favicon-juansons.png",
        },
    };
}

export default async function JuansonsBrickPavingPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "JuansonsLandscaping.pages.brick_paving" });
    const messages = await getMessages({ locale });

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            <JuansonsServiceLayout
                title={t("title")}
                breadcrumbLabel="Brick Paving"
                image="/images/juansons/patio.png"
                defaultService="Brick Paving"
                description={
                    <>
                        <p className="text-xl font-bold text-[#2d6a4f]">{t("text1")}</p>
                        <div className="my-10 bg-[#222222] p-8 text-white border-r-8 border-[#91ad41]">
                            <p className="leading-relaxed">{t("text2")}</p>
                        </div>
                        <p>{t("text3")}</p>
                        <p className="font-black uppercase tracking-tight text-[#2d6a4f] pt-4">{t("text4")}</p>
                    </>
                }
            />
        </NextIntlClientProvider>
    );
}

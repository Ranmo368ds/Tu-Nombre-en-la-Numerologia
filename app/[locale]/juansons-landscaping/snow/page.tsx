import React from "react";
import { getTranslations, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Metadata } from "next";
import JuansonsServiceLayout from "@/components/juansons-landscaping/JuansonsServiceLayout";
import { Snowflake } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "JuansonsLandscaping.seo.snow" });

    return {
        title: t("title"),
        description: t("description"),
        alternates: {
            canonical: "https://www.juansonslawncare.com/snow-removal",
        },
        openGraph: {
            title: t("og_title"),
            description: t("og_description"),
            url: "https://www.juansonslawncare.com/snow-removal",
        },
        icons: {
            icon: "/favicon-juansons.png",
            shortcut: "/favicon-juansons.png",
            apple: "/favicon-juansons.png",
        },
    };
}

export default async function JuansonsSnowPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "JuansonsLandscaping.pages.snow" });
    const messages = await getMessages({ locale });

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            <JuansonsServiceLayout
                title={t("title")}
                breadcrumbLabel="Snow Removal"
                image="/images/juansons/services/snow.png"
                defaultService="Snow Removal"
                description={
                    <>
                        <p className="text-xl font-bold text-blue-900 bg-blue-50 p-6 border-l-4 border-blue-500">
                            {t("text1")}
                        </p>
                        <div className="py-10 space-y-6">
                            <p>{t("text2")}</p>
                            <div className="bg-[#222222] p-8 text-white relative">
                                <Snowflake className="absolute top-4 right-4 text-blue-400 w-12 h-12 opacity-20" />
                                <p className="leading-relaxed text-lg">{t("text3")}</p>
                            </div>
                            <p className="font-bold text-gray-700 border-b-2 border-[#91ad41] pb-2 inline-block">
                                {t("text4")}
                            </p>
                        </div>
                    </>
                }
            />
        </NextIntlClientProvider>
    );
}

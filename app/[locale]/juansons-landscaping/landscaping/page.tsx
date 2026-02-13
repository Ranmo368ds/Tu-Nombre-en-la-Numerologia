import React from "react";
import { getTranslations, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Metadata } from "next";
import JuansonsServiceLayout from "@/components/juansons-landscaping/JuansonsServiceLayout";
import { Check } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "JuansonsLandscaping.seo.landscaping" });

    return {
        title: t("title"),
        description: t("description"),
        alternates: {
            canonical: "https://www.juansonslawncare.com/lawn-services",
        },
        openGraph: {
            title: t("og_title"),
            description: t("og_description"),
            url: "https://www.juansonslawncare.com/lawn-services",
        },
    };
}

export default async function JuansonsLandscapingPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "JuansonsLandscaping.pages.landscaping" });
    const messages = await getMessages({ locale });

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            <JuansonsServiceLayout
                title={t("title")}
                breadcrumbLabel="Landscaping"
                image="/images/juansons/mulch.jpg"
                defaultService="Lawn Services"
                description={
                    <>
                        <p className="font-bold text-xl text-[#2d6a4f] mb-4">{t("intro")}</p>
                        <h3 className="text-2xl font-black uppercase tracking-tight mt-12 mb-8 border-b-2 border-[#91ad41] pb-2 inline-block">
                            {t("list_title")}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {t.raw("items").map((item: string, i: number) => (
                                <div key={i} className="flex items-start gap-3 bg-white p-4 shadow-sm border-l-4 border-[#91ad41]">
                                    <span className="font-bold text-gray-700">{item}</span>
                                </div>
                            ))}
                        </div>
                        <p className="mt-12 p-6 bg-[#91ad41]/10 border-l-4 border-[#91ad41] italic font-medium">
                            {t("outro")}
                        </p>
                    </>
                }
            />
        </NextIntlClientProvider>
    );
}

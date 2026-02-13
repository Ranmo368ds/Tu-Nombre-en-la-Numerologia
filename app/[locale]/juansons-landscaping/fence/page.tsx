import React from "react";
import { getTranslations, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Metadata } from "next";
import JuansonsServiceLayout from "@/components/juansons-landscaping/JuansonsServiceLayout";
import { ShieldCheck } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "JuansonsLandscaping.seo.fence" });

    return {
        title: t("title"),
        description: t("description"),
        alternates: {
            canonical: "https://www.juansonslawncare.com/fence-services",
        },
        openGraph: {
            title: t("og_title"),
            description: t("og_description"),
            url: "https://www.juansonslawncare.com/fence-services",
        },
    };
}

export default async function JuansonsFencePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "JuansonsLandscaping.pages.fence" });
    const messages = await getMessages({ locale });

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            <JuansonsServiceLayout
                title={t("title")}
                breadcrumbLabel="Fence Services"
                image="/images/juansons/pics/Artboard-5.png"
                defaultService="Fence Services"
                description={
                    <>
                        <p className="text-lg font-bold">{t("text1")}</p>
                        <p className="mt-8">{t("text2")}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
                            {t.raw("types").map((type: string, i: number) => (
                                <div key={i} className="flex items-center gap-4 bg-gray-50 p-6 border-b-2 border-gray-100 group hover:border-[#91ad41] transition-colors">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-[#91ad41] group-hover:bg-[#91ad41] group-hover:text-white transition-all">
                                        <ShieldCheck className="w-6 h-6" />
                                    </div>
                                    <span className="text-xl font-black uppercase tracking-tight text-[#222222]">{type}</span>
                                </div>
                            ))}
                        </div>

                        <p className="leading-relaxed text-gray-600 bg-white p-6 border border-gray-100 shadow-sm italic">
                            {t("text3")}
                        </p>

                        <div className="py-8 space-y-4">
                            <p>{t("text4")}</p>
                            <div className="h-1 w-20 bg-[#91ad41]"></div>
                            <p className="font-bold text-[#2d6a4f]">{t("text5")}</p>
                        </div>
                    </>
                }
            />
        </NextIntlClientProvider>
    );
}

import { routing } from "@/src/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

import PoolHeader from "@/components/marketing/pool-service/PoolHeader";
import PoolHero from "@/components/marketing/pool-service/PoolHero";
import WhyPoolSpecial from "@/components/marketing/pool-service/WhyPoolSpecial";
import PoolMarketingSystem from "@/components/marketing/pool-service/PoolMarketingSystem";
import PoolServiceTypes from "@/components/marketing/pool-service/PoolServiceTypes";
import PoolResults from "@/components/marketing/pool-service/PoolResults";
import PoolServiceAreas from "@/components/marketing/pool-service/PoolServiceAreas";
import PoolPricing from "@/components/marketing/pool-service/PoolPricing";
import PoolFAQ from "@/components/marketing/pool-service/PoolFAQ";
import PoolCTA from "@/components/marketing/pool-service/PoolCTA";
import MarketingContact from "@/components/marketing/genes-marketing/MarketingContact";
import PoolFooter from "@/components/marketing/pool-service/PoolFooter";
import PoolSchema from "@/components/marketing/pool-service/PoolSchema";

export async function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "PoolPage.seo" });
    const baseUrl = "https://genesmarketing.com";

    return {
        title: t("title"),
        description: t("description"),
        keywords: t("keywords"),
        alternates: {
            canonical: `${baseUrl}/${locale}/poolservices`,
            languages: {
                en: `${baseUrl}/en/poolservices`,
                es: `${baseUrl}/es/poolservices`,
            },
        },
        openGraph: {
            title: t("og_title"),
            description: t("og_description"),
            url: `${baseUrl}/${locale}/poolservices`,
            siteName: "Genes Marketing",
            locale: locale === "es" ? "es_US" : "en_US",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: t("twitter_title"),
            description: t("twitter_description"),
        },
    };
}

export default async function PoolServicePage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <main className="min-h-screen bg-white">
            <PoolSchema locale={locale} />
            <PoolHeader />
            <PoolHero />
            <WhyPoolSpecial />
            <PoolMarketingSystem />
            <PoolServiceTypes />
            <PoolResults />
            <PoolServiceAreas />
            <PoolPricing />
            <PoolFAQ />
            <PoolCTA />
            <MarketingContact />
            <PoolFooter />
        </main>
    );
}

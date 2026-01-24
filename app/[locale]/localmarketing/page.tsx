import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import LocalMarketingHero from "@/components/marketing-local/LocalMarketingHero";
import LocalMarketingProblem from "@/components/marketing-local/LocalMarketingProblem";
import LocalMarketingSolution from "@/components/marketing-local/LocalMarketingSolution";
import LocalMarketingSteps from "@/components/marketing-local/LocalMarketingSteps";
import LocalMarketingPinterest from "@/components/marketing-local/LocalMarketingPinterest";
import LocalMarketingPricing from "@/components/marketing-local/LocalMarketingPricing";
import LocalMarketingCTA from "@/components/marketing-local/LocalMarketingCTA";
import LocalMarketingSchema from "@/components/marketing-local/LocalMarketingSchema";
import TreeServiceHeader from "@/components/tree-service/TreeServiceHeader";
import TreeServiceFooter from "@/components/tree-service/TreeServiceFooter";
import ContactSection from "@/components/genes-marketing/ContactSection";
import FloatingWhatsApp from "@/components/genes-marketing/FloatingWhatsApp";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'LocalMarketingPage.seo' });
    const baseUrl = 'https://genesmarketing.com';
    const currentUrl = `${baseUrl}/${locale}/localmarketing`;

    return {
        // ... (title, description, etc)
        title: t('title'),
        description: t('description'),
        keywords: t('keywords'),
        alternates: {
            canonical: currentUrl,
            languages: {
                'es': `${baseUrl}/es/localmarketing`,
                'en': `${baseUrl}/en/localmarketing`,
            },
        },
        openGraph: {
            title: t('title'),
            description: t('description'),
            url: currentUrl,
            siteName: 'Genes Marketing',
            locale: locale,
            type: 'website',
            images: [
                {
                    url: `${baseUrl}/images/marketing-local-og.jpg`,
                    width: 1200,
                    height: 630,
                    alt: t('title'),
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: t('title'),
            description: t('description'),
            images: [`${baseUrl}/images/marketing-local-twitter.jpg`],
        },
    };
}

export default async function LocalMarketingPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return (
        <main className="min-h-screen bg-white">
            <LocalMarketingSchema locale={locale} />
            <TreeServiceHeader />
            <LocalMarketingHero />
            <LocalMarketingProblem />
            <LocalMarketingSolution />
            <LocalMarketingSteps />
            <LocalMarketingPinterest />
            <LocalMarketingPricing />
            <ContactSection />
            <LocalMarketingCTA />
            <TreeServiceFooter />
            <FloatingWhatsApp />
        </main>
    );
}

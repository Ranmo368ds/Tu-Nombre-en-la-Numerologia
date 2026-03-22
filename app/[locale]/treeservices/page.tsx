import TreeServiceHero from "@/components/marketing/tree-service/TreeServiceHero";
import WhySpecialStrategy from "@/components/marketing/tree-service/WhySpecialStrategy";
import MarketingSystemSection from "@/components/marketing/tree-service/MarketingSystemSection";
import ExpectedResults from "@/components/marketing/tree-service/ExpectedResults";
import ServiceAreas from "@/components/marketing/tree-service/ServiceAreas";
import ServiceTypes from "@/components/marketing/tree-service/ServiceTypes";
import PricingPackages from "@/components/marketing/tree-service/PricingPackages";
import TreeServiceFAQ from "@/components/marketing/tree-service/TreeServiceFAQ";
import TreeServiceCTA from "@/components/marketing/tree-service/TreeServiceCTA";
import TreeServiceHeader from "@/components/marketing/tree-service/TreeServiceHeader";
import TreeServiceFooter from "@/components/marketing/tree-service/TreeServiceFooter";
import FloatingWhatsApp from "@/components/marketing/genes-marketing/FloatingWhatsApp";
import ContactSection from "@/components/marketing/genes-marketing/ContactSection";
import TreeServiceSchema from "@/components/marketing/tree-service/TreeServiceSchema";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'TreeServicePage.seo' });

    const baseUrl = 'https://genesmarketing.com';
    const currentUrl = `${baseUrl}/${locale}/treeservices`;

    return {
        // ... (previous lines)
        title: t('title'),
        description: t('description'),
        keywords: t('keywords'),
        authors: [{ name: 'Genes Marketing' }],
        creator: 'Genes Marketing',
        publisher: 'Genes Marketing',

        // Open Graph
        openGraph: {
            title: t('og_title'),
            description: t('og_description'),
            url: currentUrl,
            siteName: 'Genes Marketing',
            locale: locale === 'es' ? 'es_US' : 'en_US',
            type: 'website',
            images: [
                {
                    url: `${baseUrl}/images/tree-service-og.jpg`,
                    width: 1200,
                    height: 630,
                    alt: t('og_image_alt'),
                }
            ],
        },

        // Twitter Card
        twitter: {
            card: 'summary_large_image',
            title: t('twitter_title'),
            description: t('twitter_description'),
            images: [`${baseUrl}/images/tree-service-twitter.jpg`],
            creator: '@genesmarketing',
        },

        // Additional SEO
        alternates: {
            canonical: currentUrl,
            languages: {
                'es': `${baseUrl}/es/treeservices`,
                'en': `${baseUrl}/en/treeservices`,
                'x-default': `${baseUrl}/en/treeservices`,
            },
        },

        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    };
}

export default async function TreeServiceMarketingPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    // Enable static rendering and proper i18n for nested server components
    setRequestLocale(locale);

    return (
        <main className="font-sans antialiased text-[#0B1220] bg-white selection:bg-[#E11D2E]/10 selection:text-[#E11D2E] relative">
            <TreeServiceSchema locale={locale} />
            <TreeServiceHeader />
            <TreeServiceHero />
            <WhySpecialStrategy />
            <MarketingSystemSection />
            <ExpectedResults />
            <ServiceAreas />
            <ServiceTypes />
            <PricingPackages />
            <ContactSection />
            <TreeServiceFAQ />
            <TreeServiceCTA />
            <TreeServiceFooter />
            <FloatingWhatsApp />
        </main>
    );
}

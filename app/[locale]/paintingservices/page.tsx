import PaintingHero from "@/components/painting-service/PaintingHero";
import WhyPaintingSpecial from "@/components/painting-service/WhyPaintingSpecial";
import PaintingMarketingSystem from "@/components/painting-service/PaintingMarketingSystem";
import ExpectedPaintingResults from "@/components/painting-service/ExpectedPaintingResults";
import PaintingServiceAreas from "@/components/painting-service/PaintingServiceAreas";
import PaintingServiceTypes from "@/components/painting-service/PaintingServiceTypes";
import PaintingPricing from "@/components/painting-service/PaintingPricing";
import PaintingFAQ from "@/components/painting-service/PaintingFAQ";
import PaintingCTA from "@/components/painting-service/PaintingCTA";
import PaintingHeader from "@/components/painting-service/PaintingHeader";
import PaintingFooter from "@/components/painting-service/PaintingFooter";
import FloatingWhatsApp from "@/components/genes-marketing/FloatingWhatsApp";
import ContactSection from "@/components/genes-marketing/ContactSection";
import PaintingSchema from "@/components/painting-service/PaintingSchema";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'PaintingPage.seo' });

    const baseUrl = 'https://genesmarketing.com';
    const currentUrl = `${baseUrl}/${locale}/paintingservices`;

    return {
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
                    url: `${baseUrl}/images/GENES-MARKETING-COLOR.png`, // Fallback to logo or create specific one
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
            images: [`${baseUrl}/images/GENES-MARKETING-COLOR.png`],
            creator: '@genesmarketing',
        },

        // Additional SEO
        alternates: {
            canonical: currentUrl,
            languages: {
                'es': `${baseUrl}/es/paintingservices`,
                'en': `${baseUrl}/en/paintingservices`,
                'x-default': `${baseUrl}/en/paintingservices`,
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

export default async function PaintingMarketingPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    // Enable static rendering and proper i18n for nested server components
    setRequestLocale(locale);

    return (
        <main className="font-sans antialiased text-[#0B1220] bg-white selection:bg-blue-600/10 selection:text-blue-600 relative">
            <PaintingSchema locale={locale} />
            <PaintingHeader />
            <PaintingHero />
            <WhyPaintingSpecial />
            <PaintingMarketingSystem />
            <ExpectedPaintingResults />
            <PaintingServiceAreas />
            <PaintingServiceTypes />
            <PaintingPricing />
            <ContactSection />
            <PaintingFAQ />
            <PaintingCTA />
            <PaintingFooter />
            <FloatingWhatsApp />
        </main>
    );
}

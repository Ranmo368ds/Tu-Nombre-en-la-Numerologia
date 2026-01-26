import LandscapingHero from "@/components/landscaping-service/LandscapingHero";
import WhyLandscapingSpecial from "@/components/landscaping-service/WhyLandscapingSpecial";
import LandscapingMarketingSystem from "@/components/landscaping-service/LandscapingMarketingSystem";
import ExpectedLandscapingResults from "@/components/landscaping-service/ExpectedLandscapingResults";
import LandscapingServiceAreas from "@/components/landscaping-service/LandscapingServiceAreas";
import LandscapingServiceTypes from "@/components/landscaping-service/LandscapingServiceTypes";
import LandscapingPricing from "@/components/landscaping-service/LandscapingPricing";
import LandscapingFAQ from "@/components/landscaping-service/LandscapingFAQ";
import LandscapingCTA from "@/components/landscaping-service/LandscapingCTA";
import LandscapingHeader from "@/components/landscaping-service/LandscapingHeader";
import LandscapingFooter from "@/components/landscaping-service/LandscapingFooter";
import FloatingWhatsApp from "@/components/genes-marketing/FloatingWhatsApp";
import ContactSection from "@/components/genes-marketing/ContactSection";
import LandscapingSchema from "@/components/landscaping-service/LandscapingSchema";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'LandscapingPage.seo' });

    const baseUrl = 'https://genesmarketing.com';
    const currentUrl = `${baseUrl}/${locale}/landscapingservices`;

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
                    url: `${baseUrl}/images/GENES-MARKETING-COLOR.png`,
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
                'es': `${baseUrl}/es/landscapingservices`,
                'en': `${baseUrl}/en/landscapingservices`,
                'x-default': `${baseUrl}/en/landscapingservices`,
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

export default async function LandscapingMarketingPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    // Enable static rendering and proper i18n for nested server components
    setRequestLocale(locale);

    return (
        <main className="font-sans antialiased text-[#081c15] bg-white selection:bg-[#52b788]/20 selection:text-[#2d6a4f] relative">
            <LandscapingSchema locale={locale} />
            <LandscapingHeader />
            <LandscapingHero />
            <WhyLandscapingSpecial />
            <LandscapingMarketingSystem />
            <ExpectedLandscapingResults />
            <LandscapingServiceAreas />
            <LandscapingServiceTypes />
            <LandscapingPricing />
            <ContactSection />
            <LandscapingFAQ />
            <LandscapingCTA />
            <LandscapingFooter />
            <FloatingWhatsApp />
        </main>
    );
}

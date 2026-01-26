import CleaningHero from "@/components/cleaning-service/CleaningHero";
import WhyCleaningSpecial from "@/components/cleaning-service/WhyCleaningSpecial";
import CleaningMarketingSystem from "@/components/cleaning-service/CleaningMarketingSystem";
import ExpectedCleaningResults from "@/components/cleaning-service/ExpectedCleaningResults";
import CleaningServiceAreas from "@/components/cleaning-service/CleaningServiceAreas";
import CleaningServiceTypes from "@/components/cleaning-service/CleaningServiceTypes";
import CleaningPricing from "@/components/cleaning-service/CleaningPricing";
import CleaningFAQ from "@/components/cleaning-service/CleaningFAQ";
import CleaningCTA from "@/components/cleaning-service/CleaningCTA";
import CleaningHeader from "@/components/cleaning-service/CleaningHeader";
import CleaningFooter from "@/components/cleaning-service/CleaningFooter";
import FloatingWhatsApp from "@/components/genes-marketing/FloatingWhatsApp";
import ContactSection from "@/components/genes-marketing/ContactSection";
import CleaningSchema from "@/components/cleaning-service/CleaningSchema";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'CleaningPage.seo' });

    const baseUrl = 'https://genesmarketing.com';
    const currentUrl = `${baseUrl}/${locale}/cleaningservices`;

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
                'es': `${baseUrl}/es/cleaningservices`,
                'en': `${baseUrl}/en/cleaningservices`,
                'x-default': `${baseUrl}/en/cleaningservices`,
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

export default async function CleaningMarketingPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    // Enable static rendering and proper i18n for nested server components
    setRequestLocale(locale);

    return (
        <main className="font-sans antialiased text-slate-900 bg-white selection:bg-blue-600/10 selection:text-blue-600 relative">
            <CleaningSchema locale={locale} />
            <CleaningHeader />
            <CleaningHero />
            <WhyCleaningSpecial />
            <CleaningMarketingSystem />
            <ExpectedCleaningResults />
            <CleaningServiceAreas />
            <CleaningServiceTypes />
            <CleaningPricing />
            <ContactSection />
            <CleaningFAQ />
            <CleaningCTA />
            <CleaningFooter />
            <FloatingWhatsApp />
        </main>
    );
}

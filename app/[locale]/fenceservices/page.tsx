import FenceHero from "@/components/fence-service/FenceHero";
import WhyFenceSpecial from "@/components/fence-service/WhyFenceSpecial";
import FenceMarketingSystem from "@/components/fence-service/FenceMarketingSystem";
import ExpectedFenceResults from "@/components/fence-service/ExpectedFenceResults";
import FenceServiceAreas from "@/components/fence-service/FenceServiceAreas";
import FenceServiceTypes from "@/components/fence-service/FenceServiceTypes";
import FencePricing from "@/components/fence-service/FencePricing";
import FenceFAQ from "@/components/fence-service/FenceFAQ";
import FenceCTA from "@/components/fence-service/FenceCTA";
import FenceHeader from "@/components/fence-service/FenceHeader";
import FenceFooter from "@/components/fence-service/FenceFooter";
import FloatingWhatsApp from "@/components/genes-marketing/FloatingWhatsApp";
import ContactSection from "@/components/genes-marketing/ContactSection";
import FenceSchema from "@/components/fence-service/FenceSchema";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'FencePage.seo' });

    const baseUrl = 'https://genesmarketing.com';
    const currentUrl = `${baseUrl}/${locale}/fenceservices`;

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
                'es': `${baseUrl}/es/fenceservices`,
                'en': `${baseUrl}/en/fenceservices`,
                'x-default': `${baseUrl}/en/fenceservices`,
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

export default async function FenceMarketingPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    // Enable static rendering and proper i18n for nested server components
    setRequestLocale(locale);

    return (
        <main className="font-sans antialiased text-[#212529] bg-white selection:bg-[#28a745]/10 selection:text-[#28a745] relative">
            <FenceSchema locale={locale} />
            <FenceHeader />
            <FenceHero />
            <WhyFenceSpecial />
            <FenceMarketingSystem />
            <ExpectedFenceResults />
            <FenceServiceAreas />
            <FenceServiceTypes />
            <FencePricing />
            <ContactSection />
            <FenceFAQ />
            <FenceCTA />
            <FenceFooter />
            <FloatingWhatsApp />
        </main>
    );
}

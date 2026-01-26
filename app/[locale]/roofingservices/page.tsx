import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import RoofingServiceHero from "@/components/roofing-service/RoofingServiceHero";
import WhyRoofingSpecial from "@/components/roofing-service/WhyRoofingSpecial";
import StormIntelligenceFeature from "@/components/roofing-service/StormIntelligenceFeature";
import RoofingMarketingSystem from "@/components/roofing-service/RoofingMarketingSystem";
import RoofingServiceTypes from "@/components/roofing-service/RoofingServiceTypes";
import RoofingServiceAreas from "@/components/roofing-service/RoofingServiceAreas";
import RoofingPricingPackages from "@/components/roofing-service/RoofingPricingPackages";
import RoofingHeader from "@/components/roofing-service/RoofingHeader";
import RoofingFooter from "@/components/roofing-service/RoofingFooter";
import FloatingWhatsApp from "@/components/genes-marketing/FloatingWhatsApp";
import ContactSection from "@/components/genes-marketing/ContactSection";
import RoofingServiceFAQ from "@/components/roofing-service/RoofingServiceFAQ";
import RoofingServiceCTA from "@/components/roofing-service/RoofingServiceCTA";
import RoofingServiceSchema from "@/components/roofing-service/RoofingServiceSchema";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'RoofingPage.seo' });
    const baseUrl = 'https://genesmarketing.com';
    const currentUrl = `${baseUrl}/${locale}/roofingservices`;

    return {
        // ... (title, description, etc)
        title: t('title'),
        description: t('description'),
        keywords: t('keywords'),
        authors: [{ name: 'Genes Marketing' }],
        creator: 'Genes Marketing',
        publisher: 'Genes Marketing',
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
        alternates: {
            canonical: currentUrl,
            languages: {
                'es': `${baseUrl}/es/roofingservices`,
                'en': `${baseUrl}/en/roofingservices`,
                'x-default': `${baseUrl}/en/roofingservices`,
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
                    url: `${baseUrl}/images/roofing-service-og.jpg`,
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
            images: [`${baseUrl}/images/roofing-service-twitter.jpg`],
            creator: '@genesmarketing',
        },
        verification: {
            google: 'your-google-verification-code',
        },
    };
}

export default async function RoofingSidingServicesPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return (
        <main className="font-sans antialiased text-[#0B1220] bg-white selection:bg-blue-500/10 selection:text-blue-600 relative">
            <RoofingServiceSchema locale={locale} />
            <RoofingHeader />
            <RoofingServiceHero />
            <WhyRoofingSpecial />
            <StormIntelligenceFeature />
            <RoofingMarketingSystem />
            <RoofingServiceTypes />
            <RoofingServiceAreas />
            <RoofingPricingPackages />
            <ContactSection />
            <RoofingServiceFAQ />
            <RoofingServiceCTA />
            <RoofingFooter />
            <FloatingWhatsApp />
        </main>
    );
}

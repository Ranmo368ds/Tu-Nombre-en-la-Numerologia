import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import SealcoatingServiceHero from "@/components/marketing/sealcoating-service/SealcoatingServiceHero";
import WhySealcoatingSpecial from "@/components/marketing/sealcoating-service/WhySealcoatingSpecial";
import SealcoatingMarketingSystem from "@/components/marketing/sealcoating-service/SealcoatingMarketingSystem";
import SealcoatingServiceTypes from "@/components/marketing/sealcoating-service/SealcoatingServiceTypes";
import SealcoatingExpectedResults from "@/components/marketing/sealcoating-service/SealcoatingExpectedResults";
import SealcoatingServiceAreas from "@/components/marketing/sealcoating-service/SealcoatingServiceAreas";
import SealcoatingPricingPackages from "@/components/marketing/sealcoating-service/SealcoatingPricingPackages";
import SealcoatingServiceFAQ from "@/components/marketing/sealcoating-service/SealcoatingServiceFAQ";
import SealcoatingServiceCTA from "@/components/marketing/sealcoating-service/SealcoatingServiceCTA";
import SealcoatingHeader from "@/components/marketing/sealcoating-service/SealcoatingHeader";
import SealcoatingFooter from "@/components/marketing/sealcoating-service/SealcoatingFooter";
import FloatingWhatsApp from "@/components/marketing/genes-marketing/FloatingWhatsApp";
import ContactSection from "@/components/marketing/genes-marketing/ContactSection";
import SealcoatingServiceSchema from "@/components/marketing/sealcoating-service/SealcoatingServiceSchema";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'SealcoatingPage.seo' });
    const baseUrl = 'https://genesmarketing.com';
    const currentUrl = `${baseUrl}/${locale}/sealcoatingservices`;

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
                'es': `${baseUrl}/es/sealcoatingservices`,
                'en': `${baseUrl}/en/sealcoatingservices`,
                'x-default': `${baseUrl}/en/sealcoatingservices`,
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
                    url: `${baseUrl}/images/sealcoating-service-og.jpg`,
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
            images: [`${baseUrl}/images/sealcoating-service-twitter.jpg`],
            creator: '@genesmarketing',
        },
        verification: {
            google: 'your-google-verification-code',
        },
    };
}

export default async function SealcoatingServicesPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return (
        <main className="font-sans antialiased text-[#0B1220] bg-white selection:bg-orange-500/10 selection:text-orange-600 relative">
            <SealcoatingServiceSchema locale={locale} />
            <SealcoatingHeader />
            <SealcoatingServiceHero />
            <WhySealcoatingSpecial />
            <SealcoatingMarketingSystem />
            <SealcoatingServiceTypes />
            <SealcoatingExpectedResults />
            <SealcoatingServiceAreas />
            <SealcoatingPricingPackages />
            <ContactSection />
            <SealcoatingServiceFAQ />
            <SealcoatingServiceCTA />
            <SealcoatingFooter />
            <FloatingWhatsApp />
        </main>
    );
}

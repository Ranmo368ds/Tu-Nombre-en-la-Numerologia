import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import SealcoatingServiceHero from "@/components/sealcoating-service/SealcoatingServiceHero";
import WhySealcoatingSpecial from "@/components/sealcoating-service/WhySealcoatingSpecial";
import SealcoatingMarketingSystem from "@/components/sealcoating-service/SealcoatingMarketingSystem";
import SealcoatingServiceTypes from "@/components/sealcoating-service/SealcoatingServiceTypes";
import SealcoatingExpectedResults from "@/components/sealcoating-service/SealcoatingExpectedResults";
import SealcoatingServiceAreas from "@/components/sealcoating-service/SealcoatingServiceAreas";
import SealcoatingPricingPackages from "@/components/sealcoating-service/SealcoatingPricingPackages";
import SealcoatingServiceFAQ from "@/components/sealcoating-service/SealcoatingServiceFAQ";
import SealcoatingServiceCTA from "@/components/sealcoating-service/SealcoatingServiceCTA";
import TreeServiceHeader from "@/components/tree-service/TreeServiceHeader";
import TreeServiceFooter from "@/components/tree-service/TreeServiceFooter";
import FloatingWhatsApp from "@/components/genes-marketing/FloatingWhatsApp";
import ContactSection from "@/components/genes-marketing/ContactSection";
import SealcoatingServiceSchema from "@/components/sealcoating-service/SealcoatingServiceSchema";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
    const t = await getTranslations({ locale, namespace: 'SealcoatingPage.seo' });
    const baseUrl = 'https://genesmarketing.com';
    const currentUrl = `${baseUrl}/${locale}/marketing-para-sealcoating-services`;

    return {
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
                'es': `${baseUrl}/es/marketing-para-sealcoating-services`,
                'en': `${baseUrl}/en/marketing-para-sealcoating-services`,
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

export default function SealcoatingServicesPage({ params: { locale } }: { params: { locale: string } }) {
    return (
        <main className="font-sans antialiased text-[#0B1220] bg-white selection:bg-orange-500/10 selection:text-orange-600 relative">
            <SealcoatingServiceSchema locale={locale} />
            <TreeServiceHeader />
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
            <TreeServiceFooter />
            <FloatingWhatsApp />
        </main>
    );
}

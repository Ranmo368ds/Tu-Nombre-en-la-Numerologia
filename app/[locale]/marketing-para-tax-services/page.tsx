import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import TaxServiceHero from "@/components/tax-service/TaxServiceHero";
import WhyTaxServiceSpecial from "@/components/tax-service/WhyTaxServiceSpecial";
import TaxMarketingSystem from "@/components/tax-service/TaxMarketingSystem";
import TaxServiceTypes from "@/components/tax-service/TaxServiceTypes";
import TaxServiceAreas from "@/components/tax-service/TaxServiceAreas";
import TaxPricingPackages from "@/components/tax-service/TaxPricingPackages";
import TaxServiceFAQ from "@/components/tax-service/TaxServiceFAQ";
import TaxServiceCTA from "@/components/tax-service/TaxServiceCTA";
import TreeServiceHeader from "@/components/tree-service/TreeServiceHeader";
import TreeServiceFooter from "@/components/tree-service/TreeServiceFooter";
import FloatingWhatsApp from "@/components/genes-marketing/FloatingWhatsApp";
import ContactSection from "@/components/genes-marketing/ContactSection";
import TaxServiceSchema from "@/components/tax-service/TaxServiceSchema";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
    const t = await getTranslations({ locale, namespace: 'TaxServicePage.seo' });
    const baseUrl = 'https://genesmarketing.com';
    const currentUrl = `${baseUrl}/${locale}/marketing-para-tax-services`;

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
                'es': `${baseUrl}/es/marketing-para-tax-services`,
                'en': `${baseUrl}/en/marketing-para-tax-services`,
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
                    url: `${baseUrl}/images/tax-service-og.jpg`,
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
            images: [`${baseUrl}/images/tax-service-twitter.jpg`],
            creator: '@genesmarketing',
        },
        verification: {
            google: 'your-google-verification-code',
        },
    };
}

export default function TaxServicesPage({ params: { locale } }: { params: { locale: string } }) {
    return (
        <main className="font-sans antialiased text-[#0B1220] bg-white selection:bg-blue-500/10 selection:text-blue-600 relative">
            <TaxServiceSchema locale={locale} />
            <TreeServiceHeader />
            <TaxServiceHero />
            <WhyTaxServiceSpecial />
            <TaxMarketingSystem />
            <TaxServiceTypes />
            <TaxServiceAreas />
            <TaxPricingPackages />
            <ContactSection />
            <TaxServiceFAQ />
            <TaxServiceCTA />
            <TreeServiceFooter />
            <FloatingWhatsApp />
        </main>
    );
}

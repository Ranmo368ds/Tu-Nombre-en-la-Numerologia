import BenefitsSection from "@/components/genes-marketing/BenefitsSection";
import IndustriesSection from "@/components/genes-marketing/IndustriesSection";
import ContactSection from "@/components/genes-marketing/ContactSection";
import FAQSection from "@/components/genes-marketing/FAQSection";
import FinalCTASection from "@/components/genes-marketing/FinalCTASection";
import FooterSection from "@/components/genes-marketing/FooterSection";
import HeroSection from "@/components/genes-marketing/HeroSection";
import HowItWorksSection from "@/components/genes-marketing/HowItWorksSection";
import PinterestDirectorySection from "@/components/genes-marketing/PinterestDirectorySection";
import MarketingHeader from "@/components/genes-marketing/MarketingHeader";
import Popup from "@/components/genes-marketing/Popup";
import PricingSection from "@/components/genes-marketing/PricingSection";
import TestimonialsSection from "@/components/genes-marketing/TestimonialsSection";
import FloatingWhatsApp from "@/components/genes-marketing/FloatingWhatsApp";
import SchemaMarkup from "@/components/genes-marketing/SchemaMarkup";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'MarketingPage.seo' });

    const baseUrl = 'https://genesmarketing.com';
    const currentUrl = `${baseUrl}/${locale}`;

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
                    url: `${baseUrl}/images/og-image.jpg`,
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
            images: [`${baseUrl}/images/twitter-card.jpg`],
            creator: '@genesmarketing',
        },

        // Additional SEO
        alternates: {
            canonical: currentUrl,
            languages: {
                'es': `${baseUrl}/es/genesmarketing`,
                'en': `${baseUrl}/en/genesmarketing`,
                'x-default': `${baseUrl}/en/genesmarketing`,
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

        other: {
            'google-site-verification': 'your-verification-code-here',
        },
    };
}

export default async function GenesMarketingPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    // Enable static rendering and proper i18n for nested server components
    setRequestLocale(locale);

    return (
        <main className="font-sans antialiased text-[#0B1220] bg-white selection:bg-[#E11D2E]/10 selection:text-[#E11D2E] relative">
            <SchemaMarkup locale={locale} />
            <MarketingHeader />
            <Popup />
            <HeroSection />
            <PinterestDirectorySection />
            <ContactSection />
            <div id="benefits">
                <BenefitsSection />
            </div>
            <IndustriesSection />
            <PricingSection />
            <HowItWorksSection />
            <TestimonialsSection />
            <FAQSection />
            <FinalCTASection />
            <FooterSection />
            <FloatingWhatsApp />
        </main>
    );
}



import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import LocalMarketingHero from "@/components/marketing-local/LocalMarketingHero";
import HowItWorks from "@/components/marketing-local/HowItWorks";
import FlyerMockupSection from "@/components/marketing-local/FlyerMockupSection";
import ZonesList from "@/components/marketing-local/ZonesList";
import PricingPackages from "@/components/marketing-local/PricingPackages";
import PinterestBonus from "@/components/marketing-local/PinterestBonus";
import BookingForm from "@/components/marketing-local/BookingForm";
import FAQSection from "@/components/marketing-local/FAQSection";
import LocalFooter from "@/components/marketing-local/LocalFooter";

// Force dynamic rendering if we rely on headers, otherwise static is fine. 
// Standard for Next.js app router pages is typically automatic or forced dynamic if cookies/headers used.
// We are using simple components.

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'LocalMarketingPage.seo' });
    const baseUrl = 'https://genesmarketing.com';
    const currentUrl = `${baseUrl}/${locale}/localmarketing`;

    return {
        title: t('title'),
        description: t('description'),
        keywords: t('keywords'),
        authors: [{ name: 'Genes Marketing' }],
        alternates: {
            canonical: currentUrl,
            languages: {
                'es': `${baseUrl}/es/localmarketing`,
                'en': `${baseUrl}/en/localmarketing`,
                'x-default': `${baseUrl}/en/localmarketing`,
            },
        },
        robots: {
            index: true,
            follow: true,
        },
        openGraph: {
            title: t('title'),
            description: t('description'),
            url: currentUrl,
            locale: locale,
            type: 'website',
            images: [
                {
                    url: `${baseUrl}/images/marketing-local-og.jpg`,
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
            images: [`${baseUrl}/images/marketing-local-twitter.jpg`], // Assuming this exists too or reuse OG
        },
    };
}

export default async function LocalMarketingPage({ params }: { params: Promise<{ locale: string }> }) {
    // We don't need locale in the component unless passed to client components, but they use next-intl hook.
    // However, we handle the layout here.
    return (
        <main className="min-h-screen bg-slate-950 text-slate-200 selection:bg-cyan-500/20 selection:text-cyan-300">
            <LocalMarketingHero />
            <HowItWorks />
            <FlyerMockupSection />
            <ZonesList />
            <PricingPackages />
            <PinterestBonus />
            <FAQSection />
            <LocalFooter />
        </main>
    );
}

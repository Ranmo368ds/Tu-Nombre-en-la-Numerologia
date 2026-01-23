import BenefitsSection from "@/components/genes-marketing/BenefitsSection";
import IndustriesSection from "@/components/genes-marketing/IndustriesSection";
import ContactSection from "@/components/genes-marketing/ContactSection";
import FAQSection from "@/components/genes-marketing/FAQSection";
import FinalCTASection from "@/components/genes-marketing/FinalCTASection";
import FooterSection from "@/components/genes-marketing/FooterSection";
import HeroSection from "@/components/genes-marketing/HeroSection";
import HowItWorksSection from "@/components/genes-marketing/HowItWorksSection";
import MarketingHeader from "@/components/genes-marketing/MarketingHeader";
import Popup from "@/components/genes-marketing/Popup";
import PricingSection from "@/components/genes-marketing/PricingSection";
import TestimonialsSection from "@/components/genes-marketing/TestimonialsSection";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'MarketingPage.hero' });

    return {
        title: `Genes Marketing | ${t('title')}`,
        description: t('subtitle'),
    };
}

export default async function GenesMarketingPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    // Enable static rendering and proper i18n for nested server components
    setRequestLocale(locale);

    return (
        <main className="font-sans antialiased text-[#0B1220] bg-white selection:bg-[#E11D2E]/10 selection:text-[#E11D2E] relative">
            <MarketingHeader />
            <Popup />
            <HeroSection />
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
        </main>
    );
}



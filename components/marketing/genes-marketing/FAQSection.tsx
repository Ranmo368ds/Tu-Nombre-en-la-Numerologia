import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations } from "next-intl";

export default function FAQSection() {
    const t = useTranslations("MarketingPage.faq");
    const rawItems = t.raw('items');
    const faqItems = (Array.isArray(rawItems) ? rawItems : []) as { q: string, a: string }[];

    return (
        <section id="faq" className="py-24 bg-[#0B1220] text-white">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        {t('title')}
                    </h2>
                    <p className="text-lg text-[#B8C1D1]">
                        {t('subtitle')}
                    </p>
                </div>

                <Accordion type="single" collapsible className="w-full space-y-4">
                    {faqItems.map((item, index) => (
                        <AccordionItem
                            key={index}
                            value={`item-${index}`}
                            className="border border-white/5 rounded-2xl px-8 bg-[#111A2E] overflow-hidden transition-all hover:border-[#E11D2E]/30"
                        >
                            <AccordionTrigger className="text-left font-bold hover:text-[#E11D2E] hover:no-underline text-xl py-8 transition-colors">
                                {item.q}
                            </AccordionTrigger>
                            <AccordionContent className="text-[#B8C1D1] leading-relaxed pb-8 text-lg">
                                {item.a}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}



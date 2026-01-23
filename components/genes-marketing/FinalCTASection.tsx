import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function FinalCTASection() {
    const t = useTranslations("MarketingPage.final_cta");

    return (
        <section className="py-24 bg-[#0B1220] text-white relative overflow-hidden border-t border-white/5">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#E11D2E]/10 pointer-events-none"></div>
            <div className="container mx-auto px-4 relative z-10 text-center">
                <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                    {t('title')}
                </h2>
                <p className="text-xl text-[#B8C1D1] mb-6 max-w-3xl mx-auto leading-relaxed">
                    {t('description')}
                </p>
                <div className="mb-12 py-4 px-8 bg-white/5 rounded-full inline-block border border-white/10">
                    <p className="text-lg md:text-xl text-amber-400 font-bold italic">
                        "{t('trust')}"
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <a
                        href="#pricing"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#E11D2E] text-white font-bold text-xl px-10 py-5 rounded-full shadow-2xl hover:bg-[#B81422] hover:scale-105 transition-all text-center"
                    >
                        {t('cta_packages')}
                        <ArrowRight className="w-6 h-6" />
                    </a>
                    <a
                        href="https://wa.me/18475029685"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 text-white font-bold text-xl px-10 py-5 rounded-full border border-white/20 transition-all text-center"
                    >
                        {t('cta_whatsapp')}
                    </a>
                </div>
            </div>
        </section>
    );
}



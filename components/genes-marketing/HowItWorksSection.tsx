import { ClipboardList, LayoutDashboard, TrendingUp } from "lucide-react";
import { useTranslations } from "next-intl";

export default function HowItWorksSection() {
    const t = useTranslations("MarketingPage.how_it_works");

    const STEPS = [
        {
            icon: ClipboardList,
            title: t('steps.0.title'),
            description: t('steps.0.desc'),
        },
        {
            icon: LayoutDashboard,
            title: t('steps.1.title'),
            description: t('steps.1.desc'),
        },
        {
            icon: TrendingUp,
            title: t('steps.2.title'),
            description: t('steps.2.desc'),
        },
    ];

    return (
        <section id="how-it-works" className="py-20 bg-[#111A2E]">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        {t('title')}
                    </h2>
                    <p className="text-lg text-[#B8C1D1]">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-12 relative">
                    {/* Connecting line for desktop */}
                    <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-1 bg-gradient-to-r from-[#E11D2E]/30 via-amber-500/30 to-green-500/30 -z-1" />

                    {STEPS.map((step, index) => (
                        <div key={index} className="flex flex-col items-center text-center max-w-xs relative bg-[#111A2E] p-4">
                            <div className="w-24 h-24 rounded-full bg-[#0B1220] border-4 border-white/5 flex items-center justify-center mb-6 shadow-lg z-10 text-[#E11D2E]">
                                <step.icon className="w-10 h-10" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                            <p className="text-[#B8C1D1] leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center max-w-2xl mx-auto mb-8">
                    <div className="inline-flex items-start gap-3 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                        <p className="text-lg text-white font-medium text-left">
                            {t('footer')}
                        </p>
                    </div>
                </div>

                <div className="text-center">
                    <a
                        href="#pricing"
                        className="inline-flex items-center gap-3 px-10 py-5 bg-[#E11D2E] hover:bg-[#B81422] text-white rounded-full font-bold text-xl transition-all shadow-2xl shadow-red-900/40 hover:scale-105"
                    >
                        {t('cta')}
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}

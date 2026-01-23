import { ArrowRight, Star } from "lucide-react";
import { useTranslations } from "next-intl";

export default function HeroSection() {
    const t = useTranslations("MarketingPage.hero");

    return (
        <section className="relative overflow-hidden bg-[#0B1220] pt-16 pb-20 lg:pt-24 lg:pb-28">
            {/* Background Collage - CSS/Abstract representation for now */}
            <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute top-0 left-0 w-1/3 h-1/2 bg-[#E11D2E] rounded-br-[100px] blur-3xl transform -translate-x-10 -translate-y-10" />
                <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-amber-500 rounded-tl-[100px] blur-3xl transform translate-x-10 translate-y-10" />
                <div className="absolute top-1/2 left-1/2 w-full h-full bg-gradient-to-tr from-green-600/30 to-transparent transform -translate-x-1/2 -translate-y-1/2 blur-2xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-[#F59E0B] mb-8 backdrop-blur-sm">
                        <Star className="w-4 h-4 fill-amber-400" />
                        <span className="text-sm font-semibold">{t('badge')}</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight tracking-tight">
                        {t('title')}
                    </h1>

                    <p className="text-lg md:text-2xl text-amber-400 font-medium mb-8 leading-relaxed max-w-3xl mx-auto italic">
                        {t('reinforcement')}
                    </p>

                    <p className="text-xl text-[#B8C1D1] mb-10 max-w-2xl mx-auto leading-relaxed">
                        {t('subtitle')}
                    </p>

                    <ul className="text-left text-[#B8C1D1] mb-10 max-w-2xl mx-auto space-y-2">
                        <li className="flex items-start gap-2">
                            <span className="text-amber-500 font-bold">•</span>
                            {t('bullets.0')}
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-amber-500 font-bold">•</span>
                            {t('bullets.1')}
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-amber-500 font-bold">•</span>
                            {t('bullets.2')}
                        </li>
                    </ul>

                    <p className="text-sm text-green-400 font-semibold mb-8 tracking-wide">
                        {t('credibility')}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a href="#pricing" className="w-full sm:w-auto px-8 py-4 bg-[#E11D2E] hover:bg-[#B81422] text-white rounded-full font-bold text-lg transition-all shadow-lg shadow-red-900/40 hover:scale-105 flex items-center justify-center gap-2 text-center">
                            {t('cta_packages')}
                            <ArrowRight className="w-5 h-5" />
                        </a>
                        <a href="https://wa.me/18475029685" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-4 bg-[#16A34A] hover:bg-[#16A34A]/80 text-white rounded-full font-bold text-lg transition-all border border-green-700/50 flex items-center justify-center gap-2 text-center">
                            {t('cta_whatsapp')}
                        </a>
                    </div>

                    <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-[#B8C1D1]/70">
                        <span className="flex items-center gap-1">
                            <span className="text-green-400">✓</span> {t('cta_microcopy.0')}
                        </span>
                        <span className="hidden sm:inline">•</span>
                        <span className="flex items-center gap-1">
                            <span className="text-green-400">✓</span> {t('cta_microcopy.1')}
                        </span>
                    </div>

                    <div className="mt-12 flex items-center justify-center gap-8 text-[#B8C1D1] grayscale opacity-50">
                        {/* Trust placeholders */}
                        <div className="flex flex-col items-center gap-1">
                            <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-xs">Pinterest</div>
                            <span className="text-xs">Partner</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-xs">Latino</div>
                            <span className="text-xs">Owned</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-xs">USA</div>
                            <span className="text-xs">Local</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


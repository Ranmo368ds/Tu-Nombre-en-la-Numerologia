import { ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";

export default function PinterestDirectorySection() {
    const t = useTranslations("MarketingPage.directory");

    return (
        <section className="py-12 bg-gradient-to-b from-[#0B1220] to-[#111A2E]">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            {/* Pinterest Logo */}
                            <div className="shrink-0">
                                <a
                                    href={t('link')}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block hover:scale-110 transition-transform"
                                >
                                    <img loading="lazy" alt="Pinterest Logo" src="/images/pinterest-seeklogo.png"
                                        alt="Pinterest Directory"
                                        className="w-24 h-24 md:w-32 md:h-32 object-contain"
                                     />
                                </a>
                            </div>

                            {/* Text Content */}
                            <div className="flex-1 text-center md:text-left">
                                <p className="text-lg md:text-xl text-white leading-relaxed mb-6">
                                    {t.rich('text', {
                                        p: (chunks) => (
                                            <span className="inline-flex items-center gap-1">
                                                <img loading="lazy" alt="Pinterest Logo" src="/images/pinterest-seeklogo.png"
                                                    alt="Pinterest"
                                                    className="h-5 md:h-6 w-auto object-contain"
                                                 />
                                                {chunks}
                                            </span>
                                        )
                                    })}
                                </p>

                                <a
                                    href={t('link')}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-[#E60023] hover:bg-[#AD081B] text-white rounded-full font-bold text-lg transition-all shadow-xl hover:scale-105"
                                >
                                    {t('cta')}
                                    <ExternalLink className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

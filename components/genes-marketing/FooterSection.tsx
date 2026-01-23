import { useTranslations } from "next-intl";

export default function FooterSection() {
    const t = useTranslations("MarketingPage.footer");

    return (
        <footer className="bg-[#0B1220] text-[#B8C1D1] py-16 border-t border-white/5">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16">
                    <div className="col-span-1 sm:col-span-2 lg:col-span-1">
                        <h2 className="text-3xl font-bold text-white mb-6 tracing-tight">{t('title')}</h2>
                        <p className="max-w-sm leading-relaxed text-lg">
                            {t('description')}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">{t('links_title')}</h3>
                        <ul className="space-y-4">
                            <li><a href="#" className="hover:text-white transition-colors">{t('links.home')}</a></li>
                            <li><a href="#benefits" className="hover:text-white transition-colors">{t('links.benefits')}</a></li>
                            <li><a href="#pricing" className="hover:text-white transition-colors">{t('links.pricing')}</a></li>
                            <li><a href="#contact" className="hover:text-white transition-colors">{t('links.contact')}</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">{t('legal_title')}</h3>
                        <ul className="space-y-4">
                            <li><a href="#" className="hover:text-white transition-colors">{t('legal.privacy')}</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">{t('legal.terms')}</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Contacto</h3>
                        <ul className="space-y-4">
                            <li>
                                <a href={`mailto:${t('email')}`} className="hover:text-white transition-colors flex items-start gap-2">
                                    <span className="text-amber-400">✉</span>
                                    <span className="break-all">{t('email')}</span>
                                </a>
                            </li>
                            <li>
                                <a href={`tel:${t('phone')}`} className="hover:text-white transition-colors flex items-start gap-2">
                                    <span className="text-green-400">📞</span>
                                    {t('phone')}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-[#B8C1D1]/60">
                    <p>{t('rights', { year: new Date().getFullYear() })}</p>
                    <p>{t('made_with')}</p>
                </div>
            </div>
        </footer>
    );
}


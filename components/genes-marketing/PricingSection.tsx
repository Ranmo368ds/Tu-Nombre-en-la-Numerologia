import { Check, Star } from "lucide-react";
import { useTranslations } from "next-intl";

export default function PricingSection() {
    const t = useTranslations("MarketingPage.pricing");

    const PACKAGES = [
        {
            id: 'basic',
            name: t('packages_list.basic.name'),
            price: 59,
            description: t('packages_list.basic.desc'),
            ideal: t('packages_list.basic.ideal'),
            features: [
                t('common_features.0'),
                t('common_features.1'),
                t('common_features.2'),
                t('common_features.3'),
                t('common_features.4'),
            ],
            delivery: t('packages_list.basic.delivery'),
            highlight: false,
            cta: t('packages_list.basic.cta'),
            color: "border-white/5",
        },
        {
            id: 'pro',
            name: t('packages_list.pro.name'),
            price: 119,
            description: t('packages_list.pro.desc'),
            ideal: t('packages_list.pro.ideal'),
            features: [
                t('common_features.0'),
                t('common_features.1'),
                t('common_features.4'),
                t('common_features.2'),
                t('common_features.3'),
                t('common_features.5'),
            ],
            delivery: t('packages_list.pro.delivery'),
            highlight: true,
            cta: t('packages_list.pro.cta'),
            color: "border-[#F59E0B]",
        },
        {
            id: 'elite',
            name: t('packages_list.elite.name'),
            price: 199,
            description: t('packages_list.elite.desc'),
            ideal: t('packages_list.elite.ideal'),
            features: [
                t('common_features.0'),
                t('common_features.1'),
                t('common_features.5'),
                t('common_features.4'),
                t('common_features.3'),
                t('common_features.6'),
            ],
            delivery: t('packages_list.elite.delivery'),
            highlight: false,
            cta: t('packages_list.elite.cta'),
            color: "border-white/5",
        },
    ];

    return (
        <section id="pricing" className="py-20 bg-[#0B1220] text-white relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#E11D2E]/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#F59E0B]/10 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        {t('title')}
                    </h2>
                    <p className="text-lg text-[#B8C1D1]">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
                    {PACKAGES.map((pkg, index) => (
                        <div
                            key={index}
                            className={`relative bg-[#111A2E] rounded-2xl p-8 border-2 ${pkg.color} ${pkg.highlight ? 'md:-mt-8 md:mb-8 shadow-2xl shadow-[#F59E0B]/10 z-10' : 'shadow-xl'}`}
                        >
                            {pkg.highlight && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#F59E0B] text-[#0B1220] text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full flex items-center gap-1">
                                    <Star className="w-3 h-3 fill-[#0B1220]" />
                                    Más Popular
                                </div>
                            )}

                            <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                            {pkg.id === 'pro' && (
                                <p className="text-amber-400 text-sm font-bold mb-4 italic flex items-start gap-1">
                                    {t('pro_social_proof')}
                                </p>
                            )}
                            <div className="flex items-baseline mb-4">
                                <span className="text-4xl font-bold text-white">${pkg.price}</span>
                                <span className="text-[#B8C1D1] ml-2">{t('payment_suffix')}</span>
                            </div>
                            <div className="text-sm text-[#B8C1D1] mb-8 pb-8 border-b border-white/5 min-h-[160px]">
                                <p className="mb-4 font-semibold text-white">{pkg.description}</p>
                                <p><span className="text-[#B8C1D1]/50 uppercase text-[10px] font-bold block mb-1">{t('ideal_label')}</span> {pkg.ideal}</p>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {pkg.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-[#B8C1D1]">
                                        <Check className={`w-5 h-5 shrink-0 ${pkg.highlight ? 'text-[#F59E0B]' : 'text-slate-500'}`} />
                                        {feature}
                                    </li>
                                ))}
                                <li className="flex items-start gap-3 text-sm font-semibold text-white mt-6 pt-6 border-t border-white/5">
                                    <span className="text-[#B8C1D1]/50 uppercase text-[10px] font-bold block">{t('delivery_label')}</span> {pkg.delivery}
                                </li>
                            </ul>

                            <button className={`w-full py-4 rounded-xl font-bold transition-all ${pkg.highlight
                                ? 'bg-[#E11D2E] hover:bg-[#B81422] text-white shadow-lg shadow-[#E11D2E]/20'
                                : 'bg-white/10 hover:bg-white/20 text-white'
                                }`}>
                                {pkg.cta}
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-16 max-w-4xl mx-auto">
                    <h3 className="text-xl font-bold text-center mb-8 text-white">{t('common_features_title')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#111A2E]/50 p-8 rounded-2xl border border-white/5">
                        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                            <div key={i} className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <span className="text-[#B8C1D1] text-sm">{t(`common_features.${i}`)}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-center text-[#B8C1D1] mt-6 bg-[#111A2E]/30 py-3 px-6 rounded-full block md:inline-block mx-auto border border-white/5">
                        {t('no_website')}
                    </p>
                </div>

                <div className="mt-12 text-center max-w-4xl mx-auto">
                    <p className="text-sm text-[#B8C1D1]/50 italic">
                        {t('disclaimer')}
                    </p>
                </div>
            </div>
        </section>
    );
}


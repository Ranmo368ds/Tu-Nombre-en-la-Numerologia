'use client';
import { BarChart, Heart, Layout, Search, ShoppingCart, Users } from "lucide-react";
import { useTranslations } from "next-intl";

export default function BenefitsSection() {
    const t = useTranslations("MarketingPage.benefits");

    const benefitItems = [
        {
            icon: Users,
            titleKey: 'items.traffic.title',
            descKey: 'items.traffic.desc',
            name: 'traffic',
            color: "text-blue-500",
            bg: "bg-blue-500/10",
        },
        {
            icon: ShoppingCart,
            titleKey: 'items.intent.title',
            descKey: 'items.intent.desc',
            name: 'intent',
            color: "text-green-500",
            bg: "bg-green-500/10",
        },
        {
            icon: Search,
            titleKey: 'items.seo.title',
            descKey: 'items.seo.desc',
            name: 'seo',
            color: "text-purple-500",
            bg: "bg-purple-500/10",
        },
        {
            icon: Heart,
            titleKey: 'items.community.title',
            descKey: 'items.community.desc',
            name: 'community',
            color: "text-red-500",
            bg: "bg-red-500/10",
        },
        {
            icon: Layout,
            titleKey: 'items.creative.title',
            descKey: 'items.creative.desc',
            name: 'creative',
            color: "text-amber-500",
            bg: "bg-amber-500/10",
        },
        {
            icon: BarChart,
            titleKey: 'items.performance.title',
            descKey: 'items.performance.desc',
            name: 'performance',
            color: "text-cyan-500",
            bg: "bg-cyan-500/10",
        },
    ];

    return (
        <section className="py-20 bg-[#111A2E]">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        {t.rich('title', {
                            p: (chunks) => <span className="text-red-500">{chunks}</span>
                        })}
                    </h2>
                    <p className="text-lg text-[#B8C1D1] max-w-4xl mx-auto leading-relaxed mb-8">
                        {t.rich('description', {
                            p: (chunks) => <span className="text-white font-bold">{chunks}</span>
                        })}
                    </p>

                    <div className="max-w-4xl mx-auto mb-12 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <p className="text-lg md:text-xl text-white font-medium leading-relaxed italic">
                            "{t.rich('contrast', {
                                p: (chunks) => <span className="text-amber-400">{chunks}</span>
                            })}"
                        </p>
                    </div>

                    <ul className="text-left inline-block space-y-3 text-[#B8C1D1]">
                        {[0, 1, 2].map((i) => (
                            <li key={i} className="flex items-center gap-3">
                                <span className={`w-2 h-2 rounded-full shrink-0 ${i === 0 ? 'bg-red-500' : i === 1 ? 'bg-amber-500' : 'bg-green-500'}`} />
                                <span className="font-semibold">{t(`usp.${i}`)}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {benefitItems.map((benefit, index) => (
                        <div key={index} className="p-8 rounded-2xl border border-white/5 shadow-xl transition-all bg-[#0B1220] hover:-translate-y-1 transform duration-300">
                            <div className={`w-14 h-14 rounded-xl ${benefit.bg} ${benefit.color} flex items-center justify-center mb-6`}>
                                <benefit.icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{t(benefit.titleKey as any)}</h3>
                            <div className="text-[#B8C1D1] leading-relaxed">
                                {t.rich(benefit.descKey as any, {
                                    p: (chunks) => <span className="text-white font-semibold">{chunks}</span>
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}


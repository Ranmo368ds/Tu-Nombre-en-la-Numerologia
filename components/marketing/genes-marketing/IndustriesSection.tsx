'use client';
import { Utensils, Sparkles, Hammer, Scissors, Truck, Shirt, Megaphone, Mail, Home, Wrench, ShieldCheck, Briefcase, Calculator } from "lucide-react";
import { useTranslations } from "next-intl";

export default function IndustriesSection() {
    const t = useTranslations("MarketingPage.industries");

    const industryItems = [
        {
            icon: Utensils,
            titleKey: 'items.0.title',
            descKey: 'items.0.desc',
            color: "text-amber-500",
            bg: "bg-amber-500/10",
            image: "/images/Sealcoating Services.webp"
        },
        {
            icon: Sparkles,
            titleKey: 'items.1.title',
            descKey: 'items.1.desc',
            color: "text-cyan-500",
            bg: "bg-cyan-500/10",
            image: "/images/Catering & Food.png"
        },
        {
            icon: Hammer,
            titleKey: 'items.2.title',
            descKey: 'items.2.desc',
            color: "text-slate-500",
            bg: "bg-slate-500/10",
            image: "/images/Remodeling Services.jpg"
        },
        {
            icon: Wrench,
            titleKey: 'items.3.title',
            descKey: 'items.3.desc',
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            image: "/images/Landscaping.jpg"
        },
        {
            icon: Scissors,
            titleKey: 'items.4.title',
            descKey: 'items.4.desc',
            color: "text-pink-500",
            bg: "bg-pink-500/10",
            image: "/images/Professional Cleaning.jpg"
        },
        {
            icon: Home,
            titleKey: 'items.5.title',
            descKey: 'items.5.desc',
            color: "text-indigo-500",
            bg: "bg-indigo-500/10",
            image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop"
        },
        {
            icon: ShieldCheck,
            titleKey: 'items.6.title',
            descKey: 'items.6.desc',
            color: "text-slate-800",
            bg: "bg-slate-800/10",
            image: "/images/Beauty Salons.jpg"
        },
        {
            icon: Shirt,
            titleKey: 'items.7.title',
            descKey: 'items.7.desc',
            color: "text-purple-600",
            bg: "bg-purple-600/10",
            image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop"
        },
        {
            icon: Megaphone,
            titleKey: 'items.8.title',
            descKey: 'items.8.desc',
            color: "text-orange-500",
            bg: "bg-orange-500/10",
            image: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=800&auto=format&fit=crop"
        },
        {
            icon: Mail,
            titleKey: 'items.9.title',
            descKey: 'items.9.desc',
            color: "text-red-500",
            bg: "bg-red-500/10",
            image: "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?q=80&w=800&auto=format&fit=crop"
        },
        {
            icon: Calculator,
            titleKey: 'items.10.title',
            descKey: 'items.10.desc',
            color: "text-emerald-600",
            bg: "bg-emerald-600/10",
            image: "/images/tax Legal Services.webp"
        },
    ];

    return (
        <section className="py-20 bg-[#0B1220] border-t border-white/5">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        {t.rich('title', {
                            p: (chunks) => <span className="text-white">{chunks}</span>
                        })}
                    </h2>
                    <p className="text-lg text-[#B8C1D1]">
                        {t.rich('subtitle', {
                            p: (chunks) => <span className="text-white">{chunks}</span>
                        })}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {industryItems.map((industry, index) => (
                        <div key={index} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                            <div className="absolute inset-0">
                                <img loading="lazy" src={industry.image}
                                    alt={t(industry.titleKey as any)}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-[#0B1220]/80 group-hover:bg-[#0B1220]/70 transition-colors" />
                            </div>

                            <div className="relative p-8 h-full flex flex-col items-start min-h-[300px]">
                                <div className={`w-12 h-12 rounded-xl ${industry.bg} backdrop-blur-sm flex items-center justify-center mb-6`}>
                                    <industry.icon className={`w-6 h-6 ${industry.color}`} />
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-3">{t(industry.titleKey as any)}</h3>
                                <div className="text-[#B8C1D1] leading-relaxed mb-6">
                                    {t.rich(industry.descKey as any, {
                                        p: (chunks) => <span className="text-white font-semibold">{chunks}</span>
                                    })}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center max-w-4xl mx-auto">
                    <p className="text-lg text-[#B8C1D1]/60 italic">
                        {t.rich('footer', {
                            p: (chunks) => <span className="text-amber-400 font-bold">{chunks}</span>
                        })}
                    </p>
                    <div className="mt-12 text-center max-w-4xl mx-auto bg-[#111A2E] p-6 rounded-2xl border border-white/5">
                        <p className="text-xl text-white font-medium leading-relaxed italic">
                            {t.rich('reinforcement', {
                                p: (chunks) => <span className="text-white font-bold">{chunks}</span>
                            })}
                        </p>
                    </div>
                </div>
            </div>
        </section >
    );
}


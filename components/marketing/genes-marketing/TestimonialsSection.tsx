import { Star } from "lucide-react";
import { useTranslations } from "next-intl";

export default function TestimonialsSection() {
    const t = useTranslations("MarketingPage.testimonials");
    const rawItems = t.raw('items');
    const testimonials = Array.isArray(rawItems) ? rawItems : [];

    const COLORS = ["bg-[#E11D2E]", "bg-[#16A34A]", "bg-[#F59E0B]"];

    return (
        <section className="py-24 bg-[#111A2E]">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        {t('title')}
                    </h2>
                    <p className="text-lg text-[#B8C1D1]">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-[#0B1220] p-10 rounded-3xl border border-white/5 shadow-2xl hover:border-[#E11D2E]/30 transition-all flex flex-col justify-between group">
                            <div>
                                <div className="flex gap-1 mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-[#F59E0B] text-[#F59E0B]" />
                                    ))}
                                </div>
                                <p className="text-[#B8C1D1] mb-8 italic leading-relaxed text-lg">
                                    "{testimonial.quote}"
                                </p>
                            </div>
                            <div className="flex items-center gap-5">
                                <div className={`w-14 h-14 rounded-2xl ${COLORS[index % COLORS.length]} text-white flex items-center justify-center font-bold text-xl shadow-lg`}>
                                    {testimonial.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-lg">{testimonial.name}</h4>
                                    <p className="text-sm text-[#B8C1D1]/60 font-medium">{testimonial.business}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}


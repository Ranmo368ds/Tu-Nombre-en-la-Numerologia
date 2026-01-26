'use client';

import { useTranslations } from 'next-intl';
import { Target, MapPin, Building2, Hammer } from 'lucide-react';

export default function FenceServiceAreas() {
    const ct = useTranslations('HomePage.common');
    const cities: string[] = ct.raw('cities');

    return (
        <section className="py-24 bg-[#212529] text-white relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute right-0 top-0 w-1/2 h-full bg-[#28a745]/5 skew-x-12 transform translate-x-32"></div>
            <div className="absolute top-0 left-0 p-20 opacity-[0.05] pointer-events-none">
                <Hammer className="w-96 h-96 text-white rotate-45" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row gap-20 items-center">
                    {/* Content Column */}
                    <div className="lg:w-1/2">
                        <div className="inline-flex items-center gap-3 bg-[#28a745]/20 text-[#28a745] border border-[#28a745]/30 rounded-full px-6 py-2 mb-8 text-sm font-black tracking-[0.2em] uppercase">
                            <MapPin className="w-4 h-4" />
                            Service Locations
                        </div>
                        <h2 className="text-5xl md:text-6xl font-black mb-8 leading-tight tracking-tight text-white">
                            Where We Help Fence Pros Dominate
                        </h2>
                        <p className="text-xl text-[#dee2e6] font-light leading-relaxed mb-12">
                            We serve fencing contractors across the <span className="text-white font-black underline decoration-[#28a745] decoration-4 underline-offset-4">Chicago Northwest Suburbs</span> and <span className="text-white font-black underline decoration-[#28a745] decoration-4 underline-offset-4">South Wisconsin</span>.
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-4">
                            {cities.map((city) => (
                                <div key={city} className="flex items-center gap-3 text-[#dee2e6] hover:text-[#28a745] transition-colors duration-300 font-bold">
                                    <div className="w-2 h-2 rounded-full bg-[#28a745] shadow-[0_0_8px_rgba(40,167,69,1)]"></div>
                                    <span className="text-sm tracking-wide">{city}</span>
                                </div>
                            ))}
                        </div>

                        <p className="mt-12 text-[#495057] italic text-sm font-medium">
                            {ct('unlisted_city')}
                        </p>
                    </div>

                    {/* Feature Card Column */}
                    <div className="lg:w-1/2">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#28a745] to-[#495057] rounded-[3rem] blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative bg-white rounded-[3rem] p-12 text-[#212529]">
                                <div className="w-20 h-20 bg-[#212529] rounded-[2rem] flex items-center justify-center mb-8 shadow-xl -rotate-6 group-hover:rotate-0 transition-transform duration-500">
                                    <Target className="w-10 h-10 text-[#28a745]" />
                                </div>
                                <h3 className="text-3xl font-black mb-6 tracking-tight">
                                    The "Fenceline" Strategy
                                </h3>
                                <div className="space-y-6">
                                    <p className="text-lg text-[#495057] leading-relaxed font-medium">
                                        Fencing projects require serious material transport. Our system is built on <span className="text-[#212529] font-black underline decoration-[#28a745] decoration-2">Neighborhood Bundling</span>.
                                    </p>
                                    <div className="bg-[#dee2e6]/30 rounded-2xl p-6 border-l-8 border-[#28a745]">
                                        <p className="text-sm font-bold text-[#212529] italic">
                                            "Targeting precisely where premium installations are happening allows you to bid 3 neighbor jobs instead of 1, saving thousands in logistics and fuel."
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4 text-[#212529] font-black uppercase tracking-widest text-xs mt-8">
                                        <Building2 className="w-5 h-5 text-[#28a745]" />
                                        Residential & Commercial Focus
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

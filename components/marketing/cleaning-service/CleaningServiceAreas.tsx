'use client';

import { useTranslations } from 'next-intl';
import { MapPin, Target } from 'lucide-react';

export default function CleaningServiceAreas() {
    const ct = useTranslations('HomePage.common');
    const cities: string[] = ct.raw('cities');

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h1v1H0V0zm10 10h1v1h-1v-1z' fill='%23000000' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                }}></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 rounded-full px-5 py-2 mb-6 border border-blue-100 shadow-sm">
                        <MapPin className="w-5 h-5 text-blue-600" />
                        <span className="text-blue-900 font-bold text-sm tracking-wide uppercase">Local Coverage</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                        Areas We Serve
                    </h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed">
                        We serve cleaning companies and contractors across the <span className="text-slate-900 font-medium">Chicago Northwest Suburbs</span> and <span className="text-slate-900 font-medium">South Wisconsin</span>.
                    </p>
                </div>

                {/* Cities Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-20">
                    {cities.map((city) => (
                        <div
                            key={city}
                            className="bg-white rounded-2xl p-4 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 hover:border-blue-200 group flex flex-col items-center gap-2 shadow-sm"
                        >
                            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                                <MapPin className="w-4 h-4 text-blue-600 group-hover:text-white transition-colors duration-300" />
                            </div>
                            <span className="font-bold text-slate-700 text-sm">{city}</span>
                        </div>
                    ))}
                </div>

                <div className="relative group">
                    <div className="absolute inset-0 bg-blue-600 rounded-[2.5rem] rotate-1 translate-y-2 translate-x-1 opacity-10 group-hover:rotate-0 transition-transform duration-500"></div>
                    <div className="bg-slate-50 rounded-[2.5rem] p-8 md:p-12 relative z-10 border border-slate-100 shadow-inner">
                        <div className="flex flex-col md:flex-row items-center gap-10">
                            <div className="flex-shrink-0 w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center shadow-lg shadow-blue-500/20 rotate-3">
                                <Target className="w-10 h-10 text-white" />
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-3xl font-bold text-slate-900 mb-4">
                                    Strategic Local Expansion
                                </h3>
                                <p className="text-slate-600 text-lg leading-relaxed font-light">
                                    Our cleaning business marketing system is built on <span className="text-blue-600 font-medium italic">Route Optimization</span>. We don't just find you any job; we find you jobs that make sense for your crews' schedule, allowing you to maximize service calls while minimizing drive time.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <p className="text-center text-slate-400 italic mt-12 text-sm font-medium">
                    {ct('unlisted_city')}
                </p>
            </div>
        </section>
    );
}

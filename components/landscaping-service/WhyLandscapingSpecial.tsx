'use client';

import { useTranslations } from 'next-intl';
import { ShieldAlert, CheckCircle2, Sparkles, LandPlot } from 'lucide-react';

export default function WhyLandscapingSpecial() {
    const t = useTranslations('LandscapingPage.whySpecial');

    const challenges = [
        t('challenge_1'),
        t('challenge_2'),
        t('challenge_3'),
        t('challenge_4'),
        t('challenge_5'),
    ];

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    {/* Visual Content Side */}
                    <div className="relative order-2 lg:order-1">
                        {/* Decorative background circle */}
                        <div className="absolute -top-20 -left-20 w-[120%] h-[120%] bg-[#d8f3dc] rounded-full blur-[100px] pointer-events-none opacity-40"></div>

                        <div className="relative bg-[#1b4332] rounded-[3rem] shadow-2xl p-10 md:p-14 overflow-hidden border border-[#2d6a4f]">
                            {/* Accent Pattern */}
                            <div className="absolute top-0 right-0 p-8">
                                <LandPlot className="w-32 h-32 text-white/5 rotate-12" />
                            </div>

                            <h3 className="text-3xl font-black text-[#d8f3dc] mb-10 flex items-center gap-4">
                                <ShieldAlert className="text-[#95d5b2] w-8 h-8" />
                                {t('challenges_title')}
                            </h3>

                            <ul className="space-y-8 relative z-10">
                                {challenges.map((challenge, index) => (
                                    <li key={index} className="flex items-start gap-6 group">
                                        <div className="flex-shrink-0 w-10 h-10 bg-[#52b788] text-[#081c15] rounded-xl flex items-center justify-center font-black text-lg group-hover:scale-110 transition-transform duration-300 shadow-[0_5px_15px_rgba(82,183,136,0.3)]">
                                            {index + 1}
                                        </div>
                                        <p className="text-[#b7e4c7] text-lg font-medium leading-relaxed group-hover:text-white transition-colors duration-300">
                                            {challenge}
                                        </p>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-14 pt-10 border-t border-white/10">
                                <div className="bg-[#52b788]/10 rounded-2xl p-8 border border-[#52b788]/20 backdrop-blur-sm group hover:bg-[#52b788]/20 transition-all duration-500">
                                    <p className="text-[#95d5b2] font-black text-lg mb-4 flex items-center gap-3">
                                        <Sparkles className="w-6 h-6 animate-pulse" />
                                        {t('insight_title')}
                                    </p>
                                    <p className="text-[#d8f3dc] leading-relaxed font-light italic text-lg">
                                        "{t('insight_description')}"
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Description Side */}
                    <div className="lg:pl-8 order-1 lg:order-2">
                        <div className="inline-flex items-center gap-3 bg-[#d8f3dc] text-[#1b4332] font-black px-5 py-2 rounded-full text-xs uppercase tracking-[0.2em] mb-8 border border-[#b7e4c7] shadow-sm">
                            <span className="w-2 h-2 bg-[#52b788] rounded-full animate-ping"></span>
                            Growth & Design
                        </div>
                        <h2 className="text-5xl md:text-6xl font-black text-[#081c15] mb-10 leading-tight tracking-tight">
                            {t('title')}
                        </h2>
                        <div className="space-y-8">
                            <p className="text-xl text-[#2d6a4f] leading-relaxed font-light first-letter:text-5xl first-letter:font-black first-letter:text-[#52b788] first-letter:mr-3 first-letter:float-left">
                                {t('description')}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-10">
                                <div className="p-8 bg-[#d8f3dc]/30 rounded-3xl border border-[#b7e4c7]/30 hover:border-[#52b788]/30 hover:bg-white transition-all duration-300 group shadow-sm hover:shadow-xl">
                                    <div className="text-[#40916c] font-black text-4xl mb-2 group-hover:scale-110 transition-transform origin-left">Creative</div>
                                    <div className="text-[#2d6a4f] text-xs font-black uppercase tracking-widest opacity-60">Visual Mastery</div>
                                </div>
                                <div className="p-8 bg-[#d8f3dc]/30 rounded-3xl border border-[#b7e4c7]/30 hover:border-[#52b788]/30 hover:bg-white transition-all duration-300 group shadow-sm hover:shadow-xl">
                                    <div className="text-[#1b4332] font-black text-4xl mb-2 group-hover:scale-110 transition-transform origin-left">All-Season</div>
                                    <div className="text-[#2d6a4f] text-xs font-black uppercase tracking-widest opacity-60">Lead System</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

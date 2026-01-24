'use client';

import { useTranslations } from 'next-intl';
import { Image as ImageIcon, Search, Star, Globe } from 'lucide-react';

export default function LocalMarketingPinterest() {
    const t = useTranslations('LocalMarketingPage.pinterest');

    const benefits = [
        { id: 'item1', icon: ImageIcon },
        { id: 'item2', icon: Search },
        { id: 'item3', icon: Star },
        { id: 'item4', icon: Globe },
    ];

    return (
        <section className="py-24 bg-gradient-to-br from-red-50 via-white to-pink-50">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        {/* Content */}
                        <div className="lg:w-1/2">
                            <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 rounded-full px-4 py-1 mb-6 font-bold text-sm uppercase tracking-wider">
                                <Star className="w-4 h-4" />
                                <span>{t('badge')}</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 tracking-tight">
                                {t('title')}
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {benefits.map(({ id, icon: Icon }) => (
                                    <div key={id} className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-red-500 text-white flex items-center justify-center flex-shrink-0">
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <p className="text-gray-700 font-medium">
                                            {t(id)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Visual Representation */}
                        <div className="lg:w-1/2 relative">
                            <div className="aspect-square rounded-[3rem] bg-gradient-to-tr from-red-500 to-pink-600 shadow-2xl overflow-hidden flex items-center justify-center group">
                                <ImageIcon className="w-32 h-32 text-white/20 absolute -bottom-8 -right-8 group-hover:scale-110 transition-transform duration-500" />
                                <div className="relative z-10 text-center p-12">
                                    <h3 className="text-3xl font-bold text-white mb-4">
                                        Director Latino Chicago
                                    </h3>
                                    <div className="w-20 h-1.5 bg-white mx-auto rounded-full mb-6"></div>
                                    <p className="text-white/80 text-lg">
                                        Visibilidad visual constante. SEO local de otro grado.
                                    </p>
                                </div>
                            </div>
                            {/* Decorative Elements */}
                            <div className="absolute -top-6 -left-6 w-24 h-24 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

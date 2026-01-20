"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/routing";
import { LanguagePicker } from "@/components/LanguagePicker";
import { Footer } from "@/components/Footer";
import { PRODUCTS } from "@/utils/products";
import { notFound } from "next/navigation";
import { ArrowLeft, Star, Truck, ShieldCheck, Heart, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { use } from "react";
import { useCart } from "@/context/CartContext";

export default function ProductPage({ params }: { params: Promise<{ locale: string, slug: string }> }) {
    const t = useTranslations("Shop");
    const tNav = useTranslations("HomePage.nav");
    // Unwrap params using React.use() or await if it was an async component, but in client components we receive promises in Next.js 15+ or standard objects in 14. 
    // To be safe with recent Next.js versions which might treat params as promises in the future or now:
    const resolvedParams = use(params);
    const { slug } = resolvedParams;
    const { addToCart } = useCart();

    const product = PRODUCTS.find((p) => p.id === slug);

    if (!product) {
        notFound();
    }

    // Simple Upsell Logic: Products from same category or just others, excluding current
    const upsells = PRODUCTS
        .filter(p => p.id !== product.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

    return (
        <div className="min-h-screen bg-[#FDFBF7] text-stone-800 font-sans selection:bg-primary/20">


            {/* Main Content */}
            <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <Link href="/shop" className="inline-flex items-center gap-2 text-stone-500 hover:text-primary mb-8 text-sm font-medium transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Volver a la Tienda
                </Link>

                {/* Product Details Grid */}
                <div className="grid md:grid-cols-2 gap-12 lg:gap-20 mb-24">

                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative aspect-square rounded-3xl overflow-hidden bg-stone-100 shadow-lg border border-stone-100"
                    >
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </motion.div>

                    {/* Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col justify-center"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-wider">
                                {product.category}
                            </span>
                            <div className="flex items-center text-yellow-400">
                                <Star className="w-4 h-4 fill-current" />
                                <span className="text-stone-400 ml-1 text-xs font-medium">{product.rating}</span>
                            </div>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-bold font-mystic text-stone-900 mb-6 leading-tight">
                            {product.name}
                        </h1>

                        <p className="text-stone-600 leading-relaxed mb-8 text-lg">
                            {product.description}
                        </p>

                        {/* Features List */}
                        {product.features && (
                            <div className="mb-8">
                                <h3 className="font-semibold text-stone-900 mb-4">{t("product.features")}:</h3>
                                <ul className="space-y-2">
                                    {product.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-stone-600 text-sm">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Audio Player for Music Products */}
                        {'demoUrl' in product && product.demoUrl && (
                            <div className="mb-8 p-4 bg-primary/5 rounded-2xl border border-primary/10">
                                <h3 className="font-semibold text-primary mb-3 flex items-center gap-2">
                                    <span className="p-1.5 bg-primary/20 rounded-full"><span className="w-2 h-2 block bg-primary rounded-full animate-pulse" /></span>
                                    Escucha un fragmento
                                </h3>
                                <audio controls className="w-full h-10 rounded-lg accent-primary focus:outline-none focus:ring-2 focus:ring-primary/20">
                                    <source src={product.demoUrl} type="audio/mpeg" />
                                    Tu navegador no soporta el elemento de audio.
                                </audio>
                            </div>
                        )}

                        <div className="h-px w-full bg-stone-200 mb-8" />

                        <div className="flex items-center justify-between mb-8">
                            <span className="text-4xl font-bold text-primary-dark">${product.price.toFixed(2)}</span>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => addToCart(product)}
                                className="flex-1 py-4 bg-stone-900 text-white font-bold rounded-xl hover:bg-primary transition-colors shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                            >
                                <ShoppingBag className="w-5 h-5" />
                                {t("product.add_to_cart")}
                            </button>
                            <button className="p-4 border border-stone-200 rounded-xl hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600 transition-colors">
                                <Heart className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="flex items-center gap-6 mt-8 text-xs text-stone-500">
                            <div className="flex items-center gap-2">
                                <Truck className="w-4 h-4" />
                                <span>Envío Gratis &gt;$50</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4" />
                                <span>Garantía de Calidad</span>
                            </div>
                        </div>

                    </motion.div>
                </div>

                {/* Upsells */}
                <div className="border-t border-stone-200 pt-16">
                    <h2 className="text-2xl font-bold font-mystic text-stone-900 mb-8 text-center">{t("upsells")}</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {upsells.map((p) => (
                            <Link key={p.id} href={`/shop/${p.id}`} className="group block">
                                <div className="bg-white rounded-3xl p-4 shadow-sm border border-stone-100 hover:shadow-lg hover:border-primary/20 transition-all">
                                    <div className="aspect-square rounded-2xl overflow-hidden mb-4 bg-stone-100">
                                        <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-stone-800 mb-1 group-hover:text-primary transition-colors">{p.name}</h3>
                                        <p className="text-primary font-bold">${p.price.toFixed(2)}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

            </main>


            <Footer />
        </div>
    );
}

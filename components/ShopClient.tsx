"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/routing";
import { LanguagePicker } from "@/components/LanguagePicker";
import { Footer } from "@/components/Footer";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Search, Filter, Star, Heart, ArrowRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS } from "@/utils/products";
import { useCart } from "@/context/CartContext";

export default function ShopClient() {
    const t = useTranslations("Shop");
    const searchParams = useSearchParams();
    const [activeCategory, setActiveCategory] = useState("all");
    const { addToCart } = useCart();

    useEffect(() => {
        const categoryParam = searchParams.get("category");
        if (categoryParam) {
            setActiveCategory(categoryParam);
        }
    }, [searchParams]);

    const filteredProducts = activeCategory === "all"
        ? PRODUCTS
        : PRODUCTS.filter(p => p.category === activeCategory);

    const categories = [
        { id: "all", label: t("filters.all") },
        { id: "oils", label: t("filters.oils") },
        { id: "crystals", label: t("filters.crystals") },
        { id: "ebooks", label: t("filters.ebooks") },
        { id: "music", label: t("filters.music") },
        { id: "merch", label: t("filters.merch") },
    ];

    return (
        <div className="min-h-screen bg-[#FDFBF7] text-stone-800 font-sans selection:bg-primary/20">
            {/* Header / Hero */}
            <header className="pt-32 pb-16 px-6 text-center bg-gradient-to-b from-[#FDFBF7] to-white">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-3xl mx-auto"
                >
                    <h1 className="text-4xl md:text-5xl font-bold font-mystic text-stone-900 mb-4">{t("title")}</h1>
                    <p className="text-lg text-stone-600">{t("subtitle")}</p>
                </motion.div>
            </header>

            {/* Filters & Search */}
            <section className="px-6 pb-12">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Categories Tab */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat.id
                                    ? "bg-primary text-white shadow-md shadow-primary/20"
                                    : "bg-white text-stone-600 border border-stone-200 hover:border-primary/30 hover:bg-primary/5"
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Search Bar */}
                    <div className="relative w-full md:w-64">
                        <input
                            type="text"
                            placeholder="Buscar..."
                            className="w-full pl-10 pr-4 py-2 rounded-full bg-white border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                        />
                        <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="px-6 pb-24 max-w-7xl mx-auto">
                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredProducts.map((product) => (
                            <motion.div
                                layout
                                key={product.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="group bg-white rounded-3xl p-4 shadow-sm border border-stone-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col"
                            >
                                {/* Image Area */}
                                <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-stone-100">
                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full text-stone-400 hover:text-red-500 transition-colors">
                                        <Heart className="w-4 h-4" />
                                    </button>
                                    <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                                        <button
                                            onClick={() => addToCart(product)}
                                            className="w-full py-3 bg-white/90 backdrop-blur text-stone-900 text-sm font-semibold rounded-xl shadow-lg hover:bg-primary hover:text-white transition-colors"
                                        >
                                            {t("product.add_to_cart")}
                                        </button>
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="px-2 pb-2 flex-grow">
                                    <div className="flex items-center gap-1 mb-2">
                                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                        <span className="text-xs text-stone-400 font-medium">{product.rating}</span>
                                    </div>
                                    <h3 className="font-bold text-stone-800 text-lg mb-1 line-clamp-2">{product.name}</h3>
                                    <div className="flex items-center justify-between mt-auto">
                                        <span className="text-primary font-bold text-lg">${product.price.toFixed(2)}</span>
                                        <Link href={`/shop/${product.id}`} className="text-xs font-semibold text-stone-500 hover:text-primary flex items-center gap-1">
                                            {t("product.details")} <ArrowRight className="w-3 h-3" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-20 text-stone-400">
                        <Filter className="w-12 h-12 mx-auto mb-4 opacity-20" />
                        <p>No se encontraron productos en esta categoría.</p>
                    </div>
                )}
            </section>

            <Footer />
        </div>
    );
}

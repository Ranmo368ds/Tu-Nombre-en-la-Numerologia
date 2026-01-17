
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Star, ChevronRight, Plus, Flame, Clock, MapPin } from "lucide-react";

// Mock Data
const CATEGORIES = ["Tacos", "Burritos", "Tortas", "Platillos"];

const MENU_ITEMS = [
    {
        id: 1,
        name: "Al Pastor",
        description: "Marinated pork with pineapple, cilantro, and onions.",
        price: 3.49,
        category: "Tacos",
        image: "🌮",
        popular: true,
    },
    {
        id: 2,
        name: "Carne Asada",
        description: "Grilled steak with fresh salsa and avocado.",
        price: 3.49,
        category: "Tacos",
        image: "🥩",
        popular: true,
    },
    {
        id: 3,
        name: "Mission Burrito",
        description: "Large flour tortilla filled with rice, beans, cheese, and choice of meat.",
        price: 12.99,
        category: "Burritos",
        image: "🌯",
        popular: false,
    },
    {
        id: 4,
        name: "Torta Cubana",
        description: "Breaded steak, ham, sausage, cheese, egg, and avocado.",
        price: 14.99,
        category: "Tortas",
        image: "🥪",
        popular: true,
    },
    {
        id: 5,
        name: "Chorizo",
        description: "Mexican spicy sausage.",
        price: 3.49,
        category: "Tacos",
        image: "🌶️",
        popular: false,
    },
];

export default function SantaMariaPage() {
    const [activeCategory, setActiveCategory] = useState("Tacos");
    const [cartCount, setCartCount] = useState(0);

    const filteredItems = MENU_ITEMS.filter((item) => item.category === activeCategory);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 pb-24 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="fixed top-0 left-0 w-full h-96 bg-gradient-to-b from-red-600/20 to-transparent pointer-events-none" />
            <div className="fixed bottom-0 right-0 w-64 h-64 bg-green-600/10 blur-[100px] pointer-events-none" />

            {/* Header */}
            <header className="relative z-10 px-6 pt-8 pb-4 flex justify-between items-center bg-slate-950/80 backdrop-blur-md sticky top-0">
                <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-amber-500 bg-clip-text text-transparent">
                        Santa Maria
                    </h1>
                    <p className="text-xs text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> Supermarket & Grill
                    </p>
                </div>
                <button className="relative p-2 bg-slate-900 rounded-full hover:bg-slate-800 transition-colors border border-slate-800 group">
                    <ShoppingCart className="w-5 h-5 text-white group-hover:text-amber-400 transition-colors" />
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border border-slate-950">
                            {cartCount}
                        </span>
                    )}
                </button>
            </header>

            {/* Hero Banner (App style) */}
            <div className="px-6 py-4">
                <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-2xl p-6 text-white shadow-lg shadow-red-900/20 relative overflow-hidden">
                    <div className="relative z-10">
                        <span className="bg-white/20 text-xs font-bold px-2 py-1 rounded backdrop-blur-sm">
                            Promo
                        </span>
                        <h2 className="text-2xl font-bold mt-2 leading-tight">
                            Taco Tuesday
                        </h2>
                        <p className="text-sm text-red-100 opacity-90 mb-4">
                            3 Tacos + Drink for $9.99
                        </p>
                        <button className="bg-white text-red-700 text-xs font-bold px-4 py-2 rounded-full hover:bg-gray-100 transition-colors">
                            Order Now
                        </button>
                    </div>
                    <Flame className="absolute -bottom-4 -right-4 w-32 h-32 text-red-500/30 rotate-12" />
                </div>
            </div>

            {/* Categories */}
            <div className="px-6 py-2 overflow-x-auto no-scrollbar">
                <div className="flex gap-3">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap border ${activeCategory === cat
                                    ? "bg-green-600 border-green-500 text-white shadow-lg shadow-green-900/40"
                                    : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Menu List */}
            <div className="px-6 py-4 space-y-4">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold text-white">{activeCategory}</h3>
                    <span className="text-xs text-slate-500">{filteredItems.length} items</span>
                </div>

                <motion.div layout className="space-y-4">
                    <AnimatePresence mode="popLayout">
                        {filteredItems.map((item) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex gap-4 hover:border-slate-700 transition-colors group active:scale-[0.98] duration-100"
                            >
                                <div className="w-20 h-20 bg-slate-800 rounded-lg flex items-center justify-center text-4xl shrink-0 border border-slate-700/50">
                                    {item.image}
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-bold text-slate-100 relative">
                                                {item.name}
                                                {item.popular && (
                                                    <span className="ml-2 inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                                                )}
                                            </h4>
                                            <span className="font-bold text-green-400">${item.price}</span>
                                        </div>
                                        <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-center mt-3">
                                        <span className="text-[10px] text-slate-500 flex items-center gap-1">
                                            <Clock className="w-3 h-3" /> 15m
                                        </span>
                                        <button
                                            onClick={() => setCartCount(c => c + 1)}
                                            className="p-1.5 bg-red-600 rounded-full text-white shadow-lg shadow-red-900/40 hover:bg-red-500 transition-all hover:scale-110 active:scale-95"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Floating Action Button */}
            <AnimatePresence>
                {cartCount > 0 && (
                    <motion.div
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        exit={{ y: 100 }}
                        className="fixed bottom-6 left-6 right-6 z-50"
                    >
                        <button className="w-full bg-green-600 text-white font-bold py-4 rounded-xl shadow-xl shadow-green-900/50 flex justify-between items-center px-6 hover:bg-green-500 transition-colors">
                            <div className="flex items-center gap-3">
                                <span className="bg-green-800 text-green-100 px-2 py-1 rounded text-xs font-bold">
                                    {cartCount}
                                </span>
                                <span>View Order</span>
                            </div>
                            <span className="flex items-center gap-1 text-green-100">
                                Checkout <ChevronRight className="w-4 h-4" />
                            </span>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

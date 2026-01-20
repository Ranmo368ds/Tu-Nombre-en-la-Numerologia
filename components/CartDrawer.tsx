"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useTranslations } from 'next-intl';

export const CartDrawer: React.FC = () => {
    const { cartItems, removeFromCart, updateQuantity, totalPrice, totalItems, isOpen, toggleCart } = useCart();
    const t = useTranslations("Shop");
    const [isLoading, setIsLoading] = React.useState(false);

    // Get current locale from URL path safely in client
    const getLocale = () => {
        if (typeof window !== 'undefined') {
            const parts = window.location.pathname.split('/');
            return parts[1] || 'es';
        }
        return 'es';
    };
    const locale = getLocale();

    const handleCheckout = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    items: cartItems,
                    locale: locale
                }),
            });

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                console.error('Checkout error:', data.error);
                alert('Hubo un error al procesar el pago. Por favor intenta de nuevo.');
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Hubo un error de conexión. Por favor intenta de nuevo.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-stone-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="w-5 h-5 text-primary" />
                                <h2 className="text-xl font-bold font-mystic text-stone-900">
                                    {t("cart.title") || "Tu Carrito"}
                                    <span className="ml-2 text-sm font-sans font-normal text-stone-400">({totalItems})</span>
                                </h2>
                            </div>
                            <button
                                onClick={toggleCart}
                                className="p-2 hover:bg-stone-50 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6 text-stone-400" />
                            </button>
                        </div>

                        {/* Items List */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {cartItems.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                                    <ShoppingBag className="w-16 h-16" />
                                    <p className="text-lg font-medium">{t("cart.empty") || "Tu carrito está vacío"}</p>
                                    <button
                                        onClick={toggleCart}
                                        className="text-primary font-semibold hover:underline"
                                    >
                                        {t("cart.continue_shopping") || "Continuar comprando"}
                                    </button>
                                </div>
                            ) : (
                                cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-4 group">
                                        <div className="w-20 h-20 rounded-xl bg-stone-100 overflow-hidden flex-shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-stone-900 truncate mb-1">{item.name}</h3>
                                            <p className="text-sm text-stone-400 mb-3">${item.price.toFixed(2)}</p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="p-1.5 hover:bg-stone-50 transition-colors"
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="p-1.5 hover:bg-stone-50 transition-colors"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="p-2 text-stone-300 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cartItems.length > 0 && (
                            <div className="p-6 border-t border-stone-100 space-y-4 bg-stone-50/50">
                                <div className="flex items-center justify-between text-stone-900">
                                    <span className="font-medium">Subtotal</span>
                                    <span className="text-xl font-bold">${totalPrice.toFixed(2)}</span>
                                </div>
                                <p className="text-xs text-stone-400">
                                    {t("cart.shipping_info") || "Envío e impuestos calculados al finalizar la compra."}
                                </p>
                                <button
                                    onClick={handleCheckout}
                                    disabled={isLoading}
                                    className="w-full py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            {t("cart.checkout") || "Pagar ahora"}
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

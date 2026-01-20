"use client";

import { useState, useEffect } from "react";
import { X, Mail, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function NewsletterPopup() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Show popup after 5 seconds
        const timer = setTimeout(() => {
            // Check if user has already dismissed it in this session (optional, for now just show it)
            const hasSeen = sessionStorage.getItem("newsletter_seen");
            if (!hasSeen) {
                setIsOpen(true);
            }
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        sessionStorage.setItem("newsletter_seen", "true");
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative bg-[#FDFBF7] w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-emerald-100"
                    >
                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-600 transition-colors z-10"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Content */}
                        <div className="p-8 md:p-10 text-center space-y-6 relative">

                            {/* Decorative Background Icon */}
                            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-emerald-50 to-transparent -z-10" />

                            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 shadow-inner">
                                <Mail className="w-8 h-8" />
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold text-emerald-950 font-mystic">
                                    Únete a la Tribu
                                </h3>
                                <p className="text-stone-600 mt-2 text-sm leading-relaxed">
                                    Recibe consejos holísticos, descuentos exclusivos en aceites y novedades de numerología.
                                </p>
                            </div>

                            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleClose(); }}>
                                <div className="space-y-3">
                                    <input
                                        type="text"
                                        placeholder="Tu Nombre"
                                        className="w-full px-4 py-3 rounded-xl bg-white border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Tu Email"
                                        className="w-full px-4 py-3 rounded-xl bg-white border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-emerald-200 flex items-center justify-center gap-2"
                                >
                                    <Sparkles className="w-4 h-4" />
                                    Suscribirme Gratis
                                </button>
                            </form>

                            <p className="text-xs text-stone-400">
                                Respetamos tu privacidad. Sin spam. <br />
                                Dudas: instintosaludableusa@gmail.com
                            </p>

                            <div className="pt-4 border-t border-emerald-50">
                                <a
                                    href="/radio-unica"
                                    className="text-xs font-bold text-yellow-600 hover:text-yellow-700 flex items-center justify-center gap-2 transition-colors"
                                >
                                    <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                                    ¿Ya escuchaste Radio Única en vivo? 🎵
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

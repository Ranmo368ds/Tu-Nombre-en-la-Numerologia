"use client";

import { useState, useEffect } from "react";
import { X, Mail, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function NewsletterPopup() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Show popup after 15 seconds (instead of 5) to let user navigate first
        const timer = setTimeout(() => {
            const hasSeen = sessionStorage.getItem("newsletter_seen");
            if (!hasSeen) {
                setIsOpen(true);
            }
        }, 15000);

        return () => clearTimeout(timer);
    }, []);

    const [formState, setFormState] = useState({ name: "", email: "" });
    const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

    const handleClose = () => {
        setIsOpen(false);
        sessionStorage.setItem("newsletter_seen", "true");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");

        const formId = process.env.NEXT_PUBLIC_FORMSPREE_NEWSLETTER_ID || "mqkvznpb"; // Placeholder fallback

        try {
            const response = await fetch(`https://formspree.io/f/${formId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formState),
            });

            if (response.ok) {
                setStatus("success");
                setTimeout(() => {
                    handleClose();
                }, 3000);
            } else {
                throw new Error("Failed to subscribe");
            }
        } catch (error) {
            console.error("Newsletter error:", error);
            alert("No pudimos procesar tu suscripción. Por favor intenta de nuevo.");
            setStatus("idle");
        }
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
                                {status === "success" ? <Sparkles className="w-8 h-8" /> : <Mail className="w-8 h-8" />}
                            </div>

                            {status === "success" ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="space-y-4 py-4"
                                >
                                    <h3 className="text-2xl font-bold text-emerald-950 font-mystic">¡Bienvenido a la Tribu!</h3>
                                    <p className="text-stone-600">Tu suscripción ha sido confirmada. Muy pronto recibirás sorpresas en tu email.</p>
                                </motion.div>
                            ) : (
                                <>
                                    <div>
                                        <h3 className="text-2xl font-bold text-emerald-950 font-mystic">
                                            Únete a la Tribu
                                        </h3>
                                        <p className="text-stone-600 mt-2 text-sm leading-relaxed">
                                            Recibe consejos holísticos, descuentos exclusivos en aceites y novedades de numerología.
                                        </p>
                                    </div>

                                    <form className="space-y-4" onSubmit={handleSubmit}>
                                        <div className="space-y-3">
                                            <input
                                                required
                                                type="text"
                                                placeholder="Tu Nombre"
                                                value={formState.name}
                                                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl bg-white border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
                                            />
                                            <input
                                                required
                                                type="email"
                                                placeholder="Tu Email"
                                                value={formState.email}
                                                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl bg-white border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={status === "submitting"}
                                            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 disabled:opacity-70"
                                        >
                                            {status === "submitting" ? (
                                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            ) : (
                                                <>
                                                    <Sparkles className="w-4 h-4" />
                                                    Suscribirme Gratis
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </>
                            )}

                            <p className="text-xs text-stone-400">
                                Respetamos tu privacidad. Sin spam. <br />
                                Dudas: ventas@genesmarketing.com
                            </p>

                            <div className="pt-4 border-t border-emerald-50">
                                <a
                                    href="/radiounica"
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

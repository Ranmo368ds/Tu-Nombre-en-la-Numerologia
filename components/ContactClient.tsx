"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/routing";
import { useState } from "react";
import { motion } from "framer-motion";
import { Footer } from "@/components/Footer";
import { Send, Mail, MapPin, Phone, ShoppingBag } from "lucide-react";

export default function ContactClient() {
    const t = useTranslations("Contact");
    const [formState, setFormState] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");

        const formId = process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_ID || "mqkvznpb"; // Placeholder fallback

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
                setFormState({ name: "", email: "", message: "" });
            } else {
                throw new Error("Failed to submit");
            }
        } catch (error) {
            console.error("Formspree error:", error);
            alert("Vaya, hubo un error enviando tu mensaje. Por favor intenta de nuevo o escríbenos a ventas@genesmarketing.com");
            setStatus("idle");
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] text-stone-800 font-sans selection:bg-primary/20">
            {/* Hero / Header */}
            <section className="pt-32 pb-16 px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-3xl mx-auto"
                >
                    <h1 className="text-4xl md:text-5xl font-bold font-mystic text-stone-900 mb-6">{t("title")}</h1>
                    <p className="text-lg text-stone-600">{t("subtitle")}</p>
                </motion.div>
            </section>

            {/* Content */}
            <section className="px-6 pb-24 max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
                    {/* Contact Info Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div className="bg-primary-dark text-emerald-50 p-8 rounded-3xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-light/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                            <h3 className="text-2xl font-mystic font-bold mb-6">Información de Contacto</h3>
                            <div className="space-y-6 relative z-10">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-primary-light uppercase tracking-wider font-semibold mb-1">Email</p>
                                        <p className="text-lg">ventas@genesmarketing.com</p>
                                        <p className="text-xs text-primary-light/60">ventas@genesmarketing.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-primary-light uppercase tracking-wider font-semibold mb-1">Ubicación</p>
                                        <p className="text-lg">Chicago, Illinois - Central Time</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-white border border-stone-100 rounded-3xl shadow-sm">
                            <h3 className="font-bold text-stone-900 mb-4">Horario de Atención</h3>
                            <p className="text-stone-600">Lunes a Viernes: 9:00 AM - 6:00 PM (EST)</p>
                        </div>

                        {/* Sister Station Section */}
                        <div className="p-8 bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-100 rounded-3xl shadow-sm overflow-hidden relative group">
                            <div className="absolute -right-4 -top-4 w-24 h-24 bg-yellow-200/30 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                                    <h3 className="font-bold text-stone-900">Estación Hermana</h3>
                                </div>
                                <h4 className="text-2xl font-black text-stone-900 mb-2">RADIO <span className="text-yellow-600">UNICA</span></h4>
                                <p className="text-sm text-stone-600 mb-6">Música latina, éxitos mundiales y la mejor vibra para tu día a día.</p>
                                <Link
                                    href="/radiounica"
                                    className="inline-flex items-center justify-center px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-xl transition-all shadow-lg shadow-yellow-200"
                                >
                                    ¡Escuchar En Vivo!
                                </Link>
                            </div>
                        </div>
                    </motion.div>

                    {/* Form Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white p-8 md:p-10 rounded-3xl shadow-lg shadow-stone-200/50 border border-stone-50"
                    >
                        {status === "success" ? (
                            <div className="h-full flex flex-col items-center justify-center text-center py-10">
                                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                                    <Send className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-stone-900 mb-2">{t("form.success")}</h3>
                                <p className="text-stone-500">Te responderemos lo antes posible.</p>
                                <button
                                    onClick={() => setStatus("idle")}
                                    className="mt-8 text-primary font-semibold hover:text-primary-dark"
                                >
                                    Enviar otro mensaje
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-stone-700 mb-2">{t("form.name")}</label>
                                    <input
                                        required
                                        type="text"
                                        value={formState.name}
                                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                        placeholder={t("form.placeholder_name")}
                                        className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-stone-700 mb-2">{t("form.email")}</label>
                                    <input
                                        required
                                        type="email"
                                        value={formState.email}
                                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                        placeholder={t("form.placeholder_email")}
                                        className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-stone-700 mb-2">{t("form.message")}</label>
                                    <textarea
                                        required
                                        rows={4}
                                        value={formState.message}
                                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                        placeholder={t("form.placeholder_message")}
                                        className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={status === "submitting"}
                                    className="w-full py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-all shadow-lg shadow-primary/20 hover:shadow-primary/30 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {status === "submitting" ? (
                                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            {t("form.send")}
                                            <Send className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

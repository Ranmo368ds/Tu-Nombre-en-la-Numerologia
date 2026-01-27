"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin } from "lucide-react";
import { submitToFormspree } from "@/lib/formspree";

export default function MarketingContact() {
    const t = useTranslations("Contact");
    const [formState, setFormState] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");

        try {
            await submitToFormspree(formState);
            setStatus("success");
            setFormState({ name: "", email: "", message: "" });
        } catch (error) {
            console.error("Formspree error:", error);
            setStatus("idle");
            alert("Vaya, hubo un error enviando tu mensaje. Por favor intenta de nuevo.");
        }
    };

    return (
        <section className="py-24 px-6 bg-[#184e77]/5 overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
                    {/* Info Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-12"
                    >
                        <div>
                            <h2 className="text-4xl md:text-5xl font-black text-[#184e77] mb-6 leading-tight">
                                {t("title")}
                            </h2>
                            <p className="text-xl text-[#34a0a4] font-medium leading-relaxed">
                                {t("subtitle")}
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-start gap-6">
                                <div className="w-14 h-14 bg-[#184e77] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#184e77]/20">
                                    <Mail className="w-6 h-6 text-[#d9ed92]" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-black text-[#184e77]/40 uppercase tracking-widest">Email Sales</p>
                                    <p className="text-xl font-bold text-[#184e77]">ventas@genesmarketing.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6">
                                <div className="w-14 h-14 bg-[#34a0a4] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#34a0a4]/20">
                                    <MapPin className="w-6 h-6 text-white" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-black text-[#184e77]/40 uppercase tracking-widest">Locations</p>
                                    <p className="text-xl font-bold text-[#184e77]">Chicago Suburbs & WI</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-white/50 backdrop-blur-sm border border-[#184e77]/10 rounded-[2rem]">
                            <p className="text-sm font-bold text-[#184e77]/60 leading-relaxed italic">
                                "Our specialized system ensures your pool services reach the right homeowners at the exact moment they need maintenance or repairs."
                            </p>
                        </div>
                    </motion.div>

                    {/* Form Side */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-white p-10 md:p-12 rounded-[3.5rem] shadow-2xl shadow-[#184e77]/10 border border-white relative overflow-hidden"
                    >
                        {/* Decorative Background Elements */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#d9ed92]/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#34a0a4]/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

                        {status === "success" ? (
                            <div className="text-center py-12 relative z-10">
                                <div className="w-20 h-20 bg-[#d9ed92] text-[#184e77] rounded-full flex items-center justify-center mb-8 mx-auto shadow-lg">
                                    <Send className="w-10 h-10" />
                                </div>
                                <h3 className="text-3xl font-black text-[#184e77] mb-4">{t("form.success")}</h3>
                                <p className="text-lg text-[#34a0a4] font-medium leading-relaxed">
                                    We'll analyze your request and get back to you within 24 business hours.
                                </p>
                                <button
                                    onClick={() => setStatus("idle")}
                                    className="mt-10 font-bold text-[#184e77] hover:text-[#34a0a4] transition-colors flex items-center gap-2 mx-auto"
                                >
                                    Send another message →
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                                <div className="space-y-3">
                                    <label className="text-sm font-black text-[#184e77] uppercase tracking-widest px-1">{t("form.name")}</label>
                                    <input
                                        required
                                        type="text"
                                        value={formState.name}
                                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                        placeholder={t("form.placeholder_name")}
                                        className="w-full px-6 py-5 rounded-2xl bg-[#184e77]/5 border border-transparent focus:bg-white focus:border-[#34a0a4] focus:ring-4 focus:ring-[#34a0a4]/10 transition-all outline-none font-medium text-[#184e77]"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <label className="text-sm font-black text-[#184e77] uppercase tracking-widest px-1">{t("form.email")}</label>
                                    <input
                                        required
                                        type="email"
                                        value={formState.email}
                                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                        placeholder={t("form.placeholder_email")}
                                        className="w-full px-6 py-5 rounded-2xl bg-[#184e77]/5 border border-transparent focus:bg-white focus:border-[#34a0a4] focus:ring-4 focus:ring-[#34a0a4]/10 transition-all outline-none font-medium text-[#184e77]"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <label className="text-sm font-black text-[#184e77] uppercase tracking-widest px-1">{t("form.message")}</label>
                                    <textarea
                                        required
                                        rows={4}
                                        value={formState.message}
                                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                        placeholder={t("form.placeholder_message")}
                                        className="w-full px-6 py-5 rounded-2xl bg-[#184e77]/5 border border-transparent focus:bg-white focus:border-[#34a0a4] focus:ring-4 focus:ring-[#34a0a4]/10 transition-all outline-none font-medium text-[#184e77] resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === "submitting"}
                                    className="w-full py-6 bg-[#184e77] hover:bg-[#1e6091] text-white font-black rounded-2xl transition-all shadow-xl shadow-[#184e77]/20 hover:shadow-[#184e77]/30 hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg tracking-wide group"
                                >
                                    {status === "submitting" ? (
                                        <span className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            {t("form.send")}
                                            <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

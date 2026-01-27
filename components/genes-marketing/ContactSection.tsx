"use client";

import { Mail, MessageCircle, Phone, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { submitToFormspree } from "@/lib/formspree";

export default function ContactSection() {
    const t = useTranslations("MarketingPage.contact_info");
    const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
    const [formState, setFormState] = useState({
        name: "",
        phone: "",
        email: "",
        message: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");

        try {
            await submitToFormspree(formState);
            setStatus("success");
            setFormState({ name: "", phone: "", email: "", message: "" });
        } catch (error) {
            console.error("Formspree error:", error);
            setStatus("idle");
            alert("Hubo un error al enviar el mensaje. Por favor intenta de nuevo.");
        }
    };

    return (
        <section id="contact" className="py-24 bg-white relative">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-[0_32px_64px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col md:flex-row border border-slate-100">

                    {/* Contact Info Side */}
                    <div className="md:w-5/12 bg-[#0B1220] p-12 text-white flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#E11D2E] rounded-full blur-[100px] opacity-10 transform translate-x-20 -translate-y-20" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500 rounded-full blur-[80px] opacity-5 transform -translate-x-10 translate-y-10" />

                        <div className="relative z-10">
                            <h3 className="text-3xl font-bold mb-8">{t('title')}</h3>
                            <p className="text-[#B8C1D1] mb-12 leading-relaxed text-lg">
                                {t('subtitle')}
                            </p>

                            <div className="space-y-10">
                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 text-[#E11D2E] border border-white/10">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#B8C1D1] font-bold uppercase tracking-widest mb-2">WhatsApp</p>
                                        <p className="text-xl font-bold">847.502.9685</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 text-amber-500 border border-white/10">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#B8C1D1] font-bold uppercase tracking-widest mb-2">{t('email_label')}</p>
                                        <p className="text-xl font-bold">{t('email')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 mt-16">
                            <p className="text-xs font-medium text-[#B8C1D1]/60 mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                {t('availability')}
                            </p>
                            <a href="https://wa.me/18475029685" target="_blank" rel="noopener noreferrer"
                                className="w-full py-5 px-6 bg-[#16A34A] hover:bg-[#15803d] text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-3 group text-lg shadow-xl shadow-green-500/20">
                                <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                {t('whatsapp_button')}
                            </a>
                        </div>
                    </div>

                    {/* Contact Form Side */}
                    <div className="md:w-7/12 p-12">
                        <div className="mb-10">
                            <h2 className="text-4xl font-bold text-[#0B1220] mb-4">{t('form_title')}</h2>
                            <p className="text-slate-500 text-lg">
                                {t('form_subtitle')}
                            </p>
                        </div>

                        {status === "success" ? (
                            <div className="bg-green-50 border border-green-100 p-8 rounded-2xl text-center">
                                <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/20">
                                    <Send className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-green-800 mb-2">{t('form_success_title') || "¡Mensaje Enviado!"}</h3>
                                <p className="text-green-700">
                                    {t('form_success_message') || "Gracias por contactarnos. Un especialista se pondrá en contacto contigo muy pronto."}
                                </p>
                                <button
                                    onClick={() => setStatus("idle")}
                                    className="mt-8 font-bold text-slate-800 hover:text-[#E11D2E] transition-colors"
                                >
                                    ← Enviar otro mensaje
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-bold text-slate-700 uppercase tracking-wide">{t('form_name')}</label>
                                        <input
                                            required
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formState.name}
                                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                            className="w-full px-6 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#E11D2E] focus:border-transparent outline-none transition-all text-slate-900 bg-slate-50"
                                            placeholder={t('form_name_placeholder')}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="phone" className="text-sm font-bold text-slate-700 uppercase tracking-wide">{t('form_phone')}</label>
                                        <input
                                            required
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formState.phone}
                                            onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                                            className="w-full px-6 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#E11D2E] focus:border-transparent outline-none transition-all text-slate-900 bg-slate-50"
                                            placeholder={t('form_phone_placeholder')}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-bold text-slate-700 uppercase tracking-wide">{t('form_email')}</label>
                                    <input
                                        required
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formState.email}
                                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                        className="w-full px-6 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#E11D2E] focus:border-transparent outline-none transition-all text-slate-900 bg-slate-50"
                                        placeholder={t('form_email_placeholder')}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-bold text-slate-700 uppercase tracking-wide">{t('form_message')}</label>
                                    <textarea
                                        required
                                        id="message"
                                        name="message"
                                        rows={4}
                                        value={formState.message}
                                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                        className="w-full px-6 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#E11D2E] focus:border-transparent outline-none transition-all resize-none text-slate-900 bg-slate-50"
                                        placeholder={t('form_message_placeholder')}
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === "submitting"}
                                    className="w-full py-5 px-8 bg-[#0B1220] hover:bg-slate-800 text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-3 text-lg shadow-xl shadow-slate-900/10 disabled:opacity-70 disabled:cursor-not-allowed group"
                                >
                                    {status === "submitting" ? (
                                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            {t('form_submit')}
                                            <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}


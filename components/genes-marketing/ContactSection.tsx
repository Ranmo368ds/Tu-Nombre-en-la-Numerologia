"use client";

import { Mail, MessageCircle, Phone, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function ContactSection() {
    const t = useTranslations("MarketingPage.contact_info");

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
                            <h2 className="text-4xl font-bold text-[#0B1220] mb-4">¿Tienes dudas?</h2>
                            <p className="text-slate-500 text-lg">
                                Completa el formulario y un especialista te contactará pronto.
                            </p>
                        </div>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-bold text-slate-700 uppercase tracking-wide">Nombre</label>
                                    <input type="text" id="name" className="w-full px-6 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#E11D2E] focus:border-transparent outline-none transition-all text-slate-900 bg-slate-50" placeholder="Escribe tu nombre" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="phone" className="text-sm font-bold text-slate-700 uppercase tracking-wide">Teléfono</label>
                                    <input type="tel" id="phone" className="w-full px-6 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#E11D2E] focus:border-transparent outline-none transition-all text-slate-900 bg-slate-50" placeholder="(555) 000-0000" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-bold text-slate-700 uppercase tracking-wide">Email</label>
                                <input type="email" id="email" className="w-full px-6 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#E11D2E] focus:border-transparent outline-none transition-all text-slate-900 bg-slate-50" placeholder="tu@empresa.com" />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-bold text-slate-700 uppercase tracking-wide">Mensaje</label>
                                <textarea id="message" rows={4} className="w-full px-6 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#E11D2E] focus:border-transparent outline-none transition-all resize-none text-slate-900 bg-slate-50" placeholder="¿En qué podemos ayudarte?"></textarea>
                            </div>

                            <button type="submit" className="w-full py-5 px-8 bg-[#0B1220] hover:bg-slate-800 text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-3 text-lg shadow-xl shadow-slate-900/10">
                                Enviar Mensaje
                                <Send className="w-5 h-5" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}


"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { submitToFormspree } from "@/lib/formspree";

export default function Popup() {
    const t = useTranslations("MarketingPage.popup");
    const [showTimePopup, setShowTimePopup] = useState(false);
    const [showExitPopup, setShowExitPopup] = useState(false);
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [hasExitedInfo, setHasExitedInfo] = useState(false);

    // Time-based popup
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!hasExitedInfo && !showExitPopup) {
                setShowTimePopup(true);
            }
        }, 8000);
        return () => clearTimeout(timer);
    }, [hasExitedInfo, showExitPopup]);

    // Exit-intent
    useEffect(() => {
        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY <= 0 && !hasExitedInfo && !showTimePopup) {
                setShowExitPopup(true);
            }
        };
        document.addEventListener("mouseleave", handleMouseLeave);
        return () => document.removeEventListener("mouseleave", handleMouseLeave);
    }, [hasExitedInfo, showTimePopup]);

    const closeAll = () => {
        setShowTimePopup(false);
        setShowExitPopup(false);
        setHasExitedInfo(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const result = await submitToFormspree({ email, type: showTimePopup ? "time_based_popup" : "exit_intent_popup" });
            console.log("Newsletter submission success:", result);
            setSubmitted(true);
            setTimeout(() => {
                closeAll();
                setSubmitted(false);
            }, 2000);
        } catch (error: any) {
            console.error("Popup form error:", error);
            setSubmitted(false);
            alert(`Error al enviar: ${error.message || "Por favor intenta de nuevo."}`);
        }
    };

    return (
        <AnimatePresence>
            {(showTimePopup || showExitPopup) && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1220]/80 backdrop-blur-md"
                    onClick={closeAll}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        className="bg-white rounded-3xl p-10 max-w-md w-full relative shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={closeAll}
                            className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5 text-slate-400" />
                        </button>

                        {showTimePopup ? (
                            <div className="text-center">
                                <h3 className="text-3xl font-bold text-[#0B1220] mb-4">
                                    {t('time.title')}
                                </h3>
                                <p className="text-slate-600 mb-8 text-lg">
                                    {t('time.subtitle')}
                                </p>
                            </div>
                        ) : (
                            <div className="text-center">
                                <span className="bg-[#E11D2E]/10 text-[#E11D2E] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 inline-block">
                                    {t('exit.badge')}
                                </span>
                                <h3 className="text-3xl font-bold text-[#0B1220] mb-4">
                                    {t('exit.title')}
                                </h3>
                                <p className="text-slate-600 mb-8 text-lg">
                                    {t('exit.subtitle')}
                                </p>
                            </div>
                        )}

                        {!submitted ? (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    type="email"
                                    required
                                    placeholder={t('form.placeholder')}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-6 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#E11D2E] outline-none text-slate-900"
                                />
                                <button
                                    type="submit"
                                    className="w-full py-4 bg-[#E11D2E] hover:bg-[#B81422] text-white font-bold text-lg rounded-xl transition-all shadow-xl shadow-[#E11D2E]/20"
                                >
                                    {showTimePopup ? t('time.cta') : t('exit.cta')}
                                </button>
                            </form>
                        ) : (
                            <div className="bg-green-50 text-green-700 p-6 rounded-xl text-center font-bold border border-green-100">
                                {t('form.success')}
                            </div>
                        )}

                        <p className="text-xs text-slate-400 text-center mt-6">
                            {t('form.note')}
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}


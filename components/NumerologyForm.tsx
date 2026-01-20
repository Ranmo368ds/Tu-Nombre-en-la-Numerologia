import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Info, Mail, Calendar } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { parseDate } from "@/utils/date";
import { useTranslations } from "next-intl";

interface NumerologyFormProps {
    onCalculate: (name: string, birthDate: string) => void;
    onClear: () => void;
}

export function NumerologyForm({ onCalculate, onClear }: NumerologyFormProps) {
    const t = useTranslations("Numerology");
    const tHome = useTranslations("HomePage");
    const [name, setName] = useState("");
    const [dateStr, setDateStr] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState<{ date?: string, email?: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // TODO: REEMPLAZA ESTO CON TU FORM ID REAL DE FORMSPREE
    // Ejemplo: "mzbjqypo" -> "https://formspree.io/f/mzbjqypo"
    // Endpoint from .env or fallback (replace logic handled in .env.local)
    const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "https://formspree.io/f/xgooeyqd";

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: { date?: string, email?: string } = {};

        // Validate Date
        const parsedDate = parseDate(dateStr);
        if (!parsedDate) {
            newErrors.date = t('form.date_error');
        }

        // Validate Email
        if (!email || !validateEmail(email)) {
            newErrors.email = t('form.email_error');
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        setIsSubmitting(true);

        try {
            // Send to Formspree
            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    _replyto: email, // Reply to the user
                    _subject: "Nuevo lead de Numerología App",
                    nombre: name,
                    fecha_nacimiento: parsedDate,
                    message: `Nueva lectura generada para ${name} (${parsedDate})`
                })
            });

            if (response.ok) {
                // Success
                alert("¡Gracias! Tu lectura está lista. Te llegará un email con más detalles (revisa spam).");
                onCalculate(name, parsedDate!);
            } else {
                // Determine if it's a 404 (wrong endpoint) or other error
                if (response.status === 404) {
                    alert("⚠️ Error: El formulario no está conectado. Por favor configura el ID de Formspree en el código.");
                    // Allow proceed anyway for testing if in dev mode? No, enforce connection.
                    // But for the sake of the user seeing the app work if they mess up:
                    console.error("Formspree 404: Check your form ID.");
                } else {
                    alert("Hubo un problema al enviar tus datos. Por favor intenta de nuevo.");
                }
            }
        } catch (error) {
            console.error("Submission error:", error);
            alert("Error de conexión. Intenta de nuevo.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClear = () => {
        setName("");
        setDateStr("");
        setEmail("");
        setErrors({});
        onClear();
    };

    return (
        <TooltipProvider>
            <Card className="glass-card border-none max-w-2xl mx-auto overflow-hidden">
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Input (Gate) */}
                        <div className="space-y-3">
                            <Label htmlFor="email" className="text-slate-300 font-mystic tracking-wide flex items-center gap-2">
                                {t('form.email_label')} <span className="text-[10px] text-gold/70 bg-gold/10 px-1.5 py-0.5 rounded uppercase tracking-wider">{t('form.email_required_tag')}</span>
                            </Label>
                            <p className="text-xs text-slate-400 -mt-2">{t('form.email_help')}</p>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder={t('form.email_placeholder')}
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (errors.email) setErrors({ ...errors, email: undefined });
                                    }}
                                    className={`bg-white/5 border-white/10 focus:border-gold/50 focus:ring-gold/30 text-slate-100 h-12 pl-10 ${errors.email ? "border-red-500/50 focus:border-red-500" : ""}`}
                                    disabled={isSubmitting}
                                />
                            </div>
                            {errors.email && <p className="text-xs text-red-400 pl-1">{errors.email}</p>}
                        </div>

                        {/* Name Input */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <Label htmlFor="name" className="text-slate-300 font-mystic tracking-wide">{t('form.name_label')}</Label>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Info className="w-3.5 h-3.5 text-gold/50 cursor-help" />
                                    </TooltipTrigger>
                                    <TooltipContent className="max-w-xs space-y-2 p-3">
                                        <p><strong>Destino:</strong> {t('tooltips.destiny').includes(':') ? t('tooltips.destiny').split(': ')[1] : t('tooltips.destiny')}</p>
                                        <p><strong>Deseo del Alma:</strong> {t('tooltips.soul_urge').includes(':') ? t('tooltips.soul_urge').split(': ')[1] : t('tooltips.soul_urge')}</p>
                                        <p><strong>Personalidad:</strong> {t('tooltips.personality').includes(':') ? t('tooltips.personality').split(': ')[1] : t('tooltips.personality')}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                            <Input
                                id="name"
                                placeholder={t('form.name_placeholder')}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="bg-white/5 border-white/10 focus:border-gold/50 focus:ring-gold/30 text-slate-100 h-12"
                                required
                                disabled={isSubmitting}
                            />
                        </div>

                        {/* Birth Date Input (Manual) */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <Label htmlFor="birthDate" className="text-slate-300 font-mystic tracking-wide">{t('form.date_label')}</Label>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Info className="w-3.5 h-3.5 text-gold/50 cursor-help" />
                                    </TooltipTrigger>
                                    <TooltipContent className="max-w-xs p-3">
                                        <p><strong>Camino de Vida:</strong> {t('tooltips.life_path').includes(':') ? t('tooltips.life_path').split(': ')[1] : t('tooltips.life_path')}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <Input
                                    id="birthDate"
                                    type="text"
                                    placeholder={t('form.date_placeholder')}
                                    value={dateStr}
                                    onChange={(e) => {
                                        setDateStr(e.target.value);
                                        if (errors.date) setErrors({ ...errors, date: undefined });
                                    }}
                                    className={`bg-white/5 border-white/10 focus:border-gold/50 focus:ring-gold/30 text-slate-100 h-12 pl-10 ${errors.date ? "border-red-500/50 focus:border-red-500" : ""}`}
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>
                            {errors.date && <p className="text-xs text-red-400 pl-1">{errors.date}</p>}
                        </div>

                        <div className="flex gap-4 pt-4">
                            <Button
                                type="submit"
                                className="flex-1 bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 text-slate-950 font-bold h-12 rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isSubmitting}
                            >
                                <Sparkles className="mr-2 h-4 w-4" />
                                {isSubmitting ? t('form.calculate_sending') : t('form.calculate_btn')}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleClear}
                                className="border-white/10 hover:bg-white/5 text-slate-300 h-12"
                                disabled={isSubmitting}
                            >
                                {t('form.clear_btn')}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </TooltipProvider>
    );
}

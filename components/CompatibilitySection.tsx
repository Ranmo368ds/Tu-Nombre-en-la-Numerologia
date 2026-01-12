"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Users, Heart, Star, Sparkles, Info } from "lucide-react"
import { calculateCompatibility, calculateLifePath, type CompatibilityType, type CompatibilityResult } from "@/utils/numerology"

interface CompatibilitySectionProps {
    userLifePath: number | null;
}

export function CompatibilitySection({ userLifePath }: CompatibilitySectionProps) {
    const [name, setName] = useState("")
    const [birthDate, setBirthDate] = useState("")
    const [type, setType] = useState<CompatibilityType>("Pareja")
    const [result, setResult] = useState<CompatibilityResult | null>(null)

    const handleCalculate = (e: React.FormEvent) => {
        e.preventDefault()
        if (!userLifePath || !birthDate) return

        const otherLP = calculateLifePath(birthDate).value
        const compResult = calculateCompatibility(userLifePath, otherLP, type)
        setResult(compResult)
    }

    if (!userLifePath) {
        return (
            <Card className="glass-card border-none mt-8 max-w-2xl mx-auto">
                <CardContent className="pt-10 pb-10 text-center">
                    <Users className="w-12 h-12 text-gold/30 mx-auto mb-4" />
                    <p className="text-slate-400 italic">
                        Primero calcula tu propia numerología en la pestaña principal para ver la compatibilidad.
                    </p>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="w-full max-w-4xl mx-auto mt-8 space-y-8">
            <Card className="glass-card border-none overflow-hidden">
                <CardHeader>
                    <CardTitle className="font-mystic text-2xl text-slate-100 flex items-center gap-3">
                        <Heart className="text-gold" /> Sinastría de Almas
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleCalculate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-slate-300">Tipo de Relación</Label>
                                <Select value={type} onValueChange={(v) => setType(v as CompatibilityType)}>
                                    <SelectTrigger className="bg-white/5 border-white/10 text-slate-100 uppercase tracking-wider text-xs font-bold">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Pareja">Pareja ✨</SelectItem>
                                        <SelectItem value="Socio de negocio">Socio de Negocio 🤝</SelectItem>
                                        <SelectItem value="Hijo">Hijo/Hija 🍼</SelectItem>
                                        <SelectItem value="Mascota">Mascota 🐾</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-300">Nombre del otro</Label>
                                <Input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Nombre completo"
                                    className="bg-white/5 border-white/10 text-slate-100 h-11"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-slate-300">Fecha de Nacimiento</Label>
                                <Input
                                    type="date"
                                    value={birthDate}
                                    onChange={(e) => setBirthDate(e.target.value)}
                                    className="bg-white/5 border-white/10 text-slate-100 h-11 [color-scheme:dark]"
                                    required
                                />
                            </div>
                            <div className="pt-8">
                                <Button
                                    type="submit"
                                    className="w-full bg-gold/80 hover:bg-gold text-slate-950 font-bold h-11 shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                                >
                                    <Sparkles className="mr-2 h-4 w-4" />
                                    Ver Compatibilidad
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <AnimatePresence>
                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                    >
                        <Card className="glass-card border-none bg-gradient-to-br from-slate-900/80 to-slate-950/90 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl -mr-10 -mt-10" />
                            <CardContent className="pt-8">
                                <div className="flex flex-col md:flex-row gap-8 items-center">
                                    <div className="relative group">
                                        <div className="w-32 h-32 rounded-full border-2 border-gold/30 flex items-center justify-center p-2 relative z-10">
                                            <div className="w-full h-full rounded-full bg-gold/10 flex flex-col items-center justify-center">
                                                <span className="text-3xl font-mystic text-gold intense-glow">{result.score}%</span>
                                                <span className="text-[8px] uppercase tracking-tighter text-slate-400">Afinidad</span>
                                            </div>
                                        </div>
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                            className="absolute inset-0 border border-dashed border-gold/20 rounded-full"
                                        />
                                    </div>

                                    <div className="flex-1 space-y-4 text-center md:text-left">
                                        <div className="space-y-1">
                                            <h3 className="text-xl font-mystic text-slate-100 flex items-center justify-center md:justify-start gap-2">
                                                Sinergia Vibracional: <span className="text-gold">{result.synergy}</span>
                                            </h3>
                                            <p className="text-xs text-slate-500 uppercase tracking-widest font-mono">{result.breakdown}</p>
                                        </div>
                                        <p className="text-slate-300 text-lg leading-relaxed italic opacity-90">
                                            "{result.interpretation}"
                                        </p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                                            <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                                                <h4 className="text-[10px] uppercase font-bold text-gold tracking-widest mb-1">Fortaleza</h4>
                                                <p className="text-sm text-slate-200">
                                                    {type === "Mascota" ? "Vínculo puro y lealtad incondicional." : "Gran capacidad de manifestación conjunta."}
                                                </p>
                                            </div>
                                            <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                                                <h4 className="text-[10px] uppercase font-bold text-gold tracking-widest mb-1">Desafío</h4>
                                                <p className="text-sm text-slate-200">
                                                    {type === "Mascota" ? "Entender sus necesidades energéticas." : "Evitar la competencia de egos."}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

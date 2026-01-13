"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Home, Briefcase, MapPin, Sparkles, Paintbrush, Gem, Calendar } from "lucide-react"
import { calculateHouseNumerology, type HouseNumerologyResult } from "@/utils/numerology"
import { cn } from "@/lib/utils"
import { parseDate } from "@/utils/date"
import { useTranslations } from "next-intl"

export function HomeBusinessSection() {
    const t = useTranslations('HomePage');
    const [addressNum, setAddressNum] = useState("")
    const [streetName, setStreetName] = useState("")
    const [dateStr, setDateStr] = useState("")
    const [error, setError] = useState("")
    const [result, setResult] = useState<HouseNumerologyResult | null>(null)

    const handleCalculate = (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if (!addressNum) return

        let parsedDate: string | undefined = undefined;
        if (dateStr) {
            const d = parseDate(dateStr);
            if (!d) {
                setError(t('form.date_error'));
                return;
            }
            parsedDate = d;
        }

        const res = calculateHouseNumerology(addressNum, streetName, parsedDate)
        setResult(res)
    }

    return (
        <div className="w-full max-w-4xl mx-auto mt-8 space-y-8">
            <Card className="glass-card border-none overflow-hidden">
                <CardHeader>
                    <CardTitle className="font-mystic text-2xl text-slate-100 flex items-center gap-3">
                        <Home className="text-gold" /> {t('spaces.title')}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleCalculate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-slate-300">{t('spaces.form.address_num')}</Label>
                                <Input
                                    value={addressNum}
                                    onChange={(e) => setAddressNum(e.target.value)}
                                    placeholder={t('spaces.form.address_placeholder')}
                                    className="bg-white/5 border-white/10 text-slate-100 h-11"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-300">{t('spaces.form.street_name')}</Label>
                                <Input
                                    value={streetName}
                                    onChange={(e) => setStreetName(e.target.value)}
                                    placeholder={t('spaces.form.street_placeholder')}
                                    className="bg-white/5 border-white/10 text-slate-100 h-11"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-slate-300">{t('spaces.form.move_date')}</Label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                    <Input
                                        type="text"
                                        placeholder={t('form.date_placeholder')}
                                        value={dateStr}
                                        onChange={(e) => {
                                            setDateStr(e.target.value)
                                            setError("")
                                        }}
                                        className={`bg-white/5 border-white/10 text-slate-100 h-11 pl-10 ${error ? "border-red-500/50" : ""}`}
                                    />
                                </div>
                                {error && <p className="text-xs text-red-400 pl-1">{error}</p>}
                            </div>
                            <div className="pt-8">
                                <Button
                                    type="submit"
                                    className="w-full bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold h-11 shadow-[0_0_15px_rgba(217,119,6,0.2)] disabled:opacity-50"
                                    disabled={!addressNum}
                                >
                                    <Sparkles className="mr-2 h-4 w-4" />
                                    {t('spaces.form.submit')}
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <AnimatePresence>
                {result && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        <Card className="glass-card border-none bg-slate-900/60 md:col-span-1">
                            <CardContent className="pt-8 flex flex-col items-center justify-center text-center">
                                <div className={cn(
                                    "w-24 h-24 rounded-2xl flex items-center justify-center mb-4 rotate-3 shadow-2xl relative group overflow-hidden",
                                    result.synesthesia.color
                                )}>
                                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <span className="text-5xl font-mystic text-white drop-shadow-lg">{result.houseNumber}</span>
                                </div>
                                <h3 className="text-gold font-mystic text-xl mb-1">{t('spaces.result.home_level')} {result.houseNumber}</h3>
                                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-mono">{result.breakdown}</p>
                            </CardContent>
                        </Card>

                        <Card className="glass-card border-none bg-slate-900/60 md:col-span-2 overflow-hidden relative">
                            <div className={cn(
                                "absolute top-0 right-0 w-1 h-full opacity-50",
                                result.synesthesia.color
                            )} />
                            <CardContent className="pt-8 space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 rounded-full bg-white/5">
                                        <Paintbrush className="w-5 h-5 text-gold/80" />
                                    </div>
                                    <div>
                                        <h4 className="text-slate-100 font-bold text-lg">
                                            {t(`results.house.${result.houseNumber}.sensation`)}
                                        </h4>
                                        <p className="text-slate-300 text-sm leading-relaxed">
                                            {t(`results.house.${result.houseNumber}.advice`)}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-2 rounded-full bg-white/5">
                                        <Gem className="w-5 h-5 text-gold/80" />
                                    </div>
                                    <div>
                                        <h4 className="text-slate-100 font-bold text-sm">{t('spaces.result.crystals')}</h4>
                                        <p className="text-slate-400 text-sm italic">{result.synesthesia.crystals}</p>
                                    </div>
                                </div>

                                <div className="bg-gold/5 p-4 rounded-lg border border-gold/10">
                                    <p className="text-[11px] text-gold/80 uppercase font-bold tracking-widest mb-1">{t('spaces.result.color_synesthesia')}</p>
                                    <div className="flex items-center gap-3">
                                        <div className={cn("w-4 h-4 rounded-full", result.synesthesia.color)} />
                                        <p className="text-xs text-slate-300">{t('spaces.result.color_desc')}</p>
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

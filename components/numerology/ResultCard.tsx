"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Shield, Heart, Briefcase, Zap, Info } from "lucide-react";
import { type DetailedResult } from "@/utils/numerology";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations } from "next-intl";

interface ResultCardProps {
    label: string;
    result: DetailedResult;
    delay?: number;
}

const icons: Record<string, any> = {
    "life_path": Star,
    "destiny": Shield,
    "soul_urge": Heart,
    "personality": Zap,
};

export function ResultCard({ label, result, delay = 0 }: ResultCardProps) {
    const t = useTranslations('HomePage.results');
    const Icon = icons[label] || Briefcase;
    const { value, breakdown } = result;
    const meaningKey = value.toString() as any;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{
                duration: 0.8,
                delay,
                ease: [0, 0.71, 0.2, 1.01]
            }}
            whileHover={{ scale: 1.03, y: -5 }}
            className="h-full"
        >
            <Card className="glass-card border-none overflow-hidden h-full flex flex-col group">
                <CardHeader className="pb-2">
                    <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4 text-gold/60" />
                            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">
                                {t(`labels.${label}`)}
                            </span>
                        </div>
                        <span className="text-4xl font-mystic text-gold intense-glow group-hover:scale-110 transition-transform duration-500">
                            {value}
                        </span>
                    </div>
                    <CardTitle className="font-mystic text-2xl text-slate-100 tracking-tight">
                        {t(`meanings.${meaningKey}.title`)}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5 text-sm md:text-md text-slate-300 flex-grow leading-relaxed">
                    <div className="relative">
                        <p className="italic text-slate-200 border-l-2 border-gold/30 pl-4 py-1">"{t(`meanings.${meaningKey}.personality`)}"</p>
                    </div>

                    <div className="grid grid-cols-1 gap-5">
                        <section>
                            <h4 className="text-gold text-[11px] uppercase font-bold tracking-[0.1em] mb-2 flex items-center gap-2">
                                <span className="w-1 h-1 bg-gold rounded-full" /> {t('card.strengths')}
                            </h4>
                            <p className="pl-3 border-l border-white/5">{t(`meanings.${meaningKey}.strengths`)}</p>
                        </section>
                        <section>
                            <h4 className="text-gold text-[11px] uppercase font-bold tracking-[0.1em] mb-2 flex items-center gap-2">
                                <span className="w-1 h-1 bg-gold rounded-full" /> {t('card.challenges')}
                            </h4>
                            <p className="pl-3 border-l border-white/5">{t(`meanings.${meaningKey}.challenges`)}</p>
                        </section>
                    </div>

                    <Accordion type="single" collapsible className="w-full border-t border-white/5 mt-2">
                        <AccordionItem value="formula" className="border-none">
                            <AccordionTrigger className="text-[10px] uppercase tracking-wider text-slate-500 hover:text-gold/80 py-2">
                                <div className="flex items-center gap-2">
                                    <Info className="w-3 h-3" />
                                    {t('card.source')}
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="text-[11px] text-slate-400 bg-black/20 rounded p-3 font-mono leading-relaxed">
                                <p className="mb-1 text-gold/60 font-bold">{t('card.formula')}</p>
                                {breakdown}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <div className="border-t border-white/10 pt-5 mt-auto bg-gold/5 -mx-6 px-6 py-4">
                        <h4 className="text-gold text-[10px] uppercase font-bold tracking-[0.2em] mb-3">{t('card.synergy')}</h4>
                        <div className="space-y-2">
                            <p className="flex items-start gap-2 text-sm">
                                <Heart className="w-3.5 h-3.5 mt-0.5 text-pink-400/60" />
                                <span><strong className="text-slate-100">{t('card.love')}</strong> {t(`meanings.${meaningKey}.love`)}</span>
                            </p>
                            <p className="flex items-start gap-2 text-sm">
                                <Briefcase className="w-3.5 h-3.5 mt-0.5 text-blue-400/60" />
                                <span><strong className="text-slate-100">{t('card.career')}</strong> {t(`meanings.${meaningKey}.career`)}</span>
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}

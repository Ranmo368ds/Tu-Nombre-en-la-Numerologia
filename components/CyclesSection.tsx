"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Clock, Book, Sparkles, Diamond, Palette, Calendar, Hash, ArrowRight, Save, Feather } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CyclesSection() {
    const t = useTranslations('HomePage.cycles_content');
    const [notes, setNotes] = useState("");
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const savedNotes = localStorage.getItem("numerology_journal");
        if (savedNotes) setNotes(savedNotes);
    }, []);

    const handleSave = () => {
        localStorage.setItem("numerology_journal", notes);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="w-full max-w-4xl mx-auto mt-8 space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Tabs defaultValue="cycles" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-white/5 border border-white/10 mb-8">
                        <TabsTrigger value="cycles" className="uppercase tracking-widest text-[10px] md:text-xs">Ciclos</TabsTrigger>
                        <TabsTrigger value="tips" className="uppercase tracking-widest text-[10px] md:text-xs">Consejos</TabsTrigger>
                        <TabsTrigger value="journal" className="uppercase tracking-widest text-[10px] md:text-xs">Diario</TabsTrigger>
                    </TabsList>

                    <TabsContent value="cycles" className="space-y-6">
                        <Card className="glass-card border-none overflow-hidden">
                            <CardHeader>
                                <CardTitle className="font-mystic text-2xl text-slate-100 flex items-center gap-3">
                                    <Clock className="text-gold" /> {t('long_cycles.title')}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <p className="text-slate-300 leading-relaxed font-light text-lg">
                                    {t('long_cycles.desc')}
                                </p>

                                <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 p-6 rounded-xl border border-white/5">
                                    <h3 className="text-gold font-bold uppercase tracking-widest text-xs mb-3 flex items-center gap-2">
                                        <Sparkles className="w-4 h-4" /> {t('powerful_advice.title')}
                                    </h3>
                                    <p className="text-slate-200 italic text-sm leading-relaxed">
                                        "{t('powerful_advice.desc')}"
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="glass-card border-none overflow-hidden">
                            <CardHeader>
                                <CardTitle className="font-mystic text-xl text-slate-100 flex items-center gap-3">
                                    <ArrowRight className="text-gold" /> {t('compatibility.title')}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-300 leading-relaxed">
                                    {t('compatibility.desc')}
                                </p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="tips">
                        <Card className="glass-card border-none">
                            <CardHeader>
                                <CardTitle className="font-mystic text-2xl text-slate-100 flex items-center gap-3">
                                    <Diamond className="text-gold" /> {t('practical_tips.title')}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 bg-white/5 rounded-lg border border-white/5 hover:border-gold/30 transition-colors">
                                    <Palette className="w-5 h-5 text-pink-400 mb-2" />
                                    <p className="text-slate-300 text-sm">{t('practical_tips.colors')}</p>
                                </div>
                                <div className="p-4 bg-white/5 rounded-lg border border-white/5 hover:border-gold/30 transition-colors">
                                    <Hash className="w-5 h-5 text-blue-400 mb-2" />
                                    <p className="text-slate-300 text-sm">{t('practical_tips.numbers')}</p>
                                </div>
                                <div className="p-4 bg-white/5 rounded-lg border border-white/5 hover:border-gold/30 transition-colors">
                                    <Diamond className="w-5 h-5 text-purple-400 mb-2" />
                                    <p className="text-slate-300 text-sm">{t('practical_tips.crystals')}</p>
                                </div>
                                <div className="p-4 bg-white/5 rounded-lg border border-white/5 hover:border-gold/30 transition-colors">
                                    <Calendar className="w-5 h-5 text-amber-400 mb-2" />
                                    <p className="text-slate-300 text-sm">{t('practical_tips.hours')}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="journal">
                        <Card className="glass-card border-none relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <Feather className="w-48 h-48 text-gold" />
                            </div>
                            <CardHeader>
                                <CardTitle className="font-mystic text-2xl text-slate-100 flex items-center gap-3">
                                    <Book className="text-gold" /> {t('journal.title')}
                                </CardTitle>
                                <CardDescription className="text-gold/80 font-bold uppercase tracking-widest text-[10px]">
                                    {t('journal.subtitle')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6 relative z-10">
                                <div className="space-y-4 text-sm text-slate-400">
                                    <p>{t('journal.instruction')}</p>
                                    <ul className="list-disc pl-5 space-y-1 text-slate-300">
                                        <li>{t('journal.prompts.app')}</li>
                                        <li>{t('journal.prompts.reality')}</li>
                                        <li>{t('journal.prompts.connection')}</li>
                                    </ul>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-slate-400 text-xs uppercase tracking-widest">Mis Notas</Label>
                                    <Textarea
                                        value={notes}
                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value)}
                                        placeholder={t('journal.placeholder')}
                                        className="min-h-[200px] bg-black/20 border-white/10 text-slate-200 focus:border-gold/50 font-mono text-sm leading-relaxed resize-none p-4"
                                    />
                                    <div className="flex justify-end pt-2">
                                        <Button
                                            onClick={handleSave}
                                            className="bg-gold hover:bg-yellow-500 text-black font-bold"
                                        >
                                            <Save className="w-4 h-4 mr-2" />
                                            {saved ? "Guardado" : "Guardar"}
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </motion.div>
        </div>
    );
}

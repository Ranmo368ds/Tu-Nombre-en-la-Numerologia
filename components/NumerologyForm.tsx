"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Info } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface NumerologyFormProps {
    onCalculate: (name: string, birthDate: string) => void;
    onClear: () => void;
}

export function NumerologyForm({ onCalculate, onClear }: NumerologyFormProps) {
    const [name, setName] = useState("");
    const [birthDate, setBirthDate] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name && birthDate) {
            onCalculate(name, birthDate);
        }
    };

    const handleClear = () => {
        setName("");
        setBirthDate("");
        onClear();
    };

    return (
        <TooltipProvider>
            <Card className="glass-card border-none max-w-2xl mx-auto overflow-hidden">
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <Label htmlFor="name" className="text-slate-300 font-mystic tracking-wide">Nombre Completo</Label>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Info className="w-3.5 h-3.5 text-gold/50 cursor-help" />
                                    </TooltipTrigger>
                                    <TooltipContent className="max-w-xs space-y-2 p-3">
                                        <p><strong>Destino:</strong> Suma de todas las letras del nombre completo.</p>
                                        <p><strong>Deseo del Alma:</strong> Solo vocales (esencia interna).</p>
                                        <p><strong>Personalidad:</strong> Solo consonantes (imagen externa).</p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                            <Input
                                id="name"
                                placeholder="Ej: Juan Pérez"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="bg-white/5 border-white/10 focus:border-gold/50 focus:ring-gold/30 text-slate-100 h-12"
                                required
                            />
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <Label htmlFor="birthDate" className="text-slate-300 font-mystic tracking-wide">Fecha de Nacimiento</Label>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Info className="w-3.5 h-3.5 text-gold/50 cursor-help" />
                                    </TooltipTrigger>
                                    <TooltipContent className="max-w-xs p-3">
                                        <p><strong>Camino de Vida:</strong> Se calcula sumando todos los dígitos de tu fecha (DD+MM+AAAA) hasta reducir a un número del 1 al 9 o Maestro (11, 22, 33).</p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                            <Input
                                id="birthDate"
                                type="date"
                                value={birthDate}
                                onChange={(e) => setBirthDate(e.target.value)}
                                className="bg-white/5 border-white/10 focus:border-gold/50 focus:ring-gold/30 text-slate-100 h-12 [color-scheme:dark]"
                                required
                            />
                        </div>

                        <div className="flex gap-4 pt-4">
                            <Button
                                type="submit"
                                className="flex-1 bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 text-slate-950 font-bold h-12 rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                            >
                                <Sparkles className="mr-2 h-4 w-4" />
                                Calcular mi numerología
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleClear}
                                className="border-white/10 hover:bg-white/5 text-slate-300 h-12"
                            >
                                Limpiar
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </TooltipProvider>
    );
}

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Play,
    Pause,
    Volume2,
    Mic,
    Calendar,
    Music,
    Radio,
    Instagram,
    Facebook,
    Twitter,
    Menu,
    X,
    ExternalLink,
    ShoppingBag
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle,
    DialogDescription
} from '@/components/ui/dialog';

import { useSearchParams } from 'next/navigation';
import esMessages from '../../messages/es.json';
import enMessages from '../../messages/en.json';
import ptMessages from '../../messages/pt.json';

// Simple types for our specific structure to avoid TS errors
const messagesDict: Record<string, any> = {
    es: esMessages,
    en: enMessages,
    pt: ptMessages
};

export default function RadioUnicaPage() {
    const searchParams = useSearchParams();
    const lang = searchParams.get('lang') || 'es';
    const t = (key: string) => {
        const keys = key.split('.');
        let value = messagesDict[lang]?.RadioUnica;
        for (const k of keys) {
            value = value?.[k];
        }
        return value || key;
    };

    const [isPlaying, setIsPlaying] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [volume, setVolume] = useState(80);
    const audioRef = React.useRef<HTMLAudioElement>(null);

    // Real stream URL from Live365
    const STREAM_URL = "https://streaming.live365.com/a23237";

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(e => console.error("Error playing stream:", e));
            }
            setIsPlaying(!isPlaying);
        }
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume / 100;
        }
    }, [volume]);

    // Mock data for current show/song
    const currentShow = {
        title: "La Mañana Unica",
        host: 'Dither M. Rangel "El Genes"',
        time: "06:00 AM - 10:00 AM",
        image: "https://images.unsplash.com/photo-1478737270239-2f02b77ac6d5?auto=format&fit=crop&q=80&w=1000"
    };

    const nextShows = [
        { title: "Romance al Mediodía", time: "12:00 PM" },
        { title: "Tardes de Éxito", time: "03:00 PM" },
        { title: "Noche Bohemia", time: "08:00 PM" },
    ];

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-yellow-500 selection:text-black overflow-x-hidden">

            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 relative rounded-full overflow-hidden border-2 border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.3)]">
                                <img
                                    src="/logo-neon.png"
                                    alt="Radio Unica Logo"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <span className="text-2xl font-bold tracking-tighter">RADIO <span className="text-yellow-500">UNICA</span></span>
                        </div>

                        <div className="hidden md:flex items-center gap-8">
                            <a href="#inicio" className="text-sm font-medium hover:text-yellow-500 transition-colors">INICIO</a>
                            <a href="#programacion" className="text-sm font-medium hover:text-yellow-500 transition-colors">PROGRAMACIÓN</a>
                            <a href="#nosotros" className="text-sm font-medium hover:text-yellow-500 transition-colors">NOSOTROS</a>
                            <a href="#tienda" className="text-sm font-medium hover:text-yellow-500 transition-colors">{t('title')}</a>
                            <a href="#contacto" className="text-sm font-medium hover:text-yellow-500 transition-colors">CONTACTO</a>
                            <Button
                                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-full px-6"
                                onClick={togglePlay}
                            >
                                {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                                EN VIVO
                            </Button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-black pt-24 px-4 md:hidden"
                    >
                        <div className="flex flex-col gap-6 text-center text-2xl font-bold">
                            <a href="#inicio" onClick={() => setIsMenuOpen(false)}>INICIO</a>
                            <a href="#programacion" onClick={() => setIsMenuOpen(false)}>PROGRAMACIÓN</a>
                            <a href="#nosotros" onClick={() => setIsMenuOpen(false)}>NOSOTROS</a>
                            <a href="#tienda" onClick={() => setIsMenuOpen(false)}>TIENDA</a>
                            <a href="#contacto" onClick={() => setIsMenuOpen(false)}>CONTACTO</a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hero Section */}
            <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Abstract Background Animation */}
                <div className="absolute inset-0 z-0 opacity-30">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yellow-600/30 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[100px]" />
                </div>

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="w-48 h-48 mx-auto mb-8 relative"
                    >
                        <div className="absolute inset-0 bg-yellow-500/20 blur-3xl rounded-full animate-pulse" />
                        <img src="/logo-abstract.png" alt="Radio Unica Art" className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_15px_rgba(0,0,0,0.5)] rounded-full" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-yellow-500/10 text-yellow-500 text-sm font-semibold mb-6 border border-yellow-500/20">
                            CHICAGO, IL
                        </span>
                        <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tight leading-none">
                            DONDE LA MÚSICA <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500">
                                TIENE ALMA
                            </span>
                        </h1>
                        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                            Conectando historias a través de los mejores éxitos. Desde clásicos inolvidables hasta lo más nuevo del regional y pop.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button
                                size="lg"
                                className="w-full sm:w-auto bg-white text-black hover:bg-gray-200 rounded-full h-14 px-8 text-lg font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all hover:scale-105"
                                onClick={togglePlay}
                            >
                                {isPlaying ? <Pause className="mr-2" /> : <Play className="mr-2" />}
                                ESCUCHAR AHORA
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                size="lg"
                                className="w-full sm:w-auto border-white/20 hover:bg-white/10 text-white rounded-full h-14 px-8 text-lg"
                            >
                                <a href="https://www.speakpipe.com/RadioUnica" target="_blank" rel="noopener noreferrer">
                                    <Mic className="mr-2 w-5 h-5" />
                                    Mandar Saludo
                                </a>
                            </Button>
                        </div>
                    </motion.div>
                </div>

                {/* Current Track Info Floating */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute bottom-32 right-4 md:right-10 bg-white/5 backdrop-blur-lg border border-white/10 p-4 rounded-xl max-w-xs hidden md:flex items-center gap-4"
                >
                    <div className="w-12 h-12 rounded bg-gray-800 flex items-center justify-center overflow-hidden">
                        {/* Musical Note Icon or Album Art */}
                        <Music className="text-yellow-500" />
                    </div>
                    <div>
                        <p className="text-xs text-yellow-500 font-bold uppercase">Ahora Sonando</p>
                        <p className="font-medium truncate">El Triste - José José</p>
                    </div>
                    <div className="flex gap-1 h-4 items-end ml-2">
                        {[1, 2, 3, 4].map(i => (
                            <motion.div
                                key={i}
                                animate={{ height: [4, 16, 8, 12] }}
                                transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }}
                                className="w-1 bg-yellow-500 rounded-full"
                            />
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Programación / Banda Sonora */}
            <section id="programacion" className="py-24 px-4 bg-zinc-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl md:text-5xl font-black text-center mb-16 tracking-tight">
                        LA BANDA SONORA <span className="text-yellow-500">DE TU VIDA</span>
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "POP & BALADAS", artists: "Luis Miguel, Alejandro Sanz, Sin Bandera", time: "TODO EL DÍA", color: "from-purple-500 to-pink-500" },
                            { title: "ROCK EN TU IDIOMA", artists: "Maná, Soda Stereo, Hombres G", time: "CLÁSICOS", color: "from-blue-500 to-cyan-500" },
                            { title: "ÉXITOS EN INGLÉS", artists: "Los mejores hits de los 80s y 90s", time: "RETRO", color: "from-orange-500 to-red-500" }
                        ].map((show, i) => (
                            <div key={i} className="group relative overflow-hidden rounded-3xl bg-neutral-900 border border-white/10 hover:border-yellow-500/50 transition-all hover:scale-[1.02]">
                                <div className={`absolute inset-0 bg-gradient-to-br ${show.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                                <div className="p-8">
                                    <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-xs font-bold mb-4 text-yellow-500">{show.time}</span>
                                    <h3 className="text-2xl font-bold mb-2">{show.title}</h3>
                                    <p className="text-gray-400 text-sm">{show.artists}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quiénes Somos Section */}
            <section id="nosotros" className="py-24 bg-black relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">QUIÉNES <span className="text-yellow-500">SOMOS</span></h2>
                            <p className="text-lg text-gray-300 leading-relaxed">
                                ¡Bienvenidos a Radio Única! Somos mucho más que una estación en línea; somos un lugar donde los recuerdos se mezclan con la emoción del presente.
                            </p>
                            <p className="text-lg text-gray-300 leading-relaxed">
                                Celebramos la música que ha marcado generaciones, reuniendo lo mejor del pop, rock regional, y baladas, tanto en inglés como en español. Creemos en el poder de la música para conectar corazones y despertar emociones.
                            </p>
                            <p className="text-lg text-gray-300 leading-relaxed">
                                Cada canción que transmitimos ha sido seleccionada con cariño para hacerte sentir, recordar y disfrutar.
                            </p>
                            <div className="pt-4">
                                <h4 className="text-yellow-500 font-bold mb-1">DITHER M. RANGEL "EL GENES"</h4>
                                <p className="text-sm text-gray-400">Fundador</p>
                            </div>
                        </div>
                        <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl group">
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                            <img
                                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1000&auto=format&fit=crop"
                                alt="Studio Microphone"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Shop & Promos Section */}
            <section id="tienda" className="py-24 bg-zinc-950 px-4">
                <div className="max-w-7xl mx-auto">

                    <div className="flex items-center gap-2 mb-8">
                        <ShoppingBag className="w-6 h-6 text-yellow-500" />
                        <h2 className="text-3xl font-bold tracking-tighter">{t('title')}</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

                        {/* Product 5: Gorra (New) - Putting it first or last? Let's put it last or based on logic. Let's append it purely. */}

                        {/* Product 1: Taza */}
                        <div className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <div className="aspect-square bg-black flex items-center justify-center relative cursor-zoom-in">
                                        <img src="/product-mug.jpg" alt="Taza Oficial" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                                            <span className="text-yellow-400 font-bold text-lg">{t('view_details')}</span>
                                        </div>
                                    </div>
                                </DialogTrigger>
                                <DialogContent className="bg-zinc-950 border-zinc-800 max-w-md">
                                    <DialogTitle className="text-white">{t('products.mug')}</DialogTitle>
                                    <img src="/product-mug.jpg" alt="Taza Zoom" className="w-full rounded-lg" />
                                    <DialogDescription className="text-yellow-500 font-bold text-center">
                                        $15.00 <br />
                                        <span className="text-zinc-400 font-normal text-xs">* {t('shipping_safe')}</span>
                                    </DialogDescription>
                                </DialogContent>
                            </Dialog>
                            <div className="p-4 text-center">
                                <h3 className="font-bold text-sm mb-2">{t('products.mug')}</h3>
                                <Button className="w-full bg-white text-black hover:bg-yellow-500 hover:text-black text-xs font-bold" onClick={() => window.open('https://buy.stripe.com/dRmcN49f4fTF2m31CO3wQ10', '_blank')}>
                                    {t('buy')}
                                </Button>
                            </div>
                        </div>

                        {/* Product 2: Crewneck */}
                        <div className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <div className="aspect-square bg-zinc-900 flex items-center justify-center relative cursor-zoom-in">
                                        <div className="absolute top-2 right-2 bg-yellow-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-full z-10">{t('new')}</div>
                                        <img src="/product-crewneck.jpg" alt="Crewneck Clásico" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                                            <span className="text-yellow-400 font-bold text-lg">{t('view_details')}</span>
                                        </div>
                                    </div>
                                </DialogTrigger>
                                <DialogContent className="bg-zinc-950 border-zinc-800 max-w-md">
                                    <DialogTitle className="text-white">{t('products.crewneck')}</DialogTitle>
                                    <img src="/product-crewneck.jpg" alt="Crewneck Zoom" className="w-full rounded-lg" />
                                    <DialogDescription className="text-yellow-500 font-bold text-center">
                                        $45.00 <br />
                                        <span className="text-zinc-400 font-normal text-xs">* {t('select_size')} (S, M, L, XL)</span>
                                    </DialogDescription>
                                </DialogContent>
                            </Dialog>
                            <div className="p-4 text-center">
                                <h3 className="font-bold text-sm mb-2">Crewneck Clásico</h3>
                                <Button className="w-full bg-white text-black hover:bg-yellow-500 hover:text-black text-xs font-bold" onClick={() => window.open('https://buy.stripe.com/9B6fZgaj8gXJbWDepA3wQ0Y', '_blank')}>
                                    {t('buy')}
                                </Button>
                            </div>
                        </div>

                        {/* Product 3: Hoodie */}
                        <div className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <div className="aspect-square bg-zinc-900 flex items-center justify-center relative cursor-zoom-in">
                                        <div className="absolute top-2 right-2 bg-white text-black text-[10px] font-bold px-2 py-0.5 rounded-full z-10">{t('premium')}</div>
                                        <img src="/product-hoodie.jpg" alt="Sudadera Oficial" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                                            <span className="text-yellow-400 font-bold text-lg">{t('view_details')}</span>
                                        </div>
                                    </div>
                                </DialogTrigger>
                                <DialogContent className="bg-zinc-950 border-zinc-800 max-w-md">
                                    <DialogTitle className="text-white">{t('products.hoodie')}</DialogTitle>
                                    <img src="/product-hoodie.jpg" alt="Sudadera Zoom" className="w-full rounded-lg" />
                                    <DialogDescription className="text-yellow-500 font-bold text-center">
                                        $55.00 <br />
                                        <span className="text-zinc-400 font-normal text-xs">* {t('select_size')}</span>
                                    </DialogDescription>
                                </DialogContent>
                            </Dialog>
                            <div className="p-4 text-center">
                                <h3 className="font-bold text-sm mb-2">Sudadera Oficial</h3>
                                <Button className="w-full bg-white text-black hover:bg-yellow-500 hover:text-black text-xs font-bold" onClick={() => window.open('https://buy.stripe.com/28E00ifDsePB8KrftE3wQ0Z', '_blank')}>
                                    {t('buy')}
                                </Button>
                            </div>
                        </div>
                        {/* Product 4: Playera / T-Shirt */}
                        <div className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <div className="aspect-square bg-zinc-900 flex items-center justify-center relative cursor-zoom-in">
                                        <img src="/product-tshirt.jpg" alt="Playera Oficial" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                                            <span className="text-yellow-400 font-bold text-lg">{t('view_details')}</span>
                                        </div>
                                    </div>
                                </DialogTrigger>
                                <DialogContent className="bg-zinc-950 border-zinc-800 max-w-md">
                                    <DialogTitle className="text-white">{t('products.tshirt')}</DialogTitle>
                                    <img src="/product-tshirt.jpg" alt="Playera Zoom" className="w-full rounded-lg" />
                                    <DialogDescription className="text-yellow-500 font-bold text-center">
                                        $25.00 <br />
                                        <span className="text-zinc-400 font-normal text-xs">* {t('select_size_color')}</span>
                                    </DialogDescription>
                                </DialogContent>
                            </Dialog>
                            <div className="p-4 text-center">
                                <h3 className="font-bold text-sm mb-2">{t('products.tshirt')}</h3>
                                <Button className="w-full bg-white text-black hover:bg-yellow-500 hover:text-black text-xs font-bold" onClick={() => window.open('https://buy.stripe.com/7sY28qfDs9vh2m395g3wQ11', '_blank')}>
                                    {t('buy')}
                                </Button>
                            </div>
                        </div>

                        {/* Product 5: Gorra */}
                        <div className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <div className="aspect-square bg-zinc-900 flex items-center justify-center relative cursor-zoom-in">
                                        <img src="/product-cap.jpg" alt="Gorra Oficial" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                                            <span className="text-yellow-400 font-bold text-lg">{t('view_details')}</span>
                                        </div>
                                    </div>
                                </DialogTrigger>
                                <DialogContent className="bg-zinc-950 border-zinc-800 max-w-md">
                                    <DialogTitle className="text-white">{t('products.cap')}</DialogTitle>
                                    <img src="/product-cap.jpg" alt="Gorra Zoom" className="w-full rounded-lg" />
                                    <DialogDescription className="text-yellow-500 font-bold text-center">
                                        $30.00 <br />
                                        <span className="text-zinc-400 font-normal text-xs">* {t('adjustable')}</span>
                                    </DialogDescription>
                                </DialogContent>
                            </Dialog>
                            <div className="p-4 text-center">
                                <h3 className="font-bold text-sm mb-2">Gorra Oficial</h3>
                                <Button className="w-full bg-white text-black hover:bg-yellow-500 hover:text-black text-xs font-bold" onClick={() => window.open('https://buy.stripe.com/14A7sKaj86j57GnepA3wQ0X', '_blank')}>
                                    {t('buy')}
                                </Button>
                            </div>
                        </div>

                        {/* Amazon Picks - Full Width on Mobile, Col span 2 on Desktop if needed, or just regular card */}
                        <div className="col-span-2 md:col-span-3 lg:col-span-5 bg-gradient-to-r from-yellow-500/20 to-purple-500/20 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                            <h3 className="text-2xl font-black text-white relative z-10 mb-2">{t('amazon_picks.title')}</h3>
                            <p className="text-yellow-100 relative z-10 mb-6 max-w-sm">{t('amazon_picks.desc')}</p>
                            <Button
                                asChild
                                className="relative z-10 rounded-full bg-black text-white hover:bg-zinc-900 border border-yellow-500/50"
                            >
                                <a href="https://amzn.to/4bFtbUt" target="_blank" rel="noopener noreferrer">
                                    {t('amazon_picks.btn')} <ExternalLink className="ml-2 w-4 h-4" />
                                </a>
                            </Button>
                        </div>
                    </div>

                    {/* Promo Banner */}
                    <div className="rounded-3xl bg-zinc-900 border border-white/10 p-8 md:p-12 relative overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
                        <div className="relative z-10">
                            <span className="text-yellow-500 font-bold tracking-widest text-sm mb-2 block">ESPACIO PUBLICITARIO</span>
                            <h3 className="text-3xl font-bold text-white mb-2">Tu Marca Aquí</h3>
                            <p className="text-gray-400 max-w-md">Llega a miles de oyentes en Chicago y todo el mundo. Anúnciate en Radio Unica.</p>
                        </div>
                        <Button size="lg" className="relative z-10 rounded-full bg-white text-black hover:bg-gray-200 font-bold px-8">
                            Contactar Ventas
                        </Button>
                    </div>
                </div>
            </section>

            {/* Social / Connect */}
            <section id="contacto" className="py-24 bg-gradient-to-b from-black to-zinc-900 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-600/10 rounded-full blur-[100px]" />

                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <Mic className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Tu Voz en Radio Unica</h2>
                    <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
                        Envíanos tus saludos, pide tu canción favorita o simplemente cuéntanos tu historia. Queremos escucharte.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto mb-12">
                        <Button
                            asChild
                            className="h-14 bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-lg rounded-xl"
                        >
                            <a href="https://wa.me/18475029685" target="_blank" rel="noopener noreferrer">
                                Whatsapp
                            </a>
                        </Button>
                        <Button
                            asChild
                            className="h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-xl"
                        >
                            <a href="https://www.speakpipe.com/RadioUnica" target="_blank" rel="noopener noreferrer">
                                SpeakPipe (Voz)
                            </a>
                        </Button>
                    </div>

                    {/* Song Request Form */}
                    <div className="max-w-md mx-auto bg-white/5 border border-white/10 rounded-2xl p-8 mb-16 text-left">
                        <h3 className="text-2xl font-bold mb-6 text-center">Pide tu Canción</h3>
                        <form action="https://formspree.io/f/mojjjzdk" method="POST" className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Tu Nombre</label>
                                <input type="text" name="name" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:border-yellow-500 focus:outline-none transition-colors" placeholder="Ej. Juan Pérez" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Canción / Artista</label>
                                <input type="text" name="song" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:border-yellow-500 focus:outline-none transition-colors" placeholder="Ej. La Incondicional - Luis Miguel" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Dedicatoria (Opcional)</label>
                                <textarea name="message" rows={3} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:border-yellow-500 focus:outline-none transition-colors" placeholder="Un saludo para..." />
                            </div>
                            <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold h-12 rounded-lg text-lg">
                                Enviar Petición
                            </Button>
                        </form>
                    </div>

                    <div className="flex flex-col items-center gap-6">
                        <div className="flex justify-center gap-6">
                            {[Instagram, Facebook, Twitter].map((Icon, idx) => (
                                <a key={idx} href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-yellow-500 hover:border-yellow-500 hover:text-black transition-all">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                        <div className="mt-8 text-gray-400">
                            <h4 className="text-xl font-bold mb-2 text-white">CONTACTO</h4>
                            <p className="mb-1">Chicago, IL</p>
                            <p className="text-yellow-500">RadioUnicaUS@gmail.com</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Persistent Player (Bottom Bar) */}
            <div className="fixed bottom-0 w-full bg-black/90 backdrop-blur-xl border-t border-white/10 px-4 py-3 z-50">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded bg-yellow-500 flex items-center justify-center ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }}>
                            <Music className="text-black" />
                        </div>
                        <div className="hidden sm:block">
                            <p className="text-sm font-bold text-white">Radio Unica Online</p>
                            <p className="text-xs text-gray-400">En Vivo - Chicago</p>
                        </div>
                    </div>

                    <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-6">
                        <button className="text-gray-400 hover:text-white transition-colors">
                            <span className="sr-only">Previous</span>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" /></svg>
                        </button>
                        <button
                            className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform"
                            onClick={togglePlay}
                        >
                            {isPlaying ? <Pause className="fill-current w-5 h-5" /> : <Play className="fill-current w-5 h-5 ml-1" />}
                        </button>
                        <button className="text-gray-400 hover:text-white transition-colors">
                            <span className="sr-only">Next</span>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" /></svg>
                        </button>
                    </div>

                    <div className="hidden md:flex items-center gap-3 w-32">
                        <Volume2 className="text-gray-400 w-4 h-4" />
                        <div className="h-1 flex-1 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-yellow-500" style={{ width: `${volume}%` }} />
                        </div>
                    </div>
                </div>
            </div>

            <audio ref={audioRef} src={STREAM_URL} preload="none" />
        </div>
    );
}

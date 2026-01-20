'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, Music, Radio } from 'lucide-react';

const STREAM_URL = "https://streaming.live365.com/a23237";

interface PlayerProps {
    isMobile?: boolean;
}

export default function GlobalAudioPlayer({ isMobile = false }: PlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(80);
    const [isVisible, setIsVisible] = useState(false);
    const [showVolume, setShowVolume] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume / 100;
        }
    }, [volume]);

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

    if (!isVisible) return <div className={`${isMobile ? 'w-10 h-10' : 'w-[240px] h-11'}`} />;

    if (isMobile) {
        return (
            <div className="flex items-center gap-2">
                <button
                    onClick={togglePlay}
                    className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all ${isPlaying ? 'bg-stone-900 text-white' : 'bg-primary text-white'} border-2 border-white`}
                >
                    {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
                </button>
                <audio ref={audioRef} src={STREAM_URL} preload="none" />
            </div>
        );
    }

    return (
        <div className="flex items-center">
            <div className="flex items-center bg-white border border-stone-200 rounded-lg h-11 px-3 shadow-sm hover:border-primary/30 transition-all group w-[240px]">
                <div className="flex items-center gap-3 w-full">
                    {/* Status Icon */}
                    <div className="relative flex items-center justify-center flex-shrink-0">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isPlaying ? 'bg-primary/5 text-primary' : 'bg-stone-50 text-stone-400'}`}>
                            {isPlaying ? (
                                <div className="flex gap-0.5 items-end h-3">
                                    {[1, 2, 3].map(i => (
                                        <motion.div
                                            key={i}
                                            animate={{ height: [2, 8, 4, 6] }}
                                            transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }}
                                            className="w-0.5 bg-primary rounded-full"
                                        />
                                    ))}
                                </div>
                            ) : (
                                <Radio size={16} />
                            )}
                        </div>
                    </div>

                    {/* Text Info */}
                    <div className="flex flex-col min-w-0 flex-1">
                        <span className="text-[10px] font-bold text-stone-900 uppercase tracking-tighter leading-none truncate">Radio Unica</span>
                        <span className="text-[9px] text-primary font-medium leading-tight truncate">
                            {isPlaying ? 'En Vivo' : 'Música con alma'}
                        </span>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-1 border-l border-stone-100 pl-2 ml-1 flex-shrink-0">
                        {/* Volume Toggle */}
                        <div className="relative flex items-center justify-center h-8"
                            onMouseEnter={() => setShowVolume(true)}
                            onMouseLeave={() => setShowVolume(false)}
                        >
                            <button className="p-1.5 text-stone-400 hover:text-primary transition-colors">
                                <Volume2 size={14} />
                            </button>
                            <AnimatePresence>
                                {showVolume && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                        className="absolute bottom-full mb-2 right-0 bg-white border border-stone-200 p-3 rounded-lg shadow-xl z-20"
                                    >
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={volume}
                                            onChange={(e) => setVolume(parseInt(e.target.value))}
                                            className="w-24 h-1 bg-stone-100 rounded-full appearance-none cursor-pointer accent-primary"
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Play Toggle */}
                        <button
                            onClick={togglePlay}
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isPlaying ? 'bg-stone-900 text-white' : 'bg-primary text-white hover:bg-primary-dark'} shadow-md`}
                        >
                            {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" className="ml-0.5" />}
                        </button>
                    </div>
                </div>
            </div>
            <audio ref={audioRef} src={STREAM_URL} preload="none" />
        </div>
    );
}

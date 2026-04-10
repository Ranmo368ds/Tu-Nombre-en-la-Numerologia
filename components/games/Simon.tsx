'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';

// ─── Types & Constants ────────────────────────────────────────────────────────
type Color = 'green' | 'red' | 'yellow' | 'blue';
type Phase = 'idle' | 'showing' | 'waiting' | 'wrong' | 'success' | 'gameover';

const COLORS: Color[] = ['green', 'red', 'yellow', 'blue'];

// Classic Simon frequencies
const TONES: Record<Color, number> = {
    green:  329.6,  // E4
    red:    220.0,  // A3
    yellow: 277.2,  // C#4
    blue:   207.7,  // G#3
};

const DIM: Record<Color, string> = {
    green:  '#0d3318',
    red:    '#3a0f0f',
    yellow: '#3a3a0f',
    blue:   '#0f1a3a',
};

const BRIGHT: Record<Color, string> = {
    green:  '#00FF66',
    red:    '#FF3333',
    yellow: '#FFEE00',
    blue:   '#33AAFF',
};

const GLOW: Record<Color, string> = {
    green:  '0 0 40px #00FF66, 0 0 80px rgba(0,255,102,0.4)',
    red:    '0 0 40px #FF3333, 0 0 80px rgba(255,51,51,0.4)',
    yellow: '0 0 40px #FFEE00, 0 0 80px rgba(255,238,0,0.4)',
    blue:   '0 0 40px #33AAFF, 0 0 80px rgba(51,170,255,0.4)',
};

const HS_KEY = 'simon-high';

// ─── Simon Component ─────────────────────────────────────────────────────────
export default function Simon() {
    const [sequence, setSequence]       = useState<Color[]>([]);
    const [playerSeq, setPlayerSeq]     = useState<Color[]>([]);
    const [phase, setPhase]             = useState<Phase>('idle');
    const [activeColor, setActiveColor] = useState<Color | null>(null);
    const [score, setScore]             = useState(0);
    const [highScore, setHighScore]     = useState(0);
    const [strict, setStrict]           = useState(false);
    const [showLead, setShowLead]       = useState(false);
    const [email, setEmail]             = useState('');
    const [submitting, setSubmitting]   = useState(false);
    const [statusMsg, setStatusMsg]     = useState('');

    const audioCtxRef = useRef<AudioContext | null>(null);
    const timersRef   = useRef<ReturnType<typeof setTimeout>[]>([]);

    // ── Load high score ──────────────────────────────────────────────────
    useEffect(() => {
        const saved = localStorage.getItem(HS_KEY);
        if (saved) setHighScore(parseInt(saved));
    }, []);

    // ── Audio ────────────────────────────────────────────────────────────
    const getCtx = useCallback((): AudioContext | null => {
        try {
            if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
                audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
            }
            return audioCtxRef.current;
        } catch { return null; }
    }, []);

    const playTone = useCallback((color: Color, duration = 0.5) => {
        const ctx = getCtx();
        if (!ctx) return;
        const osc  = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = TONES[color];
        osc.type = 'sine';
        gain.gain.setValueAtTime(0.4, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + duration);
    }, [getCtx]);

    const playBuzzer = useCallback(() => {
        const ctx = getCtx();
        if (!ctx) return;
        const osc  = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = 90;
        osc.type = 'sawtooth';
        gain.gain.setValueAtTime(0.5, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.0);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 1.0);
    }, [getCtx]);

    // ── Timer helpers ────────────────────────────────────────────────────
    const addTimer = (fn: () => void, ms: number) => {
        const t = setTimeout(fn, ms);
        timersRef.current.push(t);
        return t;
    };

    const clearAllTimers = () => {
        timersRef.current.forEach(clearTimeout);
        timersRef.current = [];
    };

    useEffect(() => () => clearAllTimers(), []);

    // ── Flash one button ─────────────────────────────────────────────────
    const flash = useCallback((color: Color, duration: number): Promise<void> => {
        return new Promise(resolve => {
            setActiveColor(color);
            playTone(color, duration / 1000);
            addTimer(() => {
                setActiveColor(null);
                resolve();
            }, duration);
        });
    }, [playTone]);

    // ── Play the full sequence ───────────────────────────────────────────
    const playSequence = useCallback(async (seq: Color[]) => {
        setPhase('showing');
        setPlayerSeq([]);
        setStatusMsg('Watch carefully…');

        const lvl = seq.length;
        const flashMs = lvl > 12 ? 300 : lvl > 7 ? 400 : 550;
        const gapMs   = lvl > 12 ? 100 : lvl > 7 ? 130 : 200;

        // Pre-show pause
        await new Promise<void>(res => addTimer(res, 700));

        for (const color of seq) {
            await flash(color, flashMs);
            await new Promise<void>(res => addTimer(res, gapMs));
        }

        setPhase('waiting');
        setStatusMsg('Your turn!');
    }, [flash]);

    // ── Start game ───────────────────────────────────────────────────────
    const startGame = useCallback(() => {
        clearAllTimers();
        setScore(0);
        setPlayerSeq([]);
        setShowLead(false);
        const seq: Color[] = [COLORS[Math.floor(Math.random() * 4)]];
        setSequence(seq);
        playSequence(seq);
    }, [playSequence]);

    // ── Player button press ──────────────────────────────────────────────
    const handlePress = useCallback((color: Color) => {
        if (phase !== 'waiting') return;

        playTone(color, 0.28);
        setActiveColor(color);
        addTimer(() => setActiveColor(null), 220);

        const next = [...playerSeq, color];
        setPlayerSeq(next);
        const idx = next.length - 1;

        if (next[idx] !== sequence[idx]) {
            // ─ WRONG ─
            playBuzzer();
            setActiveColor(null);
            setPhase('wrong');
            setStatusMsg('❌ Wrong!');

            if (strict) {
                addTimer(() => {
                    setPhase('gameover');
                    setShowLead(true);
                }, 1200);
            } else {
                // Replay same sequence
                addTimer(() => playSequence(sequence), 1800);
            }
            return;
        }

        if (next.length === sequence.length) {
            // ─ SEQUENCE COMPLETE ─
            const newScore = sequence.length;
            setScore(newScore);
            if (newScore > highScore) {
                setHighScore(newScore);
                localStorage.setItem(HS_KEY, newScore.toString());
            }
            setPhase('success');
            setStatusMsg('✓ Nice!');

            const addColor = COLORS[Math.floor(Math.random() * 4)];
            const newSeq = [...sequence, addColor];
            setSequence(newSeq);
            addTimer(() => playSequence(newSeq), 900);
        }
    }, [phase, playerSeq, sequence, strict, highScore, playTone, playBuzzer, playSequence]);

    // ── Lead submit ──────────────────────────────────────────────────────
    const submitLead = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await fetch('/api/lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, score, level: score, game: 'simon', source: 'Simon Game' }),
            });
            setShowLead(false);
            setPhase('idle');
        } catch { /* silent */ } finally {
            setSubmitting(false);
        }
    };

    // ── Derived ──────────────────────────────────────────────────────────
    const canPress = phase === 'waiting';
    const isShowing = phase === 'showing';

    // Status color for center display
    const centerColor = phase === 'wrong' ? '#FF3333' : phase === 'success' ? '#00FF66' : '#FFFFFF';

    // ── Render ───────────────────────────────────────────────────────────
    return (
        <div className="flex flex-col items-center bg-black w-full max-w-md mx-auto select-none touch-none overflow-hidden shadow-2xl rounded-3xl border-4 border-gray-900">

            {/* ── Top HUD ── */}
            <div className="w-full px-6 pt-5 pb-3 flex justify-between items-start">
                <div className="flex flex-col">
                    <span className="text-gray-600 text-[9px] uppercase tracking-widest">Score</span>
                    <span className="text-white font-black text-3xl leading-none tabular-nums">{score.toString().padStart(2, '0')}</span>
                </div>

                <div className="flex flex-col items-center">
                    <h1 className="text-white font-black text-xl tracking-[0.3em] uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">SIMON</h1>
                    <div className="flex gap-1.5 mt-1">
                        {Array.from({ length: Math.min(score, 12) }).map((_, i) => (
                            <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: BRIGHT[COLORS[i % 4]] }} />
                        ))}
                        {score > 12 && <span className="text-gray-500 text-[9px]">+{score - 12}</span>}
                    </div>
                </div>

                <div className="flex flex-col items-end">
                    <span className="text-gray-600 text-[9px] uppercase tracking-widest">Best</span>
                    <span className="text-yellow-400 font-black text-3xl leading-none tabular-nums">{highScore.toString().padStart(2, '0')}</span>
                </div>
            </div>

            {/* ── Status message ── */}
            <div className="h-7 flex items-center justify-center mb-2">
                {statusMsg && (
                    <span className="text-[12px] font-bold uppercase tracking-[0.2em]" style={{ color: centerColor }}>
                        {statusMsg}
                    </span>
                )}
            </div>

            {/* ══════════════════════ GAME BOARD ══════════════════════ */}
            <div className="relative px-6 w-full">
                <div className="relative mx-auto" style={{ width: '100%', maxWidth: 360, aspectRatio: '1/1' }}>
                    {/* Outer ring glow */}
                    <div className="absolute inset-0 rounded-full"
                        style={{ background: 'radial-gradient(circle, #1a1a2e 0%, #0a0a0a 70%)', boxShadow: '0 0 60px rgba(0,0,0,0.9), inset 0 0 40px rgba(0,0,0,0.6)' }} />

                    {/* 4 Quadrant buttons inside circular clip */}
                    <div className="absolute inset-3 rounded-full overflow-hidden"
                        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: 0 }}>

                        {/* GREEN – top left */}
                        <button
                            onPointerDown={() => handlePress('green')}
                            disabled={!canPress}
                            style={{
                                background: activeColor === 'green' ? BRIGHT.green : DIM.green,
                                borderRadius: '100% 0 0 0',
                                border: 'none',
                                cursor: canPress ? 'pointer' : 'default',
                                boxShadow: activeColor === 'green' ? GLOW.green : 'none',
                                transition: 'background 0.08s, box-shadow 0.08s',
                                touchAction: 'none',
                            }}
                        />

                        {/* RED – top right */}
                        <button
                            onPointerDown={() => handlePress('red')}
                            disabled={!canPress}
                            style={{
                                background: activeColor === 'red' ? BRIGHT.red : DIM.red,
                                borderRadius: '0 100% 0 0',
                                border: 'none',
                                cursor: canPress ? 'pointer' : 'default',
                                boxShadow: activeColor === 'red' ? GLOW.red : 'none',
                                transition: 'background 0.08s, box-shadow 0.08s',
                                touchAction: 'none',
                            }}
                        />

                        {/* BLUE – bottom left */}
                        <button
                            onPointerDown={() => handlePress('blue')}
                            disabled={!canPress}
                            style={{
                                background: activeColor === 'blue' ? BRIGHT.blue : DIM.blue,
                                borderRadius: '0 0 0 100%',
                                border: 'none',
                                cursor: canPress ? 'pointer' : 'default',
                                boxShadow: activeColor === 'blue' ? GLOW.blue : 'none',
                                transition: 'background 0.08s, box-shadow 0.08s',
                                touchAction: 'none',
                            }}
                        />

                        {/* YELLOW – bottom right */}
                        <button
                            onPointerDown={() => handlePress('yellow')}
                            disabled={!canPress}
                            style={{
                                background: activeColor === 'yellow' ? BRIGHT.yellow : DIM.yellow,
                                borderRadius: '0 0 100% 0',
                                border: 'none',
                                cursor: canPress ? 'pointer' : 'default',
                                boxShadow: activeColor === 'yellow' ? GLOW.yellow : 'none',
                                transition: 'background 0.08s, box-shadow 0.08s',
                                touchAction: 'none',
                            }}
                        />
                    </div>

                    {/* ── Center circle ── */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center z-20"
                        style={{
                            width: '34%', height: '34%',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, #1a1a1a 0%, #0a0a0a 100%)',
                            boxShadow: '0 0 0 5px #1c1c1c, 0 0 0 7px #0a0a0a, 0 0 30px rgba(0,0,0,0.9)',
                        }}>

                        {/* Idle/GameOver: show START button */}
                        {(phase === 'idle' || phase === 'gameover') && (
                            <button
                                onClick={startGame}
                                className="w-full h-full rounded-full flex flex-col items-center justify-center transition-all active:scale-95"
                                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                            >
                                <span className="text-white font-black text-[11px] uppercase tracking-widest">
                                    {phase === 'gameover' ? '↺ Again' : '▶ Start'}
                                </span>
                            </button>
                        )}

                        {/* Playing states */}
                        {phase !== 'idle' && phase !== 'gameover' && (
                            <div className="flex flex-col items-center">
                                {isShowing ? (
                                    <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: '#888' }} />
                                ) : (
                                    <span className="font-black text-xl" style={{ color: centerColor, lineHeight: 1 }}>
                                        {score}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Controls row ── */}
            <div className="w-full px-6 pt-5 pb-2 flex items-center justify-between">
                {/* Strict mode toggle */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setStrict(s => !s)}
                        className="relative w-11 h-6 rounded-full transition-all"
                        style={{ background: strict ? '#FF3333' : '#333' }}
                    >
                        <div className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-all"
                            style={{ left: strict ? '1.375rem' : '0.125rem' }} />
                    </button>
                    <span className="text-[11px] font-bold uppercase tracking-wider"
                        style={{ color: strict ? '#FF3333' : '#555' }}>
                        Strict
                    </span>
                </div>

                <div className="flex flex-col items-center">
                    <span className="text-gray-700 text-[9px] uppercase tracking-widest">Level</span>
                    <span className="text-gray-400 font-bold text-sm">{score + 1}</span>
                </div>

                {/* Start/Restart button */}
                {(phase === 'waiting' || phase === 'showing' || phase === 'wrong' || phase === 'success') && (
                    <button onClick={() => { clearAllTimers(); setPhase('gameover'); setTimeout(() => setShowLead(true), 100); }}
                        className="text-gray-700 text-[10px] uppercase tracking-wider hover:text-red-500 transition-colors">
                        Quit
                    </button>
                )}
                {phase === 'idle' && (
                    <button onClick={startGame}
                        className="px-4 py-1.5 rounded-full border border-gray-700 text-gray-400 text-[11px] font-bold uppercase tracking-widest hover:border-white hover:text-white transition-all">
                        Start
                    </button>
                )}
            </div>

            {/* ── Color labels ── */}
            <div className="w-full px-6 pb-5 grid grid-cols-2 gap-x-4 gap-y-1 text-[10px] font-bold uppercase tracking-widest">
                <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ background: BRIGHT.green }} />
                    <span style={{ color: DIM.green.replace('0d3', '#2a6') }}>Green</span>
                </div>
                <div className="flex items-center gap-1.5 justify-end flex-row-reverse">
                    <div className="w-2 h-2 rounded-full" style={{ background: BRIGHT.red }} />
                    <span style={{ color: '#8B3030' }}>Red</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ background: BRIGHT.blue }} />
                    <span style={{ color: '#2a4a8B' }}>Blue</span>
                </div>
                <div className="flex items-center gap-1.5 justify-end flex-row-reverse">
                    <div className="w-2 h-2 rounded-full" style={{ background: BRIGHT.yellow }} />
                    <span style={{ color: '#8B8B30' }}>Yellow</span>
                </div>
            </div>

            {/* ══════════ GAME OVER OVERLAY ══════════ */}
            {phase === 'gameover' && showLead && (
                <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md z-50 p-6">
                    {/* Dim glow circles */}
                    <div className="flex gap-3 mb-4">
                        {COLORS.map(c => (
                            <div key={c} className="w-10 h-10 rounded-full opacity-60"
                                style={{ background: BRIGHT[c], boxShadow: `0 0 15px ${BRIGHT[c]}` }} />
                        ))}
                    </div>

                    <h2 className="text-5xl font-black text-white mb-1 tracking-tight">GAME OVER</h2>

                    <div className="flex gap-8 my-5">
                        <div className="text-center">
                            <div className="text-gray-500 text-[9px] uppercase tracking-widest">Your Score</div>
                            <div className="text-white text-3xl font-black">{score}</div>
                        </div>
                        <div className="w-px bg-gray-800" />
                        <div className="text-center">
                            <div className="text-gray-500 text-[9px] uppercase tracking-widest">Best</div>
                            <div className="text-yellow-400 text-3xl font-black">{highScore}</div>
                        </div>
                    </div>

                    <p className="text-gray-400 text-sm mb-5 text-center leading-relaxed">
                        Save your score & get <span className="text-cyan-400 font-bold">exclusive deals</span>!
                    </p>

                    <form onSubmit={submitLead} className="w-full max-w-xs space-y-3">
                        <input type="email" required placeholder="your@email.com" value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-xl text-white focus:outline-none focus:border-cyan-500 transition-colors text-sm" />
                        <button type="submit" disabled={submitting}
                            className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-700 text-white rounded-xl font-bold uppercase tracking-widest text-sm transition-all active:scale-95 flex items-center justify-center gap-2">
                            {submitting
                                ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</>
                                : 'Save Score'}
                        </button>
                        <button type="button" onClick={() => { setShowLead(false); setPhase('idle'); }}
                            className="w-full py-2 text-gray-600 text-[10px] uppercase tracking-tight hover:text-white transition-colors">
                            Skip
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

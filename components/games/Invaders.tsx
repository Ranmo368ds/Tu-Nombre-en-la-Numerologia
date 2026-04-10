'use client';
import React, { useEffect, useRef, useState, useCallback } from 'react';

// ─── Constants ────────────────────────────────────────────────────────────────
const W = 480, H = 700, MARGIN = 14;
const COLS = 11, ROWS = 5, SLOT_W = 40, SLOT_H = 36;
const SC = 3; // sprite scale
const SPR_W = 8 * SC, SPR_H = 6 * SC; // 24×18
const GRID_X = (W - (COLS - 1) * SLOT_W) / 2;
const GRID_Y = 100;
const PLR_Y = 630, PLR_SPD = 5;
const PLR_W = 44, PLR_H = 20;
const SCELL = 4, SH_COLS = 16, SH_ROWS = 10;
const SH_W = SH_COLS * SCELL, SH_H = SH_ROWS * SCELL, SH_Y = 516;
const SH_XS = [60, 160, 260, 360];
const ROW_TYPE = [0, 1, 1, 2, 2];
const ROW_PTS  = [30, 20, 20, 10, 10];
const ALN_CLR  = ['#FF44CC', '#00DDFF', '#AAFF44'];

// ─── Pixel sprites 8×6 ───────────────────────────────────────────────────────
const SPR: Record<string, number[][]> = {
    sqA:[[0,0,0,1,1,0,0,0],[0,1,1,1,1,1,1,0],[1,1,0,1,1,0,1,1],[1,1,1,1,1,1,1,1],[0,1,1,1,1,1,1,0],[0,0,1,0,0,1,0,0]],
    sqB:[[0,0,0,1,1,0,0,0],[0,1,1,1,1,1,1,0],[1,1,0,1,1,0,1,1],[1,1,1,1,1,1,1,1],[0,0,1,1,1,1,0,0],[0,1,0,0,0,0,1,0]],
    crA:[[0,1,0,0,0,0,1,0],[0,0,1,0,0,1,0,0],[0,1,1,1,1,1,1,0],[1,1,0,1,1,0,1,1],[1,1,1,1,1,1,1,1],[1,0,1,0,0,1,0,1]],
    crB:[[0,1,0,0,0,0,1,0],[1,0,1,0,0,1,0,1],[1,1,1,1,1,1,1,1],[1,1,0,1,1,0,1,1],[0,1,1,1,1,1,1,0],[0,1,0,0,0,0,1,0]],
    ocA:[[0,0,1,1,1,1,0,0],[0,1,1,1,1,1,1,0],[1,1,0,1,1,0,1,1],[1,1,1,1,1,1,1,1],[0,1,1,1,1,1,1,0],[1,0,0,0,0,0,0,1]],
    ocB:[[0,0,1,1,1,1,0,0],[1,1,1,1,1,1,1,1],[1,1,0,1,1,0,1,1],[1,1,1,1,1,1,1,1],[1,0,1,1,1,1,0,1],[0,0,1,0,0,1,0,0]],
};
const SPRITE_KEYS = [['sqA','sqB'],['crA','crB'],['crA','crB'],['ocA','ocB'],['ocA','ocB']];

// ─── Shield template ─────────────────────────────────────────────────────────
const SH_TPL = [
    [0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1],
    [1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1],
    [1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function drawSprite(ctx: CanvasRenderingContext2D, spr: number[][], x: number, y: number, color: string) {
    ctx.fillStyle = color;
    spr.forEach((row, r) => row.forEach((px, c) => { if (px) ctx.fillRect(x + c * SC, y + r * SC, SC, SC); }));
}

type Phase = 'START' | 'PLAY' | 'DEAD' | 'LEVELUP' | 'GAMEOVER';

// ─── Component ───────────────────────────────────────────────────────────────
export default function Invaders() {
    const canvasRef   = useRef<HTMLCanvasElement>(null);
    const rafRef      = useRef(0);
    const frameRef    = useRef(0);

    // Game state refs
    const aliensRef   = useRef<{alive:boolean;frame:number}[][]>([]);
    const gxRef       = useRef(0);  // group x offset
    const gyRef       = useRef(0);  // group y offset
    const dxRef       = useRef(1);
    const stepTRef    = useRef(0);
    const animFRef    = useRef(0);
    const plrXRef     = useRef(W / 2);
    const plrBltRef   = useRef<{x:number;y:number}|null>(null);
    const alnBltsRef  = useRef<{x:number;y:number}[]>([]);
    const shieldsRef  = useRef<boolean[][][]>([]);
    const ufoRef      = useRef({active:false,x:0,dir:1 as 1|-1,pts:0});
    const livesRef    = useRef(3);
    const scoreRef    = useRef(0);
    const levelRef    = useRef(1);
    const phaseRef    = useRef<Phase>('START');
    const hiRef       = useRef(0);
    const deadTRef    = useRef(0); // frames in dead state
    const keysRef     = useRef({left:false,right:false});
    const lastFireRef = useRef(0);
    const explRef     = useRef<{x:number;y:number;t:number}[]>([]);

    const [uiPhase, setUiPhase] = useState<Phase>('START');
    const [uiScore, setUiScore] = useState(0);
    const [uiLives, setUiLives] = useState(3);
    const [uiHigh,  setUiHigh]  = useState(0);
    const [uiLevel, setUiLevel] = useState(1);
    const [showLead, setShowLead] = useState(false);
    const [email, setEmail]     = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const s = localStorage.getItem('invaders-hi');
        if (s) { hiRef.current = parseInt(s); setUiHigh(parseInt(s)); }
    }, []);

    // ── Audio ──
    const audioRef = useRef<AudioContext|null>(null);
    const beep = useCallback((freq: number, dur: number, type: OscillatorType = 'square', vol = 0.12) => {
        try {
            if (!audioRef.current) audioRef.current = new (window.AudioContext || (window as unknown as {webkitAudioContext: typeof AudioContext}).webkitAudioContext)();
            const ctx = audioRef.current;
            const o = ctx.createOscillator(), g = ctx.createGain();
            o.connect(g); g.connect(ctx.destination);
            o.frequency.value = freq; o.type = type;
            g.gain.setValueAtTime(vol, ctx.currentTime);
            g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
            o.start(); o.stop(ctx.currentTime + dur);
        } catch { /* silent */ }
    }, []);

    // ── Helpers ──
    const countAlive = () => aliensRef.current.flat().filter(a => a.alive).length;

    const getStepFrames = (lvl: number) => {
        const total = aliensRef.current.flat().filter(a => a.alive).length;
        const base = Math.max(3, Math.round(40 * total / (ROWS * COLS)));
        return Math.max(3, Math.round(base * Math.pow(0.82, lvl - 1)));
    };

    const newShields = (): boolean[][][] =>
        SH_XS.map(() => SH_TPL.map(row => row.map(v => v === 1)));

    const newAliens = (): {alive:boolean;frame:number}[][] =>
        Array.from({length:ROWS}, () => Array.from({length:COLS}, () => ({alive:true, frame:0})));

    const shieldHit = (bx: number, by: number) => {
        for (let s = 0; s < 4; s++) {
            const sx = SH_XS[s];
            if (bx >= sx && bx < sx+SH_W && by >= SH_Y && by < SH_Y+SH_H) {
                const col = Math.floor((bx-sx)/SCELL), row = Math.floor((by-SH_Y)/SCELL);
                if (row>=0&&row<SH_ROWS&&col>=0&&col<SH_COLS&&shieldsRef.current[s][row][col]) {
                    for (let dr=-1;dr<=1;dr++) for (let dc=-1;dc<=1;dc++) {
                        const nr=row+dr,nc=col+dc;
                        if (nr>=0&&nr<SH_ROWS&&nc>=0&&nc<SH_COLS) shieldsRef.current[s][nr][nc]=false;
                    }
                    return true;
                }
            }
        }
        return false;
    };

    const addScore = useCallback((pts: number) => {
        scoreRef.current += pts;
        setUiScore(scoreRef.current);
        if (scoreRef.current > hiRef.current) {
            hiRef.current = scoreRef.current;
            localStorage.setItem('invaders-hi', scoreRef.current.toString());
            setUiHigh(scoreRef.current);
        }
    }, []);

    // ── Start level ──
    const startLevel = useCallback((lvl: number, keepShields = false) => {
        aliensRef.current = newAliens();
        gxRef.current = 0; gyRef.current = 0; dxRef.current = 1;
        stepTRef.current = getStepFrames(lvl);
        animFRef.current = 0;
        plrBltRef.current = null;
        alnBltsRef.current = [];
        explRef.current = [];
        ufoRef.current = {active:false, x:0, dir:1, pts:0};
        if (!keepShields) shieldsRef.current = newShields();
        phaseRef.current = 'PLAY';
        setUiPhase('PLAY');
        setUiLevel(lvl);
    }, []); // eslint-disable-line

    const startGame = useCallback(() => {
        livesRef.current = 3; scoreRef.current = 0; levelRef.current = 1;
        plrXRef.current = W/2;
        setUiScore(0); setUiLives(3); setShowLead(false);
        startLevel(1);
    }, [startLevel]);

    // ── Fire ──
    const playerFire = useCallback(() => {
        if (phaseRef.current !== 'PLAY' || plrBltRef.current) return;
        const now = Date.now();
        if (now - lastFireRef.current < 300) return;
        lastFireRef.current = now;
        plrBltRef.current = {x: plrXRef.current, y: PLR_Y - PLR_H};
        beep(900, 0.08, 'square');
    }, [beep]);

    // ── Main game loop ──
    const loop = useCallback(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!ctx) return;
        frameRef.current++;
        const f = frameRef.current;
        const ph = phaseRef.current;

        // Player movement
        if (ph === 'PLAY') {
            if (keysRef.current.left)  plrXRef.current = Math.max(MARGIN+PLR_W/2, plrXRef.current - PLR_SPD);
            if (keysRef.current.right) plrXRef.current = Math.min(W-MARGIN-PLR_W/2, plrXRef.current + PLR_SPD);
        }

        if (ph === 'PLAY') {
            const aliens = aliensRef.current;

            // ── UFO ──
            const ufo = ufoRef.current;
            if (!ufo.active && f % 480 === 0 && Math.random() > 0.35) {
                ufo.active = true; ufo.dir = Math.random() > 0.5 ? 1 : -1;
                ufo.x = ufo.dir > 0 ? -40 : W + 40;
                ufo.pts = [50,100,150,200,250,300][Math.floor(Math.random()*6)];
            }
            if (ufo.active) {
                ufo.x += ufo.dir * 2;
                if (ufo.x > W+60 || ufo.x < -60) ufo.active = false;
                if (f % 28 === 0) beep(340 + Math.random()*80, 0.07, 'square', 0.07);
            }

            // ── Alien step ──
            stepTRef.current--;
            if (stepTRef.current <= 0) {
                animFRef.current = animFRef.current === 0 ? 1 : 0;
                aliens.forEach(row => row.forEach(a => { if (a.alive) a.frame = animFRef.current; }));

                let lCol = COLS, rCol = -1, bRow = -1;
                for (let r=0;r<ROWS;r++) for (let c=0;c<COLS;c++) if (aliens[r][c].alive) {
                    lCol = Math.min(lCol, c); rCol = Math.max(rCol, c); bRow = Math.max(bRow, r);
                }
                if (rCol >= 0) {
                    const lEdge = GRID_X + lCol*SLOT_W + gxRef.current - SPR_W/2;
                    const rEdge = GRID_X + rCol*SLOT_W + gxRef.current + SPR_W/2;
                    const overflow = (dxRef.current>0 && rEdge+8 > W-MARGIN) || (dxRef.current<0 && lEdge-8 < MARGIN);
                    if (overflow) { dxRef.current *= -1; gyRef.current += 18; beep(55, 0.18, 'sawtooth'); }
                    else { gxRef.current += dxRef.current * 8; beep(100 + animFRef.current*30, 0.06, 'square', 0.08); }

                    // Aliens reach player zone
                    const bY = GRID_Y + bRow*SLOT_H + gyRef.current + SPR_H/2;
                    if (bY >= SH_Y) { phaseRef.current='GAMEOVER'; setUiPhase('GAMEOVER'); setTimeout(()=>setShowLead(true),1500); }
                }
                stepTRef.current = getStepFrames(levelRef.current);
            }

            // ── Alien fire ──
            if (f % Math.max(25, 55 - levelRef.current*5) === 0) {
                const alive: {r:number;c:number}[] = [];
                for (let c=0;c<COLS;c++) {
                    for (let r=ROWS-1;r>=0;r--) { if (aliens[r][c].alive) { alive.push({r,c}); break; } }
                }
                if (alive.length > 0) {
                    const {r,c} = alive[Math.floor(Math.random()*alive.length)];
                    const ax = GRID_X + c*SLOT_W + gxRef.current;
                    const ay = GRID_Y + r*SLOT_H + gyRef.current + SPR_H/2;
                    alnBltsRef.current.push({x:ax, y:ay});
                    beep(180, 0.06, 'sawtooth', 0.07);
                }
            }

            // ── Player bullet ──
            const pb = plrBltRef.current;
            if (pb) {
                pb.y -= 9;
                if (pb.y < 0) { plrBltRef.current = null; }
                else {
                    // vs UFO
                    if (ufo.active && pb.y < 76 && Math.abs(pb.x - ufo.x) < 28) {
                        addScore(ufo.pts); ufo.active = false; plrBltRef.current = null; beep(600, 0.35, 'sawtooth');
                        explRef.current.push({x:ufo.x,y:64,t:20});
                    }
                    // vs shield
                    else if (pb && shieldHit(pb.x, pb.y)) { plrBltRef.current = null; }
                    // vs alien
                    else if (pb) {
                        let killed = false;
                        outer: for (let r=0;r<ROWS;r++) for (let c=0;c<COLS;c++) {
                            if (!aliens[r][c].alive) continue;
                            const ax = GRID_X + c*SLOT_W + gxRef.current - SPR_W/2;
                            const ay = GRID_Y + r*SLOT_H + gyRef.current - SPR_H/2;
                            if (pb.x>=ax && pb.x<=ax+SPR_W && pb.y>=ay && pb.y<=ay+SPR_H) {
                                aliens[r][c].alive = false;
                                addScore(ROW_PTS[r]);
                                explRef.current.push({x:ax+SPR_W/2, y:ay+SPR_H/2, t:18});
                                plrBltRef.current = null; killed = true;
                                beep(220, 0.2, 'sawtooth');
                                break outer;
                            }
                        }
                        if (!killed) { /* still flying */ }
                        // Check win
                        if (countAlive() === 0) {
                            levelRef.current++;
                            phaseRef.current = 'LEVELUP'; setUiPhase('LEVELUP');
                            setTimeout(() => { startLevel(levelRef.current, true); }, 2200);
                        }
                    }
                }
            }

            // ── Alien bullets ──
            alnBltsRef.current = alnBltsRef.current.filter(b => {
                b.y += 4 + levelRef.current * 0.4;
                if (b.y > H) return false;
                // vs shield
                if (shieldHit(b.x, b.y)) return false;
                // vs player
                const px = plrXRef.current;
                if (b.x >= px-PLR_W/2 && b.x <= px+PLR_W/2 && b.y >= PLR_Y-PLR_H && b.y <= PLR_Y+6) {
                    beep(80, 0.6, 'sawtooth', 0.3);
                    livesRef.current--;
                    setUiLives(livesRef.current);
                    explRef.current.push({x:px, y:PLR_Y-PLR_H/2, t:30});
                    if (livesRef.current <= 0) {
                        phaseRef.current = 'GAMEOVER'; setUiPhase('GAMEOVER');
                        setTimeout(() => setShowLead(true), 1800);
                    } else {
                        phaseRef.current = 'DEAD'; setUiPhase('DEAD');
                        deadTRef.current = 90;
                    }
                    return false;
                }
                return true;
            });
        }

        // ── DEAD countdown ──
        if (ph === 'DEAD') {
            deadTRef.current--;
            if (deadTRef.current <= 0) { phaseRef.current = 'PLAY'; setUiPhase('PLAY'); plrXRef.current = W/2; }
        }

        // ── Explosions tick ──
        explRef.current = explRef.current.map(e => ({...e, t: e.t-1})).filter(e => e.t > 0);

        // ══════════════════════════════════
        // ── DRAW ──
        // ══════════════════════════════════
        ctx.fillStyle = '#050810';
        ctx.fillRect(0, 0, W, H);

        // Stars
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        for (let i = 0; i < 60; i++) {
            const sx = ((i * 137 + 73) % W);
            const sy = ((i * 293 + 17) % H);
            const blink = 0.3 + 0.7 * Math.abs(Math.sin(f * 0.02 + i));
            ctx.globalAlpha = blink * 0.5;
            ctx.fillRect(sx, sy, 1, 1);
        }
        ctx.globalAlpha = 1;

        // Top divider
        ctx.strokeStyle = '#1a3a5c';
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(0, 80); ctx.lineTo(W, 80); ctx.stroke();

        // Score bar
        ctx.fillStyle = '#00DDFF'; ctx.font = 'bold 12px monospace'; ctx.textAlign = 'left';
        ctx.fillText(`SCORE  ${scoreRef.current.toString().padStart(6,'0')}`, 14, 28);
        ctx.fillStyle = '#FF44CC'; ctx.textAlign = 'center';
        ctx.fillText('SPACE INVADERS', W/2, 28);
        ctx.fillStyle = '#FFDD00'; ctx.textAlign = 'right';
        ctx.fillText(`HI  ${hiRef.current.toString().padStart(6,'0')}`, W-14, 28);

        // Level indicator
        ctx.fillStyle = '#888'; ctx.font = 'bold 10px monospace'; ctx.textAlign = 'center';
        ctx.fillText(`LVL ${levelRef.current}`, W/2, 50);

        // UFO
        const ufo = ufoRef.current;
        if (ufo.active) {
            const ux = ufo.x;
            ctx.save();
            ctx.shadowColor = '#FF2222'; ctx.shadowBlur = 12;
            ctx.fillStyle = '#FF2222';
            ctx.beginPath(); ctx.ellipse(ux, 64, 26, 10, 0, 0, Math.PI*2); ctx.fill();
            ctx.fillStyle = '#FF6666';
            ctx.beginPath(); ctx.ellipse(ux, 58, 14, 7, 0, 0, Math.PI*2); ctx.fill();
            ctx.fillStyle = '#FFAAAA';
            ctx.beginPath(); ctx.ellipse(ux-8, 62, 3, 3, 0, 0, Math.PI*2); ctx.fill();
            ctx.beginPath(); ctx.ellipse(ux,   62, 3, 3, 0, 0, Math.PI*2); ctx.fill();
            ctx.beginPath(); ctx.ellipse(ux+8, 62, 3, 3, 0, 0, Math.PI*2); ctx.fill();
            ctx.restore();
        }

        // Aliens
        const aliens = aliensRef.current;
        for (let r=0;r<ROWS;r++) for (let c=0;c<COLS;c++) {
            if (!aliens[r][c].alive) continue;
            const ax = GRID_X + c*SLOT_W + gxRef.current - SPR_W/2;
            const ay = GRID_Y + r*SLOT_H + gyRef.current - SPR_H/2;
            const type = ROW_TYPE[r];
            const key = SPRITE_KEYS[r][aliens[r][c].frame];
            const color = ALN_CLR[type];
            ctx.save();
            ctx.shadowColor = color; ctx.shadowBlur = 8;
            drawSprite(ctx, SPR[key], ax, ay, color);
            ctx.restore();
        }

        // Shields
        for (let s=0;s<4;s++) {
            const sx = SH_XS[s];
            for (let r=0;r<SH_ROWS;r++) for (let c=0;c<SH_COLS;c++) {
                if (shieldsRef.current[s][r][c]) {
                    const alpha = 0.7 + 0.3 * Math.sin(f*0.05);
                    ctx.fillStyle = `rgba(0,220,100,${alpha})`;
                    ctx.fillRect(sx+c*SCELL, SH_Y+r*SCELL, SCELL-1, SCELL-1);
                }
            }
        }

        // Alien bullets
        alnBltsRef.current.forEach(b => {
            ctx.fillStyle = '#FF4444';
            ctx.shadowColor = '#FF4444'; ctx.shadowBlur = 4;
            ctx.fillRect(b.x-1, b.y-6, 2, 10);
            ctx.shadowBlur = 0;
        });

        // Player bullet
        const pb = plrBltRef.current;
        if (pb) {
            ctx.fillStyle = '#FFFFFF';
            ctx.shadowColor = '#00FFFF'; ctx.shadowBlur = 8;
            ctx.fillRect(pb.x-1.5, pb.y-12, 3, 14);
            ctx.shadowBlur = 0;
        }

        // Player ship
        const px = plrXRef.current;
        const deadFlash = ph === 'DEAD' && Math.floor(deadTRef.current / 8) % 2 === 0;
        if (!deadFlash) {
            ctx.save();
            ctx.shadowColor = '#00FFCC'; ctx.shadowBlur = 20;
            ctx.fillStyle = '#00FFCC';
            // Base
            ctx.beginPath();
            ctx.moveTo(px - PLR_W/2, PLR_Y);
            ctx.lineTo(px + PLR_W/2, PLR_Y);
            ctx.lineTo(px + PLR_W/2, PLR_Y - 8);
            ctx.lineTo(px + 10, PLR_Y - 8);
            ctx.lineTo(px + 6, PLR_Y - PLR_H);
            ctx.lineTo(px - 6, PLR_Y - PLR_H);
            ctx.lineTo(px - 10, PLR_Y - 8);
            ctx.lineTo(px - PLR_W/2, PLR_Y - 8);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }

        // Bottom line
        ctx.strokeStyle = '#00FFCC';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#00FFCC'; ctx.shadowBlur = 6;
        ctx.beginPath(); ctx.moveTo(MARGIN, PLR_Y+10); ctx.lineTo(W-MARGIN, PLR_Y+10); ctx.stroke();
        ctx.shadowBlur = 0;

        // Lives
        ctx.fillStyle = '#00FFCC'; ctx.font = 'bold 10px monospace'; ctx.textAlign = 'left';
        ctx.fillText(`LIVES`, 14, H-18);
        for (let i=0;i<livesRef.current;i++) {
            ctx.fillStyle = '#00FFCC'; ctx.shadowColor = '#00FFCC'; ctx.shadowBlur = 8;
            ctx.fillRect(60 + i*18, H-26, 12, 8);
            ctx.shadowBlur = 0;
        }

        // Explosions
        explRef.current.forEach(e => {
            const r = (1 - e.t/30) * 28;
            const alpha = e.t / 30;
            ctx.globalAlpha = alpha;
            ctx.strokeStyle = '#FFAA00'; ctx.lineWidth = 2; ctx.shadowColor = '#FFAA00'; ctx.shadowBlur = 10;
            for (let i=0;i<8;i++) {
                const a = (i/8) * Math.PI*2;
                ctx.beginPath();
                ctx.moveTo(e.x + Math.cos(a)*4, e.y + Math.sin(a)*4);
                ctx.lineTo(e.x + Math.cos(a)*r,  e.y + Math.sin(a)*r);
                ctx.stroke();
            }
            ctx.globalAlpha = 1; ctx.shadowBlur = 0;
        });

        // Overlays
        if (ph === 'START') {
            ctx.fillStyle = 'rgba(5,8,16,0.85)';
            ctx.fillRect(0, 0, W, H);
            ctx.textAlign = 'center';
            ctx.fillStyle = '#FF44CC'; ctx.font = 'bold 44px monospace'; ctx.shadowColor = '#FF44CC'; ctx.shadowBlur = 20;
            ctx.fillText('SPACE', W/2, 280);
            ctx.fillStyle = '#00DDFF'; ctx.shadowColor = '#00DDFF';
            ctx.fillText('INVADERS', W/2, 340);
            ctx.shadowBlur = 0;
            ctx.fillStyle = Math.floor(f/18)%2===0 ? '#FFFFFF' : '#888888';
            ctx.font = 'bold 14px monospace';
            ctx.fillText('TAP PLAY TO START', W/2, 420);
            const colors = ALN_CLR;
            [[0,W/2-80,470],[1,W/2,470],[2,W/2+80,470]].forEach(([t,x,y]) => {
                drawSprite(ctx, SPR[SPRITE_KEYS[t*2 as 0|2|4][0]], (x as number)-SPR_W/2, (y as number)-SPR_H/2, colors[t as number]);
                ctx.fillStyle = colors[t as number]; ctx.font = '10px monospace';
                ctx.fillText(`${ROW_PTS[t*2 as 0|2|4]} PTS`, x as number, (y as number)+20);
            });
        }

        if (ph === 'LEVELUP') {
            ctx.fillStyle = 'rgba(5,8,16,0.7)';
            ctx.fillRect(0, 0, W, H);
            ctx.textAlign = 'center'; ctx.shadowColor = '#FFDD00'; ctx.shadowBlur = 30;
            ctx.fillStyle = '#FFDD00'; ctx.font = 'bold 32px monospace';
            ctx.fillText(`LEVEL ${levelRef.current}`, W/2, H/2 - 20);
            ctx.font = 'bold 16px monospace'; ctx.fillStyle = '#FFFFFF'; ctx.shadowBlur = 0;
            ctx.fillText('GET READY!', W/2, H/2 + 20);
        }

        if (ph === 'GAMEOVER') {
            ctx.fillStyle = 'rgba(5,8,16,0.6)';
            ctx.fillRect(0, 0, W, H);
            ctx.textAlign = 'center'; ctx.shadowColor = '#FF2222'; ctx.shadowBlur = 25;
            ctx.fillStyle = '#FF2222'; ctx.font = 'bold 36px monospace';
            ctx.fillText('GAME OVER', W/2, H/2 - 10);
            ctx.shadowBlur = 0; ctx.fillStyle = '#888'; ctx.font = '14px monospace';
            ctx.fillText(`Score: ${scoreRef.current}`, W/2, H/2 + 30);
        }

        rafRef.current = requestAnimationFrame(loop);
    }, [beep, addScore, startLevel]); // eslint-disable-line

    // ── RAF control ──
    useEffect(() => {
        rafRef.current = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(rafRef.current);
    }, [loop]);

    // ── Keyboard ──
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft')  keysRef.current.left  = true;
            if (e.key === 'ArrowRight') keysRef.current.right = true;
            if (e.key === ' ') { e.preventDefault(); playerFire(); }
        };
        const up = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft')  keysRef.current.left  = false;
            if (e.key === 'ArrowRight') keysRef.current.right = false;
        };
        window.addEventListener('keydown', down);
        window.addEventListener('keyup', up);
        return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); };
    }, [playerFire]);

    // ── Lead submit ──
    const submitLead = async (e: React.FormEvent) => {
        e.preventDefault(); setSubmitting(true);
        try {
            await fetch('/api/lead', { method:'POST', headers:{'Content-Type':'application/json'},
                body: JSON.stringify({email, score: scoreRef.current, level: levelRef.current, game:'invaders', source:'Space Invaders Game'}) });
            setShowLead(false); setUiPhase('START');
        } catch { /* silent */ } finally { setSubmitting(false); }
    };

    const holdBtn = (key: 'left'|'right') => ({
        onPointerDown: (e: React.PointerEvent) => { e.preventDefault(); keysRef.current[key] = true; },
        onPointerUp:   (e: React.PointerEvent) => { e.preventDefault(); keysRef.current[key] = false; },
        onPointerLeave:(e: React.PointerEvent) => { e.preventDefault(); keysRef.current[key] = false; },
    });

    return (
        <div className="flex flex-col items-center bg-black w-full max-w-md mx-auto select-none touch-none overflow-hidden shadow-2xl rounded-3xl border-4 border-gray-900">

            {/* HUD */}
            <div className="w-full flex justify-between items-center px-4 py-2 border-b border-gray-900">
                <div className="text-center">
                    <div className="text-[8px] text-gray-600 uppercase tracking-widest">Score</div>
                    <div className="text-cyan-400 font-black text-lg tabular-nums">{uiScore.toString().padStart(6,'0')}</div>
                </div>
                <div className="text-center">
                    <div className="text-pink-500 font-black text-[10px] uppercase tracking-widest">Space Invaders</div>
                    <div className="text-gray-700 text-[9px]">Level {uiLevel}</div>
                </div>
                <div className="text-center">
                    <div className="text-[8px] text-gray-600 uppercase tracking-widest">Best</div>
                    <div className="text-yellow-400 font-black text-lg tabular-nums">{uiHigh.toString().padStart(6,'0')}</div>
                </div>
            </div>

            {/* Canvas */}
            <div className="relative w-full">
                <canvas ref={canvasRef} width={W} height={H} className="w-full h-auto block" />

                {/* START overlay */}
                {uiPhase === 'START' && (
                    <div className="absolute inset-0 flex flex-col items-end justify-end pb-16 pointer-events-none">
                        <div className="w-full flex justify-center">
                            <button onClick={startGame} className="pointer-events-auto px-12 py-4 border-2 border-pink-500 text-pink-400 rounded-full text-lg font-black uppercase tracking-widest hover:bg-pink-500/10 transition-all active:scale-95">
                                PLAY
                            </button>
                        </div>
                    </div>
                )}

                {/* GAMEOVER lead form */}
                {uiPhase === 'GAMEOVER' && showLead && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md p-6">
                        <div className="text-5xl mb-2">👾</div>
                        <h2 className="text-3xl font-black text-red-500 mb-1 tracking-wider">GAME OVER</h2>
                        <div className="flex gap-6 my-4">
                            <div className="text-center">
                                <div className="text-gray-600 text-[9px] uppercase tracking-widest">Score</div>
                                <div className="text-cyan-400 text-2xl font-black">{uiScore}</div>
                            </div>
                            <div className="w-px bg-gray-800"/>
                            <div className="text-center">
                                <div className="text-gray-600 text-[9px] uppercase tracking-widest">Level</div>
                                <div className="text-pink-400 text-2xl font-black">{uiLevel}</div>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm mb-4 text-center">Save your score & get <span className="text-cyan-400 font-bold">exclusive offers</span>!</p>
                        <form onSubmit={submitLead} className="w-full max-w-xs space-y-3">
                            <input type="email" required placeholder="your@email.com" value={email} onChange={e=>setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-xl text-white focus:outline-none focus:border-cyan-500 transition-colors text-sm"/>
                            <button type="submit" disabled={submitting}
                                className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-700 text-white rounded-xl font-bold uppercase tracking-widest text-sm transition-all active:scale-95 flex items-center justify-center gap-2">
                                {submitting ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>Saving...</> : 'Save Score'}
                            </button>
                            <button type="button" onClick={startGame} className="w-full py-2 text-gray-600 text-[10px] uppercase tracking-tight hover:text-white transition-colors">Play Again</button>
                        </form>
                    </div>
                )}
            </div>

            {/* Mobile Controls */}
            <div className="w-full px-3 py-4" style={{touchAction:'none'}}>
                <div className="grid grid-cols-5 gap-2 h-20">
                    <button className="col-span-2 flex items-center justify-center rounded-2xl border-2 border-gray-700 text-gray-300 bg-gray-900/80 font-bold text-xl active:bg-gray-700 active:scale-95 transition-all"
                        style={{touchAction:'none'}} {...holdBtn('left')}>
                        ◀
                    </button>
                    <button className="col-span-1 flex items-center justify-center rounded-2xl border-2 border-pink-600 text-pink-400 bg-pink-900/20 font-bold text-2xl active:bg-pink-700/30 active:scale-95 transition-all"
                        style={{touchAction:'none'}}
                        onPointerDown={e => { e.preventDefault(); playerFire(); }}>
                        🔥
                    </button>
                    <button className="col-span-2 flex items-center justify-center rounded-2xl border-2 border-gray-700 text-gray-300 bg-gray-900/80 font-bold text-xl active:bg-gray-700 active:scale-95 transition-all"
                        style={{touchAction:'none'}} {...holdBtn('right')}>
                        ▶
                    </button>
                </div>
                <div className="flex justify-between mt-1.5 px-2">
                    <span className="text-gray-700 text-[9px] uppercase tracking-widest w-2/5 text-center">Move Left</span>
                    <span className="text-pink-900 text-[9px] uppercase tracking-widest w-1/5 text-center">Fire</span>
                    <span className="text-gray-700 text-[9px] uppercase tracking-widest w-2/5 text-center">Move Right</span>
                </div>
            </div>
        </div>
    );
}

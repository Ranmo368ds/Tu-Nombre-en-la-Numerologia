'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

// ─── Canvas & Court Geometry ────────────────────────────────────────────────
const W = 480;
const H = 720;

const CL = 58;                    // court left (singles)
const CR = W - 58;               // court right
const CT = 100;                  // top baseline (CPU side)
const CB = H - 100;              // bottom baseline (Player side)
const NET_Y = Math.round((CT + CB) / 2);  // net at center
const CTR_X = W / 2;

const SVC_D = Math.round((CB - CT) * 0.285);   // service box depth
const P_SVC = NET_Y + SVC_D;     // player's service line
const C_SVC = NET_Y - SVC_D;     // cpu's service line

// ─── Physics & Speed ────────────────────────────────────────────────────────
const PLR_SPEED = 4.8;
const CPU_SPEED_BASE = 3.0;
const BALL_SPEED = 7.5;
const FRICTION = 0.9985;
const HIT_REACH = 48;             // horizontal reach to hit ball
const HIT_ZONE_TOP = CB - 90;    // vertical zone where player can hit

// ─── Tennis Scoring ─────────────────────────────────────────────────────────
const PTS_LABEL = ['0', '15', '30', '40'];
type Scorer = 'player' | 'cpu';
type Phase = 'START' | 'SERVE' | 'PLAY' | 'POINT' | 'GAMEOVER';

interface BallState {
    x: number; y: number;
    vx: number; vy: number;
    active: boolean;
    goingDown: boolean; // true = heading toward player
    bounced: boolean;   // has it bounced this pass?
    trail: { x: number; y: number }[];
}

interface Particle {
    x: number; y: number;
    vx: number; vy: number;
    life: number;
    color: string;
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function Tennis() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rafRef = useRef(0);
    const frameRef = useRef(0);

    // Game object refs (avoids stale closures)
    const ballRef = useRef<BallState>({
        x: CTR_X, y: CB - 15, vx: 0, vy: 0,
        active: false, goingDown: false, bounced: false, trail: [],
    });
    const plrXRef = useRef(CTR_X);
    const cpuXRef = useRef(CTR_X);
    const plrSwingRef = useRef(0);
    const cpuSwingRef = useRef(0);
    const hitWindowRef = useRef(false);
    const particlesRef = useRef<Particle[]>([]);

    // Scoring refs
    const plrPtsRef = useRef(0);   // 0-4
    const cpuPtsRef = useRef(0);
    const plrGamesRef = useRef(0);
    const cpuGamesRef = useRef(0);
    const plrSetsRef = useRef(0);
    const cpuSetsRef = useRef(0);
    const servingRef = useRef<Scorer>('player');
    const phaseRef = useRef<Phase>('START');
    const faultRef = useRef(0);    // serve faults (0 or 1)

    // UI State
    const [phase, setPhase] = useState<Phase>('START');
    const [plrPts, setPlrPts] = useState(0);
    const [cpuPts, setCpuPts] = useState(0);
    const [plrGames, setPlrGames] = useState(0);
    const [cpuGames, setCpuGames] = useState(0);
    const [plrSets, setPlrSets] = useState(0);
    const [cpuSets, setCpuSets] = useState(0);
    const [msgText, setMsgText] = useState('');
    const [showLead, setShowLead] = useState(false);
    const [email, setEmail] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [matchWinner, setMatchWinner] = useState<Scorer | null>(null);

    // Controls
    const keysRef = useRef({ left: false, right: false });
    const lastSwingRef = useRef(0);

    // ─── Particles ────────────────────────────────────────────────────────
    const spawnHitParticles = (x: number, y: number, color: string) => {
        for (let i = 0; i < 8; i++) {
            const a = Math.random() * Math.PI * 2;
            const s = 1.5 + Math.random() * 2.5;
            particlesRef.current.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 25 + Math.random() * 15, color });
        }
    };

    // ─── Setup serve ─────────────────────────────────────────────────────
    const setupServe = useCallback(() => {
        faultRef.current = 0;
        hitWindowRef.current = false;
        const ball = ballRef.current;
        ball.active = false;
        ball.trail = [];
        const srv = servingRef.current;

        if (srv === 'player') {
            ball.x = plrXRef.current;
            ball.y = CB - 15;
            ball.vx = 0; ball.vy = 0;
            phaseRef.current = 'SERVE';
            setPhase('SERVE');
            setMsgText('Your Serve — Press SERVE');
        } else {
            // CPU serves automatically
            ball.x = cpuXRef.current + (Math.random() - 0.5) * 60;
            ball.y = CT + 15;
            phaseRef.current = 'SERVE';
            setPhase('SERVE');
            setMsgText('CPU Serving...');
            setTimeout(() => {
                if (phaseRef.current !== 'SERVE') return;
                const b = ballRef.current;
                const targetX = CTR_X + (b.x < CTR_X ? 50 : -50) + (Math.random() - 0.5) * 30;
                const dx = targetX - b.x;
                const dy = P_SVC - b.y;
                const d = Math.sqrt(dx * dx + dy * dy);
                b.vx = (dx / d) * BALL_SPEED * 0.9;
                b.vy = (dy / d) * BALL_SPEED * 0.9;
                b.active = true;
                b.goingDown = true;
                b.bounced = false;
                phaseRef.current = 'PLAY';
                setPhase('PLAY');
                setMsgText('');
            }, 1400);
        }
    }, []);

    // ─── Award Point ─────────────────────────────────────────────────────
    const awardPoint = useCallback((to: Scorer) => {
        const ball = ballRef.current;
        ball.active = false;
        hitWindowRef.current = false;

        let pp = plrPtsRef.current;
        let cp = cpuPtsRef.current;
        if (to === 'player') pp++;
        else cp++;

        // Deuce logic
        let gameOver = false;
        let gameWinner: Scorer | null = null;

        if (pp >= 3 && cp >= 3) {
            // At deuce or beyond
            const diff = pp - cp;
            if (diff >= 2) { gameWinner = 'player'; gameOver = true; }
            else if (diff <= -2) { gameWinner = 'cpu'; gameOver = true; }
        } else if (pp >= 4) { gameWinner = 'player'; gameOver = true; }
        else if (cp >= 4) { gameWinner = 'cpu'; gameOver = true; }

        plrPtsRef.current = pp;
        cpuPtsRef.current = cp;
        setPlrPts(pp);
        setCpuPts(cp);

        if (gameOver && gameWinner) {
            // Reset points
            plrPtsRef.current = 0;
            cpuPtsRef.current = 0;
            setPlrPts(0);
            setCpuPts(0);

            let pg = plrGamesRef.current;
            let cg = cpuGamesRef.current;
            if (gameWinner === 'player') pg++;
            else cg++;
            plrGamesRef.current = pg;
            cpuGamesRef.current = cg;
            setPlrGames(pg);
            setCpuGames(cg);

            // Check set
            let setOver = false;
            let setWinner: Scorer | null = null;
            const gd = pg - cg;
            if ((pg >= 6 || cg >= 6) && Math.abs(gd) >= 2) { setOver = true; setWinner = gd > 0 ? 'player' : 'cpu'; }
            if (pg === 7 || cg === 7) { setOver = true; setWinner = pg === 7 ? 'player' : 'cpu'; }

            if (setOver && setWinner) {
                plrGamesRef.current = 0;
                cpuGamesRef.current = 0;
                setPlrGames(0);
                setCpuGames(0);

                let ps = plrSetsRef.current;
                let cs = cpuSetsRef.current;
                if (setWinner === 'player') ps++;
                else cs++;
                plrSetsRef.current = ps;
                cpuSetsRef.current = cs;
                setPlrSets(ps);
                setCpuSets(cs);

                if (ps >= 2 || cs >= 2) {
                    const mw = ps >= 2 ? 'player' : 'cpu';
                    setMatchWinner(mw);
                    setMsgText(mw === 'player' ? '🏆 YOU WIN THE MATCH!' : 'CPU WINS MATCH');
                    phaseRef.current = 'GAMEOVER';
                    setPhase('GAMEOVER');
                    setTimeout(() => setShowLead(true), 1500);
                    return;
                }
                setMsgText(`${setWinner === 'player' ? 'YOU WIN' : 'CPU WINS'} SET!`);
            } else {
                setMsgText(`${gameWinner === 'player' ? 'Your' : 'CPU'} Game!`);
            }
            servingRef.current = servingRef.current === 'player' ? 'cpu' : 'player';
        } else {
            setMsgText(to === 'player' ? '✓ Your Point' : '✗ CPU Point');
        }

        phaseRef.current = 'POINT';
        setPhase('POINT');
        setTimeout(() => {
            if (phaseRef.current === 'POINT') setupServe();
        }, 2000);
    }, [setupServe]);

    // ─── Player Swing ─────────────────────────────────────────────────────
    const playerSwing = useCallback(() => {
        if (phaseRef.current !== 'PLAY') return;
        const now = Date.now();
        if (now - lastSwingRef.current < 350) return;
        lastSwingRef.current = now;

        if (!hitWindowRef.current) return;
        const ball = ballRef.current;
        const plrX = plrXRef.current;

        // Aim based on player position (cross-court strategy)
        const relPos = (plrX - CL) / (CR - CL);
        const targetX = relPos < 0.35
            ? CR - 50 - Math.random() * 40
            : relPos > 0.65
                ? CL + 50 + Math.random() * 40
                : CTR_X + (Math.random() - 0.5) * 60;

        const dx = targetX - ball.x;
        const dy = CT - ball.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        const speed = BALL_SPEED * (0.9 + Math.random() * 0.2);
        ball.vx = (dx / d) * speed;
        ball.vy = (dy / d) * speed;
        ball.goingDown = false;
        ball.bounced = false;
        ball.trail = [];
        hitWindowRef.current = false;
        plrSwingRef.current = 14;
        spawnHitParticles(ball.x, ball.y, '#00FFCC');
    }, []);

    // ─── Player Serve ─────────────────────────────────────────────────────
    const playerServe = useCallback(() => {
        if (phaseRef.current !== 'SERVE' || servingRef.current !== 'player') return;
        const ball = ballRef.current;
        const side = ball.x < CTR_X ? 'right' : 'left'; // serve to opposite side
        const targetX = side === 'right'
            ? CTR_X + 30 + Math.random() * 50
            : CTR_X - 30 - Math.random() * 50;
        const targetY = (CT + C_SVC) / 2 + (Math.random() - 0.5) * 25;
        const dx = targetX - ball.x;
        const dy = targetY - ball.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        const speed = BALL_SPEED * (0.92 + Math.random() * 0.15);
        ball.vx = (dx / d) * speed;
        ball.vy = (dy / d) * speed;
        ball.active = true;
        ball.goingDown = false;
        ball.bounced = false;
        ball.trail = [];
        plrSwingRef.current = 14;
        phaseRef.current = 'PLAY';
        setPhase('PLAY');
        setMsgText('');
        faultRef.current = 0;
    }, []);

    // ─── Game Loop ────────────────────────────────────────────────────────
    const gameLoop = useCallback(() => {
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;

        frameRef.current++;
        const f = frameRef.current;
        const ph = phaseRef.current;

        // ── Player movement ──
        const keys = keysRef.current;
        if (keys.left) plrXRef.current = Math.max(CL + 14, plrXRef.current - PLR_SPEED);
        if (keys.right) plrXRef.current = Math.min(CR - 14, plrXRef.current + PLR_SPEED);
        if (plrSwingRef.current > 0) plrSwingRef.current--;
        if (cpuSwingRef.current > 0) cpuSwingRef.current--;

        // ── CPU tracking ──
        const ball = ballRef.current;
        if (ph === 'PLAY' && ball.active) {
            const cpuTarget = !ball.goingDown ? ball.x : CTR_X;
            const diff = cpuTarget - cpuXRef.current;
            const move = Math.min(Math.abs(diff), CPU_SPEED_BASE) * Math.sign(diff);
            cpuXRef.current = Math.max(CL + 14, Math.min(CR - 14, cpuXRef.current + move));
        }

        // ── Ball physics ──
        if (ball.active && (ph === 'PLAY')) {
            // Trail
            ball.trail.push({ x: ball.x, y: ball.y });
            if (ball.trail.length > 8) ball.trail.shift();

            ball.x += ball.vx;
            ball.y += ball.vy;
            ball.vx *= FRICTION;

            // Side walls (ball bounces off sidelines)
            if (ball.x < CL + 4) { ball.x = CL + 4; ball.vx = Math.abs(ball.vx) * 0.8; }
            if (ball.x > CR - 4) { ball.x = CR - 4; ball.vx = -Math.abs(ball.vx) * 0.8; }

            // ── Ball enters player's hit zone ──
            if (ball.goingDown && ball.y >= HIT_ZONE_TOP && !ball.bounced) {
                ball.bounced = true;
                const xDiff = Math.abs(plrXRef.current - ball.x);
                if (xDiff <= HIT_REACH) {
                    hitWindowRef.current = true;
                }
            }

            // ── Ball missed by player (past baseline) ──
            if (ball.goingDown && ball.y > CB + 25) {
                hitWindowRef.current = false;
                awardPoint('cpu');
                return;
            }

            // ── Ball reaches CPU zone ──
            if (!ball.goingDown && ball.y <= CT + 80 && !ball.bounced) {
                ball.bounced = true;
                const xDiff = Math.abs(cpuXRef.current - ball.x);
                if (xDiff <= HIT_REACH + 15) {
                    // Check if landed in valid court (for serve validation not needed here)
                    cpuSwingRef.current = 14;
                    const targetX = plrXRef.current < CTR_X
                        ? CR - 40 - Math.random() * 60
                        : CL + 40 + Math.random() * 60;
                    const dx = targetX - ball.x;
                    const dy = CB - ball.y;
                    const d = Math.sqrt(dx * dx + dy * dy);
                    const speed = BALL_SPEED * (0.82 + Math.random() * 0.22);
                    ball.vx = (dx / d) * speed;
                    ball.vy = (dy / d) * speed;
                    ball.goingDown = true;
                    ball.bounced = false;
                    ball.trail = [];
                    spawnHitParticles(ball.x, ball.y, '#FF6B35');
                } else {
                    awardPoint('player');
                    return;
                }
            }

            // ── Ball went past CPU baseline without being handled ──
            if (!ball.goingDown && ball.y < CT - 25) {
                awardPoint('player');
                return;
            }

            // ── Close hit window once ball is on its way back ──
            if (!ball.goingDown && ball.y < NET_Y - 30) {
                hitWindowRef.current = false;
            }
        }

        // ── Update particles ──
        particlesRef.current = particlesRef.current
            .map(p => ({ ...p, x: p.x + p.vx, y: p.y + p.vy, life: p.life - 1 }))
            .filter(p => p.life > 0);

        // ═══════════════════════════════════════════
        // ── DRAW ──
        // ═══════════════════════════════════════════

        // Background (crowd/stadium)
        ctx.fillStyle = '#0a0f1e';
        ctx.fillRect(0, 0, W, H);

        // Stadium gradient behind court
        const stadGrad = ctx.createRadialGradient(W / 2, H / 2, 80, W / 2, H / 2, 380);
        stadGrad.addColorStop(0, 'rgba(20,50,100,0.0)');
        stadGrad.addColorStop(1, 'rgba(5,10,30,0.9)');
        ctx.fillStyle = stadGrad;
        ctx.fillRect(0, 0, W, H);

        // ── Court surface ──
        // Hard court: deep teal-blue
        const courtGrad = ctx.createLinearGradient(CL, CT, CL, CB);
        courtGrad.addColorStop(0, '#1a4f7a');
        courtGrad.addColorStop(0.5, '#1e5b88');
        courtGrad.addColorStop(1, '#1a4f7a');
        ctx.fillStyle = courtGrad;
        ctx.fillRect(CL, CT, CR - CL, CB - CT);

        // Court surface overlay (subtle texture)
        ctx.fillStyle = 'rgba(255,255,255,0.015)';
        for (let gy = CT; gy < CB; gy += 14) {
            ctx.fillRect(CL, gy, CR - CL, 7);
        }

        // ── Court Lines ──
        ctx.save();
        ctx.shadowColor = 'rgba(255,255,255,0.3)';
        ctx.shadowBlur = 3;
        ctx.strokeStyle = 'rgba(255,255,255,0.95)';

        // Baselines
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(CL, CT); ctx.lineTo(CR, CT);
        ctx.moveTo(CL, CB); ctx.lineTo(CR, CB);
        ctx.stroke();

        // Sidelines
        ctx.beginPath();
        ctx.moveTo(CL, CT); ctx.lineTo(CL, CB);
        ctx.moveTo(CR, CT); ctx.lineTo(CR, CB);
        ctx.stroke();

        // Service lines
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(CL, P_SVC); ctx.lineTo(CR, P_SVC);
        ctx.moveTo(CL, C_SVC); ctx.lineTo(CR, C_SVC);
        ctx.stroke();

        // Center service line
        ctx.beginPath();
        ctx.moveTo(CTR_X, C_SVC); ctx.lineTo(CTR_X, P_SVC);
        ctx.stroke();

        // Center marks (baselines)
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(CTR_X - 8, CT); ctx.lineTo(CTR_X + 8, CT);
        ctx.moveTo(CTR_X - 8, CB); ctx.lineTo(CTR_X + 8, CB);
        ctx.stroke();
        ctx.restore();

        // ── Net ──
        // Net shadow band
        ctx.fillStyle = 'rgba(0,0,0,0.25)';
        ctx.fillRect(CL, NET_Y, CR - CL, 6);

        // Net mesh
        ctx.strokeStyle = 'rgba(200,220,255,0.25)';
        ctx.lineWidth = 0.8;
        for (let nx = CL; nx <= CR; nx += 7) {
            ctx.beginPath();
            ctx.moveTo(nx, NET_Y - 6);
            ctx.lineTo(nx, NET_Y + 4);
            ctx.stroke();
        }
        for (let ny = NET_Y - 5; ny <= NET_Y + 3; ny += 2) {
            ctx.beginPath();
            ctx.moveTo(CL, ny);
            ctx.lineTo(CR, ny);
            ctx.stroke();
        }

        // Net top cord
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = 'rgba(200,220,255,0.6)';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.moveTo(CL - 3, NET_Y - 5);
        ctx.lineTo(CR + 3, NET_Y - 5);
        ctx.stroke();
        // Net posts
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(CL - 2, NET_Y - 18);
        ctx.lineTo(CL - 2, NET_Y + 5);
        ctx.moveTo(CR + 2, NET_Y - 18);
        ctx.lineTo(CR + 2, NET_Y + 5);
        ctx.stroke();
        ctx.shadowBlur = 0;

        // ── Ball trail ──
        ball.trail.forEach((pt, i) => {
            const alpha = (i / ball.trail.length) * 0.35;
            ctx.globalAlpha = alpha;
            ctx.fillStyle = '#FFEE00';
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 5 + (i / ball.trail.length) * 4, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.globalAlpha = 1;

        // ── Hit window glow ──
        if (hitWindowRef.current && ball.active) {
            const pulse = 0.5 + 0.5 * Math.sin(f * 0.35);
            ctx.strokeStyle = `rgba(0,255,130,${0.3 + pulse * 0.4})`;
            ctx.lineWidth = 2;
            ctx.shadowColor = '#00FF82';
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, 20 + pulse * 6, 0, Math.PI * 2);
            ctx.stroke();
            ctx.shadowBlur = 0;
        }

        // ── Ball ──
        const bx = ball.active ? ball.x : (ph === 'SERVE' && servingRef.current === 'player' ? plrXRef.current : CTR_X);
        const by = ball.active ? ball.y : (ph === 'SERVE' && servingRef.current === 'player' ? CB - 15 : CT + 15);

        if (ph !== 'START') {
            // Shadow
            ctx.fillStyle = 'rgba(0,0,0,0.3)';
            ctx.beginPath();
            ctx.ellipse(bx + 2, by + 3, 8, 5, 0, 0, Math.PI * 2);
            ctx.fill();
            // Ball
            const ballGrad = ctx.createRadialGradient(bx - 2, by - 2, 1, bx, by, 9);
            ballGrad.addColorStop(0, '#FFFFFF');
            ballGrad.addColorStop(0.3, '#FFEE44');
            ballGrad.addColorStop(1, '#DDAA00');
            ctx.fillStyle = ballGrad;
            ctx.shadowColor = '#FFEE00';
            ctx.shadowBlur = 14;
            ctx.beginPath();
            ctx.arc(bx, by, 9, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
        }

        // ── Particles ──
        particlesRef.current.forEach(p => {
            ctx.globalAlpha = p.life / 40;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.globalAlpha = 1;

        // ── Player ──
        const plrX = plrXRef.current;
        const plrSw = plrSwingRef.current > 0;
        ctx.save();
        ctx.translate(plrX, CB + 5);

        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.beginPath();
        ctx.ellipse(0, 8, 16, 6, 0, 0, Math.PI * 2);
        ctx.fill();

        // Body
        ctx.fillStyle = '#00FFCC';
        ctx.shadowColor = '#00FFCC';
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.ellipse(0, 0, 13, 9, 0, 0, Math.PI * 2);
        ctx.fill();

        // Racket
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2.5;
        ctx.shadowBlur = 6;
        if (plrSw) {
            ctx.beginPath(); ctx.moveTo(0, -6); ctx.lineTo(-18, -28); ctx.stroke();
            ctx.strokeRect(-26, -36, 16, 12);
        } else {
            ctx.beginPath(); ctx.moveTo(10, -4); ctx.lineTo(24, -18); ctx.stroke();
            ctx.strokeRect(18, -26, 14, 10);
        }
        ctx.restore();

        // ── CPU ──
        const cpuX = cpuXRef.current;
        const cpuSw = cpuSwingRef.current > 0;
        ctx.save();
        ctx.translate(cpuX, CT - 5);

        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.beginPath();
        ctx.ellipse(0, -8, 16, 6, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#FF6B35';
        ctx.shadowColor = '#FF6B35';
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.ellipse(0, 0, 13, 9, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2.5;
        ctx.shadowBlur = 6;
        if (cpuSw) {
            ctx.beginPath(); ctx.moveTo(0, 6); ctx.lineTo(-18, 28); ctx.stroke();
            ctx.strokeRect(-26, 24, 16, 12);
        } else {
            ctx.beginPath(); ctx.moveTo(10, 4); ctx.lineTo(24, 18); ctx.stroke();
            ctx.strokeRect(18, 16, 14, 10);
        }
        ctx.restore();

        // ── Player label ──
        ctx.fillStyle = 'rgba(0,255,204,0.6)';
        ctx.font = 'bold 10px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('YOU', plrX, CB + 26);

        ctx.fillStyle = 'rgba(255,107,53,0.6)';
        ctx.fillText('CPU', cpuX, CT - 20);
        ctx.textAlign = 'left';

        rafRef.current = requestAnimationFrame(gameLoop);
    }, [awardPoint]);

    // ─── RAF Lifecycle ────────────────────────────────────────────────────
    useEffect(() => {
        if (phase === 'PLAY' || phase === 'SERVE' || phase === 'POINT') {
            rafRef.current = requestAnimationFrame(gameLoop);
        } else {
            cancelAnimationFrame(rafRef.current);
        }
        return () => cancelAnimationFrame(rafRef.current);
    }, [phase, gameLoop]);

    // ─── Keyboard ─────────────────────────────────────────────────────────
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') keysRef.current.left = true;
            if (e.key === 'ArrowRight') keysRef.current.right = true;
            if (e.key === ' ') {
                e.preventDefault();
                if (phaseRef.current === 'SERVE') playerServe();
                else playerSwing();
            }
        };
        const up = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') keysRef.current.left = false;
            if (e.key === 'ArrowRight') keysRef.current.right = false;
        };
        window.addEventListener('keydown', down);
        window.addEventListener('keyup', up);
        return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); };
    }, [playerServe, playerSwing]);

    // ─── Start Game ───────────────────────────────────────────────────────
    const startGame = useCallback(() => {
        plrPtsRef.current = 0; cpuPtsRef.current = 0;
        plrGamesRef.current = 0; cpuGamesRef.current = 0;
        plrSetsRef.current = 0; cpuSetsRef.current = 0;
        servingRef.current = 'player';
        setPlrPts(0); setCpuPts(0);
        setPlrGames(0); setCpuGames(0);
        setPlrSets(0); setCpuSets(0);
        setMatchWinner(null);
        setShowLead(false);
        setMsgText('');
        setupServe();
    }, [setupServe]);

    // ─── Lead Submit ──────────────────────────────────────────────────────
    const submitLead = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await fetch('/api/lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, score: plrGamesRef.current, level: plrSetsRef.current, game: 'tennis', source: 'Tennis Game' }),
            });
            setShowLead(false);
            setPhase('START');
        } catch { /* silent */ } finally { setSubmitting(false); }
    };

    // ─── Touch Button Helpers ─────────────────────────────────────────────
    const holdBtn = (key: 'left' | 'right') => ({
        onTouchStart: (e: React.TouchEvent) => { e.preventDefault(); keysRef.current[key] = true; },
        onTouchEnd:   (e: React.TouchEvent) => { e.preventDefault(); keysRef.current[key] = false; },
        onMouseDown:  () => keysRef.current[key] = true,
        onMouseUp:    () => keysRef.current[key] = false,
        onMouseLeave: () => keysRef.current[key] = false,
    });

    // ─── Point Labels ─────────────────────────────────────────────────────
    const pointLabel = (pts: number) => {
        if (pts <= 3) return PTS_LABEL[pts];
        // Deuce/Advantage - compare
        const diff = plrPtsRef.current - cpuPtsRef.current;
        if (pts === plrPtsRef.current) {
            if (diff === 0) return 'DEU';
            if (diff > 0) return 'ADV';
            return '—';
        } else {
            if (diff === 0) return 'DEU';
            if (diff < 0) return 'ADV';
            return '—';
        }
    };

    const pLabel = plrPts >= 3 && cpuPts >= 3
        ? (plrPts > cpuPts ? 'ADV' : plrPts < cpuPts ? '—' : 'DEU')
        : PTS_LABEL[Math.min(plrPts, 3)];
    const cLabel = plrPts >= 3 && cpuPts >= 3
        ? (cpuPts > plrPts ? 'ADV' : cpuPts < plrPts ? '—' : 'DEU')
        : PTS_LABEL[Math.min(cpuPts, 3)];

    const btnBase = 'flex items-center justify-center rounded-2xl border-2 select-none font-bold uppercase tracking-widest text-xs transition-all active:scale-90 h-full';

    return (
        <div className="flex flex-col items-center bg-black w-full max-w-md mx-auto select-none touch-none overflow-hidden shadow-2xl rounded-3xl border-4 border-gray-900">

            {/* ─ Scoreboard ─ */}
            <div className="w-full px-4 pt-3 pb-2">
                {/* Sets */}
                <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-600 text-[9px] uppercase tracking-widest w-16">Sets</span>
                    <div className="flex gap-1">
                        {[0, 1].map(i => (
                            <span key={i} className={`w-6 h-6 rounded border text-[11px] font-black flex items-center justify-center ${i < plrSets ? 'border-cyan-500 text-cyan-400' : 'border-gray-800 text-gray-600'}`}>
                                {i < plrSets ? '✓' : i === plrSets && phase !== 'START' ? '·' : ''}
                            </span>
                        ))}
                    </div>
                    <div className="h-px flex-1 mx-3 bg-gray-900" />
                    <div className="flex gap-1">
                        {[0, 1].map(i => (
                            <span key={i} className={`w-6 h-6 rounded border text-[11px] font-black flex items-center justify-center ${i < cpuSets ? 'border-orange-500 text-orange-400' : 'border-gray-800 text-gray-600'}`}>
                                {i < cpuSets ? '✓' : ''}
                            </span>
                        ))}
                    </div>
                    <span className="text-gray-600 text-[9px] uppercase tracking-widest w-16 text-right">Sets</span>
                </div>

                {/* Main score row */}
                <div className="flex justify-between items-center bg-gray-950 rounded-2xl px-4 py-2 border border-gray-800">
                    {/* Player */}
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,255,204,0.7)]" />
                        <div className="flex flex-col">
                            <span className="text-cyan-400 font-black text-2xl leading-none">{pLabel}</span>
                            <span className="text-gray-600 text-[9px] uppercase tracking-widest">You</span>
                        </div>
                    </div>

                    {/* Games */}
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-2">
                            <span className="text-white font-black text-xl">{plrGames}</span>
                            <span className="text-gray-700 font-bold text-sm">—</span>
                            <span className="text-white font-black text-xl">{cpuGames}</span>
                        </div>
                        <span className="text-gray-700 text-[9px] uppercase tracking-widest">Games</span>
                    </div>

                    {/* CPU */}
                    <div className="flex items-center gap-3 flex-row-reverse">
                        <div className="w-3 h-3 rounded-full bg-orange-400 shadow-[0_0_8px_rgba(255,107,53,0.7)]" />
                        <div className="flex flex-col items-end">
                            <span className="text-orange-400 font-black text-2xl leading-none">{cLabel}</span>
                            <span className="text-gray-600 text-[9px] uppercase tracking-widest">CPU</span>
                        </div>
                    </div>
                </div>

                {/* Message */}
                <div className="h-5 flex items-center justify-center mt-1">
                    {msgText && (
                        <span className="text-yellow-400 text-[11px] font-bold uppercase tracking-[0.15em] animate-pulse">{msgText}</span>
                    )}
                </div>
            </div>

            {/* ─ Canvas ─ */}
            <div className="relative w-full">
                <canvas ref={canvasRef} width={W} height={H} className="w-full h-auto block" />

                {/* START overlay */}
                {phase === 'START' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
                        <div className="text-7xl mb-3">🎾</div>
                        <h1 className="text-5xl font-black text-white mb-1 tracking-tight drop-shadow-[0_0_20px_rgba(0,200,255,0.5)]">TENNIS</h1>
                        <p className="text-cyan-500 text-xs font-bold uppercase tracking-[0.3em] mb-10">Arcade Edition</p>
                        <button onClick={startGame}
                            className="px-12 py-4 bg-transparent border-2 border-cyan-500 text-cyan-400 rounded-full text-lg font-black uppercase tracking-widest hover:bg-cyan-500/10 transition-all active:scale-95 shadow-[0_0_20px_rgba(0,200,255,0.2)]">
                            Play Now
                        </button>
                        <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-1 text-gray-600 text-[10px] uppercase tracking-wide">
                            <span>◀ ▶  Move</span>
                            <span>🎾  Swing/Serve</span>
                            <span>Best of 3 Sets</span>
                            <span>First to 6 Games</span>
                        </div>
                    </div>
                )}

                {/* GAMEOVER overlay */}
                {phase === 'GAMEOVER' && showLead && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md p-6">
                        <div className="text-5xl mb-3">{matchWinner === 'player' ? '🏆' : '😔'}</div>
                        <h2 className={`text-4xl font-black mb-1 tracking-tight italic ${matchWinner === 'player' ? 'text-yellow-400 drop-shadow-[0_0_14px_rgba(255,200,0,0.5)]' : 'text-red-500'}`}>
                            {matchWinner === 'player' ? 'YOU WIN!' : 'GAME OVER'}
                        </h2>
                        <div className="flex gap-6 my-4">
                            <div className="text-center">
                                <div className="text-gray-500 text-[9px] uppercase tracking-widest">Sets Won</div>
                                <div className="text-cyan-400 text-2xl font-black">{plrSets}</div>
                            </div>
                            <div className="w-px bg-gray-800" />
                            <div className="text-center">
                                <div className="text-gray-500 text-[9px] uppercase tracking-widest">Games Won</div>
                                <div className="text-purple-400 text-2xl font-black">{plrGames}</div>
                            </div>
                        </div>
                        <p className="text-white text-sm mb-5 text-center leading-relaxed">
                            Save your match & get <span className="text-cyan-400 font-bold">exclusive offers</span>!
                        </p>
                        <form onSubmit={submitLead} className="w-full max-w-xs space-y-3">
                            <input type="email" required placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-xl text-white focus:outline-none focus:border-cyan-500 transition-colors text-sm" />
                            <button type="submit" disabled={submitting}
                                className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-700 text-white rounded-xl font-bold uppercase tracking-widest text-sm transition-all active:scale-95 flex items-center justify-center gap-2">
                                {submitting ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</> : 'Save Result'}
                            </button>
                            <button type="button" onClick={startGame} className="w-full py-2 text-gray-600 text-[10px] uppercase tracking-tight hover:text-white transition-colors">Play Again</button>
                        </form>
                    </div>
                )}
            </div>

            {/* ─ Mobile Controls ─ */}
            <div className="w-full px-3 py-4" style={{ touchAction: 'none' }}>
                <div className="grid grid-cols-5 gap-2 h-20">
                    {/* Move Left */}
                    <button className={`${btnBase} col-span-2 border-gray-700 text-gray-300 bg-gray-900/80`}
                        style={{ touchAction: 'none' }} {...holdBtn('left')} aria-label="Move Left">
                        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <path d="M15 6l-6 6 6 6" />
                        </svg>
                    </button>

                    {/* Swing / Serve */}
                    <button className={`${btnBase} col-span-1 border-yellow-600 text-yellow-400 bg-yellow-900/20`}
                        style={{ touchAction: 'none' }}
                        onTouchStart={e => { e.preventDefault(); if (phaseRef.current === 'SERVE') playerServe(); else playerSwing(); }}
                        onMouseDown={() => { if (phaseRef.current === 'SERVE') playerServe(); else playerSwing(); }}
                        aria-label="Swing">
                        <span className="text-2xl">🎾</span>
                    </button>

                    {/* Move Right */}
                    <button className={`${btnBase} col-span-2 border-gray-700 text-gray-300 bg-gray-900/80`}
                        style={{ touchAction: 'none' }} {...holdBtn('right')} aria-label="Move Right">
                        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <path d="M9 6l6 6-6 6" />
                        </svg>
                    </button>
                </div>
                <div className="flex justify-between mt-2 px-2">
                    <span className="text-gray-700 text-[9px] uppercase tracking-widest w-2/5 text-center">Move Left</span>
                    <span className="text-yellow-800 text-[9px] uppercase tracking-widest w-1/5 text-center">Swing</span>
                    <span className="text-gray-700 text-[9px] uppercase tracking-widest w-2/5 text-center">Move Right</span>
                </div>
            </div>
        </div>
    );
}

'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

// ─── Constants ────────────────────────────────────────────────────────────────
const W = 480;
const H = 600;
const ROTATION_SPEED = 0.055;
const THRUST = 0.18;
const FRICTION = 0.985;
const BULLET_SPEED = 9;
const BULLET_LIFE = 55;
const MAX_BULLETS = 4;
const FIRE_COOLDOWN = 220; // ms between shots
const UFO_INTERVAL = 700; // frames
const INVINCIBLE_FRAMES = 180;

// ─── Types ────────────────────────────────────────────────────────────────────
interface Vec2 { x: number; y: number; }

interface Ship {
    x: number; y: number;
    vx: number; vy: number;
    angle: number; // radians
    thrusting: boolean;
    invTimer: number;
    dead: boolean;
}

interface Bullet {
    x: number; y: number;
    vx: number; vy: number;
    life: number;
    fromUFO: boolean;
}

interface Asteroid {
    id: number;
    x: number; y: number;
    vx: number; vy: number;
    radius: number;
    size: 0 | 1 | 2; // 0=large, 1=medium, 2=small
    angle: number;
    spin: number;
    verts: Vec2[];
}

interface UFO {
    x: number; y: number;
    vx: number; vy: number;
    active: boolean;
    fireTimer: number;
    small: boolean;
    radius: number;
}

interface Particle {
    x: number; y: number;
    vx: number; vy: number;
    life: number;
    maxLife: number;
    color: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function wrap(val: number, max: number) {
    if (val < 0) return val + max;
    if (val > max) return val - max;
    return val;
}

function dist(ax: number, ay: number, bx: number, by: number) {
    return Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2);
}

function makeAsteroidVerts(radius: number): Vec2[] {
    const count = 9 + Math.floor(Math.random() * 5);
    return Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2;
        const r = radius * (0.75 + Math.random() * 0.5);
        return { x: Math.cos(angle) * r, y: Math.sin(angle) * r };
    });
}

function spawnAsteroid(id: number, x: number, y: number, size: 0 | 1 | 2): Asteroid {
    const radii = [48, 24, 11];
    const speeds = [0.8, 1.4, 2.2];
    const radius = radii[size];
    const speed = speeds[size] * (0.6 + Math.random() * 0.8);
    const angle = Math.random() * Math.PI * 2;
    return {
        id, x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius,
        size,
        angle: 0,
        spin: (Math.random() - 0.5) * 0.04,
        verts: makeAsteroidVerts(radius),
    };
}

function initLevel(level: number): Asteroid[] {
    const count = 3 + level;
    const asteroids: Asteroid[] = [];
    for (let i = 0; i < count; i++) {
        // Spawn away from center
        let x, y;
        do {
            x = Math.random() * W;
            y = Math.random() * H;
        } while (dist(x, y, W / 2, H / 2) < 120);
        asteroids.push(spawnAsteroid(i, x, y, 0));
    }
    return asteroids;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function Asteroids() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rafRef = useRef<number>(0);
    const frameRef = useRef(0);

    // Game state as refs (avoids stale closures in game loop)
    const shipRef = useRef<Ship>({
        x: W / 2, y: H / 2, vx: 0, vy: 0,
        angle: -Math.PI / 2, thrusting: false, invTimer: INVINCIBLE_FRAMES, dead: false,
    });
    const bulletsRef = useRef<Bullet[]>([]);
    const asteroidsRef = useRef<Asteroid[]>([]);
    const ufoRef = useRef<UFO>({ x: 0, y: 0, vx: 0, vy: 0, active: false, fireTimer: 0, small: false, radius: 20 });
    const particlesRef = useRef<Particle[]>([]);
    const ufoCountRef = useRef(0);
    const nextIdRef = useRef(100);

    // Reactive state for UI
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [level, setLevel] = useState(1);
    const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'DEAD' | 'GAMEOVER'>('START');
    const [showLeadForm, setShowLeadForm] = useState(false);
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Synced refs
    const scoreRef = useRef(0);
    const livesRef = useRef(3);
    const levelRef = useRef(1);
    const gameStateRef = useRef<'START' | 'PLAYING' | 'DEAD' | 'GAMEOVER'>('START');
    const highScoreRef = useRef(0);

    // Controls
    const keysRef = useRef({ left: false, right: false, thrust: false });
    const lastFireRef = useRef(0);
    const lastHyperspaceRef = useRef(0);

    // Stars (static)
    const starsRef = useRef<{ x: number; y: number; r: number; a: number }[]>(
        Array.from({ length: 80 }, () => ({
            x: Math.random() * W,
            y: Math.random() * H,
            r: Math.random() * 1.5,
            a: 0.3 + Math.random() * 0.7,
        }))
    );

    // ─── Init ───────────────────────────────────────────────────────────────
    const resetShip = () => {
        shipRef.current = {
            x: W / 2, y: H / 2, vx: 0, vy: 0,
            angle: -Math.PI / 2, thrusting: false,
            invTimer: INVINCIBLE_FRAMES, dead: false,
        };
    };

    const startLevel = useCallback((lvl: number) => {
        asteroidsRef.current = initLevel(lvl);
        bulletsRef.current = [];
        ufoRef.current.active = false;
        ufoCountRef.current = 0;
        frameRef.current = 0;
        particlesRef.current = [];
        resetShip();
    }, []);

    const startGame = useCallback(() => {
        scoreRef.current = 0;
        livesRef.current = 3;
        levelRef.current = 1;
        gameStateRef.current = 'PLAYING';
        setScore(0);
        setLives(3);
        setLevel(1);
        setGameState('PLAYING');
        setShowLeadForm(false);
        startLevel(1);
    }, [startLevel]);

    // ─── Explosions ─────────────────────────────────────────────────────────
    const explode = (x: number, y: number, count: number, color = '#FFD700') => {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 0.5 + Math.random() * 3;
            particlesRef.current.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 40 + Math.random() * 30,
                maxLife: 70,
                color,
            });
        }
    };

    // ─── Fire ───────────────────────────────────────────────────────────────
    const fireBullet = useCallback(() => {
        const now = Date.now();
        if (now - lastFireRef.current < FIRE_COOLDOWN) return;
        const ship = shipRef.current;
        if (ship.dead || gameStateRef.current !== 'PLAYING') return;
        const active = bulletsRef.current.filter(b => !b.fromUFO);
        if (active.length >= MAX_BULLETS) return;
        lastFireRef.current = now;
        bulletsRef.current.push({
            x: ship.x + Math.cos(ship.angle) * 16,
            y: ship.y + Math.sin(ship.angle) * 16,
            vx: Math.cos(ship.angle) * BULLET_SPEED + ship.vx * 0.3,
            vy: Math.sin(ship.angle) * BULLET_SPEED + ship.vy * 0.3,
            life: BULLET_LIFE,
            fromUFO: false,
        });
    }, []);

    // ─── Hyperspace ─────────────────────────────────────────────────────────
    const hyperspace = useCallback(() => {
        const now = Date.now();
        if (now - lastHyperspaceRef.current < 2000) return;
        if (gameStateRef.current !== 'PLAYING') return;
        lastHyperspaceRef.current = now;
        const ship = shipRef.current;
        ship.x = 50 + Math.random() * (W - 100);
        ship.y = 50 + Math.random() * (H - 100);
        ship.vx = 0;
        ship.vy = 0;
        ship.invTimer = 60;
        explode(ship.x, ship.y, 10, '#00FFFF');
    }, []);

    // ─── Game Loop ──────────────────────────────────────────────────────────
    const gameLoop = useCallback(() => {
        if (gameStateRef.current !== 'PLAYING') return;

        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;

        frameRef.current++;

        const ship = shipRef.current;
        const keys = keysRef.current;

        // ─ Update ship ─
        if (!ship.dead) {
            if (keys.left) ship.angle -= ROTATION_SPEED;
            if (keys.right) ship.angle += ROTATION_SPEED;
            ship.thrusting = keys.thrust;
            if (ship.thrusting) {
                ship.vx += Math.cos(ship.angle) * THRUST;
                ship.vy += Math.sin(ship.angle) * THRUST;
            }
            // Max speed cap
            const spd = Math.sqrt(ship.vx ** 2 + ship.vy ** 2);
            if (spd > 7) { ship.vx = (ship.vx / spd) * 7; ship.vy = (ship.vy / spd) * 7; }
            ship.vx *= FRICTION;
            ship.vy *= FRICTION;
            ship.x = wrap(ship.x + ship.vx, W);
            ship.y = wrap(ship.y + ship.vy, H);
            if (ship.invTimer > 0) ship.invTimer--;
        }

        // ─ Update bullets ─
        bulletsRef.current = bulletsRef.current.filter(b => b.life > 0).map(b => ({
            ...b,
            x: wrap(b.x + b.vx, W),
            y: wrap(b.y + b.vy, H),
            life: b.life - 1,
        }));

        // ─ Update asteroids ─
        asteroidsRef.current = asteroidsRef.current.map(a => ({
            ...a,
            x: wrap(a.x + a.vx, W),
            y: wrap(a.y + a.vy, H),
            angle: a.angle + a.spin,
        }));

        // ─ UFO Logic ─
        const ufo = ufoRef.current;
        if (!ufo.active) {
            ufoCountRef.current++;
            if (ufoCountRef.current >= UFO_INTERVAL) {
                ufoCountRef.current = 0;
                const small = scoreRef.current > 10000;
                ufoRef.current = {
                    x: Math.random() < 0.5 ? -20 : W + 20,
                    y: 50 + Math.random() * (H - 100),
                    vx: ufo.x < 0 ? 2.5 : -2.5,
                    vy: (Math.random() - 0.5) * 1.5,
                    active: true,
                    fireTimer: 60,
                    small,
                    radius: small ? 14 : 22,
                };
            }
        } else {
            ufo.x = wrap(ufo.x + ufo.vx, W + 60) - 30;
            ufo.y += ufo.vy;
            if (ufo.y < 20 || ufo.y > H - 20) ufo.vy *= -1;
            ufo.y = Math.max(20, Math.min(H - 20, ufo.y));

            ufo.fireTimer--;
            if (ufo.fireTimer <= 0) {
                ufo.fireTimer = ufo.small ? 70 : 100;
                const angle = ufo.small
                    ? Math.atan2(ship.y - ufo.y, ship.x - ufo.x) + (Math.random() - 0.5) * 0.3
                    : Math.random() * Math.PI * 2;
                bulletsRef.current.push({
                    x: ufo.x, y: ufo.y,
                    vx: Math.cos(angle) * 5.5,
                    vy: Math.sin(angle) * 5.5,
                    life: BULLET_LIFE + 10,
                    fromUFO: true,
                });
            }

            if (ufo.x < -50 || ufo.x > W + 50) ufo.active = false;
        }

        // ─ Collisions: bullet vs asteroid ─
        let asteroidsToAdd: Asteroid[] = [];
        let scoreGain = 0;

        bulletsRef.current = bulletsRef.current.filter(bullet => {
            if (bullet.fromUFO) return true;
            let hit = false;
            asteroidsRef.current = asteroidsRef.current.filter(a => {
                if (hit) return true;
                if (dist(bullet.x, bullet.y, a.x, a.y) < a.radius) {
                    hit = true;
                    explode(a.x, a.y, a.size === 0 ? 12 : a.size === 1 ? 8 : 5);
                    const pts = [20, 50, 100];
                    scoreGain += pts[a.size];
                    if (a.size < 2) {
                        const newSize = (a.size + 1) as 0 | 1 | 2;
                        const count = a.size === 0 ? 2 : 2;
                        for (let i = 0; i < count; i++) {
                            const id = nextIdRef.current++;
                            asteroidsToAdd.push(spawnAsteroid(id, a.x, a.y, newSize));
                        }
                    }
                    return false;
                }
                return true;
            });
            return !hit;
        });

        // bullet vs UFO
        if (ufo.active) {
            bulletsRef.current = bulletsRef.current.filter(b => {
                if (!b.fromUFO && dist(b.x, b.y, ufo.x, ufo.y) < ufo.radius + 6) {
                    explode(ufo.x, ufo.y, 20, '#FF6600');
                    scoreGain += ufo.small ? 1000 : 200;
                    ufo.active = false;
                    return false;
                }
                return true;
            });
        }

        if (scoreGain > 0) {
            scoreRef.current += scoreGain;
            setScore(scoreRef.current);
            if (scoreRef.current > highScoreRef.current) {
                highScoreRef.current = scoreRef.current;
                setHighScore(scoreRef.current);
                localStorage.setItem('asteroids-high', scoreRef.current.toString());
            }
        }

        asteroidsRef.current = [...asteroidsRef.current, ...asteroidsToAdd];

        // ─ Collision: ship vs asteroid/ufo/ufobullet ─
        if (!ship.dead && ship.invTimer === 0) {
            let shipHit = false;
            const SHIP_R = 10;

            for (const a of asteroidsRef.current) {
                if (dist(ship.x, ship.y, a.x, a.y) < a.radius + SHIP_R) { shipHit = true; break; }
            }
            if (!shipHit && ufo.active && dist(ship.x, ship.y, ufo.x, ufo.y) < ufo.radius + SHIP_R) shipHit = true;
            if (!shipHit) {
                for (const b of bulletsRef.current) {
                    if (b.fromUFO && dist(ship.x, ship.y, b.x, b.y) < SHIP_R + 4) { shipHit = true; break; }
                }
            }

            if (shipHit) {
                explode(ship.x, ship.y, 25, '#FF4444');
                explode(ship.x, ship.y, 10, '#FFFFFF');
                ship.dead = true;
                const nextLives = livesRef.current - 1;
                livesRef.current = nextLives;
                setLives(nextLives);
                if (nextLives <= 0) {
                    setTimeout(() => {
                        gameStateRef.current = 'GAMEOVER';
                        setGameState('GAMEOVER');
                        setShowLeadForm(true);
                    }, 1200);
                } else {
                    setTimeout(() => {
                        resetShip();
                    }, 1500);
                }
            }
        }

        // ─ Level clear ─
        if (asteroidsRef.current.length === 0 && !ufo.active) {
            const nextLvl = levelRef.current + 1;
            levelRef.current = nextLvl;
            setLevel(nextLvl);
            setTimeout(() => startLevel(nextLvl), 1200);
        }

        // ─ Update particles ─
        particlesRef.current = particlesRef.current
            .map(p => ({ ...p, x: p.x + p.vx, y: p.y + p.vy, life: p.life - 1, vx: p.vx * 0.96, vy: p.vy * 0.96 }))
            .filter(p => p.life > 0);

        // ════════════════════════════════
        // ─ DRAW ─
        // ════════════════════════════════
        ctx.fillStyle = '#000008';
        ctx.fillRect(0, 0, W, H);

        // Stars
        starsRef.current.forEach(s => {
            ctx.globalAlpha = s.a;
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.globalAlpha = 1;

        // Particles
        particlesRef.current.forEach(p => {
            const alpha = p.life / p.maxLife;
            ctx.globalAlpha = alpha;
            ctx.strokeStyle = p.color;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x - p.vx * 3, p.y - p.vy * 3);
            ctx.stroke();
        });
        ctx.globalAlpha = 1;

        // Asteroids
        asteroidsRef.current.forEach(a => {
            ctx.save();
            ctx.translate(a.x, a.y);
            ctx.rotate(a.angle);
            ctx.strokeStyle = '#AAAAFF';
            ctx.lineWidth = 1.5;
            ctx.shadowColor = '#6666FF';
            ctx.shadowBlur = 4;
            ctx.beginPath();
            a.verts.forEach((v, i) => {
                if (i === 0) ctx.moveTo(v.x, v.y);
                else ctx.lineTo(v.x, v.y);
            });
            ctx.closePath();
            ctx.stroke();
            ctx.restore();
        });

        // UFO
        if (ufo.active) {
            ctx.save();
            ctx.translate(ufo.x, ufo.y);
            ctx.strokeStyle = '#FF9900';
            ctx.lineWidth = 2;
            ctx.shadowColor = '#FF9900';
            ctx.shadowBlur = 8;
            const r = ufo.radius;
            ctx.beginPath();
            ctx.ellipse(0, 0, r, r * 0.45, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.ellipse(0, -r * 0.3, r * 0.55, r * 0.35, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
        }

        // Bullets
        bulletsRef.current.forEach(b => {
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.fromUFO ? 2.5 : 2, 0, Math.PI * 2);
            ctx.fillStyle = b.fromUFO ? '#FF4444' : '#FFFF00';
            ctx.shadowColor = b.fromUFO ? '#FF4444' : '#FFFF00';
            ctx.shadowBlur = 6;
            ctx.fill();
            ctx.shadowBlur = 0;
        });

        // Ship
        if (!ship.dead) {
            const blink = ship.invTimer > 0 && Math.floor(ship.invTimer / 6) % 2 === 0;
            if (!blink) {
                ctx.save();
                ctx.translate(ship.x, ship.y);
                ctx.rotate(ship.angle);
                ctx.strokeStyle = '#00FFFF';
                ctx.lineWidth = 2;
                ctx.shadowColor = '#00FFFF';
                ctx.shadowBlur = 10;
                ctx.beginPath();
                ctx.moveTo(18, 0);
                ctx.lineTo(-11, 11);
                ctx.lineTo(-7, 0);
                ctx.lineTo(-11, -11);
                ctx.closePath();
                ctx.stroke();

                if (ship.thrusting && frameRef.current % 4 < 3) {
                    ctx.strokeStyle = '#FF6600';
                    ctx.shadowColor = '#FF6600';
                    ctx.shadowBlur = 14;
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(-7, 5);
                    ctx.lineTo(-18 - Math.random() * 8, 0);
                    ctx.lineTo(-7, -5);
                    ctx.stroke();
                }
                ctx.restore();
            }
        }

        rafRef.current = requestAnimationFrame(gameLoop);
    }, [startLevel]);

    // ─── RAF lifecycle ───────────────────────────────────────────────────────
    useEffect(() => {
        if (gameState === 'PLAYING') {
            rafRef.current = requestAnimationFrame(gameLoop);
        } else {
            cancelAnimationFrame(rafRef.current);
        }
        return () => cancelAnimationFrame(rafRef.current);
    }, [gameState, gameLoop]);

    // ─── Load high score ─────────────────────────────────────────────────────
    useEffect(() => {
        const saved = localStorage.getItem('asteroids-high');
        if (saved) {
            highScoreRef.current = parseInt(saved);
            setHighScore(parseInt(saved));
        }
    }, []);

    // ─── Keyboard ────────────────────────────────────────────────────────────
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') keysRef.current.left = true;
            if (e.key === 'ArrowRight') keysRef.current.right = true;
            if (e.key === 'ArrowUp') keysRef.current.thrust = true;
            if (e.key === ' ') { e.preventDefault(); fireBullet(); }
            if (e.key === 'z' || e.key === 'Z') hyperspace();
        };
        const up = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') keysRef.current.left = false;
            if (e.key === 'ArrowRight') keysRef.current.right = false;
            if (e.key === 'ArrowUp') keysRef.current.thrust = false;
        };
        window.addEventListener('keydown', down);
        window.addEventListener('keyup', up);
        return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); };
    }, [fireBullet, hyperspace]);

    // ─── Lead Capture ────────────────────────────────────────────────────────
    const submitLead = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await fetch('/api/lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, score: scoreRef.current, level: levelRef.current, game: 'asteroids', source: 'Asteroids Game' }),
            });
            setShowLeadForm(false);
            setGameState('START');
        } catch { /* silent */ } finally {
            setIsSubmitting(false);
        }
    };

    // ─── Touch Button Helpers ────────────────────────────────────────────────
    const makeHoldBtn = (key: 'left' | 'right' | 'thrust') => ({
        onTouchStart: (e: React.TouchEvent) => { e.preventDefault(); keysRef.current[key] = true; },
        onTouchEnd:   (e: React.TouchEvent) => { e.preventDefault(); keysRef.current[key] = false; },
        onMouseDown:  () => { keysRef.current[key] = true; },
        onMouseUp:    () => { keysRef.current[key] = false; },
        onMouseLeave: () => { keysRef.current[key] = false; },
    });

    // ─── Draw idle frame on START / GAMEOVER ─────────────────────────────────
    useEffect(() => {
        if (gameState !== 'START' && gameState !== 'GAMEOVER') return;
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;
        ctx.fillStyle = '#000008';
        ctx.fillRect(0, 0, W, H);
        starsRef.current.forEach(s => {
            ctx.globalAlpha = s.a;
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.globalAlpha = 1;
    }, [gameState]);

    // ─── Render ───────────────────────────────────────────────────────────────
    const btnBase = 'flex items-center justify-center rounded-2xl border-2 select-none font-bold text-xs tracking-widest uppercase transition-all active:scale-90 active:brightness-110 h-full';

    return (
        <div className="flex flex-col items-center bg-black w-full max-w-md mx-auto select-none touch-none overflow-hidden shadow-2xl rounded-3xl border-4 border-gray-900">
            {/* ─ HUD ─ */}
            <div className="w-full flex justify-between items-center px-4 py-3">
                <div className="flex flex-col">
                    <span className="text-gray-600 text-[9px] uppercase tracking-widest">Score</span>
                    <span className="text-yellow-400 font-black text-lg leading-none">{score.toString().padStart(6, '0')}</span>
                </div>
                <div className="flex gap-1 items-center">
                    {[...Array(Math.max(0, lives))].map((_, i) => (
                        <svg key={i} viewBox="-12 -14 24 28" width="14" height="18" className="fill-none stroke-cyan-400" strokeWidth="2">
                            <polygon points="0,-13 10,10 -10,10" />
                        </svg>
                    ))}
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-gray-600 text-[9px] uppercase tracking-widest">HI-SCORE</span>
                    <span className="text-white font-black text-lg leading-none">{highScore.toString().padStart(6, '0')}</span>
                </div>
            </div>

            {/* ─ Level Badge ─ */}
            <div className="flex items-center gap-2 mb-1">
                <div className="h-px w-8 bg-gray-800" />
                <span className="text-purple-500 text-[10px] font-bold uppercase tracking-[0.2em]">Wave {level}</span>
                <div className="h-px w-8 bg-gray-800" />
            </div>

            {/* ─ Canvas ─ */}
            <div className="relative w-full border-t-2 border-b-2 border-gray-900">
                <canvas
                    ref={canvasRef}
                    width={W}
                    height={H}
                    className="w-full h-auto block"
                />

                {/* START overlay */}
                {gameState === 'START' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-500">
                        <h1 className="text-6xl font-black text-white mb-1 tracking-tighter drop-shadow-[0_0_20px_rgba(0,200,255,0.6)]">
                            ASTEROIDS
                        </h1>
                        <p className="text-cyan-500 text-xs font-bold uppercase tracking-[0.3em] mb-10">Arcade Edition</p>
                        <button
                            onClick={startGame}
                            className="px-12 py-4 bg-transparent border-2 border-cyan-500 text-cyan-400 rounded-full text-lg font-black uppercase tracking-widest hover:bg-cyan-500/10 transition-all hover:shadow-[0_0_20px_rgba(0,200,255,0.3)] active:scale-95"
                        >
                            Insert Coin
                        </button>
                        <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-1 text-gray-500 text-[10px] uppercase tracking-wider">
                            <span>◀ ▶  Rotate</span>
                            <span>▲  Thrust</span>
                            <span>🔥  Fire</span>
                            <span>⚡  Hyperspace</span>
                        </div>
                    </div>
                )}

                {/* GAME OVER overlay */}
                {gameState === 'GAMEOVER' && showLeadForm && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md p-6 animate-in zoom-in duration-400">
                        <h2 className="text-5xl font-black text-red-500 mb-1 tracking-tight drop-shadow-[0_0_14px_rgba(255,60,60,0.5)] italic">
                            GAME OVER
                        </h2>
                        <div className="flex gap-6 my-5">
                            <div className="text-center">
                                <div className="text-gray-500 text-[9px] uppercase tracking-widest">Score</div>
                                <div className="text-yellow-400 text-2xl font-black">{score}</div>
                            </div>
                            <div className="w-px bg-gray-800" />
                            <div className="text-center">
                                <div className="text-gray-500 text-[9px] uppercase tracking-widest">Wave</div>
                                <div className="text-purple-400 text-2xl font-black">{level}</div>
                            </div>
                        </div>
                        <p className="text-white text-sm mb-5 text-center leading-relaxed">
                            Save your score & unlock <span className="text-cyan-400 font-bold">exclusive offers</span>!
                        </p>
                        <form onSubmit={submitLead} className="w-full max-w-xs space-y-3">
                            <input
                                type="email"
                                required
                                placeholder="your@email.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-xl text-white focus:outline-none focus:border-cyan-500 transition-colors text-sm"
                            />
                            <button type="submit" disabled={isSubmitting}
                                className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-700 text-white rounded-xl font-bold uppercase tracking-widest text-sm transition-all active:scale-95 flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</> : 'Save Score'}
                            </button>
                            <button type="button" onClick={() => setGameState('START')}
                                className="w-full py-2 text-gray-600 text-[10px] uppercase tracking-tight hover:text-white transition-colors"
                            >Skip</button>
                        </form>
                    </div>
                )}
            </div>

            {/* ─ Mobile Controls ─ */}
            <div className="w-full px-3 py-4" style={{ touchAction: 'none' }}>
                <div className="grid grid-cols-5 gap-2 h-20">
                    {/* Rotate Left */}
                    <button
                        className={`${btnBase} col-span-1 border-gray-700 text-gray-300 bg-gray-900/80`}
                        style={{ touchAction: 'none' }}
                        {...makeHoldBtn('left')}
                        aria-label="Rotate Left"
                    >
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <path d="M15 6l-6 6 6 6" />
                        </svg>
                    </button>

                    {/* Thrust */}
                    <button
                        className={`${btnBase} col-span-1 border-orange-800 text-orange-400 bg-orange-900/20`}
                        style={{ touchAction: 'none' }}
                        {...makeHoldBtn('thrust')}
                        aria-label="Thrust"
                    >
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <path d="M12 19V5M5 12l7-7 7 7" />
                        </svg>
                    </button>

                    {/* Hyperspace */}
                    <button
                        className={`${btnBase} col-span-1 border-purple-700 text-purple-400 bg-purple-900/20`}
                        style={{ touchAction: 'none' }}
                        onTouchStart={e => { e.preventDefault(); hyperspace(); }}
                        onMouseDown={hyperspace}
                        aria-label="Hyperspace"
                    >
                        <span className="text-lg">⚡</span>
                    </button>

                    {/* Thrust Right space placeholder → Fire */}
                    <button
                        className={`${btnBase} col-span-1 border-yellow-700 text-yellow-400 bg-yellow-900/20`}
                        style={{ touchAction: 'none' }}
                        onTouchStart={e => { e.preventDefault(); fireBullet(); }}
                        onMouseDown={fireBullet}
                        aria-label="Fire"
                    >
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                            <circle cx="12" cy="12" r="4" />
                            <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </button>

                    {/* Rotate Right */}
                    <button
                        className={`${btnBase} col-span-1 border-gray-700 text-gray-300 bg-gray-900/80`}
                        style={{ touchAction: 'none' }}
                        {...makeHoldBtn('right')}
                        aria-label="Rotate Right"
                    >
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <path d="M9 6l6 6-6 6" />
                        </svg>
                    </button>
                </div>

                {/* Legend */}
                <div className="flex justify-between mt-2 px-1">
                    <span className="text-gray-700 text-[9px] uppercase tracking-widest text-center w-1/5">Rotate</span>
                    <span className="text-orange-800 text-[9px] uppercase tracking-widest text-center w-1/5">Thrust</span>
                    <span className="text-purple-800 text-[9px] uppercase tracking-widest text-center w-1/5">Hyper</span>
                    <span className="text-yellow-800 text-[9px] uppercase tracking-widest text-center w-1/5">Fire</span>
                    <span className="text-gray-700 text-[9px] uppercase tracking-widest text-center w-1/5">Rotate</span>
                </div>
            </div>
        </div>
    );
}

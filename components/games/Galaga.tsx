'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Trophy, Play, Pause, RotateCcw, Mail, Send, CheckCircle2, Rocket, Zap, Circle, ShieldAlert, Heart, Star } from 'lucide-react';

// Game Constants
const CANVAS_WIDTH = 320;
const CANVAS_HEIGHT = 500;
const PLAYER_SPEED = 4.8;
const BULLET_SPEED = 10;
const ENEMY_BULLET_SPEED = 4.0;
const FIRE_RATE = 160; // ms

enum EnemyState {
    ENTRY,
    FORMATION,
    DIVING,
    TRACTOR_BEAM,
    CHALLENGE,
    EXITING
}

interface Entity {
    x: number;
    y: number;
    width: number;
    height: number;
    active: boolean;
}

interface Enemy extends Entity {
    id: number;
    type: number; // 0: Boss (Green/Blue hit), 1: Red, 2: Bee (Yellow/White)
    hp: number;
    state: EnemyState;
    angle: number;
    homeX: number;
    homeY: number;
    pathPoints: {x: number, y: number}[];
    pathIndex: number;
    diveStep: number;
    fireTimer: number;
    capturedShip?: boolean;
}

interface Particle extends Entity {
    vx: number;
    vy: number;
    life: number;
    color: string;
}

export default function Galaga() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const joystickHandleRef = useRef<HTMLDivElement>(null);
    
    // Game State
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [paused, setPaused] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [email, setEmail] = useState('');
    const [level, setLevel] = useState(1);
    const [lives, setLives] = useState(3);
    const [isDual, setIsDual] = useState(false);
    const [isCapturing, setIsCapturing] = useState(false);
    const [isChallenging, setIsChallenging] = useState(false);
    const [enemiesKilledInChallenge, setEnemiesKilledInChallenge] = useState(0);
    const [showChallengeBonus, setShowChallengeBonus] = useState(false);
    const [levelStartTimer, setLevelStartTimer] = useState(120);

    // Refs
    const playerX = useRef(CANVAS_WIDTH / 2 - 15);
    const playerTargetDir = useRef(0);
    const bullets = useRef<Entity[]>([]);
    const enemyBullets = useRef<Entity[]>([]);
    const enemies = useRef<Enemy[]>([]);
    const particles = useRef<Particle[]>([]);
    const lastFireTime = useRef(0);
    const animationRef = useRef<number>(0);
    const stars = useRef<{x: number, y: number, s: number, c: string}[]>([]);
    const gameTime = useRef(0);
    const tractorBeamOpacity = useRef(0);

    // Initialize Stars with colors
    useEffect(() => {
        const colors = ['#ffffff', '#ff4444', '#4444ff', '#ffff44'];
        stars.current = Array.from({ length: 100 }, () => ({
            x: Math.random() * CANVAS_WIDTH,
            y: Math.random() * CANVAS_HEIGHT,
            s: Math.random() * 1.5 + 0.5,
            c: colors[Math.floor(Math.random() * colors.length)]
        }));
    }, []);

    const generatePath = (startX: number, homeX: number, homeY: number, variant = 0) => {
        const points = [];
        const steps = 100;
        for (let i = 0; i <= steps; i++) {
            const t = i / steps;
            if (variant === 3) { // Challenging Stage looping path
                const angle = t * Math.PI * 4;
                const r = 100 * (1 - t/1.5);
                const x = CANVAS_WIDTH/2 + Math.cos(angle) * r;
                const y = -50 + t * 700;
                points.push({ x, y });
            } else {
                // Classic entry curve
                const side = startX < CANVAS_WIDTH/2 ? 1 : -1;
                const x = startX + (homeX - startX) * t + Math.sin(t * Math.PI * 2) * 60 * side;
                const y = -50 + (homeY + 50) * t + Math.cos(t * Math.PI) * 30;
                points.push({ x, y });
            }
        }
        return points;
    };

    const spawnEnemies = useCallback((lvl: number) => {
        const isChallenge = (lvl % 4 === 3);
        setIsChallenging(isChallenge);
        setEnemiesKilledInChallenge(0);
        setShowChallengeBonus(false);
        setLevelStartTimer(120);
        
        const newEnemies: Enemy[] = [];
        const layout = isChallenge ? 
            [{ type: 1, rows: 5, hp: 1, score: 100 }] : 
            [
                { type: 0, rows: 1, hp: 2, score: 400 }, // Boss
                { type: 1, rows: 1, hp: 1, score: 160 }, // Red
                { type: 2, rows: 2, hp: 1, score: 80 }   // Bee
            ];
        
        let idCounter = 0;
        let currentRow = 0;
        layout.forEach(group => {
            for (let r = 0; r < group.rows; r++) {
                const count = 8;
                for (let c = 0; c < count; c++) {
                    const homeX = 35 + c * 35;
                    const homeY = 70 + currentRow * 28;
                    const startX = (currentRow + c) % 2 === 0 ? -60 : CANVAS_WIDTH + 60;
                    const state = isChallenge ? EnemyState.CHALLENGE : EnemyState.ENTRY;
                    
                    newEnemies.push({
                        id: idCounter++,
                        x: startX,
                        y: -50,
                        homeX,
                        homeY,
                        width: 24,
                        height: 20,
                        active: true,
                        type: group.type,
                        hp: group.hp,
                        state,
                        angle: 0,
                        diveStep: 0,
                        fireTimer: Math.random() * 200 + 100,
                        pathPoints: generatePath(startX, homeX, homeY, isChallenge ? 3 : 0),
                        pathIndex: -(idCounter * 4) 
                    });
                }
                currentRow++;
            }
        });
        enemies.current = newEnemies;
    }, []);

    // Load High Score & Initialize
    useEffect(() => {
        const saved = localStorage.getItem('galaga-high-score');
        if (saved) setHighScore(parseInt(saved));
        spawnEnemies(1);
    }, [spawnEnemies]);

    const createExplosion = (x: number, y: number, color: string, count = 12) => {
        for (let i = 0; i < count; i++) {
            particles.current.push({
                x, y, vx: (Math.random() - 0.5) * 8, vy: (Math.random() - 0.5) * 8,
                life: 1.0, width: 2, height: 2, active: true, color
            });
        }
    };


    const resetGame = () => {
        playerX.current = CANVAS_WIDTH / 2 - 15;
        bullets.current = [];
        enemyBullets.current = [];
        particles.current = [];
        setScore(0);
        setLevel(1);
        setLives(3);
        setIsDual(false);
        setGameOver(false);
        setPaused(false);
        setIsSubmitted(false);
        setIsCapturing(false);
        spawnEnemies(1);
    };

    const fireBullet = () => {
        const now = Date.now();
        if (now - lastFireTime.current > FIRE_RATE && !paused && !gameOver && !isCapturing && levelStartTimer <= 0) {
            if (isDual) {
                bullets.current.push(
                    { x: playerX.current - 4, y: CANVAS_HEIGHT - 65, width: 3, height: 10, active: true },
                    { x: playerX.current + 27, y: CANVAS_HEIGHT - 65, width: 3, height: 10, active: true }
                );
            } else {
                bullets.current.push({ x: playerX.current + 13, y: CANVAS_HEIGHT - 65, width: 3, height: 10, active: true });
            }
            lastFireTime.current = now;
        }
    };

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setIsSubmitting(true);
        try {
            await fetch('/api/lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, game: 'Galaga Arcade Pro', score, highScore, level })
            });
            setIsSubmitted(true);
        } catch (error) {
            setIsSubmitted(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleHit = () => {
        if (isDual) {
            setIsDual(false);
            createExplosion(playerX.current, CANVAS_HEIGHT - 50, '#60a5fa', 15);
            return;
        }
        if (lives > 1) {
            setLives(l => l - 1);
            playerX.current = CANVAS_WIDTH / 2 - 15;
            createExplosion(playerX.current + 15, CANVAS_HEIGHT - 50, '#ffffff', 20);
            setLevelStartTimer(60); // Quick reset pause
        } else {
            setGameOver(true);
            createExplosion(playerX.current + 15, CANVAS_HEIGHT - 50, '#ffffff', 30);
        }
    };

    const update = useCallback(() => {
        if (paused || gameOver) return;
        gameTime.current++;

        if (levelStartTimer > 0) {
            setLevelStartTimer(t => t - 1);
            return;
        }

        if (!isCapturing) {
            playerX.current += playerTargetDir.current * PLAYER_SPEED;
            if (playerX.current < 5) playerX.current = 5;
            const barrier = CANVAS_WIDTH - (isDual ? 67 : 37);
            if (playerX.current > barrier) playerX.current = barrier;
        }

        bullets.current.forEach(b => {
            b.y -= BULLET_SPEED;
            if (b.y < -20) b.active = false;
        });
        bullets.current = bullets.current.filter(b => b.active);

        enemyBullets.current.forEach(b => {
            b.y += ENEMY_BULLET_SPEED;
            if (b.y > CANVAS_HEIGHT + 20) b.active = false;
            const px = playerX.current + (isDual ? 32 : 16);
            const range = isDual ? 32 : 16;
            if (Math.abs(b.x - px) < range && Math.abs(b.y - (CANVAS_HEIGHT - 50)) < 15) {
                b.active = false;
                handleHit();
            }
        });
        enemyBullets.current = enemyBullets.current.filter(b => b.active);

        let activeCount = 0;
        const formationOffset = Math.sin(gameTime.current * 0.05) * 30;

        enemies.current.forEach(e => {
            if (!e.active) return;
            activeCount++;
            
            if (e.state === EnemyState.CHALLENGE) {
                if (e.pathIndex >= 0 && e.pathIndex < e.pathPoints.length) {
                    const p = e.pathPoints[e.pathIndex];
                    e.x = p.x;
                    e.y = p.y;
                }
                e.pathIndex++;
                if (e.pathIndex > e.pathPoints.length) e.active = false;
            } else if (e.state === EnemyState.ENTRY) {
                if (e.pathIndex < e.pathPoints.length) {
                    if (e.pathIndex >= 0) {
                        const p = e.pathPoints[e.pathIndex];
                        e.x = p.x;
                        e.y = p.y;
                    }
                    e.pathIndex++;
                } else {
                    e.state = EnemyState.FORMATION;
                }
            } else if (e.state === EnemyState.FORMATION) {
                const targetX = e.homeX + formationOffset;
                const targetY = e.homeY;
                e.x += (targetX - e.x) * 0.1;
                e.y += (targetY - e.y) * 0.1;
                if (Math.random() < 0.001 * level && e.y > 0) {
                    if (e.type === 0 && Math.random() < 0.4 && !isDual && !isCapturing) {
                        e.state = EnemyState.TRACTOR_BEAM;
                        e.diveStep = 0;
                    } else {
                        e.state = EnemyState.DIVING;
                        e.diveStep = 0;
                    }
                }
            } else if (e.state === EnemyState.DIVING) {
                e.diveStep += 0.02;
                e.y += 4.2 + level * 0.4;
                e.x += Math.sin(e.diveStep * 10) * 6;
                if (gameTime.current % 35 === 0) {
                    enemyBullets.current.push({ x: e.x + 10, y: e.y + 20, width: 4, height: 8, active: true });
                }
                if (e.y > CANVAS_HEIGHT) {
                    e.y = -40;
                    e.state = EnemyState.FORMATION;
                    e.pathIndex = 0;
                }
            } else if (e.state === EnemyState.TRACTOR_BEAM) {
                if (e.y < 160) e.y += 2.8;
                else {
                    tractorBeamOpacity.current = Math.min(1, tractorBeamOpacity.current + 0.04);
                    const beamX = e.x + 12;
                    if (Math.abs(playerX.current + 15 - beamX) < 25 && !isCapturing) setIsCapturing(true);
                    if (isCapturing) {
                        playerX.current += (beamX - 15 - playerX.current) * 0.08;
                        if (Math.abs(playerX.current + 15 - beamX) < 4) {
                            e.capturedShip = true;
                            e.state = EnemyState.FORMATION;
                            setIsCapturing(false);
                            tractorBeamOpacity.current = 0;
                            if (lives > 1) {
                                setLives(l => l - 1);
                                playerX.current = CANVAS_WIDTH / 2 - 15;
                                setLevelStartTimer(40);
                            } else setGameOver(true);
                        }
                    }
                    e.diveStep++;
                    if (e.diveStep > 200 && !isCapturing) {
                        e.state = EnemyState.FORMATION;
                        tractorBeamOpacity.current = 0;
                    }
                }
            }

            if (!isCapturing && Math.abs(e.x - playerX.current) < 22 && Math.abs(e.y - (CANVAS_HEIGHT - 65)) < 22) handleHit();

            bullets.current.forEach(b => {
                if (b.active && Math.abs(b.x - (e.x + 12)) < 16 && Math.abs(b.y - (e.y + 10)) < 16) {
                    e.hp--;
                    b.active = false;
                    if (e.hp <= 0) {
                        e.active = false;
                        const baseScore = e.type === 0 ? 400 : (e.type === 1 ? 160 : 80);
                        const multiplier = (e.state === EnemyState.DIVING || e.state === EnemyState.CHALLENGE) ? 2 : 1;
                        setScore(s => s + baseScore * multiplier);
                        createExplosion(e.x + 12, e.y + 10, e.type === 0 ? '#4ade80' : (e.type === 1 ? '#f87171' : '#3b82f6'));
                        
                        if (isChallenging) setEnemiesKilledInChallenge(k => k + 1);
                        if (e.capturedShip) {
                            setIsDual(true);
                            setScore(s => s + 1000);
                        }
                    }
                }
            });
        });

        particles.current.forEach(p => {
            p.x += p.vx; p.y += p.vy; p.life -= 0.03;
            if (p.life <= 0) p.active = false;
        });
        particles.current = particles.current.filter(p => p.active);

        // Level End Logic
        if (activeCount === 0 && !gameOver && enemies.current.length > 0) {
            if (isChallenging && !showChallengeBonus) {
                setShowChallengeBonus(true);
                if (enemiesKilledInChallenge === 40) setScore(s => s + 10000);
                setTimeout(() => {
                    setLevel(l => l + 1);
                    spawnEnemies(level + 1);
                }, 2000);
            } else if (!isChallenging) {
                setLevel(l => l + 1);
                spawnEnemies(level + 1);
            }
        }

        if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('galaga-high-score', score.toString());
        }
    }, [paused, gameOver, level, score, highScore, spawnEnemies, lives, isDual, isCapturing, isChallenging, enemiesKilledInChallenge, showChallengeBonus, levelStartTimer]);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return;
        
        update();

        // Clear Background
        ctx.fillStyle = '#010411';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Starfield
        stars.current.forEach(s => {
            ctx.fillStyle = s.c;
            const flicker = Math.sin(gameTime.current * 0.1 + s.x) * 0.4 + 0.6;
            ctx.globalAlpha = flicker;
            ctx.fillRect(s.x, s.y, s.s, s.s);
            s.y += s.s * 0.7; if (s.y > CANVAS_HEIGHT) s.y = 0;
            ctx.globalAlpha = 1;
        });

        // Tractor Beam
        if (tractorBeamOpacity.current > 0) {
            enemies.current.forEach(e => {
                if (e.state === EnemyState.TRACTOR_BEAM && e.y >= 160) {
                    ctx.save();
                    ctx.globalAlpha = tractorBeamOpacity.current * 0.5;
                    const beamX = e.x + 12;
                    const grad = ctx.createLinearGradient(beamX - 40, 0, beamX + 40, 0);
                    grad.addColorStop(0, 'rgba(126, 34, 206, 0)');
                    grad.addColorStop(0.5, 'rgba(168, 85, 247, 0.9)');
                    grad.addColorStop(1, 'rgba(126, 34, 206, 0)');
                    ctx.fillStyle = grad;
                    
                    ctx.beginPath();
                    ctx.moveTo(beamX - 4, e.y + 15);
                    ctx.lineTo(beamX + 4, e.y + 15);
                    ctx.lineTo(beamX + 50, CANVAS_HEIGHT);
                    ctx.lineTo(beamX - 50, CANVAS_HEIGHT);
                    ctx.closePath();
                    ctx.fill();
                    
                    // Add beam texture
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
                    ctx.setLineDash([5, 15]);
                    ctx.stroke();
                    ctx.restore();
                }
            });
        }

        // Enhanced pixel rendering to ensure visibility
        const drawPixelEntity = (x: number, y: number, color: string, pixels: number[][], pixelSize = 2) => {
            ctx.fillStyle = color;
            pixels.forEach((row, ry) => {
                row.forEach((pixel, rx) => {
                    if (pixel) ctx.fillRect(Math.floor(x + rx * pixelSize), Math.floor(y + ry * pixelSize), pixelSize, pixelSize);
                });
            });
        };

        // Ship Pixels (Galaga Style)
        const shipPixels = [
            [0,0,0,0,0,0,1,1,0,0,0,0,0,0],
            [0,0,0,0,0,1,1,1,1,0,0,0,0,0],
            [0,0,0,0,0,1,1,1,1,0,0,0,0,0],
            [0,0,0,1,1,1,1,1,1,1,1,0,0,0],
            [0,0,1,1,1,1,0,0,1,1,1,1,0,0],
            [0,1,1,1,1,1,0,0,1,1,1,1,1,0],
            [0,1,1,0,0,0,0,0,0,0,0,1,1,0],
            [1,1,1,0,0,0,0,0,0,0,0,1,1,1],
            [1,1,1,0,0,0,0,0,0,0,0,1,1,1],
        ];

        const drawShip = (x: number, y: number, alpha = 1) => {
            ctx.globalAlpha = alpha;
            // White body
            drawPixelEntity(x, y, '#ffffff', shipPixels);
            
            // Red accents (Corrected wings and nose)
            const redAccents = [
                [0,0,0,0,0,0,1,1,0,0,0,0,0,0],
                [0,0,0,0,0,1,1,1,1,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,1,1,0,0,0,0,0,0,1,1,0,0],
                [0,1,1,0,0,0,0,0,0,0,0,1,1,0],
                [0,1,1,0,0,0,0,0,0,0,0,1,1,0],
                [1,1,1,0,0,0,0,0,0,0,0,1,1,1],
            ];
            drawPixelEntity(x, y, '#ef4444', redAccents);
            ctx.globalAlpha = 1;
        };

        const py = CANVAS_HEIGHT - 70;
        if (isDual) { drawShip(playerX.current, py); drawShip(playerX.current + 30, py); }
        else if (isCapturing) drawShip(playerX.current, py, 0.5);
        else drawShip(playerX.current, py);

        // Bullets
        bullets.current.forEach(b => {
             ctx.fillStyle = '#fbef24'; ctx.fillRect(b.x, b.y, b.width, b.height);
        });
        enemyBullets.current.forEach(b => {
             ctx.fillStyle = '#f87171'; ctx.fillRect(b.x, b.y, b.width, b.height);
        });

        // Enemies
        enemies.current.forEach(e => {
            if (!e.active || e.pathIndex < 0) return;
            const colors = ['#4ade80', '#f87171', '#3b82f6'];
            ctx.save();
            ctx.translate(e.x + 12, e.y + 10);
            if (e.state === EnemyState.DIVING || e.state === EnemyState.ENTRY || e.state === EnemyState.CHALLENGE) {
                ctx.rotate(Math.sin(gameTime.current * 0.2) * 0.4);
            }
            // Simple Pixel-Style Enemy
            ctx.fillStyle = colors[e.type];
            ctx.fillRect(-10, -8, 20, 12);
            ctx.fillRect(-12, -2, 4, 10); ctx.fillRect(8, -2, 4, 10); // Wings
            ctx.fillStyle = '#ffffff'; ctx.fillRect(-4, -4, 2, 2); ctx.fillRect(2, -4, 2, 2); // Eyes
            
            if (e.capturedShip) {
                ctx.restore();
                ctx.save();
                ctx.translate(e.x + 12, e.y - 12);
                ctx.scale(0.8, 0.8);
                drawShip(-7, -5, 0.8);
            }
            ctx.restore();
        });

        // Explosions
        particles.current.forEach(p => {
             ctx.fillStyle = p.color;
             ctx.globalAlpha = p.life;
             ctx.fillRect(p.x, p.y, p.width, p.height);
             ctx.globalAlpha = 1;
        });

        // Level Indicators (Flags)
        const drawFlags = () => {
            let tempLevel = level;
            let startX = CANVAS_WIDTH - 25;
            const y = CANVAS_HEIGHT - 30;
            ctx.fillStyle = '#ef4444';
            while (tempLevel >= 50) { ctx.fillRect(startX, y, 12, 12); tempLevel -= 50; startX -= 15; }
            ctx.fillStyle = '#3b82f6';
            while (tempLevel >= 30) { ctx.fillRect(startX, y, 10, 12); tempLevel -= 30; startX -= 12; }
            ctx.fillStyle = '#fbbf24';
            while (tempLevel >= 10) { ctx.fillRect(startX, y, 8, 12); tempLevel -= 10; startX -= 10; }
            ctx.fillStyle = '#f87171';
            for (let i = 0; i < tempLevel; i++) {
                ctx.fillRect(startX, y, 6, 10);
                startX -= 8;
                if (i > 10) break; // Limit flags
            }
        };
        drawFlags();

        // Level Start / Warning Text
        if (levelStartTimer > 0) {
            ctx.font = '900 32px courier'; ctx.textAlign = 'center';
            if (isChallenging) {
                ctx.fillStyle = '#fbbf24';
                ctx.fillText('CHALLENGING STAGE', CANVAS_WIDTH/2, 220);
            } else {
                ctx.fillStyle = '#3b82f6';
                ctx.fillText(`STAGE ${level}`, CANVAS_WIDTH/2, 220);
            }
        }

        if (showChallengeBonus) {
            ctx.fillStyle = '#ffffff'; ctx.font = '700 16px courier'; ctx.textAlign = 'center';
            ctx.fillText(`NUMBER KILLED: ${enemiesKilledInChallenge}`, CANVAS_WIDTH/2, 180);
            if (enemiesKilledInChallenge === 40) {
                 ctx.fillStyle = '#fbbf24'; ctx.fillText('PERFECT!! 10000 PTS', CANVAS_WIDTH/2, 210);
            } else {
                 ctx.fillText(`BONUS: ${enemiesKilledInChallenge * 100} PTS`, CANVAS_WIDTH/2, 210);
            }
        }

        // Flashing "1UP"
        if (gameTime.current % 40 < 20) {
            ctx.fillStyle = '#ef4444'; ctx.font = '700 14px courier'; ctx.textAlign = 'left';
            ctx.fillText('1UP', 20, 25);
        }
        ctx.fillStyle = '#ffffff'; ctx.fillText(score.toString().padStart(6, '0'), 15, 45);
        ctx.fillStyle = '#ef4444'; ctx.textAlign = 'center'; ctx.fillText('HIGH SCORE', CANVAS_WIDTH/2, 25);
        ctx.fillStyle = '#ffffff'; ctx.fillText(highScore.toString().padStart(6, '0'), CANVAS_WIDTH/2, 45);

    }, [update, isDual, isCapturing, isChallenging, level, score, highScore, showChallengeBonus, levelStartTimer, enemiesKilledInChallenge]);

    useEffect(() => {
        const loop = () => { draw(); animationRef.current = requestAnimationFrame(loop); };
        animationRef.current = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(animationRef.current);
    }, [draw]);

    return (
        <div className="flex flex-col h-full bg-[#020617] text-white font-sans overflow-hidden select-none">
            {/* Header / Arcade Frame */}
            <div className="px-6 py-4 flex items-center justify-between border-b border-white/10 shrink-0 bg-black/40 backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                        <Rocket className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-sm font-black italic uppercase tracking-tighter leading-none text-blue-400">GALAGA ARCADE PRO</h1>
                        <div className="flex items-center gap-2 mt-1">
                            <div className="flex gap-1">
                                {[...Array(Math.max(0, lives))].map((_, i) => (
                                    <div key={i} className="w-3 h-3 bg-red-600 rounded-sm transform rotate-45" />
                                ))}
                            </div>
                            <p className="text-[8px] text-white/40 font-bold uppercase tracking-widest ml-1">Stage {level}</p>
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest mb-0.5">High Score</p>
                    <p className="text-xl font-black italic text-white tabular-nums leading-none">{highScore.toLocaleString()}</p>
                </div>
            </div>

            {/* Game Canvas Container */}
            <div className="relative flex-1 flex items-center justify-center bg-black/80 overflow-hidden">
                <div className="relative shadow-[0_0_80px_rgba(59,130,246,0.2)]">
                    <canvas 
                        ref={canvasRef} 
                        width={CANVAS_WIDTH} 
                        height={CANVAS_HEIGHT} 
                        className="max-w-full h-auto rounded border border-white/5 mx-auto" 
                        style={{ imageRendering: 'pixelated' }}
                    />
                    
                    {/* Overlays */}
                    {(paused || gameOver) && (
                        <div className="absolute inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center p-6 rounded animate-in fade-in duration-500">
                            <div className="w-full max-w-[280px] text-center space-y-8">
                                {paused && !gameOver && (
                                    <div className="space-y-6">
                                        <div className="space-y-3">
                                            <h2 className="text-4xl font-black italic uppercase tracking-tighter text-blue-400">START!</h2>
                                            <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">Pilot Ready for Combat</p>
                                        </div>
                                        <button onClick={() => setPaused(false)} className="group relative w-full overflow-hidden rounded-2xl bg-blue-600 px-8 py-5 transition-all hover:bg-blue-500 active:scale-95 shadow-2xl shadow-blue-600/30">
                                            <div className="relative flex items-center justify-center gap-3">
                                                <span className="text-xl font-black italic uppercase tracking-tighter">Insert Coin</span>
                                                <Rocket className="w-5 h-5" />
                                            </div>
                                        </button>
                                    </div>
                                )}
                                {gameOver && (
                                    <div className="space-y-6 animate-in zoom-in-95 duration-700">
                                        <div className="space-y-2">
                                            <h2 className="text-4xl font-black italic uppercase tracking-tighter text-red-500">GAME OVER</h2>
                                            <p className="text-white/40 text-sm font-medium uppercase tracking-[0.2em] italic">Final Score: {score.toLocaleString()}</p>
                                        </div>
                                        {!isSubmitted ? (
                                            <form onSubmit={handleEmailSubmit} className="w-full space-y-4 text-left">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 ml-1">Hall of Fame Registration</label>
                                                    <input 
                                                        type="email" 
                                                        required 
                                                        placeholder="Enter Email to Save Record" 
                                                        value={email} 
                                                        onChange={(e) => setEmail(e.target.value)} 
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-sm focus:outline-none focus:border-blue-500/50 transition-all text-white" 
                                                    />
                                                </div>
                                                <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 disabled:opacity-50 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-xl shadow-blue-600/30 uppercase italic">
                                                    {isSubmitting ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Save Record <Send className="w-4 h-4" /></>}
                                                </button>
                                                <button type="button" onClick={resetGame} className="w-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white font-bold py-4 rounded-2xl transition-all text-xs uppercase">Restart System</button>
                                            </form>
                                        ) : (
                                            <div className="w-full py-8 text-center space-y-6">
                                                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(34,197,94,0.1)]">
                                                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                                                </div>
                                                <h3 className="text-2xl font-black italic uppercase tracking-tighter">Record Saved!</h3>
                                                <button onClick={resetGame} className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-blue-600/30 uppercase italic">New Mission</button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Virtual Controls */}
            <div className="bg-black/80 backdrop-blur-2xl border-t border-white/10 p-6 pb-12 shrink-0 grid grid-cols-2 gap-8 items-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border-2 border-white/5 bg-white/5 shadow-inner" />
                        <div 
                            className="relative w-full h-full rounded-full cursor-pointer touch-none z-10 flex items-center justify-center" 
                            onPointerDown={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const centerX = rect.left + rect.width / 2;
                                const handleMove = (moveEvent: PointerEvent) => {
                                    const dx = moveEvent.clientX - centerX;
                                    playerTargetDir.current = Math.abs(dx) > 10 ? (dx > 0 ? 1 : -1) : 0;
                                    if (joystickHandleRef.current) joystickHandleRef.current.style.transform = `translateX(${Math.max(-40, Math.min(40, dx))}px)`;
                                };
                                const handleUp = () => {
                                    window.removeEventListener('pointermove', handleMove);
                                    window.removeEventListener('pointerup', handleUp);
                                    playerTargetDir.current = 0;
                                    if (joystickHandleRef.current) joystickHandleRef.current.style.transform = 'translateX(0px)';
                                };
                                window.addEventListener('pointermove', handleMove);
                                window.addEventListener('pointerup', handleUp);
                            }}
                        >
                            <div ref={joystickHandleRef} className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-800 shadow-[0_10px_30px_rgba(37,99,235,0.4)] border-4 border-white/20 active:scale-95 transition-transform duration-75">
                                <div className="w-full h-full rounded-full border border-white/10 flex items-center justify-center">
                                    <div className="w-8 h-8 rounded-full bg-blue-400/20" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <span className="text-[10px] font-black italic uppercase text-blue-400/40 tracking-[0.3em]">Maneuver</span>
                </div>
                
                <div className="flex flex-col items-center gap-4">
                    <button 
                        onPointerDown={fireBullet} 
                        className="group relative w-32 h-32 rounded-full transition-all active:scale-90"
                    >
                        <div className="absolute inset-0 rounded-full bg-red-600 shadow-[0_12px_45px_rgba(220,38,38,0.4)] border-4 border-white/10 overflow-hidden">
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                                <Zap className="w-12 h-12 text-white fill-current drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-white/95 italic">Fire</span>
                            </div>
                        </div>
                        <div className="absolute -inset-1 border-2 border-red-500/20 rounded-full animate-pulse" />
                    </button>
                    <span className="text-[10px] font-black italic uppercase text-red-400/40 tracking-[0.3em]">Attack</span>
                </div>
            </div>
        </div>
    );
}

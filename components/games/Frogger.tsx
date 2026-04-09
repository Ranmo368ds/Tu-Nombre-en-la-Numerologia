'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

// Constants
const CANVAS_WIDTH = 320;
const CANVAS_HEIGHT = 480;
const GRID_SIZE = 32;
const ROWS = 15; // 480 / 32 = 15
const COLS = 10; // 320 / 32 = 10

// Sections (from bottom to top)
// 0: Start Safe (1 row)
// 1-5: Road (5 lanes)
// 6: Median Safe (1 row)
// 7-11: River (5 lanes)
// 12-14: Goal/Grass (3 rows)

enum EntityType {
    CAR,
    TRUCK,
    LOG,
    TURTLE,
    DIVING_TURTLE
}

interface Entity {
    id: number;
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
    type: EntityType;
    color: string;
    direction: 1 | -1; // 1: Right, -1: Left
    diveTimer?: number;
    isSubmerged?: boolean;
}

export default function Frogger() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'GAMEOVER'>('START');
    const [level, setLevel] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showLeadForm, setShowLeadForm] = useState(false);
    const [email, setEmail] = useState('');

    // Game Objects
    const frogPos = useRef({ x: 4 * GRID_SIZE, y: 13 * GRID_SIZE });
    const entities = useRef<Entity[]>([]);
    const goals = useRef<boolean[]>([false, false, false, false, false]);
    const requestRef = useRef<number>(0);
    const frameCount = useRef(0);
    const lastMoveTime = useRef(0);
    const isOnPlatform = useRef(false);
    const currentPlatformSpeed = useRef(0);

    // Joystick State
    const [joystickOffset, setJoystickOffset] = useState({ x: 0, y: 0 });
    const joystickOrigin = useRef({ x: 0, y: 0 });
    const joystickActive = useRef(false);

    // Refs for mutable game state (avoids stale closures in game loop)
    const livesRef = useRef(3);
    const gameStateRef = useRef<'START' | 'PLAYING' | 'GAMEOVER'>('START');
    const scoreRef = useRef(0);
    const highScoreRef = useRef(0);
    const levelRef = useRef(1);

    const initEntities = useCallback(() => {
        const newEntities: Entity[] = [];
        let id = 0;

        // Road Lanes (Y: 12 to 8) - indexing from top to bottom is easier for logic
        // Row 13: Start
        // Row 12: Lane 1 (Car)
        // Row 11: Lane 2 (Bus)
        // Row 10: Lane 3 (Car)
        // Row 9: Lane 4 (Race Car)
        // Row 8: Lane 5 (Truck)
        // Row 7: Median
        // Row 6: River Lane 1 (Turtles)
        // Row 5: River Lane 2 (Log Short)
        // Row 4: River Lane 3 (Log Long)
        // Row 3: River Lane 4 (Turtles)
        // Row 2: River Lane 5 (Log Med)

        // Road - speeds reduced ~40% for better playability
        const roadSpeeds = [0.8, -0.6, 1.4, -1.1, 0.7];
        for (let i = 0; i < 5; i++) {
            const laneY = (12 - i) * GRID_SIZE;
            const speed = roadSpeeds[i] * (1 + (level - 1) * 0.08); // slower level scaling too
            const count = i === 1 ? 2 : 3;
            const width = i === 1 ? 72 : 32; // bus slightly wider
            const color = i === 1 ? '#FFD700' : (i === 3 ? '#FF4500' : '#4169E1');
            
            for (let j = 0; j < count; j++) {
                newEntities.push({
                    id: id++,
                    x: j * (CANVAS_WIDTH / count),
                    y: laneY,
                    width,
                    height: 28,
                    speed: Math.abs(speed),
                    direction: speed > 0 ? 1 : -1,
                    type: i === 1 ? EntityType.TRUCK : EntityType.CAR,
                    color
                });
            }
        }

        // River - slower speeds and wider logs for easier crossing
        const riverSpeeds = [-0.7, 1.0, 1.5, -0.9, 0.8];
        for (let i = 0; i < 5; i++) {
            const laneY = (6 - i) * GRID_SIZE;
            const speed = riverSpeeds[i] * (1 + (level - 1) * 0.08);
            const isTurtles = i === 0 || i === 3;
            
            if (isTurtles) {
                const count = 4;
                for (let j = 0; j < count; j++) {
                    // Diving turtles only appear from level 4+
                    const isDiver = i === 3 && level >= 4;
                    newEntities.push({
                        id: id++,
                        x: j * (CANVAS_WIDTH / count),
                        y: laneY,
                        width: 36, // wider turtle
                        height: 28,
                        speed: Math.abs(speed),
                        direction: speed > 0 ? 1 : -1,
                        type: isDiver ? EntityType.DIVING_TURTLE : EntityType.TURTLE,
                        color: '#228B22',
                        diveTimer: isDiver ? Math.random() * 300 : undefined,
                        isSubmerged: false
                    });
                }
            } else {
                const count = 3;
                // Much wider logs so there's always somewhere to land
                const width = i === 2 ? 160 : (i === 4 ? 128 : 96);
                for (let j = 0; j < count; j++) {
                    newEntities.push({
                        id: id++,
                        x: j * (CANVAS_WIDTH / count),
                        y: laneY,
                        width,
                        height: 28,
                        speed: Math.abs(speed),
                        direction: speed > 0 ? 1 : -1,
                        type: EntityType.LOG,
                        color: '#8B4513'
                    });
                }
            }
        }

        entities.current = newEntities;
    }, [level]);

    const resetFrog = useCallback(() => {
        frogPos.current = { x: 4 * GRID_SIZE + (GRID_SIZE / 2 - 12), y: 13 * GRID_SIZE + 4 };
        isOnPlatform.current = false;
        currentPlatformSpeed.current = 0;
    }, []);

    const startGame = () => {
        livesRef.current = 3;
        scoreRef.current = 0;
        levelRef.current = 1;
        gameStateRef.current = 'PLAYING';
        setScore(0);
        setLives(3);
        setLevel(1);
        setGameState('PLAYING');
        goals.current = [false, false, false, false, false];
        initEntities();
        resetFrog();
    };

    const handleGameOver = useCallback(() => {
        gameStateRef.current = 'GAMEOVER';
        setGameState('GAMEOVER');
        setShowLeadForm(true);
        if (scoreRef.current > highScoreRef.current) {
            highScoreRef.current = scoreRef.current;
            setHighScore(scoreRef.current);
            localStorage.setItem('frogger-high-score', scoreRef.current.toString());
        }
    }, []);

    const submitLead = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await fetch('/api/lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    email, 
                    score: scoreRef.current, 
                    level: levelRef.current, 
                    game: 'frogger',
                    source: 'Frogger Game'
                }),
            });
            setShowLeadForm(false);
            setGameState('START');
        } catch (error) {
            console.error('Error submitting lead:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const moveFrog = useCallback((dx: number, dy: number) => {
        if (gameStateRef.current !== 'PLAYING') return;
        
        const now = Date.now();
        if (now - lastMoveTime.current < 160) return; // Debounce
        
        const newX = frogPos.current.x + dx * GRID_SIZE;
        const newY = frogPos.current.y + dy * GRID_SIZE;

        if (newX >= 0 && newX <= CANVAS_WIDTH - 24 && newY >= 0 && newY < CANVAS_HEIGHT) {
            frogPos.current.x = newX;
            frogPos.current.y = newY;
            lastMoveTime.current = now;
            
            if (dy < 0) {
                scoreRef.current += 10;
                setScore(scoreRef.current);
            }
        }
    }, []);

    // Input Handling
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowUp') moveFrog(0, -1);
            if (e.key === 'ArrowDown') moveFrog(0, 1);
            if (e.key === 'ArrowLeft') moveFrog(-1, 0);
            if (e.key === 'ArrowRight') moveFrog(1, 0);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [moveFrog]);

    // Game Loop
    const update = useCallback(() => {
        if (gameState !== 'PLAYING') return;

        frameCount.current++;

        // Update Entities
        entities.current.forEach(entity => {
            entity.x += entity.speed * entity.direction;
            
            if (entity.direction === 1 && entity.x > CANVAS_WIDTH) {
                entity.x = -entity.width;
            } else if (entity.direction === -1 && entity.x < -entity.width) {
                entity.x = CANVAS_WIDTH;
            }

            // Diving Logic - only after level 4, and stay visible longer (500 frames up, 150 down)
            if (entity.type === EntityType.DIVING_TURTLE && level >= 4) {
                entity.diveTimer!++;
                if (entity.isSubmerged && entity.diveTimer! > 150) {
                    entity.isSubmerged = false;
                    entity.diveTimer = 0;
                } else if (!entity.isSubmerged && entity.diveTimer! > 500) {
                    entity.isSubmerged = true;
                    entity.diveTimer = 0;
                }
            }
        });

        const frogX = frogPos.current.x;
        const frogY = frogPos.current.y;
        const frogSize = 24;

        // Collision Detection
        let collision = false;
        let platformFound = false;

        // Row ranges
        const isOnRoad = frogY >= 8 * GRID_SIZE && frogY <= 12 * GRID_SIZE;
        const isOnRiver = frogY >= 2 * GRID_SIZE && frogY <= 6 * GRID_SIZE;
        const isAtGoal = frogY < 2 * GRID_SIZE;

        if (isOnRoad) {
            entities.current.forEach(entity => {
                if (entity.type === EntityType.CAR || entity.type === EntityType.TRUCK) {
                    if (frogX < entity.x + entity.width - 8 &&
                        frogX + frogSize > entity.x + 8 &&
                        frogY < entity.y + entity.height - 4 &&
                        frogY + frogSize > entity.y + 4) {
                        collision = true;
                    }
                }
            });
        } else if (isOnRiver) {
            entities.current.forEach(entity => {
                if (entity.type === EntityType.LOG || entity.type === EntityType.TURTLE || entity.type === EntityType.DIVING_TURTLE) {
                    if (frogX < entity.x + entity.width - 4 &&
                        frogX + frogSize > entity.x + 4 &&
                        frogY < entity.y + entity.height &&
                        frogY + frogSize > entity.y) {
                        
                        if (entity.type === EntityType.DIVING_TURTLE && entity.isSubmerged) {
                            return;
                        }
                        
                        platformFound = true;
                        frogPos.current.x += entity.speed * entity.direction;
                    }
                }
            });

            if (!platformFound) collision = true;
            
            if (frogPos.current.x < 0 || frogPos.current.x > CANVAS_WIDTH - frogSize) {
                collision = true;
            }
        } else if (isAtGoal) {
            const goalIndex = Math.floor((frogX + GRID_SIZE/2) / (CANVAS_WIDTH / 5));
            if (goalIndex >= 0 && goalIndex < 5 && !goals.current[goalIndex]) {
                goals.current[goalIndex] = true;
                scoreRef.current += 500;
                setScore(scoreRef.current);
                resetFrog();
                
                if (goals.current.every(g => g)) {
                    const newLevel = levelRef.current + 1;
                    levelRef.current = newLevel;
                    scoreRef.current += 1000;
                    setLevel(newLevel);
                    setScore(scoreRef.current);
                    goals.current = [false, false, false, false, false];
                    initEntities();
                }
            } else {
                collision = true;
            }
        }

        if (collision) {
            const nextLives = livesRef.current - 1;
            livesRef.current = nextLives;
            setLives(nextLives);
            if (nextLives <= 0) {
                handleGameOver();
            } else {
                resetFrog();
            }
        }

        // DRAW
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;

        // Background
        ctx.fillStyle = '#000033'; // Deep space/night
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Road (Y: 12 to 8)
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(0, 8 * GRID_SIZE, CANVAS_WIDTH, 5 * GRID_SIZE);
        
        // River (Y: 6 to 2)
        ctx.fillStyle = '#0000AA';
        ctx.fillRect(0, 2 * GRID_SIZE, CANVAS_WIDTH, 5 * GRID_SIZE);

        // Safe Areas
        ctx.fillStyle = '#4B0082'; // Purple/Indigo safe start
        ctx.fillRect(0, 13 * GRID_SIZE, CANVAS_WIDTH, GRID_SIZE);
        ctx.fillStyle = '#4B0082'; // Median
        ctx.fillRect(0, 7 * GRID_SIZE, CANVAS_WIDTH, GRID_SIZE);
        
        // Goals / Grass
        ctx.fillStyle = '#1B5E20'; // Dark Green
        ctx.fillRect(0, 0, CANVAS_WIDTH, 2 * GRID_SIZE);
        
        // Goal slots
        goals.current.forEach((active, i) => {
            const x = i * (CANVAS_WIDTH / 5) + (CANVAS_WIDTH / 10) - 16;
            if (!active) {
                ctx.fillStyle = '#000000';
                ctx.fillRect(x, 8, 32, 32);
            } else {
                // Frog in goal
                ctx.fillStyle = '#4CAF50';
                ctx.fillRect(x + 4, 12, 24, 24);
                // Eyes
                ctx.fillStyle = 'white';
                ctx.fillRect(x + 8, 16, 4, 4);
                ctx.fillRect(x + 20, 16, 4, 4);
            }
        });

        // Entities
        entities.current.forEach(entity => {
            if (entity.type === EntityType.DIVING_TURTLE && entity.isSubmerged) {
                ctx.globalAlpha = 0.3;
            }
            
            ctx.fillStyle = entity.color;
            if (entity.type === EntityType.LOG) {
                // Natural log look
                ctx.fillRect(entity.x, entity.y + 4, entity.width, 24);
                ctx.fillStyle = '#5D4037';
                ctx.fillRect(entity.x + 10, entity.y + 10, 5, 5);
                ctx.fillRect(entity.x + entity.width - 20, entity.y + 15, 8, 4);
            } else if (entity.type === EntityType.TURTLE || entity.type === EntityType.DIVING_TURTLE) {
                // Turtle shell pattern
                ctx.beginPath();
                ctx.ellipse(entity.x + 16, entity.y + 16, 14, 10, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#1B5E20';
                ctx.fillRect(entity.x+4, entity.y+12, 4, 4); // flippers
                ctx.fillRect(entity.x+24, entity.y+12, 4, 4);
            } else {
                // Vehicle
                ctx.fillRect(entity.x, entity.y + 2, entity.width, 28);
                ctx.fillStyle = 'white'; // Windows
                if (entity.direction === 1) {
                    ctx.fillRect(entity.x + entity.width - 10, entity.y + 6, 6, 20);
                } else {
                    ctx.fillRect(entity.x + 4, entity.y + 6, 6, 20);
                }
            }
            ctx.globalAlpha = 1.0;
        });

        // Frog
        ctx.fillStyle = '#4CAF50';
        ctx.beginPath();
        ctx.roundRect(frogPos.current.x, frogPos.current.y, 24, 24, 6);
        ctx.fill();
        // Eyes
        ctx.fillStyle = 'white';
        ctx.fillRect(frogPos.current.x + 4, frogPos.current.y + 4, 5, 5);
        ctx.fillRect(frogPos.current.x + 15, frogPos.current.y + 4, 5, 5);
        ctx.fillStyle = 'black';
        ctx.fillRect(frogPos.current.x + 6, frogPos.current.y + 5, 2, 2);
        ctx.fillRect(frogPos.current.x + 17, frogPos.current.y + 5, 2, 2);

        requestRef.current = requestAnimationFrame(update);
    }, [gameState, resetFrog, initEntities, handleGameOver]);

    useEffect(() => {
        requestRef.current = requestAnimationFrame(update);
        return () => cancelAnimationFrame(requestRef.current);
    }, [update]);

    // Touch Handling - Canvas only detects taps for starting
    const handleCanvasTap = (e: React.TouchEvent) => {
        e.preventDefault();
        if (gameState === 'START') startGame();
    };

    // Joystick - dedicated touch handlers on the joystick element
    const handleJoystickStart = (e: React.TouchEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const touch = e.touches[0];
        joystickOrigin.current = { x: touch.clientX, y: touch.clientY };
        joystickActive.current = true;
        setJoystickOffset({ x: 0, y: 0 });
    };

    const handleJoystickMove = (e: React.TouchEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!joystickActive.current) return;
        const touch = e.touches[0];
        const dx = touch.clientX - joystickOrigin.current.x;
        const dy = touch.clientY - joystickOrigin.current.y;

        // Clamp visual offset
        const maxR = 28;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const scale = dist > maxR ? maxR / dist : 1;
        setJoystickOffset({ x: dx * scale, y: dy * scale });

        // Trigger move when dragged enough
        const threshold = 18;
        if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > threshold) { moveFrog(1, 0); joystickOrigin.current = { x: touch.clientX, y: touch.clientY }; }
            else if (dx < -threshold) { moveFrog(-1, 0); joystickOrigin.current = { x: touch.clientX, y: touch.clientY }; }
        } else {
            if (dy > threshold) { moveFrog(0, 1); joystickOrigin.current = { x: touch.clientX, y: touch.clientY }; }
            else if (dy < -threshold) { moveFrog(0, -1); joystickOrigin.current = { x: touch.clientX, y: touch.clientY }; }
        }
    };

    const handleJoystickEnd = (e: React.TouchEvent) => {
        e.preventDefault();
        joystickActive.current = false;
        setJoystickOffset({ x: 0, y: 0 });
    };

    return (
        <div className="flex flex-col items-center bg-black min-h-[600px] w-full max-w-md mx-auto p-4 font-pixel select-none overflow-hidden touch-none shadow-2xl rounded-3xl border-4 border-gray-800">
            {/* Header */}
            <div className="w-full flex justify-between items-center mb-4 px-2">
                <div className="flex flex-col">
                    <span className="text-gray-400 text-xs uppercase tracking-widest">Score</span>
                    <span className="text-yellow-400 text-xl font-bold">{score.toString().padStart(5, '0')}</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-gray-400 text-xs uppercase tracking-widest">Level</span>
                    <span className="text-purple-400 text-xl font-bold">{level}</span>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-gray-400 text-xs uppercase tracking-widest">High Score</span>
                    <span className="text-white text-xl font-bold">{highScore.toString().padStart(5, '0')}</span>
                </div>
            </div>

            {/* Game Canvas */}
            <div className="relative border-4 border-gray-700 rounded-lg overflow-hidden bg-gray-900 group">
                <canvas
                    ref={canvasRef}
                    width={CANVAS_WIDTH}
                    height={CANVAS_HEIGHT}
                    className="max-w-full h-auto cursor-none shadow-inner"
                    onTouchStart={handleCanvasTap}
                />

                {/* Overlays */}
                {gameState === 'START' && (
                    <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-center p-6 backdrop-blur-sm animate-in fade-in duration-300">
                        <div className="mb-8 relative">
                            <h1 className="text-5xl font-black text-green-500 mb-2 drop-shadow-[0_0_15px_rgba(34,197,94,0.5)] tracking-tighter italic">
                                FROGGER
                            </h1>
                            <div className="text-white text-sm font-medium tracking-widest uppercase opacity-75">Leapfrog Edition</div>
                        </div>
                        <button
                            onClick={startGame}
                            className="group relative px-10 py-4 bg-green-600 hover:bg-green-500 text-white rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(22,163,74,0.4)]"
                        >
                            <span className="relative z-10 text-xl font-bold uppercase tracking-widest">Start Game</span>
                            <div className="absolute inset-0 bg-white/20 rounded-full blur-md group-hover:blur-xl transition-all" />
                        </button>
                        <div className="mt-8 text-gray-400 text-xs leading-relaxed max-w-[200px]">
                            Use <span className="text-white font-bold">ARROWS</span> or <span className="text-white font-bold">JOYSTICK</span> to cross the road and river!
                        </div>
                    </div>
                )}

                {gameState === 'GAMEOVER' && showLeadForm && (
                    <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-6 backdrop-blur-md animate-in zoom-in duration-300">
                        <h2 className="text-4xl font-black text-red-500 mb-2 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)] italic">GAME OVER</h2>
                        <div className="bg-gray-800/50 p-4 rounded-2xl mb-6 w-full max-w-[240px] border border-gray-700">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-gray-400 text-[10px] uppercase">Final Score</span>
                                <span className="text-yellow-400 font-bold">{score}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400 text-[10px] uppercase">Level Reached</span>
                                <span className="text-purple-400 font-bold">{level}</span>
                            </div>
                        </div>
                        
                        <p className="text-white text-sm mb-6 text-center leading-relaxed">
                            Enter your email to save your score and unlock <span className="text-green-400 font-bold underline decoration-wavy">special rewards</span>!
                        </p>
                        
                        <form onSubmit={submitLead} className="w-full space-y-3">
                            <div className="relative group">
                                <input
                                    type="email"
                                    required
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-xl text-white focus:outline-none focus:border-green-500 transition-all text-sm group-hover:border-gray-600 shadow-inner"
                                />
                                <div className="absolute inset-0 rounded-xl bg-green-500/5 pointer-events-none group-focus-within:bg-green-500/10 transition-colors" />
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 bg-green-600 hover:bg-green-500 disabled:bg-gray-700 text-white rounded-xl font-bold uppercase tracking-widest transition-all duration-300 transform active:scale-95 shadow-lg flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span>Saving...</span>
                                    </>
                                ) : 'Save & Continue'}
                            </button>
                            <button
                                type="button"
                                onClick={() => setGameState('START')}
                                className="w-full py-2 text-gray-500 text-[10px] uppercase tracking-tighter hover:text-white transition-colors"
                            >
                                Skip for now
                            </button>
                        </form>
                    </div>
                )}
            </div>

            {/* Footer / Controls */}
            <div className="w-full mt-6 px-2 flex justify-between items-end h-32">
                {/* Lives */}
                <div className="flex gap-2 items-center h-full pb-4">
                    {[...Array(lives)].map((_, i) => (
                        <div key={i} className="w-6 h-6 bg-green-500 rounded-md shadow-[0_2px_0_#166534] border border-green-400" />
                    ))}
                    {lives === 0 && <span className="text-red-500 text-xs uppercase animate-pulse">Critical</span>}
                </div>

                {/* Touch Controls Helper */}
                <div className="flex-1 flex justify-center items-center h-full relative px-4">
                    {/* Joystick - handles its own touch events */}
                    <div 
                        className="w-28 h-28 rounded-full border-4 border-gray-700 relative bg-gray-900/60 backdrop-blur-sm select-none"
                        onTouchStart={handleJoystickStart}
                        onTouchMove={handleJoystickMove}
                        onTouchEnd={handleJoystickEnd}
                        style={{ touchAction: 'none' }}
                    >
                        {/* Crosshair guides */}
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-gray-600 rounded" />
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-gray-600 rounded" />
                        <div className="absolute left-2 top-1/2 -translate-y-1/2 h-0.5 w-3 bg-gray-600 rounded" />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 h-0.5 w-3 bg-gray-600 rounded" />
                        {/* Thumb */}
                        <div 
                            className="absolute top-1/2 left-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-700 border-4 border-red-900 shadow-xl transition-none"
                            style={{ 
                                transform: `translate(calc(-50% + ${joystickOffset.x}px), calc(-50% + ${joystickOffset.y}px))`
                            }}
                        />
                    </div>
                </div>

                {/* Controls Info */}
                <div className="text-right pb-4">
                    <p className="text-gray-600 text-[10px] uppercase font-bold tracking-widest leading-none mb-1">Developed By</p>
                    <p className="text-white text-xs font-black italic tracking-tighter">ANTIGRAVITY PRO</p>
                </div>
            </div>

            <style jsx>{`
                @font-face {
                    font-family: 'Pixel';
                    src: url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
                }
                .font-pixel {
                    font-family: 'Press Start 2P', cursive, system-ui;
                }
            `}</style>
        </div>
    );
}

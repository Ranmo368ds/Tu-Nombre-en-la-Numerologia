'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Trophy, Play, Pause, RotateCcw, ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Mail, Send, CheckCircle2, Ghost } from 'lucide-react';

const GRID_SIZE = 20;
const CELL_SIZE = 18; // Smaller for mobile
const PACMAN_SPEED = 0.15;
const GHOST_SPEED = 0.1;

const MAZE = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
    [1,2,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,2,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,0,1],
    [1,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1],
    [1,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,1],
    [1,1,1,1,0,1,0,0,0,0,0,0,0,1,0,1,1,1,1],
    [1,1,1,1,0,1,0,1,1,0,1,1,0,1,0,1,1,1,1],
    [0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0],
    [1,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1],
    [1,1,1,1,0,1,0,0,0,0,0,0,0,1,0,1,1,1,1],
    [1,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,0,1],
    [1,2,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,2,1],
    [1,1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,0,1,1],
    [1,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

// 0: Dot, 1: Wall, 2: Power Pellet, 3: Empty

interface Position {
    x: number;
    y: number;
}

interface GhostState {
    pos: Position;
    dir: Position;
    color: string;
    isScared: boolean;
}

export default function Pacman() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [paused, setPaused] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [email, setEmail] = useState('');
    
    const pacmanPos = useRef<Position>({ x: 9, y: 15 });
    const pacmanDir = useRef<Position>({ x: 0, y: 0 });
    const nextDir = useRef<Position>({ x: 0, y: 0 });
    const ghosts = useRef<GhostState[]>([
        { pos: { x: 9, y: 9 }, dir: { x: 1, y: 0 }, color: '#FF0000', isScared: false },
        { pos: { x: 9, y: 9 }, dir: { x: -1, y: 0 }, color: '#FFB8FF', isScared: false },
        { pos: { x: 8, y: 9 }, dir: { x: 0, y: -1 }, color: '#00FFFF', isScared: false },
        { pos: { x: 10, y: 9 }, dir: { x: 0, y: 1 }, color: '#FFB852', isScared: false },
    ]);
    const dots = useRef<number[][]>(MAZE.map(row => [...row]));
    const animationRef = useRef<number>(0);

    // Load High Score
    useEffect(() => {
        const saved = localStorage.getItem('pacman-high-score');
        if (saved) setHighScore(parseInt(saved));
    }, []);

    const resetGame = () => {
        pacmanPos.current = { x: 9, y: 15 };
        pacmanDir.current = { x: 0, y: 0 };
        nextDir.current = { x: 0, y: 0 };
        ghosts.current = [
            { pos: { x: 9, y: 9 }, dir: { x: 1, y: 0 }, color: '#FF0000', isScared: false },
            { pos: { x: 9, y: 9 }, dir: { x: -1, y: 0 }, color: '#FFB8FF', isScared: false },
            { pos: { x: 8, y: 9 }, dir: { x: 0, y: -1 }, color: '#00FFFF', isScared: false },
            { pos: { x: 10, y: 9 }, dir: { x: 0, y: 1 }, color: '#FFB852', isScared: false },
        ];
        dots.current = MAZE.map(row => [...row]);
        setScore(0);
        setGameOver(false);
        setPaused(false);
        setIsSubmitted(false);
    };

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
        }, 1500);
    };

    const canMove = (pos: Position, dir: Position) => {
        const nextX = Math.round(pos.x + dir.x);
        const nextY = Math.round(pos.y + dir.y);
        
        // Wrap around logic
        if (nextX < 0 || nextX >= MAZE[0].length) return true;
        
        return MAZE[nextY][nextX] !== 1;
    };

    const update = useCallback(() => {
        if (paused || gameOver) return;

        // Update Pacman Direction if next direction is clear
        if (nextDir.current.x !== 0 || nextDir.current.y !== 0) {
            if (Number.isInteger(pacmanPos.current.x) && Number.isInteger(pacmanPos.current.y)) {
                if (canMove(pacmanPos.current, nextDir.current)) {
                    pacmanDir.current = nextDir.current;
                }
            }
        }

        // Move Pacman
        if (canMove(pacmanPos.current, pacmanDir.current)) {
            pacmanPos.current.x += pacmanDir.current.x * PACMAN_SPEED;
            pacmanPos.current.y += pacmanDir.current.y * PACMAN_SPEED;

            // Handle Wrap Around
            if (pacmanPos.current.x < -0.5) pacmanPos.current.x = MAZE[0].length - 0.5;
            if (pacmanPos.current.x > MAZE[0].length - 0.5) pacmanPos.current.x = -0.5;
        }

        // Grid Position for collision
        const gridX = Math.round(pacmanPos.current.x);
        const gridY = Math.round(pacmanPos.current.y);

        // Eat Dots
        if (gridY >= 0 && gridY < MAZE.length && gridX >= 0 && gridX < MAZE[0].length) {
            if (dots.current[gridY][gridX] === 0) {
                dots.current[gridY][gridX] = 3;
                setScore(s => s + 10);
            } else if (dots.current[gridY][gridX] === 2) {
                dots.current[gridY][gridX] = 3;
                setScore(s => s + 50);
                // Scared ghosts logic could go here
            }
        }

        // Move Ghosts
        ghosts.current.forEach(ghost => {
            if (Number.isInteger(ghost.pos.x) && Number.isInteger(ghost.pos.y)) {
                // Try to change direction at intersections
                const possibleDirs = [
                    { x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }
                ].filter(d => (d.x !== -ghost.dir.x || d.y !== -ghost.dir.y) && canMove(ghost.pos, d));
                
                if (possibleDirs.length > 0) {
                    ghost.dir = possibleDirs[Math.floor(Math.random() * possibleDirs.length)];
                }
            }
            ghost.pos.x += ghost.dir.x * GHOST_SPEED;
            ghost.pos.y += ghost.dir.y * GHOST_SPEED;
        });

        // Check Collisions with Ghosts
        ghosts.current.forEach(ghost => {
            const dist = Math.sqrt(
                Math.pow(pacmanPos.current.x - ghost.pos.x, 2) + 
                Math.pow(pacmanPos.current.y - ghost.pos.y, 2)
            );
            if (dist < 0.8) {
                setGameOver(true);
                if (score > highScore) {
                    setHighScore(score);
                    localStorage.setItem('pacman-high-score', score.toString());
                }
            }
        });

        // Check for Win (all dots eaten)
        const remainingDots = dots.current.flat().filter(cell => cell === 0 || cell === 2).length;
        if (remainingDots === 0) {
            resetGame(); // Next level?
            setScore(s => s + 1000);
        }

    }, [paused, gameOver, score, highScore]);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw Maze
        MAZE.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell === 1) {
                    ctx.fillStyle = '#1e1e2e';
                    ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                    ctx.strokeStyle = '#3b82f6';
                    ctx.lineWidth = 1;
                    ctx.strokeRect(x * CELL_SIZE + 2, y * CELL_SIZE + 2, CELL_SIZE - 4, CELL_SIZE - 4);
                } else if (dots.current[y][x] === 0) {
                    ctx.fillStyle = '#ffb852';
                    ctx.beginPath();
                    ctx.arc(x * CELL_SIZE + CELL_SIZE/2, y * CELL_SIZE + CELL_SIZE/2, 2, 0, Math.PI * 2);
                    ctx.fill();
                } else if (dots.current[y][x] === 2) {
                    ctx.fillStyle = '#ffb852';
                    ctx.beginPath();
                    ctx.arc(x * CELL_SIZE + CELL_SIZE/2, y * CELL_SIZE + CELL_SIZE/2, 4, 0, Math.PI * 2);
                    ctx.fill();
                }
            });
        });

        // Draw Pacman
        ctx.fillStyle = '#ffff00';
        ctx.beginPath();
        const px = pacmanPos.current.x * CELL_SIZE + CELL_SIZE/2;
        const py = pacmanPos.current.y * CELL_SIZE + CELL_SIZE/2;
        
        // Rotating mouth
        const rotation = pacmanDir.current.x === 1 ? 0 : 
                         pacmanDir.current.x === -1 ? Math.PI : 
                         pacmanDir.current.y === 1 ? Math.PI/2 : 
                         pacmanDir.current.y === -1 ? -Math.PI/2 : 0;
        
        const mouthOpen = (Math.sin(Date.now() / 100) + 1) * 0.2;
        ctx.arc(px, py, CELL_SIZE/2 - 2, rotation + mouthOpen, rotation + 2 * Math.PI - mouthOpen);
        ctx.lineTo(px, py);
        ctx.fill();

        // Draw Ghosts
        ghosts.current.forEach(ghost => {
            const gx = ghost.pos.x * CELL_SIZE + CELL_SIZE/2;
            const gy = ghost.pos.y * CELL_SIZE + CELL_SIZE/2;
            
            ctx.fillStyle = ghost.color;
            ctx.beginPath();
            ctx.arc(gx, gy - 2, CELL_SIZE/2 - 2, Math.PI, 0);
            ctx.lineTo(gx + CELL_SIZE/2 - 2, gy + CELL_SIZE/2 - 2);
            ctx.lineTo(gx - CELL_SIZE/2 + 2, gy + CELL_SIZE/2 - 2);
            ctx.fill();

            // Eyes
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(gx - 3, gy - 3, 2, 0, Math.PI * 2);
            ctx.arc(gx + 3, gy - 3, 2, 0, Math.PI * 2);
            ctx.fill();
        });

        update();
        animationRef.current = requestAnimationFrame(draw);
    }, [update]);

    useEffect(() => {
        animationRef.current = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(animationRef.current);
    }, [draw]);

    // Keyboard Controls
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch(e.key) {
                case 'ArrowUp': nextDir.current = { x: 0, y: -1 }; break;
                case 'ArrowDown': nextDir.current = { x: 0, y: 1 }; break;
                case 'ArrowLeft': nextDir.current = { x: -1, y: 0 }; break;
                case 'ArrowRight': nextDir.current = { x: 1, y: 0 }; break;
                case 'p': setPaused(prev => !prev); break;
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const setMoveDir = (x: number, y: number) => {
        nextDir.current = { x, y };
        if (paused) setPaused(false);
    };

    return (
        <div className="flex flex-col h-full bg-[#0a0a0c] text-white font-sans overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center p-3 bg-white/5 border-b border-white/10 shrink-0">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-yellow-400 flex items-center justify-center shadow-lg shadow-yellow-400/20">
                        <div className="w-4 h-4 bg-[#0a0a0c] rounded-full" style={{ clipPath: 'polygon(100% 0%, 100% 100%, 0% 100%, 0% 0%, 100% 0%, 50% 50%)' }} />
                    </div>
                    <div>
                        <h1 className="text-lg font-black italic tracking-tighter uppercase leading-none text-yellow-400">Pac-Man</h1>
                        <p className="text-[8px] text-white/40 uppercase tracking-widest font-bold">Retro Edition</p>
                    </div>
                </div>

                <div className="flex gap-3">
                    <div className="text-right">
                        <p className="text-[8px] text-white/40 uppercase font-bold tracking-wider">Score</p>
                        <p className="text-lg font-black text-white tabular-nums">{score.toLocaleString()}</p>
                    </div>
                </div>
            </div>

            {/* Game Canvas container */}
            <div className="flex-1 flex flex-col items-center justify-center p-2 min-h-0 bg-transparent relative overflow-hidden">
                <div className="relative border-2 border-blue-500/30 rounded-lg overflow-hidden shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                    <canvas 
                        ref={canvasRef}
                        width={MAZE[0].length * CELL_SIZE}
                        height={MAZE.length * CELL_SIZE}
                        className="block bg-black"
                    />

                    {/* Start Overlay */}
                    {paused && !gameOver && (
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center z-20">
                            <button 
                                onClick={() => setPaused(false)}
                                className="w-14 h-14 rounded-full bg-yellow-400 text-black flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl"
                            >
                                <Play className="w-8 h-8 fill-current translate-x-0.5" />
                            </button>
                            <p className="mt-4 text-xs font-bold uppercase tracking-widest text-yellow-400 animate-pulse">Toca para empezar</p>
                        </div>
                    )}

                    {/* Game Over Overlay */}
                    {gameOver && (
                        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0a0c]/80 backdrop-blur-md">
                            <div className="bg-[#121216] border border-white/10 rounded-2xl p-6 w-full max-w-[280px] shadow-2xl">
                                <div className="flex flex-col items-center text-center">
                                    <h2 className="text-2xl font-black italic uppercase tracking-tighter text-red-500 mb-1">¡FIN DEL JUEGO!</h2>
                                    <p className="text-white/40 text-xs mb-4">Puntos: <span className="text-white font-bold">{score.toLocaleString()}</span></p>

                                    {!isSubmitted ? (
                                        <form onSubmit={handleEmailSubmit} className="w-full space-y-3">
                                            <input 
                                                type="email"
                                                required
                                                placeholder="Tu email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-yellow-400 transition-colors"
                                            />
                                            <p className="text-[8px] text-white/40 leading-tight text-left">
                                                Al registrarte aceptas recibir correos de nuestra parte. Puedes darte de baja cuando quieras.
                                            </p>
                                            <button 
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-400/50 text-black font-bold py-2 rounded-lg text-sm flex items-center justify-center gap-2"
                                            >
                                                {isSubmitting ? "..." : "Registrar score"}
                                            </button>
                                            <button 
                                                type="button"
                                                onClick={resetGame}
                                                className="w-full bg-white/5 text-xs text-white/40 py-1"
                                            >
                                                Jugar otra vez
                                            </button>
                                        </form>
                                    ) : (
                                        <div className="text-center">
                                            <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto mb-2" />
                                            <p className="text-sm font-bold">¡Registrado!</p>
                                            <button 
                                                onClick={resetGame}
                                                className="mt-4 bg-yellow-400 text-black px-6 py-2 rounded-lg font-bold"
                                            >
                                                Reiniciar
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-4 px-3 py-1 bg-white/5 rounded-full border border-white/10 flex items-center gap-2">
                    <Trophy className="w-3 h-3 text-yellow-500" />
                    <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest">
                        Récord: <span className="text-white ml-1">{highScore.toLocaleString()}</span>
                    </p>
                </div>
            </div>

            {/* Controls */}
            <div className="p-4 bg-white/5 border-t border-white/10 flex justify-center shrink-0">
                <div className="grid grid-cols-3 gap-2">
                    <div />
                    <button onClick={() => setMoveDir(0, -1)} className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center active:bg-yellow-400 active:text-black transition-all"><ChevronUp /></button>
                    <div />
                    <button onClick={() => setMoveDir(-1, 0)} className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center active:bg-yellow-400 active:text-black transition-all"><ChevronLeft /></button>
                    <button onClick={() => setMoveDir(0, 1)} className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center active:bg-yellow-400 active:text-black transition-all"><ChevronDown /></button>
                    <button onClick={() => setMoveDir(1, 0)} className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center active:bg-yellow-400 active:text-black transition-all"><ChevronRight /></button>
                </div>
            </div>
        </div>
    );
}


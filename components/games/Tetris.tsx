"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Pause, Play, RotateCcw, ArrowLeft, ArrowRight, ArrowDown, ArrowUp, Zap } from 'lucide-react';

// --- Constants ---
const COLS = 10;
const ROWS = 20;

// Optimized Wood Theme Palette
const TETROMINOES = {
    I: { shape: [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]], color: '#A67C52', highlight: '#C5A07F' }, // Oak
    J: { shape: [[1, 0, 0], [1, 1, 1], [0, 0, 0]], color: '#734A29', highlight: '#916341' }, // Walnut
    L: { shape: [[0, 0, 1], [1, 1, 1], [0, 0, 0]], color: '#D9B68B', highlight: '#E6CCB2' }, // Pine
    O: { shape: [[1, 1], [1, 1]], color: '#8C5E35', highlight: '#A67C52' }, // Mahogany
    S: { shape: [[0, 1, 1], [1, 1, 0], [0, 0, 0]], color: '#593D26', highlight: '#734A29' }, // Dark Walnut
    T: { shape: [[0, 1, 0], [1, 1, 1], [0, 0, 0]], color: '#BF9E7B', highlight: '#D9B68B' }, // Birch
    Z: { shape: [[1, 1, 0], [0, 1, 1], [0, 0, 0]], color: '#402B1B', highlight: '#593D26' }, // Ebony
};

const SHAPES = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'] as const;

type ShapeType = typeof SHAPES[number];

interface Piece {
    pos: { x: number; y: number };
    shape: number[][];
    color: string;
    highlight: string;
    type: ShapeType;
}

// --- Utils ---
const createEmptyGrid = () => Array.from({ length: ROWS }, () => Array(COLS).fill(0));

const getRandomPiece = (): Piece => {
    const type = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    const { shape, color, highlight } = TETROMINOES[type];
    return {
        pos: { x: Math.floor(COLS / 2) - Math.floor(shape[0].length / 2), y: 0 },
        shape,
        color,
        highlight,
        type
    };
};

export default function Tetris() {
    // --- State ---
    const [grid, setGrid] = useState<any[][]>(createEmptyGrid());
    const [activePiece, setActivePiece] = useState<Piece | null>(null);
    const [nextPiece, setNextPiece] = useState<Piece>(getRandomPiece());
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [linesCleared, setLinesCleared] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [highScore, setHighScore] = useState(0);
    const [isNewRecord, setIsNewRecord] = useState(false);

    const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

    // --- High Score Logic ---
    useEffect(() => {
        const saved = localStorage.getItem('tetris-high-score-wood');
        if (saved) setHighScore(parseInt(saved));
    }, []);

    const updateHighScore = useCallback((finalScore: number) => {
        if (finalScore > highScore) {
            setHighScore(finalScore);
            setIsNewRecord(true);
            localStorage.setItem('tetris-high-score-wood', finalScore.toString());
        }
    }, [highScore]);

    // --- Collision Detection ---
    const checkCollision = (piece: Piece, moveX = 0, moveY = 0, newShape?: number[][]) => {
        const shape = newShape || piece.shape;
        for (let y = 0; y < shape.length; y++) {
            for (let x = 0; x < shape[y].length; x++) {
                if (shape[y][x] !== 0) {
                    const nextX = piece.pos.x + x + moveX;
                    const nextY = piece.pos.y + y + moveY;

                    if (
                        nextX < 0 ||
                        nextX >= COLS ||
                        nextY >= ROWS ||
                        (nextY >= 0 && grid[nextY][nextX] !== 0)
                    ) {
                        return true;
                    }
                }
            }
        }
        return false;
    };

    // --- Hard Drop Calculation ---
    const getGhostPiece = () => {
        if (!activePiece) return null;
        let dropY = 0;
        while (!checkCollision(activePiece, 0, dropY + 1)) {
            dropY++;
        }
        return { ...activePiece, pos: { ...activePiece.pos, y: activePiece.pos.y + dropY } };
    };

    // --- Rotation ---
    const rotate = () => {
        if (!activePiece || isPaused || gameOver) return;
        const newShape = activePiece.shape[0].map((_, i) =>
            activePiece.shape.map(row => row[i]).reverse()
        );

        // Basic Wall Kick
        if (!checkCollision(activePiece, 0, 0, newShape)) {
            setActivePiece({ ...activePiece, shape: newShape });
        } else if (!checkCollision(activePiece, -1, 0, newShape)) {
            setActivePiece({ ...activePiece, pos: { ...activePiece.pos, x: activePiece.pos.x - 1 }, shape: newShape });
        } else if (!checkCollision(activePiece, 1, 0, newShape)) {
            setActivePiece({ ...activePiece, pos: { ...activePiece.pos, x: activePiece.pos.x + 1 }, shape: newShape });
        }
    };

    // --- Movement ---
    const move = (dir: number) => {
        if (!activePiece || isPaused || gameOver) return;
        if (!checkCollision(activePiece, dir, 0)) {
            setActivePiece({ ...activePiece, pos: { ...activePiece.pos, x: activePiece.pos.x + dir } });
        }
    };

    const drop = useCallback(() => {
        if (!activePiece || isPaused || gameOver) return;

        if (!checkCollision(activePiece, 0, 1)) {
            setActivePiece({ ...activePiece, pos: { ...activePiece.pos, y: activePiece.pos.y + 1 } });
        } else {
            // Place piece
            const newGrid = [...grid.map(row => [...row])];
            let isGameOverReached = false;

            activePiece.shape.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) {
                        const gridY = activePiece.pos.y + y;
                        if (gridY < 0) {
                            isGameOverReached = true;
                        } else {
                            newGrid[gridY][activePiece.pos.x + x] = {
                                color: activePiece.color,
                                highlight: activePiece.highlight,
                                type: activePiece.type
                            };
                        }
                    }
                });
            });

            if (isGameOverReached) {
                setGameOver(true);
                updateHighScore(score);
                setActivePiece(null);
                return;
            }

            // Check for completed lines
            let linesThisDrop = 0;
            const finalGrid = newGrid.filter(row => {
                const isComplete = row.every(cell => cell !== 0);
                if (isComplete) linesThisDrop++;
                return !isComplete;
            });

            while (finalGrid.length < ROWS) {
                finalGrid.unshift(Array(COLS).fill(0));
            }

            if (linesThisDrop > 0) {
                const points = [0, 100, 300, 500, 800][linesThisDrop] * level;
                setScore(s => s + points);
                setLinesCleared(l => {
                    const newTotal = l + linesThisDrop;
                    if (Math.floor(newTotal / 10) > Math.floor(l / 10)) {
                        setLevel(prev => prev + 1);
                    }
                    return newTotal;
                });
            }

            // Check if next piece can be spawned
            if (checkCollision(nextPiece, 0, 0, undefined)) {
                setGameOver(true);
                updateHighScore(score + ([0, 100, 300, 500, 800][linesThisDrop] * level)); // Add final points
                setGrid(finalGrid);
                setActivePiece(null);
            } else {
                setGrid(finalGrid);
                setActivePiece(nextPiece);
                setNextPiece(getRandomPiece());
            }
        }
    }, [activePiece, grid, isPaused, gameOver, nextPiece, level, score, updateHighScore]);

    const hardDrop = () => {
        if (!activePiece || isPaused || gameOver) return;
        const ghost = getGhostPiece();
        if (ghost) {
            setActivePiece(ghost);
            setTimeout(drop, 0); // Trigger immediate drop logic
        }
    };

    // --- Game Loop ---
    useEffect(() => {
        if (!gameOver && !isPaused && activePiece) {
            const speed = Math.max(100, 800 - (level - 1) * 70);
            gameLoopRef.current = setInterval(drop, speed);
        }
        return () => {
            if (gameLoopRef.current) clearInterval(gameLoopRef.current);
        };
    }, [gameOver, isPaused, activePiece, level, drop]);

    // Initial Start
    useEffect(() => {
        setActivePiece(getRandomPiece());
        setNextPiece(getRandomPiece());
    }, []);

    // --- Keyboard Controls ---
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (gameOver) return;
            switch (e.key) {
                case 'ArrowLeft': case 'a': move(-1); break;
                case 'ArrowRight': case 'd': move(1); break;
                case 'ArrowDown': case 's': drop(); break;
                case 'ArrowUp': case 'w': rotate(); break;
                case ' ': e.preventDefault(); hardDrop(); break;
                case 'p': setIsPaused(p => !p); break;
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activePiece, gameOver, isPaused, drop, move, rotate]);

    const resetGame = () => {
        setGrid(createEmptyGrid());
        setActivePiece(getRandomPiece());
        setNextPiece(getRandomPiece());
        setScore(0);
        setLevel(1);
        setLinesCleared(0);
        setGameOver(false);
        setIsPaused(false);
        setIsNewRecord(false);
    };

    // --- Rendering Helpers ---
    const displayGrid = grid.map(row => [...row]);
    const ghostPiece = getGhostPiece();

    if (ghostPiece) {
        ghostPiece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    const gridY = ghostPiece.pos.y + y;
                    if (gridY >= 0 && gridY < ROWS && displayGrid[gridY][ghostPiece.pos.x + x] === 0) {
                        displayGrid[gridY][ghostPiece.pos.x + x] = { isGhost: true, color: ghostPiece.color };
                    }
                }
            });
        });
    }

    if (activePiece) {
        activePiece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    const gridY = activePiece.pos.y + y;
                    if (gridY >= 0 && gridY < ROWS) {
                        displayGrid[gridY][activePiece.pos.x + x] = {
                            color: activePiece.color,
                            highlight: activePiece.highlight,
                            type: activePiece.type
                        };
                    }
                }
            });
        });
    }

    return (
        <div className="flex flex-col items-center justify-center bg-[#2D1B0D] p-2 min-h-[100dvh] w-full font-sans overflow-hidden">
            {/* Background Texture Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-20 mix-blend-overlay"
                style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)', backgroundSize: '4px 4px' }} />

            {/* Header / Info Area */}
            <div className="w-full max-w-[400px] flex justify-between items-center mb-4 px-2 z-10">
                <div className="bg-[#4D3424] border-2 border-[#8C5E35] rounded-xl p-3 shadow-[0_4px_0_#2D1B0D] flex-1 mr-2 text-center">
                    <p className="text-[#D9B68B] text-[10px] font-bold uppercase tracking-wider">Score</p>
                    <p className="text-white text-xl font-black">{score.toLocaleString()}</p>
                </div>

                <div className="bg-[#4D3424] border-2 border-[#8C5E35] rounded-xl p-2 shadow-[0_4px_0_#2D1B0D] w-20 flex flex-col items-center">
                    <p className="text-[#D9B68B] text-[9px] font-bold uppercase mb-1">Next</p>
                    <div className="w-12 h-12 flex items-center justify-center transform scale-75 origin-center">
                        {nextPiece && nextPiece.shape.map((row, y) => (
                            <div key={y} className="flex">
                                {row.map((val, x) => (
                                    <div key={x}
                                        className={`w-3 h-3 m-[1px] rounded-sm ${val ? '' : 'invisible'}`}
                                        style={{
                                            backgroundColor: nextPiece.color,
                                            boxShadow: `inset -2px -2px 0 rgba(0,0,0,0.3), inset 2px 2px 0 ${nextPiece.highlight}`
                                        }} />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-[#4D3424] border-2 border-[#8C5E35] rounded-xl p-3 shadow-[0_4px_0_#2D1B0D] flex-1 ml-2 text-center">
                    <p className="text-[#D9B68B] text-[10px] font-bold uppercase tracking-wider">Level</p>
                    <p className="text-white text-xl font-black">{level}</p>
                </div>
            </div>

            {/* Main Game Board */}
            <div className="relative z-10 p-2 bg-[#1A0F07] rounded-2xl border-[6px] border-[#593D26] shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
                <div
                    className="grid gap-[1px] bg-[#1A0F07]"
                    style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`, width: 'min(75vw, 280px)', height: 'min(150vw, 560px)' }}
                >
                    {displayGrid.flat().map((cell, i) => (
                        <div key={i} className="relative w-full h-full rounded-sm overflow-hidden"
                            style={{ backgroundColor: cell ? 'transparent' : 'rgba(255,255,255,0.03)' }}>
                            {cell && (
                                <div className={`w-full h-full transform transition-all duration-300 ${cell.isGhost ? 'opacity-20 border border-white/30' : ''}`}
                                    style={{
                                        backgroundColor: cell.color,
                                        boxShadow: cell.isGhost ? 'none' : `inset -4px -4px 0 rgba(0,0,0,0.4), inset 4px 4px 0 ${cell.highlight}`,
                                        borderRadius: '3px'
                                    }}>
                                    {/* Wood Grain Simulation */}
                                    {!cell.isGhost && (
                                        <div className="absolute inset-0 opacity-10"
                                            style={{ background: 'linear-gradient(90deg, transparent 40%, rgba(255,255,255,0.2) 45%, transparent 50%)', transform: 'rotate(45deg)' }} />
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Pause / Game Over Overlay */}
                {(isPaused || gameOver) && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/70 backdrop-blur-sm rounded-xl">
                        <div className="text-center p-6 bg-[#4D3424] border-4 border-[#8C5E35] rounded-3xl shadow-2xl transform scale-110">
                            {gameOver ? (
                                <>
                                    <h2 className="text-3xl font-black text-white mb-1 tracking-tighter uppercase italic">Game Over!</h2>
                                    {isNewRecord && (
                                        <div className="mb-4 animate-bounce">
                                            <p className="text-[#FFD700] text-sm font-bold uppercase tracking-widest">🏆 New Record! 🏆</p>
                                        </div>
                                    )}
                                    <p className="text-[#D9B68B] mb-6 font-bold">Final Score: {score}</p>
                                    <button
                                        onClick={resetGame}
                                        className="bg-[#D9B68B] hover:bg-white text-[#4D3424] font-black py-4 px-10 rounded-2xl shadow-[0_6px_0_#8C5E35] active:shadow-none active:translate-y-1 transition-all flex items-center gap-2 text-xl"
                                    >
                                        <RotateCcw className="w-6 h-6" /> Replay
                                    </button>
                                </>
                            ) : (
                                <>
                                    <h2 className="text-4xl font-black text-white mb-8 tracking-tighter uppercase italic">Paused</h2>
                                    <button
                                        onClick={() => setIsPaused(false)}
                                        className="bg-[#D9B68B] hover:bg-white text-[#4D3424] font-black py-4 px-12 rounded-2xl shadow-[0_6px_0_#8C5E35] active:shadow-none active:translate-y-1 transition-all flex items-center gap-2 text-xl"
                                    >
                                        <Play className="w-6 h-6 fill-current" /> Resume
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* High Score Footer */}
            <div className="mt-4 px-4 py-1 bg-[#1A0F07]/50 rounded-full border border-[#4D3424] z-10">
                <p className="text-[#D9B68B] text-[10px] font-bold uppercase tracking-widest">
                    Best: <span className="text-white ml-2">{highScore.toLocaleString()}</span>
                </p>
            </div>

            {/* Bottom Controls - Optimized for Mobile Thumbs */}
            <div className="w-full max-w-[450px] mt-auto pb-4 pt-4 px-2 z-10 grid grid-cols-4 gap-3 items-end">
                {/* D-Pad Left */}
                <div className="col-span-1 space-y-3">
                    <button onClick={() => move(-1)}
                        className="w-full aspect-square bg-[#593D26] border-2 border-[#8C5E35] rounded-2xl shadow-[0_6px_0_#2D1B0D] active:shadow-none active:translate-y-1 transition-all flex items-center justify-center">
                        <ArrowLeft className="text-[#D9B68B] w-8 h-8" strokeWidth={3} />
                    </button>
                    <button onClick={() => setIsPaused(p => !p)}
                        className="w-full h-12 bg-[#402B1B] border border-[#593D26] rounded-xl flex items-center justify-center">
                        {isPaused ? <Play className="text-[#D9B68B] w-5 h-5 fill-current" /> : <Pause className="text-[#D9B68B] w-5 h-5 fill-current" />}
                    </button>
                </div>

                {/* Center Controls (Down & HardDrop) */}
                <div className="col-span-2 flex flex-col items-center gap-3 px-2">
                    <button onClick={hardDrop}
                        className="w-full py-4 bg-[#8C5E35] border-2 border-[#D9B68B] rounded-3xl shadow-[0_6px_0_#4D3424] active:shadow-none active:translate-y-1 transition-all flex items-center justify-center gap-2">
                        <Zap className="text-white w-6 h-6 fill-current" />
                        <span className="text-white font-black uppercase text-sm tracking-tight">Hard Drop</span>
                    </button>
                    <button onClick={drop}
                        className="w-full py-3 bg-[#593D26] border-2 border-[#8C5E35] rounded-2xl shadow-[0_4px_0_#2D1B0D] active:shadow-none active:translate-y-1 transition-all flex items-center justify-center">
                        <ArrowDown className="text-[#D9B68B] w-7 h-7" strokeWidth={3} />
                    </button>
                </div>

                {/* D-Pad Right & Rotate */}
                <div className="col-span-1 space-y-3">
                    <button onClick={() => move(1)}
                        className="w-full aspect-square bg-[#593D26] border-2 border-[#8C5E35] rounded-2xl shadow-[0_6px_0_#2D1B0D] active:shadow-none active:translate-y-1 transition-all flex items-center justify-center">
                        <ArrowRight className="text-[#D9B68B] w-8 h-8" strokeWidth={3} />
                    </button>
                    <button onClick={rotate}
                        className="w-full aspect-square bg-[#D9B68B] border-2 border-white rounded-2xl shadow-[0_6px_0_#8C5E35] active:shadow-none active:translate-y-1 transition-all flex items-center justify-center">
                        <ArrowUp className="text-[#4D3424] w-9 h-9" strokeWidth={4} />
                    </button>
                </div>
            </div>

            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;700&display=swap');
                body {
                    font-family: 'Fredoka', sans-serif;
                }
            `}</style>
        </div>
    );
}

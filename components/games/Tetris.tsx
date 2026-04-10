'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Trophy, Play, Pause, RotateCcw, ChevronLeft, ChevronRight, ChevronDown, Rocket, Mail, Send, CheckCircle2 } from 'lucide-react';

// Configuration
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const INITIAL_SPEED = 800;
const SPEED_INCREMENT = 0.95;

// Vibrant Modern Palette
const TETROMINOES = {
    I: { shape: [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]], color: '#00A3FF' }, // Azul
    J: { shape: [[0, 1, 0], [0, 1, 0], [1, 1, 0]], color: '#FF008A' }, // Rosa
    L: { shape: [[0, 1, 0], [0, 1, 0], [0, 1, 1]], color: '#FF6B00' }, // Naranja
    O: { shape: [[1, 1], [1, 1]], color: '#FFD600' }, // Amarillo
    S: { shape: [[0, 1, 1], [1, 1, 0], [0, 0, 0]], color: '#00E040' }, // Verde
    T: { shape: [[0, 1, 0], [1, 1, 1], [0, 0, 0]], color: '#BD00FF' }, // Morado
    Z: { shape: [[1, 1, 0], [0, 1, 1], [0, 0, 0]], color: '#FF2E2E' }, // Rojo
};

type TetrominoType = keyof typeof TETROMINOES;

interface Piece {
    pos: { x: number; y: number };
    tetromino: number[][];
    color: string;
    type: TetrominoType;
}

export default function Tetris() {
    const [grid, setGrid] = useState<string[][]>(
        Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(''))
    );
    const [activePiece, setActivePiece] = useState<Piece | null>(null);
    const [nextPieceType, setNextPieceType] = useState<TetrominoType>('I');
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [lines, setLines] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [paused, setPaused] = useState(false);
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    
    const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
    const speedRef = useRef(INITIAL_SPEED);

    // Load High Score
    useEffect(() => {
        const saved = localStorage.getItem('tetris-high-score-vibrant');
        if (saved) setHighScore(parseInt(saved));
    }, []);

    // Helper: Random Tetromino
    const randomTetrominoType = useCallback((): TetrominoType => {
        const types = Object.keys(TETROMINOES) as TetrominoType[];
        return types[Math.floor(Math.random() * types.length)];
    }, []);

    // Initialize Game
    const spawnPiece = useCallback((type?: TetrominoType) => {
        const tType = type || randomTetrominoType();
        const next = randomTetrominoType();
        setNextPieceType(next);

        const piece: Piece = {
            pos: { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 },
            tetromino: TETROMINOES[tType].shape,
            color: TETROMINOES[tType].color,
            type: tType
        };

        // Check for Game Over immediately on spawn
        if (checkCollision(piece.pos, piece.tetromino, grid)) {
            setGameOver(true);
            return;
        }

        setActivePiece(piece);
    }, [grid, randomTetrominoType]);

    // Collision Detection
    const checkCollision = (pos: { x: number; y: number }, tetromino: number[][], currentGrid: string[][]) => {
        for (let y = 0; y < tetromino.length; y++) {
            for (let x = 0; x < tetromino[y].length; x++) {
                if (tetromino[y][x] !== 0) {
                    const newX = pos.x + x;
                    const newY = pos.y + y;
                    if (
                        newX < 0 || 
                        newX >= BOARD_WIDTH || 
                        newY >= BOARD_HEIGHT ||
                        (newY >= 0 && currentGrid[newY][newX] !== '')
                    ) {
                        return true;
                    }
                }
            }
        }
        return false;
    };

    // Rotate Piece
    const rotate = (matrix: number[][]) => {
        const rotated = matrix[0].map((_, index) => matrix.map(col => col[index]).reverse());
        return rotated;
    };

    // Handle Movement
    const movePiece = useCallback((dir: { x: number; y: number }) => {
        if (!activePiece || gameOver || paused) return;

        const newPos = { x: activePiece.pos.x + dir.x, y: activePiece.pos.y + dir.y };
        if (!checkCollision(newPos, activePiece.tetromino, grid)) {
            setActivePiece(prev => prev ? { ...prev, pos: newPos } : null);
        } else if (dir.y > 0) {
            // Hit bottom or another piece
            lockPiece();
        }
    }, [activePiece, grid, gameOver, paused]);

    const handleRotate = useCallback(() => {
        if (!activePiece || gameOver || paused) return;
        const rotated = rotate(activePiece.tetromino);
        if (!checkCollision(activePiece.pos, rotated, grid)) {
            setActivePiece(prev => prev ? { ...prev, tetromino: rotated } : null);
        }
    }, [activePiece, grid, gameOver, paused]);

    // Lock Piece and Clear Lines
    const lockPiece = useCallback(() => {
        if (!activePiece) return;

        const newGrid = grid.map(row => [...row]);
        activePiece.tetromino.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    const gridY = activePiece.pos.y + y;
                    const gridX = activePiece.pos.x + x;
                    if (gridY >= 0) newGrid[gridY][gridX] = activePiece.color;
                }
            });
        });

        // Clear lines
        let clearedLines = 0;
        const filteredGrid = newGrid.filter(row => {
            const isFull = row.every(cell => cell !== '');
            if (isFull) clearedLines++;
            return !isFull;
        });

        while (filteredGrid.length < BOARD_HEIGHT) {
            filteredGrid.unshift(Array(BOARD_WIDTH).fill(''));
        }

        if (clearedLines > 0) {
            const points = [0, 100, 300, 500, 800][clearedLines] * level;
            setScore(prev => {
                const newScore = prev + points;
                if (newScore > highScore) {
                    setHighScore(newScore);
                    localStorage.setItem('tetris-high-score-vibrant', newScore.toString());
                }
                return newScore;
            });
            setLines(prev => {
                const newTotal = prev + clearedLines;
                if (Math.floor(newTotal / 10) > Math.floor(prev / 10)) {
                    setLevel(l => l + 1);
                    speedRef.current *= SPEED_INCREMENT;
                }
                return newTotal;
            });
        }

        setGrid(filteredGrid);
        spawnPiece(nextPieceType);
    }, [activePiece, grid, level, highScore, nextPieceType, spawnPiece, spawnPiece]);

    // Game Loop
    useEffect(() => {
        if (gameOver || paused) return;

        if (!activePiece) {
            spawnPiece();
            return;
        }

        gameLoopRef.current = setInterval(() => {
            movePiece({ x: 0, y: 1 });
        }, speedRef.current);

        return () => {
            if (gameLoopRef.current) clearInterval(gameLoopRef.current);
        };
    }, [activePiece, movePiece, gameOver, paused, spawnPiece]);

    // Keyboard Controls
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (gameOver) return;
            
            switch (e.key) {
                case 'ArrowLeft': movePiece({ x: -1, y: 0 }); break;
                case 'ArrowRight': movePiece({ x: 1, y: 0 }); break;
                case 'ArrowDown': movePiece({ x: 0, y: 1 }); break;
                case 'ArrowUp': handleRotate(); break;
                case 'p':
                case 'P': setPaused(prev => !prev); break;
                case ' ': // Hard drop
                    if (!activePiece || paused) return;
                    let dropY = 0;
                    while (!checkCollision({ x: activePiece.pos.x, y: activePiece.pos.y + dropY + 1 }, activePiece.tetromino, grid)) {
                        dropY++;
                    }
                    setActivePiece(prev => prev ? { ...prev, pos: { ...prev.pos, y: prev.pos.y + dropY } } : null);
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [movePiece, handleRotate, gameOver, paused, activePiece, grid]);

    const resetGame = () => {
        setGrid(Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill('')));
        setActivePiece(null);
        setScore(0);
        setLines(0);
        setLevel(1);
        setGameOver(false);
        setPaused(false);
        setIsSubmitted(false);
        setEmail('');
        speedRef.current = INITIAL_SPEED;
    };

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            console.log("Score registered for:", email, "Score:", score);
        }, 1500);
    };

    // Cell size: fill available width on mobile (max 480px wrapper, minus 16px padding each side)
    // 10 columns + 9 gaps of 1px = 10*cell + 9
    // target: min(calc((100vw - 32px) / 10), 30px)
    const CELL = 'min(calc((min(100vw, 480px) - 32px) / 10), 30px)';

    return (
        <div className="flex flex-col bg-[#0a0a0c] text-white font-sans selection:bg-pink-500/30 overflow-hidden" style={{ minHeight: '100%' }}>
            {/* Header Stats */}
            <div className="flex justify-between items-center px-3 py-2 bg-white/5 border-b border-white/10 shrink-0">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg shadow-pink-500/20">
                        <Rocket className="w-4 h-4 text-white" />
                    </div>
                    <h1 className="text-base font-black italic tracking-tighter uppercase leading-none">Tetris</h1>
                </div>

                {/* Score + Next piece in header */}
                <div className="flex items-center gap-3">
                    {/* Next piece mini preview */}
                    <div className="flex flex-col items-center">
                        <p className="text-[7px] text-white/40 uppercase font-bold tracking-wider mb-0.5">Next</p>
                        <div className="flex flex-col items-center justify-center w-10 h-8 bg-white/5 rounded-md border border-white/10">
                            <div className="flex flex-col" style={{ transform: 'scale(0.55)', transformOrigin: 'center' }}>
                                {TETROMINOES[nextPieceType].shape.map((row, y) => (
                                    <div key={y} className="flex">
                                        {row.map((cell, x) => (
                                            <div key={x} className={`w-3.5 h-3.5 rounded-sm m-px ${cell ? '' : 'opacity-0'}`}
                                                style={{ backgroundColor: TETROMINOES[nextPieceType].color }} />
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-[7px] text-white/40 uppercase font-bold tracking-wider">Score</p>
                        <p className="text-base font-black text-white tabular-nums">{score.toLocaleString()}</p>
                    </div>
                    <div className="text-right border-l border-white/10 pl-3">
                        <p className="text-[7px] text-white/40 uppercase font-bold tracking-wider">Lvl</p>
                        <p className="text-base font-black text-pink-500 tabular-nums">{level}</p>
                    </div>
                </div>
            </div>

            {/* Main Game Area */}
            <div className="flex-1 flex flex-col items-center justify-start pt-2 px-2 pb-1 min-h-0 bg-transparent relative overflow-hidden">
                {/* Ambient glow */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-500/5 rounded-full blur-[80px] pointer-events-none" />
                
                <div className="relative z-10 flex flex-col items-center w-full">
                    {/* Game Grid — responsive cell size */}
                    <div 
                        className="grid bg-[#0a0a0c]/80 backdrop-blur-xl border-2 border-white/10 rounded-xl overflow-hidden shadow-2xl relative"
                        style={{
                            gridTemplateColumns: `repeat(${BOARD_WIDTH}, ${CELL})`,
                            gridTemplateRows: `repeat(${BOARD_HEIGHT}, ${CELL})`,
                            gap: '1px'
                        }}
                    >
                        {grid.map((row, y) => (
                            row.map((cell, x) => {
                                let activeColor = '';
                                if (activePiece) {
                                    const pieceX = x - activePiece.pos.x;
                                    const pieceY = y - activePiece.pos.y;
                                    if (
                                        pieceY >= 0 && pieceY < activePiece.tetromino.length &&
                                        pieceX >= 0 && pieceX < activePiece.tetromino[pieceY].length &&
                                        activePiece.tetromino[pieceY][pieceX] !== 0
                                    ) {
                                        activeColor = activePiece.color;
                                    }
                                }

                                const color = cell || activeColor;
                                return (
                                    <div 
                                        key={`${y}-${x}`}
                                        className={`w-full h-full transition-all duration-200 ${color ? 'shadow-[inset_0_0_5px_rgba(255,255,255,0.2)]' : 'bg-white/[0.02]'}`}
                                        style={{ 
                                            backgroundColor: color || 'transparent',
                                            borderRadius: color ? '1px' : '0'
                                        }}
                                    />
                                );
                            })
                        ))}

                        {/* Pause Overlay */}
                        {paused && !gameOver && (
                            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-30 flex flex-col items-center justify-center">
                                <button 
                                    onClick={() => setPaused(false)}
                                    className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl mb-3"
                                >
                                    <Play className="w-6 h-6 fill-current translate-x-0.5" />
                                </button>
                                <p className="text-lg font-black uppercase tracking-widest italic">PAUSA</p>
                            </div>
                        )}
                    </div>

                    {/* High Score Badge — compact, below board */}
                    <div className="mt-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 z-10 flex items-center gap-2">
                        <Trophy className="w-3 h-3 text-yellow-500" />
                        <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest">
                            Best: <span className="text-white ml-1">{highScore.toLocaleString()}</span>
                        </p>
                    </div>
                </div>

                {/* Pop-up: Game Over & Registration */}
                {gameOver && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0a0c]/80 backdrop-blur-lg">
                        <div className="bg-[#121216] border border-white/10 rounded-3xl p-6 w-full max-w-sm shadow-2xl animate-in zoom-in-95 duration-300 relative">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 rounded-2xl bg-red-500/20 flex items-center justify-center mb-4">
                                    <RotateCcw className="w-8 h-8 text-red-500" />
                                </div>
                                <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-1">¡FIN DEL JUEGO!</h2>
                                <p className="text-white/40 text-sm mb-6">Puntuación Final: <span className="text-white font-bold">{score.toLocaleString()}</span></p>

                                {!isSubmitted ? (
                                    <form onSubmit={handleEmailSubmit} className="w-full space-y-4">
                                        <div className="text-left">
                                            <h3 className="text-[10px] font-bold uppercase tracking-widest text-pink-500 mb-2">Registra tu puntuación</h3>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                                                <input 
                                                    type="email"
                                                    required
                                                    placeholder="Tu correo electrónico"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-pink-500 transition-colors"
                                                />
                                            </div>
                                        </div>

                                        <p className="text-[9px] text-white/40 leading-relaxed text-left bg-white/5 p-3 rounded-xl border border-white/5">
                                            Al registrarte y enviar tu puntuación, das tu consentimiento para el uso de tu información para registrar y mostrar tu puntuación, y para recibir comunicaciones relacionadas. Puedes darte de baja en cualquier momento.
                                        </p>

                                        <button 
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-pink-500/50 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95"
                                        >
                                            {isSubmitting ? (
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            ) : (
                                                <>
                                                    <Send className="w-4 h-4" />
                                                    Enviar Puntuación
                                                </>
                                            )}
                                        </button>
                                        
                                        <button 
                                            type="button"
                                            onClick={resetGame}
                                            className="w-full bg-white/5 hover:bg-white/10 text-white/60 font-bold py-3 rounded-xl transition-all text-xs"
                                        >
                                            Intentar de nuevo
                                        </button>
                                    </form>
                                ) : (
                                    <div className="w-full py-8 text-center animate-in fade-in zoom-in-95 duration-500">
                                        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                                            <CheckCircle2 className="w-8 h-8 text-green-500" />
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">¡Registrado!</h3>
                                        <p className="text-white/40 text-sm mb-8">Tu puntuación ha sido guardada.</p>
                                        <button 
                                            onClick={resetGame}
                                            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-xl transition-all"
                                        >
                                            Jugar de nuevo
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Controls Bar — larger buttons, optimized for mobile */}
            <div className="px-3 py-3 bg-white/5 border-t border-white/10 shrink-0 safe-area-bottom">
                <div className="flex justify-between items-center">
                    {/* D-Pad */}
                    <div className="flex gap-2">
                        <button 
                            onPointerDown={() => movePiece({ x: -1, y: 0 })}
                            className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center active:bg-pink-500 active:scale-90 transition-all border border-white/10"
                        >
                            <ChevronLeft className="w-7 h-7" />
                        </button>
                        <div className="flex flex-col gap-2">
                            <button 
                                onPointerDown={handleRotate}
                                className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center active:bg-pink-500 active:scale-90 transition-all border border-white/10"
                            >
                                <RotateCcw className="w-5 h-5" />
                            </button>
                        </div>
                        <button 
                            onPointerDown={() => movePiece({ x: 1, y: 0 })}
                            className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center active:bg-pink-500 active:scale-90 transition-all border border-white/10"
                        >
                            <ChevronRight className="w-7 h-7" />
                        </button>
                    </div>

                    {/* Right side: Down fast + Pause */}
                    <div className="flex flex-col gap-2 items-center">
                        <button 
                            onPointerDown={() => movePiece({ x: 0, y: 1 })}
                            className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center active:bg-pink-500 active:scale-90 transition-all border border-white/10"
                        >
                            <ChevronDown className="w-7 h-7" />
                        </button>
                        <button 
                            onClick={() => setPaused(prev => !prev)}
                            className="w-14 h-14 rounded-xl bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl"
                        >
                            {paused ? <Play className="w-6 h-6 fill-current" /> : <Pause className="w-6 h-6 fill-current" />}
                        </button>
                    </div>
                </div>
            </div>
            
            <style jsx>{`
                .safe-area-bottom {
                    padding-bottom: max(0.75rem, env(safe-area-inset-bottom));
                }
            `}</style>
        </div>
    );
}


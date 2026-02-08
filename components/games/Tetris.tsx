'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';

// --- Types & Constants ---

type Shape = number[][];

interface Tetromino {
    shape: Shape;
    color: string;
    name: string;
}

const TETROMINOES: Record<string, Tetromino> = {
    I: {
        shape: [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
        color: 'bg-cyan-500',
        name: 'I'
    },
    J: {
        shape: [[1, 0, 0], [1, 1, 1], [0, 0, 0]],
        color: 'bg-blue-600',
        name: 'J'
    },
    L: {
        shape: [[0, 0, 1], [1, 1, 1], [0, 0, 0]],
        color: 'bg-orange-500',
        name: 'L'
    },
    O: {
        shape: [[1, 1], [1, 1]],
        color: 'bg-yellow-400',
        name: 'O'
    },
    S: {
        shape: [[0, 1, 1], [1, 1, 0], [0, 0, 0]],
        color: 'bg-green-500',
        name: 'S'
    },
    T: {
        shape: [[0, 1, 0], [1, 1, 1], [0, 0, 0]],
        color: 'bg-purple-500',
        name: 'T'
    },
    Z: {
        shape: [[1, 1, 0], [0, 1, 1], [0, 0, 0]],
        color: 'bg-red-500',
        name: 'Z'
    }
};

const COLS = 10;
const ROWS = 20;

const createEmptyGrid = () =>
    Array.from({ length: ROWS }, () => Array(COLS).fill(null));

const getRandomTetromino = () => {
    const keys = Object.keys(TETROMINOES);
    const key = keys[Math.floor(Math.random() * keys.length)];
    return { ...TETROMINOES[key], pos: { x: 3, y: -1 } };
};

// --- Component ---

export default function Tetris() {
    // Game State
    const [grid, setGrid] = useState<(string | null)[][]>(createEmptyGrid());
    const [activePiece, setActivePiece] = useState<any>(null);
    const [nextPiece, setNextPiece] = useState<any>(null);
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [lines, setLines] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [paused, setPaused] = useState(false);
    const [highScore, setHighScore] = useState(0);
    const [isNewRecord, setIsNewRecord] = useState(false);

    const gameLoop = useRef<NodeJS.Timeout | null>(null);

    // Initialization
    useEffect(() => {
        const saved = localStorage.getItem('tetris-high-score');
        if (saved) setHighScore(parseInt(saved, 10));
        startNewGame();
        return () => stopLoop();
    }, []);

    const startNewGame = () => {
        setGrid(createEmptyGrid());
        const first = getRandomTetromino();
        const second = getRandomTetromino();
        setActivePiece(first);
        setNextPiece(second);
        setScore(0);
        setLevel(1);
        setLines(0);
        setGameOver(false);
        setIsNewRecord(false);
        setPaused(false);
        startLoop(1000);
    };

    // Loop Logic
    const startLoop = (ms: number) => {
        stopLoop();
        gameLoop.current = setInterval(tick, ms);
    };

    const stopLoop = () => {
        if (gameLoop.current) clearInterval(gameLoop.current);
    };

    useEffect(() => {
        if (!gameOver && !paused) {
            const speed = Math.max(100, 1000 - (level - 1) * 100);
            startLoop(speed);
        } else {
            stopLoop();
        }
    }, [level, gameOver, paused]);

    const tick = () => {
        moveDown();
    };

    // Collision Detection
    const checkCollision = (piece: any, newPos: { x: number, y: number }, newShape?: Shape) => {
        const shape = newShape || piece.shape;
        for (let y = 0; y < shape.length; y++) {
            for (let x = 0; x < shape[y].length; x++) {
                if (shape[y][x]) {
                    const nextX = newPos.x + x;
                    const nextY = newPos.y + y;

                    if (
                        nextX < 0 ||
                        nextX >= COLS ||
                        nextY >= ROWS ||
                        (nextY >= 0 && grid[nextY][nextX])
                    ) {
                        return true;
                    }
                }
            }
        }
        return false;
    };

    // Piece Movement
    const moveHorizontal = (dir: number) => {
        if (gameOver || paused || !activePiece) return;
        const newPos = { ...activePiece.pos, x: activePiece.pos.x + dir };
        if (!checkCollision(activePiece, newPos)) {
            setActivePiece({ ...activePiece, pos: newPos });
        }
    };

    const moveDown = () => {
        if (gameOver || paused || !activePiece) return;
        const newPos = { ...activePiece.pos, y: activePiece.pos.y + 1 };

        if (!checkCollision(activePiece, newPos)) {
            setActivePiece({ ...activePiece, pos: newPos });
        } else {
            lockPiece();
        }
    };

    const rotate = () => {
        if (gameOver || paused || !activePiece) return;

        // Simple rotation
        const rotatedShape = activePiece.shape[0].map((_: any, index: number) =>
            activePiece.shape.map((col: any) => col[index]).reverse()
        );

        // Basic wall kick (check center, then 1 left, then 1 right)
        if (!checkCollision(activePiece, activePiece.pos, rotatedShape)) {
            setActivePiece({ ...activePiece, shape: rotatedShape });
        } else if (!checkCollision(activePiece, { ...activePiece.pos, x: activePiece.pos.x - 1 }, rotatedShape)) {
            setActivePiece({ ...activePiece, pos: { ...activePiece.pos, x: activePiece.pos.x - 1 }, shape: rotatedShape });
        } else if (!checkCollision(activePiece, { ...activePiece.pos, x: activePiece.pos.x + 1 }, rotatedShape)) {
            setActivePiece({ ...activePiece, pos: { ...activePiece.pos, x: activePiece.pos.x + 1 }, shape: rotatedShape });
        }
    };

    const hardDrop = () => {
        if (gameOver || paused || !activePiece) return;
        let finalY = activePiece.pos.y;
        while (!checkCollision(activePiece, { ...activePiece.pos, y: finalY + 1 })) {
            finalY++;
        }
        const finalPiece = { ...activePiece, pos: { ...activePiece.pos, y: finalY } };
        setActivePiece(finalPiece);
        // We set it and then lock it immediately in the next step, 
        // but for better reactivity we can do it here directly
        const newGrid = [...grid.map(row => [...row])];
        finalPiece.shape.forEach((row: number[], y: number) => {
            row.forEach((value, x) => {
                if (value) {
                    const gridY = finalPiece.pos.y + y;
                    const gridX = finalPiece.pos.x + x;
                    if (gridY >= 0) newGrid[gridY][gridX] = finalPiece.color;
                }
            });
        });
        processLines(newGrid);
    };

    const lockPiece = () => {
        const newGrid = [...grid.map(row => [...row])];
        let hitTop = false;

        activePiece.shape.forEach((row: number[], y: number) => {
            row.forEach((value, x) => {
                if (value) {
                    const gridY = activePiece.pos.y + y;
                    const gridX = activePiece.pos.x + x;
                    if (gridY < 0) {
                        hitTop = true;
                    } else {
                        newGrid[gridY][gridX] = activePiece.color;
                    }
                }
            });
        });

        if (hitTop) {
            handleGameOver();
        } else {
            processLines(newGrid);
        }
    };

    const processLines = (newGrid: (string | null)[][]) => {
        let linesCleared = 0;
        const processedGrid = newGrid.filter(row => {
            const isFull = row.every(cell => cell !== null);
            if (isFull) linesCleared++;
            return !isFull;
        });

        while (processedGrid.length < ROWS) {
            processedGrid.unshift(Array(COLS).fill(null));
        }

        if (linesCleared > 0) {
            const points = [0, 100, 300, 500, 800][linesCleared] * level;
            setScore(prev => prev + points);
            const totalLines = lines + linesCleared;
            setLines(totalLines);
            setLevel(Math.floor(totalLines / 10) + 1);
        }

        setGrid(processedGrid);

        // Spawn next piece
        const next = getRandomTetromino();
        if (checkCollision(nextPiece, nextPiece.pos)) {
            handleGameOver();
        } else {
            setActivePiece(nextPiece);
            setNextPiece(next);
        }
    };

    const handleGameOver = () => {
        const record = score > highScore;
        if (record) {
            setHighScore(score);
            setIsNewRecord(true);
            localStorage.setItem('tetris-high-score', score.toString());
        }
        setGameOver(true);
        stopLoop();
    };

    // Ghost Piece Logic
    const getGhostPiece = () => {
        if (!activePiece) return null;
        let ghostY = activePiece.pos.y;
        while (!checkCollision(activePiece, { ...activePiece.pos, y: ghostY + 1 })) {
            ghostY++;
        }
        return { ...activePiece, pos: { ...activePiece.pos, y: ghostY } };
    };

    // Input Handling
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (gameOver) return;
            switch (e.key) {
                case 'ArrowLeft': case 'a': moveHorizontal(-1); break;
                case 'ArrowRight': case 'd': moveHorizontal(1); break;
                case 'ArrowDown': case 's': moveDown(); break;
                case 'ArrowUp': case 'w': rotate(); break;
                case ' ': e.preventDefault(); hardDrop(); break;
                case 'p': setPaused(prev => !prev); break;
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activePiece, gameOver, paused]);

    // Rendering Helpers
    const ghost = getGhostPiece();
    const displayGrid = grid.map(row => [...row]);

    // Draw Ghost
    if (ghost && !paused && !gameOver) {
        ghost.shape.forEach((row: number[], y: number) => {
            row.forEach((value, x) => {
                if (value) {
                    const gridY = ghost.pos.y + y;
                    const gridX = ghost.pos.x + x;
                    if (gridY >= 0 && !displayGrid[gridY][gridX]) {
                        displayGrid[gridY][gridX] = 'opacity-20 ' + ghost.color;
                    }
                }
            });
        });
    }

    // Draw Active Piece
    if (activePiece && !paused && !gameOver) {
        activePiece.shape.forEach((row: number[], y: number) => {
            row.forEach((value, x) => {
                if (value) {
                    const gridY = activePiece.pos.y + y;
                    const gridX = activePiece.pos.x + x;
                    if (gridY >= 0) {
                        displayGrid[gridY][gridX] = activePiece.color;
                    }
                }
            });
        });
    }

    return (
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center p-4">
            {/* Game Board */}
            <div className="relative border-4 border-eddm-navy rounded-xl bg-gray-900 overflow-hidden shadow-2xl">
                <div className="grid grid-cols-10 gap-[1px] p-[1px]">
                    {displayGrid.map((row, y) =>
                        row.map((cell, x) => (
                            <div
                                key={`${y}-${x}`}
                                className={`w-6 h-6 sm:w-8 sm:h-8 rounded-sm transition-all duration-100 ${cell || 'bg-gray-800/50'}`}
                            />
                        ))
                    )}
                </div>

                {/* Overlays */}
                {(gameOver || paused) && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6">
                        {gameOver ? (
                            <>
                                <h2 className="text-4xl font-black text-white mb-2 tracking-tighter">GAME OVER</h2>
                                {isNewRecord ? (
                                    <div className="animate-bounce mb-4">
                                        <p className="text-yellow-400 font-black text-2xl tracking-tight">🏆 ¡NUEVO RÉCORD! 🏆</p>
                                        <p className="text-white text-3xl font-bold">{score.toLocaleString()}</p>
                                    </div>
                                ) : (
                                    <p className="text-eddm-orange font-bold text-xl mb-6">Puntos: {score.toLocaleString()}</p>
                                )}
                                <button
                                    onClick={startNewGame}
                                    className="px-8 py-3 bg-eddm-sky-blue hover:bg-eddm-sky-blue/90 text-white font-bold rounded-full transition-all transform hover:scale-105"
                                >
                                    Intentar de nuevo
                                </button>
                            </>
                        ) : (
                            <>
                                <h2 className="text-4xl font-black text-white mb-6 tracking-tighter">PAUSA</h2>
                                <button
                                    onClick={() => setPaused(false)}
                                    className="px-8 py-3 bg-eddm-orange hover:bg-eddm-orange/90 text-white font-bold rounded-full transition-all transform hover:scale-105"
                                >
                                    Continuar
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-6 w-full max-w-[240px]">
                {/* Score Panel */}
                <div className="bg-white border-2 border-eddm-navy rounded-xl p-6 shadow-lg flex flex-col gap-4">
                    <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Puntos</p>
                        <p className="text-3xl font-black text-eddm-navy leading-none">{score.toLocaleString()}</p>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Nivel</p>
                        <p className="text-3xl font-black text-eddm-sky-blue leading-none">{level}</p>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">High Score</p>
                        <p className="text-xl font-bold text-eddm-orange leading-none">{highScore.toLocaleString()}</p>
                    </div>
                </div>

                {/* Siguiente Pieza */}
                <div className="bg-white border-2 border-eddm-navy rounded-xl p-4 shadow-lg">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 text-center">Siguiente</p>
                    <div className="flex items-center justify-center bg-gray-50 rounded-lg p-4 h-24">
                        {nextPiece && (
                            <div className={`grid gap-[2px]`}
                                style={{ gridTemplateColumns: `repeat(${nextPiece.shape[0].length}, 1fr)` }}>
                                {nextPiece.shape.map((row: any, y: number) =>
                                    row.map((cell: any, x: number) => (
                                        <div
                                            key={`${y}-${x}`}
                                            className={`w-4 h-4 rounded-[2px] ${cell ? nextPiece.color : 'bg-transparent'}`}
                                        />
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Controles Táctiles (para mobile) */}
                <div className="grid grid-cols-3 gap-2 md:hidden">
                    <button onClick={() => moveHorizontal(-1)} className="p-4 bg-gray-200 rounded-lg active:bg-gray-300">←</button>
                    <button onClick={() => rotate()} className="p-4 bg-gray-200 rounded-lg active:bg-gray-300">↻</button>
                    <button onClick={() => moveHorizontal(1)} className="p-4 bg-gray-200 rounded-lg active:bg-gray-300">→</button>
                    <div />
                    <button onClick={() => moveDown()} className="p-4 bg-gray-200 rounded-lg active:bg-gray-300">↓</button>
                    <div />
                    <button onClick={() => hardDrop()} className="col-span-3 p-4 bg-eddm-sky-blue text-white font-bold rounded-lg active:bg-eddm-sky-blue/80">DROP</button>
                </div>

                {/* Help */}
                <div className="hidden md:block text-[10px] text-gray-400 font-medium">
                    <p>USAR FLECHAS O WASD</p>
                    <p>ESPACIO: CAÍDA RÁPIDA</p>
                    <p>P: PAUSA</p>
                </div>
            </div>
        </div>
    );
}

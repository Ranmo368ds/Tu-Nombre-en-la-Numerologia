'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface Clue {
    number: number;
    clue: string;
    answer: string;
    direction: 'across' | 'down';
    row: number;
    col: number;
}

interface CrucigramaProps {
    difficulty?: 'easy' | 'medium' | 'hard';
}

export default function Crucigrama({ difficulty = 'easy' }: CrucigramaProps) {
    const [grid, setGrid] = useState<(string | null)[][]>([]);
    const [userGrid, setUserGrid] = useState<string[][]>([]);
    const [clues, setClues] = useState<Clue[]>([]);
    const [selectedCell, setSelectedCell] = useState<{ row: number, col: number } | null>(null);
    const [selectedDirection, setSelectedDirection] = useState<'across' | 'down'>('across');
    const [timer, setTimer] = useState(0);
    const [gameWon, setGameWon] = useState(false);

    const crosswordData: Clue[] = [
        // Across
        { number: 1, clue: 'Servicio para techos altos', answer: 'ROOFING', direction: 'across', row: 2, col: 2 },
        { number: 4, clue: 'Pintura de interiores', answer: 'PAINTING', direction: 'across', row: 4, col: 5 },
        { number: 6, clue: 'Cuidado de jardinería profesional', answer: 'LANDSCAPING', direction: 'across', row: 7, col: 1 },
        { number: 8, clue: 'Mantenimiento de tuberías', answer: 'PLUMBING', direction: 'across', row: 10, col: 4 },
        { number: 10, clue: 'Sistema de aire acondicionado', answer: 'HVAC', direction: 'across', row: 12, col: 8 },

        // Down
        { number: 1, clue: 'Reparación de casas', answer: 'REPAIR', direction: 'down', row: 2, col: 2 },
        { number: 2, clue: 'Servicio de limpieza profunda', answer: 'CLEANING', direction: 'down', row: 2, col: 10 },
        { number: 3, clue: 'Instalación de cables y luces', answer: 'ELECTRICAL', direction: 'down', row: 0, col: 6 },
        { number: 5, clue: 'Cuidado de árboles y ramas', answer: 'TREE', direction: 'down', row: 4, col: 13 },
        { number: 7, clue: 'Servicio de piscinas cristalinas', answer: 'POOL', direction: 'down', row: 7, col: 4 },
        { number: 9, clue: 'Mantenimiento de chimeneas', answer: 'CHIMNEY', direction: 'down', row: 1, col: 8 },
    ];

    const generateCrossword = useCallback(() => {
        const size = 15;
        const newGrid: (string | null)[][] = Array(size).fill(null).map(() => Array(size).fill(null));
        const newUserGrid: string[][] = Array(size).fill(null).map(() => Array(size).fill(''));

        crosswordData.forEach(clue => {
            for (let i = 0; i < clue.answer.length; i++) {
                if (clue.direction === 'across') {
                    newGrid[clue.row][clue.col + i] = clue.answer[i];
                } else {
                    newGrid[clue.row + i][clue.col] = clue.answer[i];
                }
            }
        });

        setGrid(newGrid);
        setUserGrid(newUserGrid);
        setClues(crosswordData);
        setTimer(0);
        setGameWon(false);
        setSelectedCell(null);
    }, []);

    useEffect(() => {
        generateCrossword();
        const interval = setInterval(() => setTimer(t => t + 1), 1000);
        return () => clearInterval(interval);
    }, [generateCrossword]);

    // --- Interaction ---

    const handleCellClick = (row: number, col: number) => {
        if (grid[row][col] === null) return;

        if (selectedCell?.row === row && selectedCell?.col === col) {
            setSelectedDirection(prev => prev === 'across' ? 'down' : 'across');
        } else {
            setSelectedCell({ row, col });
        }
    };

    const handleInput = useCallback((val: string) => {
        if (!selectedCell) return;
        const { row, col } = selectedCell;

        const newUserGrid = userGrid.map(r => [...r]);
        newUserGrid[row][col] = val.toUpperCase();
        setUserGrid(newUserGrid);

        if (val !== '') {
            moveToNext(row, col);
        }

        // Check winner
        const solved = grid.every((r, ri) =>
            r.every((c, ci) => c === null || newUserGrid[ri][ci] === c)
        );
        if (solved) setGameWon(true);
    }, [selectedCell, userGrid, grid, selectedDirection]);

    const moveToNext = (row: number, col: number) => {
        let nr = row, nc = col;
        if (selectedDirection === 'across') nc++;
        else nr++;

        if (nr < 15 && nc < 15 && grid[nr][nc] !== null) {
            setSelectedCell({ row: nr, col: nc });
        }
    };

    const handleHint = () => {
        if (!selectedCell) return;
        const { row, col } = selectedCell;
        const val = grid[row][col];
        if (val) {
            const newUserGrid = userGrid.map(r => [...r]);
            newUserGrid[row][col] = val;
            setUserGrid(newUserGrid);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (gameWon || !selectedCell) return;

            if (e.key.length === 1 && /[A-Za-z]/.test(e.key)) {
                handleInput(e.key);
            } else if (e.key === 'Backspace') {
                handleInput('');
            } else if (e.key === ' ') {
                setSelectedDirection(prev => prev === 'across' ? 'down' : 'across');
            } else if (e.key.startsWith('Arrow')) {
                let { row, col } = selectedCell;
                if (e.key === 'ArrowUp') row = Math.max(0, row - 1);
                if (e.key === 'ArrowDown') row = Math.min(14, row + 1);
                if (e.key === 'ArrowLeft') col = Math.max(0, col - 1);
                if (e.key === 'ArrowRight') col = Math.min(14, col + 1);
                if (grid[row][col] !== null) setSelectedCell({ row, col });
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedCell, handleInput, gameWon, grid]);

    // --- Helpers ---

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const getCellNumber = (r: number, c: number) => {
        const clue = clues.find(cl => cl.row === r && cl.col === c);
        return clue ? clue.number : null;
    };

    const isInActiveWord = (r: number, c: number) => {
        if (!selectedCell) return false;
        const activeClue = clues.find(cl =>
            cl.direction === selectedDirection &&
            r >= cl.row && c >= cl.col &&
            (selectedDirection === 'across' ?
                r === cl.row && c < cl.col + cl.answer.length && selectedCell.row === cl.row && selectedCell.col >= cl.col && selectedCell.col < cl.col + cl.answer.length :
                c === cl.col && r < cl.row + cl.answer.length && selectedCell.col === cl.col && selectedCell.row >= cl.row && selectedCell.row < cl.row + cl.answer.length)
        );
        return !!activeClue;
    };

    return (
        <div className="flex flex-col xl:flex-row gap-10 p-6 bg-gray-50 rounded-3xl items-start justify-center">
            <div className="flex-1 flex flex-col items-center">
                <div className="w-full flex justify-between items-center mb-6 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                    <div className="font-black text-2xl text-eddm-navy flex items-center gap-2">
                        ⏱️ {formatTime(timer)}
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={handleHint}
                            className="px-6 py-2 bg-eddm-orange text-white font-bold rounded-full hover:bg-eddm-orange/90 transition-all shadow-md active:scale-95"
                        >
                            💡 PISTA
                        </button>
                        <button
                            onClick={generateCrossword}
                            className="px-6 py-2 bg-eddm-sky-blue text-white font-bold rounded-full hover:bg-eddm-sky-blue/90 transition-all shadow-md active:scale-95"
                        >
                            🔄 REINICIAR
                        </button>
                    </div>
                </div>

                <div
                    className="grid bg-eddm-navy p-1 rounded-xl shadow-2xl border-4 border-eddm-navy"
                    style={{ gridTemplateColumns: `repeat(15, minmax(0, 1fr))` }}
                >
                    {grid.map((row, r) =>
                        row.map((cell, c) => {
                            const isBlack = cell === null;
                            const isSelected = selectedCell?.row === r && selectedCell?.col === c;
                            const inActiveWord = isInActiveWord(r, c);
                            const number = getCellNumber(r, c);

                            return (
                                <div
                                    key={`${r}-${c}`}
                                    onClick={() => handleCellClick(r, c)}
                                    className={`
                                        relative w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 border border-eddm-navy/10 
                                        ${isBlack ? 'bg-eddm-navy' : 'bg-white cursor-pointer'}
                                        ${isSelected ? 'bg-yellow-200' : inActiveWord ? 'bg-eddm-sky-blue/20' : ''}
                                        transition-colors duration-100
                                    `}
                                >
                                    {number && (
                                        <span className="absolute top-0.5 left-0.5 text-[8px] sm:text-[10px] font-black text-eddm-navy leading-none">
                                            {number}
                                        </span>
                                    )}
                                    <div className={`
                                        w-full h-full flex items-center justify-center font-black text-sm sm:text-lg md:text-xl
                                        ${userGrid[r][c] !== cell && userGrid[r][c] !== '' ? 'text-red-500' : 'text-eddm-navy'}
                                    `}>
                                        {userGrid[r][c]}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {gameWon && (
                    <div className="mt-8 p-10 bg-white border-8 border-green-500 rounded-[3rem] text-center shadow-2xl animate-bounce">
                        <h2 className="text-5xl font-black text-green-600 mb-2 tracking-tighter italic">BOOM! 💥</h2>
                        <p className="text-eddm-navy font-black text-xl uppercase tracking-widest">Crucigrama superado en {formatTime(timer)}</p>
                    </div>
                )}
            </div>

            <div className="w-full xl:w-96 flex flex-col gap-6">
                <div className="bg-white p-6 rounded-3xl shadow-xl border-2 border-eddm-navy/5">
                    <h3 className="text-2xl font-black text-eddm-navy mb-4 border-b-4 border-eddm-sky-blue pb-1 inline-block">HORIZONTALES</h3>
                    <div className="space-y-3">
                        {clues.filter(c => c.direction === 'across').map(clue => (
                            <div
                                key={clue.number}
                                onClick={() => { setSelectedCell({ row: clue.row, col: clue.col }); setSelectedDirection('across'); }}
                                className={`p-4 rounded-2xl cursor-pointer transition-all ${selectedCell?.row === clue.row && selectedDirection === 'across' ? 'bg-eddm-sky-blue/10 border-l-4 border-eddm-sky-blue' : 'bg-gray-50 hover:bg-gray-100'}`}
                            >
                                <span className="font-black text-eddm-sky-blue mr-2">#{clue.number}</span>
                                <span className="font-bold text-eddm-navy text-sm leading-tight">{clue.clue}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-xl border-2 border-eddm-navy/5">
                    <h3 className="text-2xl font-black text-eddm-navy mb-4 border-b-4 border-eddm-orange pb-1 inline-block">VERTICALES</h3>
                    <div className="space-y-3">
                        {clues.filter(c => c.direction === 'down').map(clue => (
                            <div
                                key={clue.number}
                                onClick={() => { setSelectedCell({ row: clue.row, col: clue.col }); setSelectedDirection('down'); }}
                                className={`p-4 rounded-2xl cursor-pointer transition-all ${selectedCell?.col === clue.col && selectedDirection === 'down' ? 'bg-eddm-orange/10 border-l-4 border-eddm-orange' : 'bg-gray-50 hover:bg-gray-100'}`}
                            >
                                <span className="font-black text-eddm-orange mr-2">#{clue.number}</span>
                                <span className="font-bold text-eddm-navy text-sm leading-tight">{clue.clue}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

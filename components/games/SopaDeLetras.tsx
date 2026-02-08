'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface WordPlacement {
    word: string;
    cells: { row: number, col: number }[];
    found: boolean;
}

interface SopaDeLetrasProps {
    difficulty?: 'easy' | 'medium' | 'hard';
}

export default function SopaDeLetras({ difficulty = 'easy' }: SopaDeLetrasProps) {
    const [grid, setGrid] = useState<string[][]>([]);
    const [placedWords, setPlacedWords] = useState<WordPlacement[]>([]);
    const [selectedCells, setSelectedCells] = useState<{ row: number, col: number }[]>([]);
    const [isSelecting, setIsSelecting] = useState(false);
    const [startCell, setStartCell] = useState<{ row: number, col: number } | null>(null);
    const [timer, setTimer] = useState(0);
    const [gameWon, setGameWon] = useState(false);

    const wordPool = [
        'ROOFING', 'LANDSCAPING', 'TREE', 'POOL', 'HVAC',
        'PAINTING', 'CLEANING', 'PLUMBING', 'ELECTRICAL',
        'CHIMNEY', 'GUTTER', 'SIDING', 'WASHING', 'MOWING',
        'SERVICE', 'REPAIR', 'BUSINESS', 'MARKETING'
    ];

    const generatePuzzle = useCallback(() => {
        const size = 12;
        const newGrid: string[][] = Array(size).fill(null).map(() => Array(size).fill(''));
        const newPlacedWords: WordPlacement[] = [];
        const count = difficulty === 'easy' ? 6 : difficulty === 'medium' ? 8 : 10;
        const wordsToPlace = [...wordPool].sort(() => Math.random() - 0.5).slice(0, count);

        const directions = [
            [0, 1],   // horizontal
            [1, 0],   // vertical
            [1, 1],   // diagonal down-right
            [-1, 1],  // diagonal up-right
            [0, -1],  // horizontal back
            [-1, 0],  // vertical back
        ];

        wordsToPlace.forEach(word => {
            let placed = false;
            let attempts = 0;
            while (!placed && attempts < 100) {
                const dir = directions[Math.floor(Math.random() * (difficulty === 'easy' ? 2 : directions.length))];
                const row = Math.floor(Math.random() * size);
                const col = Math.floor(Math.random() * size);

                const cells: { row: number, col: number }[] = [];
                let canPlace = true;

                for (let i = 0; i < word.length; i++) {
                    const r = row + dir[0] * i;
                    const c = col + dir[1] * i;

                    if (r < 0 || r >= size || c < 0 || c >= size || (newGrid[r][c] !== '' && newGrid[r][c] !== word[i])) {
                        canPlace = false;
                        break;
                    }
                    cells.push({ row: r, col: c });
                }

                if (canPlace) {
                    cells.forEach((cell, i) => {
                        newGrid[cell.row][cell.col] = word[i];
                    });
                    newPlacedWords.push({ word, cells, found: false });
                    placed = true;
                }
                attempts++;
            }
        });

        // Fill empty
        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                if (newGrid[r][c] === '') {
                    newGrid[r][c] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
                }
            }
        }

        setGrid(newGrid);
        setPlacedWords(newPlacedWords);
        setGameWon(false);
        setTimer(0);
        setSelectedCells([]);
        setStartCell(null);
    }, [difficulty]);

    useEffect(() => {
        generatePuzzle();
        const interval = setInterval(() => setTimer(t => t + 1), 1000);
        return () => clearInterval(interval);
    }, [generatePuzzle]);

    // --- Selection Logic ---

    const handleMouseDown = (row: number, col: number) => {
        if (gameWon) return;
        setIsSelecting(true);
        setStartCell({ row, col });
        setSelectedCells([{ row, col }]);
    };

    const handleMouseEnter = (row: number, col: number) => {
        if (!isSelecting || !startCell) return;

        const dr = row - startCell.row;
        const dc = col - startCell.col;

        // Determine if movement is straight line
        const absDr = Math.abs(dr);
        const absDc = Math.abs(dc);

        let valid = false;
        let stepR = 0;
        let stepC = 0;
        let length = 0;

        if (dr === 0) { // Horizontal
            valid = true;
            stepC = Math.sign(dc);
            length = absDc;
        } else if (dc === 0) { // Vertical
            valid = true;
            stepR = Math.sign(dr);
            length = absDr;
        } else if (absDr === absDc) { // Diagonal
            valid = true;
            stepR = Math.sign(dr);
            stepC = Math.sign(dc);
            length = absDr;
        }

        if (valid) {
            const newCells = [];
            for (let i = 0; i <= length; i++) {
                newCells.push({
                    row: startCell.row + stepR * i,
                    col: startCell.col + stepC * i
                });
            }
            setSelectedCells(newCells);
        }
    };

    const handleMouseUp = () => {
        if (!isSelecting) return;
        setIsSelecting(false);

        const currentWord = selectedCells.map(c => grid[c.row][c.col]).join('');
        const reversedWord = currentWord.split('').reverse().join('');

        let foundIndex = -1;
        const updatedWords = placedWords.map((pw, index) => {
            if (!pw.found && (pw.word === currentWord || pw.word === reversedWord)) {
                foundIndex = index;
                return { ...pw, found: true };
            }
            return pw;
        });

        if (foundIndex !== -1) {
            setPlacedWords(updatedWords);
            if (updatedWords.every(w => w.found)) setGameWon(true);
        }

        setSelectedCells([]);
        setStartCell(null);
    };

    // --- Helpers ---

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const isCellSelected = (r: number, c: number) =>
        selectedCells.some(cell => cell.row === r && cell.col === c);

    const isCellFound = (r: number, c: number) =>
        placedWords.some(pw => pw.found && pw.cells.some(cell => cell.row === r && cell.col === c));

    return (
        <div className="flex flex-col lg:flex-row gap-10 items-start justify-center p-6 bg-gray-50 rounded-3xl shadow-inner">
            <div className="flex-1 flex flex-col items-center">
                <div className="w-full flex justify-between items-center mb-6 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                    <div className="font-black text-2xl text-eddm-navy flex items-center gap-2">
                        <span className="text-3xl">⏱️</span> {formatTime(timer)}
                    </div>
                    <button
                        onClick={generatePuzzle}
                        className="px-8 py-3 bg-eddm-sky-blue text-white font-black rounded-full hover:bg-eddm-sky-blue/90 transition-all shadow-md active:scale-95"
                    >
                        NUEVO JUEGO
                    </button>
                </div>

                <div
                    className="grid gap-1 bg-eddm-navy/10 p-2 rounded-2xl shadow-xl select-none"
                    style={{ gridTemplateColumns: `repeat(${grid.length}, minmax(0, 1fr))` }}
                    onMouseLeave={handleMouseUp}
                    onMouseUp={handleMouseUp}
                >
                    {grid.map((row, r) =>
                        row.map((letter, c) => {
                            const found = isCellFound(r, c);
                            const selected = isCellSelected(r, c);

                            return (
                                <div
                                    key={`${r}-${c}`}
                                    onMouseDown={() => handleMouseDown(r, c)}
                                    onMouseEnter={() => handleMouseEnter(r, c)}
                                    className={`
                                        w-8 h-8 md:w-11 md:h-11 flex items-center justify-center 
                                        text-lg font-black rounded-lg cursor-pointer transition-all duration-150
                                        ${found ? 'bg-green-500 text-white shadow-sm scale-95' :
                                            selected ? 'bg-eddm-sky-blue text-white scale-105 shadow-lg' :
                                                'bg-white text-eddm-navy hover:bg-gray-100'}
                                    `}
                                >
                                    {letter}
                                </div>
                            );
                        })
                    )}
                </div>

                {gameWon && (
                    <div className="mt-8 p-8 bg-white border-4 border-green-500 rounded-3xl text-center shadow-2xl animate-bounce">
                        <h2 className="text-4xl font-black text-green-600 mb-2 tracking-tighter">🏆 ¡LIMPIEZA TOTAL!</h2>
                        <p className="text-gray-500 font-bold uppercase tracking-widest">Encontraste todas en {formatTime(timer)}</p>
                    </div>
                )}
            </div>

            <div className="w-full lg:w-72 bg-white p-6 rounded-3xl shadow-xl border-2 border-eddm-navy/10">
                <h3 className="text-xl font-black text-eddm-navy mb-6 border-b-2 border-eddm-sky-blue pb-2 uppercase tracking-tight">
                    Lista de Palabras
                </h3>
                <div className="grid grid-cols-1 gap-2">
                    {placedWords.map((pw, i) => (
                        <div
                            key={i}
                            className={`
                                px-4 py-2 rounded-xl transition-all font-bold tracking-tight
                                ${pw.found ?
                                    'bg-green-100 text-green-500 line-through opacity-70' :
                                    'bg-gray-50 text-eddm-navy'}
                            `}
                        >
                            {pw.found ? '✓ ' : '• '} {pw.word}
                        </div>
                    ))}
                </div>
                <div className="mt-8 pt-4 border-t border-gray-100 flex justify-between items-center text-sm font-bold text-gray-400">
                    <span>ENCONTRADAS</span>
                    <span className="text-eddm-navy text-lg font-black">{placedWords.filter(w => w.found).length} / {placedWords.length}</span>
                </div>
            </div>
        </div>
    );
}

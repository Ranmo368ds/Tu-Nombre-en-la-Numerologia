'use client';

import { useState, useEffect, useCallback } from 'react';

interface SudokuProps {
    difficulty?: 'easy' | 'medium' | 'hard';
}

export default function Sudoku({ difficulty = 'medium' }: SudokuProps) {
    const [grid, setGrid] = useState<(number | null)[][]>(Array(9).fill(null).map(() => Array(9).fill(null)));
    const [initialGrid, setInitialGrid] = useState<boolean[][]>(Array(9).fill(null).map(() => Array(9).fill(false)));
    const [solution, setSolution] = useState<number[][]>([]);
    const [selectedCell, setSelectedCell] = useState<{ row: number, col: number } | null>(null);
    const [timer, setTimer] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    // --- Sudoku Logic ---

    const isValid = (board: (number | null)[][], row: number, col: number, num: number) => {
        for (let x = 0; x < 9; x++) if (board[row][x] === num) return false;
        for (let x = 0; x < 9; x++) if (board[x][col] === num) return false;
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i + startRow][j + startCol] === num) return false;
            }
        }
        return true;
    };

    const solveSudoku = (board: (number | null)[][]): boolean => {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === null) {
                    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
                    for (const num of nums) {
                        if (isValid(board, row, col, num)) {
                            board[row][col] = num;
                            if (solveSudoku(board)) return true;
                            board[row][col] = null;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    };

    const generatePuzzle = useCallback(() => {
        const newBoard: (number | null)[][] = Array(9).fill(null).map(() => Array(9).fill(null));
        solveSudoku(newBoard);

        const fullSolution = newBoard.map(row => [...row as number[]]);
        setSolution(fullSolution);

        const cellsToRemove = difficulty === 'easy' ? 35 : difficulty === 'medium' ? 45 : 55;
        const puzzleGrid = fullSolution.map(row => [...row]);
        const isInitial = Array(9).fill(null).map(() => Array(9).fill(true));

        let removed = 0;
        while (removed < cellsToRemove) {
            const row = Math.floor(Math.random() * 9);
            const col = Math.floor(Math.random() * 9);
            if (puzzleGrid[row][col] !== null) {
                puzzleGrid[row][col] = null;
                isInitial[row][col] = false;
                removed++;
            }
        }

        setGrid(puzzleGrid);
        setInitialGrid(isInitial);
        setIsComplete(false);
        setTimer(0);
        setSelectedCell(null);
    }, [difficulty]);

    useEffect(() => {
        generatePuzzle();
        const interval = setInterval(() => setTimer(t => t + 1), 1000);
        return () => clearInterval(interval);
    }, [generatePuzzle]);

    // --- Interaction ---

    const handleCellClick = (row: number, col: number) => {
        setSelectedCell({ row, col });
    };

    const handleNumberInput = useCallback((num: number | null) => {
        if (!selectedCell || initialGrid[selectedCell.row][selectedCell.col]) return;

        const newGrid = grid.map(row => [...row]);
        newGrid[selectedCell.row][selectedCell.col] = num;
        setGrid(newGrid);

        // Check completion
        const complete = newGrid.every((row, i) =>
            row.every((cell, j) => cell === solution[i][j])
        );
        setIsComplete(complete);
    }, [selectedCell, grid, initialGrid, solution]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isComplete) return;
            if (e.key >= '1' && e.key <= '9') {
                handleNumberInput(parseInt(e.key));
            } else if (e.key === 'Backspace' || e.key === 'Delete') {
                handleNumberInput(null);
            } else if (e.key.startsWith('Arrow')) {
                if (!selectedCell) {
                    setSelectedCell({ row: 0, col: 0 });
                    return;
                }
                let { row, col } = selectedCell;
                if (e.key === 'ArrowUp') row = (row - 1 + 9) % 9;
                if (e.key === 'ArrowDown') row = (row + 1) % 9;
                if (e.key === 'ArrowLeft') col = (col - 1 + 9) % 9;
                if (e.key === 'ArrowRight') col = (col + 1) % 9;
                setSelectedCell({ row, col });
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedCell, handleNumberInput, isComplete]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // --- Styling Helpers ---

    const getCellClass = (row: number, col: number) => {
        const isSelected = selectedCell?.row === row && selectedCell?.col === col;
        const isInitial = initialGrid[row][col];
        const value = grid[row][col];
        const isCorrect = value === null || value === solution[row][col];

        // Highlighting logic
        const inSameRow = selectedCell?.row === row;
        const inSameCol = selectedCell?.col === col;
        const inSameBox = selectedCell && (
            Math.floor(selectedCell.row / 3) === Math.floor(row / 3) &&
            Math.floor(selectedCell.col / 3) === Math.floor(col / 3)
        );
        const sameValue = selectedCell && value !== null && grid[selectedCell.row][selectedCell.col] === value;

        let bgColor = 'bg-white';
        if (isSelected) bgColor = 'bg-eddm-sky-blue/40';
        else if (sameValue) bgColor = 'bg-eddm-orange/30';
        else if (inSameRow || inSameCol || inSameBox) bgColor = 'bg-gray-200';

        let textColor = isInitial ? 'font-black text-eddm-navy' : 'text-gray-900 font-bold';
        if (!isCorrect && !isInitial) textColor = 'text-red-600 font-black';

        const borderRight = (col + 1) % 3 === 0 && col !== 8 ? 'border-r-2 border-eddm-navy' : 'border-r border-gray-400';
        const borderBottom = (row + 1) % 3 === 0 && row !== 8 ? 'border-b-2 border-eddm-navy' : 'border-b border-gray-400';

        return `
            w-10 h-10 md:w-14 md:h-14 flex items-center justify-center cursor-pointer transition-colors
            ${bgColor} ${textColor} ${borderRight} ${borderBottom}
            ${row === 0 ? 'border-t-2 border-eddm-navy' : ''}
            ${col === 0 ? 'border-l-2 border-eddm-navy' : ''}
            ${row === 8 ? 'border-b-2 border-eddm-navy' : ''}
            ${col === 8 ? 'border-r-2 border-eddm-navy' : ''}
        `;
    };

    return (
        <div className="flex flex-col items-center p-4">
            <div className="w-full max-w-md mb-6 flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="text-xl font-bold text-eddm-navy flex items-center gap-2">
                    <span className="text-2xl">⏱️</span> {formatTime(timer)}
                </div>
                <button
                    onClick={generatePuzzle}
                    className="px-6 py-2 bg-eddm-sky-blue text-white rounded-full font-bold hover:bg-eddm-sky-blue/90 transition-all shadow-md hover:shadow-lg active:scale-95"
                >
                    Nuevo Juego
                </button>
            </div>

            <div className="bg-white p-2 rounded-2xl shadow-2xl border-4 border-eddm-navy mb-8">
                <div className="grid grid-cols-9 gap-0">
                    {grid.map((row, rowIndex) =>
                        row.map((cell, colIndex) => (
                            <div
                                key={`${rowIndex}-${colIndex}`}
                                onClick={() => handleCellClick(rowIndex, colIndex)}
                                className={getCellClass(rowIndex, colIndex)}
                            >
                                {cell || ''}
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className="grid grid-cols-5 gap-3 max-w-md w-full">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                    <button
                        key={num}
                        onClick={() => handleNumberInput(num)}
                        className="h-14 bg-white border-2 border-eddm-navy text-eddm-navy rounded-xl font-black text-xl hover:bg-eddm-navy hover:text-white transition-all shadow-sm active:scale-90"
                    >
                        {num}
                    </button>
                ))}
                <button
                    onClick={() => handleNumberInput(null)}
                    className="h-14 bg-gray-100 text-gray-500 rounded-xl font-black text-xl hover:bg-gray-200 transition-all shadow-sm active:scale-90"
                >
                    ✕
                </button>
            </div>

            {isComplete && (
                <div className="mt-8 p-6 bg-green-50 border-4 border-green-500 rounded-2xl text-center animate-bounce shadow-xl">
                    <p className="text-3xl font-black text-green-700 mb-2">
                        🎉 ¡SUDOKU MAESTRO!
                    </p>
                    <p className="text-green-600 font-bold">
                        Tiempo record: {formatTime(timer)}
                    </p>
                </div>
            )}

            <div className="mt-8 text-xs text-gray-400 font-medium text-center max-w-xs">
                Usa las FLECHAS para moverte y los NÚMEROS de tu teclado para jugar. BACKSPACE para borrar.
            </div>
        </div>
    );
}

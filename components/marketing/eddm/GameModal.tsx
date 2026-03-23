'use client';

import { GameConfig } from '@/lib/eddm/types';
import Sudoku from '../../games/Sudoku';
import Crucigrama from '../../games/Crucigrama';
import SopaDeLetras from '../../games/SopaDeLetras';

interface GameModalProps {
    game: GameConfig;
    onClose: () => void;
}

export default function GameModal({ game, onClose }: GameModalProps) {
    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[95vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between rounded-t-2xl">
                    <h2 className="text-2xl font-bold text-eddm-navy">
                        {game.title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Game Content */}
                <div className="p-6">
                    {game.type === 'sudoku' && <Sudoku difficulty={game.difficulty} />}
                    {game.type === 'crossword' && <Crucigrama difficulty={game.difficulty} />}
                    {game.type === 'wordsearch' && <SopaDeLetras difficulty={game.difficulty} />}
                </div>
            </div>
        </div>
    );
}

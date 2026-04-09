'use client';

import { GameConfig } from '@/lib/eddm/types';
import Sudoku from '../../games/Sudoku';
import Crucigrama from '../../games/Crucigrama';
import SopaDeLetras from '../../games/SopaDeLetras';
import Tetris from '../../games/Tetris';
import Pacman from '../../games/Pacman';
import Galaga from '../../games/Galaga';
import Frogger from '../../games/Frogger';
import Asteroids from '../../games/Asteroids';

interface GameModalProps {
    game: GameConfig;
    onClose: () => void;
}

export default function GameModal({ game, onClose }: GameModalProps) {
    const isArcade = game.type === 'tetris' || game.type === 'pacman' || game.type === 'galaga' || game.type === 'frogger' || game.type === 'asteroids';
    const isTetris = game.type === 'tetris';

    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-0 md:p-4">
            <div className={`bg-white rounded-2xl w-full ${isArcade ? 'max-w-md' : 'max-w-4xl'} max-h-[100vh] md:max-h-[95vh] overflow-y-auto relative`}>
                {/* Header - Transparent on Arcade to not break the vibe */}
                <div className={`${isArcade ? 'absolute top-2 right-2' : 'sticky top-0 bg-white border-b border-gray-200 p-4'} z-[60] flex items-center justify-between rounded-t-2xl`}>
                    {!isArcade && (
                        <h2 className="text-2xl font-bold text-eddm-navy">
                            {game.title}
                        </h2>
                    )}
                    <button
                        onClick={onClose}
                        className={`p-2 ${isArcade ? 'bg-black/20 text-white' : 'hover:bg-gray-100 text-gray-600'} rounded-full transition-colors`}
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Game Content */}
                <div className={isArcade ? 'p-0' : 'p-6'}>
                    {game.type === 'sudoku' && <Sudoku difficulty={game.difficulty} />}
                    {game.type === 'crossword' && <Crucigrama difficulty={game.difficulty} />}
                    {game.type === 'wordsearch' && <SopaDeLetras difficulty={game.difficulty} />}
                    {game.type === 'tetris' && <Tetris />}
                    {game.type === 'pacman' && <Pacman />}
                    {game.type === 'galaga' && <Galaga />}
                    {game.type === 'frogger' && <Frogger />}
                    {game.type === 'asteroids' && <Asteroids />}
                </div>
            </div>
        </div>
    );
}

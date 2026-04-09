'use client';

import { GameConfig } from '@/lib/eddm/types';
import { useState } from 'react';
import GameModal from './GameModal';

interface GameCardProps {
    game: GameConfig;
}

export default function GameCard({ game }: GameCardProps) {
    const [isPlaying, setIsPlaying] = useState(false);

    const getGameIcon = () => {
        switch (game.type) {
            case 'sudoku':
                return '🔢';
            case 'crossword':
                return '📝';
            case 'wordsearch':
                return '🔍';
            case 'tetris':
                return '🧱';
            case 'pacman':
                return '🕹️';
            default:
                return '🎮';
        }
    };

    return (
        <>
            <div
                onClick={() => setIsPlaying(true)}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all p-4 border border-purple-200 cursor-pointer"
            >
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                        <span className="text-2xl mr-2">{getGameIcon()}</span>
                        <h3 className="text-base font-bold text-gray-900">{game.title}</h3>
                    </div>
                    {game.difficulty && (
                        <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full font-semibold">
                            {game.difficulty}
                        </span>
                    )}
                </div>

                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all text-sm">
                    🎮 Play Now
                </button>
            </div>

            {/* Game Modal */}
            {isPlaying && (
                <GameModal
                    game={game}
                    onClose={() => setIsPlaying(false)}
                />
            )}
        </>
    );
}

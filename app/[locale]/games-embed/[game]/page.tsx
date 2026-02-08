'use client';

import React, { use } from 'react';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

// Dynamic imports for the games to avoid large bundles if only one is needed
const Tetris = dynamic(() => import('@/components/games/Tetris'), { ssr: false });
const Sudoku = dynamic(() => import('@/components/games/Sudoku'), { ssr: false });
const SopaDeLetras = dynamic(() => import('@/components/games/SopaDeLetras'), { ssr: false });
const Crucigrama = dynamic(() => import('@/components/games/Crucigrama'), { ssr: false });

export default function GameEmbedPage({ params }: { params: Promise<{ game: string }> }) {
    const { game } = use(params);

    const renderGame = () => {
        switch (game) {
            case 'tetris': return <Tetris />;
            case 'sudoku': return <Sudoku />;
            case 'sopa': return <SopaDeLetras />;
            case 'crucigrama': return <Crucigrama />;
            default: notFound();
        }
    };

    return (
        <div className="min-h-screen bg-transparent p-4 flex items-center justify-center">
            {renderGame()}
        </div>
    );
}

export interface Business {
    id: string;
    name: string;
    category: string;
    description: string;
    phone: string;
    email?: string;
    website?: string;
    services?: string[];
    isPrime?: boolean;
    monthFeatured?: string;
    imageUrl?: string;      // Business photo/image
    logoUrl?: string;        // Business logo
    rating?: number;         // Star rating (1-5)
    reviewCount?: number;    // Number of reviews
}

export interface EducationalPost {
    id: string;
    title: string;
    content: string;
    category: string;
    image?: string;
}

export interface GameConfig {
    type: 'sudoku' | 'crossword' | 'wordsearch' | 'tetris' | 'pacman' | 'galaga' | 'frogger' | 'asteroids' | 'tennis';
    title: string;
    difficulty?: 'easy' | 'medium' | 'hard';
}

export interface MonthlyFlyer {
    month: string;
    businesses: Business[];
    educationalContent: EducationalPost[];
    games: GameConfig[];
}

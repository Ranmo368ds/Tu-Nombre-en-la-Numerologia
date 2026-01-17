export type ElementType = 'path' | 'note' | 'rect' | 'circle' | 'triangle' | 'arrow' | 'pentagon' | 'hexagon' | 'octagon' | 'star' | 'heart' | 'text' | 'emoji' | 'line' | 'person_man' | 'person_woman' | 'person_boy' | 'person_girl' | 'person_grandfather' | 'person_grandmother' | 'person_baby' | 'animal_dog' | 'animal_cat' | 'image';

export interface Point {
    x: number;
    y: number;
    pressure?: number;
}

export interface BoardElement {
    id: string;
    type: ElementType;
    x: number;
    y: number;
    x2?: number;  // For lines
    y2?: number;  // For lines
    width?: number;
    height?: number;
    rotation?: number;
    isSelected?: boolean;
    strokeColor: string;
    strokeWidth?: number;
    backgroundColor?: string;
    points?: Point[];
    text?: string;
    fontSize?: number;
    src?: string; // For images
}

export type ToolType = 'select' | 'pen' | 'note' | 'text' | 'emoji' | 'line' | 'rect' | 'circle' | 'triangle' | 'arrow' | 'pentagon' | 'hexagon' | 'octagon' | 'star' | 'heart' | 'person_man' | 'person_woman' | 'person_boy' | 'person_girl' | 'person_grandfather' | 'person_grandmother' | 'person_baby' | 'animal_dog' | 'animal_cat' | 'image';

export type SacredGeometryType = 'seed_of_life' | 'flower_of_life' | 'metatrons_cube';

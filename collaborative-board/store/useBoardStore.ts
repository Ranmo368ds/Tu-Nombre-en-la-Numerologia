import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BoardElement, ToolType } from '@/types/board';

interface BoardState {
    elements: BoardElement[];
    tool: ToolType;
    strokeColor: string;
    fillColor: string;
    strokeWidth: number;
    pan: { x: number; y: number };
    zoom: number;
    selectedEmoji: string | null;

    setTool: (tool: ToolType) => void;
    setStrokeColor: (color: string) => void;
    setFillColor: (color: string) => void;
    setStrokeWidth: (width: number) => void;
    setSelectedEmoji: (emoji: string | null) => void;
    addElement: (element: BoardElement) => void;
    updateElement: (id: string, updates: Partial<BoardElement>) => void;
    deleteElement: (id: string) => void;
    selectElement: (id: string | null) => void;
    setPan: (x: number, y: number) => void;
    setZoom: (zoom: number) => void;
}

export const useBoardStore = create<BoardState>()(
    persist(
        (set) => ({
            elements: [],
            tool: 'pen',
            strokeColor: '#000000',
            fillColor: '#ffffff',
            strokeWidth: 8,
            pan: { x: 0, y: 0 },
            zoom: 1,
            selectedEmoji: '🕺',

            setTool: (tool) => set({ tool }),
            setStrokeColor: (color) => set({ strokeColor: color }),
            setFillColor: (color) => set({ fillColor: color }),
            setStrokeWidth: (width) => set({ strokeWidth: width }),
            setSelectedEmoji: (emoji) => set({ selectedEmoji: emoji }),
            addElement: (element) => set((state) => ({
                elements: [...state.elements, element]
            })),
            updateElement: (id, updates) => set((state) => ({
                elements: state.elements.map((el) =>
                    el.id === id ? { ...el, ...updates } : el
                )
            })),
            deleteElement: (id) => set((state) => ({
                elements: state.elements.filter((el) => el.id !== id)
            })),
            selectElement: (id) => set((state) => ({
                elements: state.elements.map((el) => ({
                    ...el,
                    isSelected: el.id === id
                }))
            })),
            setPan: (x, y) => set({ pan: { x, y } }),
            setZoom: (zoom) => set({ zoom }),
        }),
        {
            name: 'board-storage',
        }
    )
);

"use client";

import { useBoardStore } from "@/store/useBoardStore";
import { MousePointer2, Hand, Pen, Square, Circle, Triangle, ArrowRight, Pentagon, Hexagon, Octagon, Star, Type, User, Users, Minus, Image as ImageIcon, Baby, Heart, Smile } from "lucide-react";
import { useState } from "react";

const mainTools = [
    { id: 'select' as const, icon: MousePointer2, label: 'Seleccionar' },
    { id: 'pan' as const, icon: Hand, label: 'Mover' },
    { id: 'pen' as const, icon: Pen, label: 'Lápiz' },
    { id: 'line' as const, icon: Minus, label: 'Línea' },
    { id: 'star' as const, icon: Star, label: 'Estrella' },
    { id: 'text' as const, icon: Type, label: 'Texto' },
    { id: 'emoji' as const, icon: Smile, label: 'Emojis' },
    { id: 'image' as const, icon: ImageIcon, label: 'Imagen' },
];

const shapeTools = [
    { id: 'rect' as const, icon: Square, label: 'Rectángulo' },
    { id: 'circle' as const, icon: Circle, label: 'Círculo' },
    { id: 'triangle' as const, icon: Triangle, label: 'Triángulo' },
    { id: 'arrow' as const, icon: ArrowRight, label: 'Flecha' },
    { id: 'pentagon' as const, icon: Pentagon, label: 'Pentágono' },
    { id: 'hexagon' as const, icon: Hexagon, label: 'Hexágono' },
    { id: 'octagon' as const, icon: Octagon, label: 'Octágono' },
    { id: 'star' as const, icon: Star, label: 'Estrella' },
];

const figureTools = [
    { id: 'person_man' as const, icon: User, label: 'Hombre' },
    { id: 'person_woman' as const, icon: User, label: 'Mujer' },
    { id: 'person_grandfather' as const, icon: User, label: 'Abuelo' },
    { id: 'person_grandmother' as const, icon: User, label: 'Abuela' },
    { id: 'person_boy' as const, icon: User, label: 'Niño' },
    { id: 'person_girl' as const, icon: User, label: 'Niña' },
    { id: 'person_baby' as const, icon: Baby, label: 'Bebé' },
    { id: 'heart' as const, icon: Heart, label: 'Corazón' },
    { id: 'animal_dog' as const, icon: Users, label: 'Perro' },
    { id: 'animal_cat' as const, icon: Users, label: 'Gato' },
];

const emojiList = [
    { emoji: '🕺', label: 'Bailarín' },
    { emoji: '💃', label: 'Bailarina' },
    { emoji: '🦸', label: 'Héroe' },
    { emoji: '🧘', label: 'Yoga' },
    { emoji: '🏃', label: 'Corredor' },
    { emoji: '🏄', label: 'Surfista' },
    { emoji: '🧜', label: 'Sirena' },
    { emoji: '🧙', label: 'Mago' },
    { emoji: '👩‍🚀', label: 'Astronauta' },
    { emoji: '🕴️', label: 'Ejecutivo' },
];

const colors = [
    { value: '#000000', label: 'Negro' },
    { value: '#ef4444', label: 'Rojo' },
    { value: '#3b82f6', label: 'Azul' },
    { value: '#22c55e', label: 'Verde' },
    { value: '#f59e0b', label: 'Naranja' },
    { value: '#a855f7', label: 'Morado' },
    { value: '#ec4899', label: 'Rosa' },
    { value: '#14b8a6', label: 'Turquesa' },
];

export function Toolbar() {
    const { tool, setTool, strokeColor, setStrokeColor, fillColor, setFillColor, strokeWidth, setStrokeWidth, selectedEmoji, setSelectedEmoji } = useBoardStore();
    const [showShapes, setShowShapes] = useState(false);
    const [showFigures, setShowFigures] = useState(false);
    const [showEmojis, setShowEmojis] = useState(false);
    const [showStrokeColorPicker, setShowStrokeColorPicker] = useState(false);
    const [showFillColorPicker, setShowFillColorPicker] = useState(false);
    const [showStroke, setShowStroke] = useState(false);

    const strokeSizes = [
        { value: 4, label: 'Fino' },
        { value: 8, label: 'Normal' },
        { value: 16, label: 'Grueso' },
        { value: 24, label: 'Muy Grueso' },
    ];

    return (
        <>
            {/* Color Picker */}
            {showStrokeColorPicker && (
                <div style={{
                    position: 'fixed',
                    bottom: '100px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '8px',
                    padding: '12px',
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                    border: '2px solid #e5e7eb',
                    zIndex: 998
                }}>
                    {colors.map((color) => (
                        <button
                            key={color.value}
                            onClick={() => {
                                setStrokeColor(color.value);
                                setShowStrokeColorPicker(false);
                            }}
                            style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '8px',
                                backgroundColor: color.value,
                                border: strokeColor === color.value ? '3px solid #3b82f6' : '2px solid #e5e7eb',
                                cursor: 'pointer',
                                transition: 'transform 0.2s',
                                boxShadow: strokeColor === color.value ? '0 0 0 2px white, 0 0 0 4px #3b82f6' : 'none'
                            }}
                            title={color.label}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        />
                    ))}
                </div>
            )}

            {/* Fill Color Picker */}
            {showFillColorPicker && (
                <div style={{
                    position: 'fixed',
                    bottom: '100px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '8px',
                    padding: '12px',
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                    border: '2px solid #e5e7eb',
                    zIndex: 998
                }}>
                    {colors.map((color) => (
                        <button
                            key={color.value}
                            onClick={() => {
                                setFillColor(color.value);
                                setShowFillColorPicker(false);
                            }}
                            style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '8px',
                                backgroundColor: color.value,
                                border: fillColor === color.value ? '3px solid #3b82f6' : '2px solid #e5e7eb',
                                cursor: 'pointer',
                                transition: 'transform 0.2s',
                                boxShadow: fillColor === color.value ? '0 0 0 2px white, 0 0 0 4px #3b82f6' : 'none'
                            }}
                            title={color.label}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        />
                    ))}
                </div>
            )}

            {/* Stroke Width Menu */}
            {showStroke && (
                <div style={{
                    position: 'fixed',
                    bottom: '100px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    padding: '12px',
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                    border: '2px solid #e5e7eb',
                    zIndex: 998
                }}>
                    {strokeSizes.map((size) => (
                        <button
                            key={size.value}
                            onClick={() => {
                                setStrokeWidth(size.value);
                                setShowStroke(false);
                            }}
                            style={{
                                padding: '10px 20px',
                                borderRadius: '8px',
                                backgroundColor: strokeWidth === size.value ? '#000' : '#f9fafb',
                                color: strokeWidth === size.value ? '#fff' : '#374151',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '14px',
                                whiteSpace: 'nowrap',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                            onMouseEnter={(e) => {
                                if (strokeWidth !== size.value) e.currentTarget.style.backgroundColor = '#e5e7eb';
                            }}
                            onMouseLeave={(e) => {
                                if (strokeWidth !== size.value) e.currentTarget.style.backgroundColor = '#f9fafb';
                            }}
                        >
                            <div style={{
                                width: '30px',
                                height: `${size.value / 2}px`,
                                backgroundColor: strokeWidth === size.value ? '#fff' : '#000',
                                borderRadius: '2px'
                            }} />
                            {size.label}
                        </button>
                    ))}
                </div>
            )}

            {/* Figures Menu */}
            {showFigures && (
                <div style={{
                    position: 'fixed',
                    bottom: '100px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    padding: '8px',
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                    border: '2px solid #e5e7eb',
                    zIndex: 998
                }}>
                    {figureTools.map((t) => {
                        const isActive = tool === t.id;

                        return (
                            <button
                                key={t.id}
                                onClick={() => {
                                    setTool(t.id);
                                    setShowFigures(false);
                                }}
                                style={{
                                    padding: '10px',
                                    borderRadius: '8px',
                                    backgroundColor: isActive ? '#000' : '#f9fafb',
                                    color: isActive ? '#fff' : '#374151',
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    fontSize: '14px',
                                    whiteSpace: 'nowrap'
                                }}
                                onMouseEnter={(e) => {
                                    if (!isActive) e.currentTarget.style.backgroundColor = '#e5e7eb';
                                }}
                                onMouseLeave={(e) => {
                                    if (!isActive) e.currentTarget.style.backgroundColor = '#f9fafb';
                                }}
                            >
                                {t.label}
                            </button>
                        );
                    })}
                </div>
            )}

            {/* Shapes Menu */}
            {showShapes && (
                <div style={{
                    position: 'fixed',
                    bottom: '100px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    padding: '8px',
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                    border: '2px solid #e5e7eb',
                    zIndex: 998
                }}>
                    {shapeTools.map((t) => {
                        const Icon = t.icon;
                        const isActive = tool === t.id;

                        return (
                            <button
                                key={t.id}
                                onClick={() => {
                                    setTool(t.id);
                                    setShowShapes(false);
                                }}
                                style={{
                                    padding: '10px',
                                    borderRadius: '8px',
                                    backgroundColor: isActive ? '#000' : '#f9fafb',
                                    color: isActive ? '#fff' : '#374151',
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    fontSize: '14px',
                                    whiteSpace: 'nowrap'
                                }}
                                onMouseEnter={(e) => {
                                    if (!isActive) e.currentTarget.style.backgroundColor = '#e5e7eb';
                                }}
                                onMouseLeave={(e) => {
                                    if (!isActive) e.currentTarget.style.backgroundColor = '#f9fafb';
                                }}
                            >
                                <Icon style={{ width: '20px', height: '20px' }} />
                                {t.label}
                            </button>
                        );
                    })}
                </div>
            )}

            {/* Emojis Menu */}
            {showEmojis && (
                <div style={{
                    position: 'fixed',
                    bottom: '100px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, 1fr)',
                    gap: '8px',
                    padding: '8px',
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                    border: '2px solid #e5e7eb',
                    zIndex: 998
                }}>
                    {emojiList.map((item) => (
                        <button
                            key={item.emoji}
                            onClick={() => {
                                setSelectedEmoji(item.emoji);
                                setTool('emoji');
                                setShowEmojis(false);
                            }}
                            style={{
                                padding: '8px',
                                borderRadius: '8px',
                                backgroundColor: selectedEmoji === item.emoji ? '#f3f4f6' : 'white',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.2s'
                            }}
                            title={item.label}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                            onMouseLeave={(e) => {
                                if (selectedEmoji !== item.emoji) e.currentTarget.style.backgroundColor = 'white';
                            }}
                        >
                            {item.emoji}
                        </button>
                    ))}
                </div>
            )}

            {/* Main Toolbar */}
            <div style={{
                position: 'fixed',
                bottom: '32px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px',
                backgroundColor: 'white',
                borderRadius: '16px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                border: '2px solid #e5e7eb',
                zIndex: 999,
                maxWidth: '95vw',
                overflowX: 'auto',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
            }} className="toolbar-container">
                {mainTools.map((t) => {
                    const Icon = t.icon;
                    const isActive = tool === t.id;

                    return (
                        <button
                            key={t.id}
                            onClick={() => setTool(t.id)}
                            style={{
                                padding: '12px',
                                borderRadius: '12px',
                                backgroundColor: isActive ? '#000' : '#f3f4f6',
                                color: isActive ? '#fff' : '#374151',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                transform: isActive ? 'scale(1.1)' : 'scale(1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                            }}
                            title={t.label}
                            onMouseEnter={(e) => {
                                if (!isActive) e.currentTarget.style.backgroundColor = '#e5e7eb';
                            }}
                            onMouseLeave={(e) => {
                                if (!isActive) e.currentTarget.style.backgroundColor = '#f3f4f6';
                            }}
                        >
                            <Icon style={{ width: '24px', height: '24px' }} />
                        </button>
                    );
                })}

                {/* Shapes Button */}
                <button
                    onClick={() => {
                        setShowShapes(!showShapes);
                        setShowFigures(false);
                        setShowStrokeColorPicker(false);
                    }}
                    style={{
                        padding: '12px',
                        borderRadius: '12px',
                        backgroundColor: shapeTools.some(s => s.id === tool) ? '#000' : '#f3f4f6',
                        color: shapeTools.some(s => s.id === tool) ? '#fff' : '#374151',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        transform: shapeTools.some(s => s.id === tool) ? 'scale(1.1)' : 'scale(1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    title="Formas"
                    onMouseEnter={(e) => {
                        if (!shapeTools.some(s => s.id === tool)) {
                            e.currentTarget.style.backgroundColor = '#e5e7eb';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!shapeTools.some(s => s.id === tool)) {
                            e.currentTarget.style.backgroundColor = '#f3f4f6';
                        }
                    }}
                >
                    <Square style={{ width: '24px', height: '24px' }} />
                </button>

                {/* Figures Button */}
                <button
                    onClick={() => {
                        setShowFigures(!showFigures);
                        setShowShapes(false);
                        setShowStrokeColorPicker(false);
                    }}
                    style={{
                        padding: '12px',
                        borderRadius: '12px',
                        backgroundColor: figureTools.some(s => s.id === tool) ? '#000' : '#f3f4f6',
                        color: figureTools.some(s => s.id === tool) ? '#fff' : '#374151',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        transform: figureTools.some(s => s.id === tool) ? 'scale(1.1)' : 'scale(1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px'
                    }}
                    title="Figuras"
                    onMouseEnter={(e) => {
                        if (!figureTools.some(s => s.id === tool)) {
                            e.currentTarget.style.backgroundColor = '#e5e7eb';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!figureTools.some(s => s.id === tool)) {
                            e.currentTarget.style.backgroundColor = '#f3f4f6';
                        }
                    }}
                >
                    👤
                </button>

                {/* Emoji Button */}
                <button
                    onClick={() => {
                        setShowEmojis(!showEmojis);
                        setShowShapes(false);
                        setShowFigures(false);
                        setShowStrokeColorPicker(false);
                        setTool('emoji');
                    }}
                    style={{
                        padding: '12px',
                        borderRadius: '12px',
                        backgroundColor: tool === 'emoji' ? '#000' : '#f3f4f6',
                        color: tool === 'emoji' ? '#fff' : '#374151',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        transform: tool === 'emoji' ? 'scale(1.1)' : 'scale(1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    title="Emojis"
                    onMouseEnter={(e) => {
                        if (tool !== 'emoji') {
                            e.currentTarget.style.backgroundColor = '#e5e7eb';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (tool !== 'emoji') {
                            e.currentTarget.style.backgroundColor = '#f3f4f6';
                        }
                    }}
                >
                    <Smile style={{ width: '24px', height: '24px' }} />
                </button>


                {/* Stroke Width Button */}
                <button
                    onClick={() => {
                        setShowStroke(!showStroke);
                        setShowShapes(false);
                        setShowFigures(false);
                        setShowStrokeColorPicker(false);
                    }}
                    style={{
                        padding: '8px 12px',
                        borderRadius: '12px',
                        backgroundColor: '#f3f4f6',
                        border: '2px solid #e5e7eb',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '12px',
                        fontWeight: 'bold'
                    }}
                    title="Grosor"
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                >
                    <div style={{
                        width: '20px',
                        height: `${strokeWidth / 2}px`,
                        backgroundColor: '#374151',
                        borderRadius: '2px'
                    }} />
                </button>

                {/* Stroke Color Button */}
                <button
                    onClick={() => {
                        setShowStrokeColorPicker(!showStrokeColorPicker);
                        setShowShapes(false);
                        setShowFigures(false);
                        setShowStroke(false);
                        setShowFillColorPicker(false);
                    }}
                    style={{
                        padding: '8px',
                        borderRadius: '12px',
                        backgroundColor: '#f3f4f6',
                        border: '2px solid #e5e7eb',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '2px'
                    }}
                    title="Color de Línea"
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                >
                    <div style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: 'transparent',
                        border: `3px solid ${strokeColor}`,
                        boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                    }} />
                    <div style={{ fontSize: '8px', color: '#6b7280' }}>Línea</div>
                </button>

                {/* Fill Color Button */}
                <button
                    onClick={() => {
                        setShowFillColorPicker(!showFillColorPicker);
                        setShowShapes(false);
                        setShowFigures(false);
                        setShowStroke(false);
                        setShowStrokeColorPicker(false);
                    }}
                    style={{
                        padding: '8px',
                        borderRadius: '12px',
                        backgroundColor: '#f3f4f6',
                        border: '2px solid #e5e7eb',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '2px'
                    }}
                    title="Color de Relleno"
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                >
                    <div style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '6px',
                        backgroundColor: fillColor,
                        border: '2px solid white',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                    }} />
                    <div style={{ fontSize: '8px', color: '#6b7280' }}>Relleno</div>
                </button>
            </div>
        </>
    );
}

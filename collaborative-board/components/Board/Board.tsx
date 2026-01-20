"use client";

import { useBoardStore } from "@/store/useBoardStore";
import { useState, useEffect, useRef } from "react";
import { getStroke } from "perfect-freehand";
import { getSvgPathFromStroke } from "@/utils/getSvgPathFromStroke";
import { getPolygonPoints, getStarPoints, getHeartPath, getPathBounds, isPointInBounds, offsetPoints, getManStickFigure, getWomanStickFigure, getBoyStickFigure, getGirlStickFigure, getGrandfatherStickFigure, getGrandmotherStickFigure, getBabyStickFigure, getDogStickFigure, getCatStickFigure } from "@/utils/geometry";
import { Point } from "@/types/board";
import { ImageIcon } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

export function Board() {
    const {
        elements,
        tool,
        strokeColor,
        fillColor,
        strokeWidth,
        addElement,
        updateElement,
        deleteElement,
        selectElement,
        selectedEmoji
    } = useBoardStore();

    const [currentPoints, setCurrentPoints] = useState<Point[]>([]);
    const [currentId, setCurrentId] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [resizeHandle, setResizeHandle] = useState<string | null>(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [editingTextId, setEditingTextId] = useState<string | null>(null);
    const textInputRef = useRef<HTMLInputElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Delete selected element on Delete key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Delete' || e.key === 'Backspace') {
                if (editingTextId) return; // Don't delete while editing text
                const selected = elements.find(el => el.isSelected);
                if (selected) {
                    deleteElement(selected.id);
                    e.preventDefault();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [elements, deleteElement, editingTextId]);

    // Focus text input when editing
    useEffect(() => {
        if (editingTextId && textInputRef.current) {
            textInputRef.current.focus();
        }
    }, [editingTextId]);

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        const x = e.clientX;
        const y = e.clientY;

        // Check if clicking on an element for selection/dragging/resizing
        if (tool === 'select') {
            const selected = elements.find(el => el.isSelected);
            if (selected) {
                // Check if clicking resize handles
                const padding = 10;
                const handles = [
                    { id: 'nw', x: selected.x, y: selected.y },
                    { id: 'ne', x: (selected.x || 0) + (selected.width || 0), y: selected.y },
                    { id: 'sw', x: selected.x, y: (selected.y || 0) + (selected.height || 0) },
                    { id: 'se', x: (selected.x || 0) + (selected.width || 0), y: (selected.y || 0) + (selected.height || 0) }
                ];

                for (const h of handles) {
                    if (x >= h.x! - padding && x <= h.x! + padding && y >= h.y! - padding && y <= h.y! + padding) {
                        setIsResizing(true);
                        setResizeHandle(h.id);
                        return;
                    }
                }
            }

            let clickedElement = null;

            // Check shapes and text first
            for (const el of [...elements].reverse()) {
                if (el.type === 'path') {
                    if (el.points) {
                        const bounds = getPathBounds(el.points);
                        if (isPointInBounds(x, y, bounds.minX, bounds.minY, bounds.maxX, bounds.maxY)) {
                            clickedElement = el;
                            break;
                        }
                    }
                } else if (el.x !== undefined && el.y !== undefined) {
                    const width = el.width || (el.type === 'text' ? 200 : 100);
                    const height = el.height || (el.type === 'text' ? 40 : 100);
                    if (x >= el.x && x <= (el.x + width) && y >= el.y && y <= (el.y + height)) {
                        clickedElement = el;
                        break;
                    }
                }
            }

            if (clickedElement) {
                const isAlreadySelected = clickedElement.isSelected;
                selectElement(clickedElement.id);

                if (clickedElement.type === 'path' && clickedElement.points) {
                    const bounds = getPathBounds(clickedElement.points);
                    setDragOffset({ x: x - bounds.minX, y: y - bounds.minY });
                } else {
                    setDragOffset({ x: x - clickedElement.x!, y: y - clickedElement.y! });
                }

                // Edit text or notes on double click
                // (Using e.detail === 2 for double click)
                if (clickedElement.type === 'text' || clickedElement.type === 'note') {
                    if (e.detail >= 2) {
                        setEditingTextId(clickedElement.id);
                        setIsDragging(false); // Don't drag while editing
                        return;
                    }
                }

                setIsDragging(true);
                return;
            } else {
                selectElement(null);
                setEditingTextId(null);
            }
        }

        const size = 100;

        if (tool === 'pen') {
            const id = uuidv4();
            const point = { x, y, pressure: e.pressure };
            setCurrentId(id);
            setCurrentPoints([point]);

            addElement({
                id,
                type: 'path',
                x: 0,
                y: 0,
                strokeColor: strokeColor,
                points: [point],
                strokeWidth: strokeWidth
            });
        } else if (tool === 'line') {
            const id = uuidv4();
            setCurrentId(id);
            addElement({
                id,
                type: 'line',
                x: x,
                y: y,
                x2: x,
                y2: y,
                strokeColor: strokeColor,
                strokeWidth: strokeWidth
            });
        } else if (tool === 'text') {
            // Check if clicking on an existing text element to edit it
            let clickedText = null;
            for (const el of [...elements].reverse()) {
                if (el.type === 'text' || el.type === 'note') {
                    const width = el.width || 200;
                    const height = el.height || (el.type === 'text' ? 40 : 200);
                    if (x >= el.x && x <= (el.x + width) && y >= el.y && y <= (el.y + height)) {
                        clickedText = el;
                        break;
                    }
                }
            }

            if (clickedText) {
                selectElement(clickedText.id);
                setEditingTextId(clickedText.id);
                return;
            }

            const id = uuidv4();
            addElement({
                id,
                type: 'text',
                x: x,
                y: y,
                width: 200,
                height: 40,
                strokeColor: strokeColor,
                strokeWidth: strokeWidth,
                text: '',
                fontSize: 24
            });
            setEditingTextId(id);
            selectElement(id);
        } else if (tool === 'rect') {
            addElement({
                id: uuidv4(),
                type: 'rect',
                x: x - size / 2,
                y: y - size / 2,
                width: size,
                height: size,
                strokeColor: strokeColor,
                strokeWidth: strokeWidth,
                backgroundColor: fillColor
            });
        } else if (tool === 'circle') {
            addElement({
                id: uuidv4(),
                type: 'circle',
                x: x - size / 2,
                y: y - size / 2,
                width: size,
                height: size,
                strokeColor: strokeColor,
                strokeWidth: strokeWidth,
                backgroundColor: fillColor
            });
        } else if (tool === 'triangle' || tool === 'pentagon' || tool === 'hexagon' || tool === 'octagon') {
            addElement({
                id: uuidv4(),
                type: tool,
                x: x - size / 2,
                y: y - size / 2,
                width: size,
                height: size,
                strokeColor: strokeColor,
                strokeWidth: strokeWidth,
                backgroundColor: fillColor
            });
        } else if (tool === 'star') {
            addElement({
                id: uuidv4(),
                type: 'star',
                x: x - size / 2,
                y: y - size / 2,
                width: size,
                height: size,
                strokeColor: strokeColor,
                strokeWidth: strokeWidth,
                backgroundColor: fillColor
            });
        } else if (tool === 'arrow') {
            addElement({
                id: uuidv4(),
                type: 'arrow',
                x: x - size,
                y: y - size / 4,
                width: size * 2,
                height: size / 2,
                strokeColor: strokeColor,
                strokeWidth: strokeWidth,
                backgroundColor: fillColor
            });
        } else if (tool === 'heart') {
            addElement({
                id: uuidv4(),
                type: 'heart',
                x: x - 50,
                y: y - 50,
                width: 100,
                height: 100,
                strokeColor: strokeColor,
                strokeWidth: strokeWidth,
                backgroundColor: fillColor
            });
        } else if (tool === 'image') {
            fileInputRef.current?.click();
        } else if (tool === 'note') {
            // Check if clicking on an existing note/text element to edit it
            let clickedEl = null;
            for (const el of [...elements].reverse()) {
                if (el.type === 'text' || el.type === 'note') {
                    const width = el.width || 200;
                    const height = el.height || 200;
                    if (x >= el.x && x <= (el.x + width) && y >= el.y && y <= (el.y + height)) {
                        clickedEl = el;
                        break;
                    }
                }
            }

            if (clickedEl) {
                selectElement(clickedEl.id);
                setEditingTextId(clickedEl.id);
                return;
            }

            const id = uuidv4();
            addElement({
                id,
                type: 'note',
                x: x - 100,
                y: y - 100,
                width: 200,
                height: 200,
                strokeColor: strokeColor,
                strokeWidth: strokeWidth,
                backgroundColor: '#fef08a', // default yellow
                text: ''
            });
            setEditingTextId(id);
            selectElement(id);
        } else if (tool === 'person_man' || tool === 'person_woman') {
            addElement({
                id: uuidv4(),
                type: tool,
                x: x - 25,
                y: y - 50,
                width: 50,
                height: 100,
                strokeColor: strokeColor,
                strokeWidth: strokeWidth
            });
        } else if (tool === 'emoji' && selectedEmoji) {
            addElement({
                id: uuidv4(),
                type: 'emoji',
                x: x - 40,
                y: y - 40,
                width: 80,
                height: 80,
                text: selectedEmoji,
                strokeColor: 'transparent',
                strokeWidth: 0,
            });
        } else if (tool === 'person_grandfather' || tool === 'person_grandmother') {
            addElement({
                id: uuidv4(),
                type: tool,
                x: x - 25,
                y: y - 50,
                width: 50,
                height: 100,
                strokeColor: strokeColor,
                strokeWidth: strokeWidth
            });
        } else if (tool === 'person_baby') {
            addElement({
                id: uuidv4(),
                type: tool,
                x: x - 15,
                y: y - 20,
                width: 30,
                height: 40,
                strokeColor: strokeColor,
                strokeWidth: strokeWidth
            });
        } else if (tool === 'person_boy' || tool === 'person_girl') {
            addElement({
                id: uuidv4(),
                type: tool,
                x: x - 20,
                y: y - 40,
                width: 40,
                height: 80,
                strokeColor: strokeColor,
                strokeWidth: strokeWidth
            });
        } else if (tool === 'animal_dog' || tool === 'animal_cat') {
            addElement({
                id: uuidv4(),
                type: tool,
                x: x - 35,
                y: y - 30,
                width: 70,
                height: 60,
                strokeColor: strokeColor,
                strokeWidth: strokeWidth
            });
        }
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (tool === 'pen' && currentId) {
            const point = { x: e.clientX, y: e.clientY, pressure: e.pressure };
            const newPoints = [...currentPoints, point];
            setCurrentPoints(newPoints);
            updateElement(currentId, { points: newPoints });
        } else if (tool === 'line' && currentId) {
            updateElement(currentId, {
                x2: e.clientX,
                y2: e.clientY
            });
        } else if (tool === 'select' && isResizing && resizeHandle) {
            const selected = elements.find(el => el.isSelected);
            if (selected) {
                const dx = e.clientX - selected.x!;
                const dy = e.clientY - selected.y!;
                const minSize = 20;

                // Figures, images, and emojis should always be proportional
                const isFigure = selected.type.startsWith('person_') || selected.type.startsWith('animal_');
                const isImage = selected.type === 'image';
                const isEmoji = selected.type === 'emoji';
                const shouldBeProportional = isFigure || isImage || isEmoji;

                if (shouldBeProportional) {
                    const ratio = (selected.width || 1) / (selected.height || 1);
                    if (resizeHandle === 'se') {
                        const newWidth = Math.max(minSize, dx);
                        updateElement(selected.id, { width: newWidth, height: newWidth / ratio });
                    } else if (resizeHandle === 'ne') {
                        const newWidth = Math.max(minSize, dx);
                        const newHeight = newWidth / ratio;
                        updateElement(selected.id, { y: selected.y! + (selected.height! - newHeight), width: newWidth, height: newHeight });
                    } else if (resizeHandle === 'sw') {
                        const newWidth = Math.max(minSize, (selected.width || 0) - (e.clientX - selected.x!));
                        const newHeight = newWidth / ratio;
                        updateElement(selected.id, { x: e.clientX, width: newWidth, height: newHeight });
                    } else if (resizeHandle === 'nw') {
                        const newWidth = Math.max(minSize, (selected.width || 0) - (e.clientX - selected.x!));
                        const newHeight = newWidth / ratio;
                        updateElement(selected.id, { x: e.clientX, y: selected.y! + (selected.height! - newHeight), width: newWidth, height: newHeight });
                    }
                } else {
                    // Non-proportional for others (rects, notes, etc.)
                    if (resizeHandle === 'se') {
                        updateElement(selected.id, { width: Math.max(minSize, dx), height: Math.max(minSize, dy) });
                    } else if (resizeHandle === 'ne') {
                        const newHeight = (selected.height || 0) - (e.clientY - selected.y!);
                        updateElement(selected.id, { y: e.clientY, width: Math.max(minSize, dx), height: Math.max(minSize, newHeight) });
                    } else if (resizeHandle === 'sw') {
                        const newWidth = (selected.width || 0) - (e.clientX - selected.x!);
                        updateElement(selected.id, { x: e.clientX, width: Math.max(minSize, newWidth), height: Math.max(minSize, dy) });
                    } else if (resizeHandle === 'nw') {
                        const newWidth = (selected.width || 0) - (e.clientX - selected.x!);
                        const newHeight = (selected.height || 0) - (e.clientY - selected.y!);
                        updateElement(selected.id, { x: e.clientX, y: e.clientY, width: Math.max(minSize, newWidth), height: Math.max(minSize, newHeight) });
                    }
                }
            }
        } else if (tool === 'select' && isDragging) {
            const selected = elements.find(el => el.isSelected);
            if (selected) {
                if (selected.type === 'path' && selected.points) {
                    const bounds = getPathBounds(selected.points);
                    const newX = e.clientX - dragOffset.x;
                    const newY = e.clientY - dragOffset.y;
                    const dx = newX - bounds.minX;
                    const dy = newY - bounds.minY;
                    const newPoints = offsetPoints(selected.points, dx, dy);
                    updateElement(selected.id, { points: newPoints });
                } else {
                    updateElement(selected.id, {
                        x: e.clientX - dragOffset.x,
                        y: e.clientY - dragOffset.y
                    });
                }
            }
        }
    };

    const handlePointerUp = () => {
        setCurrentId(null);
        setCurrentPoints([]);
        setIsDragging(false);
        setIsResizing(false);
        setResizeHandle(null);
    };

    if (!isMounted) return null;

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const src = event.target?.result as string;
                addElement({
                    id: uuidv4(),
                    type: 'image',
                    x: window.innerWidth / 2 - 150,
                    y: window.innerHeight / 2 - 150,
                    width: 300,
                    height: 300,
                    src,
                    strokeColor: 'transparent'
                });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#f9fafb',
                position: 'relative',
                overflow: 'hidden',
                cursor: tool === 'pen' ? 'crosshair' : tool === 'select' ? 'default' : tool === 'text' ? 'text' : 'copy'
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
        >
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageUpload}
            />
            <svg style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none'
            }}>
                {elements.map((el) => {
                    const isSelected = el.isSelected;
                    const selectionStyle = isSelected ? {
                        filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))',
                        strokeWidth: 3
                    } : {};

                    if (el.type === 'path' && el.points && el.points.length > 0) {
                        const stroke = getStroke(el.points, {
                            size: el.strokeWidth || 8,
                            thinning: 0.5,
                            smoothing: 0.5,
                            streamline: 0.5,
                        });
                        const pathData = getSvgPathFromStroke(stroke);
                        return (
                            <path
                                key={el.id}
                                d={pathData}
                                fill={el.strokeColor}
                                style={isSelected ? selectionStyle : {}}
                            />
                        );
                    }

                    if (el.type === 'line') {
                        return (
                            <line
                                key={el.id}
                                x1={el.x}
                                y1={el.y}
                                x2={el.x2 || el.x}
                                y2={el.y2 || el.y}
                                stroke={isSelected ? '#3b82f6' : el.strokeColor}
                                strokeWidth={isSelected ? (el.strokeWidth || 4) + 2 : (el.strokeWidth || 4)}
                                strokeLinecap="round"
                            />
                        );
                    }

                    if (el.type === 'rect') {
                        return (
                            <rect
                                key={el.id}
                                x={el.x}
                                y={el.y}
                                width={el.width}
                                height={el.height}
                                fill={el.backgroundColor}
                                stroke={isSelected ? '#3b82f6' : el.strokeColor}
                                strokeWidth={isSelected ? (el.strokeWidth || 4) + 2 : (el.strokeWidth || 4)}
                                rx={8}
                            />
                        );
                    }

                    if (el.type === 'circle') {
                        return (
                            <ellipse
                                key={el.id}
                                cx={el.x! + (el.width! / 2)}
                                cy={el.y! + (el.height! / 2)}
                                rx={el.width! / 2}
                                ry={el.height! / 2}
                                fill={el.backgroundColor}
                                stroke={isSelected ? '#3b82f6' : el.strokeColor}
                                strokeWidth={isSelected ? (el.strokeWidth || 4) + 2 : (el.strokeWidth || 4)}
                            />
                        );
                    }

                    if (el.type === 'triangle') {
                        const cx = el.x! + el.width! / 2;
                        const cy = el.y! + el.height! / 2;
                        const radius = el.width! / 2;
                        return (
                            <polygon
                                key={el.id}
                                points={getPolygonPoints(cx, cy, radius, 3)}
                                fill={el.backgroundColor}
                                stroke={isSelected ? '#3b82f6' : el.strokeColor}
                                strokeWidth={isSelected ? (el.strokeWidth || 4) + 2 : (el.strokeWidth || 4)}
                            />
                        );
                    }

                    if (el.type === 'pentagon') {
                        const cx = el.x! + el.width! / 2;
                        const cy = el.y! + el.height! / 2;
                        const radius = el.width! / 2;
                        return (
                            <polygon
                                key={el.id}
                                points={getPolygonPoints(cx, cy, radius, 5)}
                                fill={el.backgroundColor}
                                stroke={isSelected ? '#3b82f6' : el.strokeColor}
                                strokeWidth={isSelected ? (el.strokeWidth || 4) + 2 : (el.strokeWidth || 4)}
                            />
                        );
                    }

                    if (el.type === 'hexagon') {
                        const cx = el.x! + el.width! / 2;
                        const cy = el.y! + el.height! / 2;
                        const radius = el.width! / 2;
                        return (
                            <polygon
                                key={el.id}
                                points={getPolygonPoints(cx, cy, radius, 6)}
                                fill={el.backgroundColor}
                                stroke={isSelected ? '#3b82f6' : el.strokeColor}
                                strokeWidth={isSelected ? (el.strokeWidth || 4) + 2 : (el.strokeWidth || 4)}
                            />
                        );
                    }

                    if (el.type === 'octagon') {
                        const cx = el.x! + el.width! / 2;
                        const cy = el.y! + el.height! / 2;
                        const radius = el.width! / 2;
                        return (
                            <polygon
                                key={el.id}
                                points={getPolygonPoints(cx, cy, radius, 8)}
                                fill={el.backgroundColor}
                                stroke={isSelected ? '#3b82f6' : el.strokeColor}
                                strokeWidth={isSelected ? (el.strokeWidth || 4) + 2 : (el.strokeWidth || 4)}
                            />
                        );
                    }

                    if (el.type === 'star') {
                        const cx = el.x! + el.width! / 2;
                        const cy = el.y! + el.height! / 2;
                        const outerRadius = el.width! / 2;
                        const innerRadius = outerRadius * 0.4;
                        return (
                            <polygon
                                key={el.id}
                                points={getStarPoints(cx, cy, outerRadius, innerRadius, 5)}
                                fill={el.backgroundColor}
                                stroke={isSelected ? '#3b82f6' : el.strokeColor}
                                strokeWidth={isSelected ? (el.strokeWidth || 4) + 2 : (el.strokeWidth || 4)}
                            />
                        );
                    }

                    if (el.type === 'arrow') {
                        const arrowPath = `
            M ${el.x} ${el.y! + el.height! / 2}
            L ${el.x! + el.width! * 0.7} ${el.y! + el.height! / 2}
            L ${el.x! + el.width! * 0.7} ${el.y}
            L ${el.x! + el.width!} ${el.y! + el.height! / 2}
            L ${el.x! + el.width! * 0.7} ${el.y! + el.height!}
            L ${el.x! + el.width! * 0.7} ${el.y! + el.height! / 2}
            Z
            `;
                        return (
                            <path
                                key={el.id}
                                d={arrowPath}
                                fill={el.backgroundColor}
                                stroke={isSelected ? '#3b82f6' : el.strokeColor}
                                strokeWidth={isSelected ? (el.strokeWidth || 4) + 2 : (el.strokeWidth || 4)}
                            />
                        );
                    }

                    if (el.type === 'text') {
                        return (
                            <text
                                key={el.id}
                                x={el.x}
                                y={(el.y || 0) + (el.fontSize || 24)}
                                fill={el.strokeColor}
                                fontSize={el.fontSize || 24}
                                style={{
                                    userSelect: 'none',
                                    filter: isSelected ? 'drop-shadow(0 0 4px #3b82f6)' : 'none',
                                    fontWeight: '500'
                                }}
                            >
                                {el.text}
                            </text>
                        );
                    }

                    if (el.type === 'note') {
                        return (
                            <g key={el.id}>
                                <rect
                                    x={el.x}
                                    y={el.y}
                                    width={el.width}
                                    height={el.height}
                                    fill={el.backgroundColor}
                                    stroke={isSelected ? '#3b82f6' : 'rgba(0,0,0,0.1)'}
                                    strokeWidth={isSelected ? 3 : 1}
                                    style={{
                                        filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))'
                                    }}
                                />
                                <foreignObject
                                    x={el.x! + 10}
                                    y={el.y! + 10}
                                    width={el.width! - 20}
                                    height={el.height! - 20}
                                >
                                    <div style={{
                                        width: '100%',
                                        height: '100%',
                                        fontSize: '16px',
                                        color: '#374151',
                                        overflow: 'hidden',
                                        wordBreak: 'break-word',
                                        userSelect: 'none'
                                    }}>
                                        {el.text}
                                    </div>
                                </foreignObject>
                            </g>
                        );
                    }

                    // Person and animal silhouettes
                    if (el.type === 'person_man') {
                        return (
                            <path
                                key={el.id}
                                d={getManStickFigure(el.x!, el.y!, el.width!, el.height!)}
                                fill="none"
                                stroke={isSelected ? '#3b82f6' : el.strokeColor}
                                strokeWidth={isSelected ? (el.strokeWidth || 4) / 2 + 2 : (el.strokeWidth || 4) / 2}
                                strokeLinejoin="round"
                            />
                        );
                    }

                    if (el.type === 'heart') {
                        return (
                            <path
                                key={el.id}
                                d={getHeartPath(el.x!, el.y!, el.width!, el.height!)}
                                fill={el.backgroundColor || 'none'}
                                stroke={isSelected ? '#3b82f6' : el.strokeColor}
                                strokeWidth={isSelected ? (el.strokeWidth || 4) + 2 : (el.strokeWidth || 4)}
                                strokeLinejoin="round"
                            />
                        );
                    }

                    if (el.type === 'person_woman') {
                        return (
                            <path
                                key={el.id}
                                d={getWomanStickFigure(el.x!, el.y!, el.width!, el.height!)}
                                fill="none"
                                stroke={isSelected ? '#3b82f6' : el.strokeColor}
                                strokeWidth={isSelected ? (el.strokeWidth || 4) / 2 + 2 : (el.strokeWidth || 4) / 2}
                                strokeLinecap="round"
                            />
                        );
                    }

                    if (el.type === 'emoji') {
                        return (
                            <text
                                key={el.id}
                                x={el.x! + el.width! / 2}
                                y={el.y! + el.height! * 0.85}
                                fontSize={el.height! * 0.9}
                                textAnchor="middle"
                                style={{
                                    userSelect: 'none',
                                    filter: isSelected ? 'drop-shadow(0 0 4px #3b82f6)' : 'none'
                                }}
                            >
                                {el.text}
                            </text>
                        );
                    }

                    if (el.type === 'person_grandfather') {
                        return (
                            <path
                                key={el.id}
                                d={getGrandfatherStickFigure(el.x!, el.y!, el.width!, el.height!)}
                                fill="none"
                                stroke={isSelected ? '#3b82f6' : el.strokeColor}
                                strokeWidth={isSelected ? (el.strokeWidth || 4) + 2 : (el.strokeWidth || 4)}
                                strokeLinecap="round"
                            />
                        );
                    }

                    if (el.type === 'person_grandmother') {
                        return (
                            <path
                                key={el.id}
                                d={getGrandmotherStickFigure(el.x!, el.y!, el.width!, el.height!)}
                                fill="none"
                                stroke={isSelected ? '#3b82f6' : el.strokeColor}
                                strokeWidth={isSelected ? (el.strokeWidth || 4) + 2 : (el.strokeWidth || 4)}
                                strokeLinecap="round"
                            />
                        );
                    }

                    if (el.type === 'person_baby') {
                        return (
                            <path
                                key={el.id}
                                d={getBabyStickFigure(el.x!, el.y!, el.width!, el.height!)}
                                fill="none"
                                stroke={isSelected ? '#3b82f6' : el.strokeColor}
                                strokeWidth={isSelected ? (el.strokeWidth || 4) + 2 : (el.strokeWidth || 4)}
                                strokeLinecap="round"
                            />
                        );
                    }

                    if (el.type === 'person_boy') {
                        return (
                            <path
                                key={el.id}
                                d={getBoyStickFigure(el.x!, el.y!, el.width!, el.height!)}
                                fill="none"
                                stroke={isSelected ? '#3b82f6' : el.strokeColor}
                                strokeWidth={isSelected ? (el.strokeWidth || 4) / 2 + 2 : (el.strokeWidth || 4) / 2}
                                strokeLinecap="round"
                            />
                        );
                    }

                    if (el.type === 'person_girl') {
                        return (
                            <path
                                key={el.id}
                                d={getGirlStickFigure(el.x!, el.y!, el.width!, el.height!)}
                                fill="none"
                                stroke={isSelected ? '#3b82f6' : el.strokeColor}
                                strokeWidth={isSelected ? (el.strokeWidth || 4) / 2 + 2 : (el.strokeWidth || 4) / 2}
                                strokeLinecap="round"
                            />
                        );
                    }

                    if (el.type === 'animal_dog') {
                        return (
                            <path
                                key={el.id}
                                d={getDogStickFigure(el.x!, el.y!, el.width!, el.height!)}
                                fill="none"
                                stroke={isSelected ? '#3b82f6' : el.strokeColor}
                                strokeWidth={isSelected ? (el.strokeWidth || 4) / 2 + 2 : (el.strokeWidth || 4) / 2}
                                strokeLinecap="round"
                            />
                        );
                    }

                    if (el.type === 'animal_cat') {
                        return (
                            <path
                                key={el.id}
                                d={getCatStickFigure(el.x!, el.y!, el.width!, el.height!)}
                                fill="none"
                                stroke={isSelected ? '#3b82f6' : el.strokeColor}
                                strokeWidth={isSelected ? (el.strokeWidth || 4) / 2 + 2 : (el.strokeWidth || 4) / 2}
                                strokeLinecap="round"
                            />
                        );
                    }

                    if (el.type === 'image') {
                        return (
                            <image
                                key={el.id}
                                href={el.src}
                                x={el.x}
                                y={el.y}
                                width={el.width}
                                height={el.height}
                                preserveAspectRatio="xMidYMid meet"
                                style={isSelected ? { filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))' } : {}}
                            />
                        );
                    }

                    return null;
                })}
                {/* Selection Handles */}
                {elements.find(el => el.isSelected && el.type !== 'path') && (
                    <g fill="#3b82f6" stroke="white" strokeWidth="2">
                        {(() => {
                            const el = elements.find(e => e.isSelected)!;
                            const handles = [
                                { id: 'nw', x: el.x, y: el.y },
                                { id: 'ne', x: (el.x || 0) + (el.width || 0), y: el.y },
                                { id: 'sw', x: el.x, y: (el.y || 0) + (el.height || 0) },
                                { id: 'se', x: (el.x || 0) + (el.width || 0), y: (el.y || 0) + (el.height || 0) }
                            ];
                            return handles.map(h => (
                                <circle key={h.id} cx={h.x} cy={h.y} r="6" style={{ cursor: `${h.id}-resize`, pointerEvents: 'auto' }} />
                            ));
                        })()}
                    </g>
                )}
            </svg>

            {/* Hidden input for editing text */}
            {editingTextId && (() => {
                const el = elements.find(el => el.id === editingTextId);
                if (!el) return null;

                const isNote = el.type === 'note';

                return (
                    <div
                        onPointerDown={(e) => e.stopPropagation()}
                        style={{
                            position: 'absolute',
                            top: el.y,
                            left: el.x,
                            zIndex: 1000,
                            width: el.width || 200,
                            height: el.height || 'auto'
                        }}
                    >
                        {isNote ? (
                            <textarea
                                ref={textInputRef as any}
                                value={el.text || ''}
                                onChange={(e) => updateElement(editingTextId, { text: e.target.value })}
                                onBlur={() => setEditingTextId(null)}
                                autoFocus
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    background: 'transparent',
                                    border: 'none',
                                    outline: '2px solid #3b82f6',
                                    fontSize: '16px',
                                    padding: '10px',
                                    resize: 'none',
                                    fontFamily: 'inherit'
                                }}
                            />
                        ) : (
                            <input
                                ref={textInputRef}
                                type="text"
                                value={el.text || ''}
                                onChange={(e) => updateElement(editingTextId, { text: e.target.value })}
                                onBlur={() => setEditingTextId(null)}
                                onKeyDown={(e) => e.key === 'Enter' && setEditingTextId(null)}
                                autoFocus
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    outline: '2px solid #3b82f6',
                                    fontSize: el.fontSize || 24,
                                    width: '100%',
                                    padding: '0 4px',
                                    margin: 0,
                                    fontWeight: '500',
                                    height: '100%',
                                    lineHeight: '1'
                                }}
                            />
                        )}
                    </div>
                );
            })()}
        </div>
    );
}


import React from 'react';
import { SacredGeometryType } from '@/types/board';

interface SacredShapeProps {
    type: SacredGeometryType;
    width: number;
    height: number;
    stroke: string;
}

export function SacredShape({ type, width, height, stroke }: SacredShapeProps) {
    const cx = width / 2;
    const cy = height / 2;
    const radius = Math.min(width, height) / 4; // Base radius

    if (type === 'seed_of_life') {
        return (
            <g stroke={stroke} fill="none" strokeWidth="1.5">
                <circle cx={cx} cy={cy} r={radius} />
                {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                    const rad = (angle * Math.PI) / 180;
                    return (
                        <circle
                            key={i}
                            cx={cx + radius * Math.cos(rad)}
                            cy={cy + radius * Math.sin(rad)}
                            r={radius}
                        />
                    );
                })}
            </g>
        );
    }

    if (type === 'flower_of_life') {
        // Simplified Flower of Life (2 layers)
        const circles = [];
        circles.push(<circle key="center" cx={cx} cy={cy} r={radius} />);

        // Layer 1
        for (let i = 0; i < 6; i++) {
            const rad = (i * 60 * Math.PI) / 180;
            circles.push(<circle key={`l1-${i}`} cx={cx + radius * Math.cos(rad)} cy={cy + radius * Math.sin(rad)} r={radius} />);
        }
        // Layer 2
        for (let i = 0; i < 6; i++) {
            const rad = (i * 60 * Math.PI) / 180;
            // Intersections
            const midX = cx + radius * Math.sqrt(3) * Math.cos(rad + Math.PI / 6);
            const midY = cy + radius * Math.sqrt(3) * Math.sin(rad + Math.PI / 6);
            circles.push(<circle key={`l2-mid-${i}`} cx={midX} cy={midY} r={radius} />);

            const outerX = cx + 2 * radius * Math.cos(rad);
            const outerY = cy + 2 * radius * Math.sin(rad);
            circles.push(<circle key={`l2-out-${i}`} cx={outerX} cy={outerY} r={radius} />);
        }

        return <g stroke={stroke} fill="none" strokeWidth="1">{circles}</g>;
    }

    if (type === 'metatrons_cube') {
        // 13 Circles + Lines connecting centers
        return (
            <g stroke={stroke} fill="none" strokeWidth="1" opacity="0.8">
                <circle cx={cx} cy={cy} r={radius} fill={stroke} fillOpacity="0.1" />
                {/* Simple representation for now */}
                <path d={`M${cx} ${cy - radius * 2} L${cx} ${cy + radius * 2} M${cx - radius * 1.732} ${cy - radius} L${cx + radius * 1.732} ${cy + radius} M${cx - radius * 1.732} ${cy + radius} L${cx + radius * 1.732} ${cy - radius}`} />
                <circle cx={cx} cy={cy} r={radius * 2} strokeDasharray="4 4" />
            </g>
        );
    }

    return (
        <circle cx={cx} cy={cy} r={radius} stroke={stroke} />
    );
}

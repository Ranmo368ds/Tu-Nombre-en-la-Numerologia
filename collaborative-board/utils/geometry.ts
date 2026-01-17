// Stick figures based on reference image

// Man stick figure
export function getManStickFigure(x: number, y: number, width: number, height: number): string {
    const headRadius = Math.min(width, height) * 0.2;
    const cx = x + width / 2;
    const headY = y + headRadius;

    const bodyStartY = headY + headRadius;
    const bodyEndY = y + height * 0.75;
    const armY = bodyStartY + (bodyEndY - bodyStartY) * 0.2;
    const legEndY = y + height - 5;

    let path = `M ${cx} ${headY} m -${headRadius}, 0 a ${headRadius},${headRadius} 0 1,0 ${headRadius * 2},0 a ${headRadius},${headRadius} 0 1,0 -${headRadius * 2},0 `;

    // Eyes (dots)
    path += `M ${cx - headRadius * 0.3} ${headY - headRadius * 0.2} m -2,0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 `;
    path += `M ${cx + headRadius * 0.3} ${headY - headRadius * 0.2} m -2,0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 `;

    // Smile
    path += `M ${cx - headRadius * 0.4} ${headY + headRadius * 0.2} Q ${cx} ${headY + headRadius * 0.5} ${cx + headRadius * 0.4} ${headY + headRadius * 0.2} `;

    // Body (thick line/rectangle)
    path += `M ${cx} ${bodyStartY} L ${cx} ${bodyEndY} `;

    // Arms (curved with dots)
    const armSpan = width * 0.4;
    path += `M ${cx} ${armY} Q ${cx - armSpan} ${armY} ${cx - armSpan} ${bodyEndY - 10} `;
    path += `M ${cx - armSpan} ${bodyEndY - 10} m -3,0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 `;

    path += `M ${cx} ${armY} Q ${cx + armSpan} ${armY} ${cx + armSpan} ${bodyEndY - 10} `;
    path += `M ${cx + armSpan} ${bodyEndY - 10} m -3,0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 `;

    // Legs (with dot feet)
    const legSpan = width * 0.2;
    path += `M ${cx} ${bodyEndY} L ${cx - legSpan} ${legEndY} `;
    path += `M ${cx - legSpan} ${legEndY} m -3,0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 `;

    path += `M ${cx} ${bodyEndY} L ${cx + legSpan} ${legEndY} `;
    path += `M ${cx + legSpan} ${legEndY} m -3,0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 `;

    return path;
}

// Woman stick figure (with dress triangle and long hair)
export function getWomanStickFigure(x: number, y: number, width: number, height: number): string {
    const headRadius = Math.min(width, height) * 0.2;
    const cx = x + width / 2;
    const headY = y + headRadius + 5;

    const bodyStartY = headY + headRadius;
    const bodyEndY = y + height * 0.75;
    const legEndY = y + height - 5;

    let path = `M ${cx} ${headY} m -${headRadius}, 0 a ${headRadius},${headRadius} 0 1,0 ${headRadius * 2},0 a ${headRadius},${headRadius} 0 1,0 -${headRadius * 2},0 `;

    // Curly Hair
    for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI) / 4;
        const hx = cx + headRadius * Math.cos(angle);
        const hy = headY + headRadius * Math.sin(angle);
        if (hy < headY + 5) { // Only top/sides
            path += `M ${hx} ${hy} m -3,0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 `;
        }
    }

    // Eyes
    path += `M ${cx - headRadius * 0.3} ${headY - headRadius * 0.2} m -2,0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 `;
    path += `M ${cx + headRadius * 0.3} ${headY - headRadius * 0.2} m -2,0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 `;

    // Smile
    path += `M ${cx - headRadius * 0.4} ${headY + headRadius * 0.2} Q ${cx} ${headY + headRadius * 0.5} ${cx + headRadius * 0.4} ${headY + headRadius * 0.2} `;

    // Dress (triangle)
    const dressWidth = width * 0.5;
    path += `M ${cx} ${bodyStartY} L ${cx - dressWidth / 2} ${bodyEndY} L ${cx + dressWidth / 2} ${bodyEndY} Z `;

    // Arms
    const armY = bodyStartY + 10;
    const armSpan = width * 0.4;
    path += `M ${cx} ${armY} Q ${cx - armSpan} ${armY} ${cx - armSpan} ${bodyEndY - 10} `;
    path += `M ${cx - armSpan} ${bodyEndY - 10} m -3,0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 `;

    path += `M ${cx} ${armY} Q ${cx + armSpan} ${armY} ${cx + armSpan} ${bodyEndY - 10} `;
    path += `M ${cx + armSpan} ${bodyEndY - 10} m -3,0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 `;

    // Legs
    path += `M ${cx - 5} ${bodyEndY} L ${cx - 5} ${legEndY} `;
    path += `M ${cx - 5} ${legEndY} m -3,0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 `;

    path += `M ${cx + 5} ${bodyEndY} L ${cx + 5} ${legEndY} `;
    path += `M ${cx + 5} ${legEndY} m -3,0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 `;

    return path;
}

export function getGrandfatherStickFigure(x: number, y: number, width: number, height: number): string {
    const headRadius = Math.min(width, height) * 0.2;
    const cx = x + width / 2;
    const headY = y + headRadius;

    const bodyStartY = headY + headRadius;
    const bodyEndY = y + height * 0.75;
    const legEndY = y + height - 5;

    let path = `M ${cx} ${headY} m -${headRadius}, 0 a ${headRadius},${headRadius} 0 1,0 ${headRadius * 2},0 a ${headRadius},${headRadius} 0 1,0 -${headRadius * 2},0 `;

    // Balding Hair (only sides)
    path += `M ${cx - headRadius} ${headY} Q ${cx - headRadius - 5} ${headY + 5} ${cx - headRadius} ${headY + 10} `;
    path += `M ${cx + headRadius} ${headY} Q ${cx + headRadius + 5} ${headY + 5} ${cx + headRadius} ${headY + 10} `;

    // Eyes
    path += `M ${cx - headRadius * 0.3} ${headY - headRadius * 0.2} m -2,0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 `;
    path += `M ${cx + headRadius * 0.3} ${headY - headRadius * 0.2} m -2,0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 `;

    // Smile
    path += `M ${cx - headRadius * 0.4} ${headY + headRadius * 0.2} Q ${cx} ${headY + headRadius * 0.5} ${cx + headRadius * 0.4} ${headY + headRadius * 0.2} `;

    // Body 
    path += `M ${cx} ${bodyStartY} L ${cx} ${bodyEndY} `;

    // Arms
    const armY = bodyStartY + 10;
    const armSpan = width * 0.4;
    path += `M ${cx} ${armY} Q ${cx - armSpan} ${armY} ${cx - armSpan} ${bodyEndY - 10} `;
    path += `M ${cx - armSpan} ${bodyEndY - 10} m -3,0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 `;

    path += `M ${cx} ${armY} Q ${cx + armSpan} ${armY} ${cx + armSpan} ${bodyEndY - 10} `;
    path += `M ${cx + armSpan} ${bodyEndY - 10} m -3,0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 `;

    // Legs
    const legSpan = width * 0.2;
    path += `M ${cx} ${bodyEndY} L ${cx - legSpan} ${legEndY} `;
    path += `M ${cx - legSpan} ${legEndY} m -3,0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 `;

    path += `M ${cx} ${bodyEndY} L ${cx + legSpan} ${legEndY} `;
    path += `M ${cx + legSpan} ${legEndY} m -3,0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 `;

    return path;
}

export function getGrandmotherStickFigure(x: number, y: number, width: number, height: number): string {
    const headRadius = Math.min(width, height) * 0.2;
    const cx = x + width / 2;
    const headY = y + headRadius + 5;

    const bodyStartY = headY + headRadius;
    const bodyEndY = y + height * 0.75;
    const legEndY = y + height - 5;

    let path = `M ${cx} ${headY} m -${headRadius}, 0 a ${headRadius},${headRadius} 0 1,0 ${headRadius * 2},0 a ${headRadius},${headRadius} 0 1,0 -${headRadius * 2},0 `;

    // Top Bun
    path += `M ${cx} ${headY - headRadius} m -5,-5 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0 `;

    // Eyes
    path += `M ${cx - headRadius * 0.3} ${headY - headRadius * 0.2} m -2,0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 `;
    path += `M ${cx + headRadius * 0.3} ${headY - headRadius * 0.2} m -2,0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 `;

    // Smile
    path += `M ${cx - headRadius * 0.4} ${headY + headRadius * 0.2} Q ${cx} ${headY + headRadius * 0.5} ${cx + headRadius * 0.4} ${headY + headRadius * 0.2} `;

    // Dress (triangle)
    const dressWidth = width * 0.5;
    path += `M ${cx} ${bodyStartY} L ${cx - dressWidth / 2} ${bodyEndY} L ${cx + dressWidth / 2} ${bodyEndY} Z `;

    // Arms 
    const armY = bodyStartY + 10;
    const armSpan = width * 0.4;
    path += `M ${cx} ${armY} Q ${cx - armSpan} ${armY} ${cx - armSpan} ${bodyEndY - 10} `;
    path += `M ${cx - armSpan} ${bodyEndY - 10} m -3,0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 `;

    path += `M ${cx} ${armY} Q ${cx + armSpan} ${armY} ${cx + armSpan} ${bodyEndY - 10} `;
    path += `M ${cx + armSpan} ${bodyEndY - 10} m -3,0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 `;

    // Legs
    path += `M ${cx - 5} ${bodyEndY} L ${cx - 5} ${legEndY} `;
    path += `M ${cx - 5} ${legEndY} m -3,0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 `;

    path += `M ${cx + 5} ${bodyEndY} L ${cx + 5} ${legEndY} `;
    path += `M ${cx + 5} ${legEndY} m -3,0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 `;

    return path;
}

export function getBabyStickFigure(x: number, y: number, width: number, height: number): string {
    const headRadius = Math.min(width, height) * 0.3;
    const cx = x + width / 2;
    const headY = y + headRadius;

    const bodyStartY = headY + headRadius;
    const bodyEndY = y + height - 10;

    let path = `M ${cx} ${headY} m -${headRadius}, 0 a ${headRadius},${headRadius} 0 1,0 ${headRadius * 2},0 a ${headRadius},${headRadius} 0 1,0 -${headRadius * 2},0 `;

    // Eyes
    path += `M ${cx - headRadius * 0.3} ${headY - headRadius * 0.1} m -1,0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0 `;
    path += `M ${cx + headRadius * 0.3} ${headY - headRadius * 0.1} m -1,0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0 `;

    // Smile
    path += `M ${cx - headRadius * 0.4} ${headY + headRadius * 0.2} Q ${cx} ${headY + headRadius * 0.4} ${cx + headRadius * 0.4} ${headY + headRadius * 0.2} `;

    // Short body
    path += `M ${cx} ${bodyStartY} L ${cx} ${bodyEndY} `;

    // Short arms (curved upwards)
    path += `M ${cx} ${bodyStartY + 5} Q ${cx - 15} ${bodyStartY} ${cx - 15} ${bodyStartY + 5} `;
    path += `M ${cx - 15} ${bodyStartY + 5} m -2,0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 `;

    path += `M ${cx} ${bodyStartY + 5} Q ${cx + 15} ${bodyStartY} ${cx + 15} ${bodyStartY + 5} `;
    path += `M ${cx + 15} ${bodyStartY + 5} m -2,0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 `;

    // Short legs
    path += `M ${cx} ${bodyEndY} L ${cx - 10} ${bodyEndY + 8} `;
    path += `M ${cx - 10} ${bodyEndY + 8} m -2,0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 `;

    path += `M ${cx} ${bodyEndY} L ${cx + 10} ${bodyEndY + 8} `;
    path += `M ${cx + 10} ${bodyEndY + 8} m -2,0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 `;

    return path;
}

// Boy stick figure (smaller, spiky hair)
export function getBoyStickFigure(x: number, y: number, width: number, height: number): string {
    const headRadius = Math.min(width, height) * 0.22;
    const cx = x + width / 2;
    const headY = y + headRadius;

    const bodyStartY = headY + headRadius;
    const bodyEndY = y + height * 0.7;
    const legEndY = y + height - 5;

    let path = `M ${cx} ${headY} m -${headRadius}, 0 a ${headRadius},${headRadius} 0 1,0 ${headRadius * 2},0 a ${headRadius},${headRadius} 0 1,0 -${headRadius * 2},0 `;

    // Eyes
    path += `M ${cx - headRadius * 0.3} ${headY - headRadius * 0.2} m -1.5,0 a 1.5,1.5 0 1,0 3,0 a 1.5,1.5 0 1,0 -3,0 `;
    path += `M ${cx + headRadius * 0.3} ${headY - headRadius * 0.2} m -1.5,0 a 1.5,1.5 0 1,0 3,0 a 1.5,1.5 0 1,0 -3,0 `;

    // Smile
    path += `M ${cx - headRadius * 0.4} ${headY + headRadius * 0.2} Q ${cx} ${headY + headRadius * 0.5} ${cx + headRadius * 0.4} ${headY + headRadius * 0.2} `;

    // Body 
    path += `M ${cx} ${bodyStartY} L ${cx} ${bodyEndY} `;

    // Arms (straight with dots)
    const armY = bodyStartY + 8;
    const armSpan = width * 0.35;
    path += `M ${cx} ${armY} L ${cx - armSpan} ${armY + 10} `;
    path += `M ${cx - armSpan} ${armY + 10} m -2.5,0 a 2.5,2.5 0 1,0 5,0 a 2.5,2.5 0 1,0 -5,0 `;

    path += `M ${cx} ${armY} L ${cx + armSpan} ${armY + 10} `;
    path += `M ${cx + armSpan} ${armY + 10} m -2.5,0 a 2.5,2.5 0 1,0 5,0 a 2.5,2.5 0 1,0 -5,0 `;

    // Legs
    const legSpan = width * 0.15;
    path += `M ${cx} ${bodyEndY} L ${cx - legSpan} ${legEndY} `;
    path += `M ${cx - legSpan} ${legEndY} m -2.5,0 a 2.5,2.5 0 1,0 5,0 a 2.5,2.5 0 1,0 -5,0 `;

    path += `M ${cx} ${bodyEndY} L ${cx + legSpan} ${legEndY} `;
    path += `M ${cx + legSpan} ${legEndY} m -2.5,0 a 2.5,2.5 0 1,0 5,0 a 2.5,2.5 0 1,0 -5,0 `;

    return path;
}

// Girl stick figure (smaller, with dress and pigtails)
export function getGirlStickFigure(x: number, y: number, width: number, height: number): string {
    const headRadius = Math.min(width, height) * 0.22;
    const cx = x + width / 2;
    const headY = y + headRadius;

    const bodyStartY = headY + headRadius;
    const bodyEndY = y + height * 0.7;
    const legEndY = y + height - 5;

    let path = `M ${cx} ${headY} m -${headRadius}, 0 a ${headRadius},${headRadius} 0 1,0 ${headRadius * 2},0 a ${headRadius},${headRadius} 0 1,0 -${headRadius * 2},0 `;

    // Pigtails
    path += `M ${cx - headRadius} ${headY} Q ${cx - headRadius - 10} ${headY + 10} ${cx - headRadius} ${headY + 15} `;
    path += `M ${cx + headRadius} ${headY} Q ${cx + headRadius + 10} ${headY + 10} ${cx + headRadius} ${headY + 15} `;

    // Eyes
    path += `M ${cx - headRadius * 0.3} ${headY - headRadius * 0.2} m -1.5,0 a 1.5,1.5 0 1,0 3,0 a 1.5,1.5 0 1,0 -3,0 `;
    path += `M ${cx + headRadius * 0.3} ${headY - headRadius * 0.2} m -1.5,0 a 1.5,1.5 0 1,0 3,0 a 1.5,1.5 0 1,0 -3,0 `;

    // Smile
    path += `M ${cx - headRadius * 0.4} ${headY + headRadius * 0.2} Q ${cx} ${headY + headRadius * 0.5} ${cx + headRadius * 0.4} ${headY + headRadius * 0.2} `;

    // Dress (rectangular/trapezoid)
    const dressWidth = width * 0.4;
    path += `M ${cx} ${bodyStartY} L ${cx - dressWidth / 2} ${bodyEndY} L ${cx + dressWidth / 2} ${bodyEndY} Z `;

    // Arms (curved)
    const armY = bodyStartY + 8;
    const armSpan = width * 0.35;
    path += `M ${cx} ${armY} Q ${cx - armSpan} ${armY} ${cx - armSpan} ${bodyEndY - 5} `;
    path += `M ${cx - armSpan} ${bodyEndY - 5} m -2.5,0 a 2.5,2.5 0 1,0 5,0 a 2.5,2.5 0 1,0 -5,0 `;

    path += `M ${cx} ${armY} Q ${cx + armSpan} ${armY} ${cx + armSpan} ${bodyEndY - 5} `;
    path += `M ${cx + armSpan} ${bodyEndY - 5} m -2.5,0 a 2.5,2.5 0 1,0 5,0 a 2.5,2.5 0 1,0 -5,0 `;

    // Legs
    path += `M ${cx - 4} ${bodyEndY} L ${cx - 4} ${legEndY} `;
    path += `M ${cx - 4} ${legEndY} m -2.5,0 a 2.5,2.5 0 1,0 5,0 a 2.5,2.5 0 1,0 -5,0 `;

    path += `M ${cx + 4} ${bodyEndY} L ${cx + 4} ${legEndY} `;
    path += `M ${cx + 4} ${legEndY} m -2.5,0 a 2.5,2.5 0 1,0 5,0 a 2.5,2.5 0 1,0 -5,0 `;

    return path;
}

// Dog stick figure
export function getDogStickFigure(x: number, y: number, width: number, height: number): string {
    const headRadius = width * 0.3;
    const bodyRadiusX = width * 0.45;
    const bodyRadiusY = height * 0.3;

    const headCX = x + headRadius;
    const headCY = y + headRadius + 5;
    const bodyCX = headCX + headRadius;
    const bodyCY = y + height - bodyRadiusY - 10;

    let path = '';

    // Body (Horizontal ellipse)
    path += `M ${bodyCX} ${bodyCY} m -${bodyRadiusX}, 0 a ${bodyRadiusX},${bodyRadiusY} 0 1,0 ${bodyRadiusX * 2},0 a ${bodyRadiusX},${bodyRadiusY} 0 1,0 -${bodyRadiusX * 2},0 `;

    // Head (Bigger rounded)
    path += `M ${headCX} ${headCY} m -${headRadius}, 0 a ${headRadius},${headRadius} 0 1,0 ${headRadius * 2},0 a ${headRadius},${headRadius} 0 1,0 -${headRadius * 2},0 `;

    // Floppy Ear (on head)
    path += `M ${headCX + headRadius * 0.4} ${headCY - headRadius * 0.3} Q ${headCX + headRadius * 0.9} ${headCY} ${headCX + headRadius * 0.5} ${headCY + headRadius * 0.4} `;

    // Eyes
    path += `M ${headCX - 3} ${headCY - 2} m -1.5,0 a 1.5,1.5 0 1,0 3,0 a 1.5,1.5 0 1,0 -3,0 `;
    path += `M ${headCX + 8} ${headCY - 2} m -1.5,0 a 1.5,1.5 0 1,0 3,0 a 1.5,1.5 0 1,0 -3,0 `;

    // Nose
    path += `M ${headCX - headRadius * 0.8} ${headCY + headRadius * 0.1} m -3,0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 `;

    // Legs (4 short ones with dots)
    const legY = bodyCY + bodyRadiusY;
    const legHeight = Math.max(5, height * 0.15);

    // Front Legs
    path += `M ${bodyCX - bodyRadiusX * 0.4} ${legY} L ${bodyCX - bodyRadiusX * 0.4} ${legY + legHeight} `;
    path += `M ${bodyCX - bodyRadiusX * 0.4} ${legY + legHeight} m -2.5,0 a 2.5,2.5 0 1,0 5,0 a 2.5,2.5 0 1,0 -5,0 `;

    path += `M ${bodyCX - bodyRadiusX * 0.1} ${legY} L ${bodyCX - bodyRadiusX * 0.1} ${legY + legHeight} `;
    path += `M ${bodyCX - bodyRadiusX * 0.1} ${legY + legHeight} m -2.5,0 a 2.5,2.5 0 1,0 5,0 a 2.5,2.5 0 1,0 -5,0 `;

    // Back Legs
    path += `M ${bodyCX + bodyRadiusX * 0.3} ${legY} L ${bodyCX + bodyRadiusX * 0.3} ${legY + legHeight} `;
    path += `M ${bodyCX + bodyRadiusX * 0.3} ${legY + legHeight} m -2.5,0 a 2.5,2.5 0 1,0 5,0 a 2.5,2.5 0 1,0 -5,0 `;

    path += `M ${bodyCX + bodyRadiusX * 0.6} ${legY} L ${bodyCX + bodyRadiusX * 0.6} ${legY + legHeight} `;
    path += `M ${bodyCX + bodyRadiusX * 0.6} ${legY + legHeight} m -2.5,0 a 2.5,2.5 0 1,0 5,0 a 2.5,2.5 0 1,0 -5,0 `;

    // Tail (wagging)
    path += `M ${bodyCX + bodyRadiusX} ${bodyCY} Q ${bodyCX + bodyRadiusX + 15} ${bodyCY - 15} ${bodyCX + bodyRadiusX + 10} ${bodyCY - 25} `;

    return path;
}

// Cat stick figure (sitting)
export function getCatStickFigure(x: number, y: number, width: number, height: number): string {
    const headRadius = width * 0.35;
    const bodyRadiusX = width * 0.4;
    const bodyRadiusY = height * 0.5;

    const cx = x + width / 2;
    const bodyCY = y + height - bodyRadiusY;
    const headCY = y + headRadius;

    let path = '';

    // Body (Seated rounded shape)
    path += `M ${cx} ${bodyCY} m -${bodyRadiusX}, 0 a ${bodyRadiusX},${bodyRadiusY} 0 1,0 ${bodyRadiusX * 2},0 a ${bodyRadiusX},${bodyRadiusY} 0 1,0 -${bodyRadiusX * 2},0 `;

    // Head (Rounded)
    path += `M ${cx} ${headCY} m -${headRadius}, 0 a ${headRadius},${headRadius} 0 1,0 ${headRadius * 2},0 a ${headRadius},${headRadius} 0 1,0 -${headRadius * 2},0 `;

    // Pointy Ears
    path += `M ${cx - headRadius * 0.5} ${headCY - headRadius * 0.4} L ${cx - headRadius * 0.6} ${headCY - headRadius * 0.9} L ${cx - headRadius * 0.1} ${headCY - headRadius * 0.5} `;
    path += `M ${cx + headRadius * 0.5} ${headCY - headRadius * 0.4} L ${cx + headRadius * 0.6} ${headCY - headRadius * 0.9} L ${cx + headRadius * 0.1} ${headCY - headRadius * 0.5} `;

    // Eyes (dots)
    path += `M ${cx - headRadius * 0.3} ${headCY - 2} m -1.5,0 a 1.5,1.5 0 1,0 3,0 a 1.5,1.5 0 1,0 -3,0 `;
    path += `M ${cx + headRadius * 0.3} ${headCY - 2} m -1.5,0 a 1.5,1.5 0 1,0 3,0 a 1.5,1.5 0 1,0 -3,0 `;

    // Whiskers
    path += `M ${cx - headRadius * 0.2} ${headCY + 5} L ${cx - headRadius * 0.9} ${headCY} `;
    path += `M ${cx - headRadius * 0.2} ${headCY + 10} L ${cx - headRadius * 0.9} ${headCY + 10} `;
    path += `M ${cx + headRadius * 0.2} ${headCY + 5} L ${cx + headRadius * 0.9} ${headCY} `;
    path += `M ${cx + headRadius * 0.2} ${headCY + 10} L ${cx + headRadius * 0.9} ${headCY + 10} `;

    // Tail (curled)
    path += `M ${cx - bodyRadiusX} ${bodyCY + bodyRadiusY - 10} Q ${cx - width * 0.8} ${bodyCY + bodyRadiusY} ${cx - width * 0.6} ${bodyCY} `;

    return path;
}

// ... rest of geometry functions
export function getPathBounds(points: { x: number; y: number }[]): {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
    width: number;
    height: number;
} {
    if (points.length === 0) {
        return { minX: 0, minY: 0, maxX: 0, maxY: 0, width: 0, height: 0 };
    }

    const xs = points.map(p => p.x);
    const ys = points.map(p => p.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    return {
        minX,
        minY,
        maxX,
        maxY,
        width: maxX - minX,
        height: maxY - minY
    };
}

export function isPointInBounds(
    px: number,
    py: number,
    minX: number,
    minY: number,
    maxX: number,
    maxY: number
): boolean {
    return px >= minX && px <= maxX && py >= minY && py <= maxY;
}

export function offsetPoints(
    points: { x: number; y: number; pressure?: number }[],
    dx: number,
    dy: number
): { x: number; y: number; pressure?: number }[] {
    return points.map(p => ({ ...p, x: p.x + dx, y: p.y + dy }));
}

export function getPolygonPoints(cx: number, cy: number, radius: number, sides: number, rotation: number = 0): string {
    const points: string[] = [];
    for (let i = 0; i < sides; i++) {
        const angle = (i * 2 * Math.PI / sides) - Math.PI / 2 + rotation;
        const x = cx + radius * Math.cos(angle);
        const y = cy + radius * Math.sin(angle);
        points.push(`${x},${y}`);
    }
    return points.join(' ');
}

export function getStarPoints(cx: number, cy: number, outerRadius: number, innerRadius: number, points: number): string {
    const coords: string[] = [];
    for (let i = 0; i < points * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = (i * Math.PI / points) - Math.PI / 2;
        const x = cx + radius * Math.cos(angle);
        const y = cy + radius * Math.sin(angle);
        coords.push(`${x},${y}`);
    }
    return coords.join(' ');
}
export function getHeartPath(x: number, y: number, width: number, height: number): string {
    const cx = x + width / 2;
    const cy = y + height / 2;
    const w = width * 0.8;
    const h = height * 0.8;

    // Heart path using cubic bezier curves
    return `
        M ${cx} ${cy + h / 3}
        C ${cx - w / 2} ${cy - h / 2} ${cx - w} ${cy + h / 4} ${cx} ${cy + h}
        C ${cx + w} ${cy + h / 4} ${cx + w / 2} ${cy - h / 2} ${cx} ${cy + h / 3}
        Z
    `.trim();
}

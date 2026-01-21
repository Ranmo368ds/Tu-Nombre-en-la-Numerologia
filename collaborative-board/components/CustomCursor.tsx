"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useBoardStore } from "@/store/useBoardStore";
import { Hand, MousePointer2, Pen } from "lucide-react";

export function CustomCursor() {
    const { tool } = useBoardStore();
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 60, stiffness: 1500, mass: 0.1 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        window.addEventListener("mousemove", moveCursor);
        return () => {
            window.removeEventListener("mousemove", moveCursor);
        };
    }, [cursorX, cursorY]);

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999]"
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
            }}
        >
            <div className="relative -top-3 -left-3">
                {tool === 'pen' && (
                    <div className="relative -top-3 -left-3">
                        <svg
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="drop-shadow-lg"
                        >
                            {/* Pencil Body */}
                            <path
                                d="M18.5 2.5L21.5 5.5L8.5 18.5H5.5V15.5L18.5 2.5Z"
                                fill="#FFC107"
                                stroke="black"
                                strokeWidth="1.5"
                                strokeLinejoin="round"
                            />
                            {/* Eraser */}
                            <path
                                d="M18.5 2.5L16 5L20 9L22.5 6.5C23.0523 5.94772 23.0523 5.05228 22.5 4.5L20.5 2.5C19.9477 1.94772 19.0523 1.94772 18.5 2.5Z"
                                fill="#FF5252"
                                stroke="black"
                                strokeWidth="1.5"
                                strokeLinejoin="round"
                            />
                            {/* Tip */}
                            <path
                                d="M5.5 15.5L8.5 18.5L2 22L5.5 15.5Z"
                                fill="#F5D0A9"
                                stroke="black"
                                strokeWidth="1.5"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                )}
                {tool === 'pan' && (
                    <Hand className="w-8 h-8 text-black fill-white drop-shadow-md" />
                )}
                {tool === 'select' && (
                    <MousePointer2 className="w-6 h-6 text-black fill-white drop-shadow-sm" />
                )}
                {!['pen', 'pan', 'select'].includes(tool) && (
                    <div className="w-4 h-4 rounded-full border-2 border-black bg-white/50" />
                )}
            </div>
        </motion.div>
    );
}

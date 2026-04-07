"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { useWheel } from "@/context/WheelContext";
import confetti from "canvas-confetti";

interface CanvasWheelProps {
  onWin: (winner: any) => void;
}

const CanvasWheel: React.FC<CanvasWheelProps> = ({ onWin }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { participants, settings, isSpinning, setIsSpinning } = useWheel();
  const [rotation, setRotation] = useState(0);
  const [targetRotation, setTargetRotation] = useState(0);
  const requestRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  const colors = settings.colors;
  const imageCache = useRef<Map<string, HTMLImageElement>>(new Map());
  const localRotationRef = useRef<number>(rotation);

  // Sync ref with rotation prop
  useEffect(() => {
    if (!isSpinning) {
      localRotationRef.current = rotation;
    }
  }, [rotation, isSpinning]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = canvas.width;
    const center = size / 2;
    const radius = size / 2 - 20;
    const segmentAngle = (2 * Math.PI) / participants.length;

    ctx.clearRect(0, 0, size, size);

    participants.forEach((p, i) => {
      const angle = i * segmentAngle + localRotationRef.current;
      
      // Draw segment
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, angle, angle + segmentAngle);
      ctx.closePath();
      ctx.fillStyle = colors[i % colors.length];
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.2)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Dynamic styling based on participant count
      const fontSize = Math.min(22, Math.max(7, (radius * 3) / participants.length));
      const shouldShowImagesOnWheel = !isSpinning && settings.showImages && participants.length <= 40;

      // Draw Image
      if (shouldShowImagesOnWheel && p.image && imageCache.current.has(p.image)) {
        const img = imageCache.current.get(p.image)!;
        const imgSize = Math.max(20, radius / 8);
        const imgDist = radius * 0.7;

        ctx.save();
        ctx.translate(center, center);
        ctx.rotate(angle + segmentAngle / 2);
        
        ctx.beginPath();
        ctx.arc(imgDist, 0, imgSize / 2, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.save();
        ctx.clip();
        ctx.drawImage(img, imgDist - imgSize / 2, -imgSize / 2, imgSize, imgSize);
        ctx.restore();
        
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
      }

      // Draw text
      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(angle + segmentAngle / 2);
      ctx.textAlign = "right";
      ctx.fillStyle = "white";
      ctx.font = `bold ${fontSize}px Inter, sans-serif`;
      ctx.shadowColor = "rgba(0,0,0,0.5)";
      ctx.shadowBlur = 2;
      
      const textPadding = 20;
      const textX = (shouldShowImagesOnWheel && p.image) ? radius * 0.55 : radius - textPadding;
      
      // Handle text truncation intelligently
      const maxLen = participants.length > 50 ? 10 : 20;
      const displayName = p.name.length > maxLen ? p.name.substring(0, maxLen-2) + ".." : p.name;
      
      ctx.fillText(displayName, textX, fontSize / 3);
      ctx.restore();
    });

    // Draw center cap
    ctx.beginPath();
    ctx.arc(center, center, 40, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 2;
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(center, center, 35, 0, 2 * Math.PI);
    ctx.fillStyle = "#18181b";
    ctx.fill();

  }, [participants, colors, settings.showImages, isSpinning]);

  // Load images into cache - Optimized to not depend on 'draw' 
  // which changes 60 times per second during animation
  useEffect(() => {
    participants.forEach((p) => {
      if (p.image && !imageCache.current.has(p.image)) {
        const img = new Image();
        img.src = p.image;
        img.onload = () => {
          imageCache.current.set(p.image!, img);
          const canvas = canvasRef.current;
          if (canvas) {
            const ctx = canvas.getContext("2d");
            if (ctx) draw();
          }
        };
      }
    });
  }, [participants]);

  const initialRotationRef = useRef(0);

  const animate = useCallback((time: number) => {
    if (!startTimeRef.current) startTimeRef.current = time;
    const elapsed = time - startTimeRef.current;
    const duration = settings.duration * 1000;

    const t = Math.min(elapsed / duration, 1);
    const easeOutCirc = (x: number): number => Math.sqrt(1 - Math.pow(x - 1, 2));
    
    // Interpolate using local ref
    const currentRot = initialRotationRef.current + (targetRotation - initialRotationRef.current) * easeOutCirc(t);
    localRotationRef.current = currentRot;
    draw();

    if (t < 1) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      setRotation(currentRot);
      setIsSpinning(false);
      const finalRot = currentRot % (2 * Math.PI);
      const segmentAngle = (2 * Math.PI) / participants.length;
      
      const winningIndex = Math.floor(
        (2 * Math.PI - (finalRot % (2 * Math.PI))) / segmentAngle
      ) % participants.length;
      
      onWin(participants[winningIndex]);
      
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"]
      });
    }
  }, [targetRotation, settings.duration, participants, setIsSpinning, onWin, draw, setRotation]);

  useEffect(() => {
    if (isSpinning) {
      startTimeRef.current = 0;
      initialRotationRef.current = rotation;
      const extraRot = (5 + Math.random() * 5) * 2 * Math.PI;
      const newTarget = rotation + extraRot;
      setTargetRotation(newTarget);
      requestRef.current = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [isSpinning, animate]); // Removed rotation from deps to prevent loop

  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <div className="relative w-full aspect-square max-w-[600px] mx-auto group">
      <canvas
        ref={canvasRef}
        width={800}
        height={800}
        className="w-full h-full cursor-pointer transition-transform duration-300"
        onClick={() => !isSpinning && setIsSpinning(true)}
      />
      {/* Pointer */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10">
        <div className="w-10 h-10 bg-white border-4 border-black rotate-45 shadow-xl flex items-center justify-center">
            <div className="w-4 h-4 bg-red-500 rounded-full" />
        </div>
      </div>
      {/* Center Cap */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full border-4 border-zinc-800 flex items-center justify-center shadow-lg pointer-events-none">
        <div className="w-2 h-2 bg-zinc-800 rounded-full" />
      </div>
      
      {/* Instructions Overlay */}
      {!isSpinning && participants.length > 0 && (
         <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <span className="bg-black/60 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                ¡Haz clic para girar!
            </span>
         </div>
      )}
    </div>
  );
};

export default CanvasWheel;

'use client';

import { useEffect, useState, useRef } from 'react';
import { useMousePosition } from '@/hooks/useMousePosition';

export default function CustomCursor() {
  const mousePosition = useMousePosition();
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | undefined>(undefined);
  const speed = 0.07; // Slower speed for sticky follow effect

  useEffect(() => {
    // Only enable on desktop
    const isDesktop = window.innerWidth > 768 && !('ontouchstart' in window);
    setIsEnabled(isDesktop);

    // Keep the default cursor visible alongside the custom cursor
    // Removed cursor: 'none' so both cursors are visible

    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  useEffect(() => {
    if (!isEnabled) return;

    let mouseX = mousePosition.x;
    let mouseY = mousePosition.y;
    let currentX = mousePosition.x;
    let currentY = mousePosition.y;

    const animateDot = () => {
      // Smooth follow effect
      currentX += (mouseX - currentX) * speed;
      currentY += (mouseY - currentY) * speed;

      setDotPosition({ x: currentX, y: currentY });

      animationFrameRef.current = requestAnimationFrame(animateDot);
    };

    animateDot();

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mousePosition, isEnabled]);

  // Don't render anything if disabled
  if (!isEnabled) return null;

  return (
    <div
      id="cursor-dot"
      className="fixed w-6 h-6 bg-[var(--accent-primary)] rounded-full pointer-events-none z-[9999] transition-opacity duration-200"
      style={{
        left: dotPosition.x,
        top: dotPosition.y,
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
}


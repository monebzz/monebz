import { useState, useEffect } from 'react';

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let rafId: number | undefined;

    const updateMousePosition = (e: MouseEvent) => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        rafId = undefined;
      });
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return mousePosition;
}

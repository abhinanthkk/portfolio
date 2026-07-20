import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hasPointer, setHasPointer] = useState(false);

  useEffect(() => {
    setHasPointer(window.matchMedia('(pointer: fine)').matches);
  }, []);

  useEffect(() => {
    if (!hasPointer) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let dotX = 0;
    let dotY = 0;
    let ringX = 0;
    let ringY = 0;
    let isVisible = false;
    let isHovering = false;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }
    };

    const handleMouseEnter = () => {
      isVisible = true;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    };

    const handleMouseLeave = () => {
      isVisible = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.closest('[role="button"]') !== null;
      isHovering = isInteractive;
    };

    // Fast animation loop — no spring physics, just direct lerp
    const animate = () => {
      // Dot follows instantly (tiny lerp for smoothness)
      dotX += (mouseX - dotX) * 0.5;
      dotY += (mouseY - dotY) * 0.5;
      dot.style.transform = `translate3d(${dotX - 3}px, ${dotY - 3}px, 0) scale(${isHovering ? 2.2 : 1})`;

      // Ring follows with slight delay
      ringX += (mouseX - ringX) * 0.25;
      ringY += (mouseY - ringY) * 0.25;
      ring.style.transform = `translate3d(${ringX - 10}px, ${ringY - 10}px, 0) scale(${isHovering ? 1.4 : 1})`;

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousemove', handleMouseOver, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', handleMouseOver);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [hasPointer]);

  if (!hasPointer) return null;

  return (
    <>
      {/* Main cursor dot — fast, no blend mode */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-[6px] h-[6px] rounded-full bg-primary pointer-events-none z-[100] opacity-0"
        style={{ willChange: 'transform', transition: 'transform 0.08s ease-out, opacity 0.15s' }}
      />

      {/* Outer ring — subtle, no expensive blend modes */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-5 h-5 rounded-full border border-primary/40 pointer-events-none z-[100] opacity-0"
        style={{ willChange: 'transform', transition: 'transform 0.12s ease-out, opacity 0.15s' }}
      />
    </>
  );
}

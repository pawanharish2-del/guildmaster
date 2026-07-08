'use client';

import { useEffect, useRef, useState } from 'react';

const HOVER_SELECTOR = '.hover-trigger, a, button, input, textarea, [role="button"]';

export default function FlightCursor() {
  const dotRef = useRef(null);
  const outlineRef = useRef(null);
  const [isTouch, setIsTouch] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Track target and current positions for hardware-accelerated interpolation
  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const rafId = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (touch) {
      setIsTouch(true);
      document.body.style.cursor = 'auto';
      return;
    }

    const dot = dotRef.current;
    const outline = outlineRef.current;
    if (!dot || !outline) return;

    // Direct hardware-accelerated rendering loop (bypasses Next.js router blocks)
    const render = () => {
      // Smooth interpolation for the outline (lerp)
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.2;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.2;

      // Force GPU translate3d without repaints
      dot.style.transform = `translate3d(calc(${targetPos.current.x}px - 50%), calc(${targetPos.current.y}px - 50%), 0)`;
      outline.style.transform = `translate3d(calc(${currentPos.current.x}px - 50%), calc(${currentPos.current.y}px - 50%), 0)`;

      rafId.current = window.requestAnimationFrame(render);
    };
    
    rafId.current = window.requestAnimationFrame(render);

    const onMouseMove = (e) => {
      targetPos.current.x = e.clientX;
      targetPos.current.y = e.clientY;
    };

    const onOver = (e) => {
      if (e.target instanceof Element && e.target.closest(HOVER_SELECTOR)) {
        document.body.classList.add('cursor-hover');
      }
    };

    const onOut = (e) => {
      const to = e.relatedTarget;
      if (!(to instanceof Element) || !to.closest(HOVER_SELECTOR)) {
        document.body.classList.remove('cursor-hover');
      }
    };

    // Passive listeners prevent main-thread scrolling blocks during navigation
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseout', onOut, { passive: true });
    document.body.classList.add('hide-native-cursor');

    return () => {
      // Leakproof cleanup
      if (rafId.current) {
        window.cancelAnimationFrame(rafId.current);
      }
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      document.body.classList.remove('cursor-hover');
      document.body.classList.remove('hide-native-cursor');
    };
  }, [mounted]);

  if (!mounted || isTouch) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true">
        {/* Real Dynamic Gold SVG Plane */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#D4AF37" width="16px" height="16px" style={{ transform: 'rotate(45deg)' }}>
          <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L14 19v-5.5l8 2.5z" />
        </svg>
      </div>
      <div ref={outlineRef} className="cursor-outline" aria-hidden="true" />
    </>
  );
}
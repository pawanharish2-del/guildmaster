'use client';

import { useEffect, useRef } from 'react';

// ═══════════════════════════════════════════════════════════════════════════
// Interactive Ambient Particles Layer
// A faithful React port of the source `#webgl-canvas` 2D HTML5 Canvas animation.
// Gold particles drift and bounce off the viewport edges. The rAF loop, particle
// counts (30 on mobile, 80 on desktop), sizes, speeds and colours match the
// original exactly. Cleanup cancels the frame loop and detaches the resize
// listener so navigating away never leaks an animation.
// ═══════════════════════════════════════════════════════════════════════════

export default function ParticleCanvas({ id = 'webgl-canvas', className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Honour reduced-motion: render a single static frame, no animation loop.
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particlesArray = [];

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = Math.random() * 0.3 - 0.15;
        this.opacity = Math.random() * 0.4;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
        if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;
      }
      draw() {
        ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particleCount = window.innerWidth < 768 ? 30 : 80;
    for (let i = 0; i < particleCount; i++) {
      particlesArray.push(new Particle());
    }

    let rafId = 0;

    const drawStaticFrame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].draw();
      }
    };

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      rafId = requestAnimationFrame(animateParticles);
    };

    if (prefersReduced) {
      drawStaticFrame();
    } else {
      animateParticles();
    }

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (prefersReduced) drawStaticFrame();
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={canvasRef} id={id} className={className} />;
}

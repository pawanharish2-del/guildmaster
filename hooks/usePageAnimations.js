'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

// Module-level: the preloader + hero master timeline plays exactly once per full
// page load. Client-side route changes reveal content via scroll triggers instead
// (the original static site did a full reload per page; the intro is a first-load
// flourish, so replaying it on every SPA navigation would be wrong).
// flourish, so replaying it on every SPA navigation would be wrong).
let hasPlayedIntro = false;

/**
 * Ports the original inline animation engine (cursor is handled separately in
 * <FlightCursor/>). Runs document-wide, exactly like the source's
 * `DOMContentLoaded` handler, but re-initialises on every route change and tears
 * everything down cleanly to prevent hydration mismatches and leaks.
 */
export default function usePageAnimations() {
  const pathname = usePathname();
  const magneticCleanupRef = useRef([]);

  useEffect(() => {
    let ctx;
    let refreshId;
    const splitInstances = [];

    // Delay GSAP and SplitType initialization to guarantee Next.js has fully
    // hydrated the React fiber tree. Mutating the DOM (adding wrapper divs)
    // synchronously during hydration causes fatal React Node errors.
    const hydrationTimer = setTimeout(() => {
      gsap.registerPlugin(ScrollTrigger);

      const isFirstLoad = !hasPlayedIntro;
      const isHome = pathname === '/';
      const isTouch =
        'ontouchstart' in window || navigator.maxTouchPoints > 0;

      magneticCleanupRef.current = [];

      ctx = gsap.context(() => {
      // ── 4. Advanced SplitText Typography Setup ────────────────────────────
      // Wrap each line in an overflow-hidden div so char transforms mask cleanly.
      // Skip anything already split (React StrictMode re-entry / same-page rerun).
      const splitTexts = gsap.utils.toArray('.split-text');
      splitTexts.forEach((text) => {
        if (text.querySelector('.char')) return;
        const split = new SplitType(text, { types: 'lines, words, chars' });
        splitInstances.push(split);
        (split.lines || []).forEach((line) => {
          const wrapper = document.createElement('div');
          wrapper.style.overflow = 'hidden';
          line.parentNode.insertBefore(wrapper, line);
          wrapper.appendChild(line);
        });
      });

      // ── 3. Magnetic Buttons Engine ────────────────────────────────────────
      // Native listeners aren't reverted by gsap.context(), so track removers.
      const magneticBtns = gsap.utils.toArray('.magnetic-btn');
      magneticBtns.forEach((btn) => {
        if (isTouch) return;
        const onMove = (e) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.5, ease: 'power2.out' });
        };
        const onLeave = () => {
          gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
        };
        btn.addEventListener('mousemove', onMove);
        btn.addEventListener('mouseleave', onLeave);
        magneticCleanupRef.current.push(() => {
          btn.removeEventListener('mousemove', onMove);
          btn.removeEventListener('mouseleave', onLeave);
        });
      });

      // ── 5. Preloader & Initial Master Timeline (first load only) ───────────
      const firstSplit = splitTexts[0];
      const firstChars = firstSplit ? firstSplit.querySelectorAll('.char') : [];

      if (isFirstLoad) {
        hasPlayedIntro = true;
        const tl = gsap.timeline();
        tl.to('#loader-progress', { x: '0%', duration: 1.5, ease: 'power3.inOut' })
          .to('#loader-text', { scale: 1.1, opacity: 0, duration: 0.8, ease: 'power2.inOut' }, '+=0.2')
          .to('#preloader', {
            yPercent: -100,
            duration: 1.2,
            ease: 'power4.inOut',
            onComplete: () => {
              const pre = document.getElementById('preloader');
              if (pre) pre.style.pointerEvents = 'none';
            },
          });

        if (isHome) {
          // Home hero: video scale-in, headline char reveal, image + buttons + scroll cue.
          if (document.getElementById('hero-vid')) {
            tl.fromTo('#hero-vid', { scale: 1.15 }, { scale: 1, duration: 2.5, ease: 'power3.out' }, '-=1');
          }
          if (firstChars.length) {
            tl.to(firstChars, { y: '0%', stagger: 0.05, duration: 1.2, ease: 'power4.out' }, '-=1');
          }
          if (document.querySelector('.image-reveal-anim')) {
            tl.fromTo('.image-reveal-anim', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.5');
          }
          if (document.querySelector('#hero-buttons')) {
            tl.fromTo('#hero-buttons', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, '-=0.5');
          }
          if (document.querySelector('#hero-scroll')) {
            tl.to('#hero-scroll', { opacity: 1, duration: 1 }, '-=0.5');
          }
        } else {
          // Interior pages: reveal the page heading + any masked images.
          if (firstChars.length) {
            tl.to(firstChars, { y: '0%', stagger: 0.05, duration: 1.2, ease: 'power4.out' }, '-=0.5');
          }
          if (document.querySelector('.image-reveal-anim')) {
            tl.fromTo('.image-reveal-anim', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.5');
          }
        }
      } else {
        // Client-side navigation: no preloader. Reveal the incoming heading and,
        // on the home hero, the elements that ship hidden (opacity-0) in markup.
        if (firstChars.length) {
          gsap.to(firstChars, { y: '0%', stagger: 0.03, duration: 0.9, ease: 'power3.out' });
        }
        if (isHome) {
          if (document.querySelector('#hero-buttons')) {
            gsap.to('#hero-buttons', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' });
          }
          if (document.querySelector('#hero-scroll')) {
            gsap.to('#hero-scroll', { opacity: 1, duration: 0.8, ease: 'power2.out' });
          }
          if (document.querySelector('#hero-vid')) {
            gsap.fromTo('#hero-vid', { scale: 1.05 }, { scale: 1, duration: 1.2, ease: 'power3.out' });
          }
        }
      }

      // ── Router Freeze Prevention ──────────────────────────────────────────
      // Hijack link clicks in the capture phase to forcibly revert all DOM mutations
      // (like SplitType wrappers) BEFORE Next.js's router attempts to unmount them.
      // This prevents fatal DOMExceptions that lock the React concurrent thread.
      const handleNavigation = (e) => {
        const link = e.target.closest('a');
        const isLocalNav = link && link.href && link.href.startsWith(window.location.origin) && !link.hash && link.target !== '_blank';
        
        if (isLocalNav) {
          splitInstances.forEach((s) => {
            try { s.revert(); } catch (err) {}
          });
        }
      };
      document.addEventListener('click', handleNavigation, { capture: true });
      magneticCleanupRef.current.push(() => {
        document.removeEventListener('click', handleNavigation, { capture: true });
      });

      // ── 6. ScrollTrigger Micro-Interactions ───────────────────────────────

      // Image Mask Reveals (non-<img> wrappers marked image-reveal-anim).
      gsap.utils.toArray('.image-reveal-anim:not(img)').forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(100% 0 0 0)' },
          {
            clipPath: 'inset(0% 0 0 0)',
            duration: 1.5,
            ease: 'power4.inOut',
            scrollTrigger: { trigger: el.parentElement, start: 'top 85%' },
          }
        );
      });

      // Text Character Reveals on Scroll.
      // On first load, index 0 is owned by the intro timeline (skip it here).
      splitTexts.forEach((text, i) => {
        if (isFirstLoad && i === 0) return;
        const chars = text.querySelectorAll('.char');
        if (!chars.length) return;
        gsap.to(chars, {
          scrollTrigger: { trigger: text, start: 'top 85%' },
          y: '0%',
          stagger: 0.02,
          duration: 1,
          ease: 'power3.out',
        });
      });

      // Standard Text Reveals (fade up).
      gsap.utils.toArray('.text-reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          }
        );
      });

      // Specs Grid Stagger Reveal.
      gsap.utils.toArray('.spec-anim').forEach((el) => {
        const items = el.querySelectorAll('li');
        if (!items.length) return;
        gsap.fromTo(
          items,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            delay: 0.2,
            scrollTrigger: { trigger: el, start: 'top 80%' },
          }
        );
      });

      // Deep Parallax on images.
      gsap.utils.toArray('.parallax-img').forEach((img) => {
        gsap.to(img, {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: img.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
      if (document.querySelector('#parallax-bg img')) {
        gsap.to('#parallax-bg img', {
          yPercent: 30,
          ease: 'none',
          scrollTrigger: {
            trigger: '#parallax-bg',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // Horizontal Slider for Testimonials (home).
      const testimonialTrack = document.querySelector('#testimonial-track');
      if (testimonialTrack) {
        gsap.to(testimonialTrack, {
          x: () => -(testimonialTrack.scrollWidth - window.innerWidth + 100),
          ease: 'none',
          scrollTrigger: {
            trigger: testimonialTrack.parentElement,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1,
          },
        });
      }
    }); // End of gsap.context

    // Recalculate trigger positions once fonts/layout settle.
    refreshId = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    }, 10); // End of setTimeout

    return () => {
      clearTimeout(hydrationTimer);
      if (refreshId) window.cancelAnimationFrame(refreshId);
      magneticCleanupRef.current.forEach((fn) => fn());
      magneticCleanupRef.current = [];
      splitInstances.forEach((s) => {
        try {
          s.revert();
        } catch {
          /* element already removed with the unmounting page */
        }
      });
      if (ctx) ctx.revert();
    };
  }, [pathname]);
}

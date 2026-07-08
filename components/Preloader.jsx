'use client';

import { useEffect, useState } from 'react';

// ═══════════════════════════════════════════════════════════════════════════
// Preloader overlay. Renders the exact markup the master timeline animates
// (`#preloader`, `#loader-text`, `#loader-progress`). The timeline itself lives
// in usePageAnimations so it can be sequenced together with the hero reveal, as
// in the original. It is only rendered on the very first client paint; after the
// intro plays once, subsequent SPA navigations skip it entirely.
// ═══════════════════════════════════════════════════════════════════════════

// Shared with usePageAnimations' module-level flag semantics: once the app has
// mounted once, we never re-show the preloader.
let appHasMounted = false;

export default function Preloader() {
  // Always initialize to true so SSR HTML matches the first client render exactly.
  // This prevents hydration mismatches when the server process is shared across requests.
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (appHasMounted) {
      setShow(false);
    } else {
      appHasMounted = true;
    }
  }, []);

  // Safety net: if GSAP somehow fails to lift the overlay, don't trap the page.
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => {
      setShow(false);
    }, 3500); // 3.5s max wait
    return () => clearTimeout(t);
  }, [show]);

  if (!show) return null;

  return (
    <div id="preloader">
      <div className="overflow-hidden flex flex-col items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logonew.png"
          alt="Guildmaster Logo"
          className="h-12 md:h-16 w-auto opacity-100 mb-4"
          id="loader-text"
        />
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-white/10 overflow-hidden">
        <div
          className="w-full h-full bg-gold transform -translate-x-full"
          id="loader-progress"
        />
      </div>
    </div>
  );
}

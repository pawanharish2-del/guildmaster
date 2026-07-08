'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import AnimationController from '@/components/AnimationController';
import FlightCursor from '@/components/FlightCursor';
import Preloader from '@/components/Preloader';
import RouterLogger from '@/components/RouterLogger';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// ═══════════════════════════════════════════════════════════════════════════
// Global client chrome shared by every marketing route. Reproduces the source's
// document structure: the fixed cursor + preloader, the nav, then
// `#smooth-wrapper > #smooth-content` wrapping the page content and footer.
//
// The /admin area renders its own self-contained dark dashboard shell, so the
// marketing chrome (and the whole GSAP engine) is skipped there.
// ═══════════════════════════════════════════════════════════════════════════

export default function SiteChrome({ children }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const isAdmin = pathname === '/admin' || pathname.startsWith('/admin/');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (isAdmin) {
    return (
      <>
        {mounted && pathname === '/admin/login' && <FlightCursor />}
        {children}
      </>
    );
  }

  return (
    <>
      {mounted && <RouterLogger />}
      {mounted && <AnimationController />}
      {mounted && <FlightCursor />}
      <Preloader />
      <Navbar />

      <div id="smooth-wrapper">
        <div id="smooth-content">
          {children}
          <Footer />
        </div>
      </div>
    </>
  );
}

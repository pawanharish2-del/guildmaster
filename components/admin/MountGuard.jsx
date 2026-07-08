'use client';

import { useEffect, useState } from 'react';

// ═══════════════════════════════════════════════════════════════════════════
// Admin Hydration Guard
//
// Prevents React from throwing hydration mismatches (or reading undefined
// client hooks) if the server-rendered tree differs slightly from the client
// on hard refresh. Shows a clean, dark-mode pulse until the browser takes over.
// ═══════════════════════════════════════════════════════════════════════════

export default function MountGuard({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bgBase text-gold/40">
        <i className="fa-solid fa-plane animate-pulse text-2xl -rotate-90"></i>
      </div>
    );
  }

  return <>{children}</>;
}

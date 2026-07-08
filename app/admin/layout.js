// ═══════════════════════════════════════════════════════════════════════════
// Admin section layout.
//
// The marketing chrome (custom flight cursor, preloader, particle canvas, GSAP)
// is intentionally NOT rendered under /admin — SiteChrome short-circuits there.
// That leaves the global `body { cursor: none }` with nothing to draw, so the
// `.admin-shell` wrapper restores a native pointer (rules live in globals.css).
//
// This layout wraps BOTH /admin (the dashboard) and /admin/login. It is also a
// good place to keep the whole console out of search indexes.
// ═══════════════════════════════════════════════════════════════════════════

import MountGuard from '@/components/admin/MountGuard';

export const metadata = {
  title: 'Console',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function AdminLayout({ children }) {
  return (
    <div className="admin-shell min-h-screen bg-bgBase text-white antialiased">
      <MountGuard>
        {children}
      </MountGuard>
    </div>
  );
}

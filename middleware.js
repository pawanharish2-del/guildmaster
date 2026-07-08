import { NextResponse } from 'next/server';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/auth';

// ═══════════════════════════════════════════════════════════════════════════
// Admin route protection.
//
// Runs on the Edge before the request reaches the /admin dashboard. Verifies the
// signed session JWT from the httpOnly cookie. Unauthenticated visitors are
// redirected to /admin/login (with a `next` param so they return to where they
// were headed). Already-authenticated visitors hitting /admin/login are bounced
// straight to the dashboard.
// ═══════════════════════════════════════════════════════════════════════════

export async function middleware(request) {
  const { pathname, search } = request.nextUrl;

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = await verifySessionToken(token);
  const isAuthed = Boolean(session);

  const isLoginRoute = pathname === '/admin/login';

  // Signed-in users never need to see the login screen.
  if (isLoginRoute) {
    if (isAuthed) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    return NextResponse.next();
  }

  // Everything else under /admin requires a valid session.
  if (!isAuthed) {
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('next', pathname + (search || ''));
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Guard the dashboard and any nested admin pages. API mutations are guarded
  // independently inside their route handlers (Node runtime).
  matcher: ['/admin/:path*'],
};

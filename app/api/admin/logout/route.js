import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SESSION_COOKIE, sessionCookieOptions } from '@/lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// POST /api/admin/logout — clear the session cookie.
export async function POST() {
  const store = await cookies();
  store.set(SESSION_COOKIE, '', sessionCookieOptions(0));
  return NextResponse.json({ ok: true });
}

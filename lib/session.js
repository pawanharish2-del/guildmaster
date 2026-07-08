import { cookies } from 'next/headers';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/auth';

// Server-only session helpers for Node route handlers (uses next/headers, so it
// must NOT be imported by Edge middleware — that path uses lib/auth directly).

export async function getAdminSession() {
  const store = await cookies(); // async in Next 15
  const token = store.get(SESSION_COOKIE)?.value;
  return verifySessionToken(token);
}

export async function isAdminRequest() {
  return Boolean(await getAdminSession());
}

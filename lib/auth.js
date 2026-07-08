import { SignJWT, jwtVerify } from 'jose';

// ═══════════════════════════════════════════════════════════════════════════
// Lightweight cookie-based admin session.
//
// A signed JWT (HS256) is stored in an httpOnly cookie. `jose` is used instead
// of Node's `crypto` so the exact same verification runs in Edge middleware and
// in Node route handlers. The password itself is NEVER stored in the cookie —
// only a short-lived signed token proving a successful sign-in.
// ═══════════════════════════════════════════════════════════════════════════

export const SESSION_COOKIE = 'gm_session';
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

function getSecretKey() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error(
      'Missing AUTH_SECRET. Add it to your .env.local (see .env.example).'
    );
  }
  return new TextEncoder().encode(secret);
}

/**
 * Create a signed session token for an authenticated admin.
 * @param {Record<string, unknown>} [payload]
 * @returns {Promise<string>}
 */
export async function createSessionToken(payload = { role: 'admin' }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setSubject('guildmaster-admin')
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(getSecretKey());
}

/**
 * Verify a session token. Returns the decoded payload, or null when the token
 * is missing / invalid / expired.
 * @param {string | undefined | null} token
 */
export async function verifySessionToken(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecretKey(), {
      algorithms: ['HS256'],
    });
    return payload;
  } catch {
    return null;
  }
}

/**
 * Cookie attributes shared by the login (set) and logout (clear) handlers.
 */
export function sessionCookieOptions(maxAge = SESSION_TTL_SECONDS) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge,
  };
}



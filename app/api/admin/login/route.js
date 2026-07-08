import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  SESSION_COOKIE,
  createSessionToken,
  sessionCookieOptions,
} from '@/lib/auth';
import connectMongo from '@/lib/mongodb';
import mongoose from 'mongoose';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);

// POST /api/admin/login — verify the username & password and set a signed session cookie.
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const username = body?.username;
  const password = body?.password;
  if (!username || typeof username !== 'string' || !password || typeof password !== 'string') {
    return NextResponse.json({ error: 'Username and password are required.' }, { status: 400 });
  }

  try {
    await connectMongo();
    const admin = await Admin.findOne({ username });
    
    // Safe string comparison for explicit DB password storage
    if (!admin || admin.password !== password) {
      return NextResponse.json({ error: 'Incorrect username or password.' }, { status: 401 });
    }
  } catch (err) {
    return NextResponse.json({ error: 'Database error.' }, { status: 500 });
  }

  const token = await createSessionToken({ role: 'admin', username });
  const store = await cookies(); // async in Next 15
  store.set(SESSION_COOKIE, token, sessionCookieOptions());

  return NextResponse.json({ ok: true });
}

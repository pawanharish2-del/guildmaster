import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST(request) {
  try {
    // 1. Ensure caller is authenticated via JWT session token
    const store = await cookies();
    const token = store.get(SESSION_COOKIE)?.value;
    const payload = await verifySessionToken(token);
    
    if (!payload || payload.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized. Admin session required.' }, { status: 401 });
    }

    // 2. Extract image file from multipart form-data
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No file found in payload.' }, { status: 400 });
    }

    // 3. Upload directly to Vercel Blob Storage
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${Date.now()}-${sanitizedName}`;

    const blob = await put(filename, file, {
      access: 'public',
    });

    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error('Upload failed:', error);
    return NextResponse.json({ error: 'Image upload failed on the server.' }, { status: 500 });
  }
}

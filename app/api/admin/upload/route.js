import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

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

    const isDev = process.env.NODE_ENV === 'development';
    const hasBlobToken = !!process.env.BLOB_READ_WRITE_TOKEN;

    // 3. Hybrid Environment Detection
    if (isDev || !hasBlobToken) {
      // Local Development Mode
      const buffer = Buffer.from(await file.arrayBuffer());
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const filename = `${Date.now()}-${sanitizedName}`;
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      
      try {
        await mkdir(uploadDir, { recursive: true });
      } catch (err) {
        // Ignore if directory already exists
      }
      
      await writeFile(path.join(uploadDir, filename), buffer);
      
      return NextResponse.json({ url: `/uploads/${filename}` });
    } else {
      // Production Mode (Vercel Blob Storage)
      const blob = await put(file.name, file, {
        access: 'public',
      });
      return NextResponse.json({ url: blob.url });
    }
  } catch (error) {
    console.error('Upload failed:', error);
    return NextResponse.json({ error: 'Image upload failed on the server.' }, { status: 500 });
  }
}

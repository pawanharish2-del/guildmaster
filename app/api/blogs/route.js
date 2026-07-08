import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { isAdminRequest } from '@/lib/session';
import { slugify } from '@/lib/slug';

// Mongoose requires the Node.js runtime (not Edge). Blogs are dynamic content.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function serialize(doc) {
  return {
    id: String(doc._id),
    title: doc.title,
    slug: doc.slug,
    content: doc.content,
    summary: doc.summary,
    seoKeyword: doc.seoKeyword || '',
    metaDescription: doc.metaDescription || '',
    aeoQuestion: doc.aeoQuestion || '',
    geoEntities: doc.geoEntities || [],
    geoCitations: doc.geoCitations || [],
    coverImage: doc.coverImage || '',
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

// ── GET /api/blogs ── list all posts (public) ────────────────────────────────
export async function GET() {
  try {
    await dbConnect();
    const docs = await Blog.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ blogs: docs.map(serialize) });
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to load posts.', detail: err.message },
      { status: 500 }
    );
  }
}

// ── POST /api/blogs ── create a post (admin only) ────────────────────────────
export async function POST(request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const title = (body.title || '').trim();
  const content = (body.content || '').trim();
  const summary = (body.summary || '').trim();
  const coverImage = (body.coverImage || '').trim();
  const seoKeyword = (body.seoKeyword || '').trim();
  const metaDescription = (body.metaDescription || '').trim();
  const aeoQuestion = (body.aeoQuestion || '').trim();
  const geoEntities = Array.isArray(body.geoEntities) ? body.geoEntities : [];
  const geoCitations = Array.isArray(body.geoCitations) ? body.geoCitations : [];
  const slug = slugify(body.slug || title);

  if (!title || !content || !summary) {
    return NextResponse.json(
      { error: 'title, content and summary are required.' },
      { status: 400 }
    );
  }
  if (!slug) {
    return NextResponse.json(
      { error: 'Could not derive a valid slug from the title.' },
      { status: 400 }
    );
  }

  try {
    await dbConnect();
    const created = await Blog.create({ 
      title, slug, content, summary, coverImage,
      seoKeyword, metaDescription, aeoQuestion, geoEntities, geoCitations 
    });
    return NextResponse.json({ blog: serialize(created) }, { status: 201 });
  } catch (err) {
    // Duplicate slug (unique index) → 409 Conflict.
    if (err && err.code === 11000) {
      return NextResponse.json(
        { error: `A post with the slug "${slug}" already exists.` },
        { status: 409 }
      );
    }
    if (err.name === 'ValidationError') {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: 'Failed to create post.', detail: err.message },
      { status: 500 }
    );
  }
}

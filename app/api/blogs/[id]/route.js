import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { isAdminRequest } from '@/lib/session';
import { slugify } from '@/lib/slug';

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

// ── GET /api/blogs/:id ── fetch one post (public) ────────────────────────────
export async function GET(request, { params }) {
  const { id } = await params; // Next 15: params is async
  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json({ error: 'Invalid post id.' }, { status: 400 });
  }
  try {
    await dbConnect();
    const doc = await Blog.findById(id).lean();
    if (!doc) {
      return NextResponse.json({ error: 'Post not found.' }, { status: 404 });
    }
    return NextResponse.json({ blog: serialize(doc) });
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to load post.', detail: err.message },
      { status: 500 }
    );
  }
}

// ── PUT /api/blogs/:id ── update a post (admin only) ─────────────────────────
export async function PUT(request, { params }) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }
  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json({ error: 'Invalid post id.' }, { status: 400 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const update = {};
  if (typeof body.title === 'string') update.title = body.title.trim();
  if (typeof body.content === 'string') update.content = body.content.trim();
  if (typeof body.summary === 'string') update.summary = body.summary.trim();
  if (typeof body.coverImage === 'string') update.coverImage = body.coverImage.trim();
  if (typeof body.seoKeyword === 'string') update.seoKeyword = body.seoKeyword.trim();
  if (typeof body.metaDescription === 'string') update.metaDescription = body.metaDescription.trim();
  if (typeof body.aeoQuestion === 'string') update.aeoQuestion = body.aeoQuestion.trim();
  if (Array.isArray(body.geoEntities)) update.geoEntities = body.geoEntities;
  if (Array.isArray(body.geoCitations)) update.geoCitations = body.geoCitations;
  if (typeof body.slug === 'string' && body.slug.trim()) {
    update.slug = slugify(body.slug);
  } else if (typeof body.title === 'string' && body.title.trim() && body.regenerateSlug) {
    update.slug = slugify(body.title);
  }

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: 'No valid fields to update.' }, { status: 400 });
  }

  try {
    await dbConnect();
    const doc = await Blog.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    }).lean();
    if (!doc) {
      return NextResponse.json({ error: 'Post not found.' }, { status: 404 });
    }
    return NextResponse.json({ blog: serialize(doc) });
  } catch (err) {
    if (err && err.code === 11000) {
      return NextResponse.json(
        { error: 'Another post already uses that slug.' },
        { status: 409 }
      );
    }
    if (err.name === 'ValidationError') {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: 'Failed to update post.', detail: err.message },
      { status: 500 }
    );
  }
}

// ── DELETE /api/blogs/:id ── remove a post (admin only) ──────────────────────
export async function DELETE(request, { params }) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }
  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json({ error: 'Invalid post id.' }, { status: 400 });
  }
  try {
    await dbConnect();
    const doc = await Blog.findByIdAndDelete(id).lean();
    if (!doc) {
      return NextResponse.json({ error: 'Post not found.' }, { status: 404 });
    }
    return NextResponse.json({ ok: true, id });
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to delete post.', detail: err.message },
      { status: 500 }
    );
  }
}

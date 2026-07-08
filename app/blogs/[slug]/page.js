import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getBlogBySlug } from '@/lib/blogs';
import { buildMetadata, articleSchema, jsonLd, SITE_URL } from '@/lib/seo';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function formatDate(iso) {
  if (!iso) return '';
  try {
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(iso));
  } catch {
    return '';
  }
}

// Per-post metadata (title, description = AEO summary, canonical, OG article).
export async function generateMetadata({ params }) {
  const { slug } = await params; // Next 15: async params
  let post = null;
  try {
    post = await getBlogBySlug(slug);
  } catch {
    post = null;
  }
  if (!post) {
    return buildMetadata({ title: 'Article Not Found', path: `/blogs/${slug}` });
  }
  return buildMetadata({
    title: post.title,
    description: post.summary,
    path: `/blogs/${post.slug}`,
    image: post.coverImage || undefined,
    type: 'article',
  });
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;

  let post = null;
  try {
    post = await getBlogBySlug(slug);
  } catch {
    post = null;
  }
  if (!post) notFound();

  const schema = articleSchema({
    title: post.title,
    description: post.summary,
    slug: post.slug,
    image: post.coverImage,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />

      {/* ARTICLE HERO */}
      <section className="relative min-h-[60vh] w-full flex items-end overflow-hidden border-b border-white/5 bg-bgSec">
        <div className="absolute inset-0 bg-luxury-gradient z-20" />
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            className="object-cover z-10 opacity-40"
          />
        ) : (
          <Image
            src="/images/afterheroimage.jpg"
            alt="Guildmaster"
            fill
            priority
            className="object-cover z-10 opacity-30 mix-blend-screen"
          />
        )}
        <div className="relative z-20 max-w-[900px] mx-auto px-6 md:px-12 pb-16 pt-40 w-full">
          <Link
            href="/blogs"
            className="hover-trigger text-[10px] uppercase tracking-[0.3em] text-gold hover:text-goldLight transition-colors inline-block mb-6"
          >
            <i className="fa-solid fa-arrow-left mr-2" /> Back to Journal
          </Link>
          <span className="block text-[10px] text-white/60 uppercase tracking-widest mb-4">
            {formatDate(post.createdAt)}
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-white leading-tight split-text">
            {post.title}
          </h1>
        </div>
      </section>

      {/* SUMMARY (AEO snippet) */}
      <section className="pt-16 bg-bgBase relative z-30">
        <div className="max-w-[820px] mx-auto px-6 md:px-12">
          <p className="text-gold/90 font-serif italic text-xl md:text-2xl leading-relaxed border-l-2 border-gold pl-6 text-reveal">
            {post.summary}
          </p>
        </div>
      </section>

      {/* FEATURED IMAGE */}
      {post.coverImage && (
        <section className="py-8 bg-bgBase relative z-30">
          <div className="max-w-[820px] mx-auto px-6 md:px-12 image-reveal-anim">
            <Image
              src={post.coverImage}
              alt={post.title}
              width={1200}
              height={630}
              className="w-full max-h-[500px] object-cover rounded-xl shadow-2xl border border-white/5"
            />
          </div>
        </section>
      )}

      {/* ARTICLE BODY */}
      <section className="pb-16 pt-8 bg-bgBase relative z-30">
        <article
          className="article-body max-w-[820px] mx-auto px-6 md:px-12 text-white/80 text-lg leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <div className="max-w-[820px] mx-auto px-6 md:px-12 mt-16 pt-10 border-t border-white/10 flex items-center justify-between">
          <Link
            href="/blogs"
            className="hover-trigger magnetic-btn px-8 py-4 rounded-full border border-gold/50 text-xs uppercase tracking-[0.2em] transition-colors"
          >
            All Articles
          </Link>
          <a
            href={`${SITE_URL}/blogs/${post.slug}`}
            className="hover-trigger text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-gold transition-colors"
          >
            Share this dispatch
          </a>
        </div>
      </section>
    </>
  );
}

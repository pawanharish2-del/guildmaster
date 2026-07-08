'use client';

import { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import BlogForm from '@/components/admin/BlogForm';

// ═══════════════════════════════════════════════════════════════════════════
// Guildmaster Console — Journal CMS
//
// Receives the initial list of posts from the Server Component (no client
// fetch on first paint) and then owns all mutations through the protected
// /api/blogs endpoints:
//   • create  → POST   /api/blogs
//   • edit    → PUT    /api/blogs/:id
//   • delete  → DELETE /api/blogs/:id
//   • logout  → POST   /api/admin/logout  → back to /admin/login
//
// The list is kept in local state and reconciled after each successful call so
// the UI stays instant; `router.refresh()` re-syncs the Server Component tree.
// Styling stays inside the established brand system (dark base, gold accents,
// Playfair display, glass panels) even though the console isn't in the original
// static site — it should feel like the same aircraft, cockpit side.
// ═══════════════════════════════════════════════════════════════════════════

function formatDate(iso) {
  if (!iso) return '';
  try {
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(iso));
  } catch {
    return '';
  }
}

// 'idle' = list only · 'new' = create form open · object = editing that post
export default function AdminDashboard({ initialBlogs = [] }) {
  const router = useRouter();

  const [posts, setPosts] = useState(initialBlogs);
  const [mode, setMode] = useState('idle');
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [notice, setNotice] = useState(null); // { type: 'ok'|'err', text }
  const [loggingOut, setLoggingOut] = useState(false);

  const editingPost = typeof mode === 'object' && mode !== null ? mode : null;
  const formOpen = mode === 'new' || editingPost;

  const flash = useCallback((type, text) => {
    setNotice({ type, text });
    if (type === 'ok') {
      window.clearTimeout(flash._t);
      flash._t = window.setTimeout(() => setNotice(null), 4000);
    }
  }, []);

  const sorted = useMemo(
    () =>
      [...posts].sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      ),
    [posts]
  );

  // ── create / update ────────────────────────────────────────────────────────
  const handleSubmit = useCallback(
    async (payload) => {
      setSubmitting(true);
      setNotice(null);
      const isEdit = Boolean(editingPost);
      const url = isEdit ? `/api/blogs/${editingPost.id}` : '/api/blogs';
      const method = isEdit ? 'PUT' : 'POST';

      try {
        const res = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          setSubmitting(false);
          if (res.status === 401) {
            // Session expired mid-session — send them back to sign in.
            router.replace('/admin/login?next=/admin');
            router.refresh();
            return { ok: false, error: 'Session expired. Please sign in again.' };
          }
          return { ok: false, error: data.error || 'Request failed.' };
        }

        const saved = data.blog;
        setPosts((prev) =>
          isEdit
            ? prev.map((p) => (p.id === saved.id ? saved : p))
            : [saved, ...prev]
        );
        setMode('idle');
        setSubmitting(false);
        flash('ok', isEdit ? 'Dispatch updated.' : 'Dispatch published.');
        router.refresh();
        return { ok: true };
      } catch {
        setSubmitting(false);
        return { ok: false, error: 'Network error. Please try again.' };
      }
    },
    [editingPost, flash, router]
  );

  // ── delete ──────────────────────────────────────────────────────────────────
  const handleDelete = useCallback(
    async (post) => {
      const confirmed = window.confirm(
        `Delete “${post.title}”? This cannot be undone.`
      );
      if (!confirmed) return;

      setDeletingId(post.id);
      setNotice(null);
      try {
        const res = await fetch(`/api/blogs/${post.id}`, { method: 'DELETE' });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          if (res.status === 401) {
            router.replace('/admin/login?next=/admin');
            router.refresh();
            return;
          }
          flash('err', data.error || 'Failed to delete post.');
          setDeletingId(null);
          return;
        }
        setPosts((prev) => prev.filter((p) => p.id !== post.id));
        // If we were editing the post we just deleted, close the editor.
        if (editingPost && editingPost.id === post.id) setMode('idle');
        flash('ok', 'Dispatch deleted.');
        router.refresh();
      } catch {
        flash('err', 'Network error while deleting.');
      } finally {
        setDeletingId(null);
      }
    },
    [editingPost, flash, router]
  );

  // ── logout ──────────────────────────────────────────────────────────────────
  const handleLogout = useCallback(async () => {
    setLoggingOut(true);
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch {
      /* even if the call fails, push to login — the cookie clear is best-effort */
    }
    router.replace('/admin/login');
    router.refresh();
  }, [router]);

  return (
    <div className="min-h-screen">
      {/* ── Top bar ─────────────────────────────────────────────────────────── */}
      <header className="border-b border-white/5 bg-bgSec/60 backdrop-blur sticky top-0 z-30">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-gold text-[10px] uppercase tracking-[0.4em]">
              Guildmaster
            </span>
            <span className="text-white/20">/</span>
            <span className="font-serif text-xl text-white">Console</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/blogs"
              target="_blank"
              rel="noreferrer"
              className="text-white/50 hover:text-gold text-[11px] uppercase tracking-[0.2em] transition-colors hidden sm:inline"
            >
              View Journal <i className="fa-solid fa-arrow-up-right-from-square ml-1 text-[9px]" />
            </a>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="border border-white/10 hover:border-gold/60 text-white/70 hover:text-white text-[11px] uppercase tracking-[0.2em] px-5 py-2.5 rounded-sm transition-colors disabled:opacity-40"
            >
              {loggingOut ? 'Signing out…' : 'Sign out'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-6 md:px-10 py-12">
        {/* ── Heading + primary action ──────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div>
            <h1 className="font-serif text-4xl text-white mb-2">The Journal</h1>
            <p className="text-muted text-sm">
              {posts.length} {posts.length === 1 ? 'dispatch' : 'dispatches'} published.
            </p>
          </div>
          {!formOpen ? (
            <button
              onClick={() => {
                setMode('new');
                setNotice(null);
              }}
              className="self-start sm:self-auto bg-gold-gradient text-black text-xs uppercase tracking-[0.25em] font-medium px-7 py-4 rounded-sm transition-opacity hover:opacity-90"
            >
              <i className="fa-solid fa-plus mr-2" /> New Dispatch
            </button>
          ) : null}
        </div>

        {/* ── Flash notice ──────────────────────────────────────────────────── */}
        {notice ? (
          <div
            className={`mb-8 rounded-sm px-5 py-4 text-sm border ${
              notice.type === 'ok'
                ? 'bg-gold/10 border-gold/30 text-goldLight'
                : 'bg-red-500/10 border-red-500/25 text-red-200'
            }`}
          >
            {notice.text}
          </div>
        ) : null}

        {/* ── Editor ────────────────────────────────────────────────────────── */}
        {formOpen ? (
          <div className="mb-12">
            <BlogForm
              initial={editingPost}
              onSubmit={handleSubmit}
              onCancel={() => {
                setMode('idle');
                setNotice(null);
              }}
              submitting={submitting}
            />
          </div>
        ) : null}

        {/* ── List ──────────────────────────────────────────────────────────── */}
        {sorted.length === 0 ? (
          <div className="glass rounded-sm p-16 text-center border-l-4 border-gold">
            <i className="fa-solid fa-plane text-gold/30 text-4xl -rotate-90 mb-6 block" />
            <h3 className="font-serif text-2xl text-white mb-3">No dispatches yet</h3>
            <p className="text-muted text-sm max-w-md mx-auto">
              Publish the first article to bring the Journal to life. It will appear
              instantly on the public listing.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {sorted.map((post) => {
              const isBusy = deletingId === post.id;
              const isBeingEdited = editingPost && editingPost.id === post.id;
              return (
                <article
                  key={post.id}
                  className={`glass rounded-sm border-l-2 transition-colors ${
                    isBeingEdited ? 'border-gold' : 'border-gold/20 hover:border-gold/50'
                  }`}
                >
                  <div className="p-6 md:p-7 flex flex-col md:flex-row md:items-center gap-5">
                    {/* thumb */}
                    <div className="w-full md:w-40 shrink-0 aspect-[16/9] rounded-sm overflow-hidden bg-black/40 border border-white/5">
                      {post.coverImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <i className="fa-solid fa-plane text-gold/25 text-xl -rotate-90" />
                        </div>
                      )}
                    </div>

                    {/* meta */}
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center gap-3 mb-1.5">
                        <span className="text-[10px] text-gold uppercase tracking-[0.2em]">
                          {formatDate(post.createdAt)}
                        </span>
                        <span className="text-white/20 text-[10px]">/blogs/{post.slug}</span>
                      </div>
                      <h3 className="font-serif text-xl text-white truncate">{post.title}</h3>
                      <p className="text-muted text-sm mt-1.5 line-clamp-2">{post.summary}</p>
                    </div>

                    {/* actions */}
                    <div className="flex md:flex-col lg:flex-row items-center gap-2 shrink-0">
                      <a
                        href={`/blogs/${post.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-center border border-white/10 hover:border-gold/60 text-white/70 hover:text-white text-[10px] uppercase tracking-[0.2em] px-4 py-2.5 rounded-sm transition-colors"
                        title="View"
                      >
                        View
                      </a>
                      <button
                        onClick={() => {
                          setMode(post);
                          setNotice(null);
                          if (typeof window !== 'undefined') {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }
                        }}
                        disabled={isBusy}
                        className="border border-gold/40 hover:border-gold text-goldLight text-[10px] uppercase tracking-[0.2em] px-4 py-2.5 rounded-sm transition-colors disabled:opacity-40"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(post)}
                        disabled={isBusy}
                        className="border border-red-500/25 hover:border-red-400/60 text-red-300/80 hover:text-red-200 text-[10px] uppercase tracking-[0.2em] px-4 py-2.5 rounded-sm transition-colors disabled:opacity-40"
                      >
                        {isBusy ? '…' : 'Delete'}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

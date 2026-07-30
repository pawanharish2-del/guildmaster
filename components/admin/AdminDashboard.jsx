'use client';

import { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import BlogForm from '@/components/admin/BlogForm';
import HomepageForm from '@/components/admin/HomepageForm';

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
  const [activeTab, setActiveTab] = useState('journal'); // 'journal' or 'homepage'

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
    <div className="flex h-screen bg-[#0a0a0a] text-white overflow-hidden font-sans">
      {/* ── Sidebar ─────────────────────────────────────────────────────────── */}
      <aside className="w-64 bg-[#111111] border-r border-white/5 flex flex-col justify-between shrink-0">
        <div>
          <div className="h-20 flex items-center px-8 border-b border-white/5">
            <span className="text-gold text-[10px] uppercase tracking-[0.4em] font-semibold">
              Guildmaster
            </span>
          </div>
          <nav className="p-4 space-y-2 mt-4">
            <button 
              onClick={() => { setActiveTab('journal'); setMode('idle'); setNotice(null); }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-[11px] uppercase tracking-[0.2em] rounded-sm transition-all ${
                activeTab === 'journal' ? 'bg-gold/10 text-gold font-medium border border-gold/20' : 'text-white/50 hover:bg-white/5 hover:text-white border border-transparent'
              }`}
            >
              <i className="fa-solid fa-book-open w-4 text-center" /> Journal
            </button>
            <button 
              onClick={() => { setActiveTab('homepage'); setMode('idle'); setNotice(null); }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-[11px] uppercase tracking-[0.2em] rounded-sm transition-all ${
                activeTab === 'homepage' ? 'bg-gold/10 text-gold font-medium border border-gold/20' : 'text-white/50 hover:bg-white/5 hover:text-white border border-transparent'
              }`}
            >
              <i className="fa-solid fa-home w-4 text-center" /> Homepage
            </button>
          </nav>
        </div>
        
        <div className="p-4 border-t border-white/5">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center gap-3 px-4 py-3 text-[11px] uppercase tracking-[0.2em] rounded-sm text-white/50 hover:bg-white/5 hover:text-white transition-all mb-2 border border-transparent"
          >
            <i className="fa-solid fa-arrow-up-right-from-square w-4 text-center" /> View Site
          </a>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full flex items-center gap-3 px-4 py-3 text-[11px] uppercase tracking-[0.2em] rounded-sm text-white/50 hover:bg-red-500/10 hover:text-red-400 transition-all disabled:opacity-40 border border-transparent"
          >
            <i className="fa-solid fa-sign-out-alt w-4 text-center" /> {loggingOut ? 'Signing out…' : 'Sign out'}
          </button>
        </div>
      </aside>

      {/* ── Main Content Area ──────────────────────────────────────────────── */}
      <main className="flex-1 overflow-y-auto bg-[#0a0a0a] relative">
        <div className="max-w-[1200px] mx-auto px-8 lg:px-12 py-12">
          
          {/* ── Heading + primary action ──────────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 pb-8 border-b border-white/5">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl text-white mb-2">
                 {activeTab === 'journal' ? 'The Journal' : 'Homepage Configuration'}
              </h1>
              <p className="text-white/40 text-sm">
                {activeTab === 'journal' ? `${posts.length} ${posts.length === 1 ? 'dispatch' : 'dispatches'} published.` : 'Manage the content and images of your static homepage.'}
              </p>
            </div>
            {activeTab === 'journal' && !formOpen ? (
              <button
                onClick={() => {
                  setMode('new');
                  setNotice(null);
                }}
                className="self-start sm:self-auto bg-gold-gradient text-black text-[10px] uppercase tracking-[0.25em] font-medium px-6 py-3.5 rounded-sm transition-all hover:opacity-90 shadow-lg shadow-gold/10 hover:shadow-gold/20"
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

          {/* ── Content ───────────────────────────────────────────────────────── */}
          {activeTab === 'homepage' ? (
            <HomepageForm />
          ) : (
            <>
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
            <div className="bg-[#111] border border-white/5 rounded-sm p-16 text-center shadow-2xl">
              <i className="fa-solid fa-plane text-gold/30 text-4xl -rotate-90 mb-6 block" />
              <h3 className="font-serif text-2xl text-white mb-3">No dispatches yet</h3>
              <p className="text-white/40 text-sm max-w-md mx-auto">
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
                    className={`bg-[#111] rounded-sm transition-all duration-300 shadow-lg border-l-2 ${
                      isBeingEdited ? 'border-gold shadow-gold/5 bg-[#141414]' : 'border-gold/20 hover:border-gold/50 hover:bg-[#141414]'
                    }`}
                  >
                    <div className="p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-6">
                      {/* thumb */}
                      <div className="w-full md:w-40 shrink-0 aspect-[16/9] rounded-sm overflow-hidden bg-black/40 border border-white/5">
                        {post.coverImage ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <i className="fa-solid fa-plane text-gold/25 text-xl -rotate-90" />
                          </div>
                        )}
                      </div>

                      {/* meta */}
                      <div className="flex-grow min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-[10px] text-gold uppercase tracking-[0.2em] font-medium">
                            {formatDate(post.createdAt)}
                          </span>
                          <span className="text-white/20 text-[10px]">/blogs/{post.slug}</span>
                        </div>
                        <h3 className="font-serif text-xl text-white/90 truncate">{post.title}</h3>
                        <p className="text-white/40 text-sm mt-1.5 line-clamp-2 leading-relaxed">{post.summary}</p>
                      </div>

                      {/* actions */}
                      <div className="flex md:flex-col lg:flex-row items-center gap-2 shrink-0">
                        <a
                          href={`/blogs/${post.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-center border border-white/10 hover:border-gold/50 text-white/50 hover:text-white text-[10px] uppercase tracking-[0.2em] px-4 py-2.5 rounded-sm transition-all hover:bg-white/5"
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
                          className="border border-gold/30 hover:border-gold text-gold/80 hover:text-gold text-[10px] uppercase tracking-[0.2em] px-4 py-2.5 rounded-sm transition-all hover:bg-gold/5 disabled:opacity-40"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(post)}
                          disabled={isBusy}
                          className="border border-red-500/20 hover:border-red-500/50 text-red-400/70 hover:text-red-300 text-[10px] uppercase tracking-[0.2em] px-4 py-2.5 rounded-sm transition-all hover:bg-red-500/5 disabled:opacity-40"
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
            </>
          )}
        </div>
      </main>
    </div>
  );
}

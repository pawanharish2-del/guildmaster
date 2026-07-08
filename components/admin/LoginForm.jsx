'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// ═══════════════════════════════════════════════════════════════════════════
// Password gate for the admin console. Posts to /api/admin/login which sets the
// signed httpOnly session cookie; middleware then lets the dashboard through.
// On success we honour a `?next=` return path (set by middleware) and fall back
// to /admin. `router.refresh()` re-runs the Server Component tree so the newly
// authenticated request is reflected immediately.
// ═══════════════════════════════════════════════════════════════════════════

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextParam = searchParams.get('next') || '/admin';
  // Only allow internal redirects (defend against open-redirect via ?next=).
  const nextPath = nextParam.startsWith('/') && !nextParam.startsWith('//')
    ? nextParam
    : '/admin';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (submitting) return;
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || 'Sign-in failed. Please try again.');
        setSubmitting(false);
        return;
      }
      router.replace(nextPath);
      router.refresh();
    } catch {
      setError('Network error. Please try again.');
      setSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-10">
        <span className="text-gold text-[10px] uppercase tracking-[0.4em] block mb-4">
          Guildmaster
        </span>
        <h1 className="font-serif text-4xl text-white mb-2">Console</h1>
        <p className="text-muted text-sm">Sign in to manage the Journal.</p>
      </div>

      {!mounted ? (
        <div className="glass rounded-sm p-8 border-t-2 border-gold/30 flex items-center justify-center min-h-[340px]">
          <i className="fa-solid fa-plane animate-pulse text-gold/40 text-3xl -rotate-90"></i>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="glass rounded-sm p-8 border-t-2 border-gold/30">
          <label
            htmlFor="admin-username"
          className="block text-[10px] uppercase tracking-[0.25em] text-white/60 mb-3"
        >
          Username
        </label>
        <input
          id="admin-username"
          type="text"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoFocus
          className="w-full bg-black/40 border border-white/10 focus:border-gold/60 outline-none text-white text-sm px-4 py-3 mb-6 rounded-sm transition-colors placeholder-white/25"
          placeholder="Enter admin username"
        />

        <label
          htmlFor="admin-password"
          className="block text-[10px] uppercase tracking-[0.25em] text-white/60 mb-3"
        >
          Password
        </label>
        <input
          id="admin-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-black/40 border border-white/10 focus:border-gold/60 outline-none text-white text-sm px-4 py-3 rounded-sm transition-colors placeholder-white/25"
          placeholder="Enter admin password"
        />

        {error ? (
          <p className="mt-4 text-sm text-red-300/90 bg-red-500/10 border border-red-500/20 rounded-sm px-4 py-3">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={submitting || !username || !password}
          className="mt-6 w-full bg-gold-gradient text-black text-xs uppercase tracking-[0.25em] font-medium py-4 rounded-sm transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {submitting ? 'Signing in…' : 'Enter Console'}
        </button>
        </form>
      )}

      <p className="text-center text-white/30 text-[11px] mt-8 tracking-wide">
        Authorised personnel only.
      </p>
    </div>
  );
}

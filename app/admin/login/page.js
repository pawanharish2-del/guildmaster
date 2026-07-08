import { Suspense } from 'react';
import LoginForm from '@/components/admin/LoginForm';

// Reads the session cookie indirectly (via middleware) and uses useSearchParams
// in the client form, so it must stay out of static generation.
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Sign in',
};

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-20 bg-bgBase">
      {/* faint gold vignette */}
      <div
        className="pointer-events-none fixed inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(60% 60% at 50% 30%, rgba(212,175,55,0.06) 0%, rgba(5,5,5,0) 70%)',
        }}
      />
      <Suspense fallback={<div className="text-muted text-sm">Loading…</div>}>
        <LoginForm />
      </Suspense>
    </main>
  );
}

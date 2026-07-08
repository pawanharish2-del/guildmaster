import AdminDashboard from '@/components/admin/AdminDashboard';
import { getAllBlogs } from '@/lib/blogs';

// Access is gated by middleware.js (valid session cookie required). Mongoose +
// live data, so keep it on the Node runtime and out of static generation.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Journal Console',
};

export default async function AdminPage() {
  let blogs = [];
  try {
    blogs = await getAllBlogs();
  } catch {
    // Surface an empty console rather than a crash if the DB is unreachable;
    // the dashboard still lets the admin retry actions once it recovers.
    blogs = [];
  }

  return <AdminDashboard initialBlogs={blogs} />;
}

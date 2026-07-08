import Link from 'next/link';
import { getAllBlogs } from '@/lib/blogs';
import { buildMetadata } from '@/lib/seo';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const metadata = buildMetadata({
  title: 'Journal',
  description:
    'The Guildmaster Journal — dispatches on light aircraft engineering, design, avionics and the craft of flight from the makers of the Joey and Boon.',
  path: '/blogs',
});

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

export default async function BlogsPage() {
  let blogs = [];
  let loadError = false;
  try {
    blogs = await getAllBlogs();
  } catch {
    loadError = true;
  }

  return (
    <>
      {/* HERO */}
      <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden border-b border-white/5 bg-bgSec">
        <div className="absolute inset-0 bg-luxury-gradient z-20" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/afterheroimage.jpg"
          className="absolute inset-0 w-full h-full object-cover z-10 opacity-40 mix-blend-screen"
          alt="Hero Background"
        />
        <div className="relative z-20 text-center flex flex-col items-center mt-20 px-6">
          <h1 className="font-serif text-5xl md:text-7xl split-text mb-4 text-white">Journal</h1>
          <h4 className="text-gold text-xs uppercase tracking-[0.3em] mb-12 text-reveal">
            Dispatches from the hangar
          </h4>
        </div>
      </section>

      {/* LIST */}
      <section className="py-20 bg-bgBase relative z-30 min-h-[40vh]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          {loadError ? (
            <div className="glass p-12 rounded-sm border-l-4 border-gold max-w-2xl mx-auto text-center">
              <h3 className="font-serif text-2xl text-white mb-3">The Journal is resting</h3>
              <p className="text-muted text-sm leading-relaxed">
                We couldn&apos;t reach the content library just now. Please check the database
                connection and try again shortly.
              </p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="glass p-12 rounded-sm border-l-4 border-gold max-w-2xl mx-auto text-center">
              <h3 className="font-serif text-2xl text-white mb-3">No stories yet</h3>
              <p className="text-muted text-sm leading-relaxed">
                The first dispatch is being written. Check back soon for insights on engineering,
                design and the craft of flight.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((post) => (
                <Link
                  key={post.id}
                  href={`/blogs/${post.slug}`}
                  className="hover-trigger glass rounded-sm border-t-2 border-gold/30 hover:border-gold transition-colors group flex flex-col overflow-hidden text-reveal"
                >
                  <div className="relative overflow-hidden aspect-[16/9] bg-bgSec">
                    {post.coverImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <i className="fa-solid fa-plane text-gold/30 text-4xl -rotate-90" />
                      </div>
                    )}
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <span className="text-[10px] text-gold uppercase tracking-widest mb-3 block">
                      {formatDate(post.createdAt)}
                    </span>
                    <h3 className="font-serif text-2xl text-white mb-3 group-hover:text-gold transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted text-sm leading-relaxed flex-grow">{post.summary}</p>
                    <span className="mt-6 text-[10px] uppercase tracking-[0.2em] text-white/60 group-hover:text-gold transition-colors">
                      Read Article <i className="fa-solid fa-arrow-right ml-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

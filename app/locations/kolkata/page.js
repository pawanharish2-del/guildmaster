import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Buy Luxury Aircraft in Kolkata | Premium Private Planes',
  description: 'Looking to buy 4 seater luxury aircraft in kolkata or buy 2 seater luxury aircraft in kolkata? Guildmaster Aviation is the best 2 seater aircraft manufacturer in kolkata and best 4 seater aircraft manufacturer in kolkata.',
  path: '/locations/kolkata',
});

export default function KolkataLocationPage() {
  return (
    <>
      <section className="relative min-h-[60vh] md:min-h-[80vh] w-full flex items-center justify-center overflow-hidden bg-bgSec">
        <div className="absolute inset-0 bg-luxury-gradient z-20" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/blog/coastal_aviation.jpg"
          className="absolute inset-0 w-full h-full object-cover z-10 opacity-30 mix-blend-screen"
          alt="Private Aircraft Over Kolkata"
        />
        <div className="relative z-20 max-w-4xl mx-auto px-6 text-center mt-20">
          <p className="text-gold tracking-[0.3em] uppercase text-xs mb-4 font-semibold">Serving Kolkata</p>
          <h1 className="font-serif text-4xl md:text-5xl split-text mb-6 text-white capitalize">
            buy 2 seater luxury aircraft in kolkata
          </h1>
          <p className="text-muted text-lg font-light mb-12 text-reveal max-w-2xl mx-auto">
            Experience unparalleled luxury and performance. For elite residents and business leaders looking to buy 4 seater luxury aircraft in kolkata, Guildmaster Aviation brings world-class carbon fiber aircraft directly to you.
          </p>

          <div className="grid md:grid-cols-2 gap-8 text-left text-reveal mb-16">
            <div className="glass p-10 rounded-sm border-l-4 border-gold group hover:bg-white/5 transition-colors">
              <h3 className="font-serif text-xl text-white mb-3 capitalize">best 2 seater aircraft manufacturer in kolkata</h3>
              <p className="text-muted text-sm leading-relaxed mb-6">
                Discover the Joey. A high-performance, lightweight 2-seater plane built for agility and speed. The perfect choice for fast, local flights around Kolkata.
              </p>
              <a href="/models/joey" className="text-gold text-xs uppercase tracking-widest hover:text-white transition-colors">
                Explore The Joey &rarr;
              </a>
            </div>
            <div className="glass p-10 rounded-sm border-l-4 border-gold group hover:bg-white/5 transition-colors">
              <h3 className="font-serif text-xl text-white mb-3 capitalize">best 4 seater aircraft manufacturer in kolkata</h3>
              <p className="text-muted text-sm leading-relaxed mb-6">
                Meet the Boon. A spacious, luxurious cross-country aircraft engineered for elite group travel and uncompromising comfort in and out of Kolkata.
              </p>
              <a href="/models/boon" className="text-gold text-xs uppercase tracking-widest hover:text-white transition-colors">
                Explore The Boon &rarr;
              </a>
            </div>
          </div>

          <div className="glass p-8 inline-block rounded-sm text-center">
            <h4 className="text-white font-serif text-xl mb-2">Buy Your Next Aircraft</h4>
            <p className="text-muted text-sm mb-6 max-w-md mx-auto">
              Ready to elevate your travel? Contact our team to discuss customization options and receive a bespoke quote for your new luxury aircraft.
            </p>
            <a
              href="/contact"
              className="hover-trigger magnetic-btn px-10 py-4 rounded-full bg-gold inline-block"
            >
              <span className="relative z-10 font-sans text-xs uppercase tracking-[0.2em] text-black font-semibold">
                Contact Sales
              </span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

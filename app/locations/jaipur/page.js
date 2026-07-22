import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Buy Private Aircraft in Jaipur | 2 & 4 Seater Planes',
  description:
    'Looking to buy private aircraft in Jaipur? Guildmaster is the premier aircraft manufacturer near Jaipur, offering luxury 2 seater and 4 seater planes for sale.',
  path: '/locations/jaipur',
});

export default function JaipurLocationPage() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="relative min-h-[60vh] md:min-h-[80vh] w-full flex items-center justify-center overflow-hidden bg-bgSec">
        <div className="absolute inset-0 bg-luxury-gradient z-20" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/blog/joey_propeller.png"
          className="absolute inset-0 w-full h-full object-cover z-10 opacity-30 mix-blend-screen"
          alt="Guildmaster Aircraft Near Jaipur"
        />
        <div className="relative z-20 max-w-4xl mx-auto px-6 text-center mt-20">
          <p className="text-gold tracking-[0.3em] uppercase text-xs mb-4 font-semibold">Aircraft Manufacturers Near Jaipur</p>
          <h1 className="font-serif text-4xl md:text-6xl split-text mb-6 text-white">
            Buy Private Aircraft in Jaipur
          </h1>
          <p className="text-muted text-lg font-light mb-12 text-reveal max-w-2xl mx-auto">
            Experience unparalleled luxury and performance. Located just a short drive away in Kishangarh, Guildmaster Aviation brings world-class carbon fiber aircraft directly to the Pink City.
          </p>

          <div className="grid md:grid-cols-2 gap-8 text-left text-reveal mb-16">
            <div className="glass p-10 rounded-sm border-l-4 border-gold group hover:bg-white/5 transition-colors">
              <h3 className="font-serif text-2xl text-white mb-3">2 Seater Aircraft For Sale Jaipur</h3>
              <p className="text-muted text-sm leading-relaxed mb-6">
                Discover the Joey. A high-performance, lightweight 2-seater plane built for agility and speed. Perfect for local flights around Rajasthan.
              </p>
              <a href="/models/joey" className="text-gold text-xs uppercase tracking-widest hover:text-white transition-colors">
                Explore The Joey &rarr;
              </a>
            </div>
            <div className="glass p-10 rounded-sm border-l-4 border-gold group hover:bg-white/5 transition-colors">
              <h3 className="font-serif text-2xl text-white mb-3">Buy 4 Seater Plane Jaipur</h3>
              <p className="text-muted text-sm leading-relaxed mb-6">
                Meet the Boon. A spacious, luxurious cross-country aircraft engineered for elite group travel and uncompromising comfort.
              </p>
              <a href="/models/boon" className="text-gold text-xs uppercase tracking-widest hover:text-white transition-colors">
                Explore The Boon &rarr;
              </a>
            </div>
          </div>

          <div className="glass p-8 inline-block rounded-sm text-center">
            <h4 className="text-white font-serif text-xl mb-2">Inquire About Private Plane Price in Jaipur</h4>
            <p className="text-muted text-sm mb-6 max-w-md mx-auto">
              Every Guildmaster aircraft is tailored to its owner. Contact our team to discuss customization options and receive a bespoke quote.
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

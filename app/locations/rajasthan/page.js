import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Private Aircraft Manufacturers Rajasthan | Luxury Planes',
  description:
    'Guildmaster is the premier private aircraft manufacturer in Rajasthan. Explore luxury aircraft for sale, including aircraft sales in Udaipur and Jodhpur.',
  path: '/locations/rajasthan',
});

export default function RajasthanLocationPage() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="relative min-h-[60vh] md:min-h-[80vh] w-full flex items-center justify-center overflow-hidden bg-bgSec">
        <div className="absolute inset-0 bg-luxury-gradient z-20" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/blog/boon_cabin.png"
          className="absolute inset-0 w-full h-full object-cover z-10 opacity-30 mix-blend-screen"
          alt="Private Aircraft Manufacturers Rajasthan"
        />
        <div className="relative z-20 max-w-4xl mx-auto px-6 text-center mt-20">
          <p className="text-gold tracking-[0.3em] uppercase text-xs mb-4 font-semibold">Serving All Of Rajasthan</p>
          <h1 className="font-serif text-4xl md:text-6xl split-text mb-6 text-white">
            Private Aircraft Manufacturers Rajasthan
          </h1>
          <p className="text-muted text-lg font-light mb-12 text-reveal max-w-2xl mx-auto">
            From the bustling skies over the capital to the serene lakes of Udaipur, Guildmaster Aviation provides elite, luxury aircraft for sale across Rajasthan.
          </p>

          <div className="grid md:grid-cols-3 gap-6 text-left text-reveal mb-16">
            <div className="glass p-8 rounded-sm border-t-2 border-gold/30 hover:border-gold transition-colors">
              <h3 className="font-serif text-xl text-white mb-2">Buy Small Plane in Rajasthan</h3>
              <p className="text-muted text-xs leading-relaxed mb-4">
                Our carbon fiber 2-seater and 4-seater models are designed for unmatched agility, safety, and luxury in the regional skies.
              </p>
            </div>
            <div className="glass p-8 rounded-sm border-t-2 border-gold/30 hover:border-gold transition-colors">
              <h3 className="font-serif text-xl text-white mb-2">Aircraft Sales Udaipur</h3>
              <p className="text-muted text-xs leading-relaxed mb-4">
                Elevate your travel. We serve clients throughout Udaipur looking to purchase bespoke, high-performance private aircraft.
              </p>
            </div>
            <div className="glass p-8 rounded-sm border-t-2 border-gold/30 hover:border-gold transition-colors">
              <h3 className="font-serif text-xl text-white mb-2">Private Plane Dealers Jodhpur</h3>
              <p className="text-muted text-xs leading-relaxed mb-4">
                As the leading manufacturer in the state, we provide direct sales and unparalleled support to our esteemed clientele in Jodhpur.
              </p>
            </div>
          </div>

          <a
            href="/models"
            className="hover-trigger magnetic-btn px-12 py-5 rounded-full bg-gold inline-block text-reveal"
          >
            <span className="relative z-10 font-sans text-xs uppercase tracking-[0.2em] text-black font-semibold">
              Explore Our Fleet
            </span>
          </a>
        </div>
      </section>
    </>
  );
}

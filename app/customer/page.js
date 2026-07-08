import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Our Customers',
  description:
    'GUILDMASTER serves flight training academies, private owners, air charter and tourism operators, corporates, government and public sector, and aero clubs with advanced 2-seater and 4-seater aircraft.',
  path: '/customer',
});

export default function CustomerPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative w-full flex items-center justify-center overflow-hidden border-b border-white/5 bg-bgSec">
        <div className="absolute inset-0 bg-luxury-gradient z-20" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/afterheroimage.jpg"
          className="absolute inset-0 w-full h-full object-cover z-10 opacity-40 mix-blend-screen"
          alt="Hero Background"
        />
        <div className="relative z-20 text-center flex flex-col items-center pt-24 pb-12 md:pt-40 md:pb-24 px-6 w-full">
          <h1 className="font-serif text-5xl md:text-7xl split-text mb-4 text-white">Our Customers</h1>
          <h4 className="text-gold text-xs uppercase tracking-[0.3em] mb-12 text-reveal">Serving a wide range of industries</h4>
        </div>
      </section>

      {/* CUSTOMERS MAIN */}
      <section className="pt-3 pb-8 md:py-20 bg-bgBase relative z-30">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <p className="text-white/80 text-lg leading-relaxed mb-16 text-center max-w-4xl mx-auto text-reveal">
            Guildmaster&apos;s advanced 2-seater and 4-seater aircraft are designed to serve a wide range of customers across the aviation industry. At Guildmaster, we strive to build long-term partnerships with our customers by delivering safe, technologically advanced, and reliable aircraft that meet the evolving needs of modern aviation.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="glass p-10 rounded-sm group text-reveal border-t-2 border-gold/30 hover:border-gold transition-colors">
              <h3 className="font-serif text-2xl mb-4 text-white group-hover:text-gold transition-colors">Flight Training Academies</h3>
              <p className="text-muted text-sm leading-relaxed">Flying schools and aviation training institutes seeking reliable, fuel-efficient, and technologically advanced aircraft for pilot training programs.</p>
            </div>
            <div className="glass p-10 rounded-sm group text-reveal border-t-2 border-gold/30 hover:border-gold transition-colors">
              <h3 className="font-serif text-2xl mb-4 text-white group-hover:text-gold transition-colors">Private Aircraft Owners</h3>
              <p className="text-muted text-sm leading-relaxed">Aviation enthusiasts and individuals looking for personal aircraft that offer convenience, performance, and an exceptional flying experience.</p>
            </div>
            <div className="glass p-10 rounded-sm group text-reveal border-t-2 border-gold/30 hover:border-gold transition-colors">
              <h3 className="font-serif text-2xl mb-4 text-white group-hover:text-gold transition-colors">Air Charter &amp; Tourism</h3>
              <p className="text-muted text-sm leading-relaxed">Companies providing aerial sightseeing, recreational flights, and short-distance charter services that require cost-effective and dependable light aircraft.</p>
            </div>
            <div className="glass p-10 rounded-sm group text-reveal border-t-2 border-gold/30 hover:border-gold transition-colors">
              <h3 className="font-serif text-2xl mb-4 text-white group-hover:text-gold transition-colors">Corporate &amp; Executives</h3>
              <p className="text-muted text-sm leading-relaxed">Businesses and entrepreneurs seeking efficient regional travel solutions for faster connectivity and greater flexibility.</p>
            </div>
            <div className="glass p-10 rounded-sm group text-reveal border-t-2 border-gold/30 hover:border-gold transition-colors">
              <h3 className="font-serif text-2xl mb-4 text-white group-hover:text-gold transition-colors">Government &amp; Public Sector</h3>
              <p className="text-muted text-sm leading-relaxed">Government departments, police agencies, disaster management teams, and public service organizations requiring light aircraft for surveillance and special operations.</p>
            </div>
            <div className="glass p-10 rounded-sm group text-reveal border-t-2 border-gold/30 hover:border-gold transition-colors">
              <h3 className="font-serif text-2xl mb-4 text-white group-hover:text-gold transition-colors">Aero Clubs</h3>
              <p className="text-muted text-sm leading-relaxed">Aviation clubs and recreational flying organizations that promote general aviation and require modern aircraft for their members.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'For Investors',
  description:
    'Invest in GUILDMASTER — the art of the aircraft. Partner in a vision to establish India as a global hub for advanced light aircraft manufacturing, with scalable revenue across production, customization, maintenance and training.',
  path: '/investors',
});

export default function InvestorsPage() {
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
          <h1 className="font-serif text-5xl md:text-7xl split-text mb-4 text-white">For Investors</h1>
          <h4 className="text-gold text-lg font-serif italic mb-12 text-reveal">Guildmaster – The Art of the Aircraft</h4>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-20 bg-bgBase relative z-30">
        <div className="max-w-[1000px] mx-auto px-6 md:px-12 text-reveal">
          <p className="text-white/80 text-lg leading-relaxed mb-8">
            At Guildmaster, we are building more than aircraft—we are creating the future of personal and regional aviation. Guided by our philosophy, &ldquo;The Art of the Aircraft,&rdquo; we combine advanced engineering, innovative design, and precision manufacturing to develop next-generation 2-seater and 4-seater aircraft that meet the evolving demands of the global aviation industry.
          </p>
          <p className="text-muted text-md leading-relaxed mb-8">
            The aviation sector is witnessing a significant transformation, driven by increasing demand for pilot training, private aviation, air tourism, and efficient regional mobility solutions. This presents a substantial market opportunity for technologically advanced and cost-effective light aircraft.
          </p>
          <p className="text-muted text-md leading-relaxed mb-8">
            Guildmaster is strategically positioned to capitalize on this opportunity by developing aircraft that are safe, efficient, and built to international standards. Our focus on innovation, lightweight structures, advanced avionics, and superior engineering enables us to create products with strong global market potential.
          </p>
          <div className="glass p-12 rounded-sm border-l-4 border-gold my-16 group hover:bg-white/5 transition-colors">
            <h3 className="font-serif text-3xl mb-6 text-white group-hover:text-gold transition-colors">A Global Partnership</h3>
            <p className="text-muted text-md leading-relaxed">
              As an investor, you are not merely funding an aerospace company—you are partnering in a vision to establish India as a global hub for advanced aircraft manufacturing. Our scalable business model extends beyond aircraft production to include customization, maintenance services, training partnerships, and international distribution networks, creating multiple revenue streams and long-term growth opportunities.
            </p>
          </div>
          <p className="text-muted text-md leading-relaxed mb-8">
            We believe that every aircraft is a masterpiece of engineering and craftsmanship. This belief is embodied in our tagline, &ldquo;The Art of the Aircraft,&rdquo; and reflects our commitment to excellence, innovation, and the relentless pursuit of redefining modern aviation.
          </p>
          <h4 className="text-gold text-2xl font-serif italic mb-8 border-l-2 border-gold pl-6 mt-16">
            By investing in Guildmaster, you become part of a pioneering journey to shape the future of flight and participate in building a world-class aviation enterprise with global ambitions and transformative potential.
          </h4>
        </div>
      </section>
    </>
  );
}

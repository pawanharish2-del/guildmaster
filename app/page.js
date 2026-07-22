import Link from 'next/link';
import Image from 'next/image';
import ParticleCanvas from '@/components/ParticleCanvas';
import HeroVideo from '@/components/HeroVideo';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Premium Carbon Fiber Aircraft Manufacturer Rajasthan | Guildmaster',
  description:
    'Guildmaster Aviation is among the top private aircraft manufacturers in Rajasthan. We design luxury private planes. Buy a small plane in Rajasthan tailored for you.',
  path: '/',
});

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <ParticleCanvas id="webgl-canvas" />
        {/* Mobile Fallback Image (Shows if video autoplay is blocked) */}
        <Image
          src="/images/afterheroimage.jpg"
          alt="Guildmaster Hero"
          fill
          priority
          className="object-cover z-[-1] opacity-50"
        />

        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <HeroVideo />
        </div>

        <div className="absolute inset-0 bg-luxury-gradient z-10" />



        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center opacity-0"
          id="hero-scroll"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-gold to-transparent" />
        </div>
      </section>

      {/* FULL WIDTH IMAGE SECTION (4 SEATER) */}
      <section className="w-full relative z-30 overflow-hidden border-t border-white/5">
        <div className="w-full h-[50vh] md:h-[70vh] relative group">
          <div className="absolute inset-0 bg-gold/10 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] z-10 mix-blend-overlay pointer-events-none" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/afterheroimage.jpg"
            loading="lazy"
            className="w-full h-full object-cover parallax-img image-reveal-anim"
            alt="Premium 4 Seater Aircraft Showcase"
          />
        </div>
      </section>

      {/* AIRCRAFT OVERVIEW */}
      <section id="aircraft-overview" className="py-4 bg-bgSec relative z-30 border-t border-white/5">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 text-center mb-16">
          <h2 className="text-gold font-serif text-4xl md:text-5xl split-text mb-4">Aircraft Overview</h2>
          <h3 className="text-gold text-xs uppercase tracking-[0.3em] mb-8 text-reveal">Explore Our Fleet</h3>
        </div>
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 text-reveal">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Card 1 */}
            <div className="glass p-6 rounded-sm border-t-2 border-t-gold/50 flex flex-col group">
              <div className="relative overflow-hidden aspect-[16/9] mb-6 rounded-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/aircraft-a-2.jpg"
                  loading="lazy"
                  alt="Joey parked on executive runway during golden hour"
                  className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                />
              </div>
              <h3 className="font-serif text-2xl text-white mb-2">Joey</h3>
              <p className="text-sm text-muted mb-6 flex-grow">Designed for precision and uncompromised performance.</p>
              <div className="grid grid-cols-2 gap-4 text-xs font-sans text-white/80 mb-8 border-y border-white/10 py-4">
                <div><span className="block text-[10px] uppercase tracking-widest text-gold mb-1">Top Speed</span>210 kts</div>
                <div><span className="block text-[10px] uppercase tracking-widest text-gold mb-1">Seats</span>2</div>
                <div><span className="block text-[10px] uppercase tracking-widest text-gold mb-1">Range</span>1,200 nm</div>
              </div>
              <Link
                href="/models/joey"
                className="w-full text-center hover-trigger magnetic-btn py-3 rounded-full border border-white/20 group-hover:border-gold/50 text-xs uppercase tracking-[0.2em] transition-colors"
              >
                Explore
              </Link>
            </div>
            {/* Card 3 */}
            <div className="glass p-6 rounded-sm border-t-2 border-t-gold/50 flex flex-col group">
              <div className="relative overflow-hidden aspect-[16/9] mb-6 rounded-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/aircraft-a-4.jpg"
                  loading="lazy"
                  alt="Boon parked on executive runway during golden hour"
                  className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                />
              </div>
              <h3 className="font-serif text-2xl text-white mb-2">Boon</h3>
              <p className="text-sm text-muted mb-6 flex-grow">Spacious capability without sacrificing agility or speed.</p>
              <div className="grid grid-cols-2 gap-4 text-xs font-sans text-white/80 mb-8 border-y border-white/10 py-4">
                <div><span className="block text-[10px] uppercase tracking-widest text-gold mb-1">Top Speed</span>220 kts</div>
                <div><span className="block text-[10px] uppercase tracking-widest text-gold mb-1">Seats</span>4</div>
                <div><span className="block text-[10px] uppercase tracking-widest text-gold mb-1">Range</span>1,500 nm</div>
              </div>
              <Link
                href="/models/boon"
                className="w-full text-center hover-trigger magnetic-btn py-3 rounded-full border border-white/20 group-hover:border-gold/50 text-xs uppercase tracking-[0.2em] transition-colors"
              >
                Explore
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TECHNOLOGY SECTION */}
      <section className="py-4 bg-bgSec border-t border-white/5">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 text-center mb-20">
          <h2 className="text-gold font-serif text-5xl md:text-6xl split-text mb-6">Technology meets design</h2>
          <h3 className="text-gold text-xs uppercase tracking-[0.3em] mb-8 text-reveal">More than just speed.</h3>
          <p className="text-muted max-w-2xl mx-auto text-lg font-light leading-relaxed text-reveal">
            Every aspect of our aircraft is carefully considered.<br />
            We design, build and test almost everything ourselves.<br />
            Not because we have to, but because we want to.<br />
            <span className="text-white font-serif italic mt-4 block">Our aircraft. Our passion.</span>
          </p>
        </div>

        <div className="max-w-[1600px] mx-auto px-6 md:px-12 overflow-hidden">
          <div className="flex gap-6 pb-12 overflow-x-auto no-scrollbar snap-x" id="tech-slider">
            {/* Tech Card 1 */}
            <div className="min-w-[280px] md:min-w-[350px] shrink-0 snap-center group">
              <div className="relative overflow-hidden aspect-square rounded-sm mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://cdn.prod.website-files.com/67652ebd2306750adb3bf012/679cd2f49d82e7480c65b719_Group%20178-min.png" alt="Retractable carbon hybrid landing gear mechanism" className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700" />
              </div>
              <h5 className="text-sm font-sans tracking-wide text-white group-hover:text-gold transition-colors">Retractable carbon hybrid landing gear</h5>
            </div>
            {/* Tech Card 2 */}
            <div className="min-w-[280px] md:min-w-[350px] shrink-0 snap-center group">
              <div className="relative overflow-hidden aspect-square rounded-sm mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://cdn.prod.website-files.com/67652ebd2306750adb3bf012/677c08c7388927490a8411aa_Rectangle%20148-min.png" alt="Turbocharged four-cylinder Rotax engine detail" className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700" />
              </div>
              <h5 className="text-sm font-sans tracking-wide text-white group-hover:text-gold transition-colors">Turbocharged four-cylinder Rotax engine</h5>
            </div>
            {/* Tech Card 3 */}
            <div className="min-w-[280px] md:min-w-[350px] shrink-0 snap-center group">
              <div className="relative overflow-hidden aspect-square rounded-sm mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://cdn.prod.website-files.com/67652ebd2306750adb3bf012/677c08e2ee99d25e1262ecca_Rectangle%20150-min.png" alt="Elliptical wing profile for high manoeuvrability" className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700" />
              </div>
              <h5 className="text-sm font-sans tracking-wide text-white group-hover:text-gold transition-colors">Elliptical wing for high manoeuvrability</h5>
            </div>
            {/* Tech Card 4 */}
            <div className="min-w-[280px] md:min-w-[350px] shrink-0 snap-center group">
              <div className="relative overflow-hidden aspect-square rounded-sm mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://cdn.prod.website-files.com/67652ebd2306750adb3bf012/677c078154462adef14d81ab_Rectangle%20154-min.png" alt="Built-in integrated wing lights" className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700" />
              </div>
              <h5 className="text-sm font-sans tracking-wide text-white group-hover:text-gold transition-colors">Built-in wing lights</h5>
            </div>
            {/* Tech Card 5 */}
            <div className="min-w-[280px] md:min-w-[350px] shrink-0 snap-center group">
              <div className="relative overflow-hidden aspect-square rounded-sm mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://cdn.prod.website-files.com/67652ebd2306750adb3bf012/679c85ba553b40e3132759c8_Rectangle%20180-min.png" alt="High visibility low-cut glass cockpit view" className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700" />
              </div>
              <h5 className="text-sm font-sans tracking-wide text-white group-hover:text-gold transition-colors">High visibility with low-cut glass cockpit</h5>
            </div>
            {/* Tech Card 6 */}
            <div className="min-w-[280px] md:min-w-[350px] shrink-0 snap-center group">
              <div className="relative overflow-hidden aspect-square rounded-sm mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://cdn.prod.website-files.com/67652ebd2306750adb3bf012/677c0cc55e61dce50e6c767b_Rectangle%20162-min.png" alt="Integrated carbon fiber wing step" className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700" />
              </div>
              <h5 className="text-sm font-sans tracking-wide text-white group-hover:text-gold transition-colors">Integrated wing step</h5>
            </div>
            {/* Tech Card 7 */}
            <div className="min-w-[280px] md:min-w-[350px] shrink-0 snap-center group">
              <div className="relative overflow-hidden aspect-square rounded-sm mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://cdn.prod.website-files.com/67652ebd2306750adb3bf012/677c0ced1788cecfbb8b1cee_Rectangle%20159-min.png" alt="Powerful Hercules 30 aircraft lighting system" className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700" />
              </div>
              <h5 className="text-sm font-sans tracking-wide text-white group-hover:text-gold transition-colors">Powerful Hercules 30 lighting</h5>
            </div>
            {/* Tech Card 8 */}
            <div className="min-w-[280px] md:min-w-[350px] shrink-0 snap-center group">
              <div className="relative overflow-hidden aspect-square rounded-sm mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://cdn.prod.website-files.com/67652ebd2306750adb3bf012/679c85ba553b40e3132759c8_Rectangle%20180-min.png" alt="Efficient individual aircraft brake system" className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700" />
              </div>
              <h5 className="text-sm font-sans tracking-wide text-white group-hover:text-gold transition-colors">Efficient individual brakes</h5>
            </div>
            {/* Tech Card 9 */}
            <div className="min-w-[280px] md:min-w-[350px] shrink-0 snap-center group">
              <div className="relative overflow-hidden aspect-square rounded-sm mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://cdn.prod.website-files.com/67652ebd2306750adb3bf012/677c083d0ebe9ec8e8e0866b_Rectangle%20153-min.png" alt="Elliptical wing profile in flight" className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700" />
              </div>
              <h5 className="text-sm font-sans tracking-wide text-white group-hover:text-gold transition-colors">Elliptical wing for high manoeuvrability</h5>
            </div>
          </div>

          <div className="text-center mt-8">
            <button className="hover-trigger magnetic-btn px-10 py-5 rounded-full glass group inline-block">
              <span className="relative z-10 font-sans text-xs uppercase tracking-[0.2em] transition-colors duration-300"><i className="fa-solid fa-download mr-2" /> Download Brochure</span>
            </button>
          </div>
        </div>
      </section>

      {/* COMMUNITY */}
      <section className="py-4 bg-bgBase overflow-hidden border-t border-white/5">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 mb-16 flex flex-col md:flex-row justify-between items-end">
          <div>
            <h2 className="text-gold font-serif text-4xl md:text-5xl split-text mb-4">What&apos;s it like to fly the Guildmaster?</h2>
            <h3 className="text-gold text-xs uppercase tracking-[0.3em] text-reveal">Experiences from our community.</h3>
          </div>

          <div className="flex gap-4 mt-8 md:mt-0 opacity-80 image-reveal-anim">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://cdn.prod.website-files.com/67652ebd2306750adb3bf012/676bd56b558ab1768e17f0ae_David%20Elg%20Moob%20Blackwing%208%201-min.jpg" alt="Community Pilot" className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-500" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://cdn.prod.website-files.com/67652ebd2306750adb3bf012/676be5e492549ee546ae241a_united-by-passion-community-3%201-min%20(1).png" alt="Community Event" className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-500" />
          </div>
        </div>

        <div className="flex gap-6 md:gap-10 px-6 md:px-12 w-max" id="testimonial-track">
          <div className="glass w-[320px] md:w-[500px] p-8 md:p-12 rounded-sm shrink-0 border-t-2 border-t-gold/50">
            <i className="fa-solid fa-quote-left text-gold text-2xl mb-6 opacity-50" />
            <p className="text-sm md:text-lg font-serif italic mb-8 leading-relaxed text-white/90">&ldquo;We&apos;ve been flying for more than 50 years. The Guildmaster aircraft replaced our previous aircraft for ecological reasons. It was the perfect transition without sacrificing safety, comfort, or performance. After several years we added another Guildmaster to the fleet because every flight exceeded expectations. We truly enjoy every journey.&rdquo;</p>
            <div className="flex items-center gap-4 border-t border-white/10 pt-6">
              <div>
                <h6 className="text-xs md:text-sm font-sans uppercase tracking-[0.2em] font-semibold">— Klaus &amp; Marko</h6>
              </div>
            </div>
          </div>
          <div className="glass w-[320px] md:w-[500px] p-8 md:p-12 rounded-sm shrink-0 border-t-2 border-t-gold/50">
            <i className="fa-solid fa-quote-left text-gold text-2xl mb-6 opacity-50" />
            <p className="text-sm md:text-lg font-serif italic mb-8 leading-relaxed text-white/90">&ldquo;The Guildmaster is a versatile and incredibly modern aircraft. It is forgiving, easy to fly, and performs exceptionally on shorter runways. At the same time, it is a fast and comfortable travelling machine with excellent range. Over the past four years I have visited 18 countries across Europe.&rdquo;</p>
            <div className="flex items-center gap-4 border-t border-white/10 pt-6">
              <div>
                <h6 className="text-xs md:text-sm font-sans uppercase tracking-[0.2em] font-semibold">— David Straadt</h6>
                <span className="text-[10px] text-gold uppercase tracking-widest mt-1 block">Senior Expert Farmer</span>
              </div>
            </div>
          </div>
          <div className="glass w-[320px] md:w-[500px] p-8 md:p-12 rounded-sm shrink-0 border-t-2 border-t-gold/50">
            <i className="fa-solid fa-quote-left text-gold text-2xl mb-6 opacity-50" />
            <p className="text-sm md:text-lg font-serif italic mb-8 leading-relaxed text-white/90">&ldquo;With Guildmaster it was love at first sight. Outstanding engineering. Excellent flying performance. Beautiful craftsmanship. Attention to every detail. It has significantly reduced operating costs while allowing me to fly more often than ever before.&rdquo;</p>
            <div className="flex items-center gap-4 border-t border-white/10 pt-6">
              <div>
                <h6 className="text-xs md:text-sm font-sans uppercase tracking-[0.2em] font-semibold">— Peter Sodermans</h6>
                <span className="text-[10px] text-gold uppercase tracking-widest mt-1 block">President AOPA Luxembourg</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* JOIN THE FLEET (CTA) */}
      <section id="contact-cta" className="py-4 bg-bgSec text-center relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-luxury-gradient z-0" />
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <h2 className="text-gold font-serif text-5xl md:text-7xl split-text mb-6">Join the Fleet</h2>
          <p className="text-muted text-lg font-light mb-10 text-reveal">Want to make an inquiry or just have questions?</p>

          <Link href="/contact" className="hover-trigger magnetic-btn px-12 py-5 rounded-full bg-gold group mb-20 inline-block">
            <span className="relative z-10 font-sans text-xs uppercase tracking-[0.2em] text-black font-semibold transition-colors duration-300">Contact Us</span>
          </Link>
        </div>
      </section>
    </>
  );
}

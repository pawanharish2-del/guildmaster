import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Contact Guildmaster Aviation | Sales & Factory Inquiries',
  description:
    'Get in touch with Guildmaster. Visit our manufacturing facility at Aerospace Park, Kishangarh, or contact our team to inquire about our premium aircraft.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      {/* HERO / CONTACT */}
      <section className="relative min-h-[60vh] md:min-h-[80vh] w-full flex items-center justify-center overflow-hidden bg-bgSec">
        <div className="absolute inset-0 bg-luxury-gradient z-20" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/afterheroimage.jpg"
          className="absolute inset-0 w-full h-full object-cover z-10 opacity-40 mix-blend-screen"
          alt="Hero Background"
        />
        <div className="relative z-20 max-w-4xl mx-auto px-6 text-center mt-20">
          <h1 className="font-serif text-5xl md:text-7xl split-text mb-6 text-white">Contact Us</h1>
          <p className="text-muted text-lg font-light mb-16 text-reveal">
            Want to make an inquiry or just have questions? We are here to help.
          </p>

          <div className="grid md:grid-cols-2 gap-12 text-left text-reveal mb-20">
            <div className="glass p-12 rounded-sm border-l-4 border-gold group hover:bg-white/5 transition-colors">
              <i className="fa-solid fa-location-dot text-gold text-3xl mb-6 opacity-80" />
              <h3 className="font-serif text-2xl text-white mb-2">Location</h3>
              <p className="text-muted text-xs tracking-widest uppercase leading-relaxed">
                Factory No. 01 Aerospace Park,
                <br />
                Behind Govt School, Silora,
                <br />
                Kishangarh, Rajasthan 305802
              </p>
            </div>
            <div className="glass p-12 rounded-sm border-l-4 border-gold group hover:bg-white/5 transition-colors">
              <i className="fa-solid fa-envelope text-gold text-3xl mb-6 opacity-80" />
              <h3 className="font-serif text-2xl text-white mb-2">Email</h3>
              <a
                href="mailto:hi@guildmaster.in"
                className="text-muted text-sm tracking-widest uppercase hover:text-white transition-colors"
              >
                hi@guildmaster.in
              </a>
            </div>
          </div>

          <a
            href="mailto:hi@guildmaster.in"
            className="hover-trigger magnetic-btn px-12 py-5 rounded-full bg-gold group mb-10 inline-block text-reveal"
          >
            <span className="relative z-10 font-sans text-xs uppercase tracking-[0.2em] text-black font-semibold transition-colors duration-300">
              Send an Email
            </span>
          </a>
        </div>
      </section>
    </>
  );
}

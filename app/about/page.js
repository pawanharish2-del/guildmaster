import { buildMetadata } from '@/lib/seo';
import Link from 'next/link';

export const metadata = buildMetadata({
  title: 'About Guildmaster | Best Aircraft Manufacturers',
  description:
    'Based in Kishangarh, Rajasthan, Guildmaster is a leading aircraft manufacturer designing, building, and testing the best premium carbon fiber aircraft in-house.',
  path: '/about',
});

export default function AboutPage() {
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
          <h1 className="font-serif text-5xl md:text-7xl split-text mb-4 text-white">About Us</h1>
          <h4 className="text-gold text-lg font-serif italic mb-12 text-reveal">Art of the Aircraft.</h4>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="pt-3 pb-8 md:py-20 bg-bgBase relative z-30">
        <div className="max-w-[1000px] mx-auto px-6 md:px-12 text-reveal">
          <p className="text-white/80 text-lg leading-relaxed mb-8">
            At Guildmaster, we are driven by a vision to redefine the future of personal and light aviation through innovation, precision engineering, and advanced aerospace technology. As a new-age aviation company, our primary focus is on designing and manufacturing state-of-the-art <Link href="/models/joey" className="text-gold hover:text-white transition-colors underline decoration-gold/30 hover:decoration-white">2-seater</Link> and <Link href="/models/boon" className="text-gold hover:text-white transition-colors underline decoration-gold/30 hover:decoration-white">4-seater</Link> aircraft that combine safety, performance, and efficiency.
          </p>
          <p className="text-muted text-md leading-relaxed mb-8">
            Founded with a passion for creating accessible and technologically advanced aircraft, Guildmaster aims to contribute to the evolution of general aviation by developing aircraft that meet international standards while being tailored to modern flying requirements. Our team of engineers, designers, and aviation experts works tirelessly to integrate cutting-edge materials, advanced aerodynamics, and smart aviation technologies into every aircraft we build.
          </p>
          <p className="text-muted text-md leading-relaxed mb-8">
            We believe that the future of aviation lies in innovation and sustainability. Therefore, our aircraft are being developed using advanced engineering methodologies, lightweight structures, and modern avionics systems to deliver superior performance, enhanced safety, and an exceptional flying experience.
          </p>
          <p className="text-muted text-md leading-relaxed mb-8">
            At Guildmaster, we are not just manufacturing aircraft; we are building the next generation of aviation solutions that will empower pilots, aviation enthusiasts, training institutions, and private operators. Our commitment to quality, reliability, and technological excellence drives every stage of our design and manufacturing process.
          </p>
          <p className="text-muted text-md leading-relaxed mb-12">
            As we continue our journey, our mission is to establish Guildmaster as a trusted name in the global aviation industry by delivering world-class light aircraft that inspire confidence and open new possibilities in personal and regional air mobility.
          </p>
          <h4 className="text-gold text-2xl font-serif italic mb-8 border-l-2 border-gold pl-6">
            With innovation at our core and excellence as our standard, Guildmaster is shaping the future of aviation—one aircraft at a time.
          </h4>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-20 bg-bgSec relative z-30 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16">
          <div className="glass p-12 rounded-sm border-t-2 border-gold/50 group text-reveal">
            <h3 className="font-serif text-4xl mb-6 text-white group-hover:text-gold transition-colors">Our Mission</h3>
            <p className="text-muted text-md leading-relaxed">
              To design and manufacture world-class 2-seater and 4-seater aircraft by leveraging advanced aerospace technologies, innovative engineering, and uncompromising safety standards. We are committed to making modern aviation more accessible, efficient, and reliable while delivering exceptional performance and value to pilots, training institutions, and private aviation operators. Through continuous research and technological excellence, we aim to contribute to the growth and transformation of the global aviation industry.
            </p>
          </div>
          <div className="glass p-12 rounded-sm border-t-2 border-gold/50 group text-reveal">
            <h3 className="font-serif text-4xl mb-6 text-white group-hover:text-gold transition-colors">Our Vision</h3>
            <p className="text-muted text-md leading-relaxed">
              To become a globally recognized leader in light aircraft manufacturing and a pioneer in next-generation aviation solutions. We envision a future where advanced, safe, and sustainable aircraft empower individuals and businesses with greater freedom of flight. By pushing the boundaries of innovation and engineering, Guildmaster aspires to shape the future of personal and regional aviation and establish India as a significant contributor to the global aerospace ecosystem.
            </p>
          </div>
        </div>
      </section>

      {/* WHY GUILDMASTER */}
      <section className="py-20 bg-bgBase relative z-30 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-gold font-serif text-4xl md:text-5xl split-text mb-4">Why Guildmaster?</h2>
            <h4 className="text-gold text-xs uppercase tracking-[0.3em] text-reveal">Choose the future of aviation</h4>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="glass p-8 rounded-sm group text-reveal hover:border-gold/30 border border-white/5 transition-colors">
              <i className="fa-solid fa-microchip text-gold text-3xl mb-6 opacity-80" />
              <h5 className="text-white font-sans text-sm tracking-widest uppercase mb-4">Advanced Technology</h5>
              <p className="text-muted text-xs leading-relaxed">Committed to next-generation 2-seater and 4-seater aircraft using cutting-edge aerospace technologies and modern avionics.</p>
            </div>
            <div className="glass p-8 rounded-sm group text-reveal hover:border-gold/30 border border-white/5 transition-colors">
              <i className="fa-solid fa-shield-halved text-gold text-3xl mb-6 opacity-80" />
              <h5 className="text-white font-sans text-sm tracking-widest uppercase mb-4">Safety First</h5>
              <p className="text-muted text-xs leading-relaxed">Safety is at the core. Designed with rigorous quality standards, advanced safety systems, and precision engineering.</p>
            </div>
            <div className="glass p-8 rounded-sm group text-reveal hover:border-gold/30 border border-white/5 transition-colors">
              <i className="fa-solid fa-pen-nib text-gold text-3xl mb-6 opacity-80" />
              <h5 className="text-white font-sans text-sm tracking-widest uppercase mb-4">Innovative Design</h5>
              <p className="text-muted text-xs leading-relaxed">Combining lightweight structures, aerodynamic efficiency, and intelligent design for exceptional fuel efficiency.</p>
            </div>
            <div className="glass p-8 rounded-sm group text-reveal hover:border-gold/30 border border-white/5 transition-colors">
              <i className="fa-solid fa-rocket text-gold text-3xl mb-6 opacity-80" />
              <h5 className="text-white font-sans text-sm tracking-widest uppercase mb-4">Made for the Future</h5>
              <p className="text-muted text-xs leading-relaxed">Building aircraft that address the evolving needs of personal aviation, flight training, and regional mobility.</p>
            </div>
            <div className="glass p-8 rounded-sm group text-reveal hover:border-gold/30 border border-white/5 transition-colors">
              <i className="fa-solid fa-sliders text-gold text-3xl mb-6 opacity-80" />
              <h5 className="text-white font-sans text-sm tracking-widest uppercase mb-4">Customization</h5>
              <p className="text-muted text-xs leading-relaxed">Flexible solutions and customization options to meet specific needs of training academies, private owners, and businesses.</p>
            </div>
            <div className="glass p-8 rounded-sm group text-reveal hover:border-gold/30 border border-white/5 transition-colors">
              <i className="fa-solid fa-gears text-gold text-3xl mb-6 opacity-80" />
              <h5 className="text-white font-sans text-sm tracking-widest uppercase mb-4">Engineering Excellence</h5>
              <p className="text-muted text-xs leading-relaxed">Dedicated to maintaining the highest standards of quality, innovation, and continuous improvement.</p>
            </div>
            <div className="glass p-8 rounded-sm group text-reveal hover:border-gold/30 border border-white/5 transition-colors">
              <i className="fa-solid fa-users text-gold text-3xl mb-6 opacity-80" />
              <h5 className="text-white font-sans text-sm tracking-widest uppercase mb-4">Customer-Centric</h5>
              <p className="text-muted text-xs leading-relaxed">Building long-term relationships by providing dependable products, responsive support, and commitment to excellence.</p>
            </div>
            <div className="glass p-8 rounded-sm group text-reveal hover:border-gold/30 border border-white/5 transition-colors">
              <i className="fa-solid fa-eye text-gold text-3xl mb-6 opacity-80" />
              <h5 className="text-white font-sans text-sm tracking-widest uppercase mb-4">Vision-Driven</h5>
              <p className="text-muted text-xs leading-relaxed">More than an aircraft manufacturer. Establishing India as a global hub for advanced aircraft manufacturing.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Compare Premium Aircraft Models | Joey vs Boon',
  description:
    "Compare Guildmaster's high-performance fleet. Evaluate the Joey 2-seater and Boon 4-seater to find the perfect match for your speed, range, and payload needs.",
  path: '/models',
});

export default function ModelsPage() {
  return (
    <>
      <div className="pt-32 pb-16 text-center">
        <h1 className="text-gold font-serif text-5xl md:text-7xl split-text mb-6">Our Fleet</h1>
        <p className="text-muted text-lg font-light text-reveal max-w-2xl mx-auto">
          Compare private aircraft specifications and flight performance to find the perfect match.
        </p>
      </div>

      {/* SECTION AIRCRAFT 1: Joey */}
      <section id="aircraft-a-2" className="py-4 bg-bgBase relative z-30 border-t border-white/5">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-gold font-serif text-4xl md:text-6xl split-text mb-4">Joey</h2>
              <h3 className="text-gold text-xl font-serif italic mb-12 text-reveal">Designed for Precision.</h3>

              <p className="text-muted text-sm leading-relaxed mb-12 text-reveal">
                The Joey offers an unparalleled blend of performance and comfort, setting a new standard in aviation. Built with state-of-the-art carbon fiber construction and equipped with advanced avionics, this aircraft guarantees exceptional fuel efficiency without compromising on power. The pilot experience is truly transformative, featuring intuitive controls and unmatched visibility. With impressive cross country capability and a premium luxury finish down to the finest detail, the Joey is crafted for those who demand excellence in every flight.
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 text-sm text-muted spec-anim">
                <li className="border-b border-white/10 pb-3 flex justify-between"><span className="text-white uppercase tracking-widest text-[10px]">Maximum Takeoff Weight</span> <span>600 kg</span></li>
                <li className="border-b border-white/10 pb-3 flex justify-between"><span className="text-white uppercase tracking-widest text-[10px]">Empty Weight</span> <span>375 kg</span></li>
                <li className="border-b border-white/10 pb-3 flex justify-between"><span className="text-white uppercase tracking-widest text-[10px]">Cruise Speed</span> <span>190 kts</span></li>
                <li className="border-b border-white/10 pb-3 flex justify-between"><span className="text-white uppercase tracking-widest text-[10px]">Maximum Speed</span> <span>210 kts</span></li>
                <li className="border-b border-white/10 pb-3 flex justify-between"><span className="text-white uppercase tracking-widest text-[10px]">Stall Speed</span> <span>45 kts</span></li>
                <li className="border-b border-white/10 pb-3 flex justify-between"><span className="text-white uppercase tracking-widest text-[10px]">Range</span> <span>1,200 nm</span></li>
                <li className="border-b border-white/10 pb-3 flex justify-between"><span className="text-white uppercase tracking-widest text-[10px]">Fuel Capacity</span> <span>120 L</span></li>
                <li className="border-b border-white/10 pb-3 flex justify-between"><span className="text-white uppercase tracking-widest text-[10px]">Engine</span> <span>Rotax 916 iS</span></li>
                <li className="border-b border-white/10 pb-3 flex justify-between"><span className="text-white uppercase tracking-widest text-[10px]">Propeller</span> <span>3-Blade Composite</span></li>
                <li className="border-b border-white/10 pb-3 flex justify-between"><span className="text-white uppercase tracking-widest text-[10px]">Rate of Climb</span> <span>2,500 ft/min</span></li>
                <li className="border-b border-white/10 pb-3 flex justify-between"><span className="text-white uppercase tracking-widest text-[10px]">Takeoff Distance</span> <span>175 m</span></li>
                <li className="border-b border-white/10 pb-3 flex justify-between"><span className="text-white uppercase tracking-widest text-[10px]">Landing Distance</span> <span>290 m</span></li>
                <li className="border-b border-white/10 pb-3 flex justify-between"><span className="text-white uppercase tracking-widest text-[10px]">Service Ceiling</span> <span>18,000 ft</span></li>
                <li className="border-b border-white/10 pb-3 flex justify-between"><span className="text-white uppercase tracking-widest text-[10px]">Wing Span</span> <span>8.5 m</span></li>
                <li className="border-b border-white/10 pb-3 flex justify-between"><span className="text-white uppercase tracking-widest text-[10px]">Length</span> <span>6.2 m</span></li>
                <li className="border-b border-white/10 pb-3 flex justify-between"><span className="text-white uppercase tracking-widest text-[10px]">Height</span> <span>2.1 m</span></li>
                <li className="border-b border-white/10 pb-3 flex justify-between"><span className="text-white uppercase tracking-widest text-[10px]">Seats</span> <span>2</span></li>
                <li className="border-b border-white/10 pb-3 flex justify-between"><span className="text-white uppercase tracking-widest text-[10px]">Payload</span> <span>225 kg</span></li>
                <li className="border-b border-white/10 pb-3 flex justify-between"><span className="text-white uppercase tracking-widest text-[10px]">Landing Gear</span> <span>Retractable Carbon</span></li>
                <li className="border-b border-white/10 pb-3 flex justify-between"><span className="text-white uppercase tracking-widest text-[10px]">Fuel Type</span> <span>Mogas/Avgas</span></li>
                <li className="border-b border-white/10 pb-3 flex justify-between"><span className="text-white uppercase tracking-widest text-[10px]">Avionics</span> <span>Garmin G3X Touch</span></li>
              </ul>

              <Link href="/models/joey" className="mt-12 inline-block hover-trigger magnetic-btn px-8 py-4 rounded-full border border-gold/50 group">
                <span className="relative z-10 font-sans text-xs uppercase tracking-[0.2em] transition-colors duration-300">Explore Joey</span>
              </Link>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative overflow-hidden rounded-sm group">
                <div className="absolute inset-0 bg-gold/10 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] z-10 mix-blend-overlay" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/aircraft-a-2.jpg"
                  loading="lazy"
                  className="w-full h-auto scale-110 group-hover:scale-100 transition-transform duration-1000 ease-out image-reveal-anim parallax-img"
                  alt="Joey parked on executive runway during golden hour"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION AIRCRAFT 3: Boon */}
      <section id="aircraft-a-4" className="py-4 bg-bgBase relative z-30 border-t border-white/5">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-gold font-serif text-4xl md:text-6xl split-text mb-4">Boon</h2>
              <h3 className="text-gold text-xl font-serif italic mb-12 text-reveal">Space meets Speed.</h3>

              <p className="text-muted text-sm leading-relaxed mb-12 text-reveal">
                The Boon reimagines group travel with its revolutionary carbon fiber construction and spacious cabin. Optimized for the ultimate pilot experience, the cockpit boasts advanced avionics that deliver unmatched situational awareness and safety. Even with four adults on board, it retains extraordinary fuel efficiency and dynamic performance. Featuring a stunning luxury finish, this aircraft provides exceptional cross country capability, ensuring every passenger travels in absolute comfort.
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 text-sm text-muted spec-anim">
                <li className="border-b border-white/10 pb-3 flex justify-between"><span className="text-white uppercase tracking-widest text-[10px]">Maximum Takeoff Weight</span> <span>1,200 kg</span></li>
                <li className="border-b border-white/10 pb-3 flex justify-between"><span className="text-white uppercase tracking-widest text-[10px]">Empty Weight</span> <span>750 kg</span></li>
                <li className="border-b border-white/10 pb-3 flex justify-between"><span className="text-white uppercase tracking-widest text-[10px]">Cruise Speed</span> <span>200 kts</span></li>
                <li className="border-b border-white/10 pb-3 flex justify-between"><span className="text-white uppercase tracking-widest text-[10px]">Maximum Speed</span> <span>220 kts</span></li>
                <li className="border-b border-white/10 pb-3 flex justify-between"><span className="text-white uppercase tracking-widest text-[10px]">Stall Speed</span> <span>58 kts</span></li>
                <li className="border-b border-white/10 pb-3 flex justify-between"><span className="text-white uppercase tracking-widest text-[10px]">Range</span> <span>1,500 nm</span></li>
                <li className="border-b border-white/10 pb-3 flex justify-between"><span className="text-white uppercase tracking-widest text-[10px]">Fuel Capacity</span> <span>200 L</span></li>
                <li className="border-b border-white/10 pb-3 flex justify-between"><span className="text-white uppercase tracking-widest text-[10px]">Engine</span> <span>Continental CD-300</span></li>
                <li className="border-b border-white/10 pb-3 flex justify-between"><span className="text-white uppercase tracking-widest text-[10px]">Propeller</span> <span>4-Blade Composite</span></li>
                <li className="border-b border-white/10 pb-3 flex justify-between"><span className="text-white uppercase tracking-widest text-[10px]">Rate of Climb</span> <span>1,800 ft/min</span></li>
                <li className="border-b border-white/10 pb-3 flex justify-between"><span className="text-white uppercase tracking-widest text-[10px]">Takeoff Distance</span> <span>250 m</span></li>
                <li className="border-b border-white/10 pb-3 flex justify-between"><span className="text-white uppercase tracking-widest text-[10px]">Landing Distance</span> <span>310 m</span></li>
                <li className="border-b border-white/10 pb-3 flex justify-between"><span className="text-white uppercase tracking-widest text-[10px]">Service Ceiling</span> <span>20,000 ft</span></li>
                <li className="border-b border-white/10 pb-3 flex justify-between"><span className="text-white uppercase tracking-widest text-[10px]">Wing Span</span> <span>9.8 m</span></li>
                <li className="border-b border-white/10 pb-3 flex justify-between"><span className="text-white uppercase tracking-widest text-[10px]">Length</span> <span>7.8 m</span></li>
                <li className="border-b border-white/10 pb-3 flex justify-between"><span className="text-white uppercase tracking-widest text-[10px]">Height</span> <span>2.6 m</span></li>
                <li className="border-b border-white/10 pb-3 flex justify-between"><span className="text-white uppercase tracking-widest text-[10px]">Seats</span> <span>4</span></li>
                <li className="border-b border-white/10 pb-3 flex justify-between"><span className="text-white uppercase tracking-widest text-[10px]">Payload</span> <span>450 kg</span></li>
                <li className="border-b border-white/10 pb-3 flex justify-between"><span className="text-white uppercase tracking-widest text-[10px]">Landing Gear</span> <span>Retractable</span></li>
                <li className="border-b border-white/10 pb-3 flex justify-between"><span className="text-white uppercase tracking-widest text-[10px]">Fuel Type</span> <span>Jet-A1</span></li>
                <li className="border-b border-white/10 pb-3 flex justify-between"><span className="text-white uppercase tracking-widest text-[10px]">Avionics</span> <span>Garmin G1000 NXi</span></li>
              </ul>

              <Link href="/models/boon" className="mt-12 inline-block hover-trigger magnetic-btn px-8 py-4 rounded-full border border-gold/50 group">
                <span className="relative z-10 font-sans text-xs uppercase tracking-[0.2em] transition-colors duration-300">Explore Boon</span>
              </Link>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative overflow-hidden rounded-sm group">
                <div className="absolute inset-0 bg-gold/10 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] z-10 mix-blend-overlay" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/aircraft-a-4.jpg"
                  loading="lazy"
                  className="w-full h-auto scale-110 group-hover:scale-100 transition-transform duration-1000 ease-out image-reveal-anim parallax-img"
                  alt="Boon parked on executive runway during golden hour"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-4 bg-bgBase relative z-30 border-t border-white/5">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-gold font-serif text-4xl md:text-5xl split-text mb-4">Compare Models</h2>
            <h3 className="text-gold text-xs uppercase tracking-[0.3em] text-reveal">Find your perfect match</h3>
          </div>
          <div className="overflow-x-auto text-reveal">
            <table className="w-full text-left font-sans text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-gold/50 text-white uppercase tracking-widest text-[10px]">
                  <th className="py-6 px-4">Aircraft</th>
                  <th className="py-6 px-4">Seats</th>
                  <th className="py-6 px-4">Cruise Speed</th>
                  <th className="py-6 px-4">Max Speed</th>
                  <th className="py-6 px-4">Range</th>
                  <th className="py-6 px-4">Payload</th>
                  <th className="py-6 px-4">Engine</th>
                  <th className="py-6 px-4">Fuel Capacity</th>
                  <th className="py-6 px-4">Takeoff Distance</th>
                  <th className="py-6 px-4">Landing Distance</th>
                </tr>
              </thead>
              <tbody className="text-white/70">
                <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                  <td className="py-6 px-4 font-serif text-white text-lg">Joey</td>
                  <td className="py-6 px-4">2</td>
                  <td className="py-6 px-4">190 kts</td>
                  <td className="py-6 px-4">210 kts</td>
                  <td className="py-6 px-4">1,200 nm</td>
                  <td className="py-6 px-4">225 kg</td>
                  <td className="py-6 px-4">Rotax 916 iS</td>
                  <td className="py-6 px-4">120 L</td>
                  <td className="py-6 px-4">175 m</td>
                  <td className="py-6 px-4">290 m</td>
                </tr>

                <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                  <td className="py-6 px-4 font-serif text-white text-lg">Boon</td>
                  <td className="py-6 px-4">4</td>
                  <td className="py-6 px-4">200 kts</td>
                  <td className="py-6 px-4">220 kts</td>
                  <td className="py-6 px-4">1,500 nm</td>
                  <td className="py-6 px-4">400 kg</td>
                  <td className="py-6 px-4">Continental CD-300</td>
                  <td className="py-6 px-4">200 L</td>
                  <td className="py-6 px-4">250 m</td>
                  <td className="py-6 px-4">310 m</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

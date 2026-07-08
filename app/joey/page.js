import { buildMetadata, aircraftSchema, jsonLd } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Joey — 2-Seater Light Aircraft',
  description:
    'The Joey: a 2-seat light aircraft designed for precision. State-of-the-art carbon fiber construction, Rotax 916 iS engine, Garmin G3X Touch avionics, 1,200 nm range and 210 kts top speed.',
  path: '/joey',
  image: '/images/aircraft-a-2.jpg',
});

const JOEY_SPECS = {
  'Maximum Takeoff Weight': '600 kg',
  'Empty Weight': '375 kg',
  'Cruise Speed': '190 kts',
  'Maximum Speed': '210 kts',
  'Stall Speed': '45 kts',
  Range: '1,200 nm',
  'Fuel Capacity': '120 L',
  Engine: 'Rotax 916 iS',
  Propeller: '3-Blade Composite',
  'Rate of Climb': '2,500 ft/min',
  'Takeoff Distance': '175 m',
  'Landing Distance': '290 m',
  'Service Ceiling': '18,000 ft',
  'Wing Span': '8.5 m',
  Length: '6.2 m',
  Height: '2.1 m',
  Seats: '2',
  Payload: '225 kg',
  'Landing Gear': 'Retractable Carbon',
  'Fuel Type': 'Mogas/Avgas',
  Avionics: 'Garmin G3X Touch',
};

export default function JoeyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          aircraftSchema({
            name: 'Joey',
            description:
              'A 2-seat light aircraft engineered for precision and uncompromised performance, with state-of-the-art carbon fiber construction, a Rotax 916 iS engine and Garmin G3X Touch avionics.',
            path: '/joey',
            image: '/images/aircraft-a-2.jpg',
            specs: JOEY_SPECS,
          })
        )}
      />

      <div className="pt-32" />
      {/* SECTION AIRCRAFT 1: Joey */}
      <section id="aircraft-a-2" className="py-4 bg-bgBase relative z-30 border-t border-white/5">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-gold font-serif text-4xl md:text-6xl split-text mb-4">Joey</h2>
              <h4 className="text-gold text-xl font-serif italic mb-12 text-reveal">Designed for Precision.</h4>

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

              <button className="mt-12 hover-trigger magnetic-btn px-8 py-4 rounded-full border border-gold/50 group">
                <span className="relative z-10 font-sans text-xs uppercase tracking-[0.2em] transition-colors duration-300">Explore Aircraft</span>
              </button>
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
    </>
  );
}

import { buildMetadata, aircraftSchema, jsonLd } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'The Boon: 4 Seater Luxury Aircraft For Sale Rajasthan',
  description:
    'Want to buy a 4 seater plane in Jaipur? The Boon is a premium cross-country aircraft with a Continental CD-300 engine and luxurious group travel cabin.',
  path: '/models/boon',
  image: '/images/aircraft-a-4.jpg',
});

const BOON_SPECS = {
  'Maximum Takeoff Weight': '1,200 kg',
  'Empty Weight': '750 kg',
  'Cruise Speed': '200 kts',
  'Maximum Speed': '220 kts',
  'Stall Speed': '58 kts',
  Range: '1,500 nm',
  'Fuel Capacity': '200 L',
  Engine: 'Continental CD-300',
  Propeller: '4-Blade Composite',
  'Rate of Climb': '1,800 ft/min',
  'Takeoff Distance': '250 m',
  'Landing Distance': '310 m',
  'Service Ceiling': '20,000 ft',
  'Wing Span': '9.8 m',
  Length: '7.8 m',
  Height: '2.6 m',
  Seats: '4',
  Payload: '450 kg',
  'Landing Gear': 'Retractable',
  'Fuel Type': 'Jet-A1',
  Avionics: 'Garmin G1000 NXi',
};

export default function BoonPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          aircraftSchema({
            name: 'Boon',
            description:
              'A 4-seat light aircraft balancing space and speed, with revolutionary carbon fiber construction, a Continental CD-300 engine and Garmin G1000 NXi avionics.',
            path: '/boon',
            image: '/images/aircraft-a-4.jpg',
            specs: BOON_SPECS,
          })
        )}
      />

      <div className="pt-24 md:pt-32" />
      {/* SECTION AIRCRAFT 3: Boon */}
      <section id="aircraft-a-4" className="py-4 bg-bgBase relative z-30 border-t border-white/5">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-gold font-serif text-4xl md:text-6xl split-text mb-4">Boon</h2>
              <h4 className="text-gold text-xl font-serif italic mb-12 text-reveal">Space meets Speed.</h4>

              <p className="text-muted text-sm leading-relaxed mb-12 text-reveal">
                The Boon reimagines group travel with its revolutionary carbon fiber construction and spacious cabin. Optimized for the ultimate pilot experience, the cockpit boasts advanced avionics that deliver unmatched situational awareness and safety. If you prefer a lighter, more agile aircraft, explore our <a href="/models/joey" className="text-gold hover:text-white transition-colors underline decoration-gold/30 hover:decoration-white">2-seater Joey</a>. Or, <a href="/contact" className="text-gold hover:text-white transition-colors underline decoration-gold/30 hover:decoration-white">contact our team</a> to start building your bespoke aircraft today.
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

              <button className="mt-12 hover-trigger magnetic-btn px-8 py-4 rounded-full border border-gold/50 group">
                <span className="relative z-10 font-sans text-xs uppercase tracking-[0.2em] transition-colors duration-300">Explore Aircraft</span>
              </button>
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
    </>
  );
}

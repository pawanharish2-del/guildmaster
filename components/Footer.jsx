import Link from 'next/link';

// Shared footer — identical markup/classes to the static source. Internal aircraft
// links are remapped to routes; social links remain placeholders as in the source.
export default function Footer() {
  return (
    <footer className="bg-bgBase pt-16 pb-10 border-t border-white/10">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-16">
          <div className="md:col-span-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logonew.png"
              alt="Guildmaster Logo"
              className="h-10 md:h-12 w-auto mb-4 object-contain block hover-trigger"
            />
            <p className="text-gold italic font-serif text-sm mb-6">art of the aircraft</p>
            <div className="text-white/60 text-[10px] font-sans space-y-2 uppercase tracking-[0.15em] leading-loose">
              <p>
                Factory No. 01 Aerospace Park,
                <br />
                Behind Govt School, Silora,
                <br />
                Kishangarh, Rajasthan 305802
              </p>
              <p className="pt-4">
                <a
                  href="mailto:hi@guildmaster.in"
                  className="hover:text-gold transition-colors lowercase tracking-widest"
                >
                  hi@guildmaster.in
                </a>
              </p>
            </div>
          </div>

          <div className="md:col-span-2">
            <h6 className="text-[10px] font-semibold uppercase tracking-[0.3em] mb-6 text-white/40">Aircraft</h6>
            <ul className="space-y-4 text-white/80 text-xs font-sans tracking-[0.15em] uppercase">
              <li>
                <Link href="/models/joey" className="hover-trigger hover:text-gold transition-colors">
                  Joey
                </Link>
              </li>
              <li />
              <li>
                <Link href="/models/boon" className="hover-trigger hover:text-gold transition-colors">
                  Boon
                </Link>
              </li>
              <li />
            </ul>
          </div>

          <div className="md:col-span-2">
            <h6 className="text-[10px] font-semibold uppercase tracking-[0.3em] mb-6 text-white/40">See More</h6>
            <ul className="space-y-4 text-white/80 text-xs font-sans tracking-[0.15em] uppercase">
              <li>
                <a href="#" className="hover-trigger hover:text-gold transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover-trigger hover:text-gold transition-colors">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover-trigger hover:text-gold transition-colors">
                  YouTube
                </a>
              </li>
              <li>
                <a href="#" className="hover-trigger hover:text-gold transition-colors">
                  Download Brochure
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h6 className="text-[10px] font-semibold uppercase tracking-[0.3em] mb-6 text-white/40">Areas Served</h6>
            <ul className="space-y-4 text-white/80 text-xs font-sans tracking-[0.15em] uppercase">
              <li>
                <a href="/locations/jaipur" className="hover-trigger hover:text-gold transition-colors">
                  Jaipur
                </a>
              </li>
              <li>
                <a href="/locations/rajasthan" className="hover-trigger hover:text-gold transition-colors">
                  Rajasthan
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-12">
            <h6 className="text-[10px] font-semibold uppercase tracking-[0.3em] mb-6 text-white/40">
              Subscribe to our Newsletter
            </h6>
            <div className="flex items-center relative mt-4">
              <input
                type="email"
                placeholder="Email"
                className="bg-transparent border-b border-white/30 px-0 py-2 w-full focus:outline-none focus:border-gold transition-colors text-xs font-sans text-white placeholder-white/30"
              />
              <i className="fa-solid fa-arrow-right absolute right-2 text-white/30 hover:text-gold cursor-pointer transition-colors text-sm hover-trigger" />
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-[10px] tracking-[0.2em] text-white/30 uppercase text-center md:text-left">
          <p>&copy; 2026 GUILDMASTER Aviation. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

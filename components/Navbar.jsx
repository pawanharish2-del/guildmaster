'use client';

import Link from 'next/link';
import { useState } from 'react';

// ═══════════════════════════════════════════════════════════════════════════
// Navigation. Byte-for-byte the same markup/classes as the shared static nav,
// with the seven .html targets remapped to App Router routes and the vanilla
// hamburger toggle re-expressed as React state (identical visual result).
// The desktop "Models" mega-menu remains pure CSS group-hover.
// ═══════════════════════════════════════════════════════════════════════════

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const topSpan = {
    transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none',
  };
  const midSpan = { opacity: menuOpen ? 0 : 1 };
  const botSpan = {
    width: menuOpen ? '24px' : undefined,
    transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
    backgroundColor: menuOpen ? '#fff' : undefined,
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full z-50 glass border-b-0 px-8 py-5 flex justify-between items-center"
        id="navbar"
      >
        <Link href="/" className="hover-trigger flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logonew.png"
            alt="Guildmaster Logo"
            className="h-8 md:h-10 w-auto object-contain"
          />
        </Link>

        <div className="hidden lg:flex gap-10 font-sans text-[11px] uppercase tracking-[0.25em] text-white items-center">
          <Link href="/" className="hover-trigger !text-white hover:text-gold transition-colors duration-300">
            Home
          </Link>

          <div className="group relative py-4">
            <Link
              href="/#aircraft-overview"
              className="hover-trigger !text-white hover:text-gold transition-colors duration-300"
            >
              Models <i className="fa-solid fa-chevron-down ml-1 text-[8px]" />
            </Link>
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-0 w-[600px] bg-bgSec/95 backdrop-blur-xl border border-white/10 rounded-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 grid grid-cols-2 gap-6 p-8 pointer-events-none group-hover:pointer-events-auto shadow-2xl">
              <Link href="/models/joey" className="flex flex-col gap-3 hover-trigger group/card">
                <div className="relative overflow-hidden rounded-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/aircraft-a-2.jpg"
                    alt="Joey"
                    className="w-full h-auto scale-105 group-hover/card:scale-100 transition-transform duration-500"
                  />
                </div>
                <span className="text-gold text-[10px] tracking-widest uppercase">Joey</span>
              </Link>

              <Link href="/models/boon" className="flex flex-col gap-3 hover-trigger group/card">
                <div className="relative overflow-hidden rounded-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/aircraft-a-4.jpg"
                    alt="Boon"
                    className="w-full h-auto scale-105 group-hover/card:scale-100 transition-transform duration-500"
                  />
                </div>
                <span className="text-gold text-[10px] tracking-widest uppercase">Boon</span>
              </Link>
            </div>
          </div>

          <Link href="/about" className="hover-trigger !text-white hover:text-gold transition-colors duration-300">
            About
          </Link>
          <Link href="/blog" className="hover-trigger !text-white hover:text-gold transition-colors duration-300">
            Blog
          </Link>
          <Link href="/investors" className="hover-trigger !text-white hover:text-gold transition-colors duration-300">
            Investors
          </Link>
          <Link href="/contact" className="hover-trigger !text-white hover:text-gold transition-colors duration-300">
            Contact
          </Link>
          <Link href="/customer" className="hover-trigger !text-white hover:text-gold transition-colors duration-300">
            Customer
          </Link>
        </div>

        {/* Hamburger Menu Button (Mobile) */}
        <button
          id="mobile-menu-btn"
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
          className="lg:hidden flex flex-col gap-1.5 z-[60] relative cursor-pointer"
        >
          <span
            className="w-6 h-[1px] bg-white block transition-all duration-300 origin-center"
            style={topSpan}
          />
          <span
            className="w-6 h-[1px] bg-white block transition-all duration-300 origin-center"
            style={midSpan}
          />
          <span
            className="w-4 h-[1px] bg-gold block transition-all duration-300 self-end origin-center"
            style={botSpan}
          />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-menu-overlay"
        className={`fixed inset-0 bg-bgSec/98 backdrop-blur-2xl z-[55] flex flex-col items-center justify-center transition-opacity duration-500 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ul className="flex flex-col gap-10 text-center font-sans text-sm uppercase tracking-[0.4em] text-white">
          <li>
            <Link href="/" onClick={closeMenu} className="mobile-link !text-white hover:text-gold transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link href="/#aircraft-overview" onClick={closeMenu} className="mobile-link !text-white hover:text-gold transition-colors">
              Models
            </Link>
          </li>
          <li>
            <Link href="/about" onClick={closeMenu} className="mobile-link !text-white hover:text-gold transition-colors">
              About
            </Link>
          </li>
          <li>
            <Link href="/blog" onClick={closeMenu} className="mobile-link !text-white hover:text-gold transition-colors">
              Blog
            </Link>
          </li>
          <li>
            <Link href="/investors" onClick={closeMenu} className="mobile-link !text-white hover:text-gold transition-colors">
              Investors
            </Link>
          </li>
          <li>
            <Link href="/customer" onClick={closeMenu} className="mobile-link !text-white hover:text-gold transition-colors">
              Customer
            </Link>
          </li>
          <li>
            <Link href="/contact" onClick={closeMenu} className="mobile-link !text-white hover:text-gold transition-colors">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

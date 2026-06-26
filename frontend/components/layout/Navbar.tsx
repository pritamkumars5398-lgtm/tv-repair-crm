'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '/products', label: 'Products' },
  { href: '/about',    label: 'About' },
  { href: '/contact',  label: 'Contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-neutral-200 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-6">

          {/* Logo — original blue on white */}
          <Link href="/" className="shrink-0 flex items-center">
            <Image
              src="/logo.png"
              alt="RepairCart — We Fix It Right"
              width={140}
              height={48}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-0.5 flex-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3.5 py-2 text-[13px] font-medium text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded transition-all duration-150"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/track"
              className="px-4 py-1.5 text-[13px] font-medium text-neutral-600 hover:text-primary-600 border border-neutral-300 hover:border-primary-400 rounded transition-all"
            >
              Track Repair
            </Link>
            <Link
              href="/book"
              className="px-4 py-1.5 text-[13px] font-semibold text-white bg-primary-600 hover:bg-primary-500 rounded transition-all"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-1.5 rounded text-neutral-500 hover:text-primary-600 hover:bg-primary-50 transition-all"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 text-sm text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded transition-all"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 flex flex-col gap-2 border-t border-neutral-200 mt-2">
              <Link href="/track" className="block px-3 py-2 text-sm text-center text-neutral-600 border border-neutral-300 rounded" onClick={() => setIsOpen(false)}>
                Track Repair
              </Link>
              <Link href="/book" className="block px-3 py-2 text-sm font-semibold text-center text-white bg-primary-600 rounded" onClick={() => setIsOpen(false)}>
                Book Now — ₹250
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

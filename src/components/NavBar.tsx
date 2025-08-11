"use client";

import Link from 'next/link';
import { useState } from 'react';

// Define your nav links here
const links = [
  { name: 'Results', href: '/results' },
  { name: 'Timeline', href: '/timeline' },
  { name: 'Skills', href: '/skills' },
  { name: 'Speaking', href: '/speaking' },
  { name: 'Ask', href: '/ask' },
  { name: 'Contact', href: '/contact' },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/80 dark:bg-gray-950/80 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4 md:p-5">
        <Link href="/" className="font-bold text-lg">
          Mahmoud&nbsp;Hanadi
        </Link>
        {/* Desktop navigation */}
        <nav className="hidden md:flex space-x-6 text-sm">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-olive transition">
              {link.name}
            </Link>
          ))}
        </nav>
        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-olive"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          {/* Simple hamburger icon */}
          <svg
            className="h-6 w-6 text-gray-900 dark:text-gray-100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden bg-white/80 dark:bg-gray-950/80 border-t border-gray-200 dark:border-gray-800 p-4 space-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-2 px-2 rounded-md hover:bg-olive/10 dark:hover:bg-olive/20"
              onClick={() => setOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
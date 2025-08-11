"use client";

import Link from 'next/link';
import { useState } from 'react';

// Define your nav links here
// Define primary navigation links. The "Ask" link is separated as a call‑to‑action
// button rendered separately so we can style it distinctively.
const links = [
  { name: 'Results', href: '/results' },
  { name: 'Cases', href: '/results' },
  { name: 'Timeline', href: '/timeline' },
  { name: 'Skills', href: '/skills' },
  { name: 'Speaking', href: '/speaking' },
  { name: 'Contact', href: '/contact' },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800"> 
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:px-6 md:py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          {/* Digital Avatar */}
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-olive via-emerald-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
              MH
            </div>
            {/* Growth indicator dots */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>
          {/* Stylized Name */}
          <div className="flex flex-col">
            <span className="font-bold text-lg md:text-xl text-gray-900 dark:text-gray-100 group-hover:text-olive transition-colors">
              Mahmoud Hanadi
            </span>
            <div className="flex items-center space-x-1">
              <div className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Growing</span>
              <div className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
            </div>
          </div>
        </Link>
        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-gray-800 dark:text-gray-200 hover:text-olive dark:hover:text-olive transition"
            >
              {link.name}
            </Link>
          ))}
          {/* CTA button */}
          <Link href="/ask">
            <span className="ml-4 inline-block rounded-full px-5 py-2 bg-keffiyeh-red text-white text-sm font-medium shadow hover:bg-keffiyeh-red/80 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-keffiyeh-red">
              Ask
            </span>
          </Link>
        </div>
        {/* Mobile actions */}
        <div className="md:hidden flex items-center space-x-3">
          {/* CTA button on mobile */}
          <Link href="/ask">
            <span className="inline-block rounded-full px-4 py-2 bg-keffiyeh-red text-white text-sm font-medium shadow hover:bg-keffiyeh-red/80 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-keffiyeh-red">
              Ask
            </span>
          </Link>
          {/* Hamburger toggle */}
          <button
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-olive"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
          >
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
      </div>
      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden bg-white/80 dark:bg-gray-900/80 border-t border-gray-200 dark:border-gray-800 px-4 py-4 space-y-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-2 px-2 rounded-md text-gray-800 dark:text-gray-200 hover:bg-olive/10 dark:hover:bg-olive/20"
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
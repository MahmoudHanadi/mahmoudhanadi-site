"use client";

import Link from 'next/link';

/**
 * A site‑wide footer component. Provides a short biography, quick navigation
 * links and social/contact links. The footer uses a responsive grid on
 * larger screens and stacks the content on small screens. It pulls the
 * current year at runtime so it never goes out of date. All links are
 * regular Next.js <Link> instances for client‑side navigation.
 */
export default function SiteFooter() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">About</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Mahmoud Hanadi is a results‑first growth & product leader with over eight years of experience. 
              He builds partnerships, scales user acquisition and ships MVPs to measurable outcomes. 
              Multilingual (EN/AR/HE) and based between Debrecen  and Amsterdam .
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><Link href="/results" className="hover:text-olive transition">Results</Link></li>
              <li><Link href="/case" className="hover:text-olive transition">Cases</Link></li>
              <li><Link href="/timeline" className="hover:text-olive transition">Timeline</Link></li>
              <li><Link href="/skills" className="hover:text-olive transition">Skills</Link></li>
              <li><Link href="/speaking" className="hover:text-olive transition">Speaking</Link></li>
              <li><Link href="/contact" className="hover:text-olive transition">Contact</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://www.linkedin.com/in/mahmoud-hanadi/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-olive transition"
                >
                  LinkedIn
                </a>
              </li>
              <li><Link href="/contact" className="hover:text-olive transition">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 Mahmoud Hanadi. All rights reserved. Built with Next.js & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}
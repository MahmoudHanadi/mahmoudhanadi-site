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
  const year = new Date().getFullYear();
  return (
    <footer className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-10 pb-8 px-4 md:px-8 bg-sand/30 dark:bg-gray-900/40 text-sm text-gray-700 dark:text-gray-300">
      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
        {/* Bio column */}
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">About</h3>
          <p className="leading-relaxed">
            Mahmoud Hanadi is a results‑first growth &amp; product leader with over eight
            years of experience. He builds partnerships, scales user acquisition
            and ships MVPs to measurable outcomes. Multilingual (EN/AR/HE) and based
            between Debrecen 🇭🇺 and Amsterdam 🇳🇱.
          </p>
        </div>
        {/* Quick links */}
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Navigation</h3>
          <ul className="space-y-1">
            <li>
              <Link href="/results" className="hover:text-olive transition">
                Results
              </Link>
            </li>
            <li>
              <Link href="/timeline" className="hover:text-olive transition">
                Timeline
              </Link>
            </li>
            <li>
              <Link href="/skills" className="hover:text-olive transition">
                Skills
              </Link>
            </li>
            <li>
              <Link href="/speaking" className="hover:text-olive transition">
                Speaking
              </Link>
            </li>
            <li>
              <Link href="/ask" className="hover:text-olive transition">
                Ask
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-olive transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        {/* Social & contact */}
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Connect</h3>
          <ul className="space-y-1">
            <li>
              <a
                href="https://www.linkedin.com/in/mahmoudhanadi"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-olive transition"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://github.com/MahmoudHanadi"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-olive transition"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="mailto:hello@mahmoudhanadi.com"
                className="hover:text-olive transition"
              >
                Email
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400">
        © {year} Mahmoud Hanadi. All rights reserved. Built with Next.js &amp;
        Tailwind CSS.
      </div>
    </footer>
  );
}
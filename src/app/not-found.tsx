"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
// Remove the unused trackEvent import
// import { trackEvent } from "@/lib/analytics";

const fade = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.24 } },
};

const float = {
  animate: {
    y: [0, -6, 0],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
};

export default function NotFound() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="relative min-h-screen flex items-center justify-center p-6"
      aria-label="404 page"
    >
      {/* Background gradient */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-olive/20 via-teal/15 to-sand/30"
      />
      {/* Soft blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 -left-20 h-64 w-64 rounded-full bg-olive/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-teal/20 blur-3xl"
      />

      {/* Center card */}
      <motion.div
        className="relative max-w-xl w-full mx-auto rounded-3xl bg-white/70 dark:bg-white/5 backdrop-blur border border-black/5 dark:border-white/10 shadow-sm p-8 text-center"
        variants={fade}
        initial="hidden"
        animate={prefersReducedMotion ? "show" : "show"}
      >
        {/* Icon */}
        <motion.svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto mb-4 text-olive"
          aria-hidden
          {...(prefersReducedMotion ? {} : { variants: float, animate: "animate" })}
        >
          {/* Lantern/compass hybrid */}
          <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="2" opacity="0.6" />
          <path d="M32 14v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M32 42v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M14 32h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M42 32h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M32 22l6 10-10 6 4-16z" fill="currentColor" opacity="0.9" />
        </motion.svg>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">
          404 — Page Not Found
        </h1>

        <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          you have come a long way from the beaten path, explorer — i see that you have reached a realm yet to be discovered by light. i commend your curiosity, but this location is yet to be conceived.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/results">
            <button className="px-6 py-3 rounded-full bg-keffiyeh-red text-white shadow-lg hover:bg-keffiyeh-red/80 transition">
              See Results
            </button>
          </Link>
          <Link href="/case">
            <button className="px-6 py-3 rounded-full bg-olive text-white shadow-lg hover:bg-olive/80 transition">
              View Cases
            </button>
          </Link>
          <Link href="/contact">
            <button className="px-6 py-3 rounded-full bg-keffiyeh-red text-white shadow-lg hover:bg-keffiyeh-red/80 transition">
              Contact Me
            </button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
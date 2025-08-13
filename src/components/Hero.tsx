"use client";

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { trackHeroCta } from '@/lib/analytics';

/**
 * A reusable hero component with an animated gradient background, a simple
 * floating SVG mascot and two call‑to‑action buttons. The animation respects
 * the user's reduced motion preference by disabling continuous motion when
 * preferred. The CTAs fire analytics events via trackHeroCta.
 */
export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  // Simple floating circle to act as a mascot. Can be swapped for a more
  // elaborate illustration later. When reduced motion is preferred it renders
  // statically.
  const Mascot = () => (
    <motion.svg
      viewBox="0 0 100 100"
      className="mx-auto h-32 w-32 mb-6"
      initial={{ opacity: 0, y: 10 }}
      animate={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -6, 0] }}
      transition={prefersReducedMotion ? { duration: 0.6, ease: 'easeOut' } : { duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      <circle cx="50" cy="35" r="20" className="fill-olive/90" />
      <rect x="35" y="55" width="30" height="35" rx="8" className="fill-olive/70" />
      <circle cx="45" cy="33" r="3" className="fill-white" />
      <circle cx="55" cy="33" r="3" className="fill-white" />
      <path d="M42 40 Q50 46 58 40" className="stroke-white stroke-2" fill="none" />
    </motion.svg>
  );

  return (
    <section className="relative overflow-hidden rounded-3xl p-8 md:p-14 text-center bg-gradient-to-r from-olive/20 via-teal/10 to-sand/20 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 shadow-sm">
      {/* Animated blurred blobs in the background */}
      {!prefersReducedMotion && (
        <>
          <motion.div
            aria-hidden
            className="absolute -top-16 -left-16 w-72 h-72 bg-olive/20 rounded-full blur-3xl"
            initial={{ opacity: 0.1, scale: 0.9 }}
            animate={{ opacity: 0.6, scale: 1.2 }}
            transition={{ duration: 9, repeat: Infinity, repeatType: 'reverse' }}
          />
          <motion.div
            aria-hidden
            className="absolute -bottom-8 -right-20 w-80 h-80 bg-keffiyeh-red/20 rounded-full blur-3xl"
            initial={{ opacity: 0.1, scale: 0.9 }}
            animate={{ opacity: 0.5, scale: 1.1 }}
            transition={{ duration: 7, repeat: Infinity, repeatType: 'reverse' }}
          />
        </>
      )}
      <Mascot />
      <motion.h1
        className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-gray-800 via-olive to-keffiyeh-red dark:from-gray-100 dark:via-olive dark:to-keffiyeh-red bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        Scale user acquisition you can measure.
      </motion.h1>
      <p className="text-lg md:text-xl mb-6 text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
        I lead growth and partnerships for SaaS and content providers—plus aggregators/PSPs, telcos, and e-commerce—building compliant funnels, ARPU-aware budgeting, and creative systems that compound across MENA, EU, and APAC.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link href="/results">
          <button
            onClick={() => trackHeroCta('see_results')}
            className="px-6 py-3 rounded-full bg-olive text-white shadow hover:bg-olive/80 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-olive"
          >
            See Results
          </button>
        </Link>
        <Link href="/contact">
          <button
            onClick={() => trackHeroCta('solve_problem')}
            className="px-6 py-3 rounded-full bg-keffiyeh-red text-white shadow hover:bg-keffiyeh-red/80 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-keffiyeh-red"
          >
            Contact Me
          </button>
        </Link>
      </div>
    </section>
  );
}
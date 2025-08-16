"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';

export default function Hero() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20">
      {/* Animated Background Elements */}
      {!prefersReducedMotion && (
        <>
          <motion.div
            aria-hidden
            className="absolute -top-16 -left-16 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10"
            initial={{ opacity: 0.1, scale: 0.9 }}
            animate={{ opacity: 0.6, scale: 1.2 }}
            transition={{ duration: 9, repeat: Infinity, repeatType: 'reverse' }}
          />
          <motion.div
            aria-hidden
            className="absolute -bottom-8 -right-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl pointer-events-none -z-10"
            initial={{ opacity: 0.1, scale: 0.9 }}
            animate={{ opacity: 0.5, scale: 1.1 }}
            transition={{ duration: 7, repeat: Infinity, repeatType: 'reverse' }}
          />
        </>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Custom SVG Icon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <svg viewBox="0 0 100 100" className="mx-auto h-32 w-32 mb-6" style={{ opacity: 0.497437, transform: 'translateY(-5.99991px)' }}>
            <circle cx="50" cy="35" r="20" className="fill-primary/90"></circle>
            <rect x="35" y="55" width="30" height="35" rx="8" className="fill-primary/70"></rect>
            <circle cx="45" cy="33" r="3" className="fill-white"></circle>
            <circle cx="55" cy="33" r="3" className="fill-white"></circle>
            <path d="M42 40 Q50 46 58 40" className="stroke-white stroke-2" fill="none"></path>
          </svg>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold text-neutral-text mb-6"
        >
          Scale user acquisition{' '}
          <span className="text-secondary">you can measure.</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-neutral-text/80 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          I lead growth and partnerships for SaaS and content providers—plus aggregators/PSPs, telcos, and e-commerce—building compliant funnels, ARPU-aware budgeting, and creative systems that compound across MENA, EU, and APAC.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <Link href="/results">
            <Button variant="primary" size="lg">
              See Results
            </Button>
          </Link>
          <Link href="/case">
            <Button variant="primary" size="lg">
              View Cases
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="secondary" size="lg">
              Contact Me
            </Button>
          </Link>
        </motion.div>

        {/* Company Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center items-center gap-8 opacity-60"
        >
          <span className="text-neutral-text/40 font-semibold">Meta</span>
          <span className="text-neutral-text/40 font-semibold">Amazon</span>
          <span className="text-neutral-text/40 font-semibold">Netflix</span>
          <span className="text-neutral-text/40 font-semibold">Spotify</span>
          <span className="text-neutral-text/40 font-semibold">Stripe</span>
          <span className="text-neutral-text/40 font-semibold">Shopify</span>
          <span className="text-neutral-text/40 font-semibold">Microsoft</span>
          <span className="text-neutral-text/40 font-semibold">Google</span>
        </motion.div>
      </div>
    </section>
  );
}
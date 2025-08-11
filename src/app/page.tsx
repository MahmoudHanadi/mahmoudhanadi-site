"use client";

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Hero from '@/components/Hero';
import resultsData from '../../content/results.json';

// Types for imported data
type Result = {
  slug: string;
  title: string;
  context: string;
  approach: string;
  outcome: string;
  toolkit: string[];
  type: string;
};

export default function Home() {
  // Grab top three results for the proof section
  const topResults: Result[] = useMemo(() => {
    const all = resultsData as Result[];
    return all.slice(0, 3);
  }, []);

  // Pillars describing the different service areas. Each card holds a title
  // and a description. Additional examples can be added later or displayed
  // dynamically. We animate on scroll using framer‑motion variants below.
  const pillars = [
    {
      title: 'Business Development & Partnerships',
      description:
        'Open doors, align incentives and create win‑win deals that unlock new revenue streams.',
    },
    {
      title: 'Google Media Buying & User Acquisition',
      description:
        'Drive high‑ARPU acquisition through creative and feed iteration, segmentation and optimization.',
    },
    {
      title: 'Product Management (MVP → OKRs)',
      description:
        'Ship fast, learn faster and scale what works. From idea to MVP to measurable OKRs.',
    },
    {
      title: 'Go‑to‑Market Strategy',
      description:
        'Positioning, offers and channels that convert. Launch with confidence and clarity.',
    },
    {
      title: 'Process & Operations',
      description:
        'Automate workflows, ensure compliance and build the processes that underpin sustainable growth.',
    },
  ];

  // Animation variants for staggering children on scroll
  const stagger = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.08, duration: 0.4, ease: 'easeOut' },
    },
  };
  const cardVariant = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <>
      {/* Hero section with animated gradient and mascot */}
      <Hero />
      {/* Pillars section */}
      <section className="mt-16 max-w-6xl mx-auto px-4 md:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {pillars.map((pillar) => (
            <motion.div
              key={pillar.title}
              variants={cardVariant}
              className="p-6 rounded-2xl bg-white/60 dark:bg-gray-900/60 backdrop-blur border border-gray-200 dark:border-gray-800 shadow-sm hover:-translate-y-1 hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                {pillar.title}
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>
      {/* Proof / results teasers */}
      <section className="mt-20 max-w-6xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Recent Wins</h2>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="grid gap-6 md:grid-cols-3"
        >
          {topResults.map((item) => (
            <motion.div
              key={item.slug}
              variants={cardVariant}
              className="p-6 rounded-2xl bg-white/60 dark:bg-gray-900/60 backdrop-blur border border-gray-200 dark:border-gray-800 shadow-sm hover:-translate-y-1 hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold mb-1 text-olive dark:text-olive">
                {item.title}
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                <strong>Context:</strong> {item.context}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                <strong>Outcome:</strong> {item.outcome}
              </p>
              <Link
                href={`/case/${item.slug}`}
                className="text-sm text-keffiyeh-red hover:underline"
              >
                Read case →
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>
      {/* Mini bio and call to action */}
      <section className="mt-20 max-w-4xl mx-auto px-4 md:px-8 text-center space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">About Mahmoud</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          With over eight years across content subscriptions and e‑commerce, I’ve built
          partnerships, scaled UA and launched products from scratch. I speak three
          languages (EN/AR/HE) and split my time between Debrecen and Amsterdam.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          If you found me via LinkedIn, start by exploring the results or drop
          me a challenge via Ask Mahmoud. I’d love to learn what you’re building.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/results">
            <span className="inline-block px-6 py-3 rounded-full bg-olive text-white shadow hover:bg-olive/80 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-olive">
              See More Results
            </span>
          </Link>
          <Link href="/ask">
            <span className="inline-block px-6 py-3 rounded-full bg-keffiyeh-red text-white shadow hover:bg-keffiyeh-red/80 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-keffiyeh-red">
              Ask Mahmoud
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
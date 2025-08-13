"use client";

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Hero from '@/components/Hero';
import StatsGrid, { type Metric } from '@/components/StatsGrid';
import metrics from '../../content/metrics.json';
import LogoTicker from '@/components/LogoTicker';
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

// Animated Counter Component
// Removed unused AnimatedCounter to satisfy lint rules

// Animated Emoji Component
function AnimatedEmoji({ emoji, className = '' }: { emoji: string; className?: string }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const getEmojiAnimation = (emoji: string) => {
    switch (emoji) {
      case '🤝':
        return { rotate: isHovered ? [0, -10, 10, 0] : 0, scale: isHovered ? 1.2 : 1 };
      case '📈':
        return { y: isHovered ? -5 : 0, scale: isHovered ? 1.1 : 1 };
      case '🎯':
        return { rotate: isHovered ? [0, 5, -5, 0] : 0, scale: isHovered ? 1.1 : 1 };
      case '🚀':
        return { y: isHovered ? -8 : 0, scale: isHovered ? 1.2 : 1 };
      case '🇭🇺':
        return { rotate: isHovered ? [0, 5, -5, 0] : 0, scale: isHovered ? 1.1 : 1 };
      case '🇳🇱':
        return { rotate: isHovered ? [0, -5, 5, 0] : 0, scale: isHovered ? 1.1 : 1 };
      case '🧆':
        // Subtle, airy hover animation for the Mr Hummus emoji
        return { y: isHovered ? -4 : 0, rotate: isHovered ? [0, -3, 3, 0] : 0, scale: isHovered ? 1.08 : 1 };
      default:
        return { scale: isHovered ? 1.1 : 1 };
    }
  };

  return (
    <motion.span
      className={className}
      animate={getEmojiAnimation(emoji)}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ cursor: 'pointer' }}
    >
      {emoji}
    </motion.span>
  );
}

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
      title: 'Business Dev & Partnerships',
      description:
        'Structure win-win agreements with carriers, PSPs, and key partners to unlock and sustain revenue across MENA, EU, APAC, and North America.',
      icon: '🤝',
    },
    {
      title: 'Growth Strategy',
      description:
        'Prioritize for ARPU/LTV, test systematically, and budget by cohort quality—not vibes. Decision gates in weeks 1–2; double-down within 1–2 months when ROI is healthy.',
      icon: '📈',
    },
    {
      title: 'User Acquisition',
      description:
        'Google Ads (Search/Display/YouTube/PMax) and social (Meta, TikTok), plus popular POP & PUSH DSPs. Data integrity and policy-safe execution over everything.',
      icon: '🎯',
    },
    {
      title: 'GTM Strategy',
      description:
        'Playbooks, approvals, and localization to go-to-market in ~2 months in MENA—connecting gateways and navigating regulatory + technical requirements.',
      icon: '🚀',
    },
  ];

  // Stats summarising recent accomplishments. Each stat includes a value, label and category
  // to signal which pillar it relates to. These can be updated as more results are added.
  // Removed unused stats to satisfy lint rules

  // Enhanced animation variants for staggering children on scroll
  const stagger = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.08, duration: 0.4, ease: 'easeOut' },
    },
  };
  
  const cardVariant = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.5, 
        ease: 'easeOut',
        type: "spring",
        stiffness: 100
      }
    },
  };

  // Removed unused statsVariant to satisfy lint rules

  return (
    <>
      {/* Hero section with animated gradient and mascot */}
      <Hero />
      {/* Moving logo ticker */}
      <section className="mt-10">
        <LogoTicker />
      </section>
      {/* Pillars section */}
      <section className="mt-16 max-w-6xl mx-auto px-4 md:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {pillars.map((pillar) => (
            <motion.div
              key={pillar.title}
              variants={cardVariant}
              className="p-6 rounded-2xl bg-white/70 dark:bg-gray-900/70 backdrop-blur border border-gray-200 dark:border-gray-800 shadow-sm hover:-translate-y-2 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-4xl mb-3 flex justify-center">
                <AnimatedEmoji emoji={pillar.icon} />
              </div>
              <h3 className="text-xl font-semibold mb-1 text-gray-900 dark:text-gray-100">
                {pillar.title}
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>
      {/* KPI metrics from CV */}
      <StatsGrid items={metrics as unknown as Metric[]} />
      <motion.p 
        className="mt-4 text-sm text-gray-700 dark:text-gray-300 text-center"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Based in Debrecen <AnimatedEmoji emoji="🇭🇺" /> and Amsterdam <AnimatedEmoji emoji="🇳🇱" />
      </motion.p>
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
        <p className="text-base text-gray-600 dark:text-gray-400 italic mb-4">
          AKA <span className="font-semibold text-olive">Mr Hummus</span> <AnimatedEmoji emoji="🧆" className="inline-block align-[-2px]" />
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          I’m a growth operator focused on building compliant, compounding systems. For 8+ years across SaaS, content subscriptions, and e-commerce, I’ve turned fuzzy goals into playbooks, policy-safe campaigns, and repeatable results—from first launch to scale.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          I work across MENA, EU, and APAC, speak EN/AR/HE, and split my time between Debrecen and Amsterdam. My edge: align partners and cross-functional teams, pass Google/carrier checks, stand up a data spine (ARPU/LTV with cohort views), and double-down within 1–2 months when the numbers prove out. In MENA, I routinely get GTM live in ~2 months by navigating gateways, regulators, and local creative rules.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Found me via LinkedIn? Start with the Results—or drop me a challenge via Ask Mahmoud.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Why “Mr Hummus”? The nickname stuck after I kept showing up to team meetups with homemade hummus—then clients and industry friends picked it up. It’s a small signal of how I work: experiment, share, iterate—then scale what wins.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Need a steady hand on growth and profit-first ideas? Contact me and let’s get your next inflection point on the calendar.
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
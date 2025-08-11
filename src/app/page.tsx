"use client";

import { useMemo, useState, useEffect, useRef } from 'react';
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
function AnimatedCounter({ value, suffix = '', className = '' }: { value: number; suffix?: string; className?: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!hasAnimated) {
      setHasAnimated(true);
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [value, hasAnimated]);

  return (
    <span className={className}>
      {count}{suffix}
    </span>
  );
}

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
        'C-level relationships, aligned incentives, and long-term value creation across EU & MENA.',
      icon: '🤝',
    },
    {
      title: 'Growth Strategy',
      description:
        'Data-driven prioritization for ARPU/LTV, experimentation, and retention-led revenue.',
      icon: '📈',
    },
    {
      title: 'User Acquisition',
      description:
        'Google Ads (Display & PMax), creative/feed iteration, segmented campaigns, compliant ops.',
      icon: '🎯',
    },
    {
      title: 'GTM Strategy',
      description:
        'Positioning, offers, and channels that convert. Carrier billing playbooks, launch confidence.',
      icon: '🚀',
    },
  ];

  // Stats summarising recent accomplishments. Each stat includes a value, label and category
  // to signal which pillar it relates to. These can be updated as more results are added.
  const stats = [
    {
      label: 'Revenue growth',
      value: '',
      category: 'Growth',
      up: true,
      numericValue: 250,
      suffix: '+',
    },
    {
      label: 'Top 1 in active clients',
      value: 'generating ',
      category: 'Acquisition',
      up: true,
      numericValue: undefined as unknown as number, // display value text instead
      suffix: '',
    },
    {
      label: 'Reduction in CAC',
      value: '',
      category: 'Ops',
      up: true,
      numericValue: 45,
      suffix: '%',
    },
    {
      label: 'Satisfied clients',
      value: '',
      category: 'Delivery',
      up: true,
      numericValue: 90,
      suffix: '+',
    },
  ];

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

  const statsVariant = {
    hidden: { opacity: 0, y: 15, scale: 0.9 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: 'easeOut',
        type: "spring",
        stiffness: 80
      }
    },
  };

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
          AKA <span className="font-semibold text-olive">Mr Hummus</span> 🧆
        </p>
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
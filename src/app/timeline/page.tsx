"use client";

import { timeline } from '@/lib/timeline';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

// Timeline Item Interface - making it modular
interface TimelineItem {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  location: string;
  icon: string;
  achievements: string[];
}

// Timeline Navigation Component
function TimelineNavigation({ 
  items, 
  activeYear, 
  onYearSelect 
}: { 
  items: TimelineItem[]; 
  activeYear: string; 
  onYearSelect: (year: string) => void; 
}) {
  return (
    <motion.div 
      className="sticky top-20 z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur border-b border-gray-200 dark:border-gray-700 py-4 mb-12"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Jump to Year:
          </h3>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {items.map((item) => (
              <motion.button
                key={item.year}
                onClick={() => onYearSelect(item.year)}
                className={`px-4 py-2 rounded-full border-2 transition-all duration-300 whitespace-nowrap ${
                  activeYear === item.year
                    ? 'bg-olive text-white border-olive shadow-lg scale-105'
                    : 'bg-white/70 dark:bg-gray-800/70 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-olive/50 hover:bg-olive/10 dark:hover:bg-olive/20'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.year}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Individual Timeline Item Component
function TimelineItemComponent({ 
  item, 
  index, 
  totalItems 
}: { 
  item: TimelineItem; 
  index: number; 
  totalItems: number; 
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, scale }}
      className="relative"
    >
      {/* Vertical rail is now global; per-item connectors removed for a cleaner look */}
      
      {/* Timeline Item */}
      <div className="flex items-start space-x-8">
        {/* Year Badge */}
        <div className="flex-shrink-0">
          <motion.div 
            className="w-16 h-16 rounded-full bg-gradient-to-br from-olive to-emerald-500 flex items-center justify-center text-white font-bold text-lg shadow-lg"
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            {item.year}
          </motion.div>
        </div>

        {/* Content Card */}
        <motion.div 
          className="flex-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <motion.div 
                className="text-4xl mb-2"
                whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                {item.icon}
              </motion.div>
              <motion.h2 
                className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {item.title}
              </motion.h2>
              <motion.p 
                className="text-lg text-olive dark:text-olive font-medium mb-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {item.subtitle}
              </motion.p>
              <motion.p 
                className="text-sm text-gray-500 dark:text-gray-400"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                📍 {item.location}
              </motion.p>
            </div>
          </div>

          {/* Description */}
          <motion.p 
            className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {item.description}
          </motion.p>

          {/* Achievements */}
          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm uppercase tracking-wide">
              Key Achievements
            </h4>
            <ul className="space-y-1">
              {item.achievements.map((achievement, idx) => (
                <motion.li 
                  key={idx}
                  className="flex items-center text-gray-600 dark:text-gray-400 text-sm"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 + (idx * 0.1) }}
                >
                  <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></span>
                  {achievement}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function TimelinePage() {
  const [activeYear, setActiveYear] = useState('2015');

  // Enhanced timeline data with more narrative content - MODULAR STRUCTURE
  const enhancedTimeline: TimelineItem[] = [
    {
      year: '2015',
      title: 'The Digital Awakening',
      subtitle: 'Where it all began...',
      description: 'Picture this: a young professional stepping into the vast digital landscape, armed with nothing but curiosity and a hunger for growth. This was the year I launched my first subscription product, a humble beginning that would set the foundation for everything to come.',
      location: 'Tel Aviv, Israel',
      icon: '🌱',
      achievements: ['First subscription product launched', 'Learned fundamentals of digital acquisition', 'Discovered the power of data-driven decisions']
    },
    {
      year: '2018',
      title: 'The Partnership Pioneer',
      subtitle: 'Building bridges across borders...',
      description: 'Three years later, the landscape had changed dramatically. I found myself negotiating deals with telecom operators and payment providers across EMEA, learning that success in business isn\'t just about numbers—it\'s about building lasting relationships.',
      location: 'Amsterdam, Netherlands',
      icon: '🤝',
      achievements: ['EMEA telecom partnerships', 'Payment provider negotiations', 'Cross-border deal structuring']
    },
    {
      year: '2020',
      title: 'The GTM Maestro',
      subtitle: 'When strategy meets execution...',
      description: 'Ah, 2020—the year that changed everything. While the world was adapting to new realities, I was leading GTM strategy for a groundbreaking new product. It was here that I truly understood the art of launching with confidence and clarity.',
      location: 'Debrecen, Hungary',
      icon: '🚀',
      achievements: ['GTM strategy definition', 'Multi-market product launch', 'Market entry execution']
    },
    {
      year: '2023',
      title: 'The Scale Architect',
      subtitle: 'Where creativity meets performance...',
      description: 'By 2023, I had learned that true growth isn\'t just about acquiring users—it\'s about acquiring the right users. I implemented a creative testing programme that didn\'t just improve performance—it doubled ROAS, proving that innovation and data can dance beautifully together.',
      location: 'Amsterdam, Netherlands',
      icon: '📈',
      achievements: ['Creative testing programme', 'ROAS doubled', 'Performance optimization mastery']
    },
    {
      year: '2025',
      title: 'The Future Builder',
      subtitle: 'Building tomorrow, today...',
      description: 'And here we are, at the present moment. I\'ve evolved from a digital growth specialist to a product and operations leader, building process automation and compliance frameworks while managing cross-functional teams. The journey continues, and the best is yet to come.',
      location: 'Global',
      icon: '🔮',
      achievements: ['Process automation', 'Compliance frameworks', 'Cross-functional leadership']
    }
  ];

  // Function to scroll to specific year
  const scrollToYear = (year: string) => {
    setActiveYear(year);
    const element = document.getElementById(`timeline-${year}`);
    if (element) {
      // Rely on CSS scroll-margin-top for accurate positioning below sticky headers
      element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
  };

  // Update active year based on scroll position for a more professional nav UX
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-year]'));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry that is closest to the top and intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top));
        const topMost = visible[0];
        if (topMost) {
          const year = topMost.target.getAttribute('data-year');
          if (year) setActiveYear(year);
        }
      },
      {
        // Account for sticky header + sticky year nav
        root: null,
        rootMargin: '-180px 0px -60% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-olive/10 via-transparent to-keffiyeh-red/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            A Journey Through Time
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Take a stroll with me down memory lane, as we explore the pivotal moments that shaped my professional evolution. 
            From humble beginnings to strategic leadership—this is the story of growth, adaptation, and relentless pursuit of excellence.
          </motion.p>
          <motion.div 
            className="mt-8 text-6xl"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            🚶‍♂️✨
          </motion.div>
        </div>
      </div>

      {/* Timeline Navigation Bar */}
      <TimelineNavigation 
        items={enhancedTimeline}
        activeYear={activeYear}
        onYearSelect={scrollToYear}
      />

      {/* Timeline Section */}
      <div className="max-w-5xl mx-auto px-4 pb-16">
        <div className="relative">
          {/* Continuous vertical rail */}
          <div
            aria-hidden
            className="absolute left-8 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-olive/50 via-gray-300/40 to-keffiyeh-red/50 dark:from-olive/60 dark:via-gray-600/40 dark:to-keffiyeh-red/60"
          />
          <div className="space-y-16">
            {enhancedTimeline.map((item, index) => (
              <div
                key={item.year}
                id={`timeline-${item.year}`}
                data-year={item.year}
                className="scroll-mt-[160px] md:scroll-mt-[180px]"
              >
                <TimelineItemComponent
                  item={item}
                  index={index}
                  totalItems={enhancedTimeline.length}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Closing Message */}
        <motion.div 
          className="text-center mt-20 p-8 bg-gradient-to-r from-olive/10 to-keffiyeh-red/10 rounded-3xl border border-olive/20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            The Journey Continues...
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
            Every milestone reached is just a stepping stone to the next adventure. 
            The digital landscape is ever-evolving, and so am I. Ready to write the next chapter together?
          </p>
          <div className="mt-6 text-4xl">
            🚀💫
          </div>
        </motion.div>
      </div>
    </div>
  );
}
"use client";

import React from 'react';
import { motion } from 'framer-motion';

type LogoTickerProps = {
  logos?: Array<{ label: string; emoji?: string }>; // emoji optional placeholder if no image assets
  speedMs?: number; // full loop duration
};

const DEFAULT_LOGOS: Array<{ label: string; emoji?: string }> = [
  { label: 'Google', emoji: '🔍' },
  { label: 'Meta', emoji: '📱' },
  { label: 'Amazon', emoji: '🛒' },
  { label: 'Netflix', emoji: '🎬' },
  { label: 'Spotify', emoji: '🎵' },
  { label: 'Stripe', emoji: '💳' },
  { label: 'Shopify', emoji: '🏬' },
  { label: 'Microsoft', emoji: '🪟' },
];

export default function LogoTicker({ logos = DEFAULT_LOGOS, speedMs = 20000 }: LogoTickerProps) {
  // Duplicate list for seamless loop
  const items = [...logos, ...logos];

  return (
    <div className="relative select-none" aria-label="Trusted by companies">
      {/* Edge fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white dark:from-gray-900 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white dark:from-gray-900 to-transparent" />

      <div className="overflow-hidden py-6">
        <motion.div
          className="flex items-center gap-8 ticker-track"
          aria-hidden
          initial={{ x: 0 }}
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: speedMs / 1000, ease: 'linear', repeat: Infinity }}
        >
          {items.map((logo, idx) => (
            <div
              key={`${logo.label}-${idx}`}
              className="flex items-center gap-3 whitespace-nowrap px-2"
            >
              <div className="text-xl" aria-hidden>{logo.emoji ?? '⭐'}</div>
              <span className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-300">
                {logo.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

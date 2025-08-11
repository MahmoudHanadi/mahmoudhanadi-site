"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { trackHeroCta } from '@/lib/analytics';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-8">
      <motion.h1
        className="text-4xl md:text-6xl font-bold max-w-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        From vision to measurable results — leadership, strategy, and execution.
      </motion.h1>
      <div className="flex space-x-4">
        <Link href="/results">
          <button
            onClick={() => trackHeroCta('see_results')}
            className="px-6 py-3 rounded-full bg-olive text-white shadow hover:bg-olive/80 transition"
          >
            See Results
          </button>
        </Link>
        <Link href="/ask">
          <button
            onClick={() => trackHeroCta('solve_problem')}
            className="px-6 py-3 rounded-full bg-keffiyeh-red text-white shadow hover:bg-keffiyeh-red/80 transition"
          >
            Solve a Problem
          </button>
        </Link>
      </div>
    </div>
  );
}
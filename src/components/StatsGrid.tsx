"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { trackMetricClick } from "@/lib/analytics";

export type Metric = {
  slug: string;
  title: string;
  display: string; // show as-is, numeric or label
  value: [number, number];
  unit: string;
  trend: "up" | "flat" | "down";
  category: string;
  note?: string;
};

const fade = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.24 } },
};

const trendStyles: Record<Metric["trend"], string> = {
  up: "text-emerald-600 dark:text-emerald-400",
  flat: "text-gray-500 dark:text-gray-400",
  down: "text-red-600 dark:text-red-400",
};

const trendSymbol: Record<Metric["trend"], string> = {
  up: "↑",
  flat: "→",
  down: "↓",
};

export default function StatsGrid({ items }: { items: Metric[] }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="mt-16 max-w-6xl mx-auto px-4 md:px-8" aria-label="Key performance indicators">
      <motion.div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        variants={fade}
        initial={prefersReducedMotion ? undefined : "hidden"}
        whileInView={prefersReducedMotion ? undefined : "show"}
        viewport={{ once: true, amount: 0.2 }}
      >
        {items.map((m) => (
          <motion.article
            key={m.slug}
            className="relative p-5 rounded-2xl bg-white/70 dark:bg-gray-900/70 backdrop-blur border border-gray-200 dark:border-gray-800 shadow-sm focus-within:ring-2 focus-within:ring-olive"
            variants={fade}
          >
            {/* Gradient corner */}
            <div aria-hidden className="pointer-events-none absolute -top-1 -right-1 h-16 w-16 bg-gradient-to-br from-olive/20 via-teal/20 to-sand/20 rounded-tl-3xl blur" />

            <div className="flex items-baseline justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {m.title}
              </h3>
              <span className={`text-sm font-medium ${trendStyles[m.trend]}`} aria-label={`trend ${m.trend}`}>
                {trendSymbol[m.trend]}
              </span>
            </div>

            <div className="mb-1 text-3xl font-bold text-olive dark:text-olive">
              {m.display}
            </div>
            {m.note && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{m.note}</p>
            )}
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">{m.category}</span>
              <Link
                href={`/case/${m.slug}`}
                className="text-sm text-keffiyeh-red hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-keffiyeh-red rounded"
                onClick={() => trackMetricClick(m.slug)}
              >
                View details →
              </Link>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

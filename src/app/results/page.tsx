"use client";

import { useState } from 'react';
import Link from 'next/link';
import { trackResultsCardOpen } from '@/lib/analytics';
import resultsData from '../../../content/results.json';

type Result = {
  slug: string;
  title: string;
  context: string;
  approach: string;
  outcome: string;
  toolkit: string[];
  type: string;
};

export default function ResultsPage() {
  const results: Result[] = resultsData as unknown as Result[];
  const [filter, setFilter] = useState<string>('All');
  const types = Array.from(new Set(results.map((r) => r.type)));

  const filtered = filter === 'All' ? results : results.filter((r) => r.type === filter);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">Results</h1>
      <p className="text-gray-700 dark:text-gray-300 max-w-3xl">
        Explore anonymized examples of measurable outcomes across growth, acquisition,
        GTM and operations. Filter the gallery by outcome type to zero in on what
        matters most to you.
      </p>
      <div className="flex flex-wrap gap-3 mt-2">
        <button
          onClick={() => setFilter('All')}
          className={`px-4 py-2 rounded-full border transition focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            filter === 'All'
              ? 'bg-olive text-white border-olive'
              : 'bg-white/70 dark:bg-gray-900/40 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-olive/10 dark:hover:bg-olive/20'
          }`}
        >
          All
        </button>
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-4 py-2 rounded-full border transition focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              filter === t
                ? 'bg-olive text-white border-olive'
                : 'bg-white/70 dark:bg-gray-900/40 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-olive/10 dark:hover:bg-olive/20'
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <Link key={item.slug} href={`/case/${item.slug}`}> 
            <div
              onClick={() => trackResultsCardOpen(item.slug)}
              className="p-6 rounded-2xl bg-white/70 dark:bg-gray-900/70 backdrop-blur border border-gray-200 dark:border-gray-800 shadow-sm hover:-translate-y-1 hover:shadow-md transition cursor-pointer focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-olive"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{item.title}</h2>
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{item.type}</span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                {item.context}
              </p>
              <p className="text-2xl font-bold text-olive dark:text-olive mb-2">
                {item.outcome}
              </p>
              <div className="flex flex-wrap gap-2">
                {item.toolkit.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-full bg-sand/80 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
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
  const results: Result[] = resultsData as any;
  const [filter, setFilter] = useState<string>('All');
  const types = Array.from(new Set(results.map((r) => r.type)));

  const filtered =
    filter === 'All' ? results : results.filter((r) => r.type === filter);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Results</h1>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setFilter('All')}
          className={`px-3 py-1 rounded-full border ${filter === 'All' ? 'bg-olive text-white' : 'text-gray-700 dark:text-gray-200'}`}
        >
          All
        </button>
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-3 py-1 rounded-full border ${filter === t ? 'bg-olive text-white' : 'text-gray-700 dark:text-gray-200'}`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <Link key={item.slug} href={`/case/${item.slug}`}>
            <div
              onClick={() => trackResultsCardOpen(item.slug)}
              className="p-6 rounded-2xl shadow hover:-translate-y-1 transition transform bg-white dark:bg-gray-900 border dark:border-gray-800 cursor-pointer"
            >
              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                <strong>Context:</strong> {item.context}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                <strong>Approach:</strong> {item.approach}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Outcome:</strong> {item.outcome}
              </p>
              <div className="mt-3 flex flex-wrap gap-1">
                {item.toolkit.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-full bg-sand text-gray-800 dark:bg-gray-800 dark:text-gray-200"
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
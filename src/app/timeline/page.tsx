"use client";

import { timeline } from '@/lib/timeline';
import { useState } from 'react';

export default function TimelinePage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
        Journey &amp; Milestones
      </h1>
      <p className="text-gray-700 dark:text-gray-300 max-w-3xl">
        A snapshot of my professional milestones over the years. Tap a year to see
        what happened.
      </p>
      <div className="overflow-x-auto pb-4">
        <ul className="flex gap-4 min-w-max">
          {timeline.map((item, idx) => (
            <li key={item.year} className="relative">
              <button
                className={`px-4 py-2 rounded-full border transition focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  openIndex === idx
                    ? 'bg-olive text-white border-olive'
                    : 'bg-white/70 dark:bg-gray-900/40 border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-300 hover:bg-olive/10 dark:hover:bg-olive/20'
                }`}
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                {item.year}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {openIndex !== null && (
        <div className="p-6 rounded-2xl bg-white/60 dark:bg-gray-900/60 backdrop-blur border border-gray-200 dark:border-gray-800 max-w-3xl mx-auto shadow-sm">
          <h2 className="text-xl font-semibold mb-2 text-olive dark:text-olive">
            {timeline[openIndex].title}
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            {timeline[openIndex].description}
          </p>
        </div>
      )}
    </div>
  );
}
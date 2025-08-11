"use client";

import { timeline } from '@/lib/timeline';
import { useState } from 'react';

export default function TimelinePage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Timeline</h1>
      <div className="overflow-x-auto pb-4">
        <ul className="flex space-x-6 min-w-max">
          {timeline.map((item, idx) => (
            <li key={item.year} className="relative">
              <button
                className={`px-4 py-2 rounded-full border ${
                  openIndex === idx ? 'bg-olive text-white' : 'bg-sand text-gray-800 dark:bg-gray-800 dark:text-gray-100'
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
        <div className="p-6 rounded-xl bg-sand dark:bg-gray-800 max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold">{timeline[openIndex].title}</h2>
          <p className="mt-2 text-gray-700 dark:text-gray-300">{timeline[openIndex].description}</p>
        </div>
      )}
    </div>
  );
}
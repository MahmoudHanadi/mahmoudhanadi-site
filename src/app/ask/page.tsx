"use client";

import { useState } from 'react';
import { trackAskSubmit, trackStrategyDownload } from '@/lib/analytics';

interface ResponseData {
  goalRecap: string;
  leadershipPlan: string;
  handsOnSteps: string;
  risks: string;
  roadmap: string;
  cites: string[];
}

const categories = [
  { label: 'Business Development', value: 'business' },
  { label: 'Google Ads/UA', value: 'acquisition' },
  { label: 'Product', value: 'product' },
  { label: 'GTM', value: 'gtm' },
  { label: 'Ops', value: 'ops' },
];

export default function AskPage() {
  const [goal, setGoal] = useState('');
  const [selected, setSelected] = useState(categories[0].value);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ResponseData | null>(null);

  async function handleSubmit() {
    if (!goal) return;
    setLoading(true);
    trackAskSubmit(selected);
    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goal, category: selected }),
      });
      const json = await res.json();
      if (json.success) {
        setResponse(json.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function handleDownload() {
    if (!response) return;
    const content = `Goal Recap:\n${response.goalRecap}\n\nLeadership Plan:\n${response.leadershipPlan}\n\nHands‑On Steps:\n${response.handsOnSteps}\n\nRisks & Mitigations:\n${response.risks}\n\n90‑Day Roadmap:\n${response.roadmap}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'strategy.txt';
    a.click();
    URL.revokeObjectURL(url);
    trackStrategyDownload();
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
        Ask Mahmoud
      </h1>
      <p className="text-gray-700 dark:text-gray-300 max-w-3xl">
        Share your goal or problem and get a concise, actionable plan. Choose the
        area you’re focused on and let’s get started.
      </p>
      <div>
        <label htmlFor="goal" className="block mb-2 font-medium text-gray-900 dark:text-gray-100">
          Describe your goal or challenge
        </label>
        <textarea
          id="goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-900/60 backdrop-blur focus:outline-none focus:ring-2 focus:ring-olive"
          rows={5}
          placeholder="E.g. double our ARPU in Q3 across EMEA markets"
        />
      </div>
      <div className="flex flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelected(cat.value)}
            className={`px-4 py-2 rounded-full border text-sm transition focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              selected === cat.value
                ? 'bg-olive text-white border-olive'
                : 'bg-white/70 dark:bg-gray-900/40 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-olive/10 dark:hover:bg-olive/20'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        disabled={loading || !goal}
        className="px-8 py-3 rounded-full bg-keffiyeh-red text-white shadow disabled:opacity-50 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-keffiyeh-red"
      >
        {loading ? 'Generating…' : 'Generate Plan'}
      </button>

      {response && (
        <div className="space-y-6 mt-10 p-6 rounded-2xl bg-white/60 dark:bg-gray-900/60 backdrop-blur border border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Strategy Plan
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div>
              <h3 className="font-semibold text-olive dark:text-olive">Goal Recap</h3>
              <p>{response.goalRecap}</p>
            </div>
            <div>
              <h3 className="font-semibold text-olive dark:text-olive">Leadership Plan</h3>
              <p>{response.leadershipPlan}</p>
            </div>
            <div>
              <h3 className="font-semibold text-olive dark:text-olive">Hands‑On Steps</h3>
              <p>{response.handsOnSteps}</p>
            </div>
            <div>
              <h3 className="font-semibold text-olive dark:text-olive">Risks &amp; Mitigations</h3>
              <p>{response.risks}</p>
            </div>
            <div>
              <h3 className="font-semibold text-olive dark:text-olive">90‑Day Roadmap</h3>
              <p>{response.roadmap}</p>
            </div>
            {response.cites && response.cites.length > 0 && (
              <div>
                <h3 className="font-semibold text-olive dark:text-olive">Related Cases</h3>
                <ul className="list-disc list-inside">
                  {response.cites.map((slug) => (
                    <li key={slug}>
                      <a href={`/case/${slug}`} className="underline text-keffiyeh-red">
                        {slug}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={handleDownload}
              className="px-4 py-2 rounded-full bg-olive text-white shadow hover:bg-olive/80 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-olive"
            >
              Download as TXT
            </button>
            <button
              onClick={() => alert('Email feature coming soon')}
              className="px-4 py-2 rounded-full bg-gray-500 text-white shadow hover:bg-gray-600 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Email me this
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
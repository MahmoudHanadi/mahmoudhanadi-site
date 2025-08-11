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
    <div className="space-y-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">Ask Mahmoud</h1>
      <div>
        <label htmlFor="goal" className="block mb-1 font-medium">
          Describe your goal or problem
        </label>
        <textarea
          id="goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="w-full p-3 border rounded-md bg-transparent"
          rows={4}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelected(cat.value)}
            className={`px-3 py-1 rounded-full border text-sm ${
              selected === cat.value ? 'bg-olive text-white' : 'text-gray-700 dark:text-gray-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        disabled={loading || !goal}
        className="px-6 py-3 rounded-full bg-keffiyeh-red text-white shadow disabled:opacity-50"
      >
        {loading ? 'Generating…' : 'Generate Plan'}
      </button>

      {response && (
        <div className="space-y-4 mt-8 bg-sand dark:bg-gray-800 p-6 rounded-xl">
          <h2 className="text-2xl font-semibold mb-2">Strategy Plan</h2>
          <div>
            <h3 className="font-semibold">Goal Recap</h3>
            <p>{response.goalRecap}</p>
          </div>
          <div>
            <h3 className="font-semibold">Leadership Plan</h3>
            <p>{response.leadershipPlan}</p>
          </div>
          <div>
            <h3 className="font-semibold">Hands‑On Steps</h3>
            <p>{response.handsOnSteps}</p>
          </div>
          <div>
            <h3 className="font-semibold">Risks & Mitigations</h3>
            <p>{response.risks}</p>
          </div>
          <div>
            <h3 className="font-semibold">90‑Day Roadmap</h3>
            <p>{response.roadmap}</p>
          </div>
          {response.cites && response.cites.length > 0 && (
            <div>
              <h3 className="font-semibold">Related Cases</h3>
              <ul className="list-disc list-inside">
                {response.cites.map((slug) => (
                  <li key={slug}>
                    <a href={`/case/${slug}`} className="underline">
                      {slug}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleDownload}
              className="px-4 py-2 rounded-full bg-olive text-white shadow"
            >
              Download as TXT
            </button>
            <button
              onClick={() => alert('Email feature coming soon')}
              className="px-4 py-2 rounded-full bg-gray-500 text-white shadow"
            >
              Email me this
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
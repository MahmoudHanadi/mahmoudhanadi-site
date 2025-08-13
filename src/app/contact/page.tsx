"use client";

import { useState } from 'react';
import { trackContactSubmit } from '@/lib/analytics';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      const json = await res.json();
      if (json.success) {
        setStatus('success');
        trackContactSubmit();
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error('Contact form submit error', err);
      setStatus('error');
    }
  }

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
        Get in Touch
      </h1>
      <p className="text-gray-700 dark:text-gray-300 max-w-2xl">
        Have a question or want to discuss a challenge? Send me a message and I’ll
        reply within 48 hours.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-2 font-medium text-gray-900 dark:text-gray-100">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-900/60 backdrop-blur focus:outline-none focus:ring-2 focus:ring-olive"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-2 font-medium text-gray-900 dark:text-gray-100">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-900/60 backdrop-blur focus:outline-none focus:ring-2 focus:ring-olive"
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="block mb-2 font-medium text-gray-900 dark:text-gray-100">
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-900/60 backdrop-blur focus:outline-none focus:ring-2 focus:ring-olive"
            required
            placeholder="Tell me a bit about what you’re working on…"
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-8 py-3 rounded-full bg-keffiyeh-red text-white shadow disabled:opacity-50 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-keffiyeh-red"
        >
          {status === 'loading' ? 'Sending…' : 'Send Message'}
        </button>
        {status === 'success' && (
          <p className="text-green-600 dark:text-green-500 mt-2">
            Thank you! I will get back to you soon.
          </p>
        )}
        {status === 'error' && (
          <p className="text-red-600 dark:text-red-500 mt-2">
            Something went wrong. Please try again.
          </p>
        )}
      </form>
    </div>
  );
}
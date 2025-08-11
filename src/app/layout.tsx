import './globals.css';
import { Inter } from 'next/font/google';
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Mahmoud Hanadi – Results‑first growth & product leader',
  description: 'From vision to measurable results — leadership, strategy, and execution.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1 p-4 md:p-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
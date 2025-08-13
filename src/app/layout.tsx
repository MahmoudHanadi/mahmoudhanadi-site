import './globals.css';
import { Inter } from 'next/font/google';
import React from 'react';
import NavBar from '../components/NavBar';
import SiteFooter from '../components/SiteFooter';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Mahmoud Hanadi – Results‑first growth & product leader',
  description: 'From vision to measurable results — leadership, strategy, and execution.',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
  },
  manifest: '/manifest.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col`}
      >
        {/* Global navigation */}
        <NavBar />
        <main className="flex-1 px-4 md:px-8 py-6 md:py-10">{children}</main>
        {/* Global footer */}
        <SiteFooter />
      </body>
    </html>
  );
}
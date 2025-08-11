import Link from 'next/link';

export default function Header() {
  return (
    <header className="p-4 md:p-6 flex items-center justify-between">
      <Link href="/">
        <span className="font-bold text-xl">Mahmoud Hanadi</span>
      </Link>
      <nav className="space-x-4 text-sm">
        <Link href="/results" className="hover:underline">
          Results
        </Link>
        <Link href="/timeline" className="hover:underline">
          Timeline
        </Link>
        <Link href="/skills" className="hover:underline">
          Skills
        </Link>
        <Link href="/ask" className="hover:underline">
          Ask
        </Link>
        <Link href="/speaking" className="hover:underline">
          Speaking
        </Link>
        <Link href="/contact" className="hover:underline">
          Contact
        </Link>
      </nav>
    </header>
  );
}
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-neutral-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">MH</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-neutral-text">Mahmoud Hanadi</h1>
              <p className="text-sm text-neutral-text/70">• Growing •</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/results" className="text-gray-700 hover:text-primary transition-colors">
              Results
            </Link>
            <Link href="/case" className="text-gray-700 hover:text-primary transition-colors">
              Cases
            </Link>
            <Link href="/timeline" className="text-gray-700 hover:text-primary transition-colors">
              Timeline
            </Link>
            <Link href="/skills" className="text-gray-700 hover:text-primary transition-colors">
              Skills
            </Link>
            <Link href="/speaking" className="text-gray-700 hover:text-primary transition-colors">
              Speaking
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          {/* Remove the Ask button entirely */}
        </div>
      </div>
    </header>
  );
}
import Link from 'next/link';

export default function CasesPage() {
  return (
    <div className="min-h-screen bg-neutral-background">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-neutral-text mb-6">
            Case Studies
          </h1>
          <p className="text-xl text-neutral-text/80 max-w-3xl mx-auto leading-relaxed">
            Real results from real challenges. Explore how strategic thinking and execution 
            delivered measurable outcomes across different industries and markets.
          </p>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-accent-light rounded-2xl p-16 border border-accent/20">
            <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center mx-auto mb-8">
              <span className="text-4xl">🚀</span>
            </div>
            
            <h2 className="text-3xl font-bold text-neutral-text mb-6">
              Case Studies Coming Soon
            </h2>
            
            <p className="text-xl text-neutral-text/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              We&apos;re currently preparing detailed case studies showcasing real results and strategies. 
              These will include comprehensive breakdowns of challenges, solutions, and measurable outcomes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/results">
                <button className="px-8 py-4 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors shadow-brand hover:shadow-brand-lg">
                  View Results
                </button>
              </Link>
              <Link href="/contact">
                <button className="px-8 py-4 bg-secondary text-white rounded-full hover:bg-secondary-dark transition-colors shadow-brand hover:shadow-brand-lg">
                  Get in Touch
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-20 bg-neutral-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-neutral-text text-center mb-12">
            What to Expect
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-primary">📊</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-text mb-3">Detailed Analysis</h3>
              <p className="text-neutral-text/70">
                In-depth breakdowns of challenges, strategies, and implementation approaches.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-primary">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-text mb-3">Measurable Results</h3>
              <p className="text-neutral-text/70">
                Concrete metrics and outcomes that demonstrate the impact of strategic decisions.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-primary">💡</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-text mb-3">Actionable Insights</h3>
              <p className="text-neutral-text/70">
                Key learnings and strategies you can apply to your own business challenges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-neutral-text mb-6">
            Stay Updated
          </h2>
          <p className="text-xl text-neutral-text/80 mb-8">
            Be the first to know when new case studies are published.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contact">
              <button className="px-8 py-4 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors shadow-brand hover:shadow-brand-lg">
                Get Notified
              </button>
            </Link>
            <Link href="/results">
              <button className="px-8 py-4 bg-secondary text-white rounded-full hover:bg-secondary-dark transition-colors shadow-brand hover:shadow-brand-lg">
                View Results
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

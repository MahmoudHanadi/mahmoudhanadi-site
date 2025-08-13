/**
 * Analytics helper for sending custom events to Plausible or other providers.
 *
 * This module exposes simple functions that components can call when
 * significant user actions occur. In production you should configure
 * PLAUSIBLE_DOMAIN via environment variables and include the Plausible
 * script in your _document file or RootLayout.
 */

type PlausibleProps = { props: Record<string, unknown> };
declare global {
  interface Window {
    plausible?: (event: string, options?: PlausibleProps) => void;
  }
}

/**
 * Fire a generic custom event
 */
export function trackEvent(event: string, props?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.plausible) {
    if (props) {
      window.plausible(event, { props });
    } else {
      window.plausible(event);
    }
  }
}

/**
 * Fire a hero CTA click event.
 */
export function trackHeroCta(cta: 'see_results' | 'solve_problem') {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible('hero_cta_click', { props: { cta } });
  }
}

export function trackResultsCardOpen(slug: string) {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible('results_card_open', { props: { slug } });
  }
}

export function trackAskSubmit(category: string) {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible('ask_submit', { props: { category } });
  }
}

export function trackStrategyDownload() {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible('strategy_download');
  }
}

export function trackContactSubmit() {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible('contact_submit');
  }
}

export function trackMetricClick(slug: string) {
  // Delegate to trackEvent when available; otherwise no-op
  if (typeof window !== 'undefined' && window.plausible) {
    trackEvent('home_metric_click', { slug });
  }
}
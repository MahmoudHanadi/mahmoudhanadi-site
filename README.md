# Mahmoud Hanadi – Results‑first growth & product leader

From vision to measurable results — leadership, strategy, and execution.

## Features

- **Results** – Case studies and measurable outcomes
- **Skills** – Core competencies and expertise areas  
- **Speaking** – Conference presentations and events
- **Timeline** – Professional journey and milestones
- **Contact** – Get in touch for opportunities

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS with custom color palette
- **Animations**: Framer Motion
- **Content**: MDX with gray-matter parsing
- **Deployment**: Vercel

## Development

```bash
npm install
npm run dev
```

## Content Structure

- `content/cases/` – Case study MDX files
- `content/results/` – Results showcase MDX files  
- `content/skills/` – Skills and expertise MDX files
- `content/speaking/` – Speaking engagements MDX files
- `content/metrics.json` – Key performance metrics
- `content/results.json` – Results data for dynamic pages
- `content/skills.json` – Skills data for dynamic pages

## Analytics

The site uses Plausible Analytics for privacy-focused tracking:

| Event | Description | Properties |
|-------|-------------|------------|
| `page_view` | Page view | `url`, `referrer` |
| `home_metric_click` | Metric clicked on homepage | `slug` |
| `strategy_download` | Strategy plan downloaded | None |

## Deployment

The site is automatically deployed to Vercel on push to the main branch.
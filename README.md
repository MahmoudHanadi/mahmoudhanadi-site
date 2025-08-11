# Mahmoud Hanadi – Results‑first Growth & Product Site

This repository contains the source code for **mahmoudhanadi.com**, a personal site for Mahmoud Hanadi, a business development and digital growth leader. The site is built with [Next.js](https://nextjs.org/) using the App Router, TypeScript, Tailwind CSS and Framer Motion. Content is authored in MDX for flexibility, and a minimal retrieval‑augmented generation (RAG) service powers the **Ask Mahmoud** feature.

## Philosophy

The design of the site follows a **results‑first** mindset: outcomes are the hero. AI is used internally as an enabler (e.g. to suggest strategies) but is not the headline. Visitors can browse anonymised case studies, explore Mahmoud’s skills and timeline, and ask for guidance on business, acquisition, product, go‑to‑market or operations challenges.

## Stack

- **Next.js 14** with the App Router for layouts and server components.
- **TypeScript** for type safety.
- **Tailwind CSS** for styling with a custom colour palette (olive, sand, keffiyeh red) and dark‑mode support.
- **Framer Motion** for subtle animations and hover interactions.
- **MDX** for content (results, cases, speaking). Data is stored under the `content/` folder.
- **Gray‑Matter** and **next-mdx-remote** for parsing and rendering MDX on the server.
- A minimal **RAG** implementation using OpenAI models (stubbed by default).
- **Plausible** analytics with custom events.

## Development

### Prerequisites

- Node.js >= 18
- npm >= 9

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/YOUR_USERNAME/mahmoudhanadi-site.git
   cd mahmoudhanadi-site
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env.local` and fill in your keys:

   ```bash
   cp .env.example .env.local
   # edit .env.local in your editor
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

The site will be available at `http://localhost:3000`.

### Content authoring

All content lives in the `content/` directory:

- `content/results/*.mdx` – short result cards with front‑matter (title, slug, context, approach, outcome, toolkit, type). These feed the **Results** gallery. A summary of the results used for filtering lives in `content/results.json`.
- `content/cases/*.mdx` – long‑form case studies referenced by results. Front‑matter may include `relatedResult` to link back.
- `content/speaking/*.mdx` – speaking engagements with date, location and description.
- `content/skills.json` – a JSON array listing skill pillars and example achievements.

To add a new result:

1. Create a new MDX file under `content/results/` with the required front‑matter.
2. Add a corresponding entry in `content/results.json` with the same slug.
3. (Optional) Create a detailed case study in `content/cases/` and set its `relatedResult` to the slug.

### How “Ask Mahmoud” works

The **Ask Mahmoud** feature accepts a free‑form goal description and a category (business development, acquisition, product, GTM or ops). On submit, the `/api/ask` route calls `lib/ai/rag.ts` which is designed to perform retrieval‑augmented generation:

1. Embed the MDX content and a short CV summary using the OpenAI embedding API (`text‑embedding‑3‑small`).
2. Find the most relevant documents based on the user’s goal and category.
3. Send a chat completion request to OpenAI’s `gpt‑4o‑mini` model with system prompts defined in `lib/ai/prompt‑templates.ts` (see `strategyTemplate` and `askSystem`).
4. Return structured sections: Goal Recap, Leadership Plan, Hands‑On Steps, Risks & Mitigations, 90‑Day Roadmap along with cited case slugs.

In this MVP the AI integration is stubbed. If `OPENAI_API_KEY` is set in `.env.local`, you can extend `lib/ai/rag.ts` to call the actual OpenAI endpoints.

### Deployment

This project is configured for deployment on [Vercel](https://vercel.com/). The workflow is:

1. Create a GitHub repository (e.g. `mahmoudhanadi-site`) and push this code.
2. In Vercel, import the repository and choose the **Next.js** framework preset.
3. Add environment variables defined in `.env.example` via the Vercel dashboard.
4. Click **Deploy** to build and publish. Vercel automatically provisions a preview URL and a production URL.
5. Map the domain `mahmoudhanadi.com` to the Vercel project. Add an A/ALIAS or CNAME record at your DNS provider as instructed by Vercel, and set up a redirect from `www` to the apex domain.

### Analytics events

Custom events are emitted via Plausible (see `lib/analytics.ts`). The following events are tracked:

| Event | Description | Properties |
|------|-------------|------------|
| `hero_cta_click` | User clicked a hero CTA on the home page | `cta`: `see_results` or `solve_problem` |
| `results_card_open` | A result card was opened | `slug`: slug of the card |
| `ask_submit` | The Ask form was submitted | `category`: selected category |
| `strategy_download` | User downloaded the generated strategy | – |
| `contact_submit` | Contact form submitted | – |

To analyse events, log into Plausible and filter by these custom events or forward them to your preferred analytics sink.

## Roadmap

See [ROADMAP.md](./ROADMAP.md) for planned improvements and features.

## Licence

This project is provided as‑is for demonstration purposes. Feel free to adapt it for your own needs.
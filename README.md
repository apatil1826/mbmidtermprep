# MB Midterm Prep

Interactive study tool for **BUSN 33401 — Money & Banking** (Chicago Booth, Prof. Kroszner).

Covers Weeks 1-4: financial fragility, bank runs, liquidity management, capital regulation, structural reform (Volcker/Vickers/Liikanen), the origin of money, digital currencies/CBDCs, and supply chain parallels.

## Features

- **Topic Dashboard** — 22 topics ranked by predicted exam importance (critical/high/medium), filterable by week and importance level
- **Topic Deep Dives** — each topic page includes plain-English summary, key definitions, what each reading contributes, points of agreement/disagreement across authors, connected topics, and exam strategy
- **Concept Connections** — visual map of how topics relate to each other, grouped by theme clusters
- **Reading Library** — 60+ readings with summaries, key points, exam relevance, filterable by week/type/required
- **Global Search** — Cmd+K (or Ctrl+K) to search across all topics, readings, terms, and concepts using fuzzy matching

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

Push to GitHub, then import the repo on vercel.com. Zero config needed — it's a standard Next.js app.

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Fuse.js (client-side search)
- Static JSON data files (no backend)

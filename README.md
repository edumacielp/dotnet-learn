# ⚡ dotnet.learn

A modern, bilingual (English / Portuguese-BR) learning hub for .NET developers. This repo contains content, interactive quizzes and a small UI for learning common .NET topics.

Quick highlights
- Bilingual content (EN / PT-BR)
- Interactive quizzes and image-driven examples
- Mobile-first UI built with Next.js (App Router) and Tailwind

Prerequisites
- Node 18+ and npm (or pnpm)

Local development
```bash
npm install
npm run dev
```
Open http://localhost:3000 and the app redirects to `/en` by default.

Project structure (important files)
- `app/` — Next.js App Router pages and layout
- `components/` — React UI components (header, sidebar, topic cards, interactive widgets)
- `content/en` & `content/pt-br` — topic content files (export `Topic` objects and quizzes)
- `lib/content.ts` — central registry and helpers to load topics and quizzes
- `public/` — static assets
- `types/` — shared TypeScript types

Adding or updating a topic
1. Create `content/en/<topic>.ts` and `content/pt-br/<topic>.ts` exporting the `Topic` object and `QuizQuestion[]`.
2. Register the topic in `lib/content.ts` by adding it to `ALL_TOPICS` and the `getTopicContent` / `getTopicQuiz` switch blocks.
3. Use `status: 'available'` to make the topic visible on the home page.

Translation notes
- Keep titles, descriptions and section text consistent across both language files. The site falls back to English when a translation is missing.

Contributing
- See CONTRIBUTING.md for a short contribution guide and PR checklist.

Deployment
- Deploy using Vercel: `npx vercel`. The App Router is supported by default.

Notes for maintainers
- This project uses `lucide-react` for small icons and aims to be mobile-first; responsive behavior is implemented inline in a few pages for simplicity. See `AGENTS.md` for notes about this Next.js version.

Contact
- Author: Eduardo Maciel — GitHub / LinkedIn: `edumacielp`
# dotnet.learn

A modern, bilingual (EN/PT-BR) learning hub for .NET developers.

## Stack
- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS**
- IBM Plex Mono + Outfit fonts

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

The app redirects to `/en` by default. Switch to `/pt-br` using the language toggle in the header.

## Routes
- `/en` or `/pt-br` — Home page with topic grid
- `/en/topic/docker` — Docker topic (available)
- `/pt-br/topic/docker` — Docker em português

## Adding New Topics

1. Create `content/en/your-topic.ts` and `content/pt-br/your-topic.ts`  
   Export a `Topic` object and a `QuizQuestion[]` array.
2. Register the topic in `lib/content.ts` — add to `ALL_TOPICS` and the `getTopicContent` / `getTopicQuiz` switches.
3. Set `status: 'available'` to make it live.

## Deploy to Vercel

```bash
npx vercel
```

No extra config needed — the App Router works out of the box on Vercel.

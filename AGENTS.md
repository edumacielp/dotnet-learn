<!-- BEGIN:nextjs-agent-rules -->
# About this Next.js fork

This repository uses a modified Next.js setup that intentionally differs from common public examples. The App Router, routing conventions, and some runtime behaviors may not match articles or tutorials you find online. Before making structural changes, read the local docs in `node_modules/next/dist/docs/` for this version.

Purpose of this document
- Help contributors and automated agents understand repository-specific rules and conventions.
- Provide quick references for common editing tasks (routing, components, styling, content).

Key differences & guidance
- Routing and pages: The project uses the App Router under `app/`. Prefer colocated layouts and server components when possible.
- Server vs Client components: Follow the existing pattern — files with `'use client'` at the top are client components; otherwise assume server components. Keep client components minimal and only add client behavior where necessary.
- Styling: Tailwind utility classes are used alongside a small set of inline responsive helpers. Keep visual changes consistent with the site's design tokens (CSS variables defined in `globals.css`).
- Icons: Use `lucide-react` for small SVG icons (already in `package.json`).
- Content: Content lives in `content/en` and `content/pt-br`. When adding a topic, add both language files and register the topic in `lib/content.ts`.

Editing rules
- Preserve existing public APIs and exported names in `lib/` and `types/` unless you update all call sites.
- Keep changes minimal and focused. Avoid sweeping refactors without an accompanying plan or tests.
- Favor small, testable commits with descriptive messages.

Accessibility & Responsiveness
- The site is implemented mobile-first. Verify changes on small screens first, then test desktop breakpoints.
- For interactive elements, ensure keyboard accessibility and appropriate ARIA attributes when needed.

Pull request checklist
- Make sure translations exist for new content or document why a translation is omitted.
- Run `npm run dev` and visually verify pages affected by your change.
- Lint and type-check if applicable.

Where to look for more context
- App layout and routing: `app/`
- Topic content: `content/en/` and `content/pt-br/`
- Component patterns: `components/`
- Central content registration: `lib/content.ts`

Contact & ownership
- Repo author / maintainer: Eduardo Maciel (`edumacielp`). Open PRs for review and mention the author for guidance on breaking changes.

<!-- END:nextjs-agent-rules -->

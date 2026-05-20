Thanks for considering a contribution! This short guide explains the minimal steps to contribute topics, fixes or translations.

How to contribute
1. Fork the repository and create a topic branch (e.g. `feat/docker-topic`).
2. Add or update content in `content/en/` and `content/pt-br/`.
   - Export a `Topic` object and an accompanying `QuizQuestion[]`.
3. Register the topic in `lib/content.ts` by adding it to `ALL_TOPICS` and the `getTopicContent` / `getTopicQuiz` switches.
4. Run the site locally and verify the page renders correctly:
```bash
npm install
npm run dev
```
5. Open a PR with a clear title and description explaining the change.

PR checklist
- [ ] Content is present in both `en` and `pt-br` (or a clear reason to skip translation)
- [ ] No TypeScript errors
- [ ] Visual check in responsive (mobile and desktop) layouts
- [ ] Update `lib/content.ts` registration if adding a new topic

Style and conventions
- Keep UI and copy simple and concise.
- Prefer existing component patterns in `components/` when adding new UI.
- Use `IBM Plex Mono` for headings and `Outfit` for body text to match the design.

Thank you — your contributions help grow this learning resource for the .NET community!
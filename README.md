# Speechworks website

A fresh starting point for the minimal, app-download-focused Speechworks website.

## Branches

- `main`: the new website foundation.
- `codex/obsolete-website-2026-09-16`: the complete former website plus redesign research, preserved at `970b542a50479b665cc71e1e65640a616350c93e`.
- `obsolete-sept-2026`: an earlier archive; left unchanged.

The new foundation is deliberately small: Next.js 15, React 19, Tailwind 4,
locally hosted Inter, app-aligned color tokens, a minimal homepage, and the
existing privacy/account-deletion pages. Legal page text is unchanged.

The old marketing components, clinical mockups, waitlist forms, media exports,
scratch scripts, and accidentally tracked build cache live on the archive branch.

## Run locally

```sh
npm ci
npm run dev
```

## Check

```sh
npm run lint
npm run build
```

Production builds statically export to `out/`. The existing GitHub Pages workflow
deploys on pushes to `main`; local commits do not change the public website.

## Next implementation slice

The current homepage is a runnable foundation, not the completed design.

1. Build a changing stack of four app feature cards: program, AI rehearsal,
   practice, and a personal keepsake. Use readable excerpts of current app UI.
2. Frame the stack with the actual illustrated avatars from `../sw-fe-m-2`.
3. Place a short headline, audience explanation, and verified iOS/Android store
   links below it. Include manual card controls and reduced-motion behavior.
4. Compare paper and orange hero treatments; keep program discovery secondary
   to app downloads.

See [the current brainstorm](docs/PROGRAMS-WEBSITE-RESTRUCTURE.md), particularly
the 16 September direction update. `docs/OVERHAUL-BRIEF.md` is historical context.

App references: `../sw-fe-m-2/app/design-system/`,
`../sw-fe-m-2/app/components/UserAvatar.tsx`, and
`../sw-fe-m-2/app/screens/Programs/`.

Font files are copied from the app's installed Inter distribution, under the
SIL Open Font License included alongside them in `src/app/fonts/`.

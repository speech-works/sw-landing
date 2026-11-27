# Speechworks website

A minimal, program-led website for adults who stutter. Built with Next.js 15,
React 19, self-hosted Inter, and the mobile app's colors, logo, and avatars.

## Run and check

```sh
npm ci
npm run dev
npm run lint
npm run build
```

Production builds statically export to `out/`. The existing GitHub Pages workflow
deploys on pushes to `main`. Local changes do not publish the site.

## Pages and interactions

- Home: rotating feature cards with manual controls, touch swipe, avatar picker,
  featured programs, accessible FAQs, and app downloads.
- Programs: topic filters and ten individually addressable program pages with
  actual day-by-day outlines and expressive mascot portraits.
- Our story, privacy, account deletion, and a custom 404.
- Motion pauses when the hero leaves view, the tab is hidden, or the carousel is
  hovered or focused. Reduced motion disables autoplay and movement. Keyboard
  selections update immediately.

## Product sources

`src/content/programs.ts` contains website copy. `program-outlines.json` contains
only public-facing day titles, extracted from the backend seeds. It does not
include paid lesson content. To refresh the logo and outlines with both
sibling repositories present:

```sh
node scripts/sync-mobile-content.cjs
```

Program portraits live in `src/app/components/ProgramIllustration.tsx`. The
characters are the layered kit of the `sw-characters` repository, not this one:
the avatar pictures in `public/avatars/` are its site stills
(`web/scripts/run_site_stills.mjs`), and the face rigs, hands, blobs and skin
details in `src/lib/` (`*.generated.ts`, each naming the script that wrote it)
come from its export scripts. Change a character in sw-characters, then export
it here. The animated program scenes (tiger, cage, call and so on) are the
site's own and are built here (`scripts/build-*-scene.cjs`).

The app's program covers are app art: their source is in the app repository
(`design/program-covers/`).

Builds use the checked-in assets; sibling repositories are not required.
The logo in `public/brand/mark.svg` and app icons come from
`../sw-fe-m-2/app/assets/svg logos/` and the app's generated icon assets.
The mark's viewBox is tightened for the website; path geometry is unchanged.
Font licensing is included in `src/app/fonts/`.

## Download configuration

Google Play links use the verified `com.speechworks.app` listing. iOS is explicitly
labelled coming soon until a verified public listing is configured. Set
`NEXT_PUBLIC_APP_STORE_URL` to that URL before building to enable App Store links.
The QR code points to `https://speechworks.app/#download` and is intended for the
production domain after this redesign is published.

## Search and sharing

Program search titles live beside the public copy in `src/content/programs.ts`.
`src/lib/site-metadata.ts` supplies consistent Open Graph and Twitter metadata.
The production build exports twelve 1200 × 630 PNG sharing images under
`out/social/`, using the checked-in fonts and character artwork. No image service
or runtime server is required. Deploy the complete `out/` directory, including
these images, with the pages.

The homepage explains how guided practice can become an approach the user adapts
for themselves. The first three program pages show examples connecting a personal
situation to practice and a possible next step. These are labelled illustrations,
not customer quotes, app screenshots, or excerpts of paid lessons. See
`docs/PROGRAM-POSITIONING-2026-09-17.md` for the reasoning and claims boundaries.

## Archive

- `main`: new program-led website.
- `codex/obsolete-website-2026-09-16`: complete former website and redesign research,
  preserved at `970b542a50479b665cc71e1e65640a616350c93e`.
- `obsolete-sept-2026`: earlier archive, unchanged.

The old clinical marketing components and forms remain on the archive branch.
Privacy and account-deletion wording is preserved; those pages need a separate
legal review if product-policy changes require updates.

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
twenty-character SVG cast is built from the approved illustration proof in
`artwork/avatars/`. Every portrait uses the same head path and eye anchors, with
separate hair, headwear, expression and collar layers. Portraits stop at the
collar and shoulders. The art has transparent backgrounds and contains no
embedded raster images.

```sh
npm run artwork:build
```

This exports the website's avatar and program SVGs plus a portable part catalogue
at `artwork/avatars/export/parts.json`. Mobile sync also invokes this exporter,
so it does not restore the former mobile artwork over the approved designs.
The mobile app itself has not been migrated to this new cast yet. See
`artwork/avatars/README.md` for the source structure and integration notes.

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

## Archive

- `main`: new program-led website.
- `codex/obsolete-website-2026-09-16`: complete former website and redesign research,
  preserved at `970b542a50479b665cc71e1e65640a616350c93e`.
- `obsolete-sept-2026`: earlier archive, unchanged.

The old clinical marketing components and forms remain on the archive branch.
Privacy and account-deletion wording is preserved; those pages need a separate
legal review if product-policy changes require updates.

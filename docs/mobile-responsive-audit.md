# Mobile Responsive Audit

Date: 2026-04-15
Branch: `codex/mobile-responsive`

## Goal

Make the existing landing page responsive for phones and small tablets while preserving the current desktop experience.

## Scope Boundary

In scope:
- Responsive layout fixes
- Spacing and typography scaling
- Touch-safe interaction fallbacks
- Horizontal overflow cleanup
- Mobile-safe navbar and modal behavior
- Section-by-section responsive QA

Out of scope:
- Separate mobile-only website
- Content rewrites
- Brand redesign
- Broad desktop restyling that is unrelated to responsiveness

## Phase Structure

1. Phase 1: baseline audit and task boundary
2. Phase 2: global shell fixes
3. Phase 3: above-the-fold responsive pass
4. Phase 4: core content section responsive pass
5. Phase 5: conversion section responsive pass
6. Phase 6: regression and polish

## Baseline Status

Build status:
- `npm run build` passes successfully

Baseline warnings:
- Next.js reports multiple lockfiles and selects `/Users/mayankav/package-lock.json` instead of the local project lockfile
- `src/app/components/Platform.tsx` has one lint warning for an unused `withBasePath` import

Notes:
- The site is a single-page Next.js landing page composed of these main sections:
  `Navbar`, `Hero`, `MarqueeDivider`, `Roadmap`, `Platform`, `Simulator`, `Pricing`, `CTA`, `Footer`
- The app already uses responsive Tailwind utilities in several places, so the safest path is a controlled responsive pass on the existing codebase rather than a separate mobile site

## Responsive QA Matrix

Target widths for manual checks after each phase:
- `375px`
- `390px`
- `430px`
- `768px`
- `1024px`
- `1280px`

Core checks after each phase:
- No horizontal scrolling
- No clipped or overlapping content
- Readable type scale
- Tap targets remain usable
- Hover-only interactions have touch-safe behavior
- Desktop layout remains visually intact

## Risk Inventory

### High Risk

#### Global interaction layer

Files:
- `src/app/page.tsx`

Findings:
- The page registers multiple mouse-driven interaction systems for magnetic buttons, stage lighting, tilt cards, stickers, and glow cards
- These interactions are desktop-first and should be reduced, disabled, or adapted on touch devices
- The current setup adds event listeners inside `useEffect` without cleanup, which raises stability risk as we start adjusting behavior

Why it matters:
- Mobile devices do not support the same hover and pointer model
- Responsive changes will be easier and safer if the interaction layer is gated by pointer capability and cleaned up

#### Navbar has no mobile navigation path

Files:
- `src/app/components/Navbar.tsx`

Findings:
- Primary links are hidden below `lg`
- On mobile, only the `Get Access` CTA remains visible

Why it matters:
- Mobile users lose direct access to key anchors like roadmap, platform, and contact
- This is a shell-level issue and should be addressed before section-specific polishing

#### Hero is desktop-weighted

Files:
- `src/app/components/Hero.tsx`

Findings:
- The hero uses a large desktop-only phone fan composition that is hidden below `lg`
- On smaller screens the section becomes mostly copy and CTAs with no equivalent mobile visual treatment
- The hero also uses large cinematic background media and motion effects

Why it matters:
- This is the first impression of the site
- The mobile experience needs a deliberate hero composition, not just the desktop layout with elements hidden

#### Simulator is the highest overflow risk

Files:
- `src/app/components/Simulator.tsx`
- `src/app/page.tsx`

Findings:
- The section includes a fixed-height stage, absolute off-canvas sticker, `max-w-[50%]` content splits, hover-driven state changes, tilt cards, and cursor-driven lighting
- The current structure is visually strong for desktop but fragile on narrow screens

Why it matters:
- This section is very likely to create clipping, crowded copy, or unreadable composition on phones
- It will need a dedicated mobile layout, not just breakpoint tweaks

### Medium Risk

#### Roadmap uses desktop-oriented staging

Files:
- `src/app/components/Roadmap.tsx`

Findings:
- Timeline indicators rely on negative left offsets
- The visual stage uses fixed heights across breakpoints
- Mouse position is used to drive decorative movement

Why it matters:
- The roadmap likely needs a stacked mobile arrangement with simpler visual behavior

#### Platform has interactive desktop stage behavior

Files:
- `src/app/components/Platform.tsx`

Findings:
- The section uses a two-column layout with a large interactive stage
- It includes hover-based visual feedback, fixed stage heights, overflow-visible composition, and pointer-driven transforms

Why it matters:
- This section should remain premium on desktop while becoming readable and touch-friendly on smaller screens

#### CTA may compress poorly on narrow widths

Files:
- `src/app/components/CTA.tsx`

Findings:
- The section uses oversized headline typography, a large watermark image, and aggressive hover-driven presentation

Why it matters:
- The composition may overlap or lose hierarchy on smaller screens if not tuned carefully

#### Footer needs mobile readability verification

Files:
- `src/app/components/Footer.tsx`

Findings:
- The footer combines video background, multi-column layout, and oversized marquee text

Why it matters:
- This is less likely to break than Simulator or Hero, but still needs spacing and readability checks on phones

### Lower Risk but Must Verify

#### Pricing already has a mobile branch

Files:
- `src/app/components/Pricing.tsx`

Findings:
- Pricing already separates `lg:hidden` mobile cards from the desktop interactive carousel
- The mobile path still needs spacing, height, and CTA flow verification

Why it matters:
- This section is in better shape than others, but it still needs responsive QA before we call it done

#### Modals need touch-safe behavior

Files:
- `src/app/components/InviteOnlyModal.tsx`
- `src/app/components/ContactModal.tsx`

Findings:
- Both modals use mouse-driven tilt interactions and fixed-width card shells
- They likely fit on mobile, but motion intensity, internal spacing, and scroll behavior should be validated on small screens

Why it matters:
- Conversion breaks often show up in overlays before they show up in page layout

## Proposed Execution Order

### Phase 2: global shell

Targets:
- `src/app/globals.css`
- `src/app/page.tsx`
- `src/app/components/Navbar.tsx`
- modal shell behavior where needed

Expected outcomes:
- No hidden mobile navigation problem
- Pointer and motion effects are made touch-safe
- Overflow problems are exposed and fixed instead of being masked

### Phase 3: above the fold

Targets:
- `src/app/components/Hero.tsx`
- `src/app/components/MarqueeDivider.tsx`

Expected outcomes:
- Strong mobile hero hierarchy
- Mobile-safe visual treatment for the hero
- CTA visibility and spacing are solid on first load

### Phase 4: core sections

Targets:
- `src/app/components/Roadmap.tsx`
- `src/app/components/Platform.tsx`
- `src/app/components/Simulator.tsx`

Expected outcomes:
- Readable stacked layouts on mobile
- Reduced dependence on hover and large fixed stages
- No clipping or off-screen decorative elements

### Phase 5: conversion sections

Targets:
- `src/app/components/Pricing.tsx`
- `src/app/components/CTA.tsx`
- `src/app/components/Footer.tsx`
- `src/app/components/InviteOnlyModal.tsx`
- `src/app/components/ContactModal.tsx`

Expected outcomes:
- CTA paths remain frictionless on mobile
- Footer remains legible
- Modals feel stable and usable on touch devices

### Phase 6: regression

Expected outcomes:
- Visual regression pass across all target widths
- Desktop confirmation after every mobile fix
- Cleanup of remaining edge cases

## Phase 1 Exit Criteria

Phase 1 is complete when:
- The baseline build is confirmed
- Responsive scope and non-goals are documented
- Section risk is inventoried
- Breakpoint QA targets are defined
- The next phase order is explicit

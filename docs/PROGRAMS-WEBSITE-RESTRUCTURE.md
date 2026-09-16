# Speechworks website: programs first

Working proposal, 15 September 2026. Based on the current local `sw-landing`, `sw-be-2`, and `sw-fe-m-2` checkouts, plus a read of the public homepage. This is a positioning and information architecture review, not a runtime audit of the mobile app or a verification of production store offers.

## Direction update: minimal app-download homepage, 16 September

The user's Walkie Talkie reference changes the homepage priority. Lead with a minimal, playful introduction and direct iOS/Android download options. Keep program discovery as supporting navigation and deeper content. The longer homepage below is the earlier proposal, not the current preferred layout.

Reference reviewed: https://walkie-talkie.io/?ref=minimal.gallery and the supplied `ssref.png`. Current app references: `sw-fe-m-2/DESIGN.md`, the runtime design-system palette and semantic themes, `RecHeroCard`, `ProgramSalesFlow`, `UserAvatar`, and the avatar kit/crowd generator. This pass inspected components and tokens, not a running mobile build.

### Proposed hero

Small wordmark and a compact Programs / Our story menu. Center a three-layer card stack, with four feature moments cycling through the top position. Surround it with four curated avatars from the app's own illustration system, reduced to two on narrow screens. Place the headline, one explanatory sentence, and official store badges immediately below.

Suggested copy: **Say it your way.** / **Guided programs and everyday practice for adults who stutter. Learn, rehearse, and take your next step.**

Alternatives to discuss: **For the things you want to say.** and **Your next conversation starts here.**

### Card sequence

1. **Find your starting point:** a real program card and a few curriculum rows. Programs lead the sequence.
2. **Try the conversation:** a clearly labeled AI-practice view grounded in the current call UI.
3. **Make time to practise:** one actual activity or lesson interaction, keeping the text large enough to read.
4. **Keep what helps:** an illustrative personal plan/keepsake, clearly distinguished from a real user's record.

Use composed excerpts of actual UI with the app's typography, shapes, icons, and colors. Avoid reducing an entire mobile screen to illegible text. Each frame must communicate independently: visitors should not need to watch a complete loop to understand the app.

Proposed movement: the front card slides slightly aside and settles behind the stack; the next card lifts into place. Allow roughly 4–5 seconds per frame, with manual controls and a pause option. Pause on focus/hover or interaction; reduced-motion mode starts static with manual changes. Keep the title and downloads stationary. The avatars receive subtle independent float or hover response, without continuous orbiting or live-user badges.

### Color directions to compare

- **Paper + vivid cards, recommended starting point:** app paper `#F7F2EA`, charcoal `#141311`, orange `#FF9040`; existing blue/lime/purple accents remain inside selected UI details. The illustrations and deck supply the energy.
- **Orange hero:** orange canvas with charcoal cards and dark text, moving to paper below. This is a proposed marketing use of the brand color, beyond the app's usual accent-only treatment. It is the bolder option closest to the reference's poster-like impact.

Preserve the app's Inter family, rounded cards, pill controls, and outlined customizable avatar artwork. The reference's strong hierarchy, sparse copy, and direct downloads are useful; its yellow identity, radio graphics, waves, and mouth photography are specific to that product.

### Short page below the hero

1. **Made for your next…** A small set of situations linked to actual programs, such as interview, difficult call, and talking about stuttering. Keep this to a compact section rather than expanding the full catalog inline.
2. **A small optional moment of play:** a curated avatar shuffle using the actual app wardrobe, captioned “Make yourself at home.” Include only if the hero leaves room for another interaction; no full website avatar editor is needed.
3. **Download close:** repeat both platform options; provide a scannable QR for desktop and direct links on phones. Add a short practical FAQ and compact footer if needed to explain audience, paid programs, and support.

The first mobile viewport should expose the stack, audience explanation, and download action. Size the hero to that goal rather than copying the reference's desktop vertical spacing. Verify actual store destinations before launch.

Next design decision: compare the paper and orange hero treatments with the same content and card motion. Everything else can follow from that choice. This update is a brainstorm, not a website implementation.

## Earlier recommendation: catalog-led website

Make the website help an adult who stutters find a program for something in their life, understand what they will do, and continue in the app.

Proposed category sentence:

> Guided programs for adults who stutter, built around real conversations.

The product story is: choose something that matters → learn and practise through a structured program → record what happened → keep something useful in your own words.

Programs should own the navigation, homepage, and purchase journey. AI practice, the library, and personal records explain how the programs work. Optional membership belongs later in that journey.

## What the review establishes

| Finding | Source |
|---|---|
| Ten catalog entries are marked available; eight regular and two deep programs | `../sw-be-2/src/config/Catalog.ts` |
| Current seeded arcs span 7–14 days; Interview Ready is 14, Hard Conversations 9, Speech Toolkit 8, and seven programs are 7 | `../sw-be-2/src/seed/pack/` |
| Programs are bought individually; optional membership and call credits are separate products | `../sw-be-2/docs/SPEECHWORKS-STRATEGY.md`, `../sw-fe-m-2/app/screens/Programs/ProgramSalesFlow.tsx` |
| Sales screens show the pitch, curriculum, resolved price, and eligible inclusions | `../sw-fe-m-2/app/screens/Programs/ProgramSalesFlow.tsx` |
| Program-specific goals and later reports exist; the question and count vary by program | `../sw-fe-m-2/app/screens/Programs/GoalsAsk/`, `../sw-be-2/src/seed/pack/goalHarness.ts` |
| Reach presents personal goals and keepsake cards without scoring them | `../sw-fe-m-2/app/screens/Programs/Reach/` |
| The content standard combines teaching, questions, practice, and a structured record | `../sw-be-2/docs/programs/PROGRAM_STRATEGY.md` |
| AI caller instructions explicitly require patience with stuttering | `../sw-be-2/src/util/phoneCallPrompt.ts` |
| New program days are time-gated; completed-day replay and unfinished-day access differ | `../sw-fe-m-2/app/screens/Programs/NextDayCountdown.tsx`, `ProgramDetail.tsx`, `../sw-be-2/src/services/packProgress.service.ts` |

The existing `OVERHAUL-BRIEF.md` is useful historical context. Its 7–21-day range is not the current sellable range. Its suggestion that everyone names three goals is also too broad: Word Swap asks for five, and Understanding Your Voice is an education program without the same goal harness. Avoid turning either statement into universal website copy.

The code establishes available capabilities in these checkouts. It does not prove that every program, video, offer, or app platform is currently available to every production visitor.

## What to replace on the current website

| Current element | Proposed treatment |
|---|---|
| “167 hours between sessions” positioning | Replace with a specific program and real-life situation |
| Roadmap near the top | Replace with program discovery; move any maintained roadmap out of the main conversion journey |
| Clinical assessment, five-axis profile, ICF graphics | Replace with actual program outline, personal goals, and keepsake examples |
| Adversarial AI as the product headline | Explain AI rehearsal inside the programs that use it |
| Foundation / Catalyst / Pioneer pricing | Replace with individual program pricing and a short optional-membership explanation |
| Invite-only access modal | Replace with verified platform access links and a clear app handoff |
| For Clinicians in primary navigation | Move relevant contributor/reviewer information under About or How programs are made; retire the old service proposition |
| Mockups containing retired UI and claims | Recapture current screens; text edits around old screenshots are insufficient |
| Clinical metadata and social previews | Rewrite alongside the visible pages |

Retain the recognizable brand, the plain observation of everyday speaking situations, and accurate founder/contributor stories. Reassess their presentation against the current app.

## Three possible positioning directions

1. **A program for the moment ahead. Recommended.** Start with an interview, a call, disclosure, or the hours after a difficult conversation. This connects naturally to the catalog and gives a visitor a concrete reason to continue.
2. **A place to practise speaking.** Strong for an AI-call campaign or a practice page. As the whole website proposition, it leaves the learning, reflection, and education programs underexplained.
3. **Learn about life with a stutter.** Strong for the learning hub and Understanding Your Voice. As the whole proposition, it can make the product sound like a passive course library.

Use the first as the organizing idea, with the other two as supporting entry points.

## Proposed navigation and sitemap

Primary navigation: **Programs · How it works · Our story · Learn · Get the app**.

- `/` — orientation, featured programs, a concrete walkthrough, trust, and app access.
- `/programs/` — all ten programs, organized by situations and needs.
- `/programs/[slug]/` — one searchable, shareable page per program.
- `/how-it-works/` — the day structure, goals, practice choices, records, pacing, and ownership.
- `/about/` — why Speechworks exists, the people making it, and clearly described contributor roles.
- Existing blog — keep its existing location initially and surface it through Learn; connect articles to relevant programs.
- `/get-the-app/` — verified store links, desktop QR, existing-user access, and platform-specific availability.
- Footer — support, privacy, terms, account deletion, and How programs are made.

Initially, How it works and Our story can be homepage anchors. The essential new pages are the catalog and program detail pages. A separate AI-practice page can follow when there is a campaign or search need for it.

## Homepage sequence

### 1. A clear offer

Draft hero:

> **A program for the conversation ahead.**
>
> Guided programs for adults who stutter. Work through lessons, try speaking activities, and make a plan for situations that matter to you.

Primary action: **Explore programs**. Secondary text link: **See how it works**.

Use one current program as the visual example: its outline, one personal goal, and the card the person builds. Mark fictional personal entries as examples. Keep “Change the conversation” as an optional brand line rather than asking it to explain the offer by itself.

### 2. “What would you like to work on?”

Feature three programs with clear contexts: Interview Ready, The Hard Conversations, and The Art of Disclosure. Add a prominent route to all programs, including thought patterns, physical effort, and understanding stuttering.

This is an editorial selection, not a claim that these are best sellers or universally the best starting point.

### 3. Show how a program unfolds

Use one real program to demonstrate: a lesson → a question → an activity → the person's record. Explain it in ordinary language as **Learn · Practise · Reflect**.

Do not promise every lesson is a video, every day takes ten minutes, or every program includes AI calls. Use actual per-day duration estimates where helpful.

### 4. Make the personal goal visible

Example from a calls program: “Call my landlord about the repair.” Show how a person names and orders the situations they want to work on, then records what happened.

Explain this as a concrete feature. Avoid universal outcome promises or treating completion as proof of life change.

### 5. Show something worth keeping

Show an illustrative disclosure plan, call card, or reset routine. The interesting evidence is the useful thing the program helps a person make in their own words. Confirm each example against that program's actual final form.

### 6. Explain the supporting practice

Briefly show AI rehearsal where included, independent practice, and access to relevant learning tools. The homepage does not need an inventory of every app capability.

### 7. Establish trust through specifics

Explain who makes the programs, how lessons are reviewed, and what a buyer can inspect before buying. Name reviewers only with verified participation and an accurate description of their contribution. Use testimonials only when authentic, consented, and attributable.

### 8. Answer practical questions, then repeat the action

Cover audience, what a program includes, one-time ownership, optional membership, AI-call inclusions, pacing and missed days, and where programs run. End with **Explore programs** and a clear Get the app route.

## Catalog: organize by visitor language

These are proposed merchandising groups, not changes to backend classification.

| Visitor need | Programs |
|---|---|
| Prepare for a conversation | Interview Ready · The Hard Conversations |
| Talk about stuttering and connect | The Art of Disclosure · Dating, Intimacy & Vulnerability |
| Work with anticipation and difficult moments | The Panic Button · Bouncing Back · Breaking Thought Traps |
| Explore how you speak | The Word Swap · The Speech Toolkit |
| Understand stuttering | Understanding Your Voice |

Each card should show title, a recognizable situation, duration, a concrete description of the work, price when reliably available, and **View program**. Call inclusions should appear only where applicable.

Start with visible filters or situation links. A program finder can be added later, but should ask about preferences and situations, explain why a result appears, and always allow browsing everything. It should not imply a diagnostic assessment or require an email to see results.

## Program page template

1. Name, who it is for, duration, and a concise explanation of the work.
2. “This might fit if…” with three recognizable situations.
3. Concrete things the person will practise or make.
4. Day-by-day outline using current module titles and descriptions.
5. An illustrative view of the format and final keepsake where applicable.
6. AI practice and credits if included; other specific inclusions.
7. Current price and ownership terms, with eligibility-specific offers handled accurately.
8. Relevant creator/reviewer information and program-specific questions.
9. **Get this program in the app** with clear platform handoff.

The current product deliberately sells paid lesson content and exposes a brochure to non-owners. Show the format and curriculum; do not add a free Day 1 or full paid exercise preview without an explicit product decision.

## Visual direction

Proposed direction: a warm, adult learning environment with a recognizable family of program covers. Use readable type, real-life situations, and current app screens. Give each program a controlled color or emblem while preserving a shared identity.

The strongest visual objects are the curriculum, a personally chosen goal, a rehearsal, and a completed card. Let those carry the story. Use restrained motion to explain a transition between them; keep navigation and program information readable without animation.

Avoid visual regression to assessment radars, medical dashboards, neurological progress claims, or competition-style scores. Do not replace those with a generic wall of course cards and motivational promises.

## Implementation considerations

- Keep the current static Next.js delivery unless a concrete requirement justifies changing it.
- Generate catalog/detail routes from a curated public projection of catalog and brochure data. Add website-specific copy keyed by `catalogKey` while retaining one source for title, duration, availability, and curriculum.
- The existing brochure is designed for signed-in users; `/users/me/offers` is user-specific. Build a public export or narrowly scoped public endpoint. Do not embed account credentials or publish the complete pack payload.
- Launch prices depend on configuration, founder status, and store pricing. Verify production offers before publishing amounts. Until a reliable price feed exists, direct visitors to the current in-app price instead of hardcoding a universal discount.
- “One-time program purchase; membership optional” communicates the model accurately. Do not say the entire app has no subscriptions.
- A `speechworks` app scheme exists, but a working website-to-program handoff was not established by this review. Treat program deep links and install fallback as implementation work to verify across platforms.
- Do not equate permanent ownership with immediate access to every unfinished day. Write pacing FAQs from the actual unlock/restart rules.
- Replace obsolete screenshots, metadata, social imagery, sitemap entries, clinician messaging, and shared blog navigation together.
- Use redirects only where a relevant replacement exists; give the old clinician URL an intentional retirement or accurate replacement treatment.

## Suggested sequence

**First design slice:** homepage + catalog + Interview Ready detail page + app handoff. This establishes the general proposition and tests the most detailed program page, including AI calls and ownership.

**Then:** apply the template to the other nine programs, including an education program and one without AI calls to check that it does not assume identical formats. Finish How it works, Our story, trust content, and the old-route cleanup.

**Later:** a lightweight finder, program-linked editorial content, and dedicated campaign pages, informed by actual visitor behavior.

Measure program-card clicks, detail views, app handoff clicks, and, where technically supported, attributed program purchases. Treat download clicks as clicks, not installs or purchases. The main hypothesis to test is whether visitors can name a relevant program, explain what they get, and find the next step.

## Decisions for the next design pass

Recommended working assumptions: keep adults who stutter as the core audience; lead with the full catalog while featuring three situational programs; use the app for purchase and participation; preserve the recognizable brand with new program-focused presentation.

Before launch, resolve actual platform availability, current regional prices, publishable reviewer/testimonial evidence, and tested app handoff behavior. A website redesign should not silently broaden the audience to general public speaking or create a web learning product.

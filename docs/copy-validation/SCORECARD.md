# Copy scorecard (step 7)

18 September 2026. One row per line in `inventory.md`.

**Evidence columns:**
- **Rule:** result of `npm run lint:copy`
- **Their words:** matches the language in `voc.md`
- **Expert:** verdict from `expert-review.md`
- **Clarity:** result from `clarity-tests.md`

**Decisions:**
- **Keep:** no change.
- **Fixed:** changed in this pass.
- **Test live:** try against a challenger once tracking exists.
- **Blocked:** needs a fact or decision from you.
- **Next:** agreed, but needs design work.

## Search and sharing

| ID | Rule | Their words | Expert | Decision | Now |
|---|---|---|---|---|---|
| META-HOME-T | ✓ | ✗ "stutter" only | Lead with stammer | **Fixed** | Stammering & Stuttering Practice App \| Speechworks |
| META-HOME-D | ✓ | partly | Add the AI that waits, and the free tier | **Fixed** | Practice job interviews and phone calls with an AI caller that waits for you. For adults who stammer (stutter). Free daily practice. |
| META-PROGS-T | ✓ | ✗ | Add stammer | **Fixed** | Programs for Adults Who Stammer or Stutter |
| META-PROGS-D | ✓ | ✓ | OK | Keep | |
| META-ABOUT-T/D | ✓ | ✓ | OK | Keep | |
| PROG-interview title | ✓ | ✗ | Add stammer | **Fixed** | Interview Practice for People Who Stammer |
| PROG-calls title | ✓ | ✗ | Add stammer | **Fixed** | Phone Call Practice for People Who Stammer |
| PROG-toolkit title | ✓ | ✗ | Add stammer | **Fixed** | Speech Tools for People Who Stammer |
| Other program titles | ✓ | ✓ | Every title and meta description now contains both "stammer" and "stutter" | **Fixed** | See `searchTitle` and `searchDescription` in `src/content/programs.ts` |
| SOCIAL-HOME | ✓ | ✗ | Match the new hero | **Fixed** | Say what you want to say. / Speaking practice for adults who stammer or stutter. |

## Homepage

| ID | Rule | Their words | Expert | Clarity | Decision | Now |
|---|---|---|---|---|---|---|
| HERO-H1 | ✓ | ✓ close to verbatim | Council: B's headline | H1 passes 5/5, favourite 3/5. Old hero failed "who is it for" (1/5) | **Fixed** | Say what you want to say. |
| HERO-SUB | ✓ | ✓ | Name the audience and the situation, and reassure | Pass. "Placement" and the "(stutter)" bracket dropped after persona feedback | **Fixed** | For adults who stammer or stutter. Practice a job interview or a phone call with an AI caller that waits for you. |
| HERO-PRICE | ✓ | ✓ | Free value was hidden | "Pay once for what?" | **Fixed** | Free to download, with free daily practice. Pay once for each program. |
| HERO-CTA-PLAY | ✓ | n/a | Badge wording is fixed by Google | Clearly the main action | Keep | |
| HERO-CTA-IOS | ✓ | n/a | Same visual weight as Play | Squint test: competes with Play | **Next** | Smaller, text-only status on Android |
| HERO-LINK | ✓ | ✓ | OK | Everyone wanted to see programs first | Keep | |
| NAV-CTA | ✓ | ✓ | Say "free" | | **Fixed**, then **Test live** (link straight to Play) | Get the free app (desktop). Phones keep "Get the app": the longer label collided with the logo at 375px. |
| DECK-1 (interview) | ✓ | ✓ | OK | | Keep | |
| DECK-2-H (calls) | ✓ | ✓ | Tighter | | **Fixed** | Practice the call before you make it. |
| DECK-3-H (mirror) | ✓ | – | Could make some readers self-conscious | | **Test live** | Challenger: "See where your face tenses, privately." |
| DECK-4 (partner) | ✓ | ✓ | OK | | Keep | |
| Card stack visual | – | – | – | Squint test: heaviest shape on screen | **Next** | Lighter card colour, or move the stack below the fold on phones |
| PROGS-H2 / INTRO / LINK / CARD-CTA | ✓ | ✓ | OK | | Keep | |
| PROGS-FOOT | ✓ | ✓ | OK | | Keep | |
| HOW-1…3, HOW-NOTE, HOW-CTA | ✓ | ✓ | OK | | Keep | |
| FAQ-1 | ✓ | ✗ stutter first | Stammer first | | **Fixed** | Adults who stammer. Stammering is also called stuttering. … |
| FAQ-2 | ✓ | ✓ | Mention the free tier | | **Fixed** | Adds "Daily practice and one short AI call a week are free." |
| FAQ (new) | ✓ | ✓ answers the "cure" worry | Honest negation beats cure-selling competitors | | **Fixed** (added) | Will this cure my stammer? No. … It does not treat stammering or replace a speech therapist. There is no fluency score. |
| FAQ-3…6 | ✓ | ✓ | OK | | Keep | |
| DL-H2 | ✓ | ✓ | OK | | Keep | |
| DL-TEXT | ✓ | ✓ | Lead with the free first step | | **Fixed** | Start with free daily practice and a free AI call. Buy a program when you are ready. |
| DL-PRICE | ✓ | ✓ | Same as HERO-PRICE | | **Fixed** | Free to download, with free daily practice. Pay once for each program. |
| DL-REASSURE, DL-PRIVACY, DL-QR | ✓ | ✓ | OK | | Keep | |
| "What we don't do" row (new) | – | ✓ | Dunford: state the contrast with competitors | | **Next** | No cure promises · No fluency score · No subscription needed |

## Program pages

| ID | Decision | Note |
|---|---|---|
| PROG-KICKER, PROG-APPNAME, PROG-OUTLINE-H, PROG-LESSONS, PROG-EXAMPLES | Keep | Clear and specific |
| PROG-CTA | Keep | |
| PROG-PRICE, and a price on every program card | **Fixed** | Tilted "Launch offer" sticker on every program card, with the regular price struck through (₹999 → ₹499, ₹1,999 → ₹999). The program page note shows the same prices. Turn it off with `LAUNCH_OFFER` in `src/content/pricing.ts`. |
| PROG-interview description | **Test live** | Add "placement" here: "Prepare for placement and job interviews…" |
| Other program descriptions | Keep | |

## About and other pages

| ID | Decision | Note |
|---|---|---|
| ABOUT-H1, ABOUT-SUB, ABOUT-1…3 | Keep, then **Next** | Add the real team names. Do not invent credentials or a story. |
| 404-H1 | Keep | |

## Outside the website

| Item | Decision | Note |
|---|---|---|
| Google Play listing | **Blocked** (highest priority) | It contradicts the site: "Adversarial AI", "Clinical Packs", "community". Rewrite it with the `aso` skill. |
| Privacy and account-deletion pages | **Blocked** | "Clinical research", scores and assessments. A legal decision. |

## Decisions made (18 September 2026)

1. **Price:** show the launch offer as a badge with the slashed price on the cards. Done.
2. **Keywords:** "stammer" and "stutter" are both important. Every search title and description carries both. Body copy can use either.
3. **Spelling:** US "practice" throughout.
4. **Play listing:** still open. The live listing was checked again on 18 September and still says "Clinical Packs", "Adversarial AI" and "community".

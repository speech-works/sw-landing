# Expert review of the website copy

Step 5 of the copy validation plan, carried out 18 September 2026.

**What was reviewed:**
- the local site at 375px
- `inventory.md`
- `voc.md`
- the live Google Play listing
- competitor sites
- the app's backend price and free-tier code

**Skills used:**
- `marketing-council`
- `cro`
- `copywriting`
- `marketing-psychology`
- `copy-editing`
- `seo-audit`
- `aso`

Every suggestion below passes `npm run lint:copy`. The rule check was updated to allow honest negations ("no fluency score", "doesn't treat stammering"), because saying what the app does *not* do is a selling point.

## 0. The biggest problem is not on the website

The live **Google Play listing** (checked 18 Sep, "Updated 29 Aug 2026", 10+ downloads) describes a different product from the one the website describes:

| The Play listing says | The website and the app say |
|---|---|
| "Adversarial AI… mimics the friction of real life" | The AI caller "is designed to give you time to answer" |
| "Clinical Packs", "evidence-based", "real clinical science", "therapist-designed" | No clinical claims |
| "Speech Audit — track your growth across the dimensions" | Progress is plain counts |
| "Find the others — practice alongside a community" | One paired buddy, no community |
| "built… by and with people who stammer" | Not verifiable from anything we have |
| Title: "Speechworks" only | — |

Every visitor the website convinces lands on this page. Rewrite the Play listing before tuning the website further, using the `aso` skill with `voc.md`.

Its short description, "A place to practice conversation for people who stutter or stammer", is fine and can stay.

## 1. Council: hero A or B?

> Simulated council. Each take is built from the advisor's published frameworks, not their actual review.

| Advisor | Lens | Verdict |
|---|---|---|
| **Eugene Schwartz** | Awareness stage | Visitors know they stammer and are looking for help, so they're problem- or solution-aware. **B** ("Say what you want to say") mirrors their own words almost exactly ("I can then easily say whatever u want to say"), so it channels a desire they already have. **A** ("conversations that matter to you") is the writer's phrase, not the market's. |
| **April Dunford** | Positioning against alternatives | Neither version names the alternatives: cure centres, subscription apps, doing nothing. A visitor can't tell why this beats Stamurai. Add the contrast right under the hero: pay once, no fluency score, practice for the real situation. |
| **David Ogilvy** | Specific benefit, research first | **A's subhead** is the most informative line on the page, because it names the interview, the phone call and disclosure. B's headline with A's subhead beats either version on its own. Also show the price. Hiding it insults the reader. |
| **Rory Sutherland** (dissenter) | How it feels, not what it is | This audience's real problem is fear, not missing information. What matters most is: the AI waits for you, nobody hears you, you aren't graded. "The AI caller waits for you" is worth more than any headline wording. Put it above the fold. |

**Where they disagree:**
- Schwartz and Ogilvy disagree on whether the headline should mirror the audience's words or state the benefit. They meet in the middle: B's words, A's specificity.
- Sutherland thinks both of them are fixing the wrong problem, because fear matters more than clarity. His view can be tested: show the "waits for you" line and see whether store clicks go up.

**Chair's call:** Use B's headline, a specific subhead (A's content in the audience's words), and a line of reassurance. See the heroes in section 3.

## 2. Findings from the page review (`cro`), ranked

| # | Issue | Evidence | Fix | Kind |
|---|---|---|---|---|
| 1 | **The free parts of the app are hidden.** The site only says "Programs cost extra." | The backend has a free weekly AI call (`wallet.service.ts`, `FREE_CALL_INTERVAL_MS`, 3 minutes) and free daily practice. The site never mentions either. | "Free daily practice and one free AI call every week. Programs are pay once." | Quick win |
| 2 | **The audience isn't named above the fold, and "stammer" never appears.** | Hero A never says who it's for. Indians say "stammer" (voc.md #1). | Eyebrow: "For adults who stammer (stutter)". | Quick win |
| 3 | **The price is hidden** ("See the price in the app"). | Catalog: 8 programs at ₹999, the 2 AI programs at ₹1,999. Launch offer ₹499 / ₹999 if `LAUNCH_OFFER_ACTIVE` is on in production. | Show "Programs from ₹999, pay once". Use the launch price only while the offer is confirmed live. Competitors hide their prices, so showing ours builds trust. | Quick win (after checking the production flag) |
| 4 | **The differences from competitors aren't stated.** The page never says no cure promise, no fluency score, no subscription. | Competitors: "cure code… guaranteed result in 28 days", Stamurai at $19.99/week, Stutter Coach's "fluency metrics". | Add a short "What Speechworks doesn't do" row: no cure promises · no fluency score · no subscription needed. | High impact |
| 5 | **"The AI waits for you" is buried in FAQ-5.** | This answers the audience's biggest fear (voc.md #3). | Put it in the hero subhead or on deck card 2. | Quick win |
| 6 | **Nothing builds trust.** No people, no reviews. | No testimonials, and About has no authors. | Name the team on About. Don't invent a story or credentials. Once the Play listing is fixed, show its rating. | High impact |
| 7 | **The nav CTA "Get the app" sends visitors down the page, adding a step.** | `Navbar.tsx:22` points to `/#download`. | "Get the free app", linking straight to Play (on Android). | Test |
| 8 | **The iOS "Coming soon" badge gets the same weight as Play.** | `StoreButtons.tsx:58`. | Make it smaller, text-only, on Android devices. | Quick win |
| 9 | **No Indian situations.** | The top Indian pain is "placement" (voc.md #2). Competitors are generic. | Mention "placement interview", "HR round" and "calling the bank" in cards and program copy. | Quick win |

## 3. Hero options (`copywriting`)

Each option is built from `voc.md` phrases. All of them pass the rule check.

| # | Headline | Subhead | Why |
|---|---|---|---|
| **H1** (recommended) | Say what you want to say. | For adults who stammer (stutter). Practise your placement interview or a phone call with an AI caller that waits for you. Free daily practice. Programs are pay once. | The audience's own words, plus the situation, the reassurance and the price model |
| H2 | Practise the interview before the interview. | Rehearse placement and job interviews out loud with an AI interviewer that gives you time. For adults who stammer (stutter). | Leads with the #1 Indian pain. Best as a landing page for interview-intent traffic |
| H3 | Every phone call feels like a test? Practise it first. | Call an AI character about a bill, a repair or a booking. It waits while you speak. Built for adults who stammer (stutter). | Based on the voc.md quote "Every phone call was a test" |
| H4 | Stop rehearsing it in your head. Say it out loud. | A private place to practise interviews, phone calls and telling people you stammer. Nobody grades how you sound. | Based on "rehearsing to fail". Sutherland's reassurance angle |
| H5 (current A) | Practice for the conversations that matter to you. | Prepare for a job interview, a phone call, or talking about your stutter. Get lessons and speaking practice in the Speechworks app. | Control. Clear, but generic, and doesn't use the audience's language |

**CTA text:** the Google Play badge wording is fixed by Google's rules. Change the text next to it instead:
- Nav button: "Get the free app"
- Hero note: "Free to download · Free daily practice · Programs pay once"

**Spelling:** Indian English uses "practise" for the verb and "practice" for the noun. The site uses "practice" throughout. Pick one convention and apply it everywhere. British/Indian spelling fits the audience, but this is low priority.

## 4. Tone check (`marketing-psychology`)

| Check | Result |
|---|---|
| Shaming or pitying language | None found |
| "Slow down / relax" style advice | None |
| Anxiety-raising lines | "Notice tension as you speak" (Mirror card) could make some readers self-conscious. Try "See where your face tenses, privately. Your video stays on your phone." |
| Loss framing or urgency | None. Keep it that way. Artificial urgency would contradict the calm voice. |
| Reducing the risk of trying | Missing. The free weekly AI call is the natural low-risk first step: "Try a free AI practice call first". |
| Trust without social proof | Use transparency instead of testimonials: public lesson lists (already there), price shown up front, privacy promise, named team. |

## 5. Line edits (`copy-editing`)

| ID | Now | Suggested |
|---|---|---|
| HERO-PRICE, DL-PRICE | The app is free to download. Programs cost extra. | Free to download, with free daily practice. Programs are pay once. |
| PROGS-FOOT | Pay once for a program. Keep your notes and completed lessons. | Keep as is |
| DL-TEXT | Choose your program in the app. See the price before you buy. | Start with a free AI practice call. Buy a program when you're ready. |
| HOW-3 | Use what helps. Try what you learned in a conversation. You choose what to use again. | Keep as is |
| DECK-2-H | Practice before your phone call. | Practise the call before you make it. |
| FAQ (new) | — | "Will this cure my stammer?" No. Speechworks is practice for real situations. It doesn't treat stammering or replace a speech therapist. |
| FAQ (new) | — | "Is there a free version?" Yes. Daily practice and one short AI call a week are free. |
| FAQ-1 | Stuttering is also called stammering. | Stammering is also called stuttering. (Indian readers come first) |

## 6. Titles and meta (`seo-audit`)

| Page | Now | Suggested (≤60 characters) |
|---|---|---|
| Home | Speaking Practice for Adults Who Stutter \| Speechworks | Stammering & Stuttering Practice App \| Speechworks |
| Home meta | Lessons and speaking practice for adults who stutter… | Practise job interviews and phone calls with an AI that waits for you. For adults who stammer (stutter). Free daily practice. |
| Interview | Interview Practice for Adults Who Stutter | Interview Practice for People Who Stammer or Stutter |
| Phone | Phone Call Practice for Adults Who Stutter | Phone Call Practice for People Who Stammer |
| Programs | Programs for Adults Who Stutter | Programs for Adults Who Stammer or Stutter |

- Keep one "stammer" and one "stutter" in each title or description. Don't stuff keywords.
- Check the India search terms in Google Keyword Planner (location: India) before finalising: "stammering problem", "how to stop stammering", "stammering treatment in India".
- Don't target "treatment" or "cure" pages. We can't make those claims.

## 7. Store match (`aso`)

- See section 0. The Play listing needs a rewrite before any live copy test, otherwise the test measures the store page's mismatch, not our copy.
- **Play title:** change "Speechworks" to "Speechworks: Stammering Practice" (keyword in the title, 30-character limit).

## Next: scorecard (steps 6 and 7)

- Run the AI-persona 5-second test on H1, H2 and H5 at phone size.
- Then build `SCORECARD.md` with a Keep / Fix now / Test live decision for every inventory ID.

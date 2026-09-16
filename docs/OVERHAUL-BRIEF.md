# Website overhaul brief — product vs site gap analysis

Generated 2026-09-01. Sources: `sw-fe-m-2` @ `2eda6cb0` (2026-08-29), `sw-be-2` @ `de383fc` (2026-08-29),
`sw-landing` @ `95fb008` (2026-06-18). Snapshot of the old site: branch `obsolete-sept-2026`.

The site is ~2.5 months behind. The product pivoted from "subscription app with clinical scoring"
to "one-time-purchase guided programs + AI call practice, India-first". Roughly 80% of the homepage
describes something that no longer exists.

## The one thing to fix first

The site's primary CTA is an **invite-only waitlist modal**. Neither repo has a waitlist, an invite
gate, or an early-access code. The app is **live on the App Store (v1.0.2)** with real IAP payments
enabled in the production EAS profile, and it has its own pre-signup funnel: six questions answered
before any account exists, then a real AI voice call that rings. The website is currently a wall in
front of a shipping product.

## Master contrast

| Area | Site claims (Jun 18) | Product reality (Aug 29) |
|---|---|---|
| Business model | Subscription: $0 / $11.99 mo / $9.90 annual, tiers "Foundation / Catalyst / Pioneer" | One-time program purchases (₹499 / ₹999 / ₹1999) owned forever + optional membership ₹199/mo, ₹1499/yr + ₹99 call credits |
| Market | USD, global/US-first | INR-led, India-first (Tele-MANAS crisis line, TISA, WhatsApp support, `stammering` keywords) |
| Access | Invite-only waitlist + WhatsApp fast-lane | Open Google / Apple / Facebook OAuth. No waitlist. No free trial. |
| Core product | "Adversarial AI", "Speech Audit", "Clinical Packs" | 10 named guided programs, 80 paid days, 586 content blocks, 478 quiz questions |
| AI posture | "The AI will rush you. Misinterpret your pause. Push back." | "Adversarial on the SITUATION, accepting of the STUTTER." System prompt: "BE PATIENT... Never rush them." Endpointing raised 400→800ms for blocks. "Take your time" mode. |
| Measurement | 5-axis Growth Profile radar (Mastery/Ease/Courage/Confidence/Social), ICF map, "Clinical Assessment" | Five-axis state model **deleted 2026-08-22**. 20-item impact assessment **deleted in July**. Progress is plain counts. |
| Community | Public community + therapist directory | 1:1 Buddy pairing only. Zero therapist/marketplace code. |
| Retention | Streaks, XP, "Breakthrough Detected" | **Streaks deliberately never shipped.** XP decay removed. Guilt-free vacation mode. |
| Team page | Sagar, Sanae, Mayank | Still accurate |

## What the product actually is (and the site never mentions)

1. **Ten programs, 7-21 day arcs** — Interview Ready (14d), The Hard Conversations (9d),
   The Speech Toolkit (8d), The Art of Disclosure, The Panic Button, The Word Swap,
   Bouncing Back, Breaking Thought Traps, Dating & Intimacy, Understanding Your Voice.
   Sold separately, owned forever. Missed days stay open. No "days behind" concept.
2. **Reach (the goal harness)** — before day 1 you name 3 real things in your own words and
   order them yourself. The program will not close until you say what happened to each.
   *"Your words, not ours."* This is the strongest differentiator in the product.
3. **Keepsakes / Cards** — one per finished program, written in the user's own words:
   a Panic Card, a Call Card, a Disclosure Plan.
4. **The First Call** — free, once ever, arrives as an *incoming* call that rings, matched to
   whatever the user said was hardest, from a named cast (Maya, Theo, Noor, Leo, Ana, Kai,
   Sam, Sofia, Omar). Offered before signup.
5. **Mirror Work** — on-device MediaPipe face landmarker (52 blendshapes, 478 landmarks,
   12fps VisionCamera worklet) detecting 11 facial secondary behaviours, calibrated to the
   user's own resting face. Camera never records. Completely absent from the site.
6. **DAF + The Guide** — real delayed auditory feedback (0-1000ms, local) and an offline
   read-along TTS with six accents including Indian.
7. **Pre-signup Act One** — six questions, answers stay on device until an account exists.
8. **Free tier** — ~4,825 reading items (public domain), 173 exposure / 73 fun / 28 cognitive
   practices, **4 of 22 technique tutorials in full** (the rest give a 15-second glimpse),
   1 AI call a week (3 min), ~5 activities a day.

## Copy the site must stop using

Both repos enforce a claims policy. The current homepage violates it repeatedly.

Banned in reader-facing copy: **treatment, therapy, clinical, intervention, assessment,
diagnosis, proven, breakthrough, cure, miracle**, any fluency outcome, any "you will feel"
claim, war/battle/mastery framing, the word "stutterer", em dashes.

Currently shipping on speechworks.app: "Clinical Assessment", "Clinical Packs",
"CLINICAL GRADE SANDBOX", "Explore Clinical Board", "Cognitive Therapy",
"clinically grounded", "Evidence Based", "Breakthrough Detected".

Also: OASES-derived items were removed in July on **IP-attorney mandate**. The approved
substitute wording is in `sw-be-2/docs/clinical/DECISION_LOG.md:349-357` and must be used verbatim
if the self-assessment is described at all.

Never claim: "detects stuttering accurately from audio", "measures fluency objectively",
"clinically validated". No clinician has signed off the crisis detection. The clinical audit
describes the product as pre-validation.

## Approved positioning (from the source docs)

> "a practice companion for people who stutter, adults first. The product is structure and
> rehearsal under realistic pressure, not a cure and not a fluency score."

> "Our differentiator is not price: it is no fluency metric, effort-not-fluency,
> evidence-grounded content."

> "Speechworks is a practice app for adults who stutter. It gives you somewhere to rehearse the
> moments that feel hard, on purpose, before you are in them. You already run the sentence in
> your head. This is a place to say it out loud."

Differentiation by omission, which is genuinely sellable: no breakable streaks, no leaderboards,
no fake social presence, no loss framing, no fluency score.

## Numbers that are safe to publish

Over twenty call scenarios. Eighteen techniques. 3 minutes free vs 10 minutes member.
About five vs about twelve activities a day. Arcs of 7 to 21 days. Ten programs.
Avoid "1,000+ scenarios" (unbacked) and "3,000+ reading items" (most are single words).

## Do not advertise

Chorus / choral reading (dead code, verified). **The AI post-call report (no backend endpoint).** "Voice effects" (no DSP exists). Secondary Behaviors screen
(unreachable stub). Therapist directory. Community forum. Free trial. Any waitlist.

## Verified corrections (checked directly 2026-09-01)

| Earlier finding | Verdict | Truth |
|---|---|---|
| "Post-call AI report is live" | **WRONG** | No `phone-call-report` endpoint exists in `sw-be-2` at all. The app calls `POST /practice-activities/{id}/phone-call-report` and its own comment says "204 = no report for this call (e.g. running on the Groq provider)". Backend runs Groq. The report screen is dead against the live backend. **Do not market it.** |
| "Technique library is free" | **WRONG** | 22 tutorials seeded, **4 free** (full video), **18 member-only** (15-second glimpse). `src/seed/library/Tutorials.ts`. The backend strategy doc's "library is free" line is the stale one. |
| "Clinical assessment fully deleted" | **PARTLY WRONG** | The 20-item assessment is gone from the app and the app never calls it. But `/impact-assessment/collect/{start,today,submit,progress}` still exists in the backend and still feeds the trends. Orphaned surface, not deleted. |
| "No streaks anywhere" | **NUANCE** | No daily habit streak, confirmed. There is a `currentStreak` for consecutive correct quiz answers inside quiz mastery. Not a retention mechanic, not user-facing as a habit. |
| "Chorus is dead code" | **CONFIRMED** | `ChorusManager` is instantiated and `.stop()` is called in `useReadingPracticeBase.ts`, but `.play()` has zero call sites. Never advertise choral reading. |

## Still open

1. **App Store / Play links** — the site has none. The app is live at v1.0.2. Add them.

## Best source files to write from

| File | Why |
|---|---|
| `sw-fe-m-2/docs/product/app-store-listing.md` | Finished marketing brief. Every claim verified against shipping code, with a "what we left out and why" list. Read first. |
| `sw-be-2/docs/programs/PROGRAM_STRATEGY.md` | 909 lines. Part 8 is the claims policy. |
| `sw-be-2/docs/SPEECHWORKS-STRATEGY.md` | Monetization source of truth. |
| `sw-be-2/src/seed/pack/goalHarness.ts` | The ten Reach questions, verbatim. Best copy in either repo. |
| `sw-be-2/src/seed/exposure/firstCall.ts` | The AI-call philosophy in one page. |
| `sw-fe-m-2/app/services/membershipOffer.ts` | The live paywall copy and its rationale. |

Note: `sw-be-2/docs/` is gitignored and internal. Treat as source material, not publishable text.

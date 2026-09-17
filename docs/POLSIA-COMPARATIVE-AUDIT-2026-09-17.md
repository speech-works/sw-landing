# Speechworks reference audit

17 September 2026 · Recommendation report · No website changes made

**Borrow a few communication patterns, while keeping our current identity and program architecture.** The [Polsia reference](https://speechworks.polsia.io/#programs) explains the experience calmly, but our [live website](https://speechworks.app/) gives visitors substantially better routes to evaluate programs and download the app. There is no evidence that the reference ranks, converts, or retains users better.

## What to borrow

| Priority | Reference pattern | Adaptation for our website | Expected benefit |
|---|---|---|---|
| 1 | A visible three-step explanation | Add a compact section before the avatar playground: **Choose your situation → Work through lessons and practice → Keep notes you can use again.** Link the first step to programs and show a real, public-facing example. Similar information currently lives on About and in rotating cards. | Helps new visitors understand the product before committing to an installation. |
| 1 | Open Graph image and large-image social card | Create branded 1200 × 630 sharing images for the homepage and program pages. The reference declares an image that returns HTTP 200; our live homepage declares no social image. | Makes shared links more recognizable. This is a sharing improvement, not a promised ranking boost. |
| 2 | Minutes shown beside practice topics | Add verified typical activity times alongside our existing **7–14 day program lengths**, where the underlying content supports them. Distinguish time per activity from total program duration. | Answers “Can I fit this into my day?” Do not reuse the reference’s unverified 6/8/10/12-minute figures. |
| 2 | Reassurance near the decision point | Surface our existing missed-day and ownership explanations beside program/download CTAs. Explain AI inclusions and privacy with precise, feature-specific language and a privacy link. | Reduces uncertainty about commitment and what happens after purchase. |

Our situation-led program names, one-time-purchase explanation, and supportive tone already cover much of what the reference does well. We do not need another visual overhaul.

## What not to borrow

- **The circular conversion flow.** “Start practicing” leads to a closing section whose main action returns to the library. The four program rows are not links; there is no visible download or working practice entry point. Keep our clickable program cards and Google Play route.
- **The single-page SEO structure.** Its sitemap contains only the homepage; `#programs` is a section, not a separate program landing page. Keep our ten individual program URLs and public daily outlines. Anchor navigation itself is fine; it does not create independently optimized pages. [Google URL guidance](https://developers.google.com/search/docs/crawling-indexing/url-structure).
- **Unsupported product promises.** Do not copy blanket claims about privacy, scores, or every exercise being low pressure. Verify wording against actual features. Keep our approved practice-app positioning rather than importing the reference’s care-related copy.
- **Its generic metadata and sparse trust information.** The reference title is only “Speechworks”; no JSON-LD was found in its rendered homepage, and the visible footer offers contact without a privacy link. Our site already provides privacy and account-deletion routes.

## Bigger opportunities for us

1. **Make search titles describe the need.** Our live title is “Speechworks | Got a conversation on your mind?” and the interview page is “Interview Ready | Speechworks.” Suggested alternatives: **“Speaking Practice for Adults Who Stutter | Speechworks”** and **“Interview Practice for Adults Who Stutter | Speechworks.”** Keep the conversational visible headline; add descriptive context to titles and program introductions. These are relevance hypotheses, not keyword-volume findings. [Google title guidance](https://developers.google.com/search/docs/appearance/title-link).
2. **Add concrete proof and helpful content.** Show an illustrative call plan or disclosure plan persistently beside the relevant program. The live carousel already shows a keepsake; do not treat this as a missing feature. Add verified creator/reviewer information and explain how programs are made. Publish focused, original guides answering interview, phone-call, and disclosure questions, with contextual links to the corresponding programs. Prioritize usefulness over a large volume of generic articles. [Google helpful-content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content).
3. **Improve the return path.** Test preserving the chosen program through the website-to-app handoff; currently the observed route reaches the generic store listing. A working program deep link needs platform testing. For iOS visitors, an optional launch-notification signup could provide a next step beyond the current “coming soon” label, if we can operate it reliably.

## How to judge impact

Start with titles, sharing images, and the three-step section. Measure organic impressions and clicks by landing page, program-detail visits, and store clicks. Treat store clicks as intent, not installs. Where attribution is available, measure first-program starts and 7/30-day return-to-practice cohorts. Longer time on the website alone is not evidence of better retention. Establish a baseline before changes; use an experiment if traffic supports one, otherwise treat before/after results as directional.

## Verification and limits

Reviewed the reference in a desktop browser, its navigation and rendered metadata, robots.txt, sitemap, and initial HTML; compared our live homepage, About and interview page, all 15 sitemap URLs, and current local source. All 15 live URLs returned HTTP 200 with matching canonicals; both sites allow crawling. Both homepages contain substantive server-delivered HTML. Neither rendered homepage contained JSON-LD; this is not an indexing blocker.

The live redesign is confirmed. A search fetch returned an obsolete version, so this report uses direct browser/HTTP evidence; local uncommitted copy also differs from production. A mobile screenshot of our homepage was inspected, but the reference viewport override did not take effect, so its mobile usability remains unverified. No Search Console, analytics, backlink data, field Core Web Vitals, or app retention data was available. No ranking, speed, accessibility-conformance, or conversion uplift is claimed.

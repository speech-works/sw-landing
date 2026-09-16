# Speechworks website review

16 September 2026. Review and proposed copy only; these recommendations have not been applied to the website.

## Verdict

The website repeats reassurance where it should explain the product. “A little,” “your next step,” and “room for” recur across unrelated sections. Together with similar smiling portraits, this makes specific programs feel like interchangeable wellness content. Keep the minimal composition and the card stack. Remove the repeated slogans and give the actual activities more prominence.

This is an assessment of the work, not a claim about how its text was authored.

## Checked scope

- Rendered local homepage at 1440 × 900, including hero hierarchy and computed text sizes. The avatar section measured approximately 565px high.
- Homepage, program catalogue, program descriptions, shared download area, FAQ, About page, avatar generator and CSS source.
- App avatar manifest, registry and renderer for feasibility of a consistent website/app illustration system.
- The user's screenshots and illustration references.
- This pass did not complete a fresh mobile or interaction audit: the browser session lost its tab during follow-up inspection. Source observations below are distinguished from rendered measurements. Purchase, installed-app and public-store flows were not exercised.

## Findings

| Priority | Class | Pattern | Evidence | Harm | Remove or fix |
|---|---|---|---|---|---|
| P1 | Slop pattern | Repeated slogans displace useful explanations | [Homepage](../src/app/page.tsx): “A little practice. A real next step.”, “Learn something. Try it out. Make it yours.”, “A little practice. A lot of you.” [Download section](../src/app/components/DownloadSection.tsx): “Your next step. Your own way.” | Several sections could belong to almost any self-improvement app. Repeated fragments create an overly composed marketing voice. | Keep one brand line, “Say it your way.” Remove the secondary slogans. Use the space for what a program contains, who it is for and how someone uses it. |
| P1 | Quality defect | “Our story” promises information the page does not supply | [About page](../src/app/about/page.tsx) has product positioning and three principles, but no account of who made Speechworks or how its programs are created. | A visitor considering a paid program cannot learn who is responsible for its content. | Rename it “About Speechworks” now. Add verified authorship and creation details when available. Do not invent a founder story, credentials, review process or results. |
| P2 | Quality defect | An unavailable platform leads the download row | [StoreButtons](../src/app/components/StoreButtons.tsx) renders the iOS “Coming soon” status before the available Google Play link, using similar badge proportions. This was visible in the local hero. | The first item in the primary action area is not actionable. “Coming soon” also implies a launch commitment that this review cannot verify. | Put the available download first. Present iOS as secondary status only with confirmed availability wording. Use verified store artwork for the final badges. |
| P2 | Slop pattern | Character expressions do not distinguish the situations | [ProgramIllustration](../src/app/components/ProgramIllustration.tsx) describes Panic Button with a wink and Bouncing Back with a joyful grin. [Generator](../scripts/sync-mobile-content.cjs) reuses the same open smile for most moods. | Accessories distinguish the portraits more than their acting. A wink or grin can feel emotionally disconnected from the adjacent subject. | Remove the automatic happy-face treatment. Author expressions using eyes, brows and mouth together. Choose attentive, thoughtful or gently relieved expressions where they fit; avoid treating distress as a visual gag. Preserve the original head and shoulder crop. |
| P2 | Slop pattern | Personalisation receives a large section without enough product explanation | [Homepage personality section](../src/app/page.tsx) and [AvatarPlayground](../src/app/components/AvatarPlayground.tsx): six-face picker surrounded by “Your goals. Your words. Even your own little avatar.” Approximately 565px of homepage height at the inspected viewport. | A playful secondary feature gets substantial space while visitors still have little sense of what one day in a program involves. | Remove the repeated introductory copy and compress the section. Keep the picker as a brief brand moment. Use any recovered space for a real, readable lesson/activity example from the app. |
| P2 | Quality defect | Important reading is visually subordinate to the artwork | [CSS](../src/app/globals.css): `.program-card-description` is 12px; `.program-card-link` is 11px; `.playground-caption` is 10px. Program-description size was confirmed in the desktop rendering. | Program differences and the limits of the avatar preview are harder to read than decorative headlines. | Increase essential descriptions and explanations to approximately 14–16px and reduce unnecessary text to fit. Keep genuinely incidental UI detail small. This is a legibility finding, not a claim that a particular font size alone violates an accessibility standard. |

## Preserve

- The user's requested stacked-card hero, restrained paper background and app palette.
- The direct statement that the app is for adults who stutter.
- Concrete details: ten programs; seven to fourteen days; individual purchases; included AI call credits where applicable; public lesson outlines.
- “Free to download. Programs purchased separately.” It prevents a misleading expectation of free programs.
- Choice around disclosure, practice and which activities someone finds useful.
- The original avatar identity and the new Speechworks mark.

## Copy direction

Use ordinary speech and specific activities. A playful illustration can carry personality without every sentence needing to be a slogan. These are proposals, not unverified new product claims.

### Draft

> For adults who stutter
>
> Say it your way.
>
> Guided programs for the conversations that matter. Learn, rehearse, and take your next step.

### What still sounds manufactured?

- “Conversations that matter” avoids naming the actual situations.
- “Learn, rehearse, and take your next step” repeats the site's formula of three loosely connected actions.
- The draft still does not explain what is distinctive about the app.

### Final proposed homepage copy

**Hero eyebrow:** For adults who stutter

**Headline:** Say it your way.

**Description:** Rehearse an interview or a difficult phone call with AI. Choose a program and follow its daily lessons in the app.

**Nearby qualification:** AI practice is included in Interview Ready and The Hard Conversations.

**Program heading:** What do you want to work on?

**Program introduction:** Programs run for 7 to 14 days. Buy one in the app and keep access to its lessons.

**Personalisation heading:** Pick a face.

**Personalisation explanation:** Change your hair, glasses and headwear in the app.

**Download heading:** Get Speechworks

**Download explanation:** Free to download. Programs purchased separately.

**About navigation:** About Speechworks

### Example program descriptions

| Program | Proposed description |
|---|---|
| Interview Ready | Prepare answers using your own experience, then rehearse them with AI. Includes 10 call credits. |
| The Hard Conversations | Practise explaining a problem, asking for something or saying no with an AI conversation partner. Includes 8 call credits. |
| The Art of Disclosure | Decide whether you want to tell someone you stutter. Try out the words you would use and prepare for their response. |
| The Panic Button | Work on the minutes before a difficult conversation. Try grounding activities and write a card you can return to. |
| Bouncing Back | Use guided questions to review a difficult speaking experience, then write your own reset routine. |

## Unknowns

- Confirmed public iOS availability and launch wording.
- Names, roles and accurate background of the people who create or review programs.
- Current conversion data or evidence that any particular headline performs better.
- Fresh mobile, keyboard, screen-reader and installed-app journey verification in this audit pass.

## First correction

Remove the repeated “little / room / next step” slogans. Keep one memorable headline and explain the actual program activities beneath it.

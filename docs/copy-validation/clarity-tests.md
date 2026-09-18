# Clarity tests (step 6)

18 September 2026. **This is weak evidence.** The "users" were AI personas, not real people who stammer. These results can rule copy out. They can't prove it works.

## Setup

- Three hero versions were each rendered at 375 × 812 (phone size). Screenshots are in `hero-tests/`.
  - **H1:** "Say what you want to say." / "For adults who stammer (stutter). Practice your placement interview or a phone call with an AI caller that waits for you."
  - **H2:** "Practice the interview before the interview." / "Rehearse placement and job interviews out loud…"
  - **H5:** the previous hero, "Practice for the conversations that matter to you."
  - In the test, H1 and H2 used the new price note: "Free to download, with free daily practice. Programs are pay once." H5 kept "The app is free to download. Programs cost extra."
- Five personas were built from `voc.md`. Each saw the three heroes in a different order and answered after a 5-second look.

| Persona | Situation |
|---|---|
| Rohan, 21, Pune | Campus placements next month |
| Priya, 34, Bengaluru | Avoids phone calls at the bank |
| Arjun, 27, Lucknow | Paid for a "cure" course before, sceptical, price-sensitive |
| Fatima, 29, Mumbai | Accepts her stammer, TISA member, dislikes "fix" language |
| Karthik, 40, Chennai | Shop owner, basic English, phone calls with suppliers |

## Results

**Pass rule:** 4 of 5 personas correctly say what it is, who it's for, what to do next, and whether it's free.

| | H1 | H2 | H5 (previous) |
|---|---|---|---|
| What is it? | 5 of 5 | 5 of 5 | 3 of 5 ("not sure for what") |
| Who is it for? | **5 of 5** ("adults who stammer, that is me") | 5 of 5, but "only interview people" | **1 of 5** ("anyone", "job-seekers", "not sure") |
| What next? | 5 of 5 (See programs, or Play) | 3 of 5 (2 would close the page) | 4 of 5 |
| Free? | 5 of 5 | 5 of 5 | 5 of 5 |
| **Pass?** | **Pass** | Pass on clarity, fails on reach | **Fail** (who it's for) |
| Would tap Play now | 0 yes · 5 maybe · 0 no | 1 yes · 2 maybe · 2 no | 0 yes · 2 maybe · 3 no |
| Favourite | **3 of 5** (Priya, Arjun, Karthik) | 1 of 5 (Rohan) | 1 of 5 (Fatima) |

**Blind comparison** (our H1 text vs Stamurai's hero, logos hidden): 5 of 5 chose ours. Why: "says adults who stammer plainly", "talks real situations", while the competitor "sounds like therapy / homework to fix a defect".

## What the personas objected to

| Objection | Who | Action taken |
|---|---|---|
| "Pay once for what, how much?" The price isn't shown. | Arjun, Rohan | Wording changed to "Pay once for each program". **Showing a real price is the main blocker to a "yes".** Needs the production price confirmed. |
| "Placement interview" shuts out non-students | Karthik, Fatima | The homepage hero now says "job interview". "Placement" moves to the interview program page and landing pages. |
| "stammer (stutter)" reads like a translation | Fatima | Changed to "stammer or stutter" |
| H2 headline reads as repetitive or confusing | Priya, Karthik | H2 kept only as an interview landing-page idea |
| H5 "conversations that matter to you" is vague sales talk | Priya, Rohan, Arjun | Replaced |
| Everyone wants to "See programs" before downloading | All | The program pages are part of the conversion path. Their copy and prices matter. |

## Squint test (blurred screenshot, `hero-tests/squint.png`)

- The store buttons are clearly the main action in all three versions. H1 places them highest, because its headline is shorter.
- **Problem 1:** the Google Play badge and the non-clickable "Coming soon" App Store badge look equally heavy.
- **Problem 2:** the dark card stack below the hero is the heaviest shape on screen and competes with the buttons.

## Decision

- Adopt **H1**, adjusted after the test, as the homepage hero.
- Keep **H2** as the challenger for a future interview landing page.
- Retire **H5**. It's kept as "Previous hero" on `/compare`.

# Copy inventory

Snapshot of every reader-facing line on speechworks.app, taken 18 September 2026 from local source. Each line has an ID; the scorecard (`SCORECARD.md`) scores lines by these IDs.

The homepage has two versions. **A** = current (live). **B** = "outcome" (only on `/compare/outcome/`). Where they differ, both are listed.

Rule check: `npm run lint:copy` (`scripts/check-copy-rules.mjs`). All lines below pass as of this snapshot.

## Search titles and descriptions

| ID | Page | Text | Source |
|---|---|---|---|
| META-HOME-T | Home title | Speaking Practice for Adults Who Stutter \| Speechworks | `src/app/layout.tsx:20` |
| META-HOME-D | Home description | Lessons and speaking practice for adults who stutter. Prepare for job interviews, phone calls, and talking about your stutter. | `src/app/layout.tsx:22` |
| META-PROGS-T | Programs title | Programs for Adults Who Stutter \| Speechworks | `src/app/programs/page.tsx` |
| META-PROGS-D | Programs description | Choose a program for interviews, phone calls, or talking about your stutter. See the lessons and what is included. | `src/app/programs/page.tsx` |
| META-ABOUT-T | About title | About \| Speechworks | `src/app/about/page.tsx` |
| META-ABOUT-D | About description | Speechworks gives adults who stutter lessons and speaking practice for everyday conversations. | `src/app/about/page.tsx` |
| META-PROG-* | Program pages | Title = `searchTitle`, description = `description` (see Programs below) | `src/app/programs/[slug]/page.tsx` |
| SOCIAL-HOME | Share image | FOR ADULTS WHO STUTTER / Practice for conversations that matter to you. / Speaking practice for adults who stutter. / Programs · Lessons · Speaking practice | `src/app/social/[image]/route.tsx` |

## Homepage

| ID | Element | A (current) | B (outcome) | Source |
|---|---|---|---|---|
| HERO-H1 | Headline | Practice for the conversations that matter to you. | Say what you want to say. | `HomePage.tsx:40` |
| HERO-SUB | Subhead | Prepare for a job interview, a phone call, or talking about your stutter. Get lessons and speaking practice in the Speechworks app. | An app for adults who stutter. Get lessons and activities for conversations at work, on the phone, and in everyday life. | `HomePage.tsx:44` |
| HERO-CTA-PLAY | Button | Get it on Google Play | same | `StoreButtons.tsx:40` |
| HERO-CTA-IOS | Badge | Coming soon to the App Store (not clickable) | same | `StoreButtons.tsx:66` |
| HERO-PRICE | Note | The app is free to download. Programs cost extra. | same | `HomePage.tsx:48` |
| HERO-LINK | Link | See programs | same | `HomePage.tsx:50` |
| NAV-CTA | Nav button | Get the app | same | `Navbar.tsx:25` |
| DECK-1-TAG / DECK-1-H | Card 1 | Interview practice / Practice for your job interview. | Job interviews / Show what you can do. | `FeatureDeck.tsx:72-73` |
| DECK-1-CTA | Card 1 link | See interview lessons | same | `FeatureDeck.tsx:77` |
| DECK-2-TAG / DECK-2-H | Card 2 | AI call practice / Practice before your phone call. | Phone calls / Ask for what you need. | `FeatureDeck.tsx:83-84` |
| DECK-2-CTA | Card 2 link | See phone call lessons | same | `FeatureDeck.tsx:95` |
| DECK-3-TAG / DECK-3-H | Card 3 | Mirror practice / Notice tension as you speak. | On-screen mirror / same | `FeatureDeck.tsx:101-103` |
| DECK-3-CTA | Card 3 link | Try the mirror · "Your video stays on your phone" | same | `FeatureDeck.tsx:106` |
| DECK-4-TAG / DECK-4-H | Card 4 | Partner practice / Practice with someone who stutters too. | Speaking partner / Talk with someone who stutters too. | `FeatureDeck.tsx:111-112` |
| DECK-4-CTA | Card 4 link | Get the app | same | `FeatureDeck.tsx:118` |
| PROGS-H2 | Section title | What do you want to practice? | Choose a program. | `HomePage.tsx:63` |
| PROGS-INTRO | Section text | Choose a program for the conversation you want to have. | (none) | `HomePage.tsx:67` |
| PROGS-LINK | Link | See all programs | same | `HomePage.tsx:70` |
| PROGS-CARD-CTA | Card link | See lessons | same | `ProgramCard.tsx:23` |
| PROGS-CARD-* | 3 featured cards | Program label + description (see Programs) | Job interviews / Phone calls / Talking about your stutter, with own descriptions | `HomePage.tsx:17-30` |
| PROGS-FOOT | Footnote | Pay once for a program. Keep your notes and completed lessons. | same | `HomePage.tsx:81` |
| HOW-H2 | Section title | How it works | same | `HowProgramsWork.tsx:51` |
| HOW-1 | Step 1 | Choose a program. Pick what you want to practice, such as an interview or a phone call. | Pick a topic. Each program has a daily plan. Check its lessons and price in the app. | `HowProgramsWork.tsx` |
| HOW-2 | Step 2 | Follow the lessons. Read a lesson and try the activity. New lessons open over time. | Follow the lessons. Read, write, or speak, depending on the activity. New days open over time. | `HowProgramsWork.tsx` |
| HOW-3 | Step 3 | Use what helps. Try what you learned in a conversation. You choose what to use again. | Use what you learned. Try an idea in a conversation. Notice what helps and what you would change. | `HowProgramsWork.tsx` |
| HOW-NOTE | Note | Come back to your notes and completed lessons when you need them. | (none) | `HowProgramsWork.tsx:67` |
| HOW-CTA | Button | See programs | same | `HowProgramsWork.tsx:68` |
| FAQ-H2 | Section title | Questions about the app | same | `Faq.tsx` |
| FAQ-1 | Who is Speechworks for? | Adults who stutter. Stuttering is also called stammering. You can practice speaking or learn about your stutter. | same | `Faq.tsx:7` |
| FAQ-2 | Is the app free? | The app is free to download. Programs cost extra. Pay once for each program. You do not need a subscription. Membership and extra AI call credits are optional purchases. See prices in the app. | same | `Faq.tsx:11` |
| FAQ-3 | How long is a program? | Programs have 7 to 14 days of lessons and activities. New lessons open over time. See the lessons on each program page before you choose. | same | `Faq.tsx:15` |
| FAQ-4 | What if I miss a day? | Continue when you return. The app shows when the next lesson opens. Your notes and completed lessons stay available after you finish. | same | `Faq.tsx:19` |
| FAQ-5 | How do AI calls work? | You talk to an AI character in the app. It responds to what you say. It is not a real person. The caller is designed to give you time to answer, including when you stutter. One call credit pays for one AI call. | same | `Faq.tsx:23` |
| FAQ-6 | Which programs include AI calls? | Job interview practice (Interview Ready in the app) includes 10 AI call credits. Phone call practice (The Hard Conversations) includes 8. Other programs use activities such as writing and speaking practice. | same | `Faq.tsx:27` |
| DL-H2 | Download title | Get Speechworks. | same | `DownloadSection.tsx:19` |
| DL-TEXT | Download text | Choose your program in the app. See the price before you buy. | Download Speechworks and choose a program. You can check the price before you buy. | `DownloadSection.tsx:22-25` |
| DL-PRICE | Note | The app is free to download. Programs cost extra. | same | `DownloadSection.tsx:29` |
| DL-REASSURE | Note | Pay once for a program. Membership and extra AI call credits cost extra and are optional. | same | `DownloadSection.tsx:32` |
| DL-PRIVACY | Link | How we use your data | same | `DownloadSection.tsx:33` |
| DL-QR | QR label | Get the app on your phone. / Scan with your phone camera | same | `DownloadSection.tsx:44-46` |

## Programs page and program pages

| ID | Element | Text | Source |
|---|---|---|---|
| PROGS-PAGE-H1 | Heading | Choose a program. | `src/app/programs/page.tsx` |
| PROGS-PAGE-SUB | Intro | Practice for an interview or a phone call. Learn about your stutter. See what each program includes. | `src/app/programs/page.tsx` |
| PROG-KICKER | Above title | {days} days · Pay once | `programs/[slug]/page.tsx:43` |
| PROG-APPNAME | Under title | In the app: {title} | `programs/[slug]/page.tsx:46` |
| PROG-CTA | Button | Get the app | `programs/[slug]/page.tsx:49` |
| PROG-PRICE | Note | Pay once for this program. No subscription needed. See the price in the app. | `programs/[slug]/page.tsx:51` |
| PROG-OUTLINE-H | Section | Your lessons. New lessons open over time. The app shows when you can start the next day. You can return to completed lessons. | `programs/[slug]/page.tsx:67-71` |
| PROG-DL-TEXT | Download text | Download the app and look for {title}. See the price before you buy. | `DownloadSection.tsx:22` |
| PROG-LESSONS | Day titles | 80 lesson labels | `src/content/program-lesson-labels.ts` |
| PROG-EXAMPLES | Example cards | "Your situation / Your practice / Your next step" for 3 programs | `ProgramTakeaway.tsx:12-73` |

Per program (`src/content/programs.ts`). Search title = page title; label = card and H1; description = card and meta description.

| ID | Search title | Label | Description | Days |
|---|---|---|---|---|
| PROG-interview | Interview Practice for Adults Who Stutter | Job interview practice | Prepare your answers. Practice with an AI interviewer. Includes 10 AI practice calls. | 14 |
| PROG-calls | Phone Call Practice for Adults Who Stutter | Phone call practice | Practice explaining a problem, asking for help, or saying no. Includes 8 AI practice calls. | 9 |
| PROG-disclosure | Talking About Your Stutter | Talking about your stutter | Decide whether to tell someone you stutter. Practice what you want to say. | 7 |
| PROG-panic | Prepare for Difficult Speaking Moments | Before a difficult conversation | Try activities for the moments when you feel worried about speaking. Save the steps that help. | 7 |
| PROG-bounce | After a Difficult Conversation: Bouncing Back | After a difficult conversation | Look back at what happened. Choose what to do next. | 7 |
| PROG-thoughts | Questioning Thoughts About Stuttering | When thoughts stop you speaking | Look at the thoughts that stop you from speaking. Compare what you expect with what happens. | 7 |
| PROG-dating | Dating and Relationships When You Stutter | Dating and relationships | Practice talking about your stutter, sharing personal things, and saying what you are comfortable with. | 7 |
| PROG-words | Practice Words You Avoid When You Stutter | Practice words you avoid | Choose five words you often replace. Try saying them in small speaking activities. | 7 |
| PROG-toolkit | Speech Tools for Adults Who Stutter | Try ways to help you speak | Try six speech tools. Notice the effort each takes and choose what helps you. | 8 |
| PROG-voice | Understanding Your Stutter | Understanding your stutter | Learn why your stutter can change in different situations. Explore how it affects you. | 7 |

## About page

| ID | Element | Text |
|---|---|---|
| ABOUT-H1 | Heading | A place to practice speaking. |
| ABOUT-SUB | Intro | Speechworks is an app for adults who stutter. It has lessons and activities to help you prepare for interviews, phone calls, and personal conversations. |
| ABOUT-1 | Principle | Choose what to practice. Start with a conversation you want to have. You decide what to say and whether to talk about your stutter. |
| ABOUT-2 | Principle | See what is included. See the lessons on each program page before you choose. Interview and phone call programs include AI calls. Other programs use writing and speaking activities. |
| ABOUT-3 | Principle | Come back when you need to. Your notes and completed lessons stay available. If you miss a day, continue when you return. |

## Other

| ID | Element | Text |
|---|---|---|
| 404-H1 | Not found | We cannot find this page. Find a program for the conversation you want to prepare for. |

## Outside the rule check (legal pages, for a human decision)

These are skipped by the rule check because they are legal text. They contradict the marketing position and should be reviewed with whoever owns the privacy policy.

| Where | Text | Issue |
|---|---|---|
| `src/app/privacy/page.tsx:100` | "It is grounded in clinical research" | Clinical claim the site does not make anywhere else |
| `src/app/privacy/page.tsx:143, 152, 162, 194` | "fluency/ease scores", "progress/awareness scores", "scores" | Describes scoring the app no longer shows. May still be accurate for stored data |
| `src/app/privacy/page.tsx:148-151, 338` | "assessment data", "impact-assessment questionnaires" | Same: check whether this data is still collected |
| `src/app/privacy/page.tsx:175` | "app/level/streak progress" | Streaks are not a feature |
| `src/app/account/delete/page.tsx:13, 87` | "assessments" | Same as above |

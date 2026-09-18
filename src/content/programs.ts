import outlines from "./program-outlines.json";
import { lessonLabels } from "./program-lesson-labels";

const copy = [
  {
    key: "interview_ready",
    searchTitle: "Interview Practice If You Stammer or Stutter",
    searchDescription:
      "Practice job and placement interviews with an AI interviewer that waits for you. For adults who stammer or stutter. Includes 10 AI practice calls.",
    title: "Interview Ready",
    category: "Conversations",
    color: "blue",
    avatar: "scholar",
    label: "Job interview practice",
    description:
      "Prepare your answers. Practice with an AI interviewer. Includes 10 AI practice calls.",
    detail:
      "Prepare answers about your work. Practice interview questions with an AI interviewer. You decide whether to talk about your stutter.",
    includes: [
      "Lessons to help you prepare your answers",
      "10 AI practice calls",
      "Your notes to use before an interview",
    ],
  },
  {
    key: "hard_conversations",
    searchTitle: "Phone Call Practice If You Stammer or Stutter",
    searchDescription:
      "Practice phone calls with an AI caller that gives you time to speak. For adults who stutter or stammer. Includes 8 AI practice calls.",
    title: "The Hard Conversations",
    category: "Conversations",
    color: "orange",
    avatar: "headphones",
    label: "Phone call practice",
    description:
      "Practice explaining a problem, asking for help, or saying no. Includes 8 AI practice calls.",
    detail:
      "Prepare what you want to say on a phone call. Practice with an AI caller before you call a real person.",
    includes: [
      "Practice for everyday phone calls",
      "8 AI practice calls",
      "Your plan for a real call",
    ],
  },
  {
    key: "art_of_disclosure",
    searchTitle: "Talking About Your Stammer or Stutter",
    searchDescription:
      "Decide whether to tell someone you stammer, and practice what you want to say. For adults who stutter or stammer.",
    title: "The Art of Disclosure",
    category: "Relationships",
    color: "purple",
    avatar: "flower",
    label: "Talking about your stutter",
    description:
      "Decide whether to tell someone you stutter. Practice what you want to say.",
    detail:
      "Choose who to tell and what to share. Try ways to talk about your stutter and respond to questions. You decide whether to use them.",
    includes: [
      "Examples of what you could say",
      "Practice for telling someone and responding",
      "Your plan for what to share",
    ],
  },
  {
    key: "panic_button",
    searchTitle: "Before a Hard Conversation When You Stammer",
    searchDescription:
      "Activities for the moments you feel worried about speaking. For adults who stutter or stammer. Save the steps that help.",
    title: "The Panic Button",
    category: "Thoughts and feelings",
    color: "lime",
    avatar: "beanie",
    label: "Before a difficult conversation",
    description:
      "Try activities for the moments when you feel worried about speaking. Save the steps that help.",
    detail:
      "Notice what happens when you feel worried before speaking. Try activities to focus on what is around you. Choose your first sentence and save your steps.",
    includes: [
      "Lessons about worry before speaking",
      "Activities to prepare to speak",
      "A card with your steps to use again",
    ],
  },
  {
    key: "bouncing_back",
    searchTitle: "After a Hard Conversation When You Stutter",
    searchDescription:
      "Look back at a hard conversation without going over it again and again, then choose your next step. For adults who stammer or stutter.",
    title: "Bouncing Back",
    category: "Thoughts and feelings",
    color: "peach",
    avatar: "bob",
    label: "After a difficult conversation",
    description:
      "Look back at what happened. Choose what to do next.",
    detail:
      "Review a difficult conversation without going over it again and again. Write down what happened, try short activities, and choose your next step.",
    includes: [
      "A short review of what happened",
      "Activities to choose your next step",
      "Your plan for after a difficult conversation",
    ],
  },
  {
    key: "breaking_thought_traps",
    searchTitle: "Thoughts About Stammering and Stuttering",
    searchDescription:
      "Look at the thoughts that stop you from speaking and compare them with what really happens. For adults who stammer or stutter.",
    title: "Breaking Thought Traps",
    category: "Thoughts and feelings",
    color: "blue",
    avatar: "curly",
    label: "When thoughts stop you speaking",
    description:
      "Look at the thoughts that stop you from speaking. Compare what you expect with what happens.",
    detail:
      "Notice what you think will happen when you speak. Try a small activity and record what happens. Use that experience to decide what to try next.",
    includes: [
      "Examples of thoughts about speaking",
      "Activities to check what you expect",
      "Your notes on what happened",
    ],
  },
  {
    key: "dating_intimacy",
    searchTitle: "Dating When You Stammer or Stutter",
    searchDescription:
      "Practice talking about your stammer on dates and in relationships, and saying what you are comfortable with.",
    title: "Dating, Intimacy & Vulnerability",
    category: "Relationships",
    color: "pink",
    avatar: "flower",
    label: "Dating and relationships",
    description:
      "Practice talking about your stutter, sharing personal things, and saying what you are comfortable with.",
    detail:
      "Prepare for conversations with someone you like. Decide what to share about your stutter. Practice saying what you want and what you are comfortable with.",
    includes: [
      "Examples of dating conversations",
      "Practice sharing and saying what you need",
      "Your plans for personal conversations",
    ],
  },
  {
    key: "word_swap",
    searchTitle: "Practice Words You Avoid When You Stammer",
    searchDescription:
      "Choose five words you swap or avoid because of your stutter, and try saying them in small speaking activities.",
    title: "The Word Swap",
    category: "Your speech",
    color: "orange",
    avatar: "scholar",
    label: "Practice words you avoid",
    description:
      "Choose five words you often replace. Try saying them in small speaking activities.",
    detail:
      "Start with five words from your own life. Notice when you replace them and try saying them in speaking activities. You can still choose a different word.",
    includes: [
      "Practice with five words you choose",
      "Speaking activities to try those words",
      "A card with your words to use again",
    ],
  },
  {
    key: "speech_toolkit",
    searchTitle: "Speech Tools for People Who Stammer or Stutter",
    searchDescription:
      "Try six speech tools for stuttering and stammering. Notice the effort each takes and choose what helps you.",
    title: "The Speech Toolkit",
    category: "Your speech",
    color: "lime",
    avatar: "beanie",
    label: "Try ways to help you speak",
    description:
      "Try six speech tools. Notice the effort each takes and choose what helps you.",
    detail:
      "Learn six ways to work with your speech. Try each one in private and note how it feels. You decide which ones to use again.",
    includes: [
      "Instructions for six speech tools",
      "Private speaking practice",
      "Your notes on what helps you",
    ],
  },
  {
    key: "understanding_your_voice",
    searchTitle: "Understanding Stammering and Stuttering",
    searchDescription:
      "Learn why your stutter or stammer can change in different situations, and explore how it affects you.",
    title: "Understanding Your Voice",
    category: "Your speech",
    color: "purple",
    avatar: "curly",
    label: "Understanding your stutter",
    description:
      "Learn why your stutter can change in different situations. Explore how it affects you.",
    detail:
      "Learn about stuttering, including the thoughts and feelings other people may not see. Use examples and activities to understand your own experience.",
    includes: [
      "Seven days of lessons and examples",
      "Questions about what you learned",
      "Private activities about your experience",
    ],
  },
];

export const programs = copy.map((program) => {
  const brochure = outlines.find((item) => item.key === program.key);
  if (!brochure) throw new Error(`Missing program outline: ${program.key}`);
  const labels = lessonLabels[program.key];
  if (!labels || labels.length !== brochure.outline.length || labels.some((label) => !label.trim())) {
    throw new Error(`Missing lesson labels for ${program.key}`);
  }
  return {
    ...program,
    slug: program.key.replaceAll("_", "-"),
    days: brochure.days,
    outline: brochure.outline.map((day, index) => ({ ...day, title: labels[index] })),
  };
});
export type Program = (typeof programs)[number];
export const categories = [
  "All programs",
  "Conversations",
  "Relationships",
  "Thoughts and feelings",
  "Your speech",
] as const;

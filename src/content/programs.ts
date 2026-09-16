import outlines from "./program-outlines.json";

const copy = [
  {
    key: "interview_ready",
    title: "Interview Ready",
    category: "Conversations",
    color: "blue",
    avatar: "scholar",
    situation: "For the interview ahead.",
    description:
      "Prepare answers using your own experience, then rehearse with an AI interviewer. Includes 10 call credits.",
    detail:
      "Work through the questions, pauses, and follow-ups that come with an interview. Build your answers around your own experience, practise them out loud, and decide what you want to try next.",
    includes: [
      "A day-by-day interview practice plan",
      "AI interview rehearsals with 10 included call credits",
      "Your own interview notes and next steps",
    ],
  },
  {
    key: "hard_conversations",
    title: "The Hard Conversations",
    category: "Conversations",
    color: "orange",
    avatar: "headphones",
    situation: "For the call you've put off.",
    description:
      "Practise explaining a problem or saying no with an AI conversation partner. Includes 8 call credits.",
    detail:
      "Start with the calls that matter to you. Practise explaining a problem, handling a no, and holding your side of an everyday conversation. The program builds toward a real call you choose.",
    includes: [
      "Everyday call scenarios and guided preparation",
      "AI rehearsals with 8 included call credits",
      "A personal call plan to keep",
    ],
  },
  {
    key: "art_of_disclosure",
    title: "The Art of Disclosure",
    category: "Connection",
    color: "purple",
    avatar: "flower",
    situation: "For saying it on your terms.",
    description:
      "Decide whether you want to tell someone you stutter. If you do, try out the words you would use and prepare for their response.",
    detail:
      "Try different ways to talk about stuttering, prepare for an awkward response, and decide what you want to share. Disclosure is a choice, and the words are yours.",
    includes: [
      "Examples and guided writing",
      "Speaking activities with choices",
      "A disclosure plan in your own words",
    ],
  },
  {
    key: "panic_button",
    title: "The Panic Button",
    category: "Everyday moments",
    color: "lime",
    avatar: "beanie",
    situation: "For the minutes before.",
    description:
      "Explore the build-up before a speaking moment and put together a personal card for those minutes.",
    detail:
      "Learn about anticipation, try grounding activities, and work on the first line you want to say. Bring what you find useful into a card you can come back to.",
    includes: [
      "Lessons about anticipation",
      "Grounding and speaking preparation",
      "Your own Panic Card",
    ],
  },
  {
    key: "bouncing_back",
    title: "Bouncing Back",
    category: "Everyday moments",
    color: "peach",
    avatar: "bob",
    situation: "For the hours after.",
    description:
      "Look at what happens after a difficult speaking moment. Build a way to reflect and choose what comes next.",
    detail:
      "Separate what happened from the story you keep replaying. Work with practical examples, short activities, and a structured review, then write your own reset routine.",
    includes: [
      "Guided reflection with a clear stopping point",
      "Practical activities and daily records",
      "A personal reset routine",
    ],
  },
  {
    key: "breaking_thought_traps",
    title: "Breaking Thought Traps",
    category: "Everyday moments",
    color: "blue",
    avatar: "curly",
    situation: "For the story in your head.",
    description:
      "Notice the thinking patterns around speaking. Try ways to examine predictions and decide your next action.",
    detail:
      "Work through examples of familiar thought patterns, make your own predictions, and record what actually happens. Explore what to do when recognising a thought is only the beginning.",
    includes: [
      "Worked examples of thinking patterns",
      "Your own predictions and observations",
      "Questions, activities, and reflection",
    ],
  },
  {
    key: "dating_intimacy",
    title: "Dating, Intimacy & Vulnerability",
    category: "Connection",
    color: "pink",
    avatar: "flower",
    situation: "For getting to know someone.",
    description:
      "Explore speaking, disclosure, and boundaries in conversations where there is no script.",
    detail:
      "Work through the moments around meeting someone, deciding what to share, and handling a response. Make room for your own preferences and boundaries in a conversation.",
    includes: [
      "Examples of personal conversations",
      "Activities around choice and boundaries",
      "Space to record your own plans",
    ],
  },
  {
    key: "word_swap",
    title: "The Word Swap",
    category: "Your voice",
    color: "orange",
    avatar: "scholar",
    situation: "For the word you meant to say.",
    description:
      "Explore the words you swap for easier ones. Notice the moment of choice and experiment on your terms.",
    detail:
      "Start with five words from your own life. Notice when you change them, try small speaking activities, and decide what you want to keep doing. Swapping a word can still be a choice.",
    includes: [
      "Your own list of five words",
      "Speaking experiments with options",
      "A personal word card",
    ],
  },
  {
    key: "speech_toolkit",
    title: "The Speech Toolkit",
    category: "Your voice",
    color: "lime",
    avatar: "beanie",
    situation: "For finding what fits you.",
    description:
      "Explore six speech tools. Try each one, notice the effort involved, and decide what is useful to you.",
    detail:
      "Learn what each tool asks you to do before you try it. Record what it was like and what it cost in attention or effort. You decide which tools, if any, belong in your day.",
    includes: [
      "Explanations of six speech tools",
      "Private practice and observation",
      "Your own choices about what to keep",
    ],
  },
  {
    key: "understanding_your_voice",
    title: "Understanding Your Voice",
    category: "Your voice",
    color: "purple",
    avatar: "curly",
    situation: "For making sense of it.",
    description:
      "Learn about stuttering, its variability, and the parts of the experience other people may never see.",
    detail:
      "A learning program about stuttering and your own experience of it. Explore explanations, examine common ideas, and connect what you learn to everyday life.",
    includes: [
      "Seven days of learning and examples",
      "Questions to check your understanding",
      "Private activities and reflection",
    ],
  },
];

export const programs = copy.map((program) => {
  const brochure = outlines.find((item) => item.key === program.key);
  if (!brochure) throw new Error(`Missing program outline: ${program.key}`);
  return {
    ...program,
    slug: program.key.replaceAll("_", "-"),
    days: brochure.days,
    outline: brochure.outline,
  };
});
export type Program = (typeof programs)[number];
export const categories = [
  "All programs",
  "Conversations",
  "Connection",
  "Everyday moments",
  "Your voice",
] as const;

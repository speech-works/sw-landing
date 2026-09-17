import outlines from "./program-outlines.json";

const copy = [
  {
    key: "interview_ready",
    searchTitle: "Interview Practice for Adults Who Stutter",
    title: "Interview Ready",
    category: "Conversations",
    color: "blue",
    avatar: "scholar",
    situation: "Show employers what you can do.",
    description:
      "Build answers from your own experience. Practice with an AI interviewer before the real interview. Includes 10 call credits.",
    detail:
      "Give your experience the attention it deserves. Prepare answers about your work, practice follow-up questions with AI, and decide how to talk about stuttering. Save your notes for the interview ahead.",
    includes: [
      "A daily plan to prepare your answers",
      "AI interview practice with 10 call credits",
      "Your interview notes and next steps",
    ],
  },
  {
    key: "hard_conversations",
    searchTitle: "Phone Call Practice for Adults Who Stutter",
    title: "The Hard Conversations",
    category: "Conversations",
    color: "orange",
    avatar: "headphones",
    situation: "Feel ready to make the call.",
    description:
      "Prepare to explain a problem, ask for help, or say no. Practice with an AI caller before your real call. Includes 8 call credits.",
    detail:
      "Prepare for the call you want to make. Practice explaining a problem, responding when someone says no, and asking for what you need. Use AI calls to try your words before you make a real call you choose.",
    includes: [
      "A plan for everyday phone calls",
      "AI call practice with 8 call credits",
      "Your own call plan to use again",
    ],
  },
  {
    key: "art_of_disclosure",
    searchTitle: "Talking About Your Stutter: A Disclosure Program",
    title: "The Art of Disclosure",
    category: "Connection",
    color: "purple",
    avatar: "flower",
    situation: "Choose how to talk about stuttering.",
    description:
      "Decide who to tell and what to share. If you choose to talk about your stuttering, prepare the words you want to use.",
    detail:
      "Make the choice that feels right for you. Try ways to tell someone you stutter and prepare for their response. Build a plan in your own words. You decide whether to use it.",
    includes: [
      "Examples to help you find your words",
      "Practice for telling someone and responding",
      "Your own plan for what to share",
    ],
  },
  {
    key: "panic_button",
    searchTitle: "Prepare for Difficult Speaking Moments",
    title: "The Panic Button",
    category: "Everyday moments",
    color: "lime",
    avatar: "beanie",
    situation: "Have a plan before you speak.",
    description:
      "Prepare for the minutes before a difficult conversation. Try activities to focus on the present and save useful steps in your own Panic Card.",
    detail:
      "Give yourself a plan for the moments before you speak. Learn about the worry you may feel and try activities to focus on the present. Choose your first sentence and save the steps you want to use.",
    includes: [
      "Lessons about worry before speaking",
      "Activities to prepare for the first sentence",
      "Your Panic Card to use when you need it",
    ],
  },
  {
    key: "bouncing_back",
    searchTitle: "After a Difficult Conversation: Bouncing Back",
    title: "Bouncing Back",
    category: "Everyday moments",
    color: "peach",
    avatar: "bob",
    situation: "Find your next step after a hard moment.",
    description:
      "A difficult conversation does not have to decide your next one. Review what happened and create a routine to help you move on.",
    detail:
      "Give yourself a way to finish reviewing a difficult conversation. Separate what happened from what you fear it meant. Use short activities to choose your next step and write a routine you can use again.",
    includes: [
      "A guided review with a clear stopping point",
      "Short activities to choose your next step",
      "Your own routine for after a difficult moment",
    ],
  },
  {
    key: "breaking_thought_traps",
    searchTitle: "Questioning Thoughts About Stuttering",
    title: "Breaking Thought Traps",
    category: "Everyday moments",
    color: "blue",
    avatar: "curly",
    situation: "A thought is not a fact.",
    description:
      "Question the predictions that stop you from speaking. Try a small activity and compare what you expected with what happened.",
    detail:
      "Give yourself more information before you decide what to do. Notice thoughts about how a conversation will go. Test a prediction in a small activity, record what happens, and use that experience to choose your next step.",
    includes: [
      "Examples of common thinking patterns",
      "Activities to test your predictions",
      "Your own record of what actually happened",
    ],
  },
  {
    key: "dating_intimacy",
    searchTitle: "Dating and Relationships When You Stutter",
    title: "Dating, Intimacy & Vulnerability",
    category: "Connection",
    color: "pink",
    avatar: "flower",
    situation: "Let someone get to know you.",
    description:
      "Prepare to share what matters to you. Explore dating conversations, talking about stuttering, and setting personal boundaries.",
    detail:
      "Make space for what you want from a relationship. Explore how to meet someone, share personal things, and respond when a conversation feels difficult. Decide what you want to say and where to set your boundaries.",
    includes: [
      "Examples of dating and personal conversations",
      "Practice for sharing and setting boundaries",
      "Your own plans for conversations that matter",
    ],
  },
  {
    key: "word_swap",
    searchTitle: "Practice Words You Avoid When You Stutter",
    title: "The Word Swap",
    category: "Your voice",
    color: "orange",
    avatar: "scholar",
    situation: "Say the words you choose.",
    description:
      "Work with five words you often replace. Try them in small speaking activities and decide which words you want to use.",
    detail:
      "Start with five words that matter in your life. Notice when you replace them and try using them in small speaking activities. You choose the next step. Changing a word remains an option.",
    includes: [
      "Five words from your own life",
      "Speaking activities with choices at each step",
      "Your word card to use again",
    ],
  },
  {
    key: "speech_toolkit",
    searchTitle: "Speech Tools for Adults Who Stutter",
    title: "The Speech Toolkit",
    category: "Your voice",
    color: "lime",
    avatar: "beanie",
    situation: "Find the tools you want to use.",
    description:
      "Try six speech tools and choose what helps you. Notice the effort each tool takes before you use it in everyday conversations.",
    detail:
      "Build a toolkit around your own experience. Learn how each of six speech tools works, try it privately, and record what you notice. Consider the effort it takes. You decide which tools to keep using.",
    includes: [
      "Clear instructions for six speech tools",
      "Private practice to find what helps you",
      "Your own choice of tools to keep using",
    ],
  },
  {
    key: "understanding_your_voice",
    searchTitle: "Understanding Stuttering: A Guided Program",
    title: "Understanding Your Voice",
    category: "Your voice",
    color: "purple",
    avatar: "curly",
    situation: "Make sense of your stuttering.",
    description:
      "Learn why stuttering can change from one situation to another. Explore the parts other people may not see and connect them to your experience.",
    detail:
      "Understand more of what you experience when you stutter. Learn why speech can vary, examine common beliefs, and explore the thoughts and feelings other people may not see. Connect each lesson to your own life.",
    includes: [
      "Seven days of lessons and examples",
      "Questions to check what you have learned",
      "Private activities about your own experience",
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

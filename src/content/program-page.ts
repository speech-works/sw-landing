// What each program page shows in its kit, daily plan and chat sections.
// Built from copy the site already has: programs.ts (includes, outline), program-lesson-labels.ts (day titles)
// and the examples in ProgramTakeaway. Only Interview Ready has its own named steps, kit items, practice calls and chat lines.
import type { Program } from "./programs";
import { examples } from "@/app/components/ProgramTakeaway";

export type KitIcon = "steps" | "talk" | "choose" | "notes";
export type PracticeCall = { avatar: string; title: string; day: number };
export type ChatBeat = { who: "you" | "speechworks"; text: string };
export type PlanStep = { title: string; first: number; last: number };
/**
 * Hero picture, three beats: you think (thought bubble and a "?"), Speechworks helps, then the real moment
 * (the "?" becomes a lightbulb and you, or the other person, speak). Lines use "\n" for line breaks.
 */
export type HeroStory = { thought: string; help: string; real: string; realAvatar: string; final: { who: "you" | "real"; text: string }; alt: string };

export const heroStories: Record<string, HeroStory> = {
  interview_ready: { thought: "What do I say\nabout myself?", help: "Start with one\nproject you know.", real: "Real interview", realAvatar: "hijab",
    final: { who: "you", text: "I led the move to\na new system." },
    alt: "You wonder what to say about yourself. Speechworks suggests starting with one project you know. In the real interview, you talk about the project." },
  hard_conversations: { thought: "What if they ask\nsomething new?", help: "Let's practice\nthe call first.", real: "Real call", realAvatar: "saltpepper",
    final: { who: "you", text: "Hi, I am calling\nabout a repair." },
    alt: "You worry they will ask something new. Speechworks offers to practice the call first. Then you make the real call about a repair." },
  art_of_disclosure: { thought: "Should I\ntell them?", help: "You decide what\nto share, and when.", real: "A coworker", realAvatar: "bob",
    final: { who: "you", text: "I stutter. Give\nme a moment." },
    alt: "You wonder whether to tell a coworker. Speechworks reminds you that you decide what to share. Then you tell your coworker in your own words." },
  panic_button: { thought: "What if I\nfreeze?", help: "Notice three\nthings around you.", real: "Real conversation", realAvatar: "coach",
    final: { who: "you", text: "I would like\nto start." },
    alt: "You worry about freezing before speaking. Speechworks asks you to notice three things around you. Then you say you would like to start." },
  bouncing_back: { thought: "I keep going\nover it.", help: "What actually\nhappened?", real: "Next conversation", realAvatar: "cap",
    final: { who: "you", text: "Hi! Good to\nsee you." },
    alt: "After a hard conversation you keep going over it. Speechworks asks what actually happened. Then you start your next conversation." },
  breaking_thought_traps: { thought: "They will think\nI am odd.", help: "Let's test\nthat thought.", real: "Real moment", realAvatar: "bald",
    final: { who: "real", text: "Go on, what were\nyou saying?" },
    alt: "You think people will judge you. Speechworks suggests testing that thought. In a real moment, the other person asks you to go on." },
  dating_intimacy: { thought: "When do I mention\nmy stutter?", help: "Say it your way,\nor not at all.", real: "A date", realAvatar: "pigtails",
    final: { who: "real", text: "Tell me more\nabout you." },
    alt: "You wonder when to mention your stutter on a date. Speechworks says you can say it your way, or not at all. Your date asks to hear more about you." },
  word_swap: { thought: "Coffee... no,\nmaybe just tea?", help: "Try the word\nyou wanted.", real: "Coffee shop", realAvatar: "workcap",
    final: { who: "you", text: "A coffee,\nplease." },
    alt: "You think about swapping coffee for tea, an easier word. Speechworks suggests trying the word you wanted. At the coffee shop you order a coffee." },
  speech_toolkit: { thought: "My words feel\nstuck.", help: "Try a soft start\non the first word.", real: "Real conversation", realAvatar: "cowboy",
    final: { who: "you", text: "Hey, how are\nyou doing?" },
    alt: "Your words feel stuck. Speechworks suggests a soft start on the first word. Then you greet someone in a real conversation." },
  understanding_your_voice: { thought: "Why does it come\nand go?", help: "Let's look at what\npeople do not see.", real: "A friend", realAvatar: "scholar",
    final: { who: "real", text: "What is it like\nfor you?" },
    alt: "You wonder why your stutter comes and goes. Speechworks helps you look at what people do not see. A friend asks what it is like for you." },
};

type Extra = {
  kitTitle?: string;
  kitIntro?: string;
  prepare?: string[];
  calls?: PracticeCall[];
  planTitle?: string;
  planIntro?: string;
  steps?: string[]; // names, one per step
  stepSizes?: number[];
  chat?: ChatBeat[];
  chatNote?: string;
};

const extras: Record<string, Extra> = {
  interview_ready: {
    kitTitle: "Your interview kit",
    kitIntro: "Fourteen short days to get ready for one interview that matters to you. New days open over time, and you can return to completed days.",
    prepare: [
      "Daily steps to help you prepare your answers",
      'Answer "Tell me about yourself"',
      "Decide whether to mention your stutter",
      "Your notes to use before an interview",
    ],
    calls: [
      { avatar: "phone-call", title: "A first call with a recruiter", day: 2 },
      { avatar: "silver", title: "A full interview", day: 7 },
      { avatar: "hijab", title: "An interviewer who has less time", day: 11 },
      { avatar: "coils", title: "An interview with three people", day: 13 },
    ],
    planTitle: "Three steps to interview day",
    planIntro: "One short step a day. The app shows when you can start the next day.",
    steps: ["Get ready", "Build your answers", "Harder interviews"],
    stepSizes: [4, 5, 5],
    chat: [
      { who: "you", text: "I want to explain my work on a project." },
      { who: "speechworks", text: "Tell me about a project you worked on." },
      { who: "you", text: "I led the move to a new system…" },
      { who: "speechworks", text: "What was your part in it?" },
    ],
    chatNote: "Then choose the examples you want to use in your interview. You choose what to try.",
  },
};

const CALLS = /^(\d+) AI practice calls?$/;

function evenSplit(total: number, parts = 3) {
  const n = Math.min(parts, total);
  return Array.from({ length: n }, (_, i) => Math.floor(total / n) + (i < total % n ? 1 : 0));
}

/** Picks a doodle for a kit item from its words. */
function iconFor(text: string, index: number): KitIcon {
  const t = text.toLowerCase();
  if (/note|card|plan|save/.test(t)) return "notes";
  if (/decide|choose|whether/.test(t)) return "choose";
  if (/answer|say|speak|talk|conversation|call|practice/.test(t)) return "talk";
  if (/daily|step|days|reading|instructions|review/.test(t)) return "steps";
  return (["steps", "talk", "choose", "notes"] as const)[index % 4];
}

export function programPage(program: Program) {
  const x = extras[program.key] ?? {};
  const example = examples[program.key];
  const callLine = program.includes.map((item) => item.match(CALLS)).find(Boolean);
  const prepare = (x.prepare ?? program.includes.filter((item) => !CALLS.test(item))).map((text, i) => ({ text, icon: iconFor(text, i) }));

  const sizes = x.stepSizes && x.stepSizes.reduce((a, b) => a + b, 0) === program.outline.length ? x.stepSizes : evenSplit(program.outline.length);
  let start = 1;
  const steps: PlanStep[] = sizes.map((size, i) => {
    const step = { title: x.steps?.[i] ?? `Step ${i + 1}`, first: start, last: start + size - 1 };
    start += size;
    return step;
  });

  const chat: ChatBeat[] =
    x.chat ??
    (example
      ? [
          { who: "you", text: example.stages[0].text },
          { who: "speechworks", text: example.stages[1].text },
          { who: "you", text: example.stages[2].text },
        ]
      : []);

  return {
    kitTitle: x.kitTitle ?? "What you get",
    kitIntro: x.kitIntro ?? "New days open over time. You can return to completed days.",
    prepare,
    callCount: callLine ? Number(callLine[1]) : null,
    calls: x.calls ?? [],
    planTitle: x.planTitle ?? "Your daily plan",
    planIntro: x.planIntro ?? "The app shows when you can start the next day. You can return to completed days.",
    steps,
    chatTitle: example?.title ?? "",
    chatIntro: example?.description ?? "",
    chat,
    chatNote: x.chatNote ?? "You choose what to try.",
  };
}
export type ProgramPageData = ReturnType<typeof programPage>;

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
 * Hero story, in a triangle: the other person asks (bottom right), you get stuck (a thought), Speechworks drops in at the top
 * and whispers one tip, then you answer. Lines use "\n" for line breaks.
 */
export type StoryScript = { prop?: "phone"; real: string; realAvatar: string; ask: string; thought: string; help: string; answer: string; alt: string };

export const storyScripts: Record<string, StoryScript> = {
  // the free "Try a day" page (not a program): the same story, with this day's if-then idea
  free_day: { real: "Interviewer", realAvatar: "hijab", ask: "Tell me about a\nproject you led.", thought: "I need a\nmoment to think.",
    help: "In 642 tests,\nif-then plans\nhelped people\na little.", answer: "Give me a moment\nto think about\nthat.",
    alt: "The interviewer says: Tell me about a project you led. You think: I need a moment to think. Speechworks whispers: In 642 tests, if-then plans helped people a little. You answer: Give me a moment to think about that." },
  interview_ready: { real: "Interviewer", realAvatar: "hijab", ask: "Tell me a little\nabout yourself.", thought: "Should I tell\nthem I stutter?",
    help: "338 viewers rated\nan 'I stutter'\nopener as more\nconfident.", answer: "Sure. I stutter,\nso I may pause.\nI'm a designer.",
    alt: "The interviewer says: Tell me a little about yourself. You think: Should I tell them I stutter? Speechworks whispers: 338 viewers rated an 'I stutter' opener as more confident. You answer: Sure. I stutter, so I may pause. I'm a designer." },
  hard_conversations: { real: "Phone call", realAvatar: "saltpepper", ask: "Can I have your\norder number,\nplease?", thought: "My mind just\nwent blank.",
    help: "Stress makes\nmemory worse for\neveryone. Keep the\nnumber on paper.", answer: "One moment,\nplease. It's\n44, 17, 92.",
    alt: "On a phone call, the person says: Can I have your order number, please? You think: My mind just went blank. Speechworks whispers: Stress makes memory worse for everyone. Keep the number on paper. You answer: One moment, please. It's 44, 17, 92." },
  art_of_disclosure: { real: "Coworker", realAvatar: "bob", ask: "Was your mic\ncutting out on the\ncall?", thought: "Should I just\nblame the mic?",
    help: "In 15 of 18\nstudies, saying\n'I stutter' went\nwell.", answer: "No, it's fine.\nI stutter, so\nI sometimes\npause.",
    alt: "A coworker says: Was your mic cutting out on the call? You think: Should I just blame the mic? Speechworks whispers: In 15 of 18 studies, saying 'I stutter' went well. You answer: No, it's fine. I stutter, so I sometimes pause." },
  panic_button: { real: "Meeting", realAvatar: "coach", ask: "Can you say a\nquick hello to the\nteam?", thought: "Please,\nnot now.",
    help: "75 of 177 adults\nsaid stuttering on\npurpose made fear\nsmaller.", answer: "H-h-hello,\neveryone.\nI'm Sam,\nfrom design.",
    alt: "In a meeting, someone says: Can you say a quick hello to the team? You think: Please, not now. Speechworks whispers: 75 of 177 adults said stuttering on purpose made fear smaller. You answer: H-h-hello, everyone. I'm Sam, from design." },
  bouncing_back: { real: "Friend", realAvatar: "cap", ask: "Still thinking\nabout that call?", thought: "I'm trying\nnot to.",
    help: "Pushing a thought\naway often brings\nit back. Say it\nout loud.", answer: "Yes, I still am.\nI got stuck,\nbut I said it all.",
    alt: "A friend says: Still thinking about that call? You think: I'm trying not to. Speechworks whispers: Pushing a thought away often brings it back. Say it out loud. You answer: Yes, I still am. I got stuck, but I said it all." },
  breaking_thought_traps: { prop: "phone", real: "Coworker", realAvatar: "bald", ask: "Sorry, one second.\nMy phone.", thought: "He's bored.\nIt's my stutter.",
    help: "In 44 studies,\nanxious minds read\npauses as bad.\nIt's just a phone.", answer: "No problem.\nSo, here is my\nplan for Friday.",
    alt: "A coworker looks at his ringing phone and says: Sorry, one second. My phone. You think: He's bored. It's my stutter. Speechworks whispers: In 44 studies, anxious minds read pauses as bad. It's just a phone. You answer: No problem. So, here is my plan for Friday." },
  dating_intimacy: { real: "A date", realAvatar: "pigtails", ask: "You first. What do\nyou do?", thought: "Should I tell\nher I stutter?",
    help: "25 adults tried\nboth. Telling or\nnot felt the same.\nYour choice.", answer: "I teach m-music\nto kids. I love it.\nAnd you?",
    alt: "On a date, she says: You first. What do you do? You think: Should I tell her I stutter? Speechworks whispers: 25 adults tried both. Telling or not felt the same. Your choice. You answer: I teach m-music to kids. I love it. And you?" },
  word_swap: { real: "Coffee shop", realAvatar: "barista", ask: "What name should I\nwrite on your cup?", thought: "Jaspreet is hard.\nJust say Jas?",
    help: "132 of 133 adults\nwho stutter swap\nlike this. Then\nadd the full name.", answer: "Jas. Jaspreet,\nactually.",
    alt: "At a coffee shop, the barista says: What name should I write on your cup? You think: Jaspreet is hard. Just say Jas? Speechworks whispers: 132 of 133 adults who stutter swap like this. Then add the full name. You answer: Jas. Jaspreet, actually." },
  speech_toolkit: { real: "Neighbor", realAvatar: "cowboy", ask: "Coffee at my place\non Saturday?", thought: "The S always\ngets stuck.",
    help: "Try a soft start.\nSay the S gently\nand keep your\nvoice moving.", answer: "Sssaturday\nworks. See you\nat ten!",
    alt: "A neighbor says: Coffee at my place on Saturday? You think: The S always gets stuck. Speechworks whispers: Try a soft start. Say the S gently and keep your voice moving. You answer: Sssaturday works. See you at ten!" },
  understanding_your_voice: { real: "A friend", realAvatar: "scholar", ask: "You were fine last\nweek. What\nhappened?", thought: "Did I do\nsomething wrong?",
    help: "Studies show\nstuttering changes\nday to day. You\ndid nothing wrong.", answer: "Nothing happened.\nMy stutter\nchanges day\nto day.",
    alt: "A friend says: You were fine last week. What happened? You think: Did I do something wrong? Speechworks whispers: Studies show stuttering changes day to day. You did nothing wrong. You answer: Nothing happened. My stutter changes day to day." },
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

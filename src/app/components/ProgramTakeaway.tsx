import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type Example = {
  title: string;
  description: string;
  programName: string;
  slug: string;
  stages: { label: string; text: string }[];
};

const examples: Record<string, Example> = {
  interview_ready: {
    title: "Practice that starts with your experience.",
    description: "Interview Ready gives you questions and AI rehearsals to work with. You build answers from your own experience and consider how to use them when an interviewer asks something differently.",
    programName: "Interview Ready",
    slug: "interview-ready",
    stages: [
      { label: "Something to work on", text: "I want to explain what I contributed to a project." },
      { label: "A way to practise", text: "Try an answer in an AI interview, respond to follow-up questions, and reflect on what you want to explain more clearly." },
      { label: "Something to take forward", text: "Choose examples from your work that you can adapt to the questions you are asked." },
    ],
  },
  hard_conversations: {
    title: "From putting off a call to trying an approach.",
    description: "The Hard Conversations gives you AI calls to practise explaining a problem, asking for help, and responding when the answer is no. You can try different responses before deciding what to use on a real call.",
    programName: "The Hard Conversations",
    slug: "hard-conversations",
    stages: [
      { label: "Something to work on", text: "There is a repair I need to call about." },
      { label: "A way to practise", text: "Explain a problem in an AI call. Afterwards, notice what you said and what you would try differently." },
      { label: "Something to take forward", text: "Choose an opening and the details you need for your call. Afterwards, use what happened to prepare for the next one." },
    ],
  },
  art_of_disclosure: {
    title: "Decide what feels right for you.",
    description: "The Art of Disclosure offers ways to think about talking about stuttering. You decide whether to share, with whom, and how much. Your choice can be different in another situation.",
    programName: "The Art of Disclosure",
    slug: "art-of-disclosure",
    stages: [
      { label: "Something to work on", text: "I am thinking about telling a new colleague that I stutter." },
      { label: "A way to practise", text: "Explore examples and try saying what you would want this person to know, in your own words." },
      { label: "Something to take forward", text: "Decide whether to have the conversation. You can change what you share as the person or situation changes." },
    ],
  },
};

export default function ProgramTakeaway({ programKey, linkToProgram = false }: { programKey: string; linkToProgram?: boolean }) {
  const example = examples[programKey];
  if (!example) return null;
  return (
    <section className="program-takeaway" aria-labelledby={`takeaway-${programKey}`}>
      <div className="takeaway-copy">
        <p className="section-kicker">What that can look like</p>
        <h2 id={`takeaway-${programKey}`}>{example.title}</h2>
        <p>{example.description}</p>
        {linkToProgram && <Link href={`/programs/${example.slug}/`} className="text-link">See inside {example.programName} <ArrowUpRight size={16} aria-hidden="true" /></Link>}
      </div>
      <figure className="takeaway-note">
        <p className="takeaway-label">One possible starting point</p>
        <dl className="takeaway-stages">
          {example.stages.map((stage) => (
            <div key={stage.label}>
              <dt>{stage.label}</dt>
              <dd>{stage.text}</dd>
            </div>
          ))}
        </dl>
        <figcaption>Illustrative example. Your situation and next steps are yours to choose.</figcaption>
      </figure>
    </section>
  );
}

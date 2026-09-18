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
  "interview_ready": {
    "title": "Try an interview question.",
    "description": "Practice an answer based on your work.",
    "programName": "Interview Ready",
    "slug": "interview-ready",
    "stages": [
      {
        "label": "Your situation",
        "text": "I want to explain my work on a project."
      },
      {
        "label": "Your practice",
        "text": "Answer a question from the AI interviewer. Try the questions it asks next."
      },
      {
        "label": "Your next step",
        "text": "Choose the examples you want to use in your interview."
      }
    ]
  },
  "hard_conversations": {
    "title": "Prepare for a phone call.",
    "description": "Try what you want to say before a real call.",
    "programName": "The Hard Conversations",
    "slug": "hard-conversations",
    "stages": [
      {
        "label": "Your situation",
        "text": "I need to call someone about a repair."
      },
      {
        "label": "Your practice",
        "text": "Explain the problem to an AI caller. Notice what you want to say more clearly."
      },
      {
        "label": "Your next step",
        "text": "Choose your first sentence and write down the details you need."
      }
    ]
  },
  "art_of_disclosure": {
    "title": "Practice telling someone.",
    "description": "You decide whether to talk about your stutter.",
    "programName": "The Art of Disclosure",
    "slug": "art-of-disclosure",
    "stages": [
      {
        "label": "Your situation",
        "text": "I am thinking about telling someone at work that I stutter."
      },
      {
        "label": "Your practice",
        "text": "Read examples and try saying what you want them to know."
      },
      {
        "label": "Your next step",
        "text": "Decide whether to tell them and what to share."
      }
    ]
  }
};

export default function ProgramTakeaway({ programKey, linkToProgram = false }: { programKey: string; linkToProgram?: boolean }) {
  const example = examples[programKey];
  if (!example) return null;
  return (
    <section className="program-takeaway" aria-labelledby={`takeaway-${programKey}`}>
      <div className="takeaway-copy">
        <h2 id={`takeaway-${programKey}`}>{example.title}</h2>
        <p>{example.description}</p>
        {linkToProgram && <Link href={`/programs/${example.slug}/`} className="text-link">See inside {example.programName} <ArrowUpRight size={16} aria-hidden="true" /></Link>}
      </div>
      <figure className="takeaway-note">
        <p className="takeaway-label">An example</p>
        <dl className="takeaway-stages">
          {example.stages.map((stage) => (
            <div key={stage.label}>
              <dt>{stage.label}</dt>
              <dd>{stage.text}</dd>
            </div>
          ))}
        </dl>
        <figcaption>You choose what to try.</figcaption>
      </figure>
    </section>
  );
}

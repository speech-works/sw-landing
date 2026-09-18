import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const steps = [
  {
    title: "Choose a program.",
    description: "Pick what you want to practice, such as an interview or a phone call.",
  },
  {
    title: "Follow the lessons.",
    description: "Read a lesson and try the activity. New lessons open over time.",
  },
  {
    title: "Use what helps.",
    description: "Try what you learned in a conversation. You choose what to use again.",
  },
];

function JourneyRoad({ reverse = false }: { reverse?: boolean }) {
  const turn = reverse
    ? "M 500 0 H 140 Q 60 0 60 70 V 170 Q 60 240 140 240 H 500"
    : "M 60 0 H 860 Q 940 0 940 70 V 170 Q 940 240 860 240 H 500";

  return (
    <>
      <svg className="program-road program-road-desktop" viewBox="0 0 1000 240" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path className="program-road-outline" d={turn} />
        <path className="program-road-fill" d={turn} />
        <path className="program-road-dashes" d={turn} />
      </svg>
      <svg className="program-road program-road-mobile" viewBox="0 0 1 240" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path className="program-road-outline" d="M .5 0 V 240" />
        <path className="program-road-fill" d="M .5 0 V 240" />
        <path className="program-road-dashes" d="M .5 0 V 240" />
      </svg>
    </>
  );
}

const outcomeSteps = [
  { title: "Pick a topic.", description: "Each program has a daily plan. Check its lessons and price in the app." },
  { title: "Follow the lessons.", description: "Read, write, or speak, depending on the activity. New days open over time." },
  { title: "Use what you learned.", description: "Try an idea in a conversation. Notice what helps and what you would change." },
];

export default function HowProgramsWork({ outcome = false }: { outcome?: boolean }) {
  const shownSteps = outcome ? outcomeSteps : steps;
  return (
    <section className="program-steps section-wrap" id="how-it-works" aria-labelledby="steps-title">
      <div className="program-steps-heading">
        <h2 id="steps-title">How it works</h2>
      </div>
      <ol className="program-steps-list">
        {shownSteps.map((step, index) => (
          <li key={step.title}>
            {index < shownSteps.length - 1 && <JourneyRoad reverse={index === 1} />}
            <span className="step-number" aria-hidden="true"><span>0{index + 1}</span></span>
            <div className="program-step-card">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="program-steps-next">
        {!outcome && <p>Come back to your notes and completed lessons when you need them.</p>}
        <Link className="button button-ink pressable" href="/programs/">See programs <ArrowUpRight size={20} aria-hidden="true" /></Link>
      </div>
    </section>
  );
}

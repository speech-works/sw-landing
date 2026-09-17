import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const steps = [
  {
    title: "Bring something real.",
    description: "A call. An interview. Something you want to understand about your stuttering. Start with what matters to you.",
  },
  {
    title: "Try it and reflect.",
    description: "Explore an approach, try an activity, and notice what was useful and what you would change.",
  },
  {
    title: "Find your own way.",
    description: "Try it in a conversation you choose. Use the experience to decide what to keep practising and what to adapt.",
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

export default function HowProgramsWork() {
  return (
    <section className="program-steps section-wrap" id="how-it-works" aria-labelledby="steps-title">
      <div className="program-steps-heading">
        <p className="section-kicker">A place to begin</p>
        <h2 id="steps-title">Start with guidance.<br />Make it your own.</h2>
        <p className="program-steps-intro">A program gives you lessons and activities to explore. You bring your own situation and decide what to take into everyday life.</p>
      </div>
      <ol className="program-steps-list">
        {steps.map((step, index) => (
          <li key={step.title}>
            {index < steps.length - 1 && <JourneyRoad reverse={index === 1} />}
            <span className="step-number" aria-hidden="true"><span>0{index + 1}</span></span>
            <div className="program-step-card">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="program-steps-next">
        <p>Return to your notes and completed lessons whenever you want a reminder.</p>
        <Link className="button button-ink pressable" href="/programs/">See what you could work on <ArrowUpRight size={20} aria-hidden="true" /></Link>
      </div>
    </section>
  );
}

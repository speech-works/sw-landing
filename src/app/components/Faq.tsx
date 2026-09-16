import { Plus } from "lucide-react";
import AnimatedDetails from "./AnimatedDetails";

const questions = [
  [
    "Who is Speechworks for?",
    "Speechworks is for adults who stutter, also called stammering. Its programs cover speaking situations such as interviews and everyday phone calls, as well as topics like talking about stuttering.",
  ],
  [
    "What happens in a program?",
    "You work through daily lessons and activities over 7 to 14 days. The outline on each program page shows what you will do.",
  ],
  [
    "Do I need a subscription?",
    "Programs are one-time purchases. Optional membership and extra AI call credits are separate. The app shows the price before you buy.",
  ],
  [
    "Does every program include AI calls?",
    "Interview Ready and The Hard Conversations include AI call practice and bundled credits. Other programs use activities such as writing and speaking practice.",
  ],
  [
    "What if I miss a day?",
    "You can return to your program. New days unlock over time, and you can revisit completed lessons. The app shows which day is available and any next-day waiting time.",
  ],
];

export default function Faq() {
  return (
    <section className="faq-section section-wrap" aria-labelledby="faq-title">
      <div data-reveal>
        <h2 id="faq-title">Questions about the app</h2>
      </div>
      <div className="faq-list">
        {questions.map(([question, answer]) => (
          <AnimatedDetails key={question} summary={<>
              {question}
              <Plus size={20} aria-hidden="true" />
            </>}>
            <p>{answer}</p>
          </AnimatedDetails>
        ))}
      </div>
    </section>
  );
}

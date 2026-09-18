import { Plus } from "lucide-react";
import AnimatedDetails from "./AnimatedDetails";

const questions = [
  [
    "Who is Speechworks for?",
    "Adults who stammer. Stammering is also called stuttering. You can practice speaking or learn about your stammer."
  ],
  [
    "Is the app free?",
    "The app is free to download. Daily practice and one short AI call a week are free. Programs cost extra: pay once for each program. You do not need a subscription. Membership and extra AI call credits are optional purchases. See prices in the app."
  ],
  [
    "Will this cure my stammer?",
    "No. Speechworks is practice for real situations, like an interview or a phone call. It does not treat stammering or replace a speech therapist. There is no fluency score."
  ],
  [
    "How long is a program?",
    "Programs have 7 to 14 days of lessons and activities. New lessons open over time. See the lessons on each program page before you choose."
  ],
  [
    "What if I miss a day?",
    "Continue when you return. The app shows when the next lesson opens. Your notes and completed lessons stay available after you finish."
  ],
  [
    "How do AI calls work?",
    "You talk to an AI character in the app. It responds to what you say. It is not a real person. The caller is designed to give you time to answer, including when you stutter. One call credit pays for one AI call."
  ],
  [
    "Which programs include AI calls?",
    "Job interview practice (Interview Ready in the app) includes 10 AI call credits. Phone call practice (The Hard Conversations) includes 8. Other programs use activities such as writing and speaking practice."
  ]
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

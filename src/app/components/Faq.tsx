import { Plus } from "lucide-react";
import AnimatedDetails from "./AnimatedDetails";

const questions = [
  [
    "Who is Speechworks for?",
    "Speechworks is for adults who stutter, also called stammering. You can prepare for interviews and phone calls, explore speech tools, or learn more about your stuttering.",
  ],
  [
    "What happens in a program?",
    "Each program has 7 to 14 days of lessons and activities for a specific goal. Read the daily outline on the program page to see what you will do.",
  ],
  [
    "Do I need a subscription?",
    "No subscription is required to buy a program. Pay once for the program you choose. Optional membership and extra AI call credits cost extra. The app shows the price before you buy.",
  ],
  [
    "How does AI call practice work?",
    "AI means artificial intelligence. You speak with an AI character in the app, and it responds to what you say. This lets you prepare for a real conversation. The AI caller is designed to give you time to answer, including when you stutter.",
  ],
  [
    "Does every program include AI calls?",
    "Interview Ready and The Hard Conversations include AI call practice and bundled credits. Other programs use activities such as writing and speaking practice.",
  ],
  [
    "What if I miss a day?",
    "You can continue when you return. New days become available over time, and completed lessons stay available. The app shows when you can start the next day.",
  ],
  [
    "Are more programs coming?",
    "Yes. We collaborate with speech-language pathologists and adults who stutter to develop new daily programs. New real-world conversation topics and clinical guides are regularly added to the app.",
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

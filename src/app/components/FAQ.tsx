"use client";
import { useState } from "react";
import { SW_NAME } from "../constants";

const faqs = [
  {
    q: `Is ${SW_NAME} right for me?`,
    a: `${SW_NAME} is designed for anyone who wants to improve their fluency, confidence, and communication skills.`,
  },
  {
    q: "How does the community work?",
    a: "Our forum lets you connect with peers, share experiences, and get encouragement in a safe environment.",
  },
  {
    q: "What if I need more support?",
    a: "Pro members can access personalized feedback and priority support. You can also connect with certified speech therapists.",
  },
];

export default function Faq() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section id="faq" className="max-w-4xl mx-auto px-6 py-16">
      <h2 className="text-2xl font-bold text-white mb-6">FAQ</h2>
      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openFaq === idx;
          return (
            <div key={idx} className="border rounded-lg bg-white">
              <button
                onClick={() => setOpenFaq(isOpen ? null : idx)}
                className="w-full flex justify-between items-center px-4 py-3 text-left font-medium text-gray-800 cursor-pointer"
              >
                {faq.q}
                <span className="text-xl">{isOpen ? "−" : "+"}</span>
              </button>

              {/* animated container */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-4 pb-4 text-gray-600">{faq.a}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

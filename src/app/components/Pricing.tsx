"use client";
import { useState } from "react";

const pricingPlans = [
  {
    title: "Get Started",
    price: "$0",
    period: "/month",
    button: "Try it Free",
    features: [
      "One free activity per day",
      "Core fluency techniques",
      "Supportive community access",
      "Progress tracking dashboard",
    ],
  },
  {
    title: "Pro",
    price: "$11.99",
    period: "/month",
    button: "Upgrade to Pro",
    features: [
      "Everything in Free",
      "Build resilience with stamina-based activities",
      "Unlimited community posts",
      "Access to the therapist directory",
      "Unlock advanced speech techniques",
      "Personalized feedback & exercises",
      "Priority member support",
    ],
  },
  {
    title: "Pro",
    price: "$9.90",
    period: "/month (billed annually)",
    button: "Claim My Discount",
    features: [
      "Everything in the Pro plan",
      "Save with discounted annual rate",
      "Access to exclusive webinars",
      "Early access to beta features",
      "Lead and inspire the community",
    ],
  },
];

export default function Pricing() {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <section id="pricing" className="bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-(--brand-brown) text-center mb-10">
          Pricing
        </h2>

        {/* Carousel wrapper */}
        <div className="flex flex-col md:flex-row md:grid md:grid-cols-3 gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory p-8">
          {pricingPlans.map((plan, idx) => {
            const isHovered = hoverIndex === idx;

            return (
              <div
                key={idx}
                onMouseEnter={() => setHoverIndex(idx)}
                onMouseLeave={() => setHoverIndex(null)}
                className={`flex flex-col rounded-xl border bg-white p-6 shadow-sm transition-all duration-300 snap-center
                  ${
                    isHovered
                      ? "scale-105 shadow-lg z-10"
                      : hoverIndex !== null
                      ? "scale-95 opacity-80"
                      : "scale-100"
                  }
                `}
              >
                <h3 className="text-lg font-semibold text-(--brand-brown)">
                  {plan.title}
                </h3>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {plan.price}{" "}
                  <span className="text-lg font-normal text-gray-600">
                    {plan.period}
                  </span>
                </p>
                <button className="mt-4 w-full cursor-pointer rounded-lg bg-gray-100 px-4 py-2 font-medium text-gray-800 hover:bg-gray-200 transition">
                  {plan.button}
                </button>
                <ul className="mt-6 space-y-2 text-gray-700 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <span>✔️</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

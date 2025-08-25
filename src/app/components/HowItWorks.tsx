"use client";
import Image from "next/image";
import communityImg from "../../../public/assets/community_img.png";
import therapyImg from "../../../public/assets/therapy_img.png";
import resourcesImg from "../../../public/assets/resources_img.png";

const features = [
  {
    title: "Join a Supportive Community of Those Who Understand",
    explainer:
      "Anonymous practice groups, peer feedback, and short weekly challenges to help you build speaking habits and confidence.",
    caption: "Real people, real connections.",
    icon: communityImg,
  },
  {
    title: "Practice with SLP-Backed Resources",
    explainer:
      "Bite-sized, evidence-informed modules and short demos you can practice anywhere to learn practical speaking techniques.",
    caption: "Short, practical exercises you can do anywhere.",
    icon: resourcesImg,
  },
  {
    title: "Find & Book Verified Therapists",
    explainer:
      "Search and book licensed SLPs. You can also interact with therapists for free in the Community via public posts and messages before you book.",
    caption: "Engage first, book when ready.",
    icon: therapyImg,
  },
];

export default function HowItWorks() {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Headline & subhead */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-(--brand-brown)">
            Practice. Connect. Improve.
          </h2>
          <p className="mt-3 text-gray-700">
            Daily exercises, peer support, and vetted therapists — everything
            you need to build real speaking confidence.
          </p>
        </div>

        {/* Cards (explainers only) */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {features.map((f, i) => {
            const titleId = `howitworks-title-${i}`;
            return (
              <article
                key={f.title}
                aria-labelledby={titleId}
                className="p-6 border rounded-xl shadow-sm transition transform hover:-translate-y-1 duration-200 flex flex-col h-full bg-white"
              >
                <div className="mb-4 relative rounded-lg overflow-hidden h-48 sm:h-64 md:h-72">
                  <Image
                    src={f.icon}
                    alt={`${f.title} illustration`}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="text-sm text-gray-500 mb-3">{f.caption}</div>

                <div className="flex-1 flex flex-col">
                  <h3
                    id={titleId}
                    className="text-xl font-semibold text-(--brand-brown)"
                  >
                    {f.title}
                  </h3>

                  <p className="mt-3 text-gray-600">{f.explainer}</p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Optional trust line (keeps the page credible) */}
        <div className="mt-8 text-center text-sm text-gray-500">
          200+ verified SLPs • WCAG 2.1 AA • Loved by our members
        </div>
      </div>
    </section>
  );
}

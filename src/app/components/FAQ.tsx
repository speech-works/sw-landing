"use client";

import React, { useEffect, useMemo, useState } from "react";
import { SW_NAME } from "../constants";
import SearchBar from "./SearchBar"; // Make sure the path is correct

type FaqItem = {
  q: string;
  a: string;
};

const faqs: FaqItem[] = [
  {
    q: `Is ${SW_NAME} right for me?`,
    a: `${SW_NAME} is built for people who stutter (PWS) at every stage — from those just discovering resources to people who practice daily and those who lead peer groups. If you’re supporting someone who stutters, a clinician, or simply curious about improving communication confidence, you’ll find tailored tools, evidence-backed exercises, and a supportive community here.`,
  },
  {
    q: `What are the core parts of ${SW_NAME}?`,
    a: "Three integrated pillars: a gamified Community Forum for peer support and challenges; an SLP-backed Academy with progressive practice modules and quizzes; and a vetted Therapist Discovery marketplace for finding and booking certified speech-language pathologists.",
  },
  {
    q: "Do I have to reveal my real name or share recordings publicly?",
    a: "No — anonymity is the default. You can choose a display name, control what you share, and keep recordings private or share them only with selected peers or your therapist.",
  },
  {
    q: "Is the Academy actually based on clinical techniques?",
    a: "Yes. The Academy uses SLP-approved exercises and evidence-informed techniques (e.g., stuttering modification, fluency shaping, mindful breathing). Modules are structured with step-by-step practice, short video/audio demos, and quiz questions so learning is active and measurable.",
  },
  {
    q: "How does the gamification work — will it feel like a game for adults too?",
    a: "We designed gamification to motivate, not trivialize. Badges, streaks, friendly challenges, and milestone celebrations are paired with meaningful progress metrics (practice frequency, completion rate, confidence scores) so the experience is motivating for both teens and adults.",
  },
  {
    q: `How do I find and book a therapist on ${SW_NAME}?`,
    a: "Search the Therapist Directory by specialization, language, availability, and ratings. Each therapist profile shows verified credentials, peer reviews from PWS, service offerings, and real-time booking. Sessions are scheduled and paid through the platform for a streamlined experience.",
  },
  {
    q: "Are the therapists vetted? How are reviews handled?",
    a: "Therapists submit qualifications and practice details and are reviewed before listing. Reviews are written by people who stutter and help others choose a provider — we monitor reviews for authenticity and constructive feedback.",
  },
  {
    q: `Will ${SW_NAME} replace in-person therapy?`,
    a: `No — ${SW_NAME} is designed to complement clinical care. Our Academy and community help with self-practice, confidence-building, and maintenance. For diagnosis, personalized treatment plans, or high-stakes therapy decisions, work directly with a licensed SLP (many of whom you can find through our directory).`,
  },
  {
    q: "How do you measure progress?",
    a: "We track practice frequency, module completion, user-reported communication confidence, reduction in avoidance behaviors, and activity completion rates. You can view progress reports and share them with your therapist to guide treatment.",
  },
  {
    q: "Is my data safe and private?",
    a: "We follow industry best practices for data security and privacy: encrypted storage and transport, granular privacy controls for posts and recordings, and a detailed Privacy Policy explaining what we collect and why. You always control who sees your content.",
  },
  {
    q: `What does Accessibility mean on ${SW_NAME}?`,
    a: "Accessibility is core — we build to WCAG 2.1 AA standards so people with visual, motor, or cognitive differences can use the platform. Features include keyboard navigation, clear contrast, larger type options, and accessible media controls.",
  },
  {
    q: "How much does it cost?",
    a: "We offer a free tier that includes the community, basic Academy modules, and practice tools. Pro features (full Academy, advanced progress reports, priority support, and discounts on therapist bookings) are available via subscription. Therapist session fees are set by the clinician. See our Pricing page for current plans.",
  },
  {
    q: "What languages do you support?",
    a: "Our core interface and most Academy content are in English today, and we’re expanding multilingual content based on user demand. Therapist directory includes clinicians who offer sessions in multiple languages — filter profiles by language when booking.",
  },
  {
    q: `Can minors use ${SW_NAME}?`,
    a: "Yes, with supervision. Minors should join with a parent/guardian managing the account and consenting to recordings or therapist sessions. Therapists follow professional practice guidelines for treating children and adolescents.",
  },
  {
    q: "How do I get started right now?",
    a: "Sign up for a free account, complete a short onboarding (tell us your goals and practice availability), and we’ll recommend a starter pathway from the Academy and a few friendly community challenges so you can begin practicing immediately.",
  },
  {
    q: `I’m an SLP — how can I join the ${SW_NAME} therapist network?`,
    a: "We welcome SLPs. Apply via the ‘For Clinicians’ page: submit credentials, a short profile, and practice details. Once verified, you can list services, accept bookings, view client progress reports (with consent), and reach a motivated global client base.",
  },
  {
    q: "What if I need help or want to report something in the community?",
    a: "We have in-app support and clear community guidelines. You can report content or users directly from a post, and our moderation team reviews reports quickly. Pro members also have priority support channels.",
  },
  {
    q: "Do you offer refunds or trial periods?",
    a: "We offer a trial period for Pro subscriptions (check the pricing page for current offers). Refunds for subscriptions follow the terms outlined in our Refund Policy; bookings with therapists follow the therapist’s cancellation and refund rules, which are shown at checkout.",
  },
];

const PER_PAGE = 5;

export default function Faq() {
  const [openFaq, setOpenFaq] = useState<number | null>(null); // global index
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    if (!s) return faqs;
    return faqs.filter((f) => f.q.toLowerCase().includes(s));
  }, [search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const start = currentPage * PER_PAGE;
  const pageFaqs = filtered.slice(start, start + PER_PAGE);

  // reset page when search changes
  useEffect(() => {
    setCurrentPage(0);
    // close open FAQ if it falls outside new filtered set
    setOpenFaq(null);
  }, [search]);

  // ensure currentPage in bounds when filtered length changes (e.g., after deleting search)
  useEffect(() => {
    if (currentPage >= totalPages) setCurrentPage(Math.max(0, totalPages - 1));
  }, [totalPages, currentPage]);

  const handleSearch = (query: string) => {
    setSearch(query);
  };

  return (
    <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-white">FAQ</h2>

        <div className="w-full sm:w-1/2">
          <SearchBar
            placeholder="Search FAQs by question..."
            onSearch={handleSearch}
          />
        </div>
      </div>

      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="rounded-lg bg-white p-4 text-gray-700">
            No FAQs match your search.
          </div>
        ) : (
          <div className="transition-all duration-500 ease-in-out opacity-100">
            {pageFaqs.map((faq, idx) => {
              const globalIdx = start + idx;
              const isOpen = openFaq === globalIdx;
              return (
                <div
                  key={globalIdx}
                  className="border rounded-lg bg-white mb-4"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : globalIdx)}
                    className="w-full flex justify-between items-center px-4 py-3 text-left font-medium text-gray-800 cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <span className="text-xl" aria-hidden>
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  <div
                    className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out px-4 pb-4 ${
                      isOpen ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ maxHeight: isOpen ? 800 : 0 }}
                  >
                    <div className="pt-2 text-gray-600">{faq.a}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* pagination controls */}
      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="text-sm text-gray-300">
          Showing {filtered.length === 0 ? 0 : start + 1}–
          {Math.min(start + PER_PAGE, filtered.length)} of {filtered.length}{" "}
          result{filtered.length !== 1 ? "s" : ""}
        </div>

        <nav className="flex items-center gap-2" aria-label="FAQ pagination">
          <button
            onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            className="px-3 py-1 rounded-md bg-white text-gray-800 disabled:opacity-40 cursor-pointer"
          >
            Prev
          </button>

          {/* page numbers - show up to 5 page buttons centered around currentPage */}
          <div className="hidden sm:flex items-center gap-1">
            {Array.from({ length: totalPages }).map((_, i) => {
              // limit render for large page counts
              if (totalPages > 9) {
                // render first, last, and neighbours only
                if (
                  i === 0 ||
                  i === totalPages - 1 ||
                  Math.abs(i - currentPage) <= 1
                ) {
                  return (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i)}
                      aria-current={i === currentPage ? "page" : undefined}
                      className={`px-3 py-1 rounded-md cursor-pointer ${
                        i === currentPage
                          ? "bg-white text-gray-900"
                          : "bg-transparent text-gray-300"
                      }`}
                    >
                      {i + 1}
                    </button>
                  );
                }
                // show ellipsis where appropriate
                if (i === 1 && currentPage > 3) {
                  return (
                    <span key={i} className="px-2 text-gray-400">
                      …
                    </span>
                  );
                }
                if (i === totalPages - 2 && currentPage < totalPages - 4) {
                  return (
                    <span key={i} className="px-2 text-gray-400">
                      …
                    </span>
                  );
                }
                return null;
              }

              return (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  aria-current={i === currentPage ? "page" : undefined}
                  className={`px-3 py-1 rounded-md cursor-pointer ${
                    i === currentPage
                      ? "bg-white text-gray-900"
                      : "bg-transparent text-gray-300"
                  }`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>

          <button
            onClick={() =>
              setCurrentPage((p) => Math.min(totalPages - 1, p + 1))
            }
            disabled={currentPage >= totalPages - 1}
            className="px-3 py-1 rounded-md bg-white text-gray-800 disabled:opacity-40 cursor-pointer"
          >
            Next
          </button>
        </nav>
      </div>
    </section>
  );
}

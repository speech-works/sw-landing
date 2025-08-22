"use client";
import { useState } from "react";
import Image from "next/image";
import mayankImg from "../../../public/assets/mayank_avatar.jpeg";
import alexImg from "../../../public/assets/alex_avatar.jpg";
import alexaImg from "../../../public/assets/alexa_avatar.jpg";
import josephImg from "../../../public/assets/joseph_avatar.jpg";
import nicolasImg from "../../../public/assets/nicolas_avatar.jpg";
import alexanderImg from "../../../public/assets/alexander_avatar.jpg";

const testimonials = [
  {
    name: "Mayank, Founder",
    text: "I created SpeechWorks to empower people who stutter with tools, community, and therapy access that I wish I had growing up.",
    avatar: mayankImg,
  },
  {
    name: "Alex, User",
    text: "For the first time, I feel like I’m not alone in my journey. Practicing daily has made me noticeably more fluent and confident.",
    avatar: alexImg,
  },
  {
    name: "Emily, Therapist",
    text: "As a clinician, I see SpeechWorks as a bridge between therapy sessions — it keeps my clients motivated and engaged at home.",
    avatar: alexaImg,
  },
  {
    name: "Mark, User",
    text: "The role-play scenarios are my favorite. They let me practice real conversations without fear or pressure.",
    avatar: alexanderImg,
  },
  {
    name: "Joseph, User",
    text: "What makes SpeechWorks different is the mix of professional techniques and a supportive community all in one place.",
    avatar: josephImg,
  },
  {
    name: "Nicolas, Therapist",
    text: "SpeechWorks makes therapy more interactive and accessible — it’s a great complement to in-person work with my clients.",
    avatar: nicolasImg,
  },
];

export default function TestimonialStack() {
  const [active, setActive] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const visibleTestimonials = testimonials.slice(0, 5); // show 5 only
  const hasMore = testimonials.length > 5;

  return (
    <section id="testimonials" className="max-w-5xl mx-auto px-6 py-16">
      <h2 className="text-2xl font-bold text-white mb-8 text-center">
        What People Say
      </h2>

      <div className="flex items-center justify-center gap-[-40px] relative">
        {visibleTestimonials.map((t, idx) => {
          const isActive = active === idx;
          return (
            <div
              key={idx}
              onMouseEnter={() => setActive(idx)}
              onMouseLeave={() => setActive(null)}
              className={`relative cursor-pointer transition-all duration-300 ease-in-out ${
                isActive
                  ? "z-20 scale-105 opacity-100 translate-x-0"
                  : "z-10 -ml-12 opacity-70 hover:opacity-90"
              }`}
            >
              {/* Avatar circle */}
              <div className="w-40 h-40 relative rounded-full overflow-hidden shadow-lg border-4 border-white">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  fill
                  className="object-cover rounded-full"
                  priority
                  unoptimized
                />
              </div>

              {/* Show text only if active */}
              {isActive && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 text-center bg-white p-4 rounded-xl shadow-xl">
                  <p className="font-semibold text-gray-800">{t.name}</p>
                  <p className="text-gray-600 text-sm mt-2">“{t.text}”</p>
                </div>
              )}
            </div>
          );
        })}

        {/* Ellipsis for extra avatars */}
        {hasMore && (
          <div
            onClick={() => setShowModal(true)}
            className="w-40 h-40 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 font-bold -ml-12 z-0 cursor-pointer transition-all duration-300 hover:bg-gray-300 hover:scale-105"
          >
            ...
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <div className="bg-white rounded-2xl shadow-lg p-8 w-80 text-center relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              ✕
            </button>
            <h3 className="text-lg font-semibold text-(--brand-brown) mb-4">
              See More Reviews
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Read what others are saying about SpeechWorks on your app store.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="https://apps.apple.com/your-app-id"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
              >
                App Store
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=your.app.id"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Google Play
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

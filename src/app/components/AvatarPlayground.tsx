"use client";

import { useRef, useState } from "react";
import { Shuffle } from "lucide-react";
import { gsap, useGSAP, instantMotion } from "@/lib/motion";
import Avatar, { avatarLabels, avatarNames } from "./Avatar";

export default function AvatarPlayground() {
  const [chosen, setChosen] = useState(0);
  const portrait = useRef<HTMLDivElement>(null);
  const animation = useRef<gsap.core.Tween | null>(null);
  const { contextSafe } = useGSAP(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finish = () => { if (preference.matches) animation.current?.progress(1); };
    preference.addEventListener("change", finish);
    return () => preference.removeEventListener("change", finish);
  }, { scope: portrait });
  const pick = contextSafe((index: number, instant: boolean) => {
    if (index === chosen) return;
    animation.current?.revert();
    setChosen(index);
    if (instant || instantMotion()) return;
    animation.current = gsap.fromTo(portrait.current,
      { rotation: -4, scale: 0.91 },
      { rotation: 0, scale: 1, duration: 0.32, ease: "back.out(1.5)", clearProps: "transform" },
    );
  });
  return (
    <div className="avatar-playground" data-reveal>
      <div className="avatar-orbit avatar-orbit-one" aria-hidden="true">
        <div className="depth-portrait" data-depth="0.7"><Avatar name="bob" size={66} /></div>
      </div>
      <div className="avatar-orbit avatar-orbit-two" aria-hidden="true">
        <div className="depth-portrait" data-depth="-0.8"><Avatar name="flower" size={82} /></div>
      </div>
      <div className="avatar-pedestal">
        <div ref={portrait}>
          <Avatar
            name={avatarNames[chosen]}
            size={224}
            alt={`Speechworks avatar with ${avatarLabels[avatarNames[chosen]].toLowerCase()}`}
          />
        </div>
      </div>
      <div className="avatar-options" aria-label="Try an avatar">
        {avatarNames.map((name, i) => (
          <button
            key={name}
            className="avatar-option"
            aria-label={`Try the ${avatarLabels[name].toLowerCase()} avatar`}
            aria-pressed={i === chosen}
            onClick={(event) => pick(i, event.detail === 0)}
          >
            <Avatar name={name} size={45} />
          </button>
        ))}
      </div>
      <button
        className="button button-ink pressable shuffle-button"
        onClick={(event) =>
          pick(
            (chosen + 1 + Math.floor(Math.random() * (avatarNames.length - 1))) % avatarNames.length,
            event.detail === 0,
          )
        }
      >
        <Shuffle size={16} aria-hidden="true" /> Mix it up
      </button>
      <p className="playground-caption">
        Meet the Speechworks cast.
      </p>
    </div>
  );
}

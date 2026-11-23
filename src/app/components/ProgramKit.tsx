"use client";
import Avatar from "./Avatar";
import { useInView } from "./useInView";
import type { KitIcon, ProgramPageData } from "@/content/program-page";

const INK = "#141311";
const line = { fill: "none", stroke: INK, strokeWidth: 2.6, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const BLOBS = [
  "M32 4C47 3 60 13 60 30C61 46 49 60 32 60C15 61 3 49 4 32C3 15 17 5 32 4Z",
  "M30 5C45 2 61 12 59 31C58 47 46 61 30 59C14 58 4 46 5 30C6 15 16 7 30 5Z",
  "M34 4C50 6 61 18 59 34C57 50 44 61 29 59C13 57 3 45 5 29C7 14 19 3 34 4Z",
  "M31 3C47 4 60 15 60 32C59 48 46 60 31 61C15 60 4 47 4 31C5 15 16 3 31 3Z",
];
const COLOURS = ["#9cc0ff", "#ffc48f", "#c7aaf3", "#c6f35b"];

function Doodle({ icon }: { icon: KitIcon }) {
  switch (icon) {
    case "steps":
      return <><path d="M12 48H24V38H36V28H48" {...line} /><path d="M42 22L48 28L42 34" {...line} /></>;
    case "talk":
      return <><path d="M32 13C44 13 52 21 52 31C52 41 44 47 32 47C29 47 26.6 46.6 24 45.7L14 51L17 41C13.4 38.4 12 34.8 12 31C12 21 20 13 32 13Z" {...line} /><path d="M25 33C28 37 36 37 39 33" {...line} /><path d="M26 26V27M38 26V27" {...line} /></>;
    case "choose":
      return <><path d="M32 54V36" {...line} /><path d="M32 36C32 26 24 26 16 18M32 36C32 26 40 26 48 18" {...line} /><path d="M15 26L16 18L24 18M40 18L48 18L49 26" {...line} /></>;
    default:
      return <><path d="M18 12H40L48 20V52H18Z" {...line} /><path d="M40 12V20H48" {...line} /><path d="M25 29H41M25 36H41M25 43H34" {...line} /></>;
  }
}

/** "What you get": a bento of number tiles, a ticked checklist with your avatar, and practice call cards. */
export default function ProgramKit({ data, days, you }: { data: ProgramPageData; days: number; you: string }) {
  const [ref, inView] = useInView<HTMLElement>(0.2);
  const hasCalls = data.callCount !== null;
  return (
    <section ref={ref} className={`pk section-wrap${inView ? " in" : ""}${hasCalls ? "" : " no-calls"}${hasCalls && data.calls.length === 0 ? " calls-only" : ""}`} aria-labelledby="kit-title">
      <div className="pg-head">
        <h2 id="kit-title">{data.kitTitle}</h2>
        <p>{data.kitIntro}</p>
      </div>
      <div className="pk-bento">
        <div className="pk-tile pk-days">
          <svg className="pk-spark" viewBox="0 0 40 40" aria-hidden="true"><path d="M20 2C21 14 26 19 38 20C26 21 21 26 20 38C19 26 14 21 2 20C14 19 19 14 20 2Z" fill="#fff9e9" stroke={INK} strokeWidth="2.6" strokeLinejoin="round" /></svg>
          <em>{days}</em><b>days</b>
        </div>
        <div className="pk-tile pk-prep">
          <h3>Prepare</h3>
          <div className="pk-list">
            <ul>
              {data.prepare.map((item, i) => (
                <li key={item.text} style={{ "--k": i } as React.CSSProperties}>
                  <span className="pk-sticker">
                    <svg viewBox="0 0 64 64" aria-hidden="true">
                      <path d={BLOBS[i % 4]} fill={COLOURS[i % 4]} stroke="#fff" strokeWidth="7" paintOrder="stroke" />
                      <path d={BLOBS[i % 4]} fill="none" stroke={INK} strokeWidth="1.6" transform="translate(32 32) scale(1.11) translate(-32 -32)" />
                      <Doodle icon={item.icon} />
                    </svg>
                    <svg className="pk-tick" viewBox="0 0 30 30" aria-hidden="true">
                      <circle cx="15" cy="15" r="12.5" fill="#ff9657" stroke={INK} strokeWidth="2.2" />
                      <path d="M9 15.5L13.5 20L21.5 10.5" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="pk-text">{item.text}</span>
                </li>
              ))}
            </ul>
            <div className="pk-you">
              <Avatar name={you} size={170} className="pk-you-av" />
              <span className="pk-you-tag">You</span>
            </div>
          </div>
        </div>
        {hasCalls && (
          <div className="pk-tile pk-calls">
            <svg className="pk-phone" viewBox="0 0 64 64" aria-hidden="true"><path d="M17 9C13 10 9 14 10 20C12 37 27 52 44 54C50 55 54 51 55 47L45 39L38 44C31 41 23 33 20 26L25 19Z" fill="#c6f35b" stroke="#c6f35b" strokeWidth="2.6" strokeLinejoin="round" /><path d="M40 12C46 13 51 18 52 24M41 21C43 22 44 23 45 25" fill="none" stroke="#fff9e9" strokeWidth="3" strokeLinecap="round" /></svg>
            <em>{data.callCount}</em><b>AI practice calls</b>
          </div>
        )}
        {data.calls.length > 0 && (
          <ul className="pk-cards" aria-label="Practice calls">
            {data.calls.map((call, i) => (
              <li key={call.title} className={`pk-card c${i % 4}`} style={{ "--k": i } as React.CSSProperties}>
                <small>Day {call.day}</small>
                <b>{call.title}</b>
                <Avatar name={call.avatar} size={200} className="pk-card-av" />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

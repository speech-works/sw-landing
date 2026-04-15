import React from "react";

const DIVIDER_ITEMS = [
  "Adversarial AI",
  "Speech Audit",
  "Clinical Packs",
  "Biological Stamina",
  "Evidence Based",
];

function MarqueeRow({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div
      className="marquee-content flex items-center gap-5 pr-5 text-[11px] font-bold uppercase tracking-[0.16em] text-app-muted sm:gap-6 sm:pr-6 sm:text-xs md:gap-8 md:pr-8 md:text-sm md:tracking-[0.3em]"
      aria-hidden={ariaHidden}
      style={{ animationDuration: "28s" }}
    >
      {DIVIDER_ITEMS.map((item) => (
        <React.Fragment key={`${ariaHidden ? "dup" : "base"}-${item}`}>
          <span className="whitespace-nowrap">{item}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="h-3 w-3 shrink-0 text-brand-100 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4"
          >
            <path d="M12 6v12" />
            <path d="M17.196 9 6.804 15" />
            <path d="m6.804 9 10.392 6" />
          </svg>
        </React.Fragment>
      ))}
    </div>
  );
}

export default function MarqueeDivider() {
  return (
    <div className="relative z-10 flex w-full overflow-hidden border-b border-orange-900/5 bg-white py-3 sm:py-4 md:py-6 reveal mask-edges active">
      <div className="marquee-container w-full">
        <MarqueeRow />
        <MarqueeRow ariaHidden />
      </div>
    </div>
  );
}

"use client";
import { useEffect, useState, type MouseEvent } from "react";
import { ArrowUpRight } from "lucide-react";

/** The day's own paper colour (Vivid light canvas), so the slide-up panel and the day meet without a seam. */
const DAY_CANVAS = "#F7F2EA";

/**
 * Opens the free day. The day keeps your place in this browser, so the button says "Continue" when you have started.
 * The door: a panel in the day's colour slides up over the page, then the day opens. The day reads `sw_door`
 * and shows one line, "This is how a day looks in the Speechworks app."
 */
export default function StartDayButton({ href }: { href: string }) {
  const [started, setStarted] = useState(false);
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("sw_tryaday_night_before") ?? "null");
      setStarted(!!saved?.last && saved.last !== "start" && saved.last !== "end");
    } catch { /* storage can be blocked: the button just says Start */ }
    // coming back with the browser's back button: take the panel away again
    const clear = () => document.querySelectorAll("[data-day-door]").forEach((n) => n.remove());
    window.addEventListener("pageshow", clear);
    return () => window.removeEventListener("pageshow", clear);
  }, []);

  function open(e: MouseEvent<HTMLAnchorElement>) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    try { sessionStorage.setItem("sw_door", "1"); } catch { /* the day just opens without the line */ }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    e.preventDefault();
    // the panel's look lives in globals.css (.day-door)
    const panel = document.createElement("div");
    panel.className = "day-door";
    panel.setAttribute("data-day-door", "");
    panel.setAttribute("aria-hidden", "true");
    panel.style.background = DAY_CANVAS;
    document.body.appendChild(panel);
    void panel.offsetHeight;
    panel.classList.add("up");
    window.setTimeout(() => { window.location.href = href; }, 560);
  }

  return (
    <a href={href} onClick={open} className="button button-ink pressable">
      {started ? "Continue the day" : "Start the day"} <ArrowUpRight size={17} />
    </a>
  );
}

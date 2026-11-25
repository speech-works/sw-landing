"use client";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

/** Opens the free day. The day keeps your place in this browser, so the button says "Continue" when you have started. */
export default function StartDayButton({ href }: { href: string }) {
  const [started, setStarted] = useState(false);
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("sw_tryaday_night_before") ?? "null");
      setStarted(!!saved?.last && saved.last !== "start" && saved.last !== "end");
    } catch { /* storage can be blocked: the button just says Start */ }
  }, []);
  return (
    <a href={href} className="button button-ink pressable">
      {started ? "Continue the day" : "Start the day"} <ArrowUpRight size={17} />
    </a>
  );
}

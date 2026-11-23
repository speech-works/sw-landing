"use client";
import { useEffect, useState } from "react";

/** The Speechworks mascot comes as a man and a woman. Each visit shows one of them at random, the same one on every page of that visit. */
export type MascotName = "mascot" | "mascot-f";
const KEY = "sw-mascot";

export function useMascot(): MascotName | null {
  const [name, setName] = useState<MascotName | null>(null);
  useEffect(() => {
    let pick: MascotName | null = null;
    try { const v = sessionStorage.getItem(KEY); if (v === "mascot" || v === "mascot-f") pick = v; } catch {}
    if (!pick) { pick = Math.random() < 0.5 ? "mascot" : "mascot-f"; try { sessionStorage.setItem(KEY, pick); } catch {} }
    setName(pick);
  }, []);
  return name;
}

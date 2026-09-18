"use client";

import { useEffect, useRef, useState } from "react";

const sections = [
  { label: "Intro", selector: "top" },
  { label: "Features", selector: ".feature-showcase" },
  { label: "Programs", selector: "#programs" },
  { label: "Steps", selector: "#how-it-works" },
  { label: "Questions", selector: ".faq-section" },
  { label: "Download", selector: "#download" },
  { label: "Footer", selector: ".site-footer" },
];
const versions = [
  { path: "current", name: "Current", description: "Say what you want to say." },
  { path: "outcome", name: "Previous hero", description: "Practice for the conversations that matter to you." },
];
type View = "fit" | "desktop" | "mobile";

function positions(win: Window) {
  const max = Math.max(0, win.document.documentElement.scrollHeight - win.innerHeight);
  return [...sections.map(({ selector }) => {
    if (selector === "top") return 0;
    const element = win.document.querySelector(selector);
    return Math.min(max, Math.max(0, (element?.getBoundingClientRect().top ?? 0) + win.scrollY));
  }), max];
}

export default function Comparison() {
  const frames = useRef<(HTMLIFrameElement | null)[]>([]);
  const windows = useRef<(HTMLDivElement | null)[]>([]);
  const [linked, setLinked] = useState(true);
  const [view, setView] = useState<View>("fit");
  const [loaded, setLoaded] = useState(0);
  const [sizes, setSizes] = useState([{ width: 600, height: 700 }, { width: 600, height: 700 }]);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      setSizes(windows.current.map((element) => ({ width: element?.clientWidth ?? 600, height: element?.clientHeight ?? 700 })));
    });
    windows.current.forEach((element) => { if (element) observer.observe(element); });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!linked) return;
    // Match progress inside the current section, since the two versions have different heights.
    const expected: (number | null)[] = [null, null];
    const cleanups: (() => void)[] = [];
    frames.current.forEach((frame, index) => {
      const source = frame?.contentWindow;
      if (!source) return;
      const scroll = () => {
        if (expected[index] !== null && Math.abs(source.scrollY - expected[index]!) < 2) {
          expected[index] = null;
          return;
        }
        expected[index] = null;
        const targetIndex = 1 - index;
        const target = frames.current[targetIndex]?.contentWindow;
        if (!target) return;
        const from = positions(source);
        const to = positions(target);
        const y = source.scrollY;
        let section = 0;
        while (section < from.length - 2 && from[section + 1] <= y) section++;
        const distance = from[section + 1] - from[section];
        const progress = distance > 0 ? Math.min(1, Math.max(0, (y - from[section]) / distance)) : 1;
        const next = Math.round(to[section] + progress * (to[section + 1] - to[section]));
        if (Math.abs(target.scrollY - next) < 2) return;
        expected[targetIndex] = next;
        target.scrollTo({ top: next, behavior: "instant" });
      };
      source.addEventListener("scroll", scroll, { passive: true });
      cleanups.push(() => source.removeEventListener("scroll", scroll));
    });
    return () => cleanups.forEach((cleanup) => cleanup());
  }, [linked, loaded]);

  function jump(selector: string) {
    frames.current.forEach((frame) => {
      const win = frame?.contentWindow;
      if (!win) return;
      const top = selector === "top" ? 0 : (win.document.querySelector(selector)?.getBoundingClientRect().top ?? 0) + win.scrollY;
      win.scrollTo({ top, behavior: "instant" });
    });
  }

  function ready(index: number) {
    const doc = frames.current[index]?.contentDocument;
    // Keep product navigation from replacing one half of the comparison.
    doc?.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((link) => {
      const href = link.getAttribute("href")!;
      if (href === "/#download") link.setAttribute("href", "#download");
      else if (!href.startsWith("#")) { link.target = "_blank"; link.rel = "noopener noreferrer"; }
    });
    setLoaded((count) => count + 1);
  }

  return (
    <main className="copy-comparison">
      <header className="comparison-toolbar">
        <div className="comparison-intro">
          <h1>Two ways to tell the story.</h1>
          <p>Same design and product facts. Compare the message from top to bottom.</p>
        </div>
        <div className="comparison-settings">
          <label>View
            <select aria-label="View" value={view} onChange={(event) => setView(event.target.value as View)}>
              <option value="fit">Fit panels</option>
              <option value="desktop">Desktop (scaled)</option>
              <option value="mobile">Phone</option>
            </select>
          </label>
          <label className="comparison-sync"><input type="checkbox" checked={linked} onChange={(event) => setLinked(event.target.checked)} /> Scroll together</label>
        </div>
        <nav className="comparison-sections" aria-label="Jump to a section in both versions">
          {sections.map(({ label, selector }) => <button key={selector} onClick={() => jump(selector)}>{label}</button>)}
          <span>Scroll either side to compare.</span>
        </nav>
      </header>
      <div className="comparison-panels">
        {versions.map((version, index) => {
          const width = view === "desktop" ? 1280 : view === "mobile" ? 390 : Math.max(375, sizes[index].width);
          const scale = Math.min(1, sizes[index].width / width);
          return (
            <section className="comparison-panel" aria-label={`${version.name} homepage`} key={version.path}>
              <header className="comparison-label">
                <div><h2><span>{index === 0 ? "A" : "B"}</span> {version.name}</h2><p>{version.description}</p></div>
                <a href={`/compare/${version.path}/`} target="_blank" rel="noopener noreferrer" aria-label={`Open ${version.name.toLowerCase()} version full size`}>Open full size ↗</a>
              </header>
              <div className="comparison-window" ref={(element) => { windows.current[index] = element; }}>
                <iframe
                  ref={(element) => { frames.current[index] = element; }}
                  src={`/compare/${version.path}/`}
                  title={`${version.name} homepage preview`}
                  onLoad={() => ready(index)}
                  style={{ width, height: sizes[index].height / scale, transform: `scale(${scale})`, left: Math.max(0, (sizes[index].width - width * scale) / 2) }}
                />
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}

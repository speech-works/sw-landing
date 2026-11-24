// A soft dewdrop pop synthesized with the Web Audio API, so no audio file ships with the site.
// Browsers only allow sound after the visitor has clicked, tapped, or pressed a key (scrolling and moving the mouse do not count),
// so the context is created on the first such interaction and the sound stays silent before that.
// The context can fall asleep again later (a hidden tab, a phone call, the browser's own rules), so the listeners stay on and wake it at the next interaction.

let context: AudioContext | null = null;

/** Call once on the client. Unlocks audio on the visitor's interactions and keeps it awake. */
export function unlockAudioOnInteraction() {
  const unlock = () => {
    try {
      context ??= new AudioContext();
      if (context.state !== "running") void context.resume();
    } catch {
      // Audio is optional; ignore browsers without Web Audio.
    }
  };
  const events = ["pointerdown", "keydown", "touchstart", "touchend", "click"] as const;
  events.forEach((event) => window.addEventListener(event, unlock, { passive: true }));
  return () => events.forEach((event) => window.removeEventListener(event, unlock));
}

/** Plays a soft dewdrop pop sound when the avatar bubble appears. */
export function playPop() {
  const ctx = context;
  if (!ctx) return;
  // Asleep (for example after a long wait in a hidden tab): wake it, then play. This works while the visitor's earlier click still counts.
  if (ctx.state !== "running") {
    ctx.resume().then(() => { if (ctx.state === "running") playPop(); }, () => {});
    return;
  }

  const now = ctx.currentTime;
  const start = now + 0.005;

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(1500, start);
  filter.Q.setValueAtTime(1.2, start);
  filter.connect(ctx.destination);

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(300, start);
  osc.frequency.linearRampToValueAtTime(420, start + 0.015);
  osc.frequency.exponentialRampToValueAtTime(220, start + 0.06);

  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(0.085, start + 0.004);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.07);

  osc.connect(gain);
  gain.connect(filter);
  osc.start(start);
  osc.stop(start + 0.075);
}

/** The shared audio context when it is running (after the visitor's first click, tap or key), else null. */
export function runningAudio(): AudioContext | null {
  if (context && context.state !== "running") void context.resume().catch(() => {});
  return context && context.state === "running" ? context : null;
}

export type ChimeKind = "bell" | "glass" | "sparkle";

/**
 * A soft chime for the moment Speechworks whispers its tip (story hero only). Quieter than the pop, under half a second.
 * bell: two soft notes, a fifth apart. glass: one bell-like note. sparkle: three quick rising notes.
 */
export function playChime(kind: ChimeKind = "bell") {
  const ctx = context;
  if (!ctx) return;
  if (ctx.state !== "running") {
    ctx.resume().then(() => { if (ctx.state === "running") playChime(kind); }, () => {});
    return;
  }
  const t0 = ctx.currentTime + 0.005;
  const out = ctx.createGain();
  out.gain.setValueAtTime(1, t0);
  out.connect(ctx.destination);
  // one bell-like note: a sine with a faint inharmonic partial, fast attack, gentle decay
  const note = (freq: number, at: number, peak: number, decay: number) => {
    [[1, 1], [2.76, 0.18]].forEach(([mult, share]) => {
      const osc = ctx.createOscillator(), g = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq * mult, at);
      g.gain.setValueAtTime(0.0001, at);
      g.gain.exponentialRampToValueAtTime(peak * share, at + 0.008);
      g.gain.exponentialRampToValueAtTime(0.0001, at + decay * (mult > 1 ? 0.5 : 1));
      osc.connect(g); g.connect(out);
      osc.start(at); osc.stop(at + decay + 0.02);
    });
  };
  if (kind === "bell") { note(784, t0, 0.05, 0.32); note(1175, t0 + 0.11, 0.045, 0.38); }
  else if (kind === "glass") { note(1568, t0, 0.045, 0.45); }
  else { note(1047, t0, 0.035, 0.2); note(1319, t0 + 0.06, 0.035, 0.22); note(1568, t0 + 0.12, 0.04, 0.32); }
}

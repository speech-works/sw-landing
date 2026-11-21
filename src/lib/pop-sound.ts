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

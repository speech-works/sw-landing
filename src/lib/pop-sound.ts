// A soft dewdrop pop synthesized with the Web Audio API, so no audio file ships with the site.
// Browsers only allow sound after the visitor has clicked, tapped, or pressed a key,
// so the context is created on the first interaction and the sound stays silent before that.

let context: AudioContext | null = null;

/** Call once on the client. Unlocks audio on the visitor's first interaction. */
export function unlockAudioOnInteraction() {
  const unlock = () => {
    try {
      context ??= new AudioContext();
      if (context.state === "suspended") void context.resume();
    } catch {
      // Audio is optional; ignore browsers without Web Audio.
    }
  };
  const events = ["pointerdown", "keydown", "touchend"] as const;
  events.forEach((event) => window.addEventListener(event, unlock, { once: true, passive: true }));
  return () => events.forEach((event) => window.removeEventListener(event, unlock));
}

/** Plays a soft dewdrop pop sound when the avatar bubble appears. */
export function playPop() {
  const ctx = context;
  if (!ctx || ctx.state !== "running") return;

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

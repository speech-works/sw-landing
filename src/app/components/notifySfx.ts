"use client";

// Tiny synthesized sound effects for the "Notify me" animation. Nothing is
// downloaded: every sound is made in the browser with the Web Audio API.
// Sounds start only after the visitor clicks (browsers require that), stay
// quiet and short, and can be turned off with the speaker button in the dialog.

const KEY = "speechworks-notify-sound";

export const soundEnabled = () => {
  try {
    return window.localStorage.getItem(KEY) !== "off";
  } catch {
    return true;
  }
};
export const setSoundEnabled = (on: boolean) => {
  try {
    window.localStorage.setItem(KEY, on ? "on" : "off");
  } catch {
    // Private windows can refuse storage. The choice then lasts until reload.
  }
};

type ToneOptions = {
  from: number;
  to?: number;
  dur: number;
  at?: number;
  type?: OscillatorType;
  vol?: number;
  /** Wobble (Hz of the wobble, and how far it moves the pitch in Hz). */
  wobble?: [rate: number, depth: number];
};

export type Sfx = ReturnType<typeof createSfx>;

export function createSfx() {
  let ctx: AudioContext | null = null;
  let out: GainNode | null = null;

  const ensure = () => {
    if (!soundEnabled()) return null;
    if (!ctx) {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      const comp = ctx.createDynamicsCompressor();
      out = ctx.createGain();
      out.gain.value = 0.55;
      out.connect(comp);
      comp.connect(ctx.destination);
    }
    if (ctx.state === "suspended") void ctx.resume();
    return ctx;
  };

  const tone = ({ from, to = from, dur, at = 0, type = "sine", vol = 0.25, wobble }: ToneOptions) => {
    const c = ensure();
    if (!c || !out) return;
    const t0 = c.currentTime + at;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(from, t0);
    osc.frequency.exponentialRampToValueAtTime(Math.max(20, to), t0 + dur);
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(vol, t0 + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(gain);
    gain.connect(out);
    if (wobble) {
      const lfo = c.createOscillator();
      const depth = c.createGain();
      lfo.frequency.value = wobble[0];
      depth.gain.value = wobble[1];
      lfo.connect(depth);
      depth.connect(osc.frequency);
      lfo.start(t0);
      lfo.stop(t0 + dur + 0.05);
    }
    osc.start(t0);
    osc.stop(t0 + dur + 0.05);
  };

  const swish = (dur: number, from: number, to: number, vol = 0.12, at = 0) => {
    const c = ensure();
    if (!c || !out) return;
    const t0 = c.currentTime + at;
    const buffer = c.createBuffer(1, Math.ceil(c.sampleRate * dur), c.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    const src = c.createBufferSource();
    src.buffer = buffer;
    const band = c.createBiquadFilter();
    band.type = "bandpass";
    band.Q.value = 1.4;
    band.frequency.setValueAtTime(from, t0);
    band.frequency.exponentialRampToValueAtTime(to, t0 + dur);
    const gain = c.createGain();
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(vol, t0 + dur * 0.35);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    src.connect(band);
    band.connect(gain);
    gain.connect(out);
    src.start(t0);
  };

  const notes = [784, 988, 1175]; // G5, B5, D6

  return {
    /** Call from the click that starts the sign-up, so the browser allows sound. */
    unlock() {
      ensure();
    },
    /** A soft squish when the card gets squeezed. */
    squash() {
      tone({ from: 340, to: 170, dur: 0.12, vol: 0.28 });
    },
    /** Content sliding away. */
    whoosh() {
      swish(0.28, 500, 2400, 0.11);
    },
    /** The card closing up around the mailman. */
    pwip() {
      tone({ from: 1150, to: 430, dur: 0.12, vol: 0.24 });
    },
    /** The ball bouncing open into a globe. */
    boing() {
      tone({ from: 170, to: 560, dur: 0.14, vol: 0.3, type: "triangle", wobble: [26, 46] });
      tone({ from: 560, to: 230, dur: 0.34, at: 0.13, vol: 0.26, type: "triangle", wobble: [26, 34] });
    },
    /** An envelope swings round the front of the globe. */
    tink(i: number) {
      tone({ from: notes[i % notes.length], dur: 0.1, vol: 0.07, type: "sine" });
    },
    /** Envelopes dropping into the globe. */
    land() {
      tone({ from: 720, to: 520, dur: 0.08, vol: 0.2 });
      tone({ from: 620, to: 430, dur: 0.08, at: 0.09, vol: 0.2 });
      tone({ from: 520, to: 340, dur: 0.1, at: 0.18, vol: 0.2 });
    },
    /** A little pop for the burst of dots. */
    pop() {
      tone({ from: 480, to: 1500, dur: 0.07, vol: 0.2 });
    },
    /** The happy chime when the thank-you card opens. */
    tada() {
      [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone({ from: f, dur: 0.24, at: i * 0.085, vol: 0.2, type: "triangle" }));
      swish(0.3, 3000, 7000, 0.05, 0.3);
    },
    /** A gentle "oh well" when the sign-up did not go through. */
    bwomp() {
      tone({ from: 300, to: 190, dur: 0.18, vol: 0.22 });
      tone({ from: 230, to: 120, dur: 0.3, at: 0.17, vol: 0.22 });
    },
  };
}

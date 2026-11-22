"use client";

// The soft sound effects of the program card animations, synthesized with the Web Audio API (no audio files).
// They use the same audio context as pop-sound.ts, so they only play after the visitor's first click, tap or key.
// No sound with reduced motion, or when the visitor turned sound off in the Notify dialog. Every sound is short (under 0.6 s), quiet and never loops.

import { runningAudio } from "./pop-sound";
import { soundEnabled } from "@/app/components/notifySfx";

type Tone = { f: number; f2?: number; at?: number; dur: number; vol?: number; type?: OscillatorType; attack?: number; wobble?: [number, number] };

function ctxOrNull() {
  if (typeof window === "undefined") return null;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !soundEnabled()) return null;
  return runningAudio();
}

function out(ctx: AudioContext) {
  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 3200;
  lp.connect(ctx.destination);
  return lp;
}

/** One soft note: a quick rise, then a smooth fade. */
function tone(ctx: AudioContext, dest: AudioNode, { f, f2, at = 0, dur, vol = 0.05, type = "sine", attack = 0.006, wobble }: Tone) {
  const t = ctx.currentTime + 0.01 + at;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = type;
  o.frequency.setValueAtTime(f, t);
  if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + dur * 0.8);
  if (wobble) {
    const lfo = ctx.createOscillator();
    const lg = ctx.createGain();
    lfo.frequency.value = wobble[0];
    lg.gain.value = wobble[1];
    lfo.connect(lg).connect(o.frequency);
    lfo.start(t);
    lfo.stop(t + dur + 0.02);
  }
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(dest);
  o.start(t);
  o.stop(t + dur + 0.02);
}

function play(notes: Tone[]) {
  const ctx = ctxOrNull();
  if (!ctx) return;
  const dest = out(ctx);
  notes.forEach((n) => tone(ctx, dest, n));
}

/** A soft paper swish (filtered noise) with a tiny pip, for the word card flip. */
function swish() {
  const ctx = ctxOrNull();
  if (!ctx) return;
  const dest = out(ctx);
  const len = Math.floor(ctx.sampleRate * 0.16);
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.sin((Math.PI * i) / len);
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.Q.value = 0.9;
  const t = ctx.currentTime + 0.01;
  bp.frequency.setValueAtTime(1400, t);
  bp.frequency.exponentialRampToValueAtTime(3000, t + 0.15);
  const g = ctx.createGain();
  g.gain.value = 0.05;
  src.connect(bp).connect(g).connect(dest);
  src.start(t);
  tone(ctx, dest, { f: 520, f2: 760, dur: 0.08, vol: 0.012 });
}

/** A soft filtered-noise glide (a chair rolling in). */
function roll() {
  const ctx = ctxOrNull();
  if (!ctx) return;
  const dest = out(ctx);
  const len = Math.floor(ctx.sampleRate * 0.4);
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.sin((Math.PI * i) / len);
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.Q.value = 1.2;
  const t = ctx.currentTime + 0.01;
  bp.frequency.setValueAtTime(260, t);
  bp.frequency.exponentialRampToValueAtTime(620, t + 0.38);
  const g = ctx.createGain();
  g.gain.value = 0.05;
  src.connect(bp).connect(g).connect(dest);
  src.start(t);
}

/** A soft paper rustle (about 0.4 s): two quick bursts of filtered noise, like paper or wrapping moving. */
function rustle() {
  const ctx = ctxOrNull();
  if (!ctx) return;
  const dest = out(ctx);
  const dur = 0.4, len = Math.floor(ctx.sampleRate * dur);
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) {
    const u = i / len;
    d[i] = (Math.random() * 2 - 1) * Math.sin(Math.PI * u) * (0.55 + 0.45 * Math.abs(Math.sin(u * 17)));
  }
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.Q.value = 0.8;
  const t = ctx.currentTime + 0.01;
  bp.frequency.setValueAtTime(2200, t);
  bp.frequency.exponentialRampToValueAtTime(3400, t + dur);
  const g = ctx.createGain();
  g.gain.value = 0.045;
  src.connect(bp).connect(g).connect(dest);
  src.start(t);
}

// Recorded sounds the founder supplied (public/sounds/*.mp3). They are fetched ahead (preloadSamples) and decoded when the shared audio context is running.
const rawSamples = new Map<string, Promise<ArrayBuffer>>();
const decoded = new Map<string, AudioBuffer>();
export function preloadSamples() {
  if (typeof window === "undefined") return;
  ["/sounds/tiger-roar.mp3", "/sounds/cat-meow.mp3"].forEach((u) => {
    if (!rawSamples.has(u)) rawSamples.set(u, fetch(u).then((r) => (r.ok ? r.arrayBuffer() : Promise.reject(new Error(u)))));
    rawSamples.get(u)?.catch(() => rawSamples.delete(u));
  });
}
function sample(url: string, volume: number, fallback: () => void) {
  const ctx = ctxOrNull();
  if (!ctx) return;
  const start = (buf: AudioBuffer) => {
    const src = ctx.createBufferSource(), g = ctx.createGain();
    src.buffer = buf;
    g.gain.value = volume;
    src.connect(g).connect(ctx.destination);
    src.start();
  };
  const have = decoded.get(url);
  if (have) return start(have);
  preloadSamples();
  rawSamples.get(url)?.then((ab) => ctx.decodeAudioData(ab.slice(0))).then((buf) => { decoded.set(url, buf); start(buf); }).catch(() => fallback());
}

/** A tiger roar (about 0.6 s): two low saw tones pushed through a filter that sweeps, rough vibrato, and a breath of noise. */
function roarSynth() {
  const ctx = ctxOrNull();
  if (!ctx) return;
  const dest = out(ctx);
  const t = ctx.currentTime + 0.01, dur = 0.62;
  const mix = ctx.createGain();
  mix.gain.setValueAtTime(0.0001, t);
  mix.gain.exponentialRampToValueAtTime(0.1, t + 0.09);
  mix.gain.setValueAtTime(0.1, t + 0.32);
  mix.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.Q.value = 1.8;
  bp.frequency.setValueAtTime(380, t);
  bp.frequency.exponentialRampToValueAtTime(900, t + 0.25);
  bp.frequency.exponentialRampToValueAtTime(320, t + dur);
  [[82, 0], [86.5, 0.01], [164, 0]].forEach(([f, d], i) => {
    const o = ctx.createOscillator();
    o.type = "sawtooth";
    o.frequency.setValueAtTime(f * 1.15, t + d);
    o.frequency.exponentialRampToValueAtTime(f * 0.78, t + dur);
    const lfo = ctx.createOscillator(), lg = ctx.createGain();
    lfo.frequency.value = 26 + i * 3;
    lg.gain.value = f * 0.06;
    lfo.connect(lg).connect(o.frequency);
    const g = ctx.createGain();
    g.gain.value = i === 2 ? 0.35 : 1;
    o.connect(g).connect(bp);
    o.start(t + d); lfo.start(t + d); o.stop(t + dur + 0.02); lfo.stop(t + dur + 0.02);
  });
  const len = Math.floor(ctx.sampleRate * dur), buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.sin((Math.PI * i) / len);
  const ns = ctx.createBufferSource();
  ns.buffer = buf;
  const nb = ctx.createBiquadFilter();
  nb.type = "bandpass"; nb.frequency.value = 700; nb.Q.value = 0.7;
  const ng = ctx.createGain();
  ng.gain.value = 0.45;
  ns.connect(nb).connect(ng).connect(bp);
  ns.start(t);
  bp.connect(mix).connect(dest);
}

/** A kitten meow (about 0.5 s): a bright tone that rises then falls, with a vowel filter that opens ("mee-ow") and a little vibrato. */
function meowSynth() {
  const ctx = ctxOrNull();
  if (!ctx) return;
  const dest = out(ctx);
  const t = ctx.currentTime + 0.01, dur = 0.5;
  const o = ctx.createOscillator();
  o.type = "sawtooth";
  o.frequency.setValueAtTime(560, t);
  o.frequency.exponentialRampToValueAtTime(1020, t + 0.17);
  o.frequency.exponentialRampToValueAtTime(640, t + dur);
  const lfo = ctx.createOscillator(), lg = ctx.createGain();
  lfo.frequency.value = 9; lg.gain.value = 16;
  lfo.connect(lg).connect(o.frequency);
  const f1 = ctx.createBiquadFilter();
  f1.type = "bandpass"; f1.Q.value = 4;
  f1.frequency.setValueAtTime(900, t);
  f1.frequency.exponentialRampToValueAtTime(2300, t + 0.17);
  f1.frequency.exponentialRampToValueAtTime(1000, t + dur);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.06, t + 0.05);
  g.gain.setValueAtTime(0.06, t + 0.2);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(f1).connect(g).connect(dest);
  o.start(t); lfo.start(t); o.stop(t + dur + 0.02); lfo.stop(t + dur + 0.02);
}

export const cardSounds = {
  /** A tiger roar: a low rumbling growl with a rough, vibrating edge and a short breath of noise. */
  growl: () => sample("/sounds/tiger-roar.mp3", 0.55, roarSynth),
  /** A kitten meow: a quick rise and fall with a throaty, voice-like tone. */
  meow: () => sample("/sounds/cat-meow.mp3", 0.7, meowSynth),
  /** A poof: a soft burst and a swish. */
  poof: () => { play([{ f: 320, f2: 110, dur: 0.14, vol: 0.05 }]); swish(); },
  /** A big soft button press: a low thunk and a dry click. */
  clunk: () => play([{ f: 150, f2: 80, dur: 0.16, vol: 0.07 }, { f: 1500, f2: 800, at: 0.02, dur: 0.03, vol: 0.04, type: "square" }]),
  /** A calm bell note; i = 0, 1, 2 rises. */
  bell: (i = 0) => play([{ f: [523, 659, 784][i] ?? 523, dur: 0.7, vol: 0.04, attack: 0.01 }, { f: ([523, 659, 784][i] ?? 523) * 2.01, dur: 0.4, vol: 0.01 }]),
  /** A low worried hum. */
  hum: () => play([{ f: 110, f2: 104, dur: 0.6, vol: 0.03, type: "triangle", attack: 0.1, wobble: [7, 4] }]),
  /** A balloon is pulled down: a short rubber creak that rises. */
  stretch: () => play([{ f: 180, f2: 340, dur: 0.42, vol: 0.026, type: "sawtooth", attack: 0.05, wobble: [26, 30] }]),
  /** A string is plucked: a bright twang that decays. */
  twang: () => play([{ f: 392, f2: 372, dur: 0.7, vol: 0.05, type: "triangle", wobble: [38, 5] }, { f: 784, f2: 744, dur: 0.4, vol: 0.012, wobble: [38, 9] }, { f: 196, f2: 186, dur: 0.8, vol: 0.03, wobble: [30, 3] }]),
  /** A fast whoosh up: filtered noise sweeping high. */
  zoom: () => { play([{ f: 300, f2: 1500, dur: 0.5, vol: 0.016, attack: 0.1 }]); swish(); },
  /** A thoughtful "hmm": two low soft notes sliding down. */
  hmm: () => play([{ f: 340, f2: 295, dur: 0.3, vol: 0.03, type: "triangle", attack: 0.03 }, { f: 300, f2: 262, at: 0.34, dur: 0.34, vol: 0.026, type: "triangle", attack: 0.03 }]),
  /** A balloon pops: a short soft burst. */
  burst: () => { play([{ f: 900, f2: 160, dur: 0.09, vol: 0.06, type: "triangle" }]); swish(); },
  /** A rubbery balloon boing; i rises the pitch. */
  rubber: (i = 0) => play([{ f: 220 + i * 70, f2: 460 + i * 90, dur: 0.22, vol: 0.04, wobble: [16, 20] }]),
  /** A lamp switch: a small dry click and a soft warm tone. */
  click: () => play([{ f: 1800, f2: 900, dur: 0.03, vol: 0.05, type: "square" }, { f: 330, at: 0.04, dur: 0.22, vol: 0.025, type: "triangle" }]),
  /** A small bird: two quick high chirps. */
  chirp: () => play([{ f: 2400, f2: 3100, dur: 0.07, vol: 0.016 }, { f: 2700, f2: 3400, at: 0.1, dur: 0.08, vol: 0.016 }]),
  /** An old phone rings once: a quick double trill (louder than ring). */
  brr: () => play([{ f: 1020, dur: 0.11, vol: 0.016, type: "square", wobble: [28, 90] }, { f: 1020, at: 0.14, dur: 0.11, vol: 0.016, type: "square", wobble: [28, 90] }, { f: 1020, at: 0.38, dur: 0.11, vol: 0.016, type: "square", wobble: [28, 90] }, { f: 1020, at: 0.52, dur: 0.11, vol: 0.016, type: "square", wobble: [28, 90] }]),
  /** A chair rolls in: a soft low whirr. */
  roll,
  /** A soft landing thud. */
  thud: () => play([{ f: 190, f2: 110, dur: 0.14, vol: 0.07 }]),
  /** A small quick hop: a short rising chirp. */
  hop: () => play([{ f: 340, f2: 560, dur: 0.14, vol: 0.04, wobble: [12, 10] }]),
  /** A bubble appears: a soft dewdrop pop. */
  pop: () => play([{ f: 300, f2: 220, dur: 0.08, vol: 0.07 }]),
  /** A right answer: two rising marimba notes. */
  ding: () => play([{ f: 659, dur: 0.3, vol: 0.05 }, { f: 1318, dur: 0.12, vol: 0.008 }, { f: 880, at: 0.11, dur: 0.38, vol: 0.05 }, { f: 1760, at: 0.11, dur: 0.14, vol: 0.008 }]),
  /** A phone rings softly: two short warbling pulses. */
  ring: () => play([{ f: 880, dur: 0.17, vol: 0.026, wobble: [22, 40] }, { f: 880, at: 0.25, dur: 0.17, vol: 0.026, wobble: [22, 40] }]),
  /** The call is answered: a soft click-pop and a bright note. */
  answer: () => play([{ f: 520, f2: 300, dur: 0.06, vol: 0.05 }, { f: 784, at: 0.06, dur: 0.32, vol: 0.035, type: "triangle" }]),
  /** A warm felt-mallet chord. */
  warm: () => play([{ f: 523, dur: 0.5, vol: 0.04, type: "triangle", attack: 0.02 }, { f: 659, at: 0.07, dur: 0.5, vol: 0.035, type: "triangle", attack: 0.02 }]),
  /** One very soft singing-bowl tone. */
  bowl: () => play([{ f: 396, dur: 0.58, vol: 0.045, attack: 0.05 }, { f: 1093, dur: 0.45, vol: 0.008, attack: 0.05 }, { f: 2138, dur: 0.3, vol: 0.003, attack: 0.05 }]),
  /** A springy rising boing. */
  boing: () => play([{ f: 260, f2: 620, dur: 0.32, vol: 0.04, wobble: [14, 18] }]),
  /** A light sparkle: two quick high notes. */
  sparkle: () => play([{ f: 1568, dur: 0.18, vol: 0.016 }, { f: 2093, at: 0.06, dur: 0.22, vol: 0.014 }]),
  /** A thought bubble pops: a soft bloop. */
  bloop: () => play([{ f: 520, f2: 180, dur: 0.13, vol: 0.05 }]),
  /** A light rising plink. */
  plink: () => play([{ f: 1175, f2: 1320, dur: 0.28, vol: 0.022, type: "triangle" }]),
  /** A two-note twinkle. */
  twinkle: () => play([{ f: 784, dur: 0.3, vol: 0.03, type: "triangle" }, { f: 1047, at: 0.13, dur: 0.4, vol: 0.03, type: "triangle" }]),
  /** A paper flip. */
  flip: swish,
  /** A small pip chime. */
  pip: () => play([{ f: 988, dur: 0.2, vol: 0.03 }, { f: 1976, dur: 0.1, vol: 0.006 }]),
  /** A soft wood tok; i = 0, 1, 2 rises. */
  tok: (i: number) => play([{ f: [523, 659, 784][i] ?? 523, dur: 0.12, vol: 0.045 }, { f: ([523, 659, 784][i] ?? 523) * 2.7, dur: 0.05, vol: 0.006 }]),
  /** A soft rising sweep. */
  sweep: () => play([{ f: 392, f2: 784, dur: 0.48, vol: 0.026, attack: 0.08, wobble: [6, 6] }]),
  /** A bright little tink. */
  tink: () => play([{ f: 1760, dur: 0.3, vol: 0.018 }, { f: 2637, dur: 0.16, vol: 0.006 }]),
  /** A small soft bell for a light that comes on; i = 0..3 climbs a calm pentatonic step (C, E, G, A). */
  chime: (i = 0) => play([{ f: [523, 659, 784, 880][i] ?? 523, dur: 0.55, vol: 0.04, attack: 0.01 }, { f: ([523, 659, 784, 880][i] ?? 523) * 2.01, dur: 0.3, vol: 0.01 }]),
  /** A soft wooden tap: two small hulls touch. */
  tap: () => play([{ f: 420, f2: 300, dur: 0.07, vol: 0.05, type: "triangle" }, { f: 1100, f2: 800, at: 0.01, dur: 0.03, vol: 0.012 }]),
  /** A soft paper rustle (a lid and wrapping moving). */
  rustle,
  /** A soft cardboard thump: a low knock with a small dry tap (a lid settles). */
  lidThump: () => play([{ f: 140, f2: 85, dur: 0.18, vol: 0.06, type: "triangle" }, { f: 700, f2: 420, at: 0.01, dur: 0.05, vol: 0.012 }]),
  /** A warm little chime: three soft rising notes (hearts float up). Under 0.6 s. */
  heartChime: () => play([{ f: 659, dur: 0.38, vol: 0.03, type: "triangle", attack: 0.01 }, { f: 784, at: 0.08, dur: 0.38, vol: 0.028, type: "triangle", attack: 0.01 }, { f: 1047, at: 0.16, dur: 0.42, vol: 0.026, type: "triangle", attack: 0.01 }]),
  /** A soft boom: a low thump with a short airy burst (she pops out). */
  boom: () => { play([{ f: 130, f2: 42, dur: 0.46, vol: 0.09 }, { f: 700, f2: 180, dur: 0.1, vol: 0.035, type: "triangle" }]); swish(); },
  /** A raindrop: a tiny soft tap. */
  drip: () => play([{ f: 1500, f2: 900, dur: 0.05, vol: 0.012 }]),
  /** An old wooden cage creaks: a low slow groan. */
  creak: () => play([{ f: 140, f2: 105, dur: 0.5, vol: 0.02, type: "sawtooth", attack: 0.08, wobble: [14, 22] }]),
  /** A bar snaps: a short dry crack. */
  snap: () => play([{ f: 1400, f2: 500, dur: 0.04, vol: 0.05, type: "square" }, { f: 260, f2: 180, dur: 0.08, vol: 0.03, type: "triangle" }]),
  /** The cage breaks: a soft crack, a low thud and a clatter of wood. */
  crash: () => { play([{ f: 900, f2: 200, dur: 0.1, vol: 0.05, type: "triangle" }, { f: 150, f2: 70, at: 0.04, dur: 0.26, vol: 0.06 }, { f: 520, f2: 380, at: 0.2, dur: 0.05, vol: 0.02, type: "triangle" }, { f: 620, f2: 420, at: 0.3, dur: 0.05, vol: 0.016, type: "triangle" }]); swish(); },
  /** A crayon scribbling in the air: a soft, dry scratch (about 0.5 s). */
  scribble: () => play([{ f: 1500, f2: 2100, dur: 0.5, vol: 0.006, type: "sawtooth", attack: 0.05, wobble: [34, 120] }, { f: 900, f2: 1300, dur: 0.5, vol: 0.005, type: "sawtooth", attack: 0.05, wobble: [26, 90] }]),
  /** Two boxes swap places: a soft airy whoosh (filtered noise that glides up). */
  swapWhoosh: () => { const ctx = ctxOrNull(); if (!ctx) return; const dest = out(ctx), len = Math.floor(ctx.sampleRate * 0.3), buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.sin((Math.PI * i) / len); const src = ctx.createBufferSource(); src.buffer = buf; const bp = ctx.createBiquadFilter(); bp.type = "bandpass"; bp.Q.value = 0.9; const t = ctx.currentTime + 0.01; bp.frequency.setValueAtTime(500, t); bp.frequency.exponentialRampToValueAtTime(1500, t + 0.28); const g = ctx.createGain(); g.gain.value = 0.035; src.connect(bp).connect(g).connect(dest); src.start(t); },
  /** A box lands: a small soft wooden tap. */
  swapTap: () => play([{ f: 260, f2: 170, dur: 0.1, vol: 0.05, type: "triangle" }, { f: 900, f2: 600, at: 0.01, dur: 0.03, vol: 0.01 }]),
  /** A magic puff: a soft airy burst with a gentle low pop (no bang), then a faint high shimmer. Under 0.6 s. */
  puff: () => { const ctx = ctxOrNull(); if (!ctx) return; const dest = out(ctx), dur = 0.45, len = Math.floor(ctx.sampleRate * dur), buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.exp(-5 * (i / len)) * Math.min(1, (i / len) * 40); const src = ctx.createBufferSource(); src.buffer = buf; const bp = ctx.createBiquadFilter(); bp.type = "lowpass"; const t = ctx.currentTime + 0.01; bp.frequency.setValueAtTime(2600, t); bp.frequency.exponentialRampToValueAtTime(500, t + dur); const g = ctx.createGain(); g.gain.value = 0.07; src.connect(bp).connect(g).connect(dest); src.start(t); play([{ f: 220, f2: 120, dur: 0.16, vol: 0.035 }, { f: 1760, at: 0.05, dur: 0.3, vol: 0.008 }, { f: 2349, at: 0.11, dur: 0.3, vol: 0.006 }]); },
  /** A soft rubber-ball hit; i = 0 is the first (biggest) bounce, each next one is smaller and a little higher. */
  bounce: (i = 0) => play([{ f: 210 + i * 16, f2: 95 + i * 10, dur: 0.12, vol: 0.065 * 0.78 ** i }, { f: 900 + i * 60, f2: 600, dur: 0.04, vol: 0.012 * 0.78 ** i }]),
};

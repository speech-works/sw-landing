"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Volume2, VolumeX, X } from "lucide-react";
import MailmanFace, { loadMorph, type FaceHandle, type IdleHandle } from "./MailmanFace";
import LaunchList from "./LaunchList";
import { gsap, instantMotion } from "@/lib/motion";
import { cleanup, playMorph, type MorphRefs, type MorphResult } from "./notifyMorph";
import { createSfx, setSoundEnabled, soundEnabled, type Sfx } from "./notifySfx";

const HEADLINE = "Email me when the iPhone app is live.";
const RING_X = 218;
const RING_Y = 70;
const TILT = -28;

/** How far along the box the typed text reaches, 0 (start) to 1 (end of the box). */
function textFraction(input: HTMLInputElement) {
  const cs = getComputedStyle(input);
  const ctx = (textFraction.canvas ??= document.createElement("canvas")).getContext("2d");
  if (!ctx) return 0;
  ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
  const inner = input.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
  const upto = input.value.slice(0, input.selectionStart ?? input.value.length);
  return inner > 0 ? ctx.measureText(upto).width / inner : 0;
}
textFraction.canvas = undefined as HTMLCanvasElement | undefined;

const Envelope = () => (
  <div className="notify-env">
    <svg viewBox="0 0 64 46" width="64" height="46" aria-hidden="true">
      <rect x="5" y="8" width="58" height="36" rx="5" fill="#141311" />
      <rect x="2" y="4" width="58" height="36" rx="5" fill="#fff9e9" stroke="#141311" strokeWidth="3" />
      <path d="M4 7 L31 26 L58 7" fill="none" stroke="#141311" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx="31" cy="27" r="5" fill="#c8f750" stroke="#141311" strokeWidth="2.5" />
    </svg>
  </div>
);

const Ring = ({ back }: { back: boolean }) => (
  <svg
    className={`notify-ring ${back ? "notify-ring-back" : "notify-ring-front"}`}
    viewBox="-360 -360 720 720"
    aria-hidden="true"
  >
    <g transform={`rotate(${TILT})`}>
      <path
        d={`M${-RING_X} 0 A${RING_X} ${RING_Y} 0 0 ${back ? 1 : 0} ${RING_X} 0`}
        fill="none"
        stroke="#fff9e9"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity={back ? 0.45 : 0.95}
      />
    </g>
  </svg>
);

/** The App Store badge while the iPhone app is not out yet. Opens a small dialog where the visitor can ask for one email when it is live. */
export default function NotifyBadge({ placement }: { placement: string }) {
  const id = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const formView = useRef<HTMLDivElement>(null);
  const doneView = useRef<HTMLDivElement>(null);
  const globe = useRef<SVGSVGElement>(null);
  const orbit = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [sentTo, setSentTo] = useState("");
  const [view, setView] = useState<"form" | "done">("form");
  const [announce, setAnnounce] = useState("");
  const [soundOn, setSoundOn] = useState(true);
  const sfx = useRef<Sfx | null>(null);
  const faceForm = useRef<FaceHandle>(null);
  const faceDone = useRef<FaceHandle>(null);
  const idle = useRef<IdleHandle | null>(null);
  // One animation run at a time. `run` changes whenever a run starts or is cancelled.
  const run = useRef(0);
  const settle = useRef<((r: MorphResult) => void) | null>(null);
  const animating = useRef(false);

  useEffect(() => {
    setReady(true);
    setSoundOn(soundEnabled());
  }, []);

  const refs = (): MorphRefs | null => {
    const r = {
      card: card.current,
      formView: formView.current,
      doneView: doneView.current,
      globe: globe.current,
      orbit: orbit.current,
    };
    return r.card && r.formView && r.doneView && r.globe && r.orbit ? (r as MorphRefs) : null;
  };

  // While the dialog waits for an email, the mailman blinks and glances between the box and the visitor.
  const startIdle = () => {
    idle.current?.stop();
    idle.current = instantMotion() ? null : (faceForm.current?.idle() ?? null);
  };
  const stopIdle = () => {
    idle.current?.stop();
    idle.current = null;
  };
  // When the dialog opens he waves hello (the kit's own wave), then settles into the waiting face.
  const waveTl = useRef<gsap.core.Timeline | null>(null);
  const waveDelay = useRef<gsap.core.Tween | null>(null);
  const endWave = (quick = false) => {
    waveDelay.current?.kill();
    waveDelay.current = null;
    const tl = waveTl.current;
    waveTl.current = null;
    if (tl) {
      tl.eventCallback("onComplete", null);
      tl.kill();
      void faceForm.current?.lowerHands();
      if (!quick) faceForm.current?.to("steady", 0.35);
    }
  };
  const startWave = () => {
    const f = faceForm.current;
    if (!f || instantMotion()) {
      startIdle();
      return;
    }
    endWave(true);
    // a short pause so the dialog has finished popping in
    waveDelay.current = gsap.delayedCall(0.45, () => {
      waveDelay.current = null;
      if (!dialog.current?.open || animating.current) return;
      f.to("excited", 0.3);
      const tl = f.wave();
      waveTl.current = tl;
      startIdle(); // blinks while he waves
      tl.eventCallback("onComplete", () => {
        waveTl.current = null;
        f.to("steady", 0.45);
      });
    });
  };
  const resetFaces = () => {
    faceForm.current?.set("steady");
    faceDone.current?.set("joyful");
  };

  const open = () => {
    void loadMorph();
    dialog.current?.showModal();
    if (view === "form") startWave();
    // Start on the card, not on a control, so no focus ring shows for mouse users.
    // Keyboard users press Tab to reach the email field.
    card.current?.focus();
  };
  const close = () => dialog.current?.close();

  // Closing the dialog stops any animation and puts the card back as it was.
  const onClosed = () => {
    endWave(true);
    void faceForm.current?.lowerHands();
    void faceDone.current?.lowerHands();
    stopIdle();
    run.current += 1;
    animating.current = false;
    settle.current = null;
    const r = refs();
    if (r) cleanup(r);
    resetFaces();
  };

  const handleSending = () => {
    const r = refs();
    if (!r || instantMotion()) return;
    const mine = ++run.current;
    animating.current = true;
    endWave(true);
    void faceForm.current?.lowerHands();
    faceForm.current?.watch(null);
    stopIdle();
    // This runs from the click on "Notify me", so the browser allows sound.
    sfx.current ??= createSfx();
    sfx.current.unlock();
    sfx.current.squash();
    setAnnounce("Sending.");
    const result = new Promise<MorphResult>((resolve) => {
      settle.current = resolve;
    });
    void playMorph(
      r,
      result,
      () => run.current !== mine,
      sfx.current ?? undefined,
      { form: faceForm.current, done: faceDone.current },
    ).then((outcome) => {
      if (outcome === "cancelled" || run.current !== mine) return;
      animating.current = false;
      if (outcome === "ok") {
        setView("done");
        setAnnounce("Check your email.");
      }
      // Let React show the final view, then drop the animation's inline styles.
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          if (run.current !== mine) return;
          cleanup(r);
          resetFaces();
          if (outcome === "ok") // preventScroll: on a short screen the browser would otherwise scroll the card to show the button.
          doneView.current?.querySelector<HTMLElement>(".notify-done")?.focus({ preventScroll: true });
          else if (dialog.current?.open) startIdle();
        }),
      );
    });
  };

  const handleSent = (email: string) => {
    setSentTo(email || "your inbox");
    if (animating.current) settle.current?.("ok");
    else {
      setView("done");
      setAnnounce("Check your email.");
    }
  };
  const handleFailed = () => {
    setAnnounce("That did not go through.");
    settle.current?.("fail");
  };

  return (
    <>
      <button
        type="button"
        className="store-badge pressable"
        aria-haspopup="dialog"
        aria-label="Get an email when Speechworks is on the App Store"
        onClick={open}
      >
        <svg
          width="26"
          height="29"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
        </svg>
        <span>
          <small>Get notified on the</small>
          <strong>App Store</strong>
        </span>
      </button>
      {ready &&
        createPortal(
          <dialog
            ref={dialog}
            className="notify-dialog"
            aria-labelledby={`${id}-${view}-title`}
            onClose={onClosed}
            onClick={(event) => {
              // A click on the dimmed area (the dialog box itself, outside the card) closes it.
              if (event.target === event.currentTarget) close();
            }}
          >
            <div className="notify-orbit" ref={orbit} aria-hidden="true">
              <Ring back />
              <Ring back={false} />
              <Envelope />
              <Envelope />
              <Envelope />
            </div>
            <div className="notify-card" tabIndex={-1} ref={card}>
              <button
                type="button"
                className="notify-sound"
                aria-label={soundOn ? "Turn sound off" : "Turn sound on"}
                aria-pressed={soundOn}
                onClick={() => {
                  const next = !soundOn;
                  setSoundOn(next);
                  setSoundEnabled(next);
                  if (next) {
                    sfx.current ??= createSfx();
                    sfx.current.unlock();
                    sfx.current.tink(1);
                  }
                }}
              >
                {soundOn ? <Volume2 size={20} aria-hidden="true" /> : <VolumeX size={20} aria-hidden="true" />}
              </button>
              <button
                type="button"
                className="notify-close"
                aria-label="Close"
                onClick={close}
              >
                <X size={20} aria-hidden="true" />
              </button>
              <div
                className="notify-view notify-view-form"
                ref={formView}
                data-off={view !== "form" ? "" : undefined}
                onFocus={(event) => {
                  // He watches the box while the visitor types in it.
                  const t = event.target as HTMLInputElement;
                  if (t.matches('input[type="email"]') && !animating.current) {
                    endWave();
                    faceForm.current?.watch(textFraction(t));
                  }
                }}
                onInput={(event) => {
                  const t = event.target as HTMLInputElement;
                  if (t.matches('input[type="email"]') && !animating.current) {
                    endWave();
                    faceForm.current?.watch(textFraction(t));
                  }
                }}
                onBlur={(event) => {
                  if ((event.target as HTMLElement).matches('input[type="email"]')) faceForm.current?.watch(null);
                }}
                onChange={(event) => {
                  // He winks when the box is ticked: Speechworks likes that.
                  const t = event.target as HTMLInputElement;
                  if (t.matches('input[type="checkbox"]') && t.checked && !animating.current && !instantMotion()) {
                    const face = faceForm.current;
                    endWave(true);
                    face?.watch(null);
                    face?.to("joyful", 0.15);
                    const tl = face?.wink(0.25);
                    // back to the resting face once the wink is done (unless the visitor has moved on)
                    tl?.call(() => { if (!animating.current) face?.to("steady", 0.4); });
                  }
                }}
              >
                <div className="notify-face" aria-hidden="true">
                  <MailmanFace ref={faceForm} initial="steady" />
                </div>
                <h2 id={`${id}-form-title`}>{HEADLINE}</h2>
                <LaunchList
                  placement={placement}
                  headline={HEADLINE}
                  showHeadline={false}
                  showThanks={false}
                  note="Unsubscribe with one click."
                  onSending={handleSending}
                  onSent={handleSent}
                  onFailed={handleFailed}
                />
              </div>
              <div className="notify-view notify-view-done" ref={doneView} data-off={view !== "done" ? "" : undefined}>
                <div className="notify-face" aria-hidden="true">
                  <MailmanFace ref={faceDone} initial="joyful" />
                </div>
                <h2 id={`${id}-done-title`}>Check your email.</h2>
                <p className="notify-sentto">
                  Click the link we sent to <strong>{sentTo}</strong> to confirm.
                </p>
                <p className="notify-help">
                  No email? Check spam, or you may already be signed up.
                </p>
                <button
                  type="button"
                  className="button button-ink pressable notify-done"
                  onClick={close}
                >
                  Close
                </button>
              </div>
              <svg className="notify-globe" ref={globe} viewBox="-125 -125 250 250" aria-hidden="true">
                <defs>
                  <clipPath id={`${id}-gclip`}>
                    <circle r="123" />
                  </clipPath>
                </defs>
                <circle r="123" fill="#c8f750" />
                <g clipPath={`url(#${id}-gclip)`}>
                  <circle r="123" cx="26" cy="26" fill="rgba(20,19,17,.10)" />
                  <g fill="none" stroke="#141311" strokeWidth="2.4" strokeLinecap="round" opacity=".85">
                    <ellipse className="draw notify-merid" pathLength={1} rx="123" ry="123" />
                    <ellipse className="draw notify-merid" pathLength={1} rx="123" ry="123" />
                    <ellipse className="draw notify-merid" pathLength={1} rx="123" ry="123" />
                    <path className="draw" pathLength={1} d="M-123 -56 Q0 -34 123 -56" />
                    <path className="draw" pathLength={1} d="M-125 0 Q0 20 125 0" />
                    <path className="draw" pathLength={1} d="M-123 58 Q0 82 123 58" />
                  </g>
                  <path d="M-86 -62 Q-62 -96 -22 -104" fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round" opacity=".5" />
                </g>
                <circle r="123" fill="none" stroke="#141311" strokeWidth="4" />
              </svg>
            </div>
            <p className="notify-sr" role="status">
              {announce}
            </p>
          </dialog>,
          document.body,
        )}
    </>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import {
  APP_LIVE_CONSENT,
  launchListAction,
  launchListUsername,
} from "@/content/launch-list";

// Keep the source tag short and safe: lower case letters, digits, "-" and "_".
function cleanTag(value: string | null) {
  const tag = (value ?? "").toLowerCase().trim();
  return /^[a-z0-9_-]{1,32}$/.test(tag) ? tag : "";
}

type Props = {
  /** Where the form sits, saved with the sign-up (for example "home"). */
  placement: string;
  headline?: string;
  buttonText?: string;
  /** The exact words next to the tick box. Saved with the sign-up. */
  consent?: string;
  /** Buttondown tag that keeps this list apart from other lists. */
  tag?: string;
  thanks?: string;
  note?: string;
  /** Set false when the parent already shows the headline (for example inside a modal). */
  showHeadline?: boolean;
  /** Called once the form is sent. */
  onSent?: () => void;
};

export default function LaunchList({
  placement,
  headline = "Email me when the iPhone app is live.",
  buttonText = "Email me",
  consent = APP_LIVE_CONSENT,
  tag = "app-live",
  thanks = "Check your email and confirm. After that we will send you one email when the iPhone app is live.",
  note = "One email when the app is live. Unsubscribe with one click.",
  showHeadline = true,
  onSent,
}: Props) {
  const id = useId();
  const [src, setSrc] = useState("direct");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const fromUrl = cleanTag(
      new URLSearchParams(window.location.search).get("src"),
    );
    if (fromUrl) setSrc(fromUrl);
  }, []);

  if (!launchListUsername) return null;

  return (
    <div className="launch-list">
      {showHeadline && (
        <p className="launch-list-title" id={`${id}-title`}>
          {headline}
        </p>
      )}
      {sent && (
        <div className="launch-list-thanks" role="status">
          <p className="launch-list-thanks-title">Thank you.</p>
          <p>{thanks}</p>
          <p>
            If a new tab asks you to check that you are a person, finish that
            first.
          </p>
        </div>
      )}
      {/* The form stays in the page (only hidden) so the browser can finish sending it. */}
      <form
        hidden={sent}
        className="launch-list-form"
        aria-label={headline}
        action={launchListAction}
        method="post"
        target="_blank"
        rel="noopener"
        onSubmit={() => {
          setSent(true);
          onSent?.();
        }}
      >
        <input type="hidden" name="embed" value="1" />
        <input type="hidden" name="tag" value={tag} />
        <input type="hidden" name="tag" value={`src-${src}`} />
        <input type="hidden" name="metadata__src" value={src} />
        <input type="hidden" name="metadata__page" value={placement} />
        <input type="hidden" name="metadata__consent" value={consent} />
        <div className="launch-list-row">
          <label className="launch-list-label" htmlFor={`${id}-email`}>
            Email address
          </label>
          <input
            id={`${id}-email`}
            type="email"
            name="email"
            autoComplete="email"
            inputMode="email"
            required
            placeholder="you@example.com"
          />
          <button type="submit" className="button pressable">
            {buttonText}
          </button>
        </div>
        <label className="launch-list-consent" htmlFor={`${id}-consent`}>
          <input id={`${id}-consent`} type="checkbox" required />
          <span>{consent}</span>
        </label>
        <p className="launch-list-note">
          {note} See our{" "}
          <Link href="/privacy/#launch-list">privacy policy</Link>.
        </p>
      </form>
    </div>
  );
}

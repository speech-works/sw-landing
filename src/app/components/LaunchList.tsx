"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import {
  APP_LIVE_CONSENT,
  LAUNCH_LIST_EMAIL_FIELD,
  launchListAction,
  launchListHiddenFields,
} from "@/content/launch-list";
import { cleanTag } from "@/content/source-tag";


type Props = {
  /** Where the form sits, saved with the sign-up (for example "home"). */
  placement: string;
  headline?: string;
  buttonText?: string;
  /** The exact words next to the tick box. Saved with the sign-up. */
  consent?: string;
  /** Label that keeps this list apart from other lists. */
  tag?: string;
  thanks?: string;
  note?: string;
  /** Set false when the parent already shows the headline (for example inside a modal). */
  showHeadline?: boolean;
  /** Set false when the parent shows its own thank-you after the form is sent. */
  showThanks?: boolean;
  /** Called when the sign-up starts sending. */
  onSending?: () => void;
  /** Called once the form is sent. */
  onSent?: (email: string) => void;
  /** Called when the sign-up did not go through. */
  onFailed?: () => void;
};

export default function LaunchList({
  placement,
  headline = "Email me when the iPhone app is live.",
  buttonText = "Notify me",
  consent = APP_LIVE_CONSENT,
  tag = "app-live",
  thanks = "Check your email and confirm. After that we will email you when the iPhone app is live.",
  note = "Unsubscribe with one click.",
  showHeadline = true,
  showThanks = true,
  onSending,
  onSent,
  onFailed,
}: Props) {
  const id = useId();
  const [src, setSrc] = useState("direct");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fromUrl = cleanTag(
      new URLSearchParams(window.location.search).get("src"),
    );
    if (fromUrl) setSrc(fromUrl);
  }, []);

  if (!launchListAction) return null;

  // Send the sign-up from this page, so the visitor stays on the site.
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    setError("");
    setSending(true);
    const data = new FormData(event.currentTarget);
    const email = String(data.get(LAUNCH_LIST_EMAIL_FIELD) ?? "").trim();
    onSending?.();
    try {
      const response = await fetch(launchListAction, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      const result = await response.json();
      if (result?.status === "success") {
        setSent(true);
        onSent?.(email);
      } else {
        setError(
          "That did not go through. Check your email address and try again.",
        );
        onFailed?.();
      }
    } catch {
      setError("We could not send that. Check your connection and try again.");
      onFailed?.();
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="launch-list">
      {showHeadline && (
        <p className="launch-list-title" id={`${id}-title`}>
          {headline}
        </p>
      )}
      {sent && showThanks && (
        <div className="launch-list-thanks" role="status">
          <p className="launch-list-thanks-title">Thank you.</p>
          <p>{thanks}</p>
        </div>
      )}
      <form
        hidden={sent}
        className="launch-list-form"
        aria-label={headline}
        action={launchListAction}
        method="post"
        onSubmit={submit}
      >
        {launchListHiddenFields({ src, placement, consent, tag }).map(
          ([name, value]) => (
            <input key={name} type="hidden" name={name} value={value} />
          ),
        )}
        <div className="launch-list-row">
          <label className="launch-list-label" htmlFor={`${id}-email`}>
            Email address
          </label>
          <input
            id={`${id}-email`}
            type="email"
            name={LAUNCH_LIST_EMAIL_FIELD}
            autoComplete="email"
            inputMode="email"
            required
            placeholder="you@example.com"
          />
          <button
            type="submit"
            className="button pressable"
            disabled={sending}
          >
            {sending ? "Sending..." : buttonText}
          </button>
        </div>
        <label className="launch-list-consent" htmlFor={`${id}-consent`}>
          <input id={`${id}-consent`} type="checkbox" required />
          <span>{consent}</span>
        </label>
        {error && (
          <p className="launch-list-error" role="alert">
            {error}
          </p>
        )}
        <p className="launch-list-note">
          {note} See our{" "}
          <Link href="/privacy/#launch-list" target="_blank" rel="noopener">
            privacy policy
          </Link>
          .
        </p>
      </form>
    </div>
  );
}

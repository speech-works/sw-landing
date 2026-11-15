"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import Avatar from "./Avatar";
import LaunchList from "./LaunchList";

const HEADLINE = "Email me when the iPhone app is live.";

/** The App Store badge while the iPhone app is not out yet. Opens a small dialog where the visitor can ask for one email when it is live. */
export default function NotifyBadge({ placement }: { placement: string }) {
  const id = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const [ready, setReady] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => setReady(true), []);

  const open = () => {
    dialog.current?.showModal();
    // Start on the card, not on a control, so no focus ring shows for mouse users.
    // Keyboard users press Tab to reach the email field.
    dialog.current?.querySelector<HTMLElement>(".notify-card")?.focus();
  };
  const close = () => dialog.current?.close();

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
            aria-labelledby={`${id}-title`}
            onClick={(event) => {
              // A click on the dimmed area (the dialog box itself, outside the card) closes it.
              if (event.target === event.currentTarget) close();
            }}
          >
            <div className="notify-card" tabIndex={-1}>
              <button
                type="button"
                className="notify-close"
                aria-label="Close"
                onClick={close}
              >
                <X size={20} aria-hidden="true" />
              </button>
              <div className="notify-face" aria-hidden="true">
                <Avatar name="mailman" size={112} priority />
              </div>
              <h2 id={`${id}-title`}>{HEADLINE}</h2>
              {!sent && (
                <p className="notify-lead">
                  Leave your email. We will write once, when Speechworks is on
                  the App Store.
                </p>
              )}
              <LaunchList
                placement={placement}
                headline={HEADLINE}
                showHeadline={false}
                note="Unsubscribe with one click."
                onSent={() => setSent(true)}
              />
              {sent && (
                <button
                  type="button"
                  className="button button-ink pressable notify-done"
                  onClick={close}
                >
                  Close
                </button>
              )}
            </div>
          </dialog>,
          document.body,
        )}
    </>
  );
}

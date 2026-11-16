"use client";

import { useEffect, useId, useRef } from "react";
import { X } from "lucide-react";
import Avatar from "./Avatar";

// Kit sends people here after they click "Confirm my email" in the confirmation
// email (set Kit's "after confirming redirect" to https://speechworks.app/?confirmed=1).
// The visitor stays on the site and sees this thank-you.
export default function ConfirmedModal() {
  const id = useId();
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("confirmed") !== "1") return;
    dialog.current?.showModal();
    dialog.current?.querySelector<HTMLElement>(".notify-card")?.focus();
  }, []);

  // Drop ?confirmed=1 from the address once the dialog closes.
  const onClose = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("confirmed");
    window.history.replaceState(null, "", url.pathname + url.search + url.hash);
  };

  const close = () => dialog.current?.close();

  return (
    <dialog
      ref={dialog}
      className="notify-dialog"
      aria-labelledby={`${id}-title`}
      onClose={onClose}
      onClick={(event) => {
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
          <Avatar name="mailman-happy" size={112} />
        </div>
        <h2 id={`${id}-title`}>You are on the list.</h2>
        <p className="notify-thanks">
          Thank you for confirming. We will email you when the iPhone app is
          live, and about new programs and offers.
        </p>
        <button
          type="button"
          className="button button-ink pressable notify-done"
          onClick={close}
        >
          Close
        </button>
      </div>
    </dialog>
  );
}

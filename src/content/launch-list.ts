import { downloads } from "@/content/downloads";

// Email sign-up settings. The form posts straight from the page to Kit (kit.com,
// the hosted email service). This is the Kit form's address (the form's
// Embed > HTML code shows it). It is a public address, not a secret. While it is
// empty, the form is not shown anywhere. It can also be set at build time with
// NEXT_PUBLIC_LAUNCH_LIST_ACTION.
export const LAUNCH_LIST_ACTION = "https://app.kit.com/forms/10192952/subscriptions";

export const launchListAction =
  process.env.NEXT_PUBLIC_LAUNCH_LIST_ACTION || LAUNCH_LIST_ACTION;

// The name of the email input in Kit's form code.
export const LAUNCH_LIST_EMAIL_FIELD = "email_address";

// Extra hidden fields sent with the sign-up. Kit saves form inputs named
// fields[<key>] into the custom field with that key. The two custom fields
// "source" and "placement" must exist in Kit (Subscribers > Custom fields).
// Until they do, Kit ignores these inputs and the sign-up still works.
// source = the page's ?src= (or "direct"), placement = where the form sits.
export function launchListHiddenFields(values: {
  src: string;
  placement: string;
  consent: string;
  tag: string;
}): Array<[name: string, value: string]> {
  return [
    ["fields[source]", values.src],
    ["fields[placement]", values.placement],
  ];
}

// The "email me when the iPhone app is live" form shows only while there is no
// App Store link. Once NEXT_PUBLIC_APP_STORE_URL is set, the real button shows
// and the form hides itself.
export const showAppLiveForm = Boolean(launchListAction) && !downloads.ios;

// The exact words the visitor ticks.
export const APP_LIVE_CONSENT =
  "Email me when the Speechworks iPhone app is live, and about new programs and offers. I can unsubscribe at any time.";

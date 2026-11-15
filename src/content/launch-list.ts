import { downloads } from "@/content/downloads";

// Email sign-up settings. The form posts straight from the page to Buttondown
// (hosted email service). Fill in the Buttondown username once the account
// exists. While it is empty, the form is not shown anywhere.
export const LAUNCH_LIST_USERNAME = "";

export const launchListUsername =
  process.env.NEXT_PUBLIC_LAUNCH_LIST_USER || LAUNCH_LIST_USERNAME;

export const launchListAction = `https://buttondown.com/api/emails/embed-subscribe/${launchListUsername}`;

// The "email me when the iPhone app is live" form shows only while there is no
// App Store link. Once NEXT_PUBLIC_APP_STORE_URL is set, the real button shows
// and the form hides itself.
export const showAppLiveForm = Boolean(launchListUsername) && !downloads.ios;

// The exact words the visitor ticks. It is saved with the sign-up as proof of consent.
export const APP_LIVE_CONSENT =
  "Email me once when the Speechworks iPhone app is live. I can unsubscribe at any time.";

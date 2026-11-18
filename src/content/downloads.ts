import { cleanTag } from "@/content/source-tag";

export const downloads = {
  android: "https://play.google.com/store/apps/details?id=com.speechworks.app",
  // Supply the verified public listing when iOS is available.
  ios: process.env.NEXT_PUBLIC_APP_STORE_URL || "",
};

// The Play link with a source tag, so Play Console can show installs by
// channel and by place on the site (Play Console > Statistics > acquisition,
// "UTM campaigns"). utm_source is the visitor's ?src= (for example "reddit"),
// or "website" when there is none. utm_content is where the button sits.
export function playStoreLink(placement: string, src?: string) {
  const source = cleanTag(src) || "website";
  const content = cleanTag(placement) || "site";
  const referrer = `utm_source=${source}&utm_medium=site&utm_content=${content}`;
  return `${downloads.android}&referrer=${encodeURIComponent(referrer)}`;
}

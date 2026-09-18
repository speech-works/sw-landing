// Launch-offer discounts. The site is released globally and app stores charge in
// local currencies, so copy never shows a price, only the percentage off.
// Tiers mirror the app's catalog (sw-be-2 src/config/Catalog.ts): interview and
// phone call programs sit on the upper shelf, the rest on the lower one. While the
// launch offer runs, each program is charged one tier lower.
// Turn LAUNCH_OFFER off here when the app's LAUNCH_OFFER_ACTIVE is turned off.
export const LAUNCH_OFFER = true;

const DEEP_SHELF = new Set(["interview_ready", "hard_conversations"]);

// Relative tier sizes (base currency units). Only the ratio between them is used.
const tiers = { upper: 1999, lower: 999, lowest: 499 };

/** Percentage off during the launch offer, or null when no offer is running. */
export function launchDiscount(key: string): number | null {
  if (!LAUNCH_OFFER) return null;
  const regular = DEEP_SHELF.has(key) ? tiers.upper : tiers.lower;
  const offer = DEEP_SHELF.has(key) ? tiers.lower : tiers.lowest;
  return Math.round(((regular - offer) / regular) * 100);
}

/** One discount line for a whole page: "50% off every program", or "up to" when programs differ. */
export function launchOfferSummary(keys: string[]): { percent: number; same: boolean } | null {
  const discounts = keys.map(launchDiscount).filter((d): d is number => d !== null);
  if (!discounts.length) return null;
  const percent = Math.max(...discounts);
  return { percent, same: discounts.every((d) => d === percent) };
}

// Program prices in INR. Mirrors the app's catalog (sw-be-2 src/config/Catalog.ts):
// interview and phone call programs sit on the ₹1,999 shelf, the rest on ₹999.
// While the launch offer runs, each program is charged one tier lower.
// Turn LAUNCH_OFFER off here when the app's LAUNCH_OFFER_ACTIVE is turned off.
export const LAUNCH_OFFER = true;

const DEEP_SHELF = new Set(["interview_ready", "hard_conversations"]);

export type ProgramPrice = { regular: number; now: number; onOffer: boolean };

export function programPrice(key: string): ProgramPrice {
  const regular = DEEP_SHELF.has(key) ? 1999 : 999;
  const offer = DEEP_SHELF.has(key) ? 999 : 499;
  return { regular, now: LAUNCH_OFFER ? offer : regular, onOffer: LAUNCH_OFFER };
}

export const rupees = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;

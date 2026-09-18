import { programPrice, rupees } from "@/content/pricing";

// A small tilted sticker. Shows the launch price with the regular price struck through.
export default function PriceBadge({ programKey }: { programKey: string }) {
  const price = programPrice(programKey);
  if (!price.onOffer) {
    return (
      <span className="price-badge price-badge-plain">
        <strong>{rupees(price.now)}</strong>
        <small>pay once</small>
      </span>
    );
  }
  return (
    <span className="price-badge">
      <small>Launch offer</small>
      <span className="price-badge-amounts">
        <s aria-label={`was ${rupees(price.regular)}`}>{rupees(price.regular)}</s>
        <strong aria-label={`now ${rupees(price.now)}`}>{rupees(price.now)}</strong>
      </span>
    </span>
  );
}

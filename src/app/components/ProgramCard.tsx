import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Program } from "@/content/programs";
import ProgramIllustration from "./ProgramIllustration";
import PriceBadge from "./PriceBadge";

export default function ProgramCard({ program }: { program: Program }) {
  return (
    <Link
      href={`/programs/${program.slug}/`}
      className={`program-card tone-${program.color} pressable`}
      data-reveal
    >
      <div className="program-card-top">
        <span>{program.days} days</span>
        <PriceBadge programKey={program.key} />
        <ArrowUpRight size={23} aria-hidden="true" />
      </div>
      <div className="program-card-art">
        <ProgramIllustration program={program.key} decorative />
      </div>
      <h3>{program.label}</h3>
      <p className="program-card-description">{program.description}</p>
      <span className="program-card-link">
        See lessons <ArrowUpRight size={16} aria-hidden="true" />
      </span>
    </Link>
  );
}

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Program } from "@/content/programs";
import ProgramIllustration from "./ProgramIllustration";

export default function ProgramCard({ program }: { program: Program }) {
  return (
    <Link
      href={`/programs/${program.slug}/`}
      className={`program-card tone-${program.color} pressable`}
      data-reveal
    >
      <div className="program-card-top">
        <span>{program.days} days</span>
        <ArrowUpRight size={23} aria-hidden="true" />
      </div>
      <div className="program-card-art">
        <ProgramIllustration program={program.key} decorative />
      </div>
      <p className="program-situation">{program.situation}</p>
      <h3>{program.title}</h3>
      <p className="program-card-description">{program.description}</p>
      <span className="program-card-link">
        See the daily outline <ArrowUpRight size={16} aria-hidden="true" />
      </span>
    </Link>
  );
}

import { useId } from "react";
import { characterArtwork } from "@/lib/character-artwork.generated";

type Character = keyof typeof characterArtwork;
type Actor = "interview-man" | "maya" | "caller" | "partner-one" | "partner-two" | "mirror";

export default function CharacterPortrait({ name, actor }: { name: Character; actor: Actor }) {
  const id = useId().replace(/:/g, "");
  return (
    <div
      className="character-portrait"
      data-actor={actor}
      aria-hidden="true"
      // Trusted SVG generated locally from our own brand artwork. Each instance
      // needs distinct gradient/clip IDs, including the two curly portraits.
      dangerouslySetInnerHTML={{ __html: characterArtwork[name].replaceAll("character-id", id) }}
    />
  );
}

import Image from "next/image";

export const avatarNames = [
  "headphones",
  "cowboy",
  "pigtails",
  "banker",
  "coach",
  "silver",
  "curly",
  "hijab",
  "beanie",
  "turban",
  "coils",
  "flower",
  "workcap",
  "braids",
  "scholar",
  "saltpepper",
  "bob",
  "bald",
  "cap",
  "communicator",
] as const;

export const avatarLabels: Record<(typeof avatarNames)[number], string> = {
  headphones: "Mint headphones",
  cowboy: "Cowboy hat and silver moustache",
  pigtails: "Blonde pigtails and rose bows",
  banker: "Navy lapels and square glasses",
  coach: "Coach cap and sideline headset",
  curly: "Orange beret",
  beanie: "Blue beanie",
  flower: "Coral bandana",
  scholar: "Cream newsboy cap",
  bob: "Ribboned sunhat",
  cap: "Lilac sun visor",
  communicator: "Green headset",
  silver: "Silver waves and glasses",
  saltpepper: "Silver curls and beard",
  hijab: "Slate headscarf",
  turban: "Teal turban",
  bald: "Silver temples",
  coils: "Natural coils and star glasses",
  braids: "Braids and cat-eye glasses",
  workcap: "Sage cap and stubble",
};
export default function Avatar({
  name,
  size = 100,
  className = "",
  alt = "",
  priority = false,
}: {
  name: string;
  size?: number;
  className?: string;
  alt?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={`/avatars/${name}.svg`}
      width={size}
      height={size}
      className={`avatar ${className}`}
      alt={alt}
      priority={priority}
      draggable={false}
    />
  );
}

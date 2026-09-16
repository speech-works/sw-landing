import Image from "next/image";

const descriptions: Record<string, string> = {
  interview_ready:
    "Speechworks avatar with a confident smile, cream newsboy cap, and blue notched collar.",
  hard_conversations:
    "Speechworks avatar speaking into a green headset, with a shawl collar.",
  art_of_disclosure:
    "Speechworks avatar with a welcoming expression and a slate headscarf.",
  panic_button:
    "Speechworks avatar with relaxed eyes, a gentle smile, blue beanie, and roll neck.",
  bouncing_back:
    "Speechworks avatar with a gentle smile, braids, and rose cat-eye glasses.",
  breaking_thought_traps:
    "Speechworks avatar with a reflective sideways glance, curly hair, and an orange beret.",
  dating_intimacy: "Speechworks avatar with an amused smile, coral bandana, and navy bow tie.",
  word_swap:
    "Speechworks avatar mid-sentence, with a teal turban and beard.",
  speech_toolkit:
    "Speechworks avatar with an inquisitive upward glance, natural coils, and coral sailor collar.",
  understanding_your_voice:
    "Speechworks avatar with an attentive expression, swept hair, and mint headphones.",
};

export default function ProgramIllustration({
  program,
  decorative = false,
}: {
  program: string;
  decorative?: boolean;
}) {
  return (
    <Image
      className={`program-portrait program-portrait-${program}`}
      src={`/characters/${program}.svg`}
      width={288}
      height={288}
      alt={decorative ? "" : descriptions[program]}
      draggable={false}
    />
  );
}

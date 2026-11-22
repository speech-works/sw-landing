import Avatar from "./Avatar";
import InterviewAvatar from "./InterviewAvatar";
import CallAvatar, { CallWindow } from "./CallAvatar";
import BalloonAvatar from "./BalloonAvatar";
import IcebergAvatar from "./IcebergAvatar";
import BounceAvatar from "./BounceAvatar";
import TigerAvatar from "./TigerAvatar";
import DatingAvatar from "./DatingAvatar";
import CageAvatar from "./CageAvatar";
import WordSwapAvatar from "./WordSwapAvatar";
import CrayonAvatar from "./CrayonAvatar";

// Each program is shown by one cast member (the same ones as on the About page).
const cast: Record<string, string> = {
  interview_ready: "banker",
  hard_conversations: "phone-call",
  art_of_disclosure: "hijab",
  panic_button: "beanie",
  bouncing_back: "braids",
  breaking_thought_traps: "curly",
  dating_intimacy: "flower",
  word_swap: "turban",
  speech_toolkit: "coils",
  understanding_your_voice: "headphones",
};

const descriptions: Record<string, string> = {
  interview_ready:
    "Speechworks avatar in square glasses and a navy jacket, dressed for an interview.",
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
  animated = false,
}: {
  program: string;
  decorative?: boolean;
  /** The animated scene (only on the program's own page); the cards show the plain picture. */
  animated?: boolean;
}) {
  return (
    <Avatar
      name={cast[program]}
      size={288}
      className={`program-portrait program-portrait-${program}`}
      alt={decorative ? "" : descriptions[program]}
      plain={animated && program === "dating_intimacy"}
      behind={animated && program === "hard_conversations" ? <CallWindow /> : undefined}
      art={
        animated && program === "interview_ready" ? <InterviewAvatar open alt={decorative ? "" : descriptions[program]} />
        : animated && program === "hard_conversations" ? <CallAvatar alt={decorative ? "" : descriptions[program]} />
        : animated && program === "panic_button" ? <TigerAvatar alt={decorative ? "" : descriptions[program]} />
        : animated && program === "art_of_disclosure" ? <BalloonAvatar alt={decorative ? "" : descriptions[program]} />
        : animated && program === "understanding_your_voice" ? <IcebergAvatar alt={decorative ? "" : descriptions[program]} />
        : animated && program === "dating_intimacy" ? <DatingAvatar alt={decorative ? "" : "Two people at a small pond, each with a paper boat. The boats drift toward each other and touch softly."} />
        : animated && program === "word_swap" ? <WordSwapAvatar alt={decorative ? "" : "Speechworks avatar in a teal turban who sets down a plain lilac box, then opens a gold gift box. Coral hearts float up out of it."} />
        : animated && program === "breaking_thought_traps" ? <CageAvatar alt={decorative ? "" : descriptions[program]} />
        : animated && program === "speech_toolkit" ? <CrayonAvatar alt={decorative ? "" : "Speechworks avatar with natural coils and an open box of crayons. Crayons lift out and draw in the air; she keeps the yellow one."} />
        : animated && program === "bouncing_back" ? <BounceAvatar alt={decorative ? "" : descriptions[program]} />
        : undefined
      }
    />
  );
}

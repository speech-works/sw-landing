# Program covers: brief (Book 1, title on the art)

## What the founder gave
- Layout: Book 1. The app sets the title in white at the top of the cover, over a light dark wash. Price and button sit below the art.
- Characters: the Speechworks website cast (avatars/kit.cjs), the program's own character and expression from `programCast`. Extra faces from the cast are welcome where the program involves other people.
- Style references (2026-10-16, second round): full illustrated scenes with rich backgrounds. A windmill on a hill by the sea, a rowing boat among lily pads seen from above, power lines and a lit house at night, stacked cats under stars, a cat in a box, a cosy room, two cats and a washing machine, a cat at a desk among mugs. Shared thread: a whole world around the character, bold outlines, flat colour, lots of small details, kind humour.
- The first round (one character and one prop on a flat colour) was rejected as too plain.

## Round 3 (approved 2026-10-17)

Round 2's rich scenes were approved on 2026-10-16, then replaced the next day:
the founder found they did not say what each program is about. Round 3 has one
clear idea per cover, each drawn from a reference the founder sent
(`references/`). These are the covers the app ships.

## Rules for every cover
- 3:4 portrait, 900x1200 master (png@2x is 1800x2400). Keep the top third calm: the app sets the white title there.
- The Home card crops the cover from the top (object-position 50% 100%), so the subject sits in the lower two thirds.
- Our characters from the avatar kit, faces and mouths fully visible, nobody hiding. Bodies, arms and hands appear only where the idea needs them.
- A hand is ONE shape: palm, fingers and thumb share a single outline (stroke the union wide, then fill), and the part that lies on an object is drawn again clipped to it. Fingers at one scale with the thumb.
- Costume overlays (suit, hi-vis, dress) sit behind the kit head, so the chin is in front of the neckline.
- Outlines in the kit's ink (#242329); accents from the app: orange #FF9040, cream #F3EDE2, lime #C8F750.
- No text, letters, numbers or logos, with one exception: the iceberg labels on Understanding Your Voice, in the program's own day 1 words, set in Inter.
- Humour laughs with the person, never at stuttering. No cure imagery, no fluency trophies or rankings, no breath lines.

## The ten covers
| Program | Character | Cover |
|---|---|---|
| Interview Ready | banker, determined, in a suit | A video call on a desktop monitor, prep notes stuck round the screen; some crossed out, one ticked. |
| The Hard Conversations | communicator, worried | A phone in the reader's hand (graphic grip, the founder's pick); the character rises out of the screen, a green bubble carrying the words out. |
| The Panic Button | beanie, flustered, windswept blonde hair, yellow A-line dress with a Peter Pan collar | Inside a flat red no-sign; a blue aura with pale hands reaching in, crossed out by the sign's bar. |
| Understanding Your Voice | hijab, attentive | The iceberg, labelled (Blocks, Repetitions; Fear, Swapped words, Avoidance, Tiredness), with a yellow submarine and a few fish. |
| Breaking Thought Traps | bob, redrawn in side view | A big calm head; a door opens in the back of it and a small version of her runs out, down a staircase. |
| Bouncing Back | braids, gleeful | Springing up out of a 3D jack-in-the-box, arms high, confetti. |
| Dating, Intimacy & Vulnerability | flower, laughing; cap, pleased | Two profile cards leaning in, a heart and two speech bubbles between them. |
| The Speech Toolkit | coils face, inquisitive, in a hard hat with no hair showing under it, and a hi-vis vest | Behind an open toolbox, tools all round. |
| The Art of Disclosure | curly, welcoming, in a cowboy hat | Looking over a brick wall, fingers on the top, the whole face up. |
| The Word Swap | pigtails, explaining | Up to the shoulders in a heap of speech bubbles; one orange bubble beside her. |

## Build
`node build.cjs` renders every cover from `scenes/r3/` (or `node build.cjs <slug>` for one) into `svg/`, `png/` and `png@2x/`. Shared parts: `scenes/kit.cjs` (scene helpers, `seat`), `scenes/r3/props.cjs` (costumes, hair, moods), `scenes/r3/tools.cjs`. Fonts for the labels are in `fonts/`. The app bundles `png/` as sw-fe-m-2/app/assets/program-covers; copy them there after a change. The round 2 scenes stay in `scenes/*.cjs` for reference; nothing renders them.

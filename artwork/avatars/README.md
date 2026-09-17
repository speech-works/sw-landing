# Approved Speechworks avatar artwork

The mint-headphone vector proof was approved on 16 September 2026. The website
uses that face construction across twenty characters and ten program portraits.

## Source

- `approved-master.svg`: the accepted drawing, preserved as the visual reference.
- `approved-parts.json`: its extracted SVG definitions and top-level groups.
- `kit.cjs`: the cast, original wardrobe paths, expression variants and renderer.
- `export/parts.json`: generated catalogue for a later mobile integration.
- `../../scripts/build-avatar-artwork.cjs`: exports the static SVGs consumed by
  the website. Run `npm run artwork:build` after editing source parts.

The export is dependency-free at website runtime. Checked-in SVGs work without
the mobile or backend sibling repositories.

## Drawing rules

All characters share the approved head path and eye anchors in a 320 × 310
viewBox. Expressions coordinate eyebrows, eyes and mouth. Collars and hair can
have back/front layers. Hat placement keeps the brows readable. Every portrait
is limited to the face, collar and shoulder edge, with no torso or hands.

Collars include open polo, Peter Pan, roll neck, mandarin, sailor,
notched, shawl, bow tie, western neckerchief, rounded rose collar, shirt with
tie and zipped training collar. Headwear includes headphones, beret, beanie, bucket
hat, cap, newsboy cap, microphone headset, bandana, headscarf, turban, cowboy
hat, hair ribbons, sun visor and ribboned sunhat. Eyewear includes round,
rectangular, mint star and rose cat-eye frames; lenses keep expressions visible. The
cast spans younger, middle-aged and older adults, seven skin palettes, varied
hair textures, braids, baldness, grey hair, glasses and facial hair. Clothing
and skin colour are independent choices, not labels for ethnicity or occupation.

The expanded cast includes an older cowboy, jolly girl with blonde pigtails,
middle-aged banker and football coach. These are original head-and-collar
drawings in the approved style. Facial hair is clipped against the actual
head contour to prevent skin slivers at the cheeks and jaw.

Every cast member has a distinct expression. The ten program portraits also
use ten different context-driven expressions:

| Program | Expression | Illustration intention |
| --- | --- | --- |
| Interview Ready | Determined | Preparing to answer |
| The Hard Conversations | Speaking | Rehearsing a call |
| The Art of Disclosure | Welcoming | Opening a personal conversation |
| The Panic Button | Relieved | Pausing and grounding |
| Bouncing Back | Warm | Reflecting with kindness |
| Breaking Thought Traps | Reflective | Considering a prediction |
| Dating, Intimacy & Vulnerability | Amused | A light social moment |
| The Word Swap | Explaining | Trying the words someone wants to use |
| The Speech Toolkit | Inquisitive | Exploring a tool |
| Understanding Your Voice | Attentive | Listening and learning |

These are illustration choices, not assessments of user emotions or promised
program outcomes. Age and expression details share the same fixed head and eye
anchors as the approved proof.

## Website use

`public/avatars/` contains twenty cast portraits and five hero aliases.
`public/characters/` contains expressions selected for each program. These files
are generated; change the kit rather than editing individual outputs. Their
IDs are namespaced per portrait. If rendering multiple identical portraits
inline, pass a unique `id` to `renderAvatar` for each instance. Website image
elements already isolate SVG document IDs.

## Mobile integration boundary

The app has not been modified. The approved drawing has a different coordinate
system from the app's existing 48-unit kit. Do not mix the new SVG parts with
old wardrobe geometry by merely changing the viewBox.

The complete exported SVGs can be rendered by `react-native-svg`'s `SvgXml` for
a fidelity check. A customisable app renderer should consume the same geometry
and palette definitions, map existing saved part IDs deliberately, preserve
user colours and ownership rules, and validate compatible hair/headwear/collar
combinations. Expressions need an explicit renderer/catalogue extension; do
not silently overwrite saved user selections with a website illustration mood.

The generated part catalogue records geometry and cast configurations. Its
version is the artwork format version, not an app AvatarManifest version.


The `mirror` alias uses the bob portrait with no hat and the `effort`
expression. The pupils face forward; brows and mouth show restrained speaking
pressure. The website adds a fine SVG mesh and four green square markers in
`FeatureDeck.tsx`. This is an illustrated feature preview, not a live reading.

## Animated landing-page portraits

Run `npm run artwork:characters` to regenerate the inline character artwork in
`src/lib/character-artwork.generated.ts`. `character-rig.cjs` adds the gentle
facial rig to the approved kit. `interview-candidate.cjs` builds the single
young, clean-shaven interview character, with a separately posed head, collar,
and tie knot and a highlight clipped to the face. It uses the approved head
outline verbatim and the standard 320 × 310 collar-only crop. There are no
hand, arm, or torso layers. The small knot stays inside the collar boundary.

Animation timing lives in `src/app/globals.css`. The interview tie slides up
and straightens as the chin lifts, while a highlight passes across the face. The call pulses
follow the facial speaking turns and stay still while the caller pauses.
All these layers follow the card's shared Pause and reduced-motion controls.

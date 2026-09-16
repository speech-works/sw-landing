# Speechworks avatar direction

## Visual studies

- [Three directions](design-options/01-three-directions.png)
- [Expanded expressions, headwear and eight collar types](design-options/02-expressions-and-wardrobe.png)
- [Expanded sheet prompt and output review](design-options/generation-prompt.md)

## Design decision to make

Three initial options have been explored:

1. **App-native polish:** closest to the existing face, simpler internal detail and cleaner expressions.
2. **Illustrated cast:** the same character proportions, more expressive acting and fewer enclosing badges in large website illustrations.
3. **Playful headwear:** stronger original wearable silhouettes, used selectively rather than putting every character in a costume.

Recommended direction: option 2 for drawing and expression, with selected headwear from option 3. Retain the app's circle or square housing where its interface needs it. Large website art may use an unframed presentation of the same underlying parts.

The concept sheets are raster exploration, not completed SVG artwork or pixel-exact specifications. The first sheet introduced rounded cheeks, shading and some changed collar shapes. Those are not identity changes to carry into production. Final artwork must conform to the existing app geometry.

## Identity to preserve

- The app's original broad, rounded rectangular head plate, near-vertical sides and shallow angular chin.
- Existing eye anchors and recognisable oval eye construction, with dark pupils and a clear catchlight.
- Uniform charcoal ink and flat colour fills.
- Head, collar and a small shoulder edge only. No chest, body, hands or held objects.
- Recognisable hair and character combinations across website and app.

The supplied references inform expressive acting, silhouette variety and collar construction. They are not tracing templates. Draw original headwear; do not reproduce their signature helmets, emblems or complete character designs.

## Expressions

Create expressions as coordinated drawings of eyes, eyebrows and mouth. Preserve face identity through fixed anchors rather than a fixed smile.

| Expression | Drawing cue | Possible website use |
|---|---|---|
| Listening | Gaze toward the other element, slightly lifted brows, small parted smile | AI conversation preview |
| Curious | Asymmetric brows, gaze slightly upward, small open mouth | Learning about your voice |
| Thinking | Sideward glance, restrained mouth, subtle brow tension | Reflection and planning |
| Concerned | Raised inner brows, soft eyes and an off-centre mouth | Acknowledging a difficult moment, when context warrants it |
| Relieved | Relaxed lids or gently closed eyes, softened brows, small smile | A pause or grounding activity |
| Laughing | Lifted cheeks implied by curved eyes, open mouth, active brows | Playful avatar customisation |

These are authored illustration states. They should not automatically assign a mood to a person who stutters or imply that completing a program guarantees happiness.

## Wardrobe

Begin with a compact set that mixes clearly at small sizes:

- **Everyday:** open polo, mandarin, roll neck; beanie, cap, headphones.
- **Expressive:** Peter Pan, sailor, shawl; beret, bandana, newsboy cap.
- **Occasional playful pieces:** bow tie, short notched lapel; bucket hat or an original sculptural headset.

Use collar silhouette and colour to distinguish outfits. Keep their lower edge shallow enough to remain a head-and-shoulder portrait. Headwear should have a readable silhouette and one or two material details. Additional hats can be added later without changing the face.

## SVG feasibility and app consistency

The current app already supports the required modular structure:

- [`AvatarManifest`](../../sw-fe-m-2/app/types/avatar.ts) stores stable part IDs for head, face, hair, beard, headgear, eyewear, collar and other slots, plus user colours.
- [`registry.ts`](../../sw-fe-m-2/app/assets/avatar/registry.ts) already contains beanies, caps, headphones, berets and many collar styles, including Peter Pan, mandarin, sailor, shawl, polo and bow tie.
- [`UserAvatar`](../../sw-fe-m-2/app/components/UserAvatar.tsx) composes SVG layers, including separate back/front hair and collar passes.
- [`avatarKit.tsx`](../../sw-fe-m-2/app/assets/avatar/avatarKit.tsx) uses a 48-unit artwork space within `viewBox="-8 -8 64 64"`, a shared head contour, masks and ink colour.
- The website already exports app artwork through [`sync-mobile-content.cjs`](../scripts/sync-mobile-content.cjs), but its website-only expression function currently creates a second face implementation.

### Proposed implementation after a direction is selected

1. Draw the selected style as clean paths against the exact app head contour and eye anchors. Do not auto-trace the generated bitmap: tracing would retain unintended proportions, shading and redundant paths.
2. Put the approved drawings in one shared source of geometry. Render that source through `react-native-svg` in the app and generate static SVGs for the website. Keep simple paths, fills, strokes and clipping that both renderers support.
3. Preserve existing wardrobe IDs and user colour choices. Refine existing pieces under their existing IDs when their meaning stays the same; add new IDs for genuinely new items. Preserve the default `face.brand` identity.
4. Add explicit expression variants. The current model and comments describe a single-face rule, so expression selection needs a deliberate renderer/catalogue extension. A website illustration can request a temporary expression without overwriting a user's saved face. If expression choice becomes persistent, review the app studio and backend validation before relying on new IDs.
5. Keep expression geometry in the shared source rather than maintaining separate website mouth/eye drawings.
6. Preserve existing app housing defaults. If unframed website portraits are selected, provide a controlled export mode and a bounded shoulder crop rather than removing masks everywhere.
7. Check combinations at 32, 48, 96 and 256px: glasses must not collide with lids, hat brims must not hide the expression, and collar fronts must not cover mouths. Check dark/light skin colours, long hair, beards, circular clipping and reduced-motion states.

Small blinks or gaze changes can be added after the still drawings work. The underlying expression must read without animation.

## Status

Concept exploration and architecture review only. No app avatar choices, live website illustrations or stored manifests were changed in this review.

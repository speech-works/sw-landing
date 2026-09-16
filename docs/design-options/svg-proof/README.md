# SVG likeness proof

This proof reconstructs the first portrait in `../02-expressions-and-wardrobe.png`: mint headphones, rightward gaze, a small open smile and a navy polo collar.

- `headset-listening.svg`: hand-authored, editable vector artwork with a transparent background.
- `reference.png`: a 320 × 310 crop of the concept sheet, taken from (64, 48).
- `comparison.png`: matching-scale reference and vector comparison.
- `index.html`: side-by-side preview, 48px/96px samples and an adjustable vector-over-reference overlay.

The artwork is divided into collar, head, hair, headgear and expression groups, with eyebrows, eyes and mouth separately addressable. It contains no embedded raster, script, external reference or font. Simple gradients approximate the subtle shading in the generated reference. This is a visual reconstruction, not a pixel-identical conversion; small curve, colour and shading differences remain.

## Preview

From this repository:

```sh
python3 -m http.server 3012 --bind 127.0.0.1 --directory docs/design-options/svg-proof
```

Open http://127.0.0.1:3012/.

## Verification

- SVG XML parses, with unique IDs and a scalable viewBox.
- No embedded image, foreignObject or script.
- Rendered as SVG in the browser and inspected beside the original crop, including 48px and 96px samples.
- All comparison images loaded successfully; the opacity control updates both the overlay and its value label.

This proof follows the generated portrait's geometry to establish achievable likeness. It is not integrated into the mobile app or website avatar renderer. Fitting the selected artwork to the existing app geometry and reusable wardrobe slots is a separate step after visual review.

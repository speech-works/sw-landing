# Speechworks motion audit

Audited and implemented on 16 September 2026 using the GSAP skill and its React lifecycle guidance.

## Findings and changes

| Before | After | Why |
| --- | --- | --- |
| Content already in the viewport appeared without an entrance; most other sections shared one generic fade. | GSAP timelines sequence the feature stack, surrounding faces, controls and headline. Other sections use shorter, tailored entrances. | Give the opening a clear order without making visitors wait for the copy. |
| Program filters and the global scroll controller both animated card opacity. | The catalog owns its card entrances and the grid's outgoing fade. The global controller excludes catalog cards. | Prevent competing animations, interrupted fades and hidden filter results. |
| Avatar selection used a generic opacity pop with ad hoc animation cleanup. | A separate inner portrait wrapper gets a 320 ms spring settle, with GSAP context cleanup and interruption handling. | Give selection some personality while keeping scroll and parallax transforms separate. |
| The cast picker appeared as one block. | Faces enter first, followed by a compact stagger of choices and the shuffle control. | Make the interactive part easy to notice without a long cascade. |
| The download area appeared as a single block. | The small faces lead, then the title, explanation and store buttons follow. | Draw attention toward the download action. |
| Scroll effects relied on fixed observer behavior, without a coordinated timeline. | ScrollTrigger controls entrance and faster exit sequences. Re-entering sections replays their sequence. | Give both scrolling directions a consistent response. |
| New scroll measurements could become stale after disclosures, filtered results or asset loading. | A debounced resize observer and font/image completion refresh trigger positions. | Prevent layout changes from leaving visible content hidden. |

## Motion rules

- Section entrances: normally 480 ms, `power3.out`, 8–22 px vertical travel.
- Program filter exit: 100 ms. New cards: 380 ms, with a small stagger on wider screens.
- Avatar selection: 320 ms, `back.out(1.5)`, restrained 4-degree tilt and scale from 0.91.
- Scroll translation uses its own CSS property, so existing card rotation and hover transforms remain independent.
- No scroll hijacking, pinning, new background patterns or permanent `will-change` layers.
- Preserve the existing bounded avatar parallax and the carousel's pause, focus and visibility controls.
- Keep the working interruptible FAQ disclosure animation and lightweight CSS hover/press feedback.
- Reduced-motion preferences disable entrance and scroll timelines; avatar/filter actions settle immediately. Keyboard activation and focus reveal content immediately.
- Server-rendered content is visible without JavaScript. Page changes revert only this page's GSAP contexts and remove its observers/listeners.

## Verification

- ESLint and the production build passed; all 22 static pages generated.
- Desktop browser: verified staggered card entrance, offscreen fade, returning content, avatar selection, download sequence and client navigation between home, catalog and program detail.
- Catalog: Connection produced 2 results; rapid Conversations → All programs returned 10, with `aria-busy=false` and grid opacity 1.
- FAQ: repeated open/close/open clicks finished expanded with natural height; keyboard Enter closed immediately without a retained inline height.
- Mobile at 390 × 844: home, avatar picker and FAQ checked; no horizontal overflow or fully hidden elements within the viewport after motion settled.
- Browser error log was empty during the verification session.
- Reduced-motion fallback and context cleanup were reviewed in code; system-level reduced-motion switching was not emulated in this browser session.

## References

Implementation follows [GSAP's React lifecycle guidance](https://gsap.com/resources/React/), [matchMedia cleanup](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/) and [ScrollTrigger documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/).

## Card deck follow-up

The hero carousel now uses a dedicated GSAP shuffle instead of the former WAAPI fade followed by CSS reordering.

| Before | After | Why |
| --- | --- | --- |
| Front card faded to transparent before the stack changed. | Front card fans aside, stays opaque and returns beneath the stack. | Maintain visual continuity. |
| CSS and WAAPI owned different halves of the transition. | One 600 ms GSAP timeline coordinates all four cards. CSS only supplies resting poses. | Remove the handoff between animation engines. |
| Rapid selection cancelled motion and snapped the stack. | The current handoff finishes, then the latest requested selection runs. | Avoid half-positioned cards and stale intermediate selections. |
| Desktop travel also applied on phones. | Sideways travel reduces from 44% to 16% of card width on compact screens. | Keep the shuffle contained on a small screen. |
| Swipe direction did not control the outgoing motion. | The outgoing card follows the swipe direction. | Keep gestures spatially consistent. |

The incoming and outgoing cards retain their content while moving; only covered cards hide their contents at rest. Keyboard selection is immediate. Reduced motion, resizing and hiding the tab finish the current handoff. Autoplay pauses for focus, hover and offscreen/hidden state. Temporary transform and layer hints are cleared after settling.

Verified pointer selection, rapid Keep → Practise → Programs requests, keyboard Enter, final layer order and cleared inline transforms. Inspected desktop and 390 px mobile transition frames. Production build and lint passed. Physical-device swipe testing remains unverified.

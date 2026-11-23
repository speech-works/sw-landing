# Rules for this repo

## Avatars: full collar, bottom never exposed

Applies everywhere an avatar appears: site pages, components, previews in `artwork/`, social and store art.

1. Show the full collar. Never crop an avatar so its collar, lapels or neckline are cut off.
2. Never show the bottom edge of the body. The body must end exactly on the avatar's own kit blob (`src/lib/avatar-blobs.ts`; `AvatarFigure` does this), or run on past a frame so the frame edge ends it.
3. Default: put the avatar on its kit blob. The kit cuts each body to its blob's curve, so the body ends on the blob with the whole collar showing. A straight card or frame edge cannot do both, because the collar reaches almost to the body's curved bottom.
4. Never put a tag, sticker or bubble over the collar.
5. Check at close zoom on desktop and phone before you show the work.

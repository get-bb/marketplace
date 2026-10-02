Beautiful Chat restyles the chat you already use in BB. It does not replace it
or add a second chat view — it applies the design language of BeautifulUI to
BB's own composer, messages and work rows, in place.

## What it changes

- **Composer.** A raised prompt field with a hairline border that firms up on
  focus, 28px controls and a filled send button. While a run is generating and
  the box is empty it shrinks to one line; typing a follow-up grows it back.
- **Messages.** Yours become soft filled bubbles without a border. Inline code
  becomes hairline chips, code blocks hairline cards.
- **Work rows.** "Worked for…", "Explored…", commands and reasoning become
  compact pills sized to their label, with monospace durations. Rows in an
  expanded group are indented under their header and joined by tree lines.
- **Tool calls.** A filled chip, a hairline outline, or a plain row.
- **Loading.** Pending labels shimmer and the pending row's icon becomes a
  pixel loader, in one of five variants including a ring of tumbling coins. A
  caret trails the reply while it streams.
- **Approvals.** Permission requests and agent questions become raised cards
  with pill decision buttons.
- **Smaller things.** The banners above the composer merge into one card. The
  first unread row prints NEW after its label instead of a full-width rule. In
  a row of three or more icon buttons, one shared tooltip glides between them.

## Choosing what you get

Every item above is a separate setting: thirteen on/off switches plus two
multi-choice settings for the loading animation and the tool call style. Turn
off what you do not want. Disabling or removing the plugin reverts everything.

## Colors and motion

It ships no palette. Every color comes from your active BB theme, so it follows
your theme instead of imposing one, in light and dark alike. Under
`prefers-reduced-motion: reduce` the loaders stop animating, the shimmer is
off, cards fade in without moving, press feedback does not scale, and the
shared tooltip stops gliding.

## Limitation worth knowing

This plugin styles BB's own chat markup, which is not a public interface. A BB
update can change that markup, and a part of the restyle can then stop applying
until the plugin is updated. Chat keeps working — that part just looks like
stock BB again.

Design reference: BeautifulUI (https://www.beautifului.dev, MIT). No
BeautifulUI code is bundled.

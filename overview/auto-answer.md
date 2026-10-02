## What you get

An agent's question arrives as a widget in place of the composer: one tab per
question, a list of options, and a **Next** / **Submit answer** button. You have
already decided when you click the option — the button press afterwards is
bookkeeping, repeated once per question.

Auto Answer does that press. Pick an option and a countdown starts; when it runs
out the widget's own button is pressed, the next tab opens, and the last tab
submits the whole answer. A three-question set costs three clicks instead of six.

## How it works

The countdown appears directly under the option you picked, and moves with you if
you pick another. It leads with a **Stop** button, so cancelling is never a trip
across the screen — or a trip to the mouse at all: **space** stops it, and so does
`Escape`. Space is claimed only while a countdown is running, and never while the
caret sits in a text field.

Picking again — another option or the same one — restarts the countdown from the
full delay, so changing your mind costs nothing. Stopping is a pause rather than a
switch: the next option you pick arms it again.

The countdown stands down by itself whenever pressing the button would be wrong:
the last option of a multi-select was un-ticked and nothing is selected, "Other…"
opened its free-text box, or you pressed Back, Cancel, a question tab, or the
button yourself. It never picks an option, never types free text, and never
resolves a permission prompt or any other kind of pending interaction.

## Settings

Two, under Settings → Auto Answer, or through `bb plugin config auto-answer`:

- **Auto-apply answers** — on by default; turn the countdown off entirely.
- **Countdown** — 4 seconds by default, anywhere from 1 to 120.

`bb auto-answer status` prints both.

## Requirements

None. No account, no external service, no network access, and nothing to install
beside BB itself.

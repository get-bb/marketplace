## What you get

- A **Nudge** (Play) button in the composer action row: press it with an
  empty draft to keep the agent going. While the draft is empty it replaces
  the send button; typing brings send back.
- A `bb nudge` command that does the same from a terminal or agent shell.
- A bundled skill so agents reach for `bb nudge` when the user says
  "continue", "retry", or "keep going".

## How it works

- Errored thread: retries the failed turn by reference, like
  `bb thread retry` — no new user bubble, no repeated question.
- Idle thread: starts a turn with a hidden continuation (no user bubble).
- Busy thread: refused with an error until the thread settles.

Type "continue", "keep going", "retry", or "re-run" without typing it:
an errored thread retries its failed turn, an idle one starts without a
visible message — either way, no empty message to send.

Nothing leaves the machine and the plugin needs no account or API key.

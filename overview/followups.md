Suggest clickable follow-up prompts above the composer when a thread finishes.

## What you get

- A **Follow-ups** panel above a thread's message box, drafted by a model
  from the thread's last finished answer: a grid of numbered suggestion tiles
  under a header with a count (two columns when there's room, one when it's
  narrow). Fold it down to just the header with the chevron; it remembers
  that.
- See what each run cost: a footer reads "Generated in 4.2s · 37,275 tokens"
  for the suggestions, with a second line for the draft once you've picked
  one. Open Details for a table of the token split (new input, cached,
  output, and reasoning when there is any) and the model that did the work.
- Each suggestion says why it was suggested: a short reason under the label
  ("The answer says the retry path is untested", "You offered to do this"),
  which also goes into the draft so it picks the right specifics.
- Keyboard: the arrow keys move between tiles, 1–9 draft that tile, Esc
  returns to the composer.
- Clicking a follow-up expands it into a full, ready-to-send draft in the
  composer. Nothing ever sends on your behalf, and your own words are safe:
  the draft goes into an empty composer, or is added below what you've
  already typed. Slow draft? Cancel it from the banner.
- If a full draft can't be written, you get the short follow-up and a note
  saying so, rather than a silent substitution.
- Switch follow-ups on or off for any one thread with the button in its header
  (a slash over the icon means off). The thread's own choice beats the
  "Suggest follow-ups automatically" setting, which is just the default.
- Follow-ups wait until a thread is really done: while its child threads are
  still working, the thread counts as running and shows none.
- Sending any message clears the banner: follow-ups belong to the answer
  they were drafted from. The ✕ dismisses it early, even while it's still
  looking.
- A `bb followups` command: `show` and `clear` a thread's follow-ups, switch
  one thread `on` or `off`, check the `model`, and `cleanup` leftover workers.

## How it works

When a visible thread goes idle, the server spawns a hidden worker thread on
the follow-ups model, asks it for up to five short follow-up labels, and
stores them in the thread's plugin metadata. The banner reads them over
RPC and refreshes on a realtime signal. Clicking a label spawns another
worker that writes the full first-person message with the conversation as
context. Queued or dispatched messages and the thread going active again
wipe the stored follow-ups, so the banner disappears.

Choose the model under Settings → Follow-ups model: BB's native
provider/model picker, saved per installation. With no saved choice,
follow-ups use BB's primary default model.

## Cost and safety

Nothing is ever sent for you, and a draft never overwrites what you typed.
Each suggestion and each draft is a short run on your chosen model, so it
spends tokens; at most four suggestion workers run at once, and the footer
shows what each run cost. Workers are hidden threads, deleted when they finish.
They run in the least privileged permission mode their provider offers and are
told to use no tools, but they are agent sessions in the thread's environment,
not a sandbox.

## For agents

Agents do not write follow-ups: the banner is the user's surface. The bundled
skill tells an agent to leave it alone and only inspect it with
`bb followups show` when asked.

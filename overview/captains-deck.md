# Captain's Deck

A kanban board for work a first mate runs in bb. Five fixed columns show what
is charted, what is underway, the captain's calls waiting on you, merges
awaiting review, and landings. The board is read-only except for a Captain's
Call: pick an option, add a note, and the answer is delivered to the first
mate's thread.

## What you get

- **Charted Next, Underway, Captain's Call, Awaiting Merge, Landed** — one card
  per unit of work, with the worker bot, live thread state (working, queued,
  needs input, failed), the provider, the pull request link, and age.
- **Answer in place.** The first mate attaches the options to a call and marks
  the one it recommends. Your answer is recorded on the task and sent to the
  first mate's thread as an agent-only note, so the lane resumes.
- **Earlier calls stay on the task.** The decision dialog lists the calls the
  first mate replaced, with the answer each got.
- **Crew tabs.** Filter the whole board to one worker bot, or watch all of them.
- **Thread calls.** When a deck-linked thread hits a native bb prompt, it shows
  under Waiting in threads in the same column; open the thread and answer it.
- **Bearings.** `bb deck bearings` prints the same five sections as a digest
  for a standup, a sweep, or a scheduled automation.

## How it works

The first mate drives the board from a shell:

```
bb deck chart --title "Dark mode" --brief "Settings toggle + tokens" --bot Designer
bb deck start a1b2c3d4 --thread thr_abc123
bb deck note  a1b2c3d4 --text "First pass done, contrast check running"
bb deck ask   a1b2c3d4 --question "Ship behind a flag?" \
  --option "Behind a flag" --option "Straight to users" --recommend 1
bb deck merge a1b2c3d4 --pr https://github.com/acme/app/pull/42
bb deck land  a1b2c3d4
```

Every command accepts `--json`. The bundled `captains-deck` skill teaches any
agent the lifecycle, so the first mate keeps the board current without extra
instructions.

Set the **First mate thread** setting to the thread that should receive
answered decisions. Leave it empty to record answers on the board only.

## Requirements

bb 0.44 or newer. The plugin stores its tasks in bb; no external service or
account is needed.

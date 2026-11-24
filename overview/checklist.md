The agent plans with a checklist and ticks items off as it works, so you can
see where a long task stands without reading the whole thread.

## What you get

- A `todo_write` tool for every agent provider (Claude Code, Codex, Pi). The
  agent sends the whole list each time it plans or finishes a step, and gets
  the list back so it stays in view.
- Reminders that keep the agent on its list: a resumed session starts with the
  open list, and after its context is compacted mid-turn the agent gets a
  hidden note with the list.
- A **Checklist** tab on each thread showing pending, in-progress, and done
  items, updating live.
- The list pinned above the input box: completed items fold into one count,
  then the current step and the next three; the tab has the rest. It
  collapses to one line showing the current step, and each thread remembers
  whether you collapsed it. A finished list shows as "All N done" and stays
  until your next prompt.
- A `3/5` progress badge on the thread's row in the thread list, with the
  current step on hover. Turn on Organize → Rows → Metadata to see it.

## How it works

Each thread's list lives in this plugin's own storage on the BB server, so it
works for threads on any machine. Nothing leaves the server, and the plugin
needs no account or API key.

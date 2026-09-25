You have six threads running. One is committing, one is fighting a type error,
and one is waiting for an approval you did not know it needed. Agent TV puts all
of them on one wall at the foot of the sidebar, so you can see which one needs
you without opening any of them.

## What a tile shows

- **The call in flight**, in BB's own words and icon: `Running command: npm test`,
  then `Ran command` the moment it returns.
- **Files touched in the last 60 seconds**, newest first.
- **A typing indicator** while the model is streaming output.
- **A 60-second activity sparkline** on an absolute scale, so two tiles compare
  at a glance. A flat line is a stalled agent.
- **Context runway**: a rail showing how much of its context window the thread
  has spent, flagged at 80%. Providers that do not report usage show no rail.
- **Needs you**: a thread blocked on a question or an approval is marked and
  sorted to the top.
- **Who and where**: the provider's mark, the model and reasoning effort, the
  project, and parent/child badges for spawned work, including subagents the
  sidebar hides.

## Where it lives

A row in the sidebar footer. Hover it and the wall peeks open; click it and the
wall stays. Click a tile to open that thread. The pop-out button turns the wall
into a monitor you can drag anywhere in BB, and it remembers where you left it.
Quiet tiles can be dismissed with a check mark, and they come back if their
thread starts working again.

The layout holds still while you watch: each thread keeps its slot, and new
threads join at the end.

## For terminals and agents

`bb agent-tv status` prints the same feed as text, with a sparkline per thread,
and `--json` returns the exact frame the wall renders. Threads waiting on a
person are listed first. Run inside a thread, it shows only that thread's
project; `--all-projects` widens it. A bundled skill teaches agents to read the
feed, so an orchestrating agent can see which of its siblings is stuck.

## How it works

Agent TV reads BB's own thread events rather than scraping provider output, so
Codex, Claude Code, Pi and Cursor threads all read the same way. Titles, unread
state and pending questions come from the sidebar's own thread view, so the wall
always agrees with the sidebar.

It reads the event log only while a wall is open, asks only for the event kinds
it uses, and bounds every read and every frame (24 threads, 6 files, 12
buckets). Close the wall and it stops reading; the command reads only when you
run it.

## Privacy

Credential-shaped text in a command line, such as an inline `PGPASSWORD=`, an
`Authorization:` header or a `--token` value, is masked before it reaches a
tile, the terminal or the realtime channel. Threads BB marks as hidden never get
a row of their own.

## Requirements

bb 0.43 or later, with plugin SDK 0.5.9 or later. No account, no external
service and no network access: everything stays on your BB server. Settings
cover how many threads the feed carries, whether finished threads stay up, and
whether hovering opens the wall.

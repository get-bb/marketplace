## What you get

- A board docked at the bottom of bb with Queue, WIP, Blocked and Done columns. Every non-archived top-level thread is a card, and child threads roll up into their parent card.
- Columns follow live thread state, so you never drag a card. Queue means not started. WIP means the thread or one of its children is running, background work included. Blocked means idle and waiting on you: a pending interaction, an error, a failed result, or a last reply that asks a question. Done means idle with a last reply that reports completion; unread Done cards come first.
- Each card shows a `[category] intent` title, a two-line summary of the latest exchange, the update time and status, what the session has spent when the harness reports cost, a ring with the share of the context window in use (amber at 70%, red at 90%), and the icon of the harness running the thread. Hover the cost, ring or icon for model, thinking level, tokens, access mode and service tier.
- Clicking a card opens its thread at the latest message. The Queue + button starts a new task thread. The card of the thread open in bb is highlighted and kept in view.

## For agents

Agents get four tools to track their own work: move their card, spawn a child task, spawn one independent thread per theory for an investigation, and mark a result as success (Done) or failure (Blocked). A bundled skill tells agents when to use them. The same actions are available from the terminal as `bb shop-kanban`.

## Model-written labels

Titles, summaries, and the Blocked-or-Done call for finished replies come from a small model. The plugin runs a pi-compatible CLI on the thread's host, by default `pi` with `anthropic/claude-haiku-4-5`, so labels are billed to that CLI's account. Card titles are written back to the bb thread title unless you rename the thread yourself. Set `labelerCommand` to empty to turn labels off; cards then use heuristic titles and an excerpt of the latest message.

## Requirements

- bb 0.47 or later.
- For model-written labels: a pi-compatible CLI on each host that runs threads.

If you replace bb's omp agent with a custom ACP agent entry, bb draws it with a generic toolbox glyph. The plugin draws bb's omp mark for it instead, in bb's sidebar and pickers as well as on cards.

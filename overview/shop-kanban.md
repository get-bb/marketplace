## What you get

- A board docked at the bottom of bb with Queue, WIP, Blocked and Done columns. Every non-archived top-level thread is on it, and child threads roll up into their parent thread.
- Columns follow live thread state, so you never drag a thread. Queue means not started. WIP means the thread or one of its children is running, background work included. Blocked means idle and waiting on you: a pending interaction, an error, a failed result, or a last reply that asks a question. Done means idle with a last reply that reports completion; unread Done threads come first.
- Each thread shows a `[category] intent` title, a summary of the latest exchange (two lines, three on hover), the update time and status, what the thread has spent together with its child threads and subagents (archived ones included; `~` when part of it is estimated), a ring with the share of the context window in use (amber at 70%, red at 90%), and the icon of the harness running the thread. Rest the pointer on a card for a tooltip beside it with the harness, model, thinking level, tokens, cost, access mode and service tier.
- Clicking a thread opens it at the latest message. The Queue + button starts a new thread from a form at the top of Queue that keeps your draft across reloads and crashes. The thread open in bb is highlighted on the board and kept in view.
- The search bar in the board's title bar finds any thread by what was said in it, archived threads included. Picking a result opens the thread in bb and leaves the board as it is.
- A Reviews section near the top of Queue lists open pull requests waiting on your review on Delta and GitHub. A Me | Team toggle switches between requests of you by name and of your teams, starting on Me; the `reviewSearchesMe` and `reviewSearchesTeam` settings pick the searches. Each is a two-line card: a risk chip and title, which opens a drafted new thread asking what changed, why and how risky it is; then age, author, and links to open it on Delta or GitHub, approve (click twice), or request changes with a reason. Archive hides one for good. Ones you already reviewed come back marked `re-review` only when new commits land.

## For agents

Agents get four tools to track their own work: move their thread, spawn a child thread, spawn one independent thread per theory for an investigation, and mark a result as success (Done) or failure (Blocked). A bundled skill tells agents when to use them. The same actions are available from the terminal as `bb shop-kanban`.

## Model-written labels

Titles, summaries, and the Blocked-or-Done call for finished replies come from a small model. The plugin runs a pi-compatible CLI on the thread's host, by default `pi` with `anthropic/claude-haiku-4-5`, so labels are billed to that CLI's account. Board titles are written back to the bb thread title unless you rename the thread yourself. Set `labelerCommand` to empty to turn labels off; threads then use heuristic titles and an excerpt of the latest message.

## Requirements

- bb 0.47 or later.
- For model-written labels: a pi-compatible CLI on each host that runs threads.
- For thread search: [qmd](https://github.com/tobi/qmd) (`npm install -g @tobilu/qmd`) on a connected persistent host.
- For the review queue: `dt` (Delta) and/or `gh` (GitHub), signed in, on that same host.

Each is optional. The board works without any of them: without a labeler, threads keep heuristic titles; search shows how to install qmd when you use it; and review searches that can't run are skipped quietly, with the reason on hover over the Reviews header.

If you replace bb's omp agent with a custom ACP agent entry, bb draws it with a generic toolbox glyph. The plugin draws bb's omp mark for it instead, in omp's pink (`#f84fcc`), in bb's sidebar and pickers as well as on the board.

## What you get

- A board docked at the bottom of bb: Queue, Working, and Done above Parked. Every non-archived top-level thread is on it; child threads roll up into their parent.
- Columns follow live thread state. Queue means not started. Working means the thread or one of its children has a turn in progress, background work included; blocked threads (idle and waiting on you: a pending interaction, an error, or a question in the last reply) sit at the top of Working as red cards. Done means idle with a last reply that reports completion; unread ones come first, and a read one can be marked unread. Parked, in grey, holds idle threads you drag onto it or park from the card's pause button; they leave when the thread works again.
- A picker at the top of Working caps how many threads work at once (Max 0 to Max 5, or No limit) and reads like `3/5 working · 2 in queue`. Past it, a new thread or a follow-up to an idle one waits in Queue as "Waiting to start" until a working thread finishes, or you press its play button or drag it onto Working. Blocked threads don't count; work inside a working thread goes through.
- Each thread shows a `[category] intent` title, a summary of the latest exchange (two lines, three on hover), the update time, status and what the thread has spent with its child threads and subagents (`~` when partly estimated). Down its left edge: the status mark, the harness icon, and a pie with the share of the context window in use (amber at 70%, red at 90%). Hover a card for a tooltip with the harness, model, thinking level, tokens, cost and access mode.
- Clicking a thread opens it at the latest message. The New thread form keeps your draft across reloads and crashes.
- The title-bar search finds any thread by what was said in it, archived threads included. Beside it, chips show CPU, memory, disk and battery, each with a popover of the heaviest apps, and, for Shopify accounts only, today's Shopify AI proxy spend.
- Queue's In tab lists pull requests waiting on your review on Delta and GitHub, with a Me | Team toggle (`reviewSearchesMe`, `reviewSearchesTeam`), then issues assigned to you. Each review has a risk chip, a title that drafts a thread asking what changed and how risky it is, and links to open, approve (click twice), or request changes. Archive hides one for good; reviewed ones return as `re-review` when new commits land.
- The Out tab lists your open pull requests and ones merged in the last 30 days, until you mark them Measured and Demoed.

## For agents

Agents report nothing; the board reads live thread state. When you ask, an agent can spawn a child thread or one independent thread per theory for an investigation. From the terminal, `bb shop-kanban` lists the board, starts a thread, parks, unparks and archives.

## Model-written labels

Titles, summaries, and the Blocked-or-Done call come from a small model. The plugin runs a pi-compatible CLI on the thread's host, by default `pi` with `anthropic/claude-haiku-4-5`, so labels are billed to that CLI's account. Board titles are written back to the bb thread title unless you rename the thread yourself. Set `labelerCommand` to empty to turn labels off; threads then use heuristic titles and an excerpt of the latest message.

## Requirements

- bb 0.47 or later.
- For model-written labels: a pi-compatible CLI on each host that runs threads.
- For thread search: [qmd](https://github.com/tobi/qmd) (`npm install -g @tobilu/qmd`) on a connected persistent host.
- For the review queue and work lists: `dt` (Delta) and/or `gh` (GitHub), signed in, on that same host.

Each is optional: without a labeler threads keep heuristic titles, search shows how to install qmd, and review searches that can't run are skipped, with the reason on hover.

If you replace bb's omp agent with a custom ACP agent entry, the plugin draws bb's omp mark for it in omp's pink (`#f84fcc`) instead of a generic toolbox glyph, in bb's sidebar and pickers as well as on the board.

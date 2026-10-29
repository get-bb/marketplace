## What you get

- A board docked at the bottom of bb with Queue, WIP, Done and Parked columns. Every non-archived top-level thread is on it; child threads roll up into their parent.
- Columns follow live thread state. Queue means not started. WIP means the thread or one of its children is running, background work included; blocked threads (idle and waiting on you: a pending interaction, an error, a failed result, or a question in the last reply) sit at the top of WIP as red cards. Done means idle with a last reply that reports completion; unread ones come first. Parked, in grey, holds idle threads you drag onto it or park from the card's pause button; they leave Parked when the thread runs again.
- A picker at the top of WIP caps how many threads run at once. With WIP full, a new thread or a follow-up to an idle one waits in Queue, marked "Waiting for a WIP slot", and starts when a WIP thread finishes. Blocked threads don't count; work inside a running thread goes through.
- Each thread shows a `[category] intent` title, a summary of the latest exchange (two lines, three on hover), the update time and status, what the thread has spent with its child threads and subagents (`~` when partly estimated), a ring with the share of the context window in use (amber at 70%, red at 90%), and the harness icon. Rest the pointer on a card for a tooltip with the harness, model, thinking level, tokens, cost, access mode and service tier.
- Clicking a thread opens it at the latest message. The Queue + button starts a new thread from a form that keeps your draft across reloads and crashes. The thread open in bb is highlighted on the board and kept in view.
- The title-bar search finds any thread by what was said in it, archived threads included, and opens the result in bb.
- A Reviews section near the top of Queue lists open pull requests waiting on your review on Delta and GitHub, with a Me | Team toggle (the `reviewSearchesMe` and `reviewSearchesTeam` settings pick the searches). Each card has a risk chip and a title that opens a drafted thread asking what changed, why and how risky it is, then age, author, and links to open it, approve (click twice), or request changes with a reason. Archive hides one for good; reviewed ones come back marked `re-review` only when new commits land.

## For agents

Agents get four tools to track their own work: move their thread, spawn a child thread, spawn one independent thread per theory for an investigation, and mark a result as success (Done) or failure (a red Blocked card in WIP). A bundled skill tells agents when to use them. The same actions, plus park and unpark, are available from the terminal as `bb shop-kanban`.

## Model-written labels

Titles, summaries, and the Blocked-or-Done call for finished replies come from a small model. The plugin runs a pi-compatible CLI on the thread's host, by default `pi` with `anthropic/claude-haiku-4-5`, so labels are billed to that CLI's account. The model sees the other cards' titles, so related threads share a tag. Board titles are written back to the bb thread title unless you rename the thread yourself. Set `labelerCommand` to empty to turn labels off; threads then use heuristic titles and an excerpt of the latest message.

## Requirements

- bb 0.47 or later.
- For model-written labels: a pi-compatible CLI on each host that runs threads.
- For thread search: [qmd](https://github.com/tobi/qmd) (`npm install -g @tobilu/qmd`) on a connected persistent host.
- For the review queue: `dt` (Delta) and/or `gh` (GitHub), signed in, on that same host.

Each is optional: without a labeler threads keep heuristic titles, search shows how to install qmd, and review searches that can't run are skipped, with the reason on hover over the Reviews header.

If you replace bb's omp agent with a custom ACP agent entry, the plugin draws bb's omp mark for it in omp's pink (`#f84fcc`) instead of a generic toolbox glyph, in bb's sidebar and pickers as well as on the board.

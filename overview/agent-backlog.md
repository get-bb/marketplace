## What you get

- A five-lane board in BB's sidebar: **Queue**, **In progress**, **Needs you**, **Waiting on others**, and **Done** (closed in the last 7 days), plus a sidebar badge counting tasks waiting for your reply or check.
- Three side-panel tabs beside the board: **Task** for done-when criteria, agent actions, details, inline editing, and activity; **Agent** for the live embedded thread chat; and **Rules** for project setup, model routing, and autopilot.
- Local SQLite storage out of the box so you can create, edit, comment on, and delete tasks immediately with no external service.

## How agents work on tasks

Hand a task to an agent from its card or the **Task** tab. The plugin spawns a thread in your chosen project under the `Backlog` section and registers six turn commands (available as native tools and via `bb agent-backlog`):

- `backlog_note` posts a short status line on the card while the agent keeps working.
- `backlog_ask` moves the card to **Needs you** with a question, what is already done, up to four quick-reply buttons, and an optional ISO-8601 deadline with a default fallback answer.
- `backlog_ask_agent` spawns a helper thread for a second opinion or review and relays its reply back automatically.
- `backlog_wait` moves the card to **Waiting on others** until another task closes, a timestamp arrives, or a scheduled event check fires, then wakes the thread automatically.
- `backlog_hand_off` transfers the task with a summary to another agent thread.
- `backlog_done` closes the task only when the agent attaches a summary and at least one piece of evidence (file path, URL, or record ID). With `check=true`, the result stops in **Needs you** until you click **Accept and close** or **Send back**.

If a thread goes idle without calling a tool or hits an error, the card moves to **Needs you** so nothing stalls silently.

## Model rules and autopilot

In the **Rules** tab, order rules by priority, tags, or keywords and bind each rule to any provider, model, and reasoning level connected in BB. The first matching rule sets the suggested model on each card, and you can override it before starting a run.

Autopilot is off by default. When enabled, a five-minute schedule starts your next queued task that has **Done when** filled in, prioritized by priority and due date, while respecting your limits on concurrent agents (1–6), daily starts (1–50), and optional tag filters.

## Optional HTTP Backlog API

In plugin settings, switch **Where tasks live** from local SQLite to an external HTTP Backlog API. Provide the base URL, optional path prefix, and bearer key (stored as a BB secret, or read from a dotenv file you specify), plus an optional `{id}` task link template for the **Open in source** button.

## Requirements

- BB 0.50 or later.
- At least one configured agent provider in BB. Helper and hand-off shortcuts (`opus`, `sonnet`, `haiku`, `sol`) expect Claude Code or Codex providers; board model rules work with any connected provider.
- No external account or API is needed in the default local mode.

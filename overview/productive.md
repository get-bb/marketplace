# Productive

Maps each BB project to one Productive.io project and puts that board in a BB
panel, so triage and hand-off happen where the work happens.

## The board

Productive's hierarchy is **Project → Folder → Task list → Task**. A folder is
what Productive used to call a board, and its task lists are that board's
columns. The panel mirrors that structure rather than flattening it:

- Narrow a project to one folder, so the board shows only that folder's work.
- Group kanban lanes by **workflow status** or by **task list**. The second
  reproduces the column layout you already use in Productive, in Productive's
  own column order.
- Drag a card between lanes to write the change back: status lanes change the
  workflow status, task-list lanes move the task between lists.
- Filter by folder, task list, status, assignee, state, and labels. Save a set
  of filters as a named preset, and the board reopens with the filters, layout,
  and ticket you left it on.

## Working a ticket

Open a ticket to read its description and comments, change its status or
assignee, and post a reply. Attachments are listed with their type and size.

**Start agent** opens a new BB thread in the mapped project, with the ticket's
fields as context. A second action gives that thread its own git worktree, so
two tickets worked in parallel never collide in one checkout. Nothing is
written back to Productive when a thread starts.

## For agents

A `bb productive` command exposes the same board to agents: `status`, `list`,
`show`, `start`, `transitions`, `move`, `move-list`, `comment`, `create`,
`refresh`, and `config`, each with `--json`. A bundled skill teaches agents to
use it, and `@`/`#` in the composer mentions a ticket by key.

Ticket titles, descriptions, and comments are external text. Everything this
plugin hands to an agent is wrapped in a quoted, delimited block with an
explicit instruction not to follow anything inside it.

## Requirements

- A Productive.io account and an API token, created under **Settings → API
  integrations**.
- Your Productive organization id. A person id is optional and only powers the
  "assigned to me" filter, because Productive has no `/me` endpoint.

The token is stored in a `0600` file in the plugin's own data directory, never
in plugin settings.

Attachment files are served by Productive behind a browser session rather than
the API token, so the board lists attachments and opens them in your browser
instead of inlining them.

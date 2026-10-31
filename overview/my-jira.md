## What you get

- **Open** and **Done** tabs: everything assigned to you, 50 per page with
  Previous/Next and a total count.
- **Filters** beside the tabs: status chips (To Do, In Progress, In Review…, the
  busiest three inline, the rest in a menu) and a **Type** menu (Task, Bug,
  Story…). Pick several; statuses and types combine.
- An inbox-style list: one row per ticket with its key, title, epic, status,
  priority and age in aligned columns, sections stacked in workflow order.
- **Search** by key, words or epic. Typing a key that isn't in the list offers
  to open it anyway.
- **Group by** (a menu)
  - **Status**, in workflow order.
  - **Hierarchy**, by initiative (epics nested inside) or by epic, like a Jira
    board's swimlanes, worked out by walking each ticket's parent chain
    (subtask → task → epic → initiative and above).
  - **Board**: the Jira boards that list each ticket. A ticket no board lists
    directly inherits its nearest parent's board, marked "via …".
  Every group collapses; Collapse all / Expand all.
- **Side by side**: on a wide pane a ticket opens beside the list, each with
  its own scroll, with Previous / Next through the list and Up to its parent.
  On a narrow pane it gets its own page, and Back returns to the same spot.
- The ticket: its lineage as links, status, priority, people, dates, labels,
  description, comments, and its children (an initiative's epics, an epic's
  issues, a task's subtasks).
- Click a status pill to move the ticket through your workflow.
- **Keyboard** (when the panel has focus): J/K or arrows to move, Enter to
  open, [ and ] for previous/next, U for the parent, S to change status,
  / to search, Esc to close, ? for the list.
- Calm colour that means something: issue types in Jira's colours, status as
  a ring glyph, every priority coloured. Light and dark themes.
- **Create ticket** opens your Jira boards in the browser; every ticket and
  board links to Jira.
- **Any Jira Cloud site**: if your account grants several, the site name at
  the top becomes a menu to switch between them.

## How it works

Click **Connect Jira** and approve access in your browser; there is nothing to
configure. To add another site later, Disconnect, then Connect again and grant
both. The plugin signs in through Atlassian's Rovo MCP server
(mcp.atlassian.com, v2), registering itself automatically. The refresh token is
stored in a secret plugin setting on the BB server; the access token is kept
in memory only. Requests go from the BB server to mcp.atlassian.com, and
nothing else leaves your machine.

## Requirements

- Jira Cloud, with the Atlassian Rovo MCP server allowed for your
  organization (it is if Claude or other AI tools can already reach your Jira).

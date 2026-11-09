## What you get

Cursor Sidebar fills BB's thread-list slot with a port of Cursor's sidebar. Chats nest under the chat that spawned them, pinned chats gather in one block at the top, and a parent with working children shows their count as a small accent pill where its age would be.

## Grouping

Pick one grouping at a time.

- **Projects** nests each chat under its project.
- **Updated** groups chats by last activity: Today, Yesterday, Last 7 days, Last 30 days, Older.
- **Status** groups by the strongest status: Needs your input, Failed, Unread, Working, Idle.
- **Environment** groups by the machine the chat ran on, including chats with none.
- **None** draws one flat list. Pinned chats still come first and child chats still nest.

The project switcher above the list narrows every grouping to one project, and opens BB's New project dialog.

## Workers under a project lead

With the Projects plugin installed, clicking a worker under a project lead opens it as a tab of the lead, so the lead's side panel stays in view. Ctrl or Cmd-click still opens a split. Other chats open as usual.

## Navigation

The plugin adds two sidebar navigation layouts, **Cursor** and **Compact**. BB uses the first layout a plugin adds unless you have picked one, so the sidebar switches to Cursor after install, and a note above the list says so until you dismiss it. Pick **Rail** or **Top list** under Settings → Appearance → Navigation to go back to BB's own layout.

## View menu

- Grouping, chat order, project order and group order.
- How many chats each group previews: 5, 10, 20, 50 or All, with **Show more** for the next page. Working, selected and pinned chats always show.
- What each row shows: updated time, environment, branch, machine, the pull request mark, provider icons and project icons.
- Filters by status, age, environment and pull request state.
- Expand All, Collapse All and Mark All as Read.

## Rows

A row can show its project icon, a status glyph and a metadata line. Hover a row for its pin and archive buttons. A chat running on a cloud machine shows a cloud mark beside its provider mark.

## Project icons

Open the picker from a project heading, the switcher or a chat's right-click menu. Search the icon grid, pick one of ten colours, or upload or paste a PNG. The icons also replace BB's folder next to the prompt box. Agents can set an icon from a shell with `bb cursor-sidebar icon`.

## Mobile

Tap a row to open it and tap a project name to fold it. Swipe left to pin and right to archive. Hold a row until it lifts to drag it, or let go without moving to open its actions menu.

## Requirements

BB 0.49 or newer, with plugin SDK 0.6.132 or newer. No account or external service. View settings live in the plugin's own database on the BB server; uninstalling the plugin removes them and leaves your threads alone.

---

Not affiliated with, endorsed by or sponsored by Anysphere, Inc. Cursor is a trademark of Anysphere, Inc.

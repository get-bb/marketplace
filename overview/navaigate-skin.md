## What you get

**A sidebar that reads like a run sheet.** A NOW card at the top shows what is working right now, with a small lattice that orbits while a chat cooks, and how many chats need you. Every chat carries the name of the harness it runs on (Claude, Codex, Cursor and any other provider), and one click filters to a single harness. Beside those filters sit your own tags: create one with **+ Tag**, pick a colour, right-click to rename or delete.

**Come back later.** Flag any chat as *revisit*, *done, check it* or *has a mistake*. Flagged chats move to their own section with an animated status mark, so they cannot be missed.

**Folders and sections you arrange.** With the Projects & Sections plugin installed, each project shows its real folders on disk. Make new ones, add existing folders from the drive, drag chats into folders and folders into folders. Click a section heading to fold it, drag a heading to reorder; the order is kept on your bb server, so every window shows the same layout.

**Do things in bulk.** Command-click or shift-click chats, or press **Select** for checkboxes, then flag, tag, pin, archive or delete them in one go. Every chat, folder, project heading and tag has a right-click menu.

**A to-do list where the work is.** Tell an agent "we've got this, this and this to do" and its `workspace_todo` tool records one item per thing, linked to that chat. Open the to-do panel on the right with the header button or Cmd-Shift-D and switch between this chat, its folder and everything. Paste a list to add several items at once; tick an item off from its mark.

**A Board that moves on its own.** Four columns: To do, Doing, Check, Done. When a linked chat starts working, its item moves to Doing; when every linked chat has finished, it moves to Check for you to look at. Nothing is ever moved to Done for you, and you can drag any card to override.

**A usage dock under the chat box.** A comet-dial gauge for context used, the point where auto-compaction starts, and the plan windows of the account the chat actually runs on.

**Charts in replies.** Agents can write `::nav-chart{kind="bars" data="Claude:31,Codex:14"}` and the reply shows a real chart. Kinds: bars, stats, split and steps. A bundled skill tells agents how to use it.

**A warm light and dark theme** with a toggle in the sidebar footer, plus small touches on bb's own controls: a pill-style reasoning picker and springy button presses.

## Requirements

- bb 0.44 or later.
- Folders need the Projects & Sections plugin. To-do items are stored in bb's built-in Tasks plugin, so `bb tasks` keeps working. Per-account usage needs bb's Account Pooler; without it the dock reads the provider's own login.
- Every part degrades on its own: if one of those plugins is missing, the rest of the plugin keeps working.

## Data and permissions

- To read the to-do list and which pooled account a chat runs on, the plugin opens the Tasks and Account Pooler databases on your machine read-only. All writes go through those plugins' own APIs.
- Tags, flags and section order are stored in bb's plugin storage on your bb server.
- The theme loads IBM Plex and Fraunces from Google Fonts. Nothing else leaves your machine.

Source and issues: https://github.com/skyremote/bb-plugin-navaigate-skin

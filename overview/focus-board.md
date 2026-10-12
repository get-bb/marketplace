Focus Board is a nav panel in the bb sidebar that shows all your threads as a kanban board. It reads bb's live thread view through the plugin SDK's sidebar hooks, so it updates in real time as your threads change.

## What you get

- **Orient at a glance.**
  - The default lanes rank threads by attention — pinned, needs-you, unread, or working — and quiet threads settle out based on how long they have been idle.
  - Reslice anytime by project, provider, machine, activity, or parent; search and filters persist across sessions.
- **Act from the board.**
  - Drag to re-order a column, or drop a card to change its state or nest it as a child. Sweep a lane's stragglers to "Done" or "Archive" so your board stays focused on what's fresh.
- **Depth, one click away.**
  - Open a thread within the board and read, reply, or answer the agent's questions -- works from your browser, desktop, or phone.

More about our features in the [README](https://github.com/cristoslc/bb-plugin-focus-board).

## CLI

One subcommand, `bb focus-board`, manages the plugin's own state: done status, marks, snoozes, links, auto-titling, sweeps, and config. All commands accept `--json`, and the sweep never archives without `--confirm`.

## Requirements

- Node 18 or newer
- bb 0.43 or newer with plugin SDK 0.5.9 or newer
- Optional: the official GitHub plugin, for ticket status dots. Without its local cache, chips render without dots and everything else works.

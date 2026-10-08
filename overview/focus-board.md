Focus Board is a nav panel in the bb sidebar that shows all your threads as a kanban board. It reads bb's live thread view through the plugin SDK's sidebar hooks, so it updates in real time as your threads change.

## What you get

- **Group** threads into columns by Attention (the default: Pinned, Needs you, Unread, Working, then idle threads bucketed by how long they have been quiet), Last activity, Project, Provider, Machine, or Parent thread.
- **Filter and search** by thread state, project, provider, or title. Grouping, filters, and search persist across sessions.
- **Drag to act**: hand-order a column, drop a card on Pinned, Unread, or Done to change its state in the same drag, or drop it onto a card's middle to nest it as that thread's child. Drag a nested child onto any column floor to top-level it again, and back onto a card to re-nest.
- **Spawn children from the board**: "New child thread…" in the card and pane menus opens the composer preset to the parent's project and checkout, and the child lands nested under its parent in the pane.
- **Thread pane**: open a card to read and reply beside the board, full screen on phone. Agent questions are answered right from the pane, and the header's menu opens the thread's workspace in your editor, file explorer, or terminal.
- **Auto-rename**: the pane's title editor can title the thread from its opening prompt with bb's AI services, falling back to the thread's own model when the pinned service can't.
- **Snooze**: "Snooze…" reads a thread now and marks it unread again at the time you pick.
- **Sweep**: every lane carries a sweep with its own destination — stale Done threads archive, long-idle threads move to Done, Pinned unpins, Unread marks read. Shift-click and Cmd/Ctrl-click multi-select before sweeping.
- **Ticket chips** with GitHub status dots when the official GitHub plugin is installed.
- **What's new**: a gift toolbar button lists recent changes after an update.

## How it works

The board writes only pin state, read state, and Done marks through bb's own stores — never thread content. Sweep thresholds are configurable in Settings → Installed plugins or with the CLI, and any thread can be exempted with a per-card "Keep from sweep" override.

## CLI

The plugin registers one `bb` subcommand, `bb focus-board`, for managing its own state: `done list|mark|clear`, `snooze list|set|clear`, `autotitle availability|prompt|probe`, `sweep`, and `config show|set`. All commands accept `--json`, and the sweep never archives without `--confirm`.

## Requirements

- Node 18 or newer
- bb 0.43 or newer with plugin SDK 0.5.9 or newer
- Optional: the official GitHub plugin, for ticket status dots. Without its local cache, chips render without dots and everything else works.
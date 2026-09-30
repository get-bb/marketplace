Focus Board is a nav panel in the bb sidebar that shows all your threads as
a kanban board. It reads bb's live thread view through the plugin SDK's
sidebar hooks, so it updates in real time. Hidden and archived threads are
excluded from the board.

## What you get

- **Group** threads into columns by Attention (the default: Pinned, Needs
  you, Unread, Working, then idle threads bucketed by how long they've been
  quiet), Last activity, Project, Provider, Machine (which bb host the
  thread runs on), or None (one flat column).
- **Filter** by project, provider, and thread state (Working / Needs you /
  Unread / Idle), and **search** across thread titles and ids.
- **Nest** subthreads under their parent card.
- **Sweep** stale Done threads (default: older than 7 days) and long-idle
  threads (default: idle more than 30 days) to Archive. Thresholds are
  configurable and any thread can be exempted with a per-card "Keep from
  sweep" override.
- **Ticket chips** link cards to their GitHub issues and pull requests, with
  live status dots.
- Cards show state, pin, pending-interaction badge, relative update time,
  title, and branch or host. Click a card to open the thread; modified-click
  opens it in a new window. On phone, the toolbar stacks and the thread pane
  goes full screen.
- Group, filter, and search selections persist per client in localStorage.

## Screenshots

The first screenshot (dark theme) shows the board grouped by Attention with
the thread pane open beside it: columns read left to right in attention
order (Pinned, Needs you, Unread, Working, then newest-first idle buckets),
and opening a card slides the conversation in beside the board. The second
shows the same board in light theme.

## CLI

The plugin registers one `bb` subcommand for managing its own state:

```sh
bb focus-board done list [--json]
bb focus-board done mark <thread-id>...
bb focus-board done clear <thread-id>...
bb focus-board sweep [--ids <id>...] [--confirm]
bb focus-board config show
bb focus-board config set <doneArchiveDays|idleArchiveDays> <days>
```

All commands accept `--json`. The sweep never archives without `--confirm`;
without it the command is a dry-run: it prints what would be archived and
exits 1.

## Data and privacy

The board writes only pin state, read state, and Done marks through bb's
own stores — never thread content. For ticket status dots it reads the
official GitHub plugin's local cache read-only. Nothing leaves your
machine.

## Install

Install straight from GitHub:

```sh
bb plugin install https://github.com/cristoslc/bb-plugin-focus-board
```

or pin a version:

```sh
bb plugin install git:https://github.com/cristoslc/bb-plugin-focus-board@v0.3.1
```

To update later, run the same install command again (add `--yes` to skip the
confirmation prompt).

## Development

```sh
npm install
bb plugin build
bb plugin install . --yes
bb plugin reload focus-board
# or: bb plugin dev
npx tsc --noEmit   # typecheck
```
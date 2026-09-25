Thread Board is a nav panel in the bb sidebar that shows all your threads as
a kanban board. It reads bb's live thread view through the plugin SDK's
sidebar hooks, so it updates in real time and makes no server-side writes.
Hidden and archived threads are excluded.

## What you get

- **Group** threads into columns by Attention (attention-priority lanes, then
  recency-decayed idle lanes), Last activity, Project, Provider, Machine
  (which bb host the thread runs on), or None (one flat column).
- **Filter** by project, provider, and thread state (Working / Needs you /
  Unread / Idle).
- **Search** across thread titles and ids.
- Cards show state, pin, pending-interaction badge, relative update time,
  title, and branch or host.
- Click a card to open the thread; modified-click opens it in a new window.
- Group, filter, and search selections persist per client in localStorage.

## Screenshots

The first screenshot shows the board grouped by Attention, with columns
reading left to right in order of attention: Pinned, Needs you, Unread,
Working, then newest-first idle buckets. The second shows the board with a
thread pane open, the conversation sliding in beside the board. The third
shows the Last activity grouping, with every thread bucketed by age and the
most recent leftmost.

## Install

Install straight from GitHub:

```sh
bb plugin install https://github.com/cristoslc/bb-plugin-thread-board
```

or pin a version:

```sh
bb plugin install git:https://github.com/cristoslc/bb-plugin-thread-board@v0.1.4
```

To update later, run the same install command again (add `--yes` to skip the
confirmation prompt).

## Development

```sh
npm install
bb plugin build
bb plugin install . --yes
bb plugin reload thread-board
# or: bb plugin dev
npx tsc --noEmit   # typecheck
```
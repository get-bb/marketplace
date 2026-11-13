## An inbox for a fleet of agent threads

WizBar replaces the thread list with one flat list of cards, newest first, that never re-orders itself. Status lives on each card, not in its position, so the list only moves when you act. Threads sit on Inbox, Snoozed, Settled, Muted and Pinned shelves.

## What each card shows

- The issue or pull request as a link. With no issue field from the host, the issue number comes from a `room/<N>-…` branch name, shown only when it parses.
- A child count, hidden at zero. Hover or focus it to list the children with status, title and age, then open one with a click.
- The branch, on hover only.
- Model and effort are left out until the host exposes them. Nothing is shown in their place.

## Running work at a glance

A slim "N running" line stays below the list. The footer bolt opens a stats panel: running threads split into top-level and children, Cloud and Local, plus threads waiting on you. It says plainly what it cannot count yet: subagents are not counted, some threads may be unseen, and "finished today" is not available until the host gives a finish time.

## Drag to pin

Drag a card into Pinned to pin it, out of Pinned to unpin it, or inside Pinned to reorder it (Alt+Up and Alt+Down from the keyboard). WizBar uses the host's own pins, so its Pinned shelf and the host agree. The Inbox stays newest-first.

## Agent-first

Every WizBar action in the sidebar is also a `room-cli wizbar` command, and each takes `--json`. The row menu's host items (open in split, mark read or unread, archive, delete) are the host's own; the README lists their agent routes.

```text
wizbar settle | unsettle | snooze | unsnooze | mute | unmute | list <id>... [--json]
wizbar pin | unpin <id>... [--json]
wizbar move <id> (--before <id> | --after <id> | --first | --last) [--json]
wizbar children <id> [--json]
wizbar stats [--json]
```

`children` and `stats` use the same computations as the hover list and the stats panel, so for the same threads an agent reads the same answer you see. Exit codes are 0 for success, 1 when any thread or the command fails, and 2 for a usage error.

## Settings

Switches for the list-bottom count, Cloud/Local row icons and the two thread-header chips. The parent's children chip is off by default; a child's chip back to its parent is on by default.

## What is proven

The behaviour above is covered by WizBar's fixture tests in CI. A live check on a real host is a separate step; see the [README](https://github.com/openwizdev/wizplugins/tree/main/wizbar#readme) for current limits.

## Credit

WizBar is derived from [Sawyer Hood's T3 Sidebar](https://github.com/SawyerHood/sawyer-plugins/tree/d3424f24e2cebe91da4e72cb38feb023da808922/plugins/t3sidebar) and keeps its MIT notices. Source: [openwizdev/wizplugins](https://github.com/openwizdev/wizplugins).

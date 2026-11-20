## An inbox for a fleet of agent threads

WizBar replaces the thread list with one flat list of cards, newest first, that never re-orders itself. Status lives on each card, not in its position, so the list only moves when you act. Threads sit on Inbox, Snoozed, Settled, Muted and Pinned shelves. Click the Pinned, Inbox or Specs header to collapse it; WizBar remembers which are collapsed.

## What each card shows

- The issue or pull request as a link. With no issue field from the host, the issue number comes from a `room/<N>-…` branch name, shown only when it parses.
- A child count, hidden at zero. Hover or focus it to list the children with status, title and age, then open one with a click.
- Model and effort in friendly words, such as `Opus 5.5 · High`, from the host's resolved options. A missing model is left out, never guessed.
- The branch, on hover only.

## Specs

Under the list, a rule such as `Specs 24 · 5 tickets need you (3 specs)` (`Specs 24 · 5 for you` when narrow), then one row per running spec from your factory's specs file. Each ticket is a dot: done, done in the last hour, building, in review, needs you, later, held or not started. Only a ticket labelled `ready-for-human` splits: due now (needs you) when it has no open blockers, later when it has open blockers, a hollow ring counted as `· N later`. Open a spec to see its running builders and reviewers with their model and effort. "Specs unavailable" shows, never zero, when neither specs file is ready (missing, malformed or stale).

A small producer in the plugin's `tools/specs-producer/` keeps the specs file fresh from GitHub through your `gh` login. It writes `specs.v1.json` and `specs.v2.json` together or not at all. WizBar uses the one that is ready when only one is; when both are ready, the newer `generatedAt` wins, v2 on a tie. So WizBar and the producer can be upgraded in either order.

## Running work at a glance

The footer shows a quiet status mark and "N running", counting threads, never subagents. Hover or focus it for a card: how many threads are waiting on you, the cloud and local split, a bar split by harness, then the running threads, one line each with its spec and model and effort. Click to pin the card open.

## Drag to pin

Drag a card into Pinned to pin it, out of Pinned to unpin it, or inside Pinned to reorder it (Alt+Up and Alt+Down from the keyboard). WizBar uses the host's own pins, so its Pinned shelf and the host agree. The Inbox stays newest-first.

## Agent-first

Every WizBar action in the sidebar is also a `room-cli wizbar` command, and each takes `--json`. The row menu's host items (open in split, mark read or unread, archive, delete) are the host's own; the README lists their agent routes.

```text
wizbar settle | unsettle | unsnooze | mute | unmute | list <id>... [--json]
wizbar snooze <id>... --until <time> [--json]
wizbar pin | unpin <id>... [--json]
wizbar move <id> (--before <id> | --after <id> | --first | --last) [--json]
wizbar children <id> [--json]
wizbar stats [--json]
wizbar specs [--json]
wizbar spec <n> (--open | --close) [--json]
wizbar section <pinned|inbox|specs> (--collapse | --expand) [--json]
wizbar models <id>... [--raw] [--json]
```

`children` and `stats` use the same computations as the hover list and the footer card, so for the same threads an agent reads the same answer you see. Exit codes are 0 for success, 1 when any thread or the command fails, and 2 for a usage error. The exception is `models`: a failed host read gives that thread a null model and effort with exit 0, so check the returned fields, or the per-thread error status with `--raw`.

## Theme

Every colour is a host theme variable, so WizBar follows your Cloudroom theme. Done uses the host's success colour (a neutral when the theme has none); the warning colour marks what needs you.

## Settings

Switches for the list-bottom count, Cloud/Local row icons and the two thread-header chips. The parent's children chip is off by default; a child's chip back to its parent is on by default.

## What is proven

The behaviour above is covered by WizBar's fixture tests in CI, and 0.5.0 was installed from source and run on a real Cloudroom host. See the [README](https://github.com/openwizdev/WizPlugins/tree/main/wizbar#readme) for current limits.

## Credit

WizBar is derived from [Sawyer Hood's T3 Sidebar](https://github.com/SawyerHood/sawyer-plugins/tree/d3424f24e2cebe91da4e72cb38feb023da808922/plugins/t3sidebar) and keeps its MIT notices. Source: [openwizdev/WizPlugins](https://github.com/openwizdev/WizPlugins).

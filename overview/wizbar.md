## A sidebar for a fleet of agent threads

WizBar replaces the thread list with three sections, Pinned, Specs and Unread, in the order you choose: drag a section by the grip on its header, or press Alt+Up and Alt+Down with the header focused. Click a header to collapse it; WizBar remembers both the order and what is collapsed. Snoozed and Muted shelves sit below, and Settled is one quiet link at the very bottom. Threads are cards that never re-order themselves: Pinned keeps the host's pinned order, Snoozed is soonest wake first, and Unread, Muted and Settled are newest first.

## Unread

Unread lists only threads with something new for you (unread, waiting on your input, or marked by the host with an unread result or a failure), on their own or in a child under their chip. A running agent of a spec appears under that spec instead. Without a search, Unread also leaves out fleet wakes titled `Fleet #<N>: …` and fleet-loop runs titled `launch-fleet <owner>/<repo>`, `launch-fleet wakes <owner>/<repo>` or `launch-fleet #<N> <owner>/<repo>` for a repository you have bound; a fleet loop for a repository you have not bound, or any other loop's run, can appear when it has something new, because the host does not mark loop runs. A thread with nothing new is out of Unread until it has something new. While you search, Unread drops its filter: it shows the matching active, unpinned threads in the current project scope, children, fleet wakes and loop runs included, read or not; matching snoozed, muted and settled threads stay on their own shelves.

## What each card shows

- The issue or pull request as a link. With no issue field from the host, the issue number comes from a `room/<N>-…` branch name, shown only when it parses.
- A child count, hidden at zero. Hover or focus it to list the children with status, title and age, then open one with a click.
- Model and effort in friendly words, such as `Opus 5.5 · High`, from the host's resolved options. A missing model is left out, never guessed.
- The branch, on hover only.

## Specs

A rule such as `Specs 24 · 5 tickets need you (3 specs)` (`Specs 24 · 5 for you` when narrow), then one row per spec from your factory's specs file, specs with a ticket due now first, then the most recently active. A small picker at the right of the rule switches to Recently active, Closest to done or Newest (the specs file's order: each bound repository's specs newest first, one repository after another), and is remembered. Each ticket is a dot: done, done in the last hour, building, in review, needs you, later, held or not started. The dot of a ticket whose agent is working breathes slowly unless the ticket is done or in review (a review dot keeps its steady ring), every breathing dot in step, still under reduced motion; a spec with nothing running and nothing due now shows its name muted. Finished specs, and specs with nothing moving for more than 3 days, fold into a collapsed `Quiet N` group at the bottom.

Only a ticket labelled `ready-for-human` splits: due now (needs you) when it has no open blockers, later when it has open blockers, a hollow ring counted as `· N later`. Open a spec to see its running builders and reviewers with their model and effort. "Specs unavailable" shows, never zero, when neither specs file is ready (missing, malformed or stale).

A small producer in the plugin's `tools/specs-producer/` keeps the specs file fresh from GitHub through your `gh` login, now with each ticket's last activity. It writes `specs.v1.json` and `specs.v2.json` together or not at all. WizBar uses the one that is ready when only one is; when both are ready, the newer `generatedAt` wins, v2 on a tie. So WizBar and the producer can be upgraded in either order.

## Running work at a glance

The footer shows a quiet status mark and "N running", counting threads, never subagents. Hover or focus it for a card: how many threads are waiting on you, the cloud and local split, a bar split by harness, then the running threads, one line each with its spec and model and effort. The card updates in place without flashing: model labels are kept for the session, and a thread that stops running fades where it is. Click to pin the card open.

## Drag to pin

Drag a card into Pinned to pin it, out of Pinned to unpin it, or inside Pinned to reorder it (Alt+Up and Alt+Down from the keyboard). WizBar uses the host's own pins, so its Pinned section and the host agree.

## Agent-first

`room-cli wizbar` commands cover these sidebar actions, each with `--json`: settle, snooze, mute, pin and move threads and undo them; list a thread's shelf or children; read the running card and the specs (in any sort with `--sort`, without saving it); open or close one spec (a spec shows open only while it has running agents); and collapse or expand Pinned, Specs or Unread. The Specs sort picker, the section order, the Quiet group and the Snoozed, Muted and Settled shelves have no command. The row menu's host items (open in split, mark read or unread, archive, delete) are the host's own; the README lists their agent routes.

```text
wizbar settle | unsettle | unsnooze | mute | unmute | list <id>... [--json]
wizbar snooze <id>... --until <time> [--json]
wizbar pin | unpin <id>... [--json]
wizbar move <id> (--before <id> | --after <id> | --first | --last) [--json]
wizbar children <id> [--json]
wizbar stats [--json]
wizbar specs [--sort <needs-you|recent|closest|newest>] [--json]
wizbar spec <n> (--open | --close) [--json]
wizbar section <pinned|specs|unread> (--collapse | --expand) [--json]
wizbar models <id>... [--raw] [--json]
```

`children` and `stats` use the same computations as the hover list and the footer card, so for the same threads an agent reads the same answer you see. Exit codes are 0 for success, 1 when any thread or the command fails, and 2 for a usage error. The exception is `models`: a failed host read gives that thread a null model and effort with exit 0, so check the returned fields, or the per-thread error status with `--raw`.

## Theme

Every colour is a host theme variable, so WizBar follows your Cloudroom theme. Done uses the host's success colour (a neutral when the theme has none); the warning colour marks what needs you.

## Settings

Switches for the list-bottom count, Cloud/Local row icons and the two thread-header chips. The parent's children chip is off by default; a child's chip back to its parent is on by default. Upgrading from 0.5.0 keeps every setting.

## What is proven

The behaviour above is covered by WizBar's fixture tests in CI. 0.5.0 was installed from source and run on a real Cloudroom host; 0.6.0 has not been run on a real host yet. See the [README](https://github.com/openwizdev/WizPlugins/tree/main/wizbar#readme) for current limits.

## Credit

WizBar is derived from [Sawyer Hood's T3 Sidebar](https://github.com/SawyerHood/sawyer-plugins/tree/d3424f24e2cebe91da4e72cb38feb023da808922/plugins/t3sidebar) and keeps its MIT notices. Source: [openwizdev/WizPlugins](https://github.com/openwizdev/WizPlugins).

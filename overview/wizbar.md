## A sidebar for a fleet of agent threads

WizBar replaces the thread list with sections you order by dragging a header (or Alt+Up and Alt+Down): Pinned, Cloud agents, Specs and Yours. Click a header to collapse it; WizBar remembers the order and what is collapsed. Snoozed and Muted sit below, and Settled is one quiet link at the bottom.

## Yours: nothing gets lost

Yours keeps every top-level thread you started, read or not, until you settle, snooze, mute, archive or pin it. Spec agents, fleet wakes and fleet-loop runs for your bound repositories stay out; other loops' runs can appear, because the host does not mark them. A small picker sorts by newest, last activity, status, harness, model or effort, and filters by status and harness; a filter shows `Yours 4 of 19` with one click to clear. Search matches a thread's title and its first prompt, and takes `harness:`, `model:`, `effort:` and `status:` words.

## Cloud agents

Agents that run in their own cloud sandbox, such as Antigravity, are not in the desktop's thread list. WizBar lists them from GitHub: each agent's status note on its ticket, and optionally a fleet's run map. Each row shows the role, repository and ticket, the model in plain words (`Neon · Medium`), its state and last activity, and opens the pull request (or the ticket). The running card counts them apart and says plainly when some cloud agents may be missing.

## Specs

One row per spec from your factory's specs file, what needs you first, with a picker for recently active, closest to done or newest. Each ticket is a dot: done, building, in review, needs you, later, held or not started; a ticket whose agent is working breathes slowly. Finished and idle specs fold into `Quiet N`. Open a spec to see its running builders and reviewers with model and effort.

A small producer in `tools/specs-producer/` keeps the specs and agents files fresh from GitHub through your `gh` login; run it on a timer (the README shows one every 10 minutes). A legacy v1 specs file has no separate later state.

## The running card

The footer shows "N running"; hover or click it for every running thread, grouped by spec, with awake, starting and asleep counts and a count per harness. The list scrolls inside the card, with a fade where more rows are above or below, so 100 threads fit. Rows with no title read as role and ticket, never the prompt's first words.

## Agent-first

`room-cli wizbar` commands settle, snooze, mute, pin and move threads, list threads with search, sort and filters (`wizbar threads`), list cloud agents (`wizbar agents`), read the running card and the specs, open or close a spec and collapse a section, each with `--json`. The [README](https://github.com/openwizdev/WizPlugins/tree/main/wizbar#readme) lists every command.

## Theme and settings

Every colour is a host theme variable. Upgrading from 0.6.0 keeps every setting; a stored Unread section becomes Yours.

## What is proven

The behaviour above is covered by fixture tests and Chromium browser tests in CI. 0.7.0 has not been run on a real host yet.

## Credit

WizBar is derived from [Sawyer Hood's T3 Sidebar](https://github.com/SawyerHood/sawyer-plugins/tree/d3424f24e2cebe91da4e72cb38feb023da808922/plugins/t3sidebar) and keeps its MIT notices. Source: [openwizdev/WizPlugins](https://github.com/openwizdev/WizPlugins).

Threads pile up, and a sidebar sorted by time tells you when you last touched
something and nothing about where it stands. A stage says where the work is:
still being figured out, being written, waiting on a review, or stopped on
someone else.

## What you get

A grouping in the Ribbon sidebar whose stages are yours. Rename them, reorder
them, add and delete them, give each one an icon from BB's own icon set, and
write the rule an agent reads before it moves a thread.

Six stages ship: Inbox, Planning, Building, Review, Blocked, and Done. Blocked
and Done are marked user-only — neither automation nor an agent may file into or
out of one. A stage's id is fixed at creation, because that id is what Ribbon
files threads under, so renaming changes the label only and nothing moves.
Deleting a stage first moves every thread in it to the default.

A `bb stages` command: `list` prints the workflow with its ids, `show` reports a
thread's stage, and `set` moves one. Each acts on the thread's root, which is
what the sidebar files, so running one from a child thread is correct.

Optional automatic moves, off by default apart from filing an unplaced thread
into Inbox. A thread can move when a turn starts, when work stops, or when a
turn needs you. Every automatic move skips sticky stages, and "work stops" only
undoes the move "a turn starts" made, so a thread you filed by hand while it was
running stays filed.

## How it works

Ribbon owns the sidebar — rendering, drag-and-drop, manual order, and the stored
placement of every root thread. This plugin owns the catalog and decides when a
thread moves on its own. Nothing here replaces BB's own sidebar, and it coexists
with Ribbon's Thread stages plugin: both appear in the Groups menu, and each
keeps its own placement.

Agents get the stage table through the thread's instructions and a bundled
skill, carrying two rules. The first move is an obligation — before its first
substantive action an agent files the thread for the work it is about to do,
because an unfiled thread reads as work nobody has picked up. Every move after
that is evidential: at the transition, never to announce progress, and never
into a user-only stage.

The catalog lives in this plugin's own database on the BB server. Nothing leaves
the machine.

## Requirements

[Ribbon sidebar](https://github.com/ariofrio/ribbon) must be installed, and
selected under Settings, Appearance, Sidebar. Without it the stages have nowhere
to draw.

## What you get

Nest replaces bb's scrolling thread list with a project-first sidebar. Groups sit
above projects, a project's checkout and every worktree of it are rows of their
own, and a thread family expands inline under the workspace it runs in. Activity
never reorders what you are looking at, so a thread starting work does not move
the row you were about to click.

## Attention, rolled up

Each row reports the worst thing under it, so a project whose child agent failed
shows a failure without being opened. Six states are distinguished — working,
needs you, unread, failed, inactive, stale — and a working thread says what it is
doing: runtime, workflow, agent, command, plan, or goal.

Two verbs clear the list. **Snooze** a thread until a time you pick, or **settle**
it when the work is done. Both shelves collapse to one counted header.

## Colour

Eighteen semantic colours cover thread state, activity, and pull-request state,
with three ready-made presets and a Custom palette. Every colour is drawn as the
thing it colours: click a swatch to open the picker, or type the hex.

## Projects and workspaces

Nest reads which repository each workspace really belongs to from the machine
holding it, and reports worktrees another tool created that bb has no environment
for. Ownership follows the filesystem by default, so a checkout and its worktrees
stay together even when an environment record disagrees.

Agents can read the sidebar's structure so they do not build a second project for
a worktree that already has one. Every write — filing a project, renaming a
group, setting an alias — sits behind its own switch.

## Requirements

bb 0.36 or newer. No account, no network request, no external service. Nest draws
into bb's experimental thread-list slot, so a bb release can change that surface.

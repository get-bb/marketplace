Activity Sidebar replaces bb's thread list with one that reads like a status board. The left edge of every row is a state column: amber is waiting on you, blue is working, red is broken, green is finished and nobody has looked. You can triage forty threads in one glance down that column.

## What you get

- **Activity, in three bands.** *Needs you* collects every question, failure and interrupted turn. *Working* holds what is running, and *Finished* holds results nobody has read. Each row quotes what it wants: the question itself, the command waiting for approval, or the failure with its cause first.
- **Projects, as a stable tree.** Every project is a collapsible group in alphabetical order, so a row never moves under your pointer. Subagents nest under the thread that spawned them, on a spine coloured by the subtree's health. Large fan-outs fold to a one-line crew that still surfaces any helper that is failing or asking.
- **Workflow workers, shown.** bb hides the agents a workflow spawns. Activity Sidebar nests them under the thread that started the run, with the run and phase named.
- **Pull requests in words.** A thread's branch upgrades to its PR in place: `#412 · checks failed`, `changes requested`, `ready to merge`. The colour says how much the PR wants from you.
- **The Crew panel.** In every thread's side panel, the panel shows what the thread spawned and every worktree it works in. It marks stacked branches, uncommitted changes, drift ahead of the base branch, and open terminals.
- **Hover cards.** Rest on a row to see what the agent is doing right now, what it last said, its PR, branch and machine.
- **On a phone.** The same list as a touch screen with swipes, a long-press menu and a sort-and-filter sheet. Every thread also gets a bar under its header that says what the other threads are doing and opens the full list.
- **Safety and housekeeping.** Archiving a thread whose worktree has uncommitted work asks first. Snooze puts a thread away until a set time, and it wakes early if the thread fails or asks a question. A Stale lens selects quiet threads for a bulk archive.

## Agents can speak on their row

An agent can set a one-line note and a lane (to do, in progress, in review, done) on its own row with the `activity_note` tool, or with `bb activity set --comment "…" --status in-review` from a thread. The note dims when a newer turn starts and retires when the work moves on.

## Optional AI, off by default

- **Generated titles, archive epitaphs and a briefing** use the Claude Code or Codex CLI you already have, and they bill to that plan. Turn them on with one switch in the plugin settings. Off, no CLI is ever spawned.
- **Sharper states with TypeSafe's Jev** need your own TypeSafe API key. Jev classifies failures, rates how risky an approval is and ranks urgency. With a key set, thread titles, error text, last messages and pending requests are sent to api.typesafe.ai. Without one, nothing leaves your machine.

## Requirements

You need bb 0.46 or later. After installing, choose **Activity Sidebar** under Settings → Appearance → Sidebar. bb's own list stays the default until you do, and bb falls back to it if the plugin is disabled.

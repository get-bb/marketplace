## What you get

- **Triage thread list.** A replacement sidebar. A ranked *Now* group on top holds what's blocked on you, threads you mark as Focus (`f`) and deadlines coming up (`d`, or set by agents). Below are numbered lanes (Priority, Active, Waiting for others, Pick up later, Low priority). Row keys: `1`–`5` lane, `s` snooze, `t` tag, `e` archive, `j`/`k` move.
- **Status reports.** Agents end each reply that hands a thread back to you with a short report: goal, done, next and blocked, then the thread's PRs, progress bars, architecture changes and next steps you start with **go**. The thread monitor keeps it in view while the thread is idle, and the Triage list reads it. Use your own format, or turn hand-back reports off and press **Update status**.
- **Decision buttons.** When an agent ends with numbered options, they appear as one-click replies above the composer. Tick several to send them together.
- **Workspaces.** Workspace tabs across the top group projects, threads, sections and plugin navigation, optionally by project; All and No workspace keep everything reachable. They change what navigation shows, not what plugins can access.
- **⌘K palette.** One search over threads, messages, PRs, workspaces, projects and actions, scoped to the current workspace. Tab on a thread replies to a decision, snoozes (`tomorrow`, `3d`), moves, tags, watches CI or archives. Turn it off to give the key back to BB.
- **Catch up.** Go through unread threads one card at a time (⌥⇧C): what happened since you looked, with the live thread and composer. → marks read, ← keeps it unread; snooze or archive, with undo.
- **Waiting for others fills itself.** A thread waiting on a person or a reviewer goes there and comes back when its next turn no longer waits on anyone.
- **Snooze.** A clock button, `bb jb-flow snooze` or the `snooze_thread` agent tool hides a thread until `2h`, `tomorrow`, `mon` or a date, then brings it back unread with an optional wake-up note for the agent.
- **Home page.** *Your move* lists threads that handed the next step to you. *Stale threads* lists unfiled threads idle for 7+ days. *Unreleased* lists merged PRs not yet released.
- **PRs without polling.** Every PR a thread opens is linked to it, stacks included. Agents call `wait_for_ci` and end their turn; the thread is messaged when checks finish (with the failed log), reviews arrive or the PR merges.
- **Scripts and dev servers.** A side panel lists the checkout's `package.json` scripts, with fallback ports for parallel worktrees.

## Optional

Each can be switched in the plugin settings:

- On by default: the restyled interface, the thread monitor, status reports at hand-back, and expanded, resizable plan reviews.
- Off by default: "continue" after a Claude Code usage limit resets, swiping between workspaces, and copy buttons on inline code.
- Wake threads waiting for a release once it ships (per-project JSON config).

## Requirements

- BB with Plugin SDK 0.6.54 or later.
- The GitHub CLI (`gh`), logged in, for PR, CI and release features; repos on github.com. The thread list, snooze and digests work without it.
- Installing JB Flow makes the Triage list your sidebar while Settings → Appearance → Thread list is on Automatic; switch back there at any time.
- Several bb APIs used here are experimental and may change between bb releases.

Source and full documentation: https://github.com/Johannes-Berggren/bb-plugin-jb-flow

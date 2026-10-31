## What you get

- **Workspaces.** Your own workspace tabs across the top of BB group projects, threads, sections and plugin navigation; All and No workspace keep everything reachable. Move a thread from its context menu or manage membership in settings. Workspaces change what navigation shows, not what plugins run or can access.
- **⌘K palette.** BB's Search threads key opens one search over threads, messages, PRs, workspaces, projects and actions. An empty query shows what needs you, what's running, PRs to act on and recent threads; wide windows preview the selected thread. Tab on any thread lists its actions: reply to a decision, snooze (`tomorrow`, `3d`), move, tag, watch CI or archive. `>`, `#`, `@` and `/` (files) narrow the scope and `is:needs` and `is:running` filter. Turn it off to give the key back to BB.
- **Catch up.** Go through unread threads one card at a time: the *Catch up* page (with an unread count), ⌥⇧C, ⌘K or the home page. Each card shows what happened since you looked and the live thread with its composer, so you can read and reply in place. → marks read, ← keeps it unread; snooze or archive, with undo. Swipe on touch.
- **Triage thread list.** A replacement sidebar. Threads blocked on a prompt, a permission or a question to you sit in *Needs me* at the top. Below that are numbered lanes (Priority, Active, Waiting for others, Pick up later, Low priority), with a project chip and tags on each row. On a focused row, `1`–`5` moves it to a lane, `s` snoozes, `t` tags, `e` archives and `j`/`k` move up and down.
- **Waiting for others fills itself.** A thread whose agent says it is waiting on a person, or whose open PRs all wait on a reviewer, goes there and comes back to Active when its next turn no longer waits on anyone.
- **Snooze.** A clock button, `bb jb-flow snooze`, or the `snooze_thread` agent tool hides a thread until `2h`, `tomorrow`, `mon` or a date. It comes back unread, and an optional note is sent to the agent as its wake-up instruction.
- **Home page sections.** *Your move* lists threads that handed the next step to you, oldest first. *Stale threads* lists unfiled threads idle for 7+ days, with archive, keep and snooze in bulk. *Unreleased* lists merged PRs not yet released.
- **PRs without polling.** Every PR a thread opens is linked to it, in any repo, and stacked PRs are shown as a stack. Agents call `wait_for_ci` and end their turn; the plugin checks GitHub every 2 minutes and messages the thread when checks finish (with the failed log), reviews arrive or the PR merges. `pr_status` gives an agent all of its PRs in one call.
- **Scripts and dev servers.** A side panel lists the checkout's `package.json` scripts. Pinned commands get fallback ports for parallel worktrees.
- **Decision buttons.** When an agent ends with numbered options, they appear as one-click replies above the composer.

## Optional

Each can be switched in the plugin settings:

- A restyled bb interface, a thread monitor with the agent's latest status report, and expanded, resizable plan reviews are on by default.
- Send "continue" after a Claude Code usage limit resets: per thread in the thread monitor, with a default in settings (off).
- Wake threads waiting for a release once a release PR merges and its workflows finish (per-project JSON config).

## Requirements

- BB with Plugin SDK 0.6.54 or later; early 0.46.1 builds need an update for workspace navigation.
- The GitHub CLI (`gh`), logged in with `gh auth login`, for all PR, CI and release features. Repos must be on github.com. The thread list, snooze and digests work without it.
- Installing JB Flow makes the Triage list your sidebar (while Settings → Appearance → Thread list is on Automatic); switch back there at any time. The list offers to create its lane sections on first use.
- Several bb APIs used here are experimental and may change between bb releases.

Source and full documentation: https://github.com/Johannes-Berggren/bb-plugin-jb-flow

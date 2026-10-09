## What you get

- **Triage thread list.** A replacement sidebar. Threads blocked on a prompt, a permission or a question to you sit in *Needs me* at the top. Below that are numbered lanes (Priority, Active, Waiting for others, Pick up later, Low priority), with a project chip and tags on each row. On a focused row, `1`–`5` moves it to a lane, `s` snoozes, `t` tags, `e` archives and `j`/`k` move up and down.
- **Waiting for others fills itself.** A thread whose agent says it is waiting on a person, or whose open PRs all wait on a reviewer, goes there and comes back to Active when its next turn no longer waits on anyone.
- **Snooze.** A clock button, `bb jb-flow snooze`, or the `snooze_thread` agent tool hides a thread until `2h`, `tomorrow`, `mon` or a date. It comes back unread, and an optional note is sent to the agent as its wake-up instruction.
- **Home page sections.** *Your move* lists threads that handed the next step to you, oldest first. *Stale threads* lists unfiled threads idle for 7+ days, with archive, keep and snooze in bulk. *Unreleased* lists merged PRs not yet released.
- **PRs without polling.** Every PR a thread opens is linked to it, in any repo, and stacked PRs are shown as a stack. Agents call `wait_for_ci` and end their turn; the plugin checks GitHub every 2 minutes and messages the thread when checks finish (with the failed log), reviews arrive or the PR merges. `pr_status` gives an agent all of its PRs in one call.
- **Scripts and dev servers.** A side panel lists the checkout's `package.json` scripts. Pinned commands can have fallback slots on other ports, so parallel worktrees don't collide, and a browser tab opens once the port responds.
- **Decision buttons.** When an agent ends with numbered options, they appear as one-click replies above the composer.

## Optional

Off until you turn them on in the plugin settings:

- Send "continue" after a Claude Code usage limit resets.
- Cmd+N opens the new thread in a split.
- Plans awaiting approval open expanded.
- Wake threads waiting for a release once a release PR merges and its workflows finish (per-project JSON config).

## Requirements

- The GitHub CLI (`gh`), logged in with `gh auth login`, for all PR, CI and release features. Repos must be on github.com. The thread list, snooze and digests work without it.
- To get the lanes, pick **Triage** under Settings → Appearance → Thread list, then create the lane sections under Settings → JB Flow → Triage lanes.
- Several bb APIs used here are experimental and may change between bb releases.

Source and full documentation: https://github.com/Johannes-Berggren/bb-plugin-jb-flow

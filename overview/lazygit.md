Every thread gets a Lazygit terminal tab, automatically — stage, commit, and
inspect the worktree without leaving the thread.

## What you get

- A **Lazygit** tab in the right panel of every thread you open, next to
  Thread Info and Diff, running
  [lazygit](https://github.com/jesseduffield/lazygit) in that thread's
  worktree.
- A **Lazygit** row in the panel's Actions list and a `bb lazygit` command
  to bring the tab back after you closed it — or to restart it after you
  quit lazygit.
- Settings for the auto-open behavior and the exact command to run, so a
  lazygit installed outside `PATH` still works.

## How it works

The first time a thread is opened, the plugin starts a thread-scoped
terminal running lazygit and pins it as a tab in the thread's panel. Closing
the tab is remembered, so it never pops back unwanted; the Actions list or
`bb lazygit` reopens it. Everything runs on your machine — no account, API
key, or external service.

## For agents

The bundled skill tells an agent to run `bb lazygit` when you ask for a git
UI, instead of trying to drive a full-screen TUI from a non-interactive
shell.

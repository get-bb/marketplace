Reviewing a thread's work shouldn't mean reaching for a separate terminal.
Every thread gets a Lazygit terminal tab, automatically — stage, commit, and
inspect the worktree without leaving the thread.

## What you get

- A **Lazygit** tab in the right panel of every thread you open, next to
  Thread Info and Diff, running
  [lazygit](https://github.com/jesseduffield/lazygit) in that thread's
  worktree. The process starts lazily the first time you activate the tab.
- A **persistent session** — switching tabs keeps the lazygit process alive,
  so your scrollback and state are still there when you come back.
- A **Lazygit** row in the panel's Actions list, plus a `bb lazygit` command
  that brings the tab back after you closed it — or restarts it after you
  quit lazygit:

  ```
  bb lazygit                    # current thread
  bb lazygit --thread <id>      # a specific thread
  ```

- **Non-git folders handled** — if the thread's environment is not a git
  repository, the tab offers to `git init` it instead of failing.
- Settings for the auto-open behavior and the exact command to run, so a
  lazygit installed outside `PATH` still works:

  ```
  bb plugin config lazygit                          # show current values
  bb plugin config lazygit set autoOpen false
  bb plugin config lazygit set command /opt/bin/lazygit
  bb plugin reload lazygit
  ```

## How it works

The first time a thread is opened, the plugin starts a thread-scoped
terminal running lazygit and pins it as a tab in the thread's panel. Closing
the tab is remembered, so it never pops back unwanted; the Actions list or
`bb lazygit` reopens it. Everything runs on your machine — no account, API
key, or external service.

## Requirements

- BB 0.42 or later.
- [lazygit](https://github.com/jesseduffield/lazygit#installation) installed,
  either on your `PATH` or configured through the `command` setting.

## For agents

The bundled skill tells an agent to run `bb lazygit` when you ask for a git
UI, instead of trying to drive a full-screen TUI from a non-interactive
shell.

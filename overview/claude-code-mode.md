## What you get

- A code icon button in the New thread composer toolbar. It is a sticky
  preference for Claude Code threads that you start from the app.
- A "Claude Code Mode" line above the composer of each thread started that way.
- Other threads stay as they were. Agent, CLI, SDK, plugin and fork threads are
  not affected by the button.

## How it works

Claude Code Mode is chosen at the first turn and kept when the session resumes.
The plugin runs Claude Code through a bundled wrapper script that turns the mode
on for opted-in threads only.

## Requirements

- Claude Code CLI 2.1.323 or later, signed in.
- Opus 5.5, Sonnet 5.5, Haiku 5.5 or Fable 5.2.
- macOS or Linux with `bash` and `python3`.
- Threads that run on the same machine as the bb server.

## Limits

- Code Mode is an experimental Claude Code feature and can change in any release.
- Code Mode threads do not have Claude in Chrome, computer use or Remote
  Control.
- While enabled, the plugin routes every Claude Code launch on the bb server's
  machine through its wrapper.
- A Code Mode thread resumes in Code Mode only while the plugin is active.
- On another enrolled machine the thread banner appears, but Code Mode is not
  applied.
- Compact layouts hide the toolbar button.

This is an independent community plugin, not made or endorsed by Anthropic.

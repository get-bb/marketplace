Conversation forks don't bring the files back. Rewind does: it checkpoints
every thread's workspace before each message and after each turn, with no
setup, whichever agent provider the thread uses.

## What you get

- **Rewind to here** on your messages and on replies: preview what would
  change, then restore the files to before that message or to the end of
  that reply's turn. Or restore the files and edit your message, so the
  conversation rewinds with them.
- A **Checkpoints** panel: every turn with its message, files changed, and
  per-file diffs, plus the restore history with **Undo**.
- **Fork from here with files**: a new thread that continues from that
  point in a new worktree whose files are exactly as they were.
- A checkpoint count in the thread header, palette commands, and
  `bb rewind` (`list`, `diff`, `restore`, `undo`, `checkpoint`, `fork`, …).
- Agent tools `rewind_checkpoint` and `rewind_list`. There is no restore
  tool: restoring stays your call.

## Safe by default

Every restore takes a checkpoint first, so it can be undone. It never
touches ignored files such as `node_modules` or an ignored `.env`, never
writes into `.git` or changes commits, and refuses while an agent is
running in that workspace. It tells you what it cannot undo, like a turn
that ran `git push`. A message is held a fraction of a second for its
checkpoint; a slow one is queued until it is saved.

## How it works

Snapshots go into a separate git repository Rewind keeps per workspace on
the machine that holds it, so your repository is untouched and non-git
workspaces work too. Only changed files are re-read, and a daily cleanup
keeps the newest checkpoints per thread.

## Requirements

`git` on the thread's machine. Forking with files needs a git repository
and a provider that can fork mid-conversation. Workspaces over 100,000
files or 2 GB are skipped rather than slowed down.

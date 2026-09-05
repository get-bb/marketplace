## What you get

Follow a repository's commit history from the active BB thread. The panel
groups commits by date, marks branches, remotes, tags, stashes, and `HEAD`, and
draws branch and merge paths in a compact graph.

Expand a commit to read its full message, hash, author details, timestamp, and
changed-file totals. Open a changed file in BB's diff viewer. Staged, modified,
deleted, conflicted, and untracked working-tree files appear above the history.

## How it works

Git History reads Git data through the active thread's local or connected BB
host. It refreshes automatically, loads long histories in pages, and restarts
a paginated read when the repository changes.

The plugin does not run checkout, reset, merge, rebase, or other Git mutations.

## Requirements

The active BB thread must have a ready project environment that points to a Git
repository. Git History needs no account or external service.

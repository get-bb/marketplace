## What you get

A dedicated row in the New Thread environment picker that shows every existing
git worktree for the selected project on the selected machine.

Pick any listed worktree and start a thread attached to it. bb keeps the
worktree intact when the thread is archived or deleted.

## How it works

On the selected machine the plugin runs `git worktree list --porcelain` against
the project's source checkout, hides the main checkout and any BB-managed
worktree paths, and attaches the path you pick with `ownsPath: false`.

## Requirements

Requires BB 0.43+, Plugin SDK 0.4.87+, and Git 2.31+ on the selected machine.
The project must have a checkout on that machine. No external account or service
is needed.

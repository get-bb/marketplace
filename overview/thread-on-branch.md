## What you get

- A "New thread on `<branch>`" item in every thread menu: right-click on a
  sidebar row, the row's ⋯ menu, the thread header menu, and the compact
  long-press drawer. You can also add it to a row's quick actions with
  Customize actions.
- Picking it opens BB's new-thread screen with the same project and the
  same environment selected (Reuse), and the prompt focused.
- When BB does not know the environment's branch, for example a folder that
  is not a git checkout, the item reads "New thread in environment".

## Same checkout

The new thread reuses the source thread's environment. Both threads work in
the same checkout on the same branch, so two agents editing at once can
overwrite each other's changes. To start from that branch in a fresh
worktree instead, change the environment in the composer before sending.

## Requirements

Runs inside BB with no account, service, or network access.

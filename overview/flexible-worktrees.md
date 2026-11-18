## Say what to work on

Open **Work on…** beside the environment picker and search once across pull requests, branches, and checkouts. Or just start typing a new branch name. The plugin works out the Git steps: it attaches the worktree that already has your branch, checks out a local branch, fetches and tracks a remote one, or opens a PR in a detached review worktree.

## New tasks start fresh

New branches start from the remote's freshly fetched default branch, not whatever your main checkout happens to be on. Folders follow your path template, and BB's diff compares against the right base: `origin/main`, the parent branch of a stacked change, or the PR's target.

## Reviews and handoffs

Pick a PR by title, author, or `#number`, including PRs from forks, without adding remotes. Re-reviewing after new pushes opens a fresh worktree, with no branch conflicts. Resuming your own branch from another machine fast-forwards it to the remote, and never rewinds local commits.

## Predictable before launch

A one-line preview says exactly what launching will do. Conflicts such as existing branch names, missing branches, or occupied folders show up there instead of failing the environment later.

## Put worktrees where you want them

Set one path template for every new worktree: unique folders under `~/worktrees` by default, grouped by repository with `~/worktrees/{repo}/{pathKey}`, or next to each checkout with `{checkoutParent}/{repo}.{branch}`. Add per-project templates keyed by BB project ID or remote, including wildcard matches. Override the parent directory or folder name for one thread. The settings page explains every variable with examples.

## Ready to run

New worktrees get their submodules initialized and the untracked files listed in `.worktreeinclude` (such as `.env`) copied over before BB runs your setup script.

## Keep control of your files

The plugin never deletes worktrees or branches. Manage them with `git worktree` when you're done. If BB restores a thread's environment, the plugin reattaches the files it left behind instead of creating a new worktree. Existing checkouts are attached exactly as they are, and existing files are never overwritten.

## Requirements

Requires BB 0.43 or newer, Plugin SDK 0.4.87 or newer, and Git 2.31 or newer on the selected machine. The GitHub CLI (`gh`) is optional and enables the pull request list. Like other BB plugins, it runs as full-trust code and can access files on the selected machine.

## Choose where each thread works

Open the Workspace popover beside the environment picker to choose an existing checkout or create a new worktree. The composer stays compact, with the selected checkout or branch visible in its footer.

## Existing checkouts

Filter project checkouts and worktrees by branch or path, or enter the path to another local clone. The thread uses that checkout's current branch and files without switching branches, resetting changes, or cleaning untracked files. Threads sharing a checkout can edit the same files.

## New worktrees

Choose the parent directory, folder name, branch name, and starting revision. Create a new branch or use an existing local branch that is not checked out elsewhere. Leave folder and new-branch names blank for BB-generated names. A destination preview shows where the worktree will go.

Set a default parent directory in the plugin's settings, then override it for individual threads. Paths are resolved on the selected machine.

## Keep control of your files

The plugin retains worktrees and branches when threads are archived or deleted. Remove unwanted worktrees manually with Git. Existing destination directories are refused rather than overwritten. Newly created worktrees run BB's normal repository environment hooks; existing checkouts do not.

## Requirements

Requires BB 0.43 or newer, Plugin SDK 0.4.87 or newer, and Git 2.31 or newer on the selected machine. No external service or account is required. Like other BB plugins, it runs as full-trust code and can access files on the selected machine.

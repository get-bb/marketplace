Coordinate changes that span services without flattening them into one repository.

## Model related repositories

Create a reusable workspace from existing BB projects. A project can belong to several workspaces, and the plugin leaves each project's source and settings untouched. Add shared instructions for conventions that matter whenever those repositories are used together.

## Launch one isolated task

Select only the repositories a task needs and choose its primary project. Workspaces creates a dedicated Git worktree for each repository, writes a compact repository map, and starts one BB thread at their common root. Each session records the exact workspace revision, base commits, branches, paths, host, and thread for recovery and history.

The thread's Repositories panel shows status per checkout, so changes in one service do not obscure another.

## Clean up safely

Archive a completed session, then remove its worktrees from the Workspaces page. Cleanup first verifies the plugin-owned manifest and every path, and then checks every repository before removing any of them. If a checkout is dirty or was switched away from its recorded session branch, the entire session is preserved. Commits remain available because generated branches are never deleted.

Workspaces uses BB's public plugin APIs and local Git. It requires no account, token, or external service.

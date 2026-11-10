Treehouse adds one **Files** tab to every thread's side panel, with three views: **Files**, **Diff** and **Graph**. It finds every git repository in the thread's workspace, including `git worktree` folders and nested repositories up to four levels deep, so work spread across `.worktrees/` and service repos shows up in one place.

## Files

- A file tree with icons for 200+ file types and 170+ well-known folders (Material Icon Theme).
- Git badges for modified, untracked, added and deleted files, carried up to each parent folder.
- A folder picker that roots the tree at the workspace, any folder holding repositories, or a single repository.
- Fuzzy **Find files**, including files inside nested repositories.
- Ignore rules come from the repository that owns each folder, so a worktree ignored by the parent repository still shows normally inside. One button hides ignored entries.

## Diff

- One section per repository with its branch, ahead/behind counts, pull, push, and **Publish** for a branch with no upstream.
- **Staged** and **Changes** lists: stage, unstage, discard (click twice to confirm) or open each file.
- A diff tab per file that updates as the file changes, with **Stage hunk**, **Unstage hunk** and **Discard** on each hunk.
- A commit box per repository: **Commit**, **Commit & Push** and **Amend Last Commit**. **Commit** stages everything when nothing is staged.
- **✨** writes the commit message with Claude in the style of the repository's recent commits.
- **Compare with** any local or remote branch: ahead/behind and every file changed since the branches split (`base...HEAD`).
- **Create PR** pushes the branch and opens the new pull request page on GitHub, GitLab (including self-hosted) or Bitbucket.

## Graph

- A commit graph per repository with coloured branch lanes, merges, branch and tag badges, author initials and relative dates.
- All branches or the current branch, a filter by message, author, hash or branch, and 300 more commits per page.
- Click a commit to open it in a tab with each changed file's diff; merges are shown against their first parent.

## How it works

Every git command runs on the thread's machine through the plugin's host entry. Treehouse does not poll git: while a view is open it subscribes to bb's native file watcher for the workspace and each repository's git directory, and refreshes when something changes. If the watcher cannot start, it checks every five seconds while the tab is visible. Folders load when opened and only visible rows are drawn.

`bb treehouse status <environment-id>` and `bb treehouse ls <environment-id>` print the same data for scripts and agents.

## Requirements

- bb 0.49 or later and `git` on the thread's machine.
- **✨** needs one of: an Anthropic API key in the plugin settings, Anthropic credentials on the bb server (`ANTHROPIC_API_KEY` or an `ant auth login` profile), or the `claude` CLI on the thread's machine. It sends the diff of the changes being committed (up to 120 KB) to Claude Opus 5.5. Everything else works without it.
- **Create PR** and push use the repository's own git remote and credentials. No GitHub, GitLab or Bitbucket account is connected to bb.

Source and issues: https://github.com/redhajuanda/bb-treehouse

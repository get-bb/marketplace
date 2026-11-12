Treehouse adds one **Files** tab to every thread's side panel, with three views: **Files**, **Diff** and **Graph**. It finds every git repository in the workspace, including `git worktree` folders and nested repositories up to four levels deep.

## Files

- A file tree with icons for 200+ file types, git badges carried up to each parent folder, a folder picker, and fuzzy **Find files** across nested repositories.
- The panel is split in two: Treehouse's own tabs on the left, and the file tree, change list or graph on the right. Files, diffs and commits share one set of tabs, remembered per workspace. Pin, drag to reorder, reopen closed tabs, or pop one out to a bb tab.
- Switch a tab to **Edit** to change the file, with syntax highlighting in bb's code theme and Ctrl/⌘+S to save. A save is refused if the file changed on disk since you opened it; you choose to reload or overwrite.
- Right-click for New File, New Folder, Copy Path, Duplicate, Download (folders as `.tar.gz`), Open in an external editor or a terminal, Rename, Move to Trash and Delete Permanently.
- Drag files and folders onto a folder to move them, with Undo.
- Ignore rules come from the repository that owns each folder, and one button hides ignored entries.

## Diff

- One section per repository with its branch, ahead/behind, pull, push, and **Publish** for a new branch.
- **Staged** and **Changes** lists: stage, unstage, discard or open each file. Diffs open as tabs beside the list, with **Stage hunk**, **Unstage hunk** and **Discard** on each hunk.
- A commit box per repository: **Commit**, **Commit & Push** and **Amend Last Commit**. **✨** writes the message with Claude in the style of the repository's recent commits.
- **Compare with** any branch: ahead/behind and every file changed since the branches split.
- **Create PR** pushes the branch and opens the pull request page on GitHub, GitLab (including self-hosted) or Bitbucket.

## Graph

- A commit graph with coloured branch lanes, merges, branch and tag badges, author initials and relative dates.
- All branches or the current one, a filter by message, author, hash or branch, and 300 more commits per page.
- Click a commit to open its diff as a tab beside the graph.

## How it works

Every git command runs on the thread's machine through the plugin's host entry. Treehouse does not poll: it subscribes to bb's native file watcher for the workspace and each repository's git directory, and refreshes when something changes. Folders load when opened and only visible rows are drawn. Every button has a tooltip, and tab commands can be rebound in bb's keyboard settings.

`bb treehouse status <environment-id>` and `bb treehouse ls <environment-id>` print the same data for scripts and agents.

## Requirements

- bb 0.49 or later and `git` on the thread's machine.
- **✨** needs an Anthropic API key in the plugin settings, Anthropic credentials on the bb server (`ANTHROPIC_API_KEY` or `ant auth login`), or the `claude` CLI on the thread's machine. It sends the diff being committed (up to 120 KB) to Claude Opus 5.5. Everything else works without it.
- **Create PR** and push use the repository's own git remote and credentials. No GitHub, GitLab or Bitbucket account is connected to bb.

Source and issues: https://github.com/redhajuanda/bb-treehouse

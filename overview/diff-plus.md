## What you get

A folder button in the toolbar of BB's Diff tab shows the changed files as a tree beside the file list. Each folder shows how many files changed under it and its added and removed lines, so you can see where a large change lands before you read any of it.

- Click a folder's name to show only the files under it. Click a file to show it alone with its diff open. Click the same row again, or **All files**, to see everything.
- Click a folder's icon to open or close it. The tree opens the top levels for you.
- Files and folders carry vscode-icons glyphs for common languages, tools and folder names, and VS Code's git letters at the right: U untracked, A added, M modified, D deleted, R renamed. A folder gets a dot: green when everything under it is new, red when it is all deleted, amber otherwise.
- The tree follows the tab's scope: all changes, committed changes, uncommitted changes or a single commit. It refreshes when BB reports that the worktree's status or branches changed.

## Layout

Drag the tree's right edge, or focus it and use the arrow keys, to change its width. In a tab narrower than 600px, such as the phone drawer, the tree goes above the list instead. The folder button hides the tree, and the choice and the width are kept per browser.

## How it works

The tree adds to BB's own Diff tab and leaves its diffs alone: filtering goes through the tab's own filter box, so BB's own file search and filters, Viewed checkboxes, split view and "Add to chat" on selected lines all keep working. File paths that look like glob patterns, such as `app/[slug]`, are escaped so a click shows exactly that folder or file.

## Requirements

- BB 0.48 or later.
- BB has no plugin slot beside the Diff tab, so the tree finds the tab by its page structure. A future BB release may move it; the tree then does not show until the plugin is updated.
- It reads the changed files from BB's bundled Git plugin, which the Diff tab itself uses.
- No external service or account is used.
- The icons are from vscode-icons, under CC BY-SA 4.0: https://github.com/vscode-icons/vscode-icons

## Who it is for

People who read and steer what an agent changes in a workspace and want the explorer they know from VS Code or Cursor right inside BB.

## What you get

A file tree pinned to the right of the BB window, beside the thread and BB's editor tabs. It stays put while you switch threads.

- **Git colours and Changes.** Modified files read amber with an **M**, new ones green, deleted red, conflicts purple; a folder takes the colour of what changed inside it. The **Changes** tab lists every uncommitted file — click one for its diff against HEAD, inline or side by side. Both refresh every few seconds, so an agent's edits show up as they land.
- **Material Icon Theme.** VS Code's file and folder icons, light and dark.
- **Quick Open (⌘E).** Type a few letters of a name in order — `fexb` finds `FileExplorerBody.tsx`. Empty, it lists recent files; `server.ts:30` opens on line 30. Git-ignored files stay out.
- **Search and replace (⇧⌘F).** Case, whole word and regex, include and exclude globs. With text in Replace, every result previews the change in place; dismiss a file to leave it out; Replace All says how much will change and asks first.
- **An editor's tree.** Arrow keys, F2 to rename in place, Delete to move to the Trash with Undo, ⌘C/⌘X/⌘V and Duplicate, ⌘-click and ⇧-click to select several, drag and drop to move.
- **Chat paths.** A path an agent writes in chat gets a button that reveals it in the tree.

Files open in BB's own editor.

## How it works

The tree, git status and search run on the machine that holds the workspace, through BB's host API. Git status is `git status --porcelain`, diffs are `git diff HEAD`, and content search is ripgrep. Deleting moves items to the macOS or freedesktop Trash; a machine without one deletes for good and says so.

## First step

Install it, open a thread with a git repository, and press ⌘B to show the explorer. Ask the agent to change a file and watch it turn amber; click it in **Changes** to see the diff. Then press ⌘E and type a few letters of a file name.

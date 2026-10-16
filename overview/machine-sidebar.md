## What you get

Machine Sidebar replaces bb's thread list with a tree: machine first, then project, then thread. A thread sits under the machine its environment runs on, so work on a laptop and on a remote machine stays apart. A project with threads on two machines appears under both, each time with only that machine's threads. Threads without a project appear as "Threads" under their machine.

## Title tags

Start a thread title with one or more bracketed tags, such as `[Coding][Running] Checkout Flow`, and each tag is drawn as a colored pill in front of the title. Under Settings → Installed plugins → Machine Sidebar → Title tags you list tags and pick one of nine colors for each; saving updates every open window right away. Tags without a rule get a stable automatic color from their name. Brackets later in a title stay plain text, and the title itself is unchanged everywhere else in bb.

## Inactive threads and projects

Choose **Mark inactive** in a thread's menu, or **Mark project inactive** in a project's menu, to move it into an **Inactive** group at the bottom of its machine. The group starts collapsed and its rows are dimmed. A marked thread returns to the normal list by itself when it waits for your input, or when a new turn finishes or fails after you marked it. Opening or reading it does not bring it back. **Mark active** undoes the mark.

## On every row

- The git branch, small under the title. Threads outside git use one line.
- A status dot: amber waits for you, red failed, green finished and unread. A spinner appears only while the agent itself is working on a turn. A collapsed group shows the most urgent dot it contains.
- Quiet icons with a count for work that keeps running on its own: subagents, background commands such as a dev server, workflows, plan mode, and goals.
- A chevron on a thread with sub-threads folds them. A folded parent shows how many it hides and still shows when one of them works or waits for you.
- On hover: **Archive**, and a menu with open in split, rename, pin, mark read or unread, mark inactive, and delete.
- On a project heading, **+** starts a new thread in that project on that machine.

Pinned threads stay on top, and child threads are indented under their parent. bb's Cmd+1…9 and next or previous thread shortcuts keep working.

## Farcall worker tasks

If you delegate work to Claude Code or Codex workers through farcall-mcp, turn on **Show Farcall tasks** in the plugin settings. Each coordinator thread then lists its worker tasks underneath, with provider, model, task, elapsed call time and the final outcome. The list is built only from bb's own tool-call events: the plugin never starts, retries or controls workers, and it shows "Call open" while a batch is still running instead of guessing per-worker progress. Under each task a small line shows where the worker runs: the branch when its folder is a bb worktree environment on the coordinator's machine, otherwise the folder name from a `worktrees/<name>` path, marked as a folder because the branch is unknown. **Show hierarchy guides** adds thin tree lines through nested threads and tasks.

## How it works

The list reads bb's own thread, project and tool-call data; it adds no external service or account. Tag colors and inactive marks are stored by the plugin on your bb server, so every window and machine shows the same state. Which groups you collapsed is remembered per window.

See how every agent's worktree is doing, open any one of them to read its diffs, commits and conversation, and see everything your threads changed across repositories: for one thread's tree in its side panel, or for every recent thread on a full-screen page.

## What you get

- A Vantage tab in a thread's side panel, with a button in the thread header and a command in the palette. It opens on the Worktrees view.
- One row for each worktree in the thread tree: the parent's own checkout, every child's worktree, and the kept branch of every archived child. A row shows bb's status glyph (running, needs you, failed, finished), the branch, commits ahead and behind, uncommitted files, line counts and the pull request.
- A warning when files are changed in more than one worktree of a project, so you see a possible merge conflict before you merge.
- Click a row to open that worktree. Changes shows uncommitted and committed files with diffs, Commits shows each commit and its files, and Chat shows the child's conversation, where you can approve a request or steer the agent.
- Terminal here opens a shell in the worktree's folder. Open thread opens the child, and bb's own thread menu offers stop, archive and the rest. The keys [ and ] step between worktrees and Escape goes back.
- The Repositories view groups everything the thread tree changed by repository: thread workspaces, other checkouts agents edited by path, archived children's branches, and recorded edits for files outside any repository.
- A full-screen Vantage page in bb's left navigation covers every thread active in the last 24 hours, plus anything running and threads archived in that time. The worktree list sits on the left, grouped by project, and the selected worktree's changes, commits, chat and terminal sit on the right. Filter by project, by text, or to worktrees with changes only. Every view has its own address, so back and forward work. "Open full screen" in a thread's tab opens the page for just that thread's tree.
- Both views paint every row at once and fill in the git numbers as they arrive. The page starts without archived threads; "Show archived" brings them back, and the side tab shows them by default.

## For agents

`bb vantage worktrees` prints one line for each worktree, then the shared files. `bb vantage worktree <thread>` prints one thread's files and commits. `bb vantage changes` prints the Repositories view. Each accepts `--json`; `--thread <id>` reads another thread, and `--all` (with `--hours <n>`) reads every recent thread, grouped by project, and `--archived` adds the archived ones.

## How it works

Vantage only reads. It never stages, commits or changes a file. A workspace's counts come from one bb status call that both views share, and its status and pull request from data bb's sidebar already loads. Other checkouts are read with git on the machine that owns them. Results are kept for 60 seconds and reloaded only where an agent's edit or a workspace change touched, and git roots for 10 minutes. Two settings, the time window (24 hours) and the thread limit (200), tune it.

## Limits

- 500 files per list, 100 commits per worktree, and patches cut at 1 MiB.
- Terminal here needs a worktree on disk, and in the side panel one on the same machine as the thread.
- Edits made only by shell commands in another repository are missed unless an agent also edited a file there.

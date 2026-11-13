A sidebar thread list built around agent work: the threads an agent spawns nest
under it, and the subagents it runs inside its own session show on its row.

## What you get

- With the GitHub Folder plugin installed, its pull requests that need you sit
  at the top: review requests, changes requested, failing checks, conflicts,
  ready to merge.
- Automations: each scheduled automation with its status dot and next run.
  Hover to run, pause or resume it; click to open its last run.
- Recent Activity: the most recently active threads, child threads included.
- Threads grouped by Project, by Status or not at all, with Pinned on top.
  Projects keep the order you drag them into, or follow recent activity. The +
  on a project header starts a new thread there.
- Sort by last activity, creation date or status from the funnel icon, globally
  or per folder. Creation date keeps rows in place as messages arrive.
- The Archived toggle shows archived threads in the same grouping and nesting.
- Each child thread sits under the thread that spawned it, at any depth, even
  in another project. Hover a parent's status glyph for a chevron that folds
  its subtree into one line counting each state. The open thread and threads
  waiting for your input stay visible under the fold.
- Before each title, bb's own status glyph: a spinner while the agent works, a
  question mark when it needs input, a red cross for a failure, a dot for an
  unread result, a pencil for a draft. A failed thread gets a Retry button.
- Rows are one line and never change height. A tinted PR icon appears only when
  a pull request needs action: failing checks, conflicts, changes requested or
  ready to merge. Hover for its number and title; click to open GitHub.
- A ⚠ warns when another live thread works on the same branch or worktree.
- Each row shows its agent provider before the age. Hover a row for its title,
  branch, provider and age.
- Hovering or focusing a row fades Archive and ⋯ in over its end; Archive keeps
  bb's confirmation and Undo. Cmd+Z or Ctrl+Z restores recently archived
  threads and their children.
- Hover a running thread's spinner to stop it. Stop is also in the row's menu,
  the only place on a phone, so a tap never stops a thread.
- Provider subagents show a counter and status dot on the parent's row;
  hover for type, state, duration and tokens.
- Hold Ctrl (or Cmd on a Mac) to see each row's jump key.
- `bb thread-tree list` prints a thread's subagents from a terminal.

## Arranging the sidebar

Right-click the GitHub, Automations or Recent Activity header to remove it;
Sections at the top of the list brings it back. Drag a header, or use Move up
and Move down in its menu, to reorder sections. While you drag, the blocks fold
to their headers and reopen on drop.

## Settings

Settings → Installed plugins → Thread Tree holds the section switches, Recent
Activity row counts, provider icon colour (brand tint or monochrome), and
switches for the subagent counters and the age label. Reduce motion stops the
sidebar animations and holds status spinners still, as the system's
reduced-motion preference does for the spinners.

## How it works

The list reads bb's own thread data. Subagents come from each thread's event
log on the bb server. PR checks and conflicts come from bb's GitHub PR Status
plugin through the environment machine's gh login, plus Thread Links for PRs
mentioned in the session; changes requested and ready to merge need the GitHub
Folder plugin. Folds, grouping and order are kept per client; the settings
apply to every client of the bb server.

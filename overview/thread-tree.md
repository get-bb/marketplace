A sidebar thread list built around agent work: the threads an agent spawns nest
under it, and the subagents it runs inside its own session show on its row.

## What you get

- A status line counts threads that need input, failed, are running or are
  unread. Click a count for a flat list of those threads; Running rows name
  their project and orchestration. Press `/` to search title, branch, PR
  number or project; Escape returns.
- Needs you, above the sections: threads asking a question (with how long
  they waited), failed turns and queued messages, unread results, then failing
  PRs of your threads and failed automations. Retry or Resend in place; hover
  to snooze an item until it changes. ⇧⌘I opens the next one.
- Pull requests (from GitHub Folder) and Automations start folded, with a
  summary in the header: "1 failing · 5", "1 failed · next in 12m". A PR's
  reason is its icon; hover to snooze or open its thread. Hover an automation
  to run, pause or resume it; click to open its last run.
- Threads grouped by Project, by Status or not at all, with Pinned on top.
  Projects keep the order you drag them into, or follow recent activity. The +
  on a project header starts a new thread there.
- Sort by last activity, creation date or status, globally or per folder.
- Archived shows archived threads in the same grouping and nesting.
- Each child thread sits under the thread that spawned it, at any depth, even
  in another project. Fold a parent into one line counting its subtree by
  state; its glyph shows the most urgent state below. A finished fold offers
  Archive, skipping worktrees with uncommitted changes.
- Per project, threads idle, read and quiet for a day fold into "N older";
  expanded, it offers Archive these, skipping uncommitted worktrees.
- Orchestrations: a shortcut for each thread with live subthreads, most
  urgent first, with its projects and progress; finished ones go last, muted.
- Before each title, bb's own status glyph: a spinner while the agent works, a
  question mark when it needs input, a red cross for a failure, a dot for an
  unread result, a pencil for a draft. A failed thread gets a Retry button.
- Rows are one line; a tinted PR icon appears only when a PR needs action.
- A ⚠ warns when another live thread works on the same branch or worktree.
- Each row shows its agent provider; hover for title, branch and age.
- Hovering or focusing a row fades Archive and ⋯ in over its end; Archive keeps
  bb's confirmation and Undo. Cmd+Z or Ctrl+Z restores recently archived
  threads and their children.
- Hover a running thread's spinner to stop it; on touch, Stop is only in the
  row's menu.
- Provider subagents show a counter and status dot on the parent's row;
  hover for type, state, duration and tokens.
- Hold Ctrl (or Cmd on a Mac) to see each row's jump key.
- `bb thread-tree list` prints a thread's subagents from a terminal.

## Arranging the sidebar

Right-click a section header to remove it; the sliders icon beside search
brings it back, as well as Recent Activity, off by default. Drag a header, or
use Move up and Move down in its menu, to reorder sections. While you drag, the
blocks fold to their headers and reopen on drop.

## Settings

Thread Tree's settings hold the section switches, Recent Activity row counts,
which PRs Needs you lists, provider icon colour, and switches for the subagent
counters and the age label. Reduce motion stops the sidebar animations and
holds spinners still; so does the system's reduced-motion preference.

## How it works

The list reads bb's own thread data. Subagents come from each thread's event
log on the bb server. PR checks and conflicts come from bb's GitHub PR Status
plugin through the environment machine's gh login, plus Thread Links for PRs
mentioned in the session; changes requested and ready to merge need the GitHub
Folder plugin. Folds, grouping and order are kept per client; the settings
apply to every client of the bb server.

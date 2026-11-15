A sidebar thread list built around agent work: the threads an agent spawns nest
under it, and the subagents it runs inside its own session show on its row.

## What you get

- A search field on top (or `/`) finds threads by title, branch, PR number or
  project. Below it, counts of threads that need input, failed, run or are
  unread; click one for a flat list. Running rows show the current step, a turn
  timer, a high context fill and the orchestration.
- Needs you, above the sections: threads asking a question, failed turns
  and queued messages, threads stuck with no progress, unread results with
  their diff, then failing PRs of your threads and failed automations. Retry,
  Resend or Stop in place; hover to snooze. ⇧⌘I (Ctrl+Shift+I) opens the next.
- Pull requests (from GitHub Folder) and Automations start folded, with a
  summary in the header such as "1 failing · 5". A PR's reason is its icon;
  hover to snooze, open its thread, merge or start an agent review. Hover an
  automation to run, pause or resume it; click to open its last run.
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
  expanded, it offers Archive these.
- Projects with no turn for 24 hours, subthreads and since-archived threads
  included (a setting; 0 turns it off), move into "N inactive projects" at the
  bottom; running, asking, failed or pinned threads keep a project in place.
- Orchestrations: a shortcut for each thread with live subthreads, most
  urgent first, with its progress; finished ones go last.
- Each title starts with bb's own status glyph; a failed thread gets a Retry
  button.
- Rows are one line; a tinted PR icon appears only when a PR needs action.
- A ⚠ warns when another live thread works on the same branch or worktree.
- Each row shows its agent provider; hover for title, branch and age.
- Hover or focus a row for Archive and ⋯; Archive keeps bb's confirmation and
  Undo, and Cmd+Z or Ctrl+Z restores recently archived threads with children.
- Hover a running thread's spinner to stop it; on touch, use the row's menu.
- Provider subagents show a counter and status dot on the parent's row;
  hover for type, state, duration and tokens.
- Hold Ctrl (or Cmd on a Mac) to see each row's jump key.
- `bb thread-tree list` prints a thread's subagents from a terminal.

## Arranging the sidebar

Right-click a section header to remove it; the sliders icon beside the search
field brings it back, as well as Recent Activity, off by default. Drag a header,
or use Move up and Move down in its menu, to reorder sections.

## Settings

Thread Tree's settings hold the section switches, Recent Activity row counts,
which PRs Needs you lists, provider icon colour, the inactive-project window,
and switches for the subagent counters and the age label. Reduce motion, or the
system's reduced-motion preference, stops the sidebar animations and holds
spinners still.

## How it works

The list reads bb's own thread data. Subagents come from each thread's event
log on the bb server. PR checks and conflicts come from bb's GitHub PR Status
plugin through the environment machine's gh login, plus Thread Links for PRs
mentioned in the session; changes requested and ready to merge need the GitHub
Folder plugin. Folds, grouping and order are per client; settings are shared
by every client of the bb server.

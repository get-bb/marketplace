A sidebar thread list built around agent work: the threads an agent spawns nest
under it, and the subagents it runs inside its own session show on its row.

## What you get

- With the GitHub Folder plugin installed, its pull requests that need you sit
  at the top: review requests, changes requested, failing checks, conflicts,
  ready to merge. Snooze and customize change GitHub Folder's own settings.
  Without that plugin the section is not shown.
- Automations: each scheduled automation with its status dot and next run.
  Hover to run, pause or resume it; click to open its last run. It reads bb's
  own Automations plugin and hides itself when that plugin is off.
- Recent Activity: the most recently active threads, child threads included,
  newest first. Show more extends it.
- Threads grouped by Project, by Status (needs input, error, working, done) or
  not at all, with Pinned on top. Projects keep a fixed order you set by
  dragging their headers, or follow recent activity. The + on a project header
  starts a new thread there; on touch screens header icons show dimmed.
- Sort threads by last activity, creation date or status from the funnel icon
  beside the Threads heading. Creation date keeps rows in place as messages
  arrive. Set a global order, override it per folder, or choose Use global
  setting to restore inheritance. The Sort and Group menus stay open while you
  pick; click outside or press Escape to close.
- The Archived toggle shows archived threads in the same grouping and nesting.
- Each child thread sits under the thread that spawned it, at any depth, even
  in another project. A parent's status dot turns into a chevron on hover;
  click it to fold the subtree. A folded parent gets a line counting its whole
  subtree by state. The thread you have open and threads waiting for your
  input stay visible under the fold.
- A PR icon and number below the title show the branch's pull request:
  draft, open, merged or closed, plus checks and conflicts. Hover for details;
  click to open GitHub. With Thread Links installed, all PRs linked in the
  session's PRs share a scrolling row; parents omit child PRs. Branch status
  uses bb's GitHub PR Status plugin.
- A small icon on each row shows the thread's agent provider.
- Child threads are ordinary threads: open, message, pin, archive or split them
  with bb's own menu. Hovering a row swaps its age for Archive and the menu.
- Cmd+Z or Ctrl+Z restores recently archived threads and their children.
- Provider subagents show a counter and status dot on the parent's row;
  hover for type, state, duration and tokens. They cannot be messaged.
- A dot before each title shows the thread's state: blue running, green done,
  yellow needs input, red error with a Retry button, gray stopped.
- `bb thread-tree list` prints a thread's subagents from a terminal.

## Arranging the sidebar

Right-click the GitHub, Automations or Recent Activity header to remove it;
Sections at the top of the list brings it back. Drag a header, or use Move up
and Move down in its menu, to reorder sections. While you drag a section or a
project, the blocks fold to their headers, the others slide aside to show
where it lands, the list scrolls near its edges, and all reopens on drop.

## Settings

Settings → Installed plugins → Thread Tree holds the section switches, how many
Recent Activity rows show before and after Show more, and switches for the
provider icon, the subagent counters and the age label. Fold folders while
dragging can be turned off, and Reduce motion stops the folder, reorder and
hover animations.

## How it works

The list reads bb's own thread data. Subagents come from each thread's event
log, read on the bb server. PR status is supplied by bb’s GitHub PR Status
plugin, which queries GitHub through the environment machine’s gh login.
Folds, grouping and order are kept per client; the settings apply to every client of the bb server.

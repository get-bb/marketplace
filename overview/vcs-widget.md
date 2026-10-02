IntelliJ-style VCS popup, commit dialog and log, inside bb.

## What you get

- A branch button in every thread header, showing the current branch.
- A searchable popup: Favourites, Recent, Local and Remote branches with
  ahead/behind, gone and worktree badges, and the quick actions Update
  Project, Commit, Show Git Log, Fetch, Push, New Branch and Checkout Tag or
  Revision.
- The full per-branch context menu: Checkout, New Branch from, Checkout and
  Rebase onto the current branch, Checkout and Update, Compare with, Show
  Diff with Working Tree, Rebase, Merge, New Worktree from, Update, Push,
  Tracked Branch, Rename, Delete, favourites, copy.
- Fetch, pull and push in the background, with progress and Cancel, so a slow
  remote never hits bb's host-call deadline.
- A commit dialog as a panel tab: the working tree as a checklist whose
  checkbox is the staged state, a diff preview, message, Amend, Sign-off, Run
  Git hooks, Commit and Commit and Push, and a Discard that always asks
  first.
- Agent Commit and Agent Commit & Push, which run no git: they hand the
  commit to the agent in the thread, so the agent that wrote the code writes
  the message.
- A git log as a panel tab: virtualised rows with each commit's refs as
  badges, a branch and a message filter, a drawer with the files a commit
  changed and their diffs, and a context menu with Checkout Revision, New
  Branch from, Cherry-Pick, Revert, Reset and Compare.
- Panel tabs that compare two branches or a revision, or diff the working
  tree against a branch, in bb's own diff viewer.
- Command palette rows for the quick actions on thread routes.
- Live refresh: bb's sidebar follows a checkout, open popups refetch after
  actions, and changes made by an agent or a terminal reach the popup through
  bb's environment events and the host's file watch.

## How it works

Git runs only as an argv on the plugin's host worker, on the machine that
owns the worktree, never through a shell.

Every push, merge, rebase, delete,
worktree, detached checkout, amend, cherry-pick, revert, reset and discard
shows the exact command first, then runs that or refuses with a typed reason.

Force push exists only as `--force-with-lease` against the sha the dialog
showed.

Commit messages travel on git's stdin, and paths reach git only after
`--literal-pathspecs ... --`. Nothing mutates while the index is locked or a
merge or rebase is in progress; the popup offers Abort instead.

## For agents

`bb vcs-widget status | branches | log` and the `vcs_widget_status` tool read
the repository behind a thread, on the machine that owns the worktree.

Both
only read: no plugin command, flag or tool checks out, commits, pushes,
rebases or deletes anything, and a bundled skill says so. Checkout, commit
and push stay with the human at the popup, the Commit panel and the log.

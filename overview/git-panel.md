Every BB thread with a workspace gets a **Git worktree** tab beside the
conversation, so you can see and move your work without opening a terminal.

## What you get

- A status bar tinted by the worktree's state that offers one next step, not a
  wall of buttons: Commit when something is staged, Pull when behind, Push when
  ahead, Sync when the branch has diverged, Stage all when changes are unstaged,
  or "No new changes" when there is nothing to do.
- Commit uses BB's own commit feature, which writes the message for you.
- A branch pill that opens a picker with Local and Remote tabs, a search field,
  a button to create a branch off the current one, and a rename for the branch
  you are on.
- Changes and Staged tabs with one row per file: folder and filename, added and
  removed line counts, a stage or unstage button on hover, and the status letter
  you know from VS Code (M, A, U, D, R, and "!" for a conflict).
- Pull and push buttons carrying their incoming and outgoing commit counts,
  fetch, and a menu with Sync, Undo last commit, Stash changes and Pop latest
  stash.

## How it works

The panel runs plain `git` in the workspace directory, on the machine that owns
that workspace. It makes no network calls of its own and asks for no account,
API key or token: pulling and pushing is git talking to the remote your repo is
already configured for, with the credentials git already has.

## What it refuses to do

The destructive edges are closed off, not confirmed away:

- Switching branches is refused while the worktree is dirty — stage, commit or
  stash first.
- Sync rebases your commits onto the incoming ones; on a conflict it aborts the
  rebase and leaves the branch exactly as it was, for you to resolve.
- Undo last commit is a soft reset, so the changes stay staged. It is refused
  once the commit has been pushed, and on a repository's first commit.
- A stash that does not apply cleanly is kept, not dropped.

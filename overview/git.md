## Who it is for

People who work with BB agents on a repository and want to see what the agent changed, commit it, branch, and push — without leaving the thread.

## What you get

A right-side rail that stays open across threads. The top selectors pin a workspace (project source or thread checkout) and a repository inside it. Under them: the branch menu with local/remote branches and new-branch creation, a sync button showing `↑ahead ↓behind`, and five tabs.

**Changes** is the commit box over the staged/unstaged lists: stage, unstage, discard, each with hover actions and section-level "all" buttons, as a flat list or a folder tree. Clicking a file opens its diff as a tab in BB's built-in side panel (falling back to the rail's own drawer when the window has no side panel) — unified or split, whitespace-folded on demand, whole-file on demand.

**Graph** is one lane graph over every local branch, remote-tracking branch and tag with paging, and per-commit detail: files with `+n −n`, copy hash, and cherry-pick / revert / reset (soft, mixed, hard) / merge / rebase. Cherry-pick is only offered where git can apply it — a commit outside the current branch, not a merge commit, with a clean tree — and the git side refuses those cases too. Clicking a file there reads its diff inside that commit.

**History** is the checked-out branch's own commits as a linear list — `git log` scope, newest first with paging, search, per-commit detail and the same commit actions (cherry-pick, revert, reset, undo, rebase) as the Graph tab, just without lanes.

**File** takes a repo-relative path and lists every commit that touched that file, newest first with paging — the GitLens file-history view. Expand a commit to copy its hash or read its files (`+n −n`), and click one to read that file's diff inside that commit.

**Stash** holds the stashes of the pinned repository: push (optionally staged only), apply, pop, and drop, and each stash expands to its files.

Everything runs as git subprocesses on argv arrays in the plugin server, against the primary host only. Destructive steps confirm first; git's own error words stay on screen until dismissed.

## First step

Install Git, open a thread in a repository, and show the panel from the sidebar footer. Hover a changed file and press `+` to stage it, type a message, and commit. Then switch branches from the branch menu and come back — the panel follows the thread, not the other way around.

Comment on a thread's changes line by line, then send the comments to its agent, which fixes the code
and answers each one. It is diffity's review loop on your own working tree, inside bb.

## What you get

- A Review tab in each thread's side panel, one click away in the thread's header, with the diff of
  the thread's workspace: its uncommitted, staged or unstaged changes, the changes committed since the
  base branch, all changes since the base branch, one of the branch's commits, or a range such as
  main...feature. Split or unified, in bb's code theme, loading as you scroll, with Hide whitespace
  and an optional colour-blind palette.
- Any file: search the workspace for a file, in the diff or not, and comment on its lines.
- Comments on a line, a range of lines, a whole file or the whole diff, in Markdown, with an optional
  severity: must fix, suggestion, nit or question. Reply, edit, resolve, reopen or dismiss. Comments
  follow the code as it moves; one whose code changed is listed apart, with the code as it read then.
- Suggested changes you apply with one click, and Revert for a file's uncommitted change or some of
  its hunks.
- Viewed marks per file, shared with bb's own diff panel, that say when a file changed since you
  viewed it. Find across the diff, Go to a file or comment, and a palette command for every action.
- Send to agent: pick open comment threads, add a note, and send them to the thread under review,
  queued behind its current turn. The agent answers in each thread from its own chat, and the tab
  shows every answer as it arrives, or "No reply" with a link back to the thread.
- AI review, Summarize and Explain: an agent reviews or summarizes the diff, or explains a file or
  lines, in a thread under the one being reviewed that you can watch, and leaves its comments in the
  tab. Write @reviewer in a comment and the view's AI reviewer answers in the thread. Fix in a new
  thread sends the comments to a new thread with the agent you pick.
- GitHub pull request review: fetch a pull request without switching your checkout, answer its
  review threads (an agent's answers there come back as drafts you post), mark files Viewed in step
  with GitHub's own Viewed marks, and submit your comments as one review with the verdict you pick.
- A Reviews page listing every review with comments across projects, with the open count on its
  sidebar entry, and the count in each thread's Info tab.
- Ignore patterns for lockfiles and generated files, in the plugin's settings and in the workspace's
  own .diffityignore.

## How it works

The diff comes from bb's Git plugin, and the staged, unstaged and range views from git itself, both
on the machine the thread's workspace is on. Comments are stored by the plugin on your bb server, per
workspace and per view, so they survive closing the tab or bb. The agent answers through a
bb diff-review command the plugin teaches it with a skill, and only the thread the comments were sent
to can answer them.

## What it costs

Nothing beyond bb 0.48 or newer: no account, no service and nothing else to install. Fixes, reviews
and answers are made by agents in bb threads, on your own provider plans; AI runs start with Claude
Code unless you pick another provider.

## Limits

- The Review tab draws its own diff; bb's built-in diff panel has no comment hook.
- bb cannot make a thread read-only, so an AI run is only asked not to edit files; the tab lists any
  file that changed while it ran.
- It needs bb's Git plugin, which is on unless you turned it off.
- Pull request review needs the GitHub CLI, signed in, on the machine running bb.

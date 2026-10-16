Keep your project's issues beside the agent conversation. Airbender connects
your backlog to the work: choose an issue, start the agent, review the result,
and decide when to commit.

Issues stay in your tracker — beads or GitHub issues — with the requirements,
plans and decisions that the next agent needs.

## What you get

- **Your backlog inside BB.** An Airbender tab beside each conversation and
  on the New thread screen, with issues grouped into in progress, ready,
  blocked and closed. Filter by priority, type or category.
- **Quick issue capture.** The new-issue field stays visible. Type
  `Fix login redirect #bug #p1 $ux` to set the type, priority and category.
- **A clear next step.** The current issue is highlighted in the tab.
  Its status and review buttons also appear around the message box.
- **Reviews that fit the work.** Standard workflow guides the agent through
  definition, planning, implementation and review. Small issues reach you
  once, at the end; larger ones stop for earlier approvals. Simple workflow
  leaves you to direct the agent yourself.
- **Parallel work.** Start an issue on its own branch or in a worktree with
  a separate conversation.
- **Epics and Autopilot.** Organize work into sub-issues. Autopilot starts
  an epic's ready issues one after another, with reviews still yours.
- **A lasting record.** Read descriptions, acceptance criteria, plans,
  notes and comments without leaving the conversation. Agents record
  decisions on the issue as they work.

## How it works

The tab and agents use `bend` to read and update the same tracker.
Airbender follows changes made outside the tab and shows sync problems.

On Standard workflow, accepting finished work leads to a commit, or a
commit and merge. The agent performs the chosen action; the issue closes
when that step finishes.

## Getting started

You need BB 0.44 or later on the machine that holds the repository.
On Linux and macOS, on Intel/AMD or ARM64, setup installs a precompiled
`bend` from the matching GitHub release after checking its SHA-256 checksum.
Go is not required; the download needs `curl` and `sha256sum` or `shasum`.
Other platforms can build from source with Go 1.24 or later.

Open the Airbender tab and choose beads or GitHub issues. Setup offers the
missing tools and repository instructions in a terminal you can watch.
Folders on another machine are not yet supported.

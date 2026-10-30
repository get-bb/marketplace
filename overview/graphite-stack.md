Review and operate local Graphite stacks beside the BB threads that work on
them.

## What you get

- A **Graphite** tab on each thread with the stack rail, each layer's true
  Graphite parent, and only that layer's changes in the inline review diff.
- A **Graphite stacks** page that lists every Graphite repository in a project.
- Local inline comments with resolve, outdated detection, and an optional grouped send to a linked BB thread.
- Optional GitHub PR review: replies, resolve, and pending reviews submitted as
  Comment, Approve, or Request changes.
- Previewed `gt` actions: create, track, restack, sync, draft submit, and
  continue or abort a real in-progress rebase.

## How it works

The plugin runs `gt`, `git`, and `gh` on the machine that owns each
environment, with that machine's own configuration. It reads the stack with
`gt state` and never writes Graphite's files. Local stacks work without a PR,
GitHub authentication, or a remote. Notes, links, and drafts stay in the
plugin's storage on the BB server until the user sends selected comments.

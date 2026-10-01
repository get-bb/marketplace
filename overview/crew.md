## A team that stays

A Graph Studio flow ends; a crew stays. You describe the team once in a
`crew.yaml` — groups of members, each with a fixed address such as
`dev-owner@pair`, its own provider and model, a role and permissions — and
`bb crew apply` reconciles the file against BB threads. The lead's thread is
the parent, every member is a child thread in the sidebar. Change the file and
apply again: only the difference is applied, and `bb crew plan` shows it first.

## Members talk to each other

Members message each other by address, share a channel and a work queue, and
hand off work with a subject such as a task key. Writing members get their own
worktree; readers share the crew's. A member that waits for you shows up in
**Needs you** with its question.

## Several crews in one project

Crews in the same project coordinate through their leads, BB Tasks and the base
branch. By default only leads may message another crew; `open` and `none`
widen or close that. A lead can wait for another crew's work with `waitsFor`
and is woken exactly once when it is merged. A reply chain stops after a step
limit, so two crews cannot ping-pong forever.

## See who works

**Crews** in the sidebar opens a project overview: every crew with its branch,
members and state, lines for lead-to-lead traffic, and a project feed that can
show cross-crew messages only. Each crew has a topology view, a table with the
feed, and an editor for the crew file with a preview identical to
`bb crew plan` and one Apply button. `::crew{crew="…"}` renders a live card in
chat.

## Merge requests inside the crew

A member delivers its work as a merge request. You approve or reject it, or an
`integrator` member merges it after the crew's checks pass; a rebase conflict
is reported back to the member instead of being forced.

## From the command line

```sh
bb crew templates          # pair, trio, research
bb crew plan trio
bb crew apply crew.yaml
bb crew ps
bb crew needs
bb crew send dev-impl@trio "Start with step 1" --subject TASK-1
bb crew stop trio
```

Agents inside a crew use the same functions as tools, for example `crew_send`,
`crew_peers` and `crew_directory`. Graph Studio can run a step on a crew member
through its `member` node.

## Requirements and limits

Requires BB 0.44 or later and Plugin SDK 0.5.29 or later. No extra service or
account; members run on the providers BB is already configured with.

Merge, rebase and checks run git on the machine BB runs on. Worktrees on other
hosts are refused for integration with a clear reason; support for remote hosts
is planned. BB has no read-only permission mode, so `permissions: ask` runs as
accept-edits and a checker stays read-only by its role.

Run a Gas Town inside bb: one Mayor thread coordinates polecat worker
threads across every project you register as a rig.

The Mayor is an ordinary visible BB thread in a sidebar section named **Town**.
Talk to it like any other thread. It slings each self-contained work item to a
polecat — a worker thread in its own managed worktree, running on the model
tier the work deserves (five tiers, from trivial lookups to adversarial
reviews). Polecats are ordinary visible threads too: watch them live, read
their transcripts, or take over mid-turn.

Polecats never escape their worktree. They report **ready** evidence or
**blocked** with a recommendation; only the Mayor decides when work is
verified and complete. Anything outside a worktree — pushes, merges, external
services, main branches — flows polecat → Mayor → owner.

A deterministic patrol replaces fragile schedulers: a background supervisor
watches thread lifecycle events, reconciles live state, detects stalls, and
delivers alerts to the Mayor through a durable outbox that retries after
transient failures. A stuck polecat gets surfaced before you ever think to
check on it.

Finished work flows through a refinery before it lands. The Mayor gathers
deterministic git evidence from the polecat's worktree, can commission an
independent **read-only review** in that same worktree (repair passes need
its explicit authorization), and then delivers: uncommitted work committed,
the branch pushed to the repo's origin, and the bead moved to **review** in
the ledger. The merge decision stays where it belongs — with you.

Everything the town does is recorded: work in the **Beads** ledger (convoys
as epics, rig routing as labels, reports as comments), and the day's story
in the Town Hall activity feed. Install Beads (`bd`) on the machine running
bb and the town keeps its memory across sessions, reloads, and restarts.

Work runs across projects: register any BB project as a rig and the Mayor can
sling into it, each polecat isolated in its own worktree on its own branch.
Drive everything from the thread UI, the `bb madmax` CLI, or agent tools the
Mayor and polecats carry automatically.

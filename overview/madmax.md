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

Finished work flows through a refinery before it lands. The polecat requests
an adversarial review of its own work in its own worktree and fixes the
findings until the verdict is ship; the Mayor gathers deterministic git
evidence and delivers — uncommitted work committed, the branch pushed to
the repo's origin, the bead moved to **review** in the ledger. The town
then watches the pull request: when the forge reports it merged, the bead
closes and the thread is completed and archived on its own. The merge decision
itself stays where it belongs — with you.

Everything the town does is recorded: work in the **Beads** ledger (convoys
as epics, rig routing as labels, reports as comments), and the day's story
in the Town Hall activity feed. Install Beads (`bd`) on the machine running
bb and the town keeps its memory across sessions, reloads, and restarts.

Work runs across projects: register any BB project as a rig and the Mayor can
sling into it, each polecat isolated in its own worktree on its own branch.
Drive everything from the thread UI, the `bb madmax` CLI, or agent tools the
Mayor and polecats carry automatically.

GitHub, GitLab, and Gitea/Forgejo are all first-class. Each rig's forge is
detected from its remote — github.com and gitlab.com just work, and a
homelab Gitea gets one question and one answer. Pull-request automation
(draft PRs, reviews, merged-PR close-out) uses the matching CLI. A rig with
no usable forge CLI is never broken: polecats push branches and report, and
you open the request.

Each town also carries its own personality: a `town.md` standing-rules file
the Mayor maintains, and role-scoped skills (`skills/<role>/`) injected at
spawn time. Rigs can carry their own town.md too.

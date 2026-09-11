## What you get

A capacity dashboard, a size-ranked file browser, and a cleanup engine that
tells you what it will free before it frees it.

Reclaim indexes your whole volume — every file, no scan cap — then keeps the
directory totals so browsing is instant instead of re-walking the disk on every
click. A full scan of a 500 GB volume with 6 million files takes about 90
seconds and runs in the background.

## Finding the space

The overview ranks the directories where size actually accumulates, filtering
out the pass-through parents that make a naive "largest folders" list useless.
The tree browser expands in place, so you keep the whole path in view while you
drill into it. Every row carries a real subtree total.

Numbers come from allocated blocks with hardlinks counted once, so they agree
with `du` and with what the operating system reports.

## Getting it back

Reclaim groups reclaimable space by what it is and what losing it costs:

- **Safe** — package-manager download caches. Costs one slower install.
- **Rebuildable** — build output, `node_modules` in idle projects, Xcode
  derived data, Docker build cache. Costs a rebuild.
- **Careful** — the Trash, unused Docker volumes. Never preselected.

Docker gets particular attention. On macOS and Windows the daemon runs in a VM
whose disk is one large sparse file, so pruning frees space inside the VM while
your actual free space does not move. Reclaim measures that file directly and
can compact it, reporting the bytes the host got back rather than an estimate.

## Watching for trouble

A guard checks capacity every minute and grades it on percent-full and absolute
free space together, because 90% of a 4 TB array still leaves 400 GB while 4 GB
free is an emergency at any percentage.

When the disk is under pressure it can clean up on its own — bounded to the
risk tier you authorize — or start a BB thread and hand the problem to an agent
with the full report. Both are off until you turn them on. Every threshold
crossing and automatic action is logged where you can read it.

## Agents

Reclaim registers `reclaim_status`, `reclaim_plan` and `reclaim_apply` in every
BB thread, plus a skill, so an agent hitting a full disk mid-build can diagnose
and fix it without being told the plugin exists. While the disk is under
pressure it also injects the current numbers into every thread; below the
threshold it contributes nothing.

## What it will not delete

Deletion only happens inside roots you authorize, and a built-in list refuses
your home directory, `~/Documents`, `~/.ssh`, `/System` and similar even when a
root would cover them. Paths are resolved before they are checked, so a symlink
inside an authorized root that points outside it is refused.

The apply step never accepts a path. It takes identifiers Reclaim minted while
building a plan and re-authorizes each one immediately before removal — the
panel, the `bb reclaim` command, and an agent all pass through the same gate.
Nothing inside a macOS application bundle is ever a candidate.

## Requirements

macOS or Linux. No account, service, or separate install. Docker features need
a local Docker install and appear as unavailable without one. On a machine with
APFS clones the indexed total can exceed the volume's capacity, because a clone
reports a full allocation per copy; Reclaim labels that rather than hiding it.

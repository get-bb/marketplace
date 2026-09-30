Trace the relationship between your registered Git projects and the BB threads working in them, without changing any checkout.

## What you get

- One pannable canvas for repositories, local branches, worktrees, and attached BB threads, with search and focus controls that dim rather than hide the rest.
- A separate group for personal or unmatched BB threads without a registered Git checkout. The graph does not invent repository links or Git branch ancestry.
- Active and archived thread markers, plus branch-only, detached, and prunable review signals. These are prompts to inspect, not instructions to delete.
- On-demand, read-only Git evidence for a selected branch or worktree: working-tree changes, upstream divergence, last commit, and local merge status. A best-effort GitHub PR lookup is available when `gh` is installed and authenticated.

## Requirements and limits

Install Branch Graph separately in BB. It scans registered Git project sources on their BB hosts; no external service is required for the graph itself. GitHub PR lookup needs the optional `gh` CLI and GitHub authentication. A worktree without a BB thread is not necessarily unused. Refresh requests a new snapshot; the page is not a live agent-activity feed. The plugin never creates, switches, prunes, or removes branches or worktrees.

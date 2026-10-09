Run a firstmate-style agent crew without leaving BB.
Install, then run `/captain` in any thread, which calls `deck` and is the setup.
`deck` titles an untitled thread `Captain · <project>` and pins it so a new
`/captain` row does not vanish from the sidebar.

## What you get

- `/captain` plus `/afk` `/ahoy` `/bearings` `/quiet` `/stow` skills.
- `bb firstmate` + `firstmate_*` tools (full CLI surface, including queue,
  memory, secondmate, quiet, forget). `tell` is a doorbell (`queue-if-active`);
  `interrupt` hard-stops. `watch` uses `threads.wait`.
- Event supervision: `thread.idle` / `thread.failed` / `turn.failed` /
  `interaction.pending`. Stuck checker still samples output. Crews get no
  dispatch tools.
- Real firstmate `bin/` via `bb firstmate fm` after `init --real`. BB is the
  runtime backend (`FM_BACKEND=bb`); scripts are not rewritten in TypeScript.
  Native `dispatch` writes `state/<id>.meta` so those scripts see Fleet crews.
- Fleet sidebar board + thread-header chip + `@crew` mentions.

Parent permission is a ceiling. Ship crews default to an isolated worktree.
Merge is PR (green + mergeable) or local-only ff-only.

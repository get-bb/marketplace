## What you get

Beads is a dependency-aware issue tracker built for AI coding agents, and this
plugin puts it inside BB. Your agent keeps a persistent, structured plan in the
repo — epics, tasks, dependencies — that survives context compaction and new
sessions, instead of a markdown plan that drifts out of date.

- A **beads** agent tool available in every thread. The agent runs the
  `bd` CLI in the thread's own environment checkout, on the machine that
  checkout lives on.
- A **`bb beads` CLI** for the same passthrough from your shell, plus
  `bb beads check` to verify the `bd` binary is reachable.
- A **beads skill** injected into agent threads that teaches the workflow:
  run `bd prime` for the session protocol, pick work with `bd ready`, create
  work as children of an epic, set status to in_progress before starting, and
  close with a comment when done.

## How it works

The plugin registers one agent tool and one CLI command. Both spawn the `bd`
binary through a full-trust BB host worker with bounded output and timeouts,
running in the thread's environment checkout — so beads operates on the same
repo the agent is editing. Commands accept `--json` for structured output when
the agent needs to parse results.

## Requirements

- The `bd` CLI from the beads project, installed separately on the BB host
  machine: `brew tap steveyegge/beads && brew install bd` on macOS/Linux, or
  see the installation guide. If `bd` is not on PATH, set its location with
  `bb plugin config beads`.
- Beads initialized in the repository (`bd init`), or ask the agent to run
  `beads({ args: ["init", "--skip-agents", "--non-interactive"] })`.

Issue data lives in a Dolt database under `.beads/` in the repo, versioned and
syncable across machines with `bd dolt push` and `bd dolt pull`.

## Links

- Beads documentation: https://beads.gascity.com
- bd CLI installation: https://beads.gascity.com/getting-started/installation
- Plugin source: https://github.com/Jehu/bb-plugin-beads

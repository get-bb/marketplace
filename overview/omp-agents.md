Hand a task to one of your OMP subagents by naming it in the thread. Type `@`
in the composer, pick a row under **OMP agents**, and the pill expands at send
time into agent-only context naming the agent, its specialization, its tools
and model, its definition file, and the `task` call that delegates to it.

## What you get

- **`@` mentions** for every OMP task agent visible to the workspace. Matching
  is substring, subsequence, and token-based, so `jns6`, `jns65`, and `jns 65`
  all find `jns65-agent`.
- **An OMP agents page** in the sidebar listing each agent with its scope,
  tools, model, and definition path.
- **`bb omp-agents list`** for the same list from a shell, with `--json` for the
  full records and the directories that were searched.

## Where agents come from

Discovery follows OMP's own precedence, so a name defined higher up shadows the
same name below it.

- **Project** — the nearest `.omp/agents/*.md`, walking up from the workspace.
- **User** — `$PI_CODING_AGENT_DIR/agents`, then `~/.omp/agent/agents`, or the
  active `OMP_PROFILE`'s directory.
- **Extra** — absolute directories you list in the plugin's settings.

Every read goes through BB's own file API on the machine running BB, so a
symlinked agent directory resolves to its real path. OMP's bundled agents have
no file on disk, so run `omp agents unpack` to give them definitions and make
them appear here.

## Offered only where it can run

These subagents are spawned by the `task` tool inside OMP, so the menu appears
only on an OMP-backed surface. On a Claude, Codex, or Pi thread it stays empty,
and a message that still carries an OMP mention is refused with an error naming
the provider rather than reaching the model as an instruction it cannot follow.
Pi is a separate tool from OMP, despite the similar name.

## Settings

- **Extra agent directories** — absolute paths, one per line, searched after the
  project and user scopes.
- **Mention results** — how many agents the menu lists at once.
- **Providers that run OMP** — which provider ids get the menu.

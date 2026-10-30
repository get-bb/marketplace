## What you get

BB draws each OMP `task` call as one "Ran tool" row, while OMP keeps a full
transcript for every subagent on disk. This plugin shows those files in BB.

- **A strip under every spawn.** One line per agent: status, name, and what it
  is doing now. Click an agent to open its history in the side panel.
- **A roster panel.** The `N subagents` chip opens every agent of the thread as
  a tree with its status, model, tools, tokens, cost, and latest action, plus
  totals and a status filter. Open an agent to read its transcript, final
  output, or patch.
- **Messaging.** A box in the panel sends a message to the OMP session: it
  starts a turn when the thread is idle and steers it when it is running.
- **Status outside the thread.** The sidebar row shows running or failed
  subagents, and a toast reports an agent that fails.
- **Commands** in the command palette and the thread actions menu, and an
  **OMP sessions page** with the subagent count of each session.
- **A `bb omp-subagents` command**, a skill, and two read-only agent tools.

## How it works

The plugin reads and watches `~/.omp/agent/sessions` on the machine that runs
the thread. A status comes from each transcript: running, finished, failed,
interrupted, or partial for an agent that stopped without a clean end.

## Requirements

- BB 0.47 or newer.
- Threads on the `omp` provider, with the `omp` CLI on the thread's machine.

## Limits

- Messages go to the OMP main agent, which forwards a message meant for one
  subagent. The plugin does not kill or revive agents.
- The strip reads BB's internal timeline code, which is not a public API. A BB
  update can remove the strip; the timeline itself is not affected.
- Sidebar status and the row menu item show in BB's own thread list, not in
  thread list plugins that draw their own rows.

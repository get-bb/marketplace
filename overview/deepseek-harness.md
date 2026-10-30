# DeepSeek Harness

Run DeepSeek Harness threads in bb, with its modes, its subagents, and its slash
commands.

## What you get

- **DeepSeek Harness as a provider.** dsh's ACP app is wired in as `acp-deepseek`, so a
  dsh thread behaves like any other bb thread: streaming, tool calls, reasoning effort,
  context usage, cancel.
- **Standard, Creator, and Minimal modes.** The New thread composer picks which dsh
  composition boots. Creator adds Cordis runtime inspection, the present tool, and the
  plugin manager; Minimal keeps only file access, a shell, and compaction. dsh locks the
  composition on a session's first turn, so a started thread shows a read-only badge
  naming the mode it booted with instead of a picker that could not apply.
- **Subagent visibility.** dsh runs delegated agents inside the thread's own session and
  says nothing about them over ACP, so bb normally shows one generic tool row per child.
  The plugin reads the state dsh already keeps for its own UI: a chip beside the model
  picker shows `running/total` and turns green while a child is live, and opening it
  lists every child with its status, elapsed time, tokens, current tool call, recent
  steps, and final message.
- **Harness commands.** dsh's own slash-command registry (`/compact`, `/goal`,
  `/feedback`) is exposed to the agent through a bundled dsh plugin, and a bare command
  line typed into bb runs directly without a model turn.
- **Session continuity.** Reopening a thread continues its dsh session with the earlier
  context; the ACP patch bridges `session/load` onto dsh's resume path so bb's stable
  adapter can restore sessions.

## How it works

The plugin provisions three dsh profiles and a launcher that boots the one matching the
mode you picked. It installs a small dsh plugin for the command bridge and applies a
patch to dsh's ACP app so the command surface is reachable and sessions can be restored
by ACP clients that only know `session/load`. Copies of the patched pieces live outside
the dsh package, so the launcher re-applies them after a dsh upgrade; one command still
sets everything up on a new machine.

Subagent state comes from dsh's projection cache and the newest frame of each child's
session log, so no ACP extension is involved and the provider stays standard. Those are
dsh implementation details rather than a published API: if an upgrade renames them the
roster degrades to a count instead of failing the thread.

## Requirements

DeepSeek Harness installed globally (`npm i -g @deepseek-ai/dsh`) and model credentials
for whichever route you use. Threads need a normal writable project directory; a drive
root is rejected by dsh's filesystem layer.

## For agents

`bb deepseek-harness status` reports what is installed, `install` repairs it, `mode`
shows or changes the composition new threads use, and `subagents [thread-id]` prints the
children a thread deployed with their live status.

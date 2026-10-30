## A timeline for every turn

Open a thread's **Trace** tab, or use **Trace this turn** on any chat message, to see the turn as a timeline: every command, tool call, subagent, and spawned thread gets its own row, nested under the subagent that ran it. Above it, one bar splits the turn into waiting on you, starting, compaction, tools, subagents, writing, thinking, and model time, so a slow turn shows whether the agent, a tool, or a question to you held it up. A running turn grows live. Zoom with the minimap or Ctrl/⌘ + scroll, filter spans by name, hide calls under a second, and step through spans from the keyboard.

Select a span for its exit code, error, output, and arguments. **Show in chat** jumps to the reply that followed it, and **Open trace** opens the trace of a thread the agent spawned.

## Every thread at once

The **Traces** page in the sidebar lists every thread by project, with spawned threads under the thread that spawned them. **All threads** compares your most recent threads by active time, turns, calls, and errors, with a bar of where each one's time went, and **Most time** sorts the slowest to the top. Each thread, turn, and comparison has its own link, so the browser's back button walks through them.

## Patterns and comparisons

**Commands** groups calls by what they ran, such as `pnpm test`, `git diff`, or `node bench.mjs`, with runs, total, average, slowest, and failures, for one thread or a project's 20 most recent threads. **Compare** puts two turns side by side, phase by phase and call by call, to check a change such as a faster test script.

## Export

Copy or download a turn as OpenTelemetry (OTLP/JSON) or a standalone HTML snapshot, or send it to an OTLP/HTTP collector such as Jaeger, Grafana Tempo, Honeycomb, or Langfuse. Set the collector in the plugin's settings to send each turn as it finishes.

## Command line and agents

```sh
bb agent-traces show --turn latest   # phases, slowest calls, failures
bb agent-traces commands --project   # calls across the project's recent threads
bb agent-traces compare 2 4          # turn 2 against turn 4
bb agent-traces export --turn 4 --format otlp
```

The `agent_traces` tool gives agents the same answers, so you can ask one why its last turn was slow.

## Data

Traces come from each thread's own event history on the bb server, read when you open them. Nothing leaves the server unless you set an OpenTelemetry collector. bb records no cost for Claude Code, Codex, or OpenCode threads, so none is shown, and thinking time is only as visible as each provider streams it. Requires bb 0.47 or newer.

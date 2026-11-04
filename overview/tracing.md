## A trace under every answer

Each answer gets a chip with the turn's duration and tool count: a live dot while the agent works, red when a step failed. Click it to open the turn on one time grid. Thinking, responses, shell commands, tool calls, file reads and changes, and waits each get their own row and color, and an overview ribbon at the top shows the whole turn. Hover a step to light up its place on the ribbon, search steps with Cmd+F, and replay the turn with a moving playhead at 1 to 25 times speed.

Select a step to see what it actually did: the full command with its exit code and output, a tool's arguments and result, a file's diff, or the thinking text, each with Copy.

## The silences, explained

bb only records a tool call once the model has finished writing it, so a turn is full of gaps where nothing seems to happen. Tracing names them:

- **Generating** shows what the model had just read, what it wrote next, and roughly how many tokens that was. A 50-second gap before a 30 ms file change is the model writing that file.
- **API retries** appears when the provider's API calls failed and were retried, with the time to the first failure and each backoff. Four minutes of silence can turn out to be six failed requests.
- **Queued** marks time a message waited before its turn started.

## Tokens

Each turn records what it spent, split into cache reads, cache writes, uncached input and output, with the cache hit rate. Context fill is shown separately, so the 500k tokens in the window are not mistaken for the cost of the turn.

## All threads at once

The **Tracing** page in the sidebar sums the last hour, day or week: turn time p50 and p95, tool failures, thinking time and token spend, the slowest kinds of steps, and the recent turns across threads, each one click from its trace. Sparklines show the bb server's memory, CPU and event-loop delay.

## Data and privacy

Spans are written as NDJSON to the plugin's own data folder on the bb server, in the format OpenBot uses for its trace logs, and rotate at 5 MB. By default a span keeps only program and tool names; commands, output and diffs are read from the thread's own history when you open a step and are never copied. Nothing leaves the bb server.

## For agents and the terminal

`bb tracing summary`, `turns`, `tail` and `resources` answer the same questions from a terminal, and a bundled skill teaches agents to use them when you ask why a turn was slow.

## Requirements

bb 0.48 or newer. Turns are traced from installation on; token spend is recorded as each turn ends.

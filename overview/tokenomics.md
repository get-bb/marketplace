## What you get

A sparkline and token total in **each thread's header**. Click it for the thread's summary: tokens over time, minutes per turn, and the three turns that used the most. Hover a spike to see which of your messages caused it.

A **context meter above the composer** once a thread's context passes 300K tokens. It turns red past 550K. Every model call reads the whole context again, so at 500K a turn of 40 calls costs 20M tokens. **Compact** asks bb to compact the thread. The sidebar counts these threads in amber and red, so you can find them without opening each one.

A **Tokenomics page** in the sidebar. It charts tokens per hour over the past day or three days, or per day over the past week, split into new input, cache reads, and output. **Where turn time goes** splits turns into the model's time, tools, and waiting on you, and names the slowest shell commands. The thread list ranks threads by tokens, with each one's context size, a sparkline, and a dot per turn showing its length.

## For scripts and agents

`bb tokenomics threads` lists each thread's tokens, turns, context, turn times, and slowest shell commands, sorted by tokens, time, or context. `bb tokenomics commands` lists the shell commands that took the most time across all threads. Add `--json` to either, so an agent can find expensive threads without reading their transcripts.

## How it counts

bb deletes a thread's older usage events once it has a few hundred newer ones, so Tokenomics copies each event into its own database as it arrives. Turns bb deleted before you installed it can't be recovered, and the page says when a period starts before recording began.

Claude Code subagents report no usage to bb. Tokenomics reads their transcripts on the machine bb runs on and adds their tokens to the thread that ran them.

## Settings

Change the meter's thresholds with `bb plugin config tokenomics set contextWarningAt 300K` and `bb plugin config tokenomics set contextErrorAt 550K`.

## Where it's going

The goal is to weigh each thread's cost against the business value of the work it did. Tokenomics covers the cost today. It doesn't record what a thread produced, so the weighing is up to you.

## Requirements

- Works with any provider that reports token usage to bb.
- Counts tokens, not dollars. No cost estimates or quota view.
- Counts subagent tokens only for Claude Code threads that ran on the same machine as bb.
- No account or outside service.

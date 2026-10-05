Move your T3 Code threads into bb without losing the conversation or the agent's context.

## What you get

- Every selected T3 thread appears in the matching bb project with its messages, reasoning, tool calls, plans, and original dates.
- A follow-up message in bb continues the conversation with the agent's full context, for both Claude Code and Codex threads.
- Settled T3 threads can come over archived, and T3 projects with nothing to import can still become bb projects.

## How it works

Run `bb t3-import preview` to see which threads would be imported and which bb projects they land in. Settled threads are left out unless you add `--archive-settled` or `--include-settled`. Nothing changes until `bb t3-import run --yes`, which backs up the bb database first and skips any thread it has already imported.

## Requirements

T3 Code, Claude Code or Codex, and bb must run on the same computer. This release supports bb 0.45 and writes threads directly to the bb database, checking its tables before every run.

## What you get

- **Tokens in each thread's header**: a sparkline of the thread's tokens over time, with its past day and lifetime totals. Click it to see which of your messages used the most tokens and time.
- **A context meter above the composer** once a thread's context passes 300K tokens, red past 550K, with a **Compact** button. Every model call reads the whole context again, so a large context makes every turn expensive.
- **Your session in the title bar**: a spark chart of its tokens and rings for the session and the week, amber or red once either is headed for its limit. Hover it for the limits and the past day's chart.
- **A Tokenomics page** with each usage limit and where it lands at the current pace, tokens by hour or day, where turn time went, and the threads that used the most.

## How it works

Tokenomics copies each usage event into its own database as bb records it, starting when you install it, and reads Claude Code subagent transcripts from disk. It reads your usage limits from bb every five minutes. It counts tokens, not dollars.

## For agents

`bb tokenomics threads` and `bb tokenomics commands` print the same numbers, with `--json`, so an agent can find expensive threads without reading their transcripts.

## Requirements

bb 0.43 or later, and a provider that reports token usage to bb. Usage limits need one that reports them, such as Claude Code or Codex. No account or outside service.

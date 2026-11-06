## What you get

- **Your plan limits first.** A calm page that only turns amber or red when a window needs you. The session (5-hour) and weekly windows, plus any per-model weekly
  window your plan has: % left, when each resets, and where you will land at the current pace
  ("On pace to use 31% before it resets", or how long until the limit is hit). A plain verdict
  tells you whether there is room for a big task now, or whether to ease off for the rest of
  the week. The live burn rate and the cost of the current 5-hour block sit beside it.
- **Spend by day.** A daily cost or token chart for today, 7, 30 or 90 days, or all time, with
  a hover readout, and an activity calendar where a click opens that day.
- **Spend by session.** Every session with its title and project, cost and tokens, sorted by
  cost or recency and searchable. Open one to see its models and its cost by token type; a
  bb thread's own session opens its thread.
- **Spend by model.** Each model's cost, share and tokens. Click a model to filter the whole
  page to it.
- **Every agent CLI you use.** Pick one or several providers from the header (Claude Code,
  Codex, Gemini CLI, OpenCode, Copilot CLI and the other CLIs ccusage reads). With several on,
  each provider gets its own colour: one line per provider on the daily chart, and its models in
  that colour in every breakdown. Providers with no usage in the range are listed, and your
  choice is remembered.
- **Totals that add up.** Processed, cached and uncached input, output, and what caching saved,
  with the cost split into input, cache writes, cache reads and output.

## How it works

Usage comes from [ccusage](https://ccusage.com), pinned to one release and run offline as its
native binary: it reads the local logs your agent CLIs already write, so nothing about your usage
leaves your machine. On first use the plugin downloads that binary once from the npm registry and
checks it against a pinned checksum before running it. Costs are estimates at API list prices, including the
higher price of one-hour cache writes.

Plan limits come from Anthropic's usage endpoint, using the sign-in Claude Code already stored
on your Mac (Keychain, then `~/.claude/.credentials.json`). The token stays in bb's server: it
is never sent to the page, logged, refreshed or written. If that check fails, the plugin asks
bb's built-in usage plugin instead.

Session titles and projects for Claude Code are read from each transcript's first and last
lines. Everything is cached for a minute, and the page reads again when you press refresh.

## Requirements

- bb 0.48 or later, on macOS, Linux or Windows.
- Plan limits need Claude Code signed in to a Claude subscription on the same machine; on
  macOS, the first read may ask to allow access to Claude Code's Keychain item.
- Usage for other agents needs their CLI's local logs on the machine that runs bb.

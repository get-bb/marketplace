See whole-turn prompt-cache reads, writes, and estimated time left
directly above each thread's composer. Expand the right-aligned Cache summary
for rounded per-request sums, first-request cache use, and cost estimates. The context-card layout includes
the same data in a Prompt cache section.

## Cache estimates

The countdown updates locally every second. Green means the estimated deadline
is in the future; red means it has passed. These are estimates, not a live cache
status check. For Codex and Central Codex, missing expiry uses a visibly marked
30-minute assumption when cache activity was reported. Other missing telemetry
stays unknown. Reports can aggregate several model requests in one turn.

## Session history and costs

Open session statistics from the Cache panel or saved turn details from the
Cache marker beside an assistant reply. Local statistics retain token usage,
cache reads/writes, estimated costs, and separate keepalive totals; missing
telemetry remains visible. The statistics database does not store prompts or replies.

Codex, Central Codex, Claude Code, and the separately installed Claude Code
Telemetry provider use provider-specific Standard API reference prices. These
are estimates, not subscription charges. Claude Code Telemetry exposes individual
requests; native Claude Code reports turn aggregates. Retained BB events can be
backfilled, but usage missing from the provider/history cannot be recovered.

## Optional keepalive

Use the Keepalive commands in BB’s palette (Cmd/Ctrl+Shift+P) for direct
control without invoking the LLM. Status and action results appear as notifications.

Use the expanded Cache panel, Prompt cache context card, Cache Watch page,
`/keepalive start|stop|status`, or `bb cache-watch` to manage paid keepalive for a
selected session and a limited duration. Pings run five minutes before estimated
expiry; unknown or elapsed expiry waits for fresh telemetry. No watch starts automatically.
Keepalive sends ordinary visible turns asking the agent to reply OK. It can
cost more than recreating a cache and cannot guarantee a cache hit or savings.
Active threads are skipped; stop cancels future and deferred plugin pings.

## Requirements

Requires BB 0.48 or later with Plugin SDK 0.6.104 or later and an existing
configured agent provider. No separate API key is needed. Provider access and
ordinary agent usage remain subject to that provider's billing or allowance.
This plugin has no native silent-prewarm integration.

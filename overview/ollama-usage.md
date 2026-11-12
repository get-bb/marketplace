## What you get

BB's Provider usage view knows about the OpenCode Go subscription, Claude Code
and Kimi Code. An Ollama Cloud plan has no source there, so the panel shows
nothing about it even though every agent run spends from that pool.

This plugin adds the missing source. The Ollama Cloud row shows the monthly
credit pool as a dollar window: how much of the allowance the billing period has
consumed, the money left, and the date the pool resets. A plan still on the old
session and weekly limits appears as the same windows that plan actually uses.

## What it reads

Ollama's own API answers two questions and the plugin asks both: `/api/balance`
for the included pool and the purchased credits, and `/api/usage` for spend and
request counts over the last 24 hours, week or month, with a per-model
breakdown.

## Command

`bb ollama-usage show [--host <id>] [--range 24h|7d|30d] [--json]` prints the
same numbers in a terminal: the percentage and money of the pool, the reset
date, purchased credits, spend for the range and the models that caused it.
`--json` emits the full reading for a script.

## Requirements

An Ollama Cloud account and an API key on the host: either `OLLAMA_API_KEY`, or
the Ollama sign-in that OpenCode already stores. The key is never logged or
shown, and the only host it is sent to is ollama.com. bb 0.49 or newer, and the
opencode ACP provider enabled: with no such provider no model spends credits, so
the row is not advertised at all.

## What it does not do

The plugin does not show concurrency limits, because the API does not expose the
number of in-flight requests. It does not manage the plan, buy credits or switch
models — it reports what Ollama reports and nothing more.

## What you get

- Background pre-expiry compaction for idle threads whose context meets your token threshold (default `100,000` tokens), scheduled `3` minutes before the prompt cache expires.
- Native compaction (`threads.compact`) for **Claude Code** and **Pi**, reading exact `promptCacheTtlMs` values from thread token-usage events or BB's `compactionOfferAt` field.
- Slash-command compaction (`/compact`) for **Antigravity CLI** (`antigravity-cli`) using a configurable fallback cache TTL, with turn tracking in SQLite so the compaction turn never retriggers itself.
- A live schedule section in **Settings → Cache Compact** showing countdowns, token counts, provider methods, one-click **Compact now**, per-thread **Opt out**, and **Re-scan idle threads**.
- CLI commands under `bb cache-compact` (`status`, `check`, `now`, `opt-out`, `opt-in`, `reconcile`) and a bundled `cache-compact` skill.

## How it works

When an eligible thread enters `idle`, Cache Compact computes when its prompt cache expires and schedules compaction `leadMinutes` earlier. Before firing, it re-checks that the thread is still idle, unarchived, has no queued messages, pending interactions, or active child threads, and that the cache has not already expired. If your machine slept past expiry, it skips compaction instead of paying cold-cache input rates.

All tracking state stays in the plugin's local SQLite database on your BB server.

## Requirements

- BB `0.50` or later and Plugin SDK `0.6.157` or later.
- No external service, separate account, or API key. Compaction runs through the providers you already use in BB under their normal billing.
- For 1-hour caches, raising BB's `idleProviderSessionTimeoutMinutes` setting to `60` avoids restarting idle provider processes before compaction runs.

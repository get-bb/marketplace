Compacts large idle Claude Code and Codex threads before their prompt cache
expires, so coming back to a thread does not re-read its whole context without
the cache.

## What you get

- **Compact before expiry**: an idle thread above your threshold is compacted a
  few minutes before its prompt cache expires, while compaction still reads
  cached tokens.
- **Compact before sending**: if the cache already expired, your next message
  waits while the thread compacts, then sends.
- **A pill in the composer** that always says what happens next: "Auto-compacts
  in 23m", "Compact 412K" in red once the cache expired, "Compacting",
  and "Compacted 412K → 68K".
- A settings page with a percentage threshold (and a fixed 100K-token floor),
  per-provider overrides, and 30-day stats of tokens not re-read.

## How it works

Claude Code reports its cache lifetime. Codex does not, so the plugin starts at
30 minutes and learns a longer lifetime from cache hits after idle gaps.
Compaction uses BB's own `/compact` and shows in the thread timeline. It keeps a
summary, not the full history. Cursor is not supported: BB cannot compact
Cursor threads or read their usage.

## Requirements

BB 0.50.x. The plugin ID is `bb-idle-compact`. For installation and release
status, see the [project README](https://github.com/ysskrishna/bb-idle-compact#readme).

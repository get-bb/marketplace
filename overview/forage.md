Forage gives every BB agent six web-research tools, durable scoped evidence and a CLI that uses no model turns. Requires BB 0.47 or newer.

## Research tools

- `web_search`: up to eight queries, domain/date filters, provider profiles and fair host-diverse content reads.
- `web_fetch`: up to ten URLs, readable or exact textual raw mode, independent direct/GitHub-smart resolution, passage search and outline/link/line/focus views.
- `web_map`: bounded sitemap, robots, llms.txt and HTML discovery with provenance.
- `web_extract`: deterministic metadata, headings, links, tables and JSON-LD. No hidden AI extraction.
- `web_crawl`: persistent start/status/list/cancel/resume jobs with page, depth, byte, time and concurrency limits.
- `web_diff`: immutable snapshot comparison or a fresh URL against stored evidence.

Content is captured before formatting. Continue with snapshotId, contentHash and UTF-16 offset for immutable paging. URL-only paging may download again after cache expiry. Every batch failure and partial limit is visible; output is capped at 32,000 characters.

## Research in each thread

A Research tab in each thread shows what the agent and you looked up: searches with the results seen, pages read, crawls against their limits, and problems in words. Read kept text, compare versions, quote lines into your message, check a reply against kept pages, and search or crawl yourself with no model turn. Replies can carry citation cards. The thread menu sets web research per thread: Docs, Fresh, Private or Off. The Research page lists threads with research, plus health and storage.

The activity log keeps queries and results for 30 days; clear it per thread or turn it off. Source IDs stay in their thread unless shared with the project.

Default retention is 30 days for thread content, 180 days for project content and 128 MiB retained content. Active-job snapshots are protected. Storage refusal never produces a fictional source ID. Missed deletions are recovered by scope checks; archived threads are kept.

## Privacy and providers

Keyless DuckDuckGo and Exa work without credentials. Optional Brave, Exa account, SearXNG and Tavily search, explicit Tavily/Firecrawl/Jina readers, and an explicit Firecrawl crawl backend respect configured ceilings. Keys do not automatically enable paid fallback.

Profiles: auto, fast, fresh, docs, private and deep. Private allows configured SearXNG search, direct readers and local crawl only; it makes no guarantee about SearXNG's upstream engines. Per-call arguments cannot widen setting-level privacy.

Private networks are blocked by default and each direct redirect is revalidated and DNS-pinned. Local private-network permission is not permission to forward URLs to a cloud reader. Remote URLs are screened before forwarding; vendor-side redirects cannot be DNS-pinned locally.

Restricted same-thread capture is OFF by default, cannot be project-promoted, and needs explicit thread selection for export. Disabling it revokes reads. Credentials/headers/cookies are never persisted. Sensitive URL checks are conservative heuristics, not a general secret detector. Scope isolation does not protect SQLite from a local user or shell-capable agent.

## CLI and diagnostics

`bb forage search|fetch|map|extract|diff` and `crawl start|status|list|cancel|resume` take explicit --project/--thread IDs and strict --input JSON. Tools and CLI share one runtime, repository, job service and diagnostic ring.

Sources commands: list, show, export, delete and prune. Destructive commands require exact confirmation tokens; export returns a local-auth download route, not a server file path.

`status` and `diagnostics` show redacted in-memory records (maximum 200, 24 hours), never query/URL/content/credential values. `clear` clears process caches. `doctor` is offline unless --live explicitly enables bounded keyless probes. `bench` runs a bundled local corpus without network access.

See the README for every parameter and limit.

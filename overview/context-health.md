## See what contributes to context usage

Context Health gives each thread a side panel for exploring recorded messages, tool output and skills. Use the category bars to find large contributions, then search, sort and expand individual entries.

## What you get

- A context usage meter when the provider exposes usage through BB.
- Recorded-text estimates grouped by category, with searchable previews.
- A Loaded skills view for skill reads observed in tool results.
- A separate Available skills inventory with descriptions and plugin ownership.
- Optional Codex session-log detail for additional instructions, catalogue entries and tool definitions.

The panel refreshes every 30 seconds while visible. Open it from a thread’s right panel using **New tab → Context Health**.

## Understand the coverage

The shared view uses BB’s normalized event data across Codex, Claude Code, Pi and ACP providers. Detail depends on what the provider exposes. Text estimates do not reconstruct the full model context or add up to the usage meter.

Loaded skills means a qualifying skill read was observed; it does not guarantee the skill remains in context after compaction. Available skills is inventory, not loading evidence. Coverage notices explain missing data and inspection limits.

## Requirements and privacy

Requires BB 0.42 or later and a compatible Plugin SDK runtime of 0.4.48 or later. Optional Codex detail requires access to the matching session log on the thread host.

No separate account or paid service is required. The plugin does not modify session files or send context to an external service. Real previews can contain private project information; review them before sharing screenshots.

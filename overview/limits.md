# Limits — floating usage rings for coding plans

A small translucent pill in the bottom-right corner of bb that shows how much
of your coding-plan quota is left, for every harness you run — not just the
ones bb ships collectors for.

## What you get

- **One chip per plan**: Claude Code, Codex, Cursor — through bb's own
  collectors — plus **GLM (Z.AI) Coding Plan** and **Kimi Code**, fetched
  directly from the plans' own usage endpoints by this plugin.
- **Rings that mean something**: one small ring per limit window (Claude's
  session + weekly, Cursor's plan + on-demand, GLM's coding plan + MCP lane,
  Kimi's 7-day + 5-hour). A full green ring means everything is left; it
  shrinks and shifts amber → red as the plan runs out.
- **Follows your chat**: the pill always shows the harness of the thread you
  are looking at — including harnesses that run through other providers (a
  kimi* or glm* model is recognized and mapped to its plan).
- **Inline refresh**: the little arrow refreshes just that one provider, on
  the spot. Click the chip for a two-column popup with every plan and a
  Refresh-all button.
- **Traffic discipline**: with the refresh interval set to `0` the plugin
  makes **no background requests at all** — providers are only contacted when
  you press a refresh button. Sessions that can expire (Claude's OAuth race,
  Kimi's 15-minute tokens) are self-healed: the plugin keeps its own Kimi
  token pair in plugin storage and never touches the CLI's credential file.

## Setup for GLM and Kimi

- **GLM (Z.AI)**: put your API token in `~/.config/zai/tokens.env` as
  `ZAI_TOKEN=…` (the same file the common `zclaude` shell setup uses).
- **Kimi Code**: install the kimi-code CLI and run `kimi login`. The plugin
  reads its credentials (`~/.kimi-code/credentials/kimi-code*.json`) and
  refreshes its own access tokens via the official token endpoint.
- Chips for plans you have not configured simply stay hidden.

## Privacy

The plugin reads provider credentials only from their standard on-disk
locations to query the plans' usage endpoints, stores its own Kimi token pair
in bb's plugin storage, and sends telemetry nowhere. Provider requests are
made only on explicit refresh (manual mode) or on the background interval you
choose in Settings → Limits.

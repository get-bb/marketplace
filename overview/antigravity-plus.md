BB's built-in ACP setup gives you basic Antigravity chat without quota meters, thread forking, `/compact`, native `/swarm` visibility, or reload-safe instructions. Antigravity Provider + runs on your existing `agy` subscription and login (no extra API keys) and turns it into a full native BB provider.

## What you get

- **Quota tracking.** Shows 5-hour quotas above 7-day quotas for each model group in BB's Usage dashboard.
- **Reload-safe instructions.** Sends BB thread and skill instructions through Antigravity's native system prompt channel on load and resume.
- **Native workflow controls.** Use BB's **Auto** permission mode (`agy 1.5.4+`), `/plan` composer action, native `ask_question` cards (`agy 1.5.18+`), per-model reasoning levels, tip forking, and manual plus automatic `/compact` cards (`agy 1.5.14+`).
- **Live `/swarm` board.** Opens a **Swarm** side-panel tab and composer status pill to inspect the plan, worker roster, and posts on local and remote hosts.
- **Readable cards and CLI management.** Adds plain-English command summaries, **Outside of sandbox** badges, optional sandbox-only auto-approval, live background task banners across restarts, personal and workspace skills, and built-in **Install** / **Update** (`agy update`) and sign-in checks (`agy acp --login`).

## Permissions and safety

**Accept edits** applies workspace edits and asks about other requests by default (configurable in plugin settings). **Auto** lets Antigravity review tool calls and escalate edge cases to you; if unavailable, BB warns once and falls back to Accept edits. **Full access** auto-approves every request. `/plan` overrides Auto as behavioral guidance, not enforced read-only access. New threads inherit your CLI sandbox settings unless you enable the plugin sandbox toggle. See the [Antigravity sandbox docs](https://antigravity.google/docs/sandbox/?tab=cli).

## Requirements

Requires BB 0.50+, Node.js 22+, Antigravity CLI 1.5.0+ (`1.5.4+` Auto, `1.5.14+` `/compact`, `1.5.18+` `ask_question`) installed and signed in on the target host, and a Google Antigravity account (your quota and billing terms apply). Verified on macOS, Linux, and Windows.

## Limits

Installs side by side under `antigravity-plus` without touching existing threads. Forking works at the latest message only. Mid-thread rewind, message editing, service tiers, and native archive or rename sync are unavailable.

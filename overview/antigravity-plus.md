## Antigravity in BB, with workflow controls and quotas built in

Antigravity Provider + runs on your existing Antigravity subscription and `agy` login, adding native BB workflow controls and built-in quota tracking beyond a manual ACP setup. Keep instructions across reloads, fork threads, run `/compact`, choose per-model reasoning, and inspect live `/swarm` runs with no extra API keys or manual ACP JSON.

## What you get

- **Instructions that survive reloads.** Keeps BB thread and skill instructions active when BB loads or resumes a thread by sending them through Antigravity's native system prompt channel instead of a one-time first message.
- **Built-in 5-hour and 7-day quota tracking.** Reports `Gemini` and `Claude/GPT` usage windows and reset times directly in BB's Usage dashboard.
- **Thread forking and manual plus automatic compaction.** Fork any thread at its latest message, with automatic pass-through if a future CLI release adds native session forking. Run manual `/compact` (`agy 1.5.14+`) from BB's Compact action with failure detection, and see automatic compactions as **Compacted context** cards in your timeline.
- **Per-model reasoning and a single mode selector.** Discovers live CLI models once per host, exposes each model's reasoning levels (including `xhigh` and `max` when the model supports them), and maps **Build** and **Plan** onto one selector.
- **Readable command cards, sandbox guard, and skills.** Shows plain-English command summaries, clean output and exit codes, **Outside of sandbox** badges, an optional sandbox-only auto-approval policy that still prompts on escapes, live background task banners across restarts, optional BB child-thread delegation, and personal plus workspace skills (including `~/.agents/skills`) in BB's picker.
- **Live `/swarm` board inside BB.** Starting `/swarm` opens a **Swarm** tab in the side panel and adds a clickable status pill above the composer. Inspect the plan overview, member roster with per-worker models, agent filters, and Markdown posts alongside swarm timeline cards on local and remote hosts.
- **Built-in CLI install, updates, and sign-in checks.** Wires BB's native **Install** and **Update** (`agy update`) actions, checks for newer Antigravity CLI releases in **Settings -> Updates**, and verifies your CLI version and login without spending tokens (guiding signed-out setups to `agy acp --login`).
- **Isolated sessions and desktop reliability.** Runs one CLI worker per thread (`--process-per-session`), forwards custom `agy` profile directories, and fixes macOS BB Desktop Electron child spawns.

## Permissions and sandbox safety

By default, **Accept edits** applies workspace edits natively and prompts you for each other ACP approval request (`Ask for each request`). In plugin settings you can switch to `Auto-approve in sandbox, ask on escape` or `Auto-approve all`. **Full access** auto-approves every ACP request, including out-of-sandbox commands. **Build** and **Plan** select native work modes. Plan guides agent behavior and does not enforce read-only access.

New threads inherit your CLI sandbox settings unless you turn on the optional CLI sandbox toggle. See the [Antigravity sandbox docs](https://antigravity.google/docs/sandbox/?tab=cli).

## Requirements

Requires BB 0.50+, Node.js 22+, Antigravity CLI 1.5.0+ (`1.5.14+` for `/compact`) on the target host, and a signed-in Google account. Your Google Antigravity account quota and billing terms apply. Remote hosts need their own CLI install and sign-in. Verified on macOS (`agy 1.5.16`, BB Desktop), Linux (`agy 1.5.14`), and Windows (`agy 1.5.1+`).

## Limits

Registers under `antigravity-plus` with its own state directory, so it installs cleanly side by side without touching existing threads.

Forking works at the latest message only. Mid-thread rewind, message editing, BB Auto permission mode, service tiers, interactive `ask_question` cards, and native archive or rename sync are not supported.

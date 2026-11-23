## Native BB feel, beyond bare ACP

Running `agy` over generic ACP gives you basic chat, then breaks the workflow you expect from BB's native Codex and Claude Code providers. Thread and skill instructions vanish after a reload. You cannot fork a session or run manual `/compact`. `xhigh` and `max` reasoning are missing. Running `/swarm` prints a terminal-only `alt+s` hint that does nothing in BB. Command cards hide summaries and sandbox-escape flags.

Antigravity Provider + closes those gaps on top of your existing `agy` login, with no extra API keys or manual ACP JSON.

## What you get

- **Instructions that survive reloads.** Moves BB thread and skill instructions into Antigravity's native system prompt channel and re-applies them automatically on every session load and resume.
- **Live `/swarm` board inside BB.** Starting `/swarm` opens a **Swarm** tab in the thread side panel and adds a clickable status pill above the composer. Inspect the coordinator's plan overview, member roster with per-worker models, agent filters, and Markdown board posts alongside readable swarm timeline cards. Works on local and remote hosts.
- **Tip forking and manual `/compact`.** Fork any thread at its latest message, with automatic pass-through if a future CLI release adds native session forking. Run manual `/compact` (`agy 1.5.14+`) from BB's Compact action with failure detection when the CLI treats `/compact` as ordinary chat.
- **Full reasoning ladder and host-cached models.** Discovers CLI models once per host, exposes `low`, `medium`, `high`, `xhigh`, and `max` efforts per model, and maps **Build** and **Plan** onto a single mode selector.
- **Readable tool cards, background banners, and skills.** Shows plain-English command summaries, clean output and exit codes, **Outside of sandbox** badges, live background task banners that recover across restarts, optional BB child-thread delegation, and `antigravity:`-prefixed builtin skills in BB's picker.
- **Per-model quota tracking and isolated sessions.** Reports 5-hour and 7-day usage windows (`Gemini`, `Claude/GPT`, `Argon`) in BB's Usage dashboard, runs one worker process per thread (`--process-per-session`), fixes macOS BB Desktop Electron spawns, and forwards custom `agy` profile directories.

## Permissions and safety

**Build** and **Plan** select Antigravity's native work modes. Plan guides agent behavior and does not enforce read-only access. **Accept edits** runs workspace edits natively and follows your approval policy in plugin settings (`Ask for each request` by default, `Auto-approve in sandbox, ask on escape`, or `Auto-approve all`). **Full access** auto-approves every ACP request, including out-of-sandbox commands.

The plugin inherits your CLI sandbox configuration unless you turn on the optional CLI sandbox toggle. See the [Antigravity sandbox docs](https://antigravity.google/docs/sandbox/?tab=cli).

## Requirements and onboarding

Requires BB 0.50+, Node.js 22+, Antigravity CLI 1.5.0+ (`1.5.14+` recommended for `/compact`) on the target host, and a signed-in Google account. Provider quota and charges apply. Remote hosts need their own CLI install and sign-in.

Built-in health checks verify CLI version and sign-in without spending tokens, guide signed-out users to `agy acp --login`, and wire BB's **Install** and **Update** (`agy update`) actions. Verified on macOS (BB Desktop), Linux, and Windows.

## Attribution and limits

MIT-licensed community fork of [ols-md/bb-plugin-antigravity](https://github.com/ols-md/bb-plugin-antigravity), building on work by `dionis-d`, `AdzeB`, and `mturilin`. Registers under `antigravity-plus` so it can run side by side with existing installs.

Forking works at the latest message only. Mid-thread rewind, message editing, BB Auto permission mode, service tiers, interactive `ask_question` cards, and native archive or rename sync are not supported.

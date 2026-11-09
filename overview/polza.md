Run bb threads on [polza.ai](https://polza.ai) models. Sign in with your Polza account, pick which catalog models the model picker offers, and watch your balance and the thread's ruble spend without leaving bb.

## What you get

- **Sign in with Polza** (OAuth, PKCE). The key Polza issues is stored on the bb server as a plugin secret; nothing is typed by hand. Signing in again rotates the key; signing out forgets it.
- **A curated model picker.** Any chat model of the Polza catalog (Claude, GPT, Gemini, DeepSeek, Qwen, Kimi and more) can be offered in bb's picker, in your order, with prices and context size in the description. The first model is the default.
- **Balance at a glance.** The sidebar footer shows the organisation's available balance and what the key may still spend; the settings page adds the key's usage and a Top up button.
- **Ruble spend per thread.** A card above the composer estimates the open thread's spend from token counts and catalog prices.
- **Claude Code as the engine.** Threads run the Claude Code CLI against Polza's Anthropic-compatible API, so you keep Claude Code's tools, permission modes, plan mode, skills and checkpoint forks. The plugin installs or updates the CLI on each machine from Settings → Providers.

## Requirements

- A Polza account with balance. On the consent page choose the organisation that pays and a spend limit for the key: Polza suggests 100 ₽ a day, which is too little for agent work.
- The Claude Code CLI on every machine that runs Polza threads (the plugin can install it). No Anthropic login is needed.
- For the one-click sign-in the browser must reach the bb server's loopback address. Otherwise paste the callback address or code into the settings page after consenting.

## Settings

- `Models in the picker`: the whitelist, edited with search and prices on the Polza settings page or with `bb polza models set …`.
- `Side-task model`, `Subagent model`: cheap models for Claude Code's housekeeping and subagents.
- `Claude Code memory`, `Claude Code sandbox`, `Approvals in Full Access`, `Command descriptions`: Claude Code behaviour, as in the bundled Claude Code provider.

## For agents

`bb polza status [--json]` prints sign-in, balance and key limit; `bb polza models` lists the picker models and `bb polza models set <slug>…` replaces them. The skill in `skills/polza` explains the details.

Experimental: the provider API this plugin builds on is still marked experimental in bb. The spend shown is an estimate; the Polza dashboard is the billing truth.

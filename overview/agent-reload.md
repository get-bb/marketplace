## What you get

- A reload button in the header of every thread whose agent supports it. Click it, send your next message, and the agent answers from a fresh session with the same conversation.
- `bb agent-reload [thread-id]` for shells and agents. Without an ID it reloads the thread it runs in, so an agent can reload itself after you ask it to connect an MCP server.
- A bundled skill that tells agents the command exists.

## When to use it

An agent reads its MCP servers, settings, instruction files, skills, and plugins when its session starts. After you connect a new MCP server, sign in to one, or edit `CLAUDE.md` or `settings.json`, the running thread keeps the old state. Reload it instead of starting a new thread or restarting bb.

## Supported agents

Claude Code, Pi, and bb's ACP agents (OpenCode, OMP, Grok, Hermes, Cursor). Add custom ACP agents by provider ID in the plugin settings; the change applies without a plugin reload. Codex is not supported, because bb's Codex bridge does not rebuild a session when its environment changes.

## How it works

bb rebuilds an agent session when the environment it passes to the agent changes. The plugin contributes one per-thread variable and changes it on reload, so the restart happens before the next turn. A thread that is mid-turn finishes that turn first. Threads you never reload are untouched. The plugin stores one timestamp per reloaded thread and makes no network requests.

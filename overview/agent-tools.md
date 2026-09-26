Show which MCP servers and skills sit on each BB machine, then fold them into one catalogue and one skills canon.

## What you get

- A page with enrolled machines on the left and a server-by-machine matrix on the right. Cells mark present, missing, drifted, or unmanaged.
- New servers wait in a queue: adopt everywhere, keep on one machine, or hide from suggestions.
- Sync adds what the catalogue expects and never deletes on its own. Removal is a separate confirmed action.
- A Skills tab for the `~/.agents/skills` canon: git sync between machines, fan-out into CLI homes, and a version archive before replace or delete.
- CLI `bb tools` for the same catalogue, plan, sync, and skills operations.

Supported CLIs include Claude Code, Codex, OpenCode, Cursor, Antigravity, Gemini, Qwen, Kimi, Grok, Crush, and a local MetaMCP gateway. Other CLIs still appear in the inventory.

## How it works

Every write leaves a `*.bak-bb-mcp-*` copy next to the config (last five kept) and uses an atomic rename. Files with comments are read but not rewritten. Machine-specific servers (absolute binary path, loopback address, local secret reference) stay local and are not fanned out.

The skills canon is the only tree that travels between machines. Claude and Qwen homes get symlinks; Codex, Cursor, and OpenCode read the canon themselves; Gemini's unused skills folder is cleared; BB's own `~/.bb/skills` registry is not overwritten.

Hourly sweep, canon git-sync, and home fan-out stay off until you enable them. Buttons and CLI commands always work.

## Requirements

BB 0.43 or later on macOS or Linux, with at least one enrolled machine. Optional: a git remote for `~/.agents/skills`, and a MetaMCP API key if you want the gateway listing. The plugin writes agent config files on those machines; it does not publish pages or change MetaMCP membership.

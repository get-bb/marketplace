Connect external git repositories and monorepo skill directories directly to BB without hardcoding paths.

## What you get

- **Configurable scan paths:** Point BB to any directory in your home directory (e.g. `Projects/skills`, `Projects/.agents/skills`) via Settings or CLI.
- **Auto-discovery:** Automatically indexes nested category directories (such as `.agents/skills/research/`) containing `SKILL.md` packages.
- **Universal availability:** All discovered skills immediately appear in the `/` slash menu across every project and personal thread, and are injected into system prompts for all agent providers (ACP, Codex, Claude Code, Cursor, etc.).
- **Live reloads:** Editing `SKILL.md` in your git repo is immediately live without re-running installs or rebuilding bundles.
- **CLI management:** Fast commands (`status`, `sync`, `add`) to inspect and update scan paths from your terminal.

## How it works

The plugin registers your configured skill directories as `sharedSkillRoots` in `~/.bb/config.json` and triggers `system.reloadConfig()`. Skills remain in their original git repositories — no file copying or duplicate storage.

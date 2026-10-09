Track, label, annotate, and organize BB plugins with personal notes — keep favorites, note installed extensions, and avoid broken or rejected plugins.

## What you get

- Labels and descriptions right on the BB Plugins page: every plugin card gets a **+ Label** / **Edit** button.
- Assign several labels per plugin — built-in **Liked**, **Installed**, **Rejected**, **Buggy**, **Slow**, **Conflicts**, **Redundant**, **Testing Only** — or create your own with a custom color.
- Label chips and your description shown on plugin cards, and label chips in the plugin detail header. Open the editor from the detail page's **⋯** menu with **Labels & comment…**.
- Plugins you marked **Rejected**, **Buggy**, **Slow**, **Conflicts**, or **Redundant** are blurred on the Plugins page; hover a card to reveal it.
- A full-featured `bb plugin-vault` CLI command for terminal and automation workflows.

## How it works

Plugin Vault stores your records in local SQLite-backed storage (`bb.storage.kv`). When you browse the plugin marketplace or your installed plugins, a lightweight content script compares catalog identifiers, slugs, and display names against your vault and applies non-intrusive badges and recorded notes directly to plugin cards.

Nothing leaves your machine. Plugin Vault does not require any account, external API, or network access.

## CLI commands

Manage your vault directly from any terminal:

```
bb plugin-vault list
bb plugin-vault add <plugin-id> --label liked --note "Fast keybindings and clean UI"
bb plugin-vault add <plugin-id> --label rejected --note "Incompatible with current setup"
bb plugin-vault remove <plugin-id>
```

Add `--json` to `bb plugin-vault list` for machine-readable output in scripts and automations.

## For agents

The included `plugin-vault` skill gives AI agents context on how to query your vault before recommending, installing, or modifying BB plugins.

# Visual References & Moodboards for BB IDE

Visual moodboards, UI inspiration, and design references integrated directly into the BB IDE side panel.

## Features

- **Instant Agent Auto-Open:** Automatically pops open the visual references panel in your active thread when an agent collects references (`--open`).
- **Per-Project Isolation:** Keep moodboards and references scoped to each project (`projectId`), or browse all projects in a unified feed.
- **Web & Local Files:** Seamlessly supports external websites (with automatic OpenGraph preview scraping) and local project files with secure file serving.
- **Aesthetic Anchors:** Pin key stylistic references to keep your active visual working set immediately accessible at the top of the board.
- **Interactive Lightbox:** Full-screen zoom and pan with prompt provenance, design notes, and one-click clipboard copy.
- **Inline Chat Directives:** Render interactive reference previews (`::reference{id="..."}`) and mini-galleries directly within chat messages.
- **Fast CLI & Agent Tools:** Full automation support through `bb references` CLI and `references_add`, `references_list`, `references_pin` agent tools.

## Quick Start

```bash
# Add a web reference and pop open the panel:
bb references add "https://linear.app" --open

# Pin as an aesthetic anchor:
bb references pin <id>

# Search your references:
bb references list --search "dashboard"
```

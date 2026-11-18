## Shared context with ai-workspace and Repowise

Project Spaces 0.2 uses ai-workspace for shared files, notes and groups, and Repowise for code search and relationships across related repositories. Agents receive read tools scoped to the selected space, execution device and active checkout. A project's worktree uses its own index.

Install or update either optional CLI from the space settings on each device. Initialize ai-workspace folders in a group, then prepare Repowise indexes. Prepared indexes can refresh when BB agent turns start, finish or fail. Known stale indexes are rejected; incomplete freshness checks are reported. Tool discovery returns a compact catalog and loads one full schema on request.

## Organize repositories and threads

Create named spaces from existing BB projects and reference folders. Choose a primary project and save shared instructions. A project can belong to several spaces; each thread has one placement.

## Work from the sidebar

Browse common space threads and project threads in one sidebar. Open a project's chat form beside its launch button. Move or copy threads through native menus. Questions and approvals stay yellow until answered; unread failures and completed work use red and green. Native Continue from retains the source thread's space and scope.

## Keep instructions concise

Optionally manage a compact AGENTS.md block per device. The plugin preserves other instructions and an original backup, and keeps full space rules in the plugin instead of copying every space's rules into the file. Shared projects receive one block listing their enabled spaces. New agent sessions receive the selected space's instructions once. External MCP clients need separate configuration.

## Requirements and boundaries

Requires BB 0.49 or later. The interface is currently in Russian. ai-workspace and Repowise are separate optional CLIs; installation downloads verified ai-workspace releases from GitHub and Repowise packages from PyPI, with verified uv and a managed Python runtime when needed. Index-only Repowise preparation makes no model calls and requires no API key. Chats use your configured provider account or quota. Other folders provide context without expanding BB permissions. Each repository keeps its own Git state; a native worktree covers the selected project.

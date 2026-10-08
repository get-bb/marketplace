Bring selected Codex projects and their existing chats into BB.

## Preview first

The sidebar page lists Codex projects with a checkbox for each folder. Checkboxes for the same folder are linked across projects. Scanning is read-only. The CLI requires an explicit `--project`, `--folder`, or `--all` selector.

The preview shows each unique folder once and its BB target. Git subfolders and worktrees route to the main repository; nested independent repositories remain separate. A standalone non-Git folder needs an explicit `git init` choice, and an unchecked choice skips that folder.

## Preserve the conversation

The importer keeps messages, timeline items, available attachments, dates, and archive state. It matches source session IDs to BB threads so rerunning the command does not create duplicates. A database backup is made before the first write.

Each folder's progress appears in its row in the project list. It is stored after every chat and restored when the migration page is reopened. The CLI `status` command shows the same current run.

## Current scope

BB and Codex must run on the same machine. This release supports BB 0.44 and local Codex state. It does not alter Codex projects or sessions. Some archived Codex sessions may need to be unarchived there before their BB copies can continue.

## Requirements

Install the Codex CLI separately and make sure it supports `codex app-server`. The plugin reads existing local Codex data from `CODEX_HOME` or `~/.codex`; it needs `state_5.sqlite` there. Set `CODEX_CLI` to the executable's absolute path if the BB server cannot find `codex`. Git must be installed to resolve repositories and to initialize a selected folder without one. The bundled BB Codex provider is not required: this plugin reads Codex data directly.

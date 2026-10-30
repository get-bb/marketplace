# Team

Spawn a role-based agent team for a project from a declarative config — a lead
that coordinates work, and any number of executors (developers, testers,
analysts) that report back to it.

## Why

Setting up a multi-agent workflow in bb is manual: you write role prompts from
scratch, spawn each thread by hand, paste thread IDs between them, and route
messages yourself. Team turns that setup into one config file and one command.

## How it works

1. `bb team init` — drop a template config (`.bb/team.yaml`) plus role prompt
   files (`.bb/team/roles/`) into a project.
2. Edit the config: roles, providers, models, environments.
3. `bb team create` — spawn the whole team in one command.
4. `bb team status` — see the config and the live team threads.

The first role (or the one marked `lead: true`) becomes the lead thread. Every
other role is spawned as its child thread and reports to the lead with
`bb thread tell`. The lead receives a ready-made team roster with clickable
thread references, so no one pastes IDs by hand.

## Config highlights

```yaml
version: 1
defaults:
  environment: checkout   # checkout | default | worktree | env:<id>
  parentNotifications: stuck
roles:
  - name: lead
    title: Development lead
    provider: codex
    promptFile: .bb/team/roles/lead.md
  - name: developer
    title: Developer
    provider: pi
    promptFile: .bb/team/roles/developer.md
  - name: tester
    title: Tester
    provider: codex
    promptFile: .bb/team/roles/tester.md
```

- **Per-role provider and model**: pin each role to a provider (`codex`, `pi`,
  `claude-code`, …) and a concrete model, with optional `reasoningLevel`,
  `serviceTier`, and `permissionMode`.
- **Shared or isolated environments**: all roles in one project checkout, or a
  separate managed worktree per role.
- **Existing threads**: give a role a `threadId` to adopt a thread you already
  run instead of spawning a duplicate.
- **Prompt placeholders**: `{{leadThreadId}}`, `{{leadThreadRef}}`,
  `{{role.<name>.threadId}}`, `{{projectId}}`, `{{workspacePath}}` are filled
  in at spawn time.
- **Idempotent**: re-running `bb team create` skips roles that already have
  threads and repairs missing parent links; `--dry-run` shows the plan.

## Plugin settings

- **Language** (`en` | `ru`, default `en`) — CLI output and scaffold templates
  (config comments, role prompts).
- **Team sidebar section** (default on) — team threads live in one section.
- **Send team roster** (default on) — the lead gets a roster message after
  `bb team create`.

## Opt-in per project

The plugin does nothing in projects without `.bb/team.yaml`. Run
`bb team init` in a project to opt in; other projects are untouched.

## Commands

- `bb team init [--project <id|name>] [--force]` — write the template.
- `bb team create [--project <id|name>] [--dry-run]` — spawn or adopt threads.
- `bb team status [--project <id|name>]` — config and live team overview.

All commands support `--json` and run from any thread or terminal.
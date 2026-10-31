# Team

Role-based agent teams for bb: a lead that plans and accepts work, and
executors — developers, a cheap junior for simple tasks, testers, writers —
that report back to it. Several teams per project, created from templates.

## Why

A multi-agent workflow in bb is manual: role prompts from scratch, threads
spawned one by one, thread IDs pasted between agents, packages tracked in
chat. Team turns it into a template, a short config and one click.

## How it works

1. Open the Team panel: projects are grouped into "with teams", "a team can be
   created" and "cannot be created now" (with the reason), with search.
2. Pick a template (development, QA, docs, management, or your own), adjust
   roles, providers and models, and create the team. Disabled providers block
   creation up front.
3. The lead gets a roster; executors are its child threads, titled
   `👥 Developer` (or `👥 core · Developer` with several teams).
4. Work from the panel's tree or the CLI: message roles by name, hand out
   tracked work packages, pause, stop, add executors.

## Highlights

- **Several teams per project**, each in `.bb/teams/<team>.yaml`, each with its
  own sidebar section, packages and pause.
- **Budget-minded default team**: a lead on a strong model, a developer, a
  junior on a cheap model, a tester; short built-in prompts that plan first,
  delegate by difficulty and keep diffs and reports small.
- **Templates** shared across projects: edit them in Settings → Team, create
  one from role kinds with prepared prompts, or save a running team as one.
- **Add executors** later: a new role, or an existing free thread of the
  project (it is renamed and moved under the lead).
- **Work packages**: `bb team task add developer "Login form" --send`;
  executors move them to review, only the lead accepts.
- **Helpers**: threads an agent spawns under a role show up under that role.
- **Live tree**: statuses, models and current packages; actions per role.
- **Pause** holds agent messages to executors until resume; humans are never
  held. Optional `notifyOn: [idle]` wakes the lead after a role's turn.
- **Doctor**: providers, environments, prompts, broken links, git state.
- **Replace** a role with a fresh thread that receives a handoff.
- **Out of git by default**: team configs stay untracked until you turn
  versioning on per team.

## Config sketch

```yaml
version: 1
title: Development team
defaults:
  environment: checkout
  parentNotifications: stuck
roles:
  - name: lead
    lead: true
    provider: codex
  - name: developer
    provider: codex
  - name: junior
    provider: pi
    model: qwen3-coder
  - name: tester
    provider: codex
    notifyOn: [idle]
```

## Commands

`bb team init | create | list | status | add-role | version | tell |
task add/list/update/done/remove | report | doctor | replace | stop | pause |
resume | retitle | template list/show/save/delete` — all with `--team`,
`--project` and `--json`.

## Settings

Language (English or Russian for CLI, panel and templates), a sidebar section
per team, the roster message, and the thread title format.

Opt-in: projects without team configs are untouched.

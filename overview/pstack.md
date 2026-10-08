## Getting started

Install the plugin, then run `/setup-pstack`. It lists the providers this host can reach with `bb provider models` and asks which model each pstack role should use. bb keeps one provider and model per project and applies a choice per spawn, so that mapping is intent you pass along with `--provider` and `--model` when a worker starts.

After that, `/poteto-mode` is the way in.

## What you get

47 skills from pstack, installed once and available in every thread. Start work with `/poteto-mode`: it reads your request, picks one of 23 playbooks, and runs the other skills the playbook needs.

The rest of the library covers what surrounds a change.

- `/how`, `/why`, `/teach`, and `/recall` answer questions about code before you edit it.
- `/architect`, `/interrogate`, `/swarm`, and `/pstack-arena` shape a change and put more than one model on it.
- `/pstack-blast-radius` looks for what the change breaks outside its own diff.
- `/create-verification-skill` and `/maintain-verification-skill` keep a project's proof current.
- `/pstack-tdd` writes the failing test first.
- `/unslop`, `/technical-writing`, and `/no-comments` clean prose and comments.
- 23 `principle-*` skills name the rule you want an agent to follow, mid-task.

## How it works

Skills are user-invoked. Each one carries `disable-model-invocation`, so it stays out of the model prompt until you type the name. Nothing spends context until you ask for it.

Every skill belongs to the plugin, so each one has its own switch. Settings shows a master switch and one row per skill.

The skills discover the harness they run in. On bb, parallel skills use `bb thread spawn` with `bb thread wait` and `bb thread output`. A worker can take its own environment with `--new-environment worktree`. Loops use `bb automation create` instead of sleeping inside a thread.

## Requirements

bb 0.43 or newer, with the `bb` CLI that ships beside it.

Some skills expect things this plugin does not provide. Those include a connected evidence source such as MCP servers for `/why`, a webhook service for `/make-bot-ui`, and a Node or Bun toolchain for the orchestration scripts under `poteto-mode/scripts`. [CAPABILITIES.md](https://github.com/wy3z/bb-plugin-pstack/blob/main/CAPABILITIES.md) lists each one and what the skill does instead.

## Credit

pstack is Lauren Tan's work: [cursor/plugins](https://github.com/cursor/plugins/tree/main/pstack), MIT, Copyright (c) 2026 Lauren Tan. This plugin adapts it, and the adaptations are recorded in [MANIFEST.md](https://github.com/wy3z/bb-plugin-pstack/blob/main/MANIFEST.md). Three skills carry a `pstack-` prefix here to avoid clashing with personal skills of the same name: `/pstack-arena`, `/pstack-tdd`, and `/pstack-blast-radius`.

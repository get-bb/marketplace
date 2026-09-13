Pick a specialist before starting a chat and let the CLI load that agent's own instructions. The choice stays with the conversation, including later turns and plugin reloads.

## What you get

- An Agent menu in BB's expanded New thread composer, with search and refresh.
- Claude Code user/project agents and agents from enabled installed Claude plugins.
- Codex file profiles: apply developer instructions (up to 4096 characters) through BB; model, permissions and other profile settings remain unchanged.
- OpenCode primary agents and agents that support both primary and subagent use.
- Discovery on the selected local or enrolled remote machine, in the selected project checkout or existing environment.
- The selected agent in the composer controls, without a duplicate Agent pill in the message.

## How it works

The first message carries a durable selection. Before dispatch, CLI Agents checks that the machine, project, provider and workspace match and that the agent still exists. Claude starts with its native `--agent` option. OpenCode's ACP process receives its native default-agent configuration. Your CLI settings and agent instruction files are not edited. When switching away from supported CLIs, selection mentions are cleared automatically from the composer, and unsupported providers proceed normally without configuration.

Agents can inspect available roles with `bb cli-agents list` and a chat's selection with `bb cli-agents thread`.

## Requirements

BB 0.43.x, macOS or Linux, and an installed, authenticated Claude Code, Codex 0.134+ or stock OpenCode ACP provider on the execution machine. Provider subscription limits or API charges still apply. No extra account or external service is required.

Other CLI providers (e.g. Cursor, Antigravity) are unaffected and run normally without agent injection. Windows, compact/mobile composers, custom absolute-path OpenCode ACP commands, and creating a new worktree in the same submission are not supported in this release. The composer integration reads BB 0.43's internal remembered-selection format; other BB versions need compatibility verification.

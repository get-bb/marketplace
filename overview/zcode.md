Keep ZCode coding conversations in bb, with streamed replies, native tool
activity, approval prompts, and saved sessions you can return to later.

## What you get

- Stream text and reasoning into a bb thread.
- Follow ZCode tool calls and results, and answer approvals and questions.
- Choose models and reasoning options from your ZCode configuration.
- Plan, stop, release, resume, fork and rewind saved conversations.
- Track background Bash/agent work; list tasks, inspect output and cancel them.
- Preview native file checkpoints and explicitly apply a file-only rollback.
- Queue follow-ups, attach images and files, inspect token/context usage, and
  request native compaction.
- Enable bb plugin tools and use bb skill files, configure native subagents,
  and retain nested tool attribution and command output.
- Configure native MCP servers and enable ZCode memory or enhanced search.

## Requirements

Install bb 0.46.1, Node.js 24+, and ZCode separately. Connect individual Coding
Plan in ZCode Desktop (Z.ai / BigModel), or configure a personal API provider.
Provider usage is subject to your plan or API charges.
The plugin is free under the MIT license and has no API-key settings.

ZCode CLI 0.16.9 has been verified on macOS with a local model fixture.
Live Z.ai Coding Plan account discovery was verified on macOS. Paid inference
and Linux/Windows operation remain unverified. Start Plan and Team plans are
not supported. Existing desktop sign-in is read locally; short-lived project
tokens stay in memory and raw child-protocol logging is disabled.

## Current limits

The bb tool bridge is opt-in to preserve native CLI MCP inheritance; configure
other custom servers in the plugin when enabling it.

Bash commands have command rows; other native tools use generic rows with nested
attribution. bb skills are exposed through a file catalog, not the native Skill
registry. Follow-ups queue at turn boundaries. Native scheduled tasks (Cron
tools) are opt-in via `automationsEnabled` and run only while bb is open. Full
subagent trees, browser host control, interactive plugin UI and Off-Peak/workflow
services remain unsupported.
History controls require compatible native v4 queries. Conversation rewind
preserves files; file rollback uses separate preview/apply commands. ZCode may
automatically notify its model when background work completes or is cancelled.
Official MCP auth supports individual Coding Plan on the default ZCode endpoint;
its credential flow has fixture coverage. Each session runs a
local ZCode process with the host account's permissions; approval modes are
not an OS sandbox.

This is an independent integration. The marketplace installs
the repository's main branch through bb's native Git installer and updater.

See the [setup guide](https://github.com/dpolishuk/bb-zcode#quick-start) and
[validation record](https://github.com/dpolishuk/bb-zcode/blob/main/docs/validation.md).
